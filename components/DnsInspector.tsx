"use client";

import React, { useState } from "react";
import { DnsResult } from "@/lib/services/network";
import { Network, ArrowRight, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { formatMs } from "@/lib/utils";
import { useToast } from "./Toast";

export default function DnsInspector() {
  const [domain, setDomain] = useState("wolrdpulse.app");
  const [recordType, setRecordType] = useState("A");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DnsResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/dns?domain=${encodeURIComponent(domain)}&type=${encodeURIComponent(recordType)}`
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setResult(null);
        toast({
          type: "error",
          message: "DNS Lookup Failed",
          description: data.error,
        });
      } else {
        setResult(data);
        toast({
          type: "success",
          message: `DNS Query Complete (${data.rawResponseTimeMs}ms)`,
          description: `Found ${data.answers.length} ${recordType} record(s)`,
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to inspect DNS");
      setResult(null);
      toast({
        type: "error",
        message: "DNS Error",
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-md px-4 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        />
        <select
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
          className="bg-[var(--background)] border border-[var(--border)] rounded-md px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
        >
          {["A", "AAAA", "CNAME", "MX", "TXT", "NS", "SOA", "CAA"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--foreground)] text-[var(--background)] px-6 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
        >
          {loading ? "Querying..." : "Lookup"}
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
            <span>{result.domain} ({result.recordType})</span>
            <span>Time: {formatMs(result.rawResponseTimeMs)}</span>
          </div>
          
          <div className="p-4 overflow-x-auto bg-[var(--background)]">
            {result.answers.length === 0 ? (
              <div className="text-xs text-[var(--muted-foreground)] italic">
                No {result.recordType} records found.
              </div>
            ) : (
              <table className="w-full text-left font-mono text-xs">
                <tbody>
                  {result.answers.map((ans, idx) => (
                    <tr key={idx} className="border-b border-[var(--border)] last:border-0">
                      <td className="pr-4 py-1.5 text-[var(--foreground)] font-semibold w-1/4">{ans.typeName}</td>
                      <td className="py-1.5 text-[var(--muted-foreground)] break-all">{ans.data}</td>
                      <td className="pl-4 py-1.5 text-[var(--muted-foreground)] text-right w-1/4">TTL: {ans.TTL}s</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
