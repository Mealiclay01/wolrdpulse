#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const BASE_API_URL = process.env.WORLDPULSE_API_URL || "https://wolrdpulse.app";

const server = new Server(
  {
    name: "wolrdpulse-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_cloud_status",
        description:
          "Get real-time operational status and incidents for AWS, Vercel, GitHub, Cloudflare, OpenAI, Anthropic, Supabase, NPM, and Datadog.",
        inputSchema: {
          type: "object",
          properties: {
            provider: {
              type: "string",
              description:
                "Optional provider filter: 'aws', 'github', 'cloudflare', 'openai', 'anthropic', 'vercel', 'supabase', 'npm', 'discord', 'reddit', 'datadog'.",
            },
          },
        },
      },
      {
        name: "inspect_ssl",
        description:
          "Inspects TLS certificate expiration, issuer, validity, and fingerprint for any domain.",
        inputSchema: {
          type: "object",
          properties: {
            domain: {
              type: "string",
              description: "The hostname or domain to inspect (e.g. api.github.com)",
            },
          },
          required: ["domain"],
        },
      },
      {
        name: "query_dns",
        description:
          "Queries Cloudflare DNS-over-HTTPS (1.1.1.1) for A, AAAA, CNAME, MX, TXT, NS records.",
        inputSchema: {
          type: "object",
          properties: {
            domain: {
              type: "string",
              description: "The domain name to query (e.g. wolrdpulse.app)",
            },
            recordType: {
              type: "string",
              description: "Record type: A, AAAA, CNAME, MX, TXT, NS. Defaults to 'A'.",
            },
          },
          required: ["domain"],
        },
      },
      {
        name: "ping_endpoint",
        description:
          "Measures TTFB response time, status code, and headers for any public HTTP/HTTPS endpoint.",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "Target URL to ping (e.g. https://api.github.com)",
            },
          },
          required: ["url"],
        },
      },
      {
        name: "get_tech_pulse",
        description:
          "Fetches latest framework releases (Kubernetes, Docker, Next.js, Rust, Go) and trending repositories.",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "get_cloud_status") {
      const provider = args?.provider ? `?provider=${encodeURIComponent(String(args.provider))}` : "";
      const res = await fetch(`${BASE_API_URL}/api/status${provider}`);
      const data = await res.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }

    if (name === "inspect_ssl") {
      const domain = args?.domain ? encodeURIComponent(String(args.domain)) : "";
      const res = await fetch(`${BASE_API_URL}/api/ssl?domain=${domain}`);
      const data = await res.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }

    if (name === "query_dns" || name === "inspect_dns") {
      const domain = args?.domain ? encodeURIComponent(String(args.domain)) : "";
      const recordType = args?.recordType ? encodeURIComponent(String(args.recordType)) : "A";
      const res = await fetch(`${BASE_API_URL}/api/dns?domain=${domain}&type=${recordType}`);
      const data = await res.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }

    if (name === "ping_endpoint") {
      const res = await fetch(`${BASE_API_URL}/api/ping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: args?.url }),
      });
      const data = await res.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }

    if (name === "get_tech_pulse") {
      const res = await fetch(`${BASE_API_URL}/api/pulse`);
      const data = await res.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }

    return {
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
      isError: true,
    };
  } catch (err) {
    return {
      content: [{ type: "text", text: `Error executing ${name}: ${err.message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("WolrdPulse MCP Stdio Server running.");
}

main().catch((err) => {
  console.error("Fatal error in WolrdPulse MCP Server:", err);
  process.exit(1);
});
