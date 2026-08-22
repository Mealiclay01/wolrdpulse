import React from "react";
import Navbar from "@/components/Navbar";
import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Terms of Service | WolrdPulse",
  description: "Terms of Service for WolrdPulse.",
};

import { getDictionary } from "@/lib/i18n";
export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Floating Glass Navbar */}
      <Navbar t={t.nav} locale={locale} showBackToHome={false} />

      <main className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight mb-8">Terms of Service</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-[var(--muted-foreground)]">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold text-[var(--foreground)]">1. Acceptance of Terms</h2>
          <p>
            By accessing and using WolrdPulse, you accept and agree to be bound by the terms and provisions of this agreement. WolrdPulse is provided "as is" primarily as a tool for developers and autonomous AI agents.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--foreground)]">2. Use License & API Usage</h2>
          <p>
            Permission is granted to temporarily use the WolrdPulse MCP endpoints. However, you agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-2">
            <li>Use the service for any illegal or unauthorized purpose.</li>
            <li>Attempt to reverse engineer or overload the API with malicious intent (DDoS).</li>
            <li>Use the Ping Playground or edge network endpoints to launch attacks or probe restricted infrastructure.</li>
          </ul>

          <h2 className="text-xl font-semibold text-[var(--foreground)]">3. Disclaimer</h2>
          <p>
            The materials on WolrdPulse's website and APIs are provided on an 'as is' basis. WolrdPulse makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>

          <h2 className="text-xl font-semibold text-[var(--foreground)]">4. Limitations</h2>
          <p>
            In no event shall WolrdPulse, its developers, or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on WolrdPulse's website.
          </p>

          <h2 className="text-xl font-semibold text-[var(--foreground)]">5. Developer Contact</h2>
          <p>
            WolrdPulse is maintained and built by Anas Rhimi. For inquiries, reach out at <a href="https://anasrhimi.tech" className="text-[var(--foreground)] underline">anasrhimi.tech</a>.
          </p>
        </div>
      </main>

      {/* Standard Global Footer */}
      <footer className="max-w-3xl mx-auto border-t border-[var(--border)] mt-16 pt-8 pb-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[var(--muted-foreground)]">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" />
          <span>© {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/features" className="hover:text-[var(--foreground)] transition-colors">Features</Link>
          <Link href="/privacy" className="hover:text-[var(--foreground)] transition-colors">Privacy</Link>
          <Link href="/developer" className="hover:text-[var(--foreground)] transition-colors">Developer</Link>
          <a href="https://anasrhimi.tech" target="_blank" rel="noreferrer" className="text-[var(--foreground)] hover:underline">anasrhimi.tech</a>
        </div>
      </footer>
    </div>
  );
}
