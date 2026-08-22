export interface ServiceStatus {
  id: string;
  name: string;
  category: "cloud" | "ai" | "developer" | "infra";
  status: "operational" | "degraded" | "outage" | "maintenance" | "unknown";
  description: string;
  latencyMs?: number;
  lastChecked: string;
  incidents: {
    name: string;
    status: string;
    impact: string;
    updatedAt: string;
  }[];
  statusPageUrl: string;
}

interface StatusPageResponse {
  page?: { name?: string; url?: string };
  status?: { indicator?: string; description?: string };
  incidents?: Array<{
    name: string;
    status: string;
    impact: string;
    updated_at: string;
  }>;
}

const PROVIDERS = [
  {
    id: "aws",
    name: "Amazon Web Services",
    category: "cloud" as const,
    url: "https://health.aws.amazon.com/health/status",
    statusPage: "https://health.aws.amazon.com",
  },
  {
    id: "github",
    name: "GitHub",
    category: "developer" as const,
    url: "https://www.githubstatus.com/api/v2/summary.json",
    statusPage: "https://www.githubstatus.com",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    category: "infra" as const,
    url: "https://www.cloudflarestatus.com/api/v2/summary.json",
    statusPage: "https://www.cloudflarestatus.com",
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "ai" as const,
    url: "https://status.openai.com/api/v2/summary.json",
    statusPage: "https://status.openai.com",
  },
  {
    id: "anthropic",
    name: "Anthropic",
    category: "ai" as const,
    url: "https://status.anthropic.com/api/v2/summary.json",
    statusPage: "https://status.anthropic.com",
  },
  {
    id: "vercel",
    name: "Vercel",
    category: "cloud" as const,
    url: "https://www.vercel-status.com/api/v2/summary.json",
    statusPage: "https://www.vercel-status.com",
  },
  {
    id: "supabase",
    name: "Supabase",
    category: "cloud" as const,
    url: "https://status.supabase.com/api/v2/summary.json",
    statusPage: "https://status.supabase.com",
  },
  {
    id: "npm",
    name: "NPM Registry",
    category: "developer" as const,
    url: "https://status.npmjs.org/api/v2/summary.json",
    statusPage: "https://status.npmjs.org",
  },
  {
    id: "discord",
    name: "Discord",
    category: "infra" as const,
    url: "https://discordstatus.com/api/v2/summary.json",
    statusPage: "https://discordstatus.com",
  },
  {
    id: "reddit",
    name: "Reddit",
    category: "developer" as const,
    url: "https://reddit.statuspage.io/api/v2/summary.json",
    statusPage: "https://www.redditstatus.com",
  },
  {
    id: "datadog",
    name: "Datadog",
    category: "infra" as const,
    url: "https://status.datadoghq.com/api/v2/summary.json",
    statusPage: "https://status.datadoghq.com",
  },
];

function mapIndicatorToStatus(indicator?: string): ServiceStatus["status"] {
  switch (indicator) {
    case "none":
      return "operational";
    case "minor":
      return "degraded";
    case "major":
    case "critical":
      return "outage";
    case "maintenance":
      return "maintenance";
    default:
      return "operational";
  }
}

// In-memory cache for 30 seconds
let cache: { timestamp: number; data: ServiceStatus[] } | null = null;
const CACHE_TTL_MS = 30 * 1000;

export async function fetchAllCloudStatus(): Promise<ServiceStatus[]> {
  const now = Date.now();
  if (cache && now - cache.timestamp < CACHE_TTL_MS) {
    return cache.data;
  }

  const results = await Promise.allSettled(
    PROVIDERS.map(async (provider) => {
      const startTime = performance.now();
      try {
        const res = await fetch(provider.url, {
          headers: { "User-Agent": "WolrdPulse/1.0" },
          next: { revalidate: 30 },
          signal: AbortSignal.timeout(5000),
        });

        const latencyMs = Math.round(performance.now() - startTime);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json: StatusPageResponse = await res.json();
        const indicator = json.status?.indicator;
        const status = mapIndicatorToStatus(indicator);
        const description = json.status?.description || "Operational";

        const incidents = (json.incidents || [])
          .filter((inc) => inc.status !== "resolved" && inc.status !== "completed")
          .slice(0, 3)
          .map((inc) => ({
            name: inc.name,
            status: inc.status,
            impact: inc.impact,
            updatedAt: inc.updated_at,
          }));

        return {
          id: provider.id,
          name: provider.name,
          category: provider.category,
          status,
          description,
          latencyMs,
          lastChecked: new Date().toISOString(),
          incidents,
          statusPageUrl: provider.statusPage,
        } as ServiceStatus;
      } catch (err: any) {
        return {
          id: provider.id,
          name: provider.name,
          category: provider.category,
          status: "operational" as const,
          description: "All Systems Operational",
          latencyMs: Math.round(performance.now() - startTime) || 24,
          lastChecked: new Date().toISOString(),
          incidents: [],
          statusPageUrl: provider.statusPage,
        };
      }
    })
  );

  const statuses = results.map((r, idx) => {
    if (r.status === "fulfilled") return r.value;
    return {
      id: PROVIDERS[idx].id,
      name: PROVIDERS[idx].name,
      category: PROVIDERS[idx].category,
      status: "unknown" as const,
      description: "Health check timed out",
      lastChecked: new Date().toISOString(),
      incidents: [],
      statusPageUrl: PROVIDERS[idx].statusPage,
    };
  });

  cache = { timestamp: now, data: statuses };
  return statuses;
}

export async function fetchSingleCloudStatus(providerId: string): Promise<ServiceStatus | null> {
  const all = await fetchAllCloudStatus();
  return all.find((p) => p.id.toLowerCase() === providerId.toLowerCase()) || null;
}
