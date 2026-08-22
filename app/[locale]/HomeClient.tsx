"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import BrandLogo from "@/components/BrandLogo";
import AgentSessionDemo from "@/components/AgentSessionDemo";
import { ToastProvider } from "@/components/Toast";
import Link from "next/link";
import { 
  ArrowRight, 
  Terminal, 
  Activity, 
  Zap, 
  Copy, 
  CheckCircle2, 
  X, 
  Github, 
  Network, 
  Shield,
  Layers,
  ArrowUpRight,
  Bot
} from "lucide-react";

export default function Home({ t, locale }: { t: any, locale: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyConfig = () => {
    navigator.clipboard.writeText(`{
  "mcpServers": {
    "worldpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600 selection:text-white">
        <Navbar t={t.nav} locale={locale} onConnectClick={() => setIsModalOpen(true)} />
        <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex flex-col gap-24">
          
          <section className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <a 
              href="https://github.com/Mealiclay01/wolrdpulse" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--muted)] text-[var(--foreground)] text-sm font-medium hover:bg-[var(--accent)] transition-colors border border-[var(--border)]"
            >
              <Github size={13} />
              <span>{t.home.openSource}</span>
              <ArrowRight size={12} className="text-[var(--muted-foreground)]" />
            </a>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-balance max-w-4xl leading-[1.08]">
              {t.home.headline}
            </h1>
            <p className="text-base sm:text-lg text-[var(--muted-foreground)] max-w-2xl text-balance leading-relaxed">
              {t.home.subHeadline}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-500/20"
              >
                <Terminal size={16} />
                <span>{t.home.quickStart}</span>
              </button>
              <Link 
                href={`/${locale}/features`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[var(--muted)] text-[var(--foreground)] font-medium hover:bg-[var(--accent)] transition-colors border border-[var(--border)]"
              >
                <Activity size={16} className="text-blue-500" />
                <span>{t.home.exploreFeatures}</span>
                <ArrowRight size={14} className="text-[var(--muted-foreground)]" />
              </Link>
            </div>

            {/* Direct CLI Copy Command */}
            <div 
              onClick={() => { 
                navigator.clipboard.writeText('npx -y github:Mealiclay01/wolrdpulse'); 
                setCopied(true); 
                setTimeout(() => setCopied(false), 2000); 
              }}
              className="mt-2 inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] font-mono text-xs text-[var(--foreground)] hover:border-[var(--foreground)] transition-colors cursor-pointer shadow-sm"
              title="Click to copy CLI command"
            >
              <span className="text-[var(--muted-foreground)]">$</span>
              <span className="font-semibold">npx -y github:Mealiclay01/wolrdpulse</span>
              {copied ? (
                <CheckCircle2 size={13} className="text-emerald-500" />
              ) : (
                <Copy size={13} className="text-[var(--muted-foreground)]" />
              )}
            </div>
          </section>

          {/* Interactive Agent Runtime Session Simulator */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-blue-500" />
                <span className="font-bold text-sm">How AI Agents Use WolrdPulse</span>
              </div>
              <span className="text-xs font-mono text-[var(--muted-foreground)]">Model Context Protocol v1.0</span>
            </div>

            <AgentSessionDemo />
          </section>

          {/* 4 Feature Architecture Cards (Clean, Monochrome, High Contrast) */}
          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight">Built for Autonomous Agent Workflows</h2>
                <p className="text-sm text-[var(--muted-foreground)]">
                  Everything your AI coding assistant needs to verify infrastructure before writing deployment code.
                </p>
              </div>
              <Link 
                href="/features" 
                className="text-xs font-semibold text-[var(--foreground)] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>Browse all tools</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link 
                href="/features" 
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4 hover:border-[var(--foreground)] transition-all group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] transition-transform group-hover:scale-105">
                    <Activity size={20} />
                  </div>
                  <h3 className="font-semibold text-base flex items-center justify-between text-[var(--foreground)]">
                    <span>Cloud Outages</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted-foreground)]" />
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Real-time status for AWS, Vercel, and GitHub so agents don't debug code during 3rd-party outages.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border)] font-mono text-[11px] text-[var(--muted-foreground)]">
                  tool: get_cloud_status
                </div>
              </Link>

              <Link 
                href="/features" 
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4 hover:border-[var(--foreground)] transition-all group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] transition-transform group-hover:scale-105">
                    <Shield size={20} />
                  </div>
                  <h3 className="font-semibold text-base flex items-center justify-between text-[var(--foreground)]">
                    <span>SSL Inspector</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted-foreground)]" />
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Native TLS handshake tool to verify certificate expiration and issuer chains autonomously.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border)] font-mono text-[11px] text-[var(--muted-foreground)]">
                  tool: inspect_ssl
                </div>
              </Link>

              <Link 
                href="/features" 
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4 hover:border-[var(--foreground)] transition-all group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] transition-transform group-hover:scale-105">
                    <Network size={20} />
                  </div>
                  <h3 className="font-semibold text-base flex items-center justify-between text-[var(--foreground)]">
                    <span>DNS Resolver</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted-foreground)]" />
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Live DNS-over-HTTPS queries (A, AAAA, CNAME, MX) to debug routing and record propagation.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border)] font-mono text-[11px] text-[var(--muted-foreground)]">
                  tool: query_dns
                </div>
              </Link>

              <Link 
                href="/features" 
                className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-4 hover:border-[var(--foreground)] transition-all group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)] transition-transform group-hover:scale-105">
                    <Zap size={20} />
                  </div>
                  <h3 className="font-semibold text-base flex items-center justify-between text-[var(--foreground)]">
                    <span>Edge Pings</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--muted-foreground)]" />
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                    Synthetic HTTP probe runner to test endpoint response times, headers, and status codes globally.
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border)] font-mono text-[11px] text-[var(--muted-foreground)]">
                  tool: ping_endpoint
                </div>
              </Link>
            </div>
          </section>

          {/* Quick Integration Setup Section (Clean Theme-Aware Code Block) */}
          <section id="setup" className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-12 space-y-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-[var(--muted)] text-[var(--foreground)]">
                  <span>Instant Setup</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Connect with Claude Desktop or Cursor</h2>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Add the SSE endpoint to your MCP configuration file. No API keys or authentication required.
                </p>
              </div>

              <button 
                onClick={copyConfig}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] font-semibold text-xs hover:opacity-90 transition-opacity shadow-sm shrink-0 cursor-pointer"
              >
                {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copied ? "Config Copied!" : "Copy MCP Config"}</span>
              </button>
            </div>

            {/* Clean Theme-Aware Code Box */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)]/50 p-5 font-mono text-xs overflow-x-auto">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3 mb-3 text-[var(--muted-foreground)] text-[11px]">
                <span>claude_desktop_config.json / cursor_mcp.json</span>
                <span>endpoint: /sse</span>
              </div>
              <pre className="text-[var(--foreground)] leading-relaxed">
{`{
  `}<span className="text-blue-600 dark:text-blue-400 font-semibold">"mcpServers"</span>{`: {
    `}<span className="text-purple-600 dark:text-purple-400 font-semibold">"worldpulse"</span>{`: {
      `}<span className="text-blue-600 dark:text-blue-400">"url"</span>{`: `}<span className="text-emerald-600 dark:text-emerald-400 font-semibold">"https://wolrdpulse.app/sse"</span>{`
    }
  }
}`}
              </pre>
            </div>
          </section>

          {/* Standard Global Footer */}
          <footer className="border-t border-[var(--border)] pt-8 pb-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" />
              <span>© {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <Link href="/features" className="hover:text-[var(--foreground)] transition-colors">Features & Tools</Link>
              <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms</Link>
              <Link href="/developer" className="hover:text-[var(--foreground)] transition-colors">Developer & Sponsor</Link>
              <a href="https://anasrhimi.tech" target="_blank" rel="noreferrer" className="text-[var(--foreground)] hover:underline">anasrhimi.tech</a>
            </div>
          </footer>

        </div>

        {/* Connect Modal (Clean Theme-Aware Code Block) */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
                <h2 className="text-lg font-bold tracking-tight">Connect AI Agent via MCP</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors p-1"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6 space-y-4">
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                  Paste this snippet into your IDE or MCP client settings. Your agent will immediately receive access to live cloud outages, SSL verification, and edge telemetry.
                </p>

                <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/50 p-4 text-xs font-mono text-[var(--foreground)] overflow-x-auto">
                  <pre className="leading-relaxed">
{`{
  `}<span className="text-blue-600 dark:text-blue-400 font-semibold">"mcpServers"</span>{`: {
    `}<span className="text-purple-600 dark:text-purple-400 font-semibold">"worldpulse"</span>{`: {
      `}<span className="text-blue-600 dark:text-blue-400">"url"</span>{`: `}<span className="text-emerald-600 dark:text-emerald-400 font-semibold">"https://wolrdpulse.app/sse"</span>{`
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="bg-[var(--muted)]/50 p-4 border-t border-[var(--border)] flex justify-between items-center">
                <button 
                  onClick={copyConfig}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold hover:opacity-90 transition-opacity"
                >
                  {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? "Copied to Clipboard!" : "Copy JSON"}</span>
                </button>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border)] text-xs font-medium hover:bg-[var(--muted)] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToastProvider>
  );
}
