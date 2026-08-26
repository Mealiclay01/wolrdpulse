import React from "react";
import Navbar from "@/components/Navbar";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { 
  Heart, 
  Terminal, 
  Github, 
  Globe, 
  ArrowLeft, 
  CheckCircle2, 
  Shield, 
  Cpu, 
  Zap, 
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const title = t.developer?.title || "Anas Rhimi — Developer & Creator of WolrdPulse MCP Server";
  const description = t.developer?.description || "DevOps & Cloud Engineer behind WolrdPulse, an open-source MCP telemetry server for AI coding agents. Learn about the architecture, stack, and sponsor the project.";
  const ogImageUrl = "https://wolrdpulse.app/opengraph-image";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://wolrdpulse.app/${locale}/developer`,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: "Anas Rhimi — WolrdPulse Developer" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}


export default async function DeveloperPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600 selection:text-white">
      <Navbar t={t.nav} locale={locale} showBackToHome={false} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
          <Link 
            href={`/${locale}`} 
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> 
            <span>{t.developer?.back || "Back to WolrdPulse"}</span>
          </Link>
          <span className="text-xs font-mono text-[var(--muted-foreground)]">
            {t.developer?.openSourceDevOps || "Open Source DevOps"}
          </span>
        </div>

        {/* Creator Hero Card */}
        <section className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative shrink-0">
              <img 
                src="https://github.com/Mealiclay01.png" 
                alt="Anas Rhimi" 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[var(--border)] bg-[var(--muted)] shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--background)] border-2 border-[var(--border)] flex items-center justify-center shadow-sm" title="Verified Creator">
                <CheckCircle2 size={14} className="text-blue-500" />
              </div>
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  {t.developer?.anasRhimi || "Anas Rhimi"}
                </h1>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium">
                  {t.developer?.role || "DevOps & Cloud Engineer"}
                </span>
              </div>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed max-w-xl">
                {t.developer?.descriptionDetailed || "Building open-source infrastructure and AI agent telemetry. Focused on eliminating expensive enterprise SaaS paywalls for developers worldwide."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[var(--border)]">
            <a 
              href="https://anasrhimi.tech" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs font-mono hover:bg-[var(--muted)] transition-colors"
            >
              <Globe size={13} className="text-blue-500" />
              <span>anasrhimi.tech</span>
              <ArrowUpRight size={12} className="text-[var(--muted-foreground)]" />
            </a>

            <a 
              href="https://github.com/Mealiclay01" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-xs font-mono hover:bg-[var(--muted)] transition-colors"
            >
              <Github size={13} />
              <span>@Mealiclay01</span>
              <ArrowUpRight size={12} className="text-[var(--muted-foreground)]" />
            </a>
          </div>
        </section>

        {/* Mission / Why WolrdPulse was built */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">{t.developer?.whyBuiltTitle || "Why I built WolrdPulse"}</h2>
            <p className="text-xs font-mono text-[var(--muted-foreground)]">Model Context Protocol for Live Reliability Context</p>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-4 text-sm text-[var(--muted-foreground)] leading-relaxed shadow-sm">
            <p>
              {t.developer?.whyBuiltP1 || "When working with autonomous coding agents like Claude Desktop and Cursor, I noticed a constant blind spot: "}
              <strong className="text-[var(--foreground)]">{t.developer?.whyBuiltStrong || "AI agents are completely blind to live cloud infrastructure health"}</strong>
              {t.developer?.whyBuiltP2 || ". If a CI/CD build fails, an API route times out, or a DNS record hasn't propagated yet, the AI agent will assume there is a bug in the code and start suggesting unnecessary refactors—completely unaware that AWS or Vercel is simply experiencing an outage."}
            </p>
            <p>
              {t.developer?.whyBuiltP3 || "I built WolrdPulse as a free, lightweight Model Context Protocol (MCP) server that runs on global edge infrastructure. It gives your AI tools instant, live diagnostics—status feeds, DNS lookups, latency tests, and SSL verification—in real time without requiring hundreds of dollars in proprietary SaaS subscriptions."}
            </p>
          </div>
        </section>

        {/* Architecture & Tech Stack */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">{t.developer?.archTechTitle || "Architecture & Technology"}</h2>
            <p className="text-xs text-[var(--muted-foreground)]">
              {t.developer?.archTechDesc || "Designed for sub-50ms tool execution and zero-dependency integration."}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Terminal size={16} />
              </div>
              <h3 className="font-semibold text-sm text-[var(--foreground)]">{t.developer?.mcpStandard || "MCP Standard"}</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                {t.developer?.mcpStandardDesc || "Standard JSON-RPC over Server-Sent Events (SSE) for 1-click integration with Claude, Cursor, and custom agent loops."}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Zap size={16} />
              </div>
              <h3 className="font-semibold text-sm text-[var(--foreground)]">{t.developer?.globalEdge || "Global Edge Network"}</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                {t.developer?.globalEdgeDesc || "Queries Cloudflare DNS-over-HTTPS (1.1.1.1) and native Node TLS sockets to test endpoints in milliseconds."}
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2.5 shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Shield size={16} />
              </div>
              <h3 className="font-semibold text-sm text-[var(--foreground)]">{t.developer?.freeOpen || "100% Free & Open"}</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                {t.developer?.freeOpenDesc || "MIT Licensed. Publicly accessible endpoints with no API keys, accounts, or telemetry tracking required."}
              </p>
            </div>
          </div>
        </section>

        {/* Sponsor / Support Callout */}
        <section className="rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-500/[0.04] to-transparent p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-2 text-rose-500 text-xs font-mono font-semibold uppercase tracking-wider">
            <Heart size={14} className="fill-rose-500" />
            <span>{t.developer?.githubSponsors || "GitHub Sponsors"}</span>
          </div>

          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight">{t.developer?.sponsorProject || "Support the Project"}</h2>
            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
              {t.developer?.sponsorProjectDesc || "WolrdPulse is 100% free and maintained in my free time. If this tool saves your team money or improves your AI development workflow, consider supporting the project on GitHub Sponsors."}
            </p>
          </div>

          <div>
            <a 
              href="https://github.com/sponsors/Mealiclay01" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md hover:shadow-rose-600/20 transition-all cursor-pointer"
            >
              <Heart size={14} className="fill-white" />
              <span>{t.developer?.sponsorGithub || "Sponsor @Mealiclay01 on GitHub"}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/features`} className="hover:text-[var(--foreground)] transition-colors">
              {t.footer?.features || "Features"}
            </Link>
            <Link href={`/${locale}/privacy`} className="hover:text-[var(--foreground)] transition-colors">
              {t.footer?.privacy || "Privacy"}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-[var(--foreground)] transition-colors">
              {t.footer?.terms || "Terms"}
            </Link>
          </div>
        </footer>

      </main>
    </div>
  );
}
