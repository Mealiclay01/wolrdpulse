import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { fetchAllCloudStatus, fetchSingleCloudStatus } from "../services/cloudStatus";
import { pingEndpoint, inspectDns } from "../services/network";
import { fetchLatestReleases, fetchTrendingTopics } from "../services/techPulse";

export function createWorldPulseMcpServer() {
  const server = new McpServer({
    name: "wolrdpulse-mcp",
    version: "1.0.0",
  });

  // Tool 1: Cloud & API Status
  server.tool(
    "get_cloud_status",
    "Get real-time operational status, latency, and incident reports for major cloud and developer services (AWS, Cloudflare, GitHub, OpenAI, Anthropic, Vercel, Supabase, NPM, Docker)",
    {
      provider: z
        .string()
        .optional()
        .describe(
          "Optional specific provider: github, cloudflare, openai, anthropic, vercel, supabase, npm, docker, datadog. If omitted, returns all providers."
        ),
    },
    async ({ provider }) => {
      try {
        if (provider) {
          const single = await fetchSingleCloudStatus(provider);
          if (!single) {
            return {
              content: [
                {
                  type: "text",
                  text: `Provider "${provider}" not found. Supported: github, cloudflare, openai, anthropic, vercel, supabase, npm, docker, datadog.`,
                },
              ],
            };
          }
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(single, null, 2),
              },
            ],
          };
        }

        const all = await fetchAllCloudStatus();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(all, null, 2),
            },
          ],
        };
      } catch (err: any) {
        return {
          content: [{ type: "text", text: `Error fetching cloud status: ${err.message}` }],
          isError: true,
        };
      }
    }
  );

  // Tool 2: Ping / Latency Test
  server.tool(
    "ping_endpoint",
    "Pings an HTTP/HTTPS endpoint or website to measure response time (TTFB), HTTP status code, and inspect headers",
    {
      url: z.string().describe("The URL or hostname to ping (e.g. https://api.github.com)"),
    },
    async ({ url }) => {
      try {
        const result = await pingEndpoint(url);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (err: any) {
        return {
          content: [{ type: "text", text: `Error pinging endpoint: ${err.message}` }],
          isError: true,
        };
      }
    }
  );

  // Tool 3: DNS Inspector
  server.tool(
    "inspect_dns",
    "Performs live DNS resolution queries using Cloudflare DNS-over-HTTPS (DoH) for records like A, AAAA, CNAME, MX, TXT, NS",
    {
      domain: z.string().describe("The domain name to look up (e.g. example.com)"),
      recordType: z
        .string()
        .optional()
        .describe("Record type: A, AAAA, CNAME, MX, TXT, NS, CAA, SOA. Defaults to A."),
    },
    async ({ domain, recordType = "A" }) => {
      try {
        const result = await inspectDns(domain, recordType);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      } catch (err: any) {
        return {
          content: [{ type: "text", text: `Error inspecting DNS: ${err.message}` }],
          isError: true,
        };
      }
    }
  );

  // Tool 4: Tech Releases & Trends
  server.tool(
    "get_tech_pulse",
    "Returns the latest major open-source releases (Kubernetes, Docker, Bun, Next.js, Go, Rust) and trending developer repositories",
    {},
    async () => {
      try {
        const [releases, trending] = await Promise.all([
          fetchLatestReleases(),
          fetchTrendingTopics(),
        ]);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ releases, trending }, null, 2),
            },
          ],
        };
      } catch (err: any) {
        return {
          content: [{ type: "text", text: `Error fetching tech pulse: ${err.message}` }],
          isError: true,
        };
      }
    }
  );

  return server;
}
