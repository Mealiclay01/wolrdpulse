"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import CloudStatusGrid from "@/components/CloudStatusGrid";
import SslInspector from "@/components/SslInspector";
import DnsInspector from "@/components/DnsInspector";
import PingPlayground from "@/components/PingPlayground";
import TechPulseFeed from "@/components/TechPulseFeed";
import { ToastProvider } from "@/components/Toast";
import Link from "next/link";
import { 
  Activity, 
  Shield, 
  Network, 
  Zap, 
  Terminal, 
  Cpu, 
  Copy, 
  CheckCircle2, 
  ArrowRight,
  Code2
} from "lucide-react";

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "status" | "ssl" | "dns" | "ping" | "pulse">("all");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const mcpTools = [
    {
      name: "get_cloud_status",
      description: "Fetches live health & incident status for AWS, Vercel, and GitHub infrastructure.",
      example: `{ "method": "tools/call", "params": { "name": "get_cloud_status" } }`
    },
    {
      name: "inspect_ssl",
      description: "Analyzes TLS certificates, expiration dates, and issuer chains for any host.",
      example: `{ "method": "tools/call", "params": { "name": "inspect_ssl", "arguments": { "domain": "github.com" } } }`
    },
    {
      name: "query_dns",
      description: "Executes DNS-over-HTTPS queries via Cloudflare 1.1.1.1 (A, AAAA, CNAME, MX, TXT).",
      example: `{ "method": "tools/call", "params": { "name": "query_dns", "arguments": { "domain": "vercel.com", "type": "A" } } }`
    },
    {
      name: "ping_endpoint",
      description: "Sends synthetic HTTP probes to test edge latency and retrieve response headers.",
      example: `{ "method": "tools/call", "params": { "name": "ping_endpoint", "arguments": { "url": "https://api.openai.com" } } }`
    }
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)]">
        {/* Navigation */}
        <Navbar />

        <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Header Section */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)]">
              <span>MCP Tool Suite & Edge Telemetry</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Telemetry Features & Live Tools
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              Every tool below is accessible interactively in your browser, or autonomously by AI agents (Claude, Cursor, Windsurf) through the WolrdPulse Model Context Protocol server.
            </p>
          </div>

          {/* Feature Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] pb-4 text-xs font-medium">
            {[
              { id: "all", label: "All Telemetry Tools" },
              { id: "status", label: "Cloud Status" },
              { id: "ssl", label: "SSL Inspector" },
              { id: "dns", label: "DNS Resolver" },
              { id: "ping", label: "Edge Ping" },
              { id: "pulse", label: "Framework Pulse" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-[var(--foreground)] text-[var(--background)] font-semibold shadow-sm"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Interactive Tools Grid */}
          <div className="space-y-10">
            
            {/* 1. Cloud Infrastructure Status */}
            {(activeTab === "all" || activeTab === "status") && (
              <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Activity size={18} className="text-blue-500" />
                      Live Cloud Infrastructure Status
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Aggregated real-time outage metrics and operational health across primary cloud providers.
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)] self-start sm:self-auto">
                    tool: get_cloud_status
                  </span>
                </div>
                <CloudStatusGrid />
              </section>
            )}

            {/* 2. SSL & TLS Certificate Inspector */}
            {(activeTab === "all" || activeTab === "ssl") && (
              <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Shield size={18} className="text-emerald-500" />
                      SSL & TLS Certificate Inspector
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Performs native TLS handshakes to verify certificate expiration, issuer authority, and chain integrity.
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)] self-start sm:self-auto">
                    tool: inspect_ssl
                  </span>
                </div>
                <SslInspector />
              </section>
            )}

            {/* 3. DNS-over-HTTPS Resolver */}
            {(activeTab === "all" || activeTab === "dns") && (
              <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Network size={18} className="text-indigo-500" />
                      DNS-over-HTTPS (DoH) Resolver
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Queries global DNS records via Cloudflare's 1.1.1.1 engine for instant propagation debugging.
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)] self-start sm:self-auto">
                    tool: query_dns
                  </span>
                </div>
                <DnsInspector />
              </section>
            )}

            {/* 4. Global Edge Diagnostic Console */}
            {(activeTab === "all" || activeTab === "ping") && (
              <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Zap size={18} className="text-amber-500" />
                      Synthetic Edge Ping & Latency Probe
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Tests endpoint availability, round-trip response time, HTTP response codes, and server headers.
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)] self-start sm:self-auto">
                    tool: ping_endpoint
                  </span>
                </div>
                <PingPlayground />
              </section>
            )}

            {/* 5. Framework Pulse */}
            {(activeTab === "all" || activeTab === "pulse") && (
              <section className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-4">
                  <div className="space-y-1">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <Terminal size={18} className="text-rose-500" />
                      Tech Framework & Library Release Pulse
                    </h2>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      Tracks real-time GitHub releases for key web and cloud frameworks (Next.js, Tailwind, React, Node).
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)] self-start sm:self-auto">
                    tool: get_tech_pulse
                  </span>
                </div>
                <TechPulseFeed />
              </section>
            )}

          </div>

          {/* MCP Tools Protocol Documentation for AI Agents */}
          <section className="space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <div className="space-y-1">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Code2 size={18} className="text-[var(--foreground)]" />
                MCP JSON-RPC Tool Schema
              </h2>
              <p className="text-xs text-[var(--muted-foreground)]">
                Connect your IDE agent to <code className="font-mono text-[var(--foreground)]">https://wolrdpulse.app/sse</code> to expose these tools automatically.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {mcpTools.map((tool, idx) => (
                <div key={tool.name} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[var(--foreground)]">{tool.name}</span>
                    <button
                      onClick={() => handleCopy(tool.example, idx)}
                      className="text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] flex items-center gap-1"
                      title="Copy example call"
                    >
                      {copiedIndex === idx ? (
                        <span className="text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 size={12} /> copied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Copy size={12} /> copy schema
                        </span>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{tool.description}</p>
                  <pre className="p-2.5 rounded-lg bg-[var(--muted)] text-[11px] font-mono text-[var(--foreground)] overflow-x-auto">
                    {tool.example}
                  </pre>
                </div>
              ))}
            </div>
          </section>

        </main>

        {/* Global Footer */}
        <footer className="max-w-6xl mx-auto border-t border-[var(--border)] pt-8 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[var(--foreground)]">WolrdPulse</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms</Link>
            <Link href="/developer" className="hover:text-[var(--foreground)] transition-colors">Developer & Sponsor</Link>
            <a href="https://anasrhimi.tech" target="_blank" rel="noreferrer" className="text-[var(--foreground)] hover:underline">anasrhimi.tech</a>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
