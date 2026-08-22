export interface TechRelease {
  repo: string;
  name: string;
  version: string;
  publishedAt: string;
  htmlUrl: string;
  description: string;
}

export interface TrendingRepo {
  name: string;
  owner: string;
  stars: number;
  description: string;
  language: string;
  url: string;
}

const TRACKED_REPOS = [
  "kubernetes/kubernetes",
  "docker/compose",
  "vercel/next.js",
  "facebook/react",
  "tailwindlabs/tailwindcss",
  "oven-sh/bun",
  "golang/go",
  "rust-lang/rust",
  "astral-sh/uv",
  "modelcontextprotocol/servers",
];

// In-memory cache for 5 minutes
let releaseCache: { timestamp: number; data: TechRelease[] } | null = null;

export async function fetchLatestReleases(): Promise<TechRelease[]> {
  const now = Date.now();
  if (releaseCache && now - releaseCache.timestamp < 5 * 60 * 1000) {
    return releaseCache.data;
  }

  const results = await Promise.allSettled(
    TRACKED_REPOS.map(async (repo) => {
      const res = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
        headers: {
          "User-Agent": "WolrdPulse/1.0",
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(5000),
      });

      if (!res.ok) {
        throw new Error(`GitHub API HTTP ${res.status}`);
      }

      const json = await res.json();
      return {
        repo,
        name: json.name || json.tag_name || repo.split("/")[1],
        version: json.tag_name,
        publishedAt: json.published_at,
        htmlUrl: json.html_url,
        description: (json.body || "").slice(0, 180) + "...",
      } as TechRelease;
    })
  );

  const releases: TechRelease[] = [];
  results.forEach((r) => {
    if (r.status === "fulfilled") {
      releases.push(r.value);
    }
  });

  // Sort newest first
  releases.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  releaseCache = { timestamp: now, data: releases };
  return releases;
}

export async function fetchTrendingTopics(): Promise<TrendingRepo[]> {
  try {
    const res = await fetch(
      "https://api.github.com/search/repositories?q=stars:>1000+pushed:>2026-08-01&sort=stars&order=desc&per_page=6",
      {
        headers: {
          "User-Agent": "WolrdPulse/1.0",
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 600 },
        signal: AbortSignal.timeout(5000),
      }
    );

    if (!res.ok) return [];

    const json = await res.json();
    return (json.items || []).map((item: any) => ({
      name: item.name,
      owner: item.owner?.login || "",
      stars: item.stargazers_count,
      description: item.description || "",
      language: item.language || "TypeScript",
      url: item.html_url,
    }));
  } catch {
    return [];
  }
}
