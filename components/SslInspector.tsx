"use client";

import React, { useState } from "react";
import { Shield, ArrowRight, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { useToast } from "./Toast";

export default function SslInspector() {
  const [domain, setDomain] = useState("wolrdpulse.app");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLookup = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!domain.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/ssl?domain=${encodeURIComponent(domain)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setResult(null);
        toast({
          type: "error",
          message: "SSL Inspection Failed",
          description: data.error,
        });
      } else {
        setResult(data);
        toast({
          type: "success",
          message: `SSL Valid for ${data.daysRemaining} days`,
          description: `Issued by ${data.issuer.O || data.issuer.CN}`,
        });
      }
    } catch (err: any) {
      setError(err.message || "Failed to inspect SSL");
      setResult(null);
      toast({
        type: "error",
        message: "SSL Error",
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
        <button
          type="submit"
          disabled={loading}
          className="bg-[var(--foreground)] text-[var(--background)] px-6 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          {loading ? "Inspecting..." : "Check SSL"}
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
            <span className="flex items-center gap-1.5">
              <Shield size={14} className={result.daysRemaining > 30 ? "text-green-500" : "text-amber-500"} />
              {result.subject.CN}
            </span>
            <span className={result.daysRemaining > 30 ? "text-green-500" : "text-amber-500"}>
              {result.daysRemaining} days left
            </span>
          </div>
          
          <div className="p-4 overflow-x-auto bg-[var(--background)]">
            <table className="w-full text-left font-mono text-xs">
              <tbody>
                <tr className="border-b border-[var(--border)]">
                  <td className="pr-4 py-2 text-[var(--foreground)] font-semibold w-1/4">Issuer</td>
                  <td className="py-2 text-[var(--muted-foreground)]">{result.issuer.O || result.issuer.CN}</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="pr-4 py-2 text-[var(--foreground)] font-semibold w-1/4">Valid From</td>
                  <td className="py-2 text-[var(--muted-foreground)]">{new Date(result.valid_from).toLocaleString()}</td>
                </tr>
                <tr className="border-b border-[var(--border)]">
                  <td className="pr-4 py-2 text-[var(--foreground)] font-semibold w-1/4">Valid To</td>
                  <td className="py-2 text-[var(--muted-foreground)]">{new Date(result.valid_to).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="pr-4 py-2 text-[var(--foreground)] font-semibold w-1/4">Fingerprint</td>
                  <td className="py-2 text-[var(--muted-foreground)] break-all">{result.fingerprint}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
