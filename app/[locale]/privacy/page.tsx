import { i18n } from "@/middleware";
import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  const languages: Record<string, string> = {
    'x-default': 'https://wolrdpulse.app/en/privacy',
  };
  i18n.locales.forEach((l: string) => {
    languages[l] = `https://wolrdpulse.app/${l}/privacy`;
  });

  return {
    title: `${t.privacy?.title || "Privacy Policy"} | WolrdPulse`,
    description: "Privacy policy and data handling transparency for WolrdPulse MCP telemetry server.",
    alternates: {
      canonical: `https://wolrdpulse.app/${locale}/privacy`,
      languages,
    },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-blue-600 selection:text-white">
      <Navbar t={t.nav} locale={locale} showBackToHome={false} />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <Link 
          href={`/${locale}`} 
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors group"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" /> 
          <span>{t.nav?.backHome || "Back to Home"}</span>
        </Link>

        <div className="space-y-2 border-b border-[var(--border)] pb-6">
          <div className="flex items-center gap-2 text-blue-500 text-sm font-semibold">
            <Shield size={18} />
            <span>WolrdPulse Privacy Standards</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{t.privacy?.title || "Privacy Policy"}</h1>
          <p className="text-xs text-[var(--muted-foreground)] font-mono">
            {t.privacy?.lastUpdated || "Last updated:"} {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6 text-sm text-[var(--muted-foreground)] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--foreground)]">
              {t.privacy?.section1Title || "1. Information We Collect"}
            </h2>
            <p>
              {t.privacy?.section1Desc || "WolrdPulse is designed as a stateless Model Context Protocol (MCP) server. We do not require account creation, and we do not collect, store, or sell any personally identifiable information (PII) from the AI agents or users connecting to our endpoints."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--foreground)]">
              {t.privacy?.section2Title || "2. Telemetry and Usage Data"}
            </h2>
            <p>
              {t.privacy?.section2Desc1 || "When your agent connects to the WolrdPulse SSE endpoint ("}
              <code className="font-mono text-xs text-[var(--foreground)] bg-[var(--muted)] px-1.5 py-0.5 rounded">https://wolrdpulse.app/sse</code>
              {t.privacy?.section2Desc2 || "), we may log basic connection metadata (e.g., IP address, connection duration, and request volume) strictly for the purpose of maintaining service reliability, rate limiting, and preventing abuse."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--foreground)]">
              {t.privacy?.section3Title || "3. Third-Party Services"}
            </h2>
            <p>
              {t.privacy?.section3Desc || "WolrdPulse aggregates data from third-party APIs (such as AWS, Vercel, and GitHub). When you or your agent requests data, no user-specific information is passed to these underlying services. We simply fetch public status endpoints and proxy the results."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--foreground)]">
              {t.privacy?.section4Title || "4. Contact"}
            </h2>
            <p>
              {t.privacy?.section4Desc1 || "If you have any questions regarding this privacy policy or how WolrdPulse handles data, please contact the developer at "}
              <a href="https://github.com/Mealiclay01" target="_blank" rel="noreferrer" className="text-[var(--foreground)] underline font-mono">@Mealiclay01</a>
              {t.privacy?.section4Desc2 || "."}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
