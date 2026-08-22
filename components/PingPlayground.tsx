"use client";

import React, { useState } from "react";
import { PingResult } from "@/lib/services/network";
import { formatMs } from "@/lib/utils";

export default function PingPlayground() {
  const [url, setUrl] = useState("https://api.github.com");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePing = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to execute ping");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlePing} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.domain.com"
          className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-md px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--foreground)] text-[var(--background)] px-6 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
        >
          {loading ? "Pinging..." : "Execute"}
        </button>
      </form>

      {error && (
        <div className="mt-4 rounded-md bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
          Error: {error}
        </div>
      )}

      {result && (
        <div className="mt-6 border border-[var(--border)] rounded-lg overflow-hidden">
          <div className="bg-[var(--muted)] px-4 py-2 flex justify-between border-b border-[var(--border)] font-mono text-xs font-semibold">
            <span>HTTP {result.statusCode} {result.statusText}</span>
            <span>TTFB: {formatMs(result.totalTimeMs)}</span>
          </div>
          
          <div className="p-4 overflow-x-auto bg-[var(--background)]">
            <table className="w-full text-left font-mono text-xs">
              <tbody>
                {Object.entries(result.headers).slice(0, 8).map(([key, val]) => (
                  <tr key={key}>
                    <td className="pr-4 py-1.5 text-[var(--muted-foreground)] w-1/3">{key}</td>
                    <td className="py-1.5 truncate max-w-xs">{val as string}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
