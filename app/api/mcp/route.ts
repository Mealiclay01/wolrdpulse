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
      "Retrieve real-time operational status, incident summaries, and latency metrics across major developer and cloud infrastructure providers (AWS, GitHub, Cloudflare, OpenAI, Anthropic, Vercel, Supabase, NPM, Discord, Reddit, and Datadog). Returns overall health state, individual component statuses, and active incident details.",
    inputSchema: {
      type: "object",
      properties: {
        provider: {
          type: "string",
          description:
            "Optional identifier of a single cloud or developer platform to query. If omitted, returns real-time status across all 11 monitored providers.",
          enum: [
            "aws",
            "github",
            "cloudflare",
            "openai",
            "anthropic",
            "vercel",
            "supabase",
            "npm",
            "discord",
            "reddit",
            "datadog",
          ],
          examples: ["github", "aws", "openai", "vercel"],
        },
      },
    },
  },
  {
    name: "inspect_ssl",
    description:
      "Connects securely via TLS socket to inspect an endpoint's SSL/TLS certificate chain. Returns certificate validity, exact expiration date, remaining valid days, issuer organization, subject common name, SHA-256 fingerprint, and serial number.",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          description:
            "Fully qualified domain name (FQDN) or hostname to probe for TLS certificate details (e.g. 'api.github.com' or 'wolrdpulse.app'). Do not include protocol prefixes.",
          minLength: 3,
          pattern: "^[a-zA-Z0-9.-]+$",
          examples: ["api.github.com", "wolrdpulse.app", "openai.com"],
        },
      },
      required: ["domain"],
    },
  },
  {
    name: "query_dns",
    description:
      "Performs live DNS resolution queries using Cloudflare DNS-over-HTTPS (DoH 1.1.1.1). Resolves standard DNS Resource Record types (A, AAAA, CNAME, MX, TXT, NS, SOA, CAA) and returns authoritative answers, TTL values, and resolution latency.",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          description:
            "The target domain name or hostname to query via DNS-over-HTTPS.",
          minLength: 3,
          pattern: "^[a-zA-Z0-9.-]+$",
          examples: ["wolrdpulse.app", "github.com", "vercel.com"],
        },
        recordType: {
          type: "string",
          description:
            "The DNS Resource Record type to query. Defaults to 'A'.",
          enum: ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA", "CAA"],
          default: "A",
          examples: ["A", "CNAME", "MX", "TXT"],
        },
      },
      required: ["domain"],
    },
  },
  {
    name: "inspect_dns",
    description:
      "Alias for query_dns. Resolves live DNS records via Cloudflare DNS-over-HTTPS (1.1.1.1) to diagnose domain propagation, mail exchange routing, or ownership verification records.",
    inputSchema: {
      type: "object",
      properties: {
        domain: {
          type: "string",
          description:
            "The target domain name or hostname to query via DNS-over-HTTPS.",
          minLength: 3,
          pattern: "^[a-zA-Z0-9.-]+$",
          examples: ["wolrdpulse.app", "github.com", "vercel.com"],
        },
        recordType: {
          type: "string",
          description:
            "The DNS Resource Record type to query. Defaults to 'A'.",
          enum: ["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA", "CAA"],
          default: "A",
          examples: ["A", "CNAME", "MX", "TXT"],
        },
      },
      required: ["domain"],
    },
  },
  {
    name: "ping_endpoint",
    description:
      "Pings a public HTTP or HTTPS web service or API endpoint to measure Time-To-First-Byte (TTFB) latency, HTTP response status code, status message, and inspect diagnostic HTTP headers (Cloudflare ray, server, cache-control, HSTS).",
    inputSchema: {
      type: "object",
      properties: {
        url: {
          type: "string",
          format: "uri",
          description:
            "The full HTTP or HTTPS URL to ping (e.g. 'https://api.github.com' or 'https://wolrdpulse.app').",
          minLength: 8,
          examples: [
            "https://api.github.com",
            "https://wolrdpulse.app",
            "https://api.openai.com/v1/models",
          ],
        },
      },
      required: ["url"],
    },
  },
  {
    name: "get_tech_pulse",
    description:
      "Fetches real-time developer ecosystem intelligence: latest stable releases of major infrastructure software and developer tools (Kubernetes, Docker, Bun, Next.js, Go, Rust), alongside trending developer repositories on GitHub.",
    inputSchema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          description:
            "Filter technology pulse data by category. Choose 'all' for complete release and trending digest, 'releases' for software version updates, or 'trending' for developer repositories.",
          enum: ["all", "releases", "trending"],
          default: "all",
          examples: ["all", "releases", "trending"],
        },
        limit: {
          type: "integer",
          description: "Maximum number of items to return in the feed.",
          minimum: 1,
          maximum: 50,
          default: 10,
          examples: [5, 10, 20],
        },
      },
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
          const category = toolArgs.category || "all";
          const limit =
            typeof toolArgs.limit === "number"
              ? Math.max(1, Math.min(50, toolArgs.limit))
              : 10;

          let releases: any[] = [];
          let trending: any[] = [];

          if (category === "all" || category === "releases") {
            const relData = await fetchLatestReleases();
            releases = relData.slice(0, limit);
          }
          if (category === "all" || category === "trending") {
            const trendData = await fetchTrendingTopics();
            trending = trendData.slice(0, limit);
          }

          const responseData =
            category === "releases"
              ? { releases }
              : category === "trending"
              ? { trending }
              : { releases, trending };

          return {
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                {
                  type: "text",
                  text: JSON.stringify(responseData, null, 2),
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
