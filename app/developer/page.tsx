import React from "react";
import Navbar from "@/components/Navbar";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { 
  ArrowLeft, 
  Github, 
  Heart, 
  ShieldCheck, 
  Cloud, 
  Terminal, 
  Server, 
  Layers,
  ArrowUpRight,
  Sparkles,
  ExternalLink
} from "lucide-react";

export const metadata = {
  title: "About the Developer | Anas Rhimi (WolrdPulse)",
  description: "DevOps & Cloud Engineer behind WolrdPulse, an open-source MCP telemetry server for AI coding agents.",
};

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600 selection:text-white">
      {/* Top Floating Navbar */}
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> 
            <span>Back to WolrdPulse</span>
          </Link>
          <span className="text-xs font-mono text-[var(--muted-foreground)]">
            Open Source DevOps
          </span>
        </div>

        {/* Developer Profile Card */}
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              <img 
                src="https://github.com/Mealiclay01.png" 
                alt="Anas Rhimi" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[var(--border)] bg-[var(--muted)] shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--background)] border-2 border-[var(--border)] flex items-center justify-center shadow-sm" title="Verified Creator">
                <ShieldCheck size={14} className="text-emerald-500" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                  Anas Rhimi
                </h1>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md border border-[var(--border)] bg-[var(--muted)] text-[var(--foreground)] font-medium">
                  DevOps & Cloud Engineer
                </span>
              </div>
              
              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-xl">
                Building open-source infrastructure and AI agent telemetry. Focused on eliminating expensive enterprise SaaS paywalls for developers worldwide.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
                <a 
                  href="https://anasrhimi.tech" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors shadow-sm font-semibold"
                >
                  <span>anasrhimi.tech</span>
                  <ExternalLink size={12} className="text-[var(--muted-foreground)]" />
                </a>
                <a 
                  href="https://github.com/Mealiclay01" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors shadow-sm font-semibold"
                >
                  <Github size={13} />
                  <span>@Mealiclay01</span>
                  <ExternalLink size={12} className="text-[var(--muted-foreground)]" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why I Built WolrdPulse (Clear Human Engineering Voice) */}
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Why I built WolrdPulse
          </h2>
          
          <div className="space-y-4 text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
            <p>
              When working with autonomous coding agents like Claude Desktop and Cursor, I noticed a constant blind spot: <strong className="text-[var(--foreground)]">AI agents are completely blind to live cloud infrastructure health</strong>.
            </p>
            <p>
              If a CI/CD build fails, an API route times out, or a DNS record hasn't propagated yet, the AI agent will assume there is a bug in the code and start suggesting unnecessary refactors—completely unaware that AWS or Vercel is simply experiencing an outage.
            </p>
            <p>
              I built WolrdPulse as a free, lightweight Model Context Protocol (MCP) server that runs on global edge infrastructure. It gives your AI tools instant, live diagnostics—status feeds, DNS lookups, latency tests, and SSL verification—in real time without requiring hundreds of dollars in proprietary SaaS subscriptions.
            </p>
          </div>
        </section>

        {/* Architecture & Engineering Design */}
        <section className="space-y-6 border-t border-[var(--border)] pt-10">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Architecture & Technology
            </h2>
            <p className="text-sm text-[var(--muted-foreground)]">
              Designed for sub-50ms tool execution and zero-dependency integration.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)]">
                <Terminal size={18} />
              </div>
              <h3 className="font-semibold text-base text-[var(--foreground)]">MCP Standard</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Standard JSON-RPC over Server-Sent Events (SSE) for 1-click integration with Claude, Cursor, and custom agent loops.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)]">
                <Server size={18} />
              </div>
              <h3 className="font-semibold text-base text-[var(--foreground)]">Global Edge Network</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Queries Cloudflare DNS-over-HTTPS (1.1.1.1) and native Node TLS sockets to test endpoints in milliseconds.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-3 shadow-sm">
              <div className="w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--muted)] flex items-center justify-center text-[var(--foreground)]">
                <Layers size={18} />
              </div>
              <h3 className="font-semibold text-base text-[var(--foreground)]">100% Free & Open</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                MIT Licensed. Publicly accessible endpoints with no API keys, accounts, or telemetry tracking required.
              </p>
            </div>
          </div>
        </section>

        {/* GitHub Sponsors & Support Section */}
        <section id="sponsor" className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10 space-y-6 shadow-sm">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-rose-500 text-xs font-semibold uppercase tracking-wider">
              <Heart size={14} fill="currentColor" />
              <span>GitHub Sponsors</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Support the Project
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xl">
              WolrdPulse is 100% free and maintained in my free time. If this tool saves your team money or improves your AI development workflow, consider supporting the project on GitHub Sponsors.
            </p>
          </div>

          {/* Clean GitHub Sponsors Card */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <img 
                src="https://github.com/Mealiclay01.png" 
                alt="Mealiclay01" 
                className="w-12 h-12 rounded-xl object-cover border border-[var(--border)]"
              />
              <div>
                <div className="font-semibold text-sm text-[var(--foreground)]">Sponsor @Mealiclay01 on GitHub</div>
                <div className="text-xs text-[var(--muted-foreground)]">Support open-source DevOps and AI telemetry tools</div>
              </div>
            </div>

            <a 
              href="https://github.com/sponsors/Mealiclay01" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 text-white text-xs font-semibold hover:bg-rose-600 transition-colors shadow-sm shrink-0"
            >
              <Heart size={14} fill="currentColor" />
              <span>Sponsor on GitHub</span>
            </a>
          </div>
        </section>

      </main>

      {/* Standard Global Footer */}
      <footer className="max-w-4xl mx-auto border-t border-[var(--border)] pt-8 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" />
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/features" className="hover:text-[var(--foreground)] transition-colors">Features & Tools</Link>
          <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[var(--foreground)] transition-colors">Terms</Link>
          <a href="https://anasrhimi.tech" target="_blank" rel="noreferrer" className="text-[var(--foreground)] hover:underline">anasrhimi.tech</a>
        </div>
      </footer>
    </div>
  );
}
