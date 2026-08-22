import { NextRequest, NextResponse } from "next/server";
import { fetchAllCloudStatus, fetchSingleCloudStatus } from "@/lib/services/cloudStatus";
import { pingEndpoint, inspectDns, inspectSslCertificate } from "@/lib/services/network";
import { fetchLatestReleases, fetchTrendingTopics } from "@/lib/services/techPulse";

export const dynamic = "force-dynamic";

// Active SSE sessions in memory
const sseClients = new Map<string, (data: string) => void>();

const MCP_TOOLS = [
  {
    name: "get_cloud_status",
    description:
      "Get real-time operational status, latency, and incident reports for major cloud and developer platforms (AWS, Cloudflare, GitHub, OpenAI, Anthropic, Vercel, Supabase, NPM, Discord, Reddit, Datadog)",
    inputSchema: {
      type: "object",
      properties: {
        provider: {
          type: "string",
          description:
            "Optional provider filter: 'aws', 'github', 'cloudflare', 'openai', 'anthropic', 'vercel', 'supabase', 'npm', 'discord', 'reddit', 'datadog'. If omitted, returns all providers.",
        },
      },
    },
  },
  {
    name: "inspect_ssl",
    description:
      "Connects directly via TLS socket to inspect domain SSL/TLS certificate chains, issuer, fingerprint, expiration date, and remaining valid days",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          description: "Target domain name or hostname (e.g. api.github.com)",
        },
      },
      required: ["domain"],
    },
  },
  {
    name: "query_dns",
    description:
      "Performs live DNS resolution queries using Cloudflare DNS-over-HTTPS (DoH) for records like A, AAAA, CNAME, MX, TXT, NS, CAA",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          description: "The domain name to inspect (e.g. wolrdpulse.app)",
        },
        recordType: {
          type: "string",
          description: "DNS Record Type: A, AAAA, CNAME, MX, TXT, NS, SOA, CAA. Defaults to 'A'.",
        },
      },
      required: ["domain"],
    },
  },
  {
    name: "inspect_dns",
    description:
      "Alias for query_dns. Performs live DNS-over-HTTPS queries via Cloudflare 1.1.1.1",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          description: "The domain name to inspect (e.g. wolrdpulse.app)",
        },
        recordType: {
          type: "string",
          description: "DNS Record Type: A, AAAA, CNAME, MX, TXT, NS, SOA. Defaults to 'A'.",
        },
      },
      required: ["domain"],
    },
  },
  {
    name: "ping_endpoint",
    description:
      "Ping any HTTP/HTTPS URL or API endpoint to measure response time (TTFB), HTTP status code, and inspect headers",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          description: "Target URL or hostname to ping (e.g. https://api.github.com)",
        },
      },
      required: ["url"],
    },
  },
  {
    name: "get_tech_pulse",
    description:
      "Returns the latest major open-source releases (Kubernetes, Docker, Bun, Next.js, Go, Rust) and trending developer repositories",
    inputSchema: {
      type: "object",
      properties: {},
    },
  },
];

async function handleRpcRequest(body: any) {
  const { id, method, params } = body;

  switch (method) {
    case "initialize":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: "2024-11-05",
          capabilities: {
            tools: {
              listChanged: false,
            },
            logging: {},
          },
          serverInfo: {
            name: "wolrdpulse-mcp",
            version: "1.0.0",
            description: "WorldPulse Real-Time Cloud & DevOps Intelligence Server",
          },
        },
      };

    case "notifications/initialized":
      return null;

    case "ping":
      return {
        jsonrpc: "2.0",
        id,
        result: {},
      };

    case "tools/list":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          tools: MCP_TOOLS,
        },
      };

    case "tools/call": {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};

      try {
        if (toolName === "get_cloud_status") {
          const provider = toolArgs.provider;
          let resultData;
          if (provider) {
            resultData = await fetchSingleCloudStatus(provider);
            if (!resultData) {
              return {
                jsonrpc: "2.0",
                id,
                result: {
                  content: [
                    {
                      type: "text",
                      text: `Provider "${provider}" not found. Supported: aws, github, cloudflare, openai, anthropic, vercel, supabase, npm, discord, reddit, datadog.`,
                    },
                  ],
                  isError: true,
                },
              };
            }
          } else {
            resultData = await fetchAllCloudStatus();
          }

          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(resultData, null, 2),
                },
              ],
            },
          };
        }

        if (toolName === "inspect_ssl") {
          const domain = toolArgs.domain;
          if (!domain) throw new Error("Argument 'domain' is required");
          const sslResult = await inspectSslCertificate(domain);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(sslResult, null, 2),
                },
              ],
            },
          };
        }

        if (toolName === "inspect_dns" || toolName === "query_dns") {
          const domain = toolArgs.domain;
          const recordType = toolArgs.recordType || "A";
          if (!domain) throw new Error("Argument 'domain' is required");
          const dnsResult = await inspectDns(domain, recordType);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(dnsResult, null, 2),
                },
              ],
            },
          };
        }

        if (toolName === "ping_endpoint") {
          const url = toolArgs.url;
          if (!url) throw new Error("Argument 'url' is required");
          const pingResult = await pingEndpoint(url);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(pingResult, null, 2),
                },
              ],
            },
          };
        }

        if (toolName === "get_tech_pulse") {
          const [releases, trending] = await Promise.all([
            fetchLatestReleases(),
            fetchTrendingTopics(),
          ]);
          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify({ releases, trending }, null, 2),
                },
              ],
            },
          };
        }

        return {
          jsonrpc: "2.0",
          id,
          error: {
            code: -32601,
            message: `Tool not found: ${toolName}`,
          },
        };
      } catch (err: any) {
        return {
          jsonrpc: "2.0",
          id,
          result: {
            content: [{ type: "text", text: `Tool execution failed: ${err.message}` }],
            isError: true,
          },
        };
      }
    }

    default:
      return {
        jsonrpc: "2.0",
        id,
        error: {
          code: -32601,
          message: `Method not found: ${method}`,
        },
      };
  }
}

// GET: Connect via SSE
export async function GET(request: NextRequest) {
  const sessionId = crypto.randomUUID();

  const stream = new TransformStream();
  const writer = stream.writable.getWriter();
  const encoder = new TextEncoder();

  const sendEvent = (event: string, data: string) => {
    writer.write(encoder.encode(`event: ${event}\ndata: ${data}\n\n`));
  };

  sseClients.set(sessionId, (data) => {
    writer.write(encoder.encode(`event: message\ndata: ${data}\n\n`));
  });

  // Emit the endpoint event pointing back to this route with sessionId
  setTimeout(() => {
    sendEvent("endpoint", `/api/mcp?sessionId=${sessionId}`);
  }, 50);

  request.signal.addEventListener("abort", () => {
    sseClients.delete(sessionId);
    writer.close();
  });

  return new Response(stream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// POST: Handle JSON-RPC request from MCP clients
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("sessionId");

  try {
    const body = await request.json();
    const response = await handleRpcRequest(body);

    if (!response) {
      return new NextResponse(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // If an SSE client is listening with this sessionId, broadcast via SSE as well
    if (sessionId && sseClients.has(sessionId)) {
      const sendToSse = sseClients.get(sessionId);
      sendToSse?.(JSON.stringify(response));
    }

    return NextResponse.json(response, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        jsonrpc: "2.0",
        error: {
          code: -32700,
          message: error.message || "Parse error",
        },
      },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
