import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | WolrdPulse",
  description: "Privacy policy for WolrdPulse, the open-source real-time telemetry MCP server.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Floating Glass Navbar */}
      <Navbar />

      <main className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6 text-[var(--muted-foreground)]">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-xl font-semibold text-[var(--foreground)]">1. Information We Collect</h2>
          <p>
            WolrdPulse is designed as a stateless Model Context Protocol (MCP) server. We do not require account creation, and we do not collect, store, or sell any personally identifiable information (PII) from the AI agents or users connecting to our endpoints.
          </p>
          
          <h2 className="text-xl font-semibold text-[var(--foreground)]">2. Telemetry and Usage Data</h2>
          <p>
            When your agent connects to the WolrdPulse SSE endpoint (<code>/sse</code>), we may log basic connection metadata (e.g., IP address, connection duration, and request volume) strictly for the purpose of maintaining service reliability, rate limiting, and preventing abuse.
          </p>

          <h2 className="text-xl font-semibold text-[var(--foreground)]">3. Third-Party Services</h2>
          <p>
            WolrdPulse aggregates data from third-party APIs (such as AWS, Vercel, and GitHub). When you or your agent requests data, no user-specific information is passed to these underlying services. We simply fetch public status endpoints and proxy the results.
          </p>

          <h2 className="text-xl font-semibold text-[var(--foreground)]">4. Contact</h2>
          <p>
            If you have any questions regarding this privacy policy or how WolrdPulse handles data, please contact the developer at <a href="https://anasrhimi.tech" className="text-[var(--foreground)] underline">anasrhimi.tech</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
