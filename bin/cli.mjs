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
    instructions:
      "WolrdPulse checks public infrastructure before a coding agent changes a deploy. Call get_cloud_status for AWS, Vercel, or GitHub incidents, inspect_ssl for certificate expiry, query_dns for a DNS-over-HTTPS answer, and ping_endpoint for one HTTP timing sample. No API key. The config key is wolrdpulse.",
  }
);

// Define tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
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
      const category = args?.category || "all";
      const limit = typeof args?.limit === "number" ? args.limit : 10;
      const res = await fetch(`${BASE_API_URL}/api/pulse`);
      const data = await res.json();
      const resultData = {};
      if (category === "all" || category === "releases") {
        resultData.releases = (data.releases || []).slice(0, limit);
      }
      if (category === "all" || category === "trending") {
        resultData.trending = (data.trending || []).slice(0, limit);
      }
      return {
        content: [{ type: "text", text: JSON.stringify(resultData, null, 2) }],
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
