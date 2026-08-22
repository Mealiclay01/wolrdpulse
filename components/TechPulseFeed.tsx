"use client";

import React, { useState, useEffect } from "react";
import { TechRelease, TrendingRepo } from "@/lib/services/techPulse";
import { formatTimeAgo } from "@/lib/utils";

export default function TechPulseFeed() {
  const [releases, setReleases] = useState<TechRelease[]>([]);
  const [trending, setTrending] = useState<TrendingRepo[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTechPulse = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pulse");
      const data = await res.json();
      if (data.releases) setReleases(data.releases);
      if (data.trending) setTrending(data.trending);
    } catch (err) {
      console.error("Failed to fetch tech pulse:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTechPulse();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Releases */}
      <div>
        <h3 className="text-xs font-semibold uppercase text-[var(--muted-foreground)] mb-4 tracking-wider">Releases</h3>
        <ul className="flex flex-col">
          {loading && releases.length === 0 ? (
            <li className="py-4 text-sm text-[var(--muted-foreground)]">Loading...</li>
          ) : (
            releases.map((rel, idx) => (
              <li key={idx} className="py-3 border-b border-[var(--border)] flex justify-between items-start gap-4 hover:bg-[var(--muted)] -mx-4 px-4 transition-colors rounded-lg">
                <div className="text-sm">
                  <a href={rel.htmlUrl} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                    {rel.repo}
                  </a>
                  <div className="text-[var(--muted-foreground)] mt-1 truncate max-w-[200px] text-xs">{rel.description}</div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="bg-[var(--foreground)] text-[var(--background)] px-2 py-0.5 rounded-full text-[10px] font-semibold font-mono mb-1">
                    {rel.version}
                  </span>
                  <span className="text-[10px] text-[var(--muted-foreground)]">{formatTimeAgo(rel.publishedAt)}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Trending */}
      <div>
        <h3 className="text-xs font-semibold uppercase text-[var(--muted-foreground)] mb-4 tracking-wider">Trending Repos</h3>
        <ul className="flex flex-col">
          {loading && trending.length === 0 ? (
            <li className="py-4 text-sm text-[var(--muted-foreground)]">Loading...</li>
          ) : (
            trending.slice(0, 5).map((repo, idx) => (
              <li key={idx} className="py-3 border-b border-[var(--border)] flex justify-between items-start gap-4 hover:bg-[var(--muted)] -mx-4 px-4 transition-colors rounded-lg">
                <div className="text-sm">
                  <a href={repo.url} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                    {repo.owner}/{repo.name}
                  </a>
                  <div className="text-[var(--muted-foreground)] mt-1 line-clamp-2 pr-4 text-xs">{repo.description}</div>
                </div>
                <div className="text-right flex flex-col items-end shrink-0">
                  <span className="text-[var(--foreground)] font-semibold text-xs font-mono mb-1">
                    ★ {repo.stars.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-mono border border-[var(--border)] rounded px-1.5 text-[var(--muted-foreground)]">{repo.language}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
