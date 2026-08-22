import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);
  return {
    title: `${t.terms?.title || "Terms of Service"} | WolrdPulse`,
    description: "Terms of service and API usage policy for WolrdPulse MCP telemetry platform.",
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
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
            <FileText size={18} />
            <span>WolrdPulse Open Source Terms</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{t.terms?.title || "Terms of Service"}</h1>
          <p className="text-xs text-[var(--muted-foreground)] font-mono">
            {t.terms?.lastUpdated || "Last updated:"} {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-6 text-sm text-[var(--muted-foreground)] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--foreground)]">
              {t.terms?.section1Title || "1. Acceptance of Terms"}
            </h2>
            <p>
              {t.terms?.section1Desc || "By accessing and using WolrdPulse, you accept and agree to be bound by the terms and provisions of this agreement. WolrdPulse is provided \"as is\" primarily as a tool for developers and autonomous AI agents."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--foreground)]">
              {t.terms?.section2Title || "2. Use License & API Usage"}
            </h2>
            <p>
              {t.terms?.section2Desc || "Permission is granted to temporarily use the WolrdPulse MCP endpoints. However, you agree not to:"}
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li>{t.terms?.section2Li1 || "Use the service for any illegal or unauthorized purpose."}</li>
              <li>{t.terms?.section2Li2 || "Attempt to reverse engineer or overload the API with malicious intent (DDoS)."}</li>
              <li>{t.terms?.section2Li3 || "Use the Ping Playground or edge network endpoints to launch attacks or probe restricted infrastructure."}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--foreground)]">
              {t.terms?.section3Title || "3. Disclaimer"}
            </h2>
            <p>
              {t.terms?.section3Desc || "The materials on WolrdPulse's website and APIs are provided on an 'as is' basis. WolrdPulse makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--foreground)]">
              {t.terms?.section4Title || "4. Limitations"}
            </h2>
            <p>
              {t.terms?.section4Desc || "In no event shall WolrdPulse, its developers, or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WolrdPulse's website."}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[var(--foreground)]">
              {t.terms?.section5Title || "5. Developer Contact"}
            </h2>
            <p>
              {t.terms?.section5Desc1 || "WolrdPulse is maintained and built by Anas Rhimi. For inquiries, reach out at "}
              <a href="https://github.com/Mealiclay01" target="_blank" rel="noreferrer" className="text-[var(--foreground)] underline font-mono">@Mealiclay01</a>
              {t.terms?.section5Desc2 || "."}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
