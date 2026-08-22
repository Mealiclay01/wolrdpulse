"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, ArrowRight, Zap, Shield, Network, Activity } from "lucide-react";

interface WorkflowDemo {
  id: string;
  tabLabel: string;
  question: string;
  withoutPulse: {
    status: string;
    action: string;
    result: string;
  };
  withPulse: {
    status: string;
    toolCall: string;
    result: string;
  };
}

const DEMOS: WorkflowDemo[] = [
  {
    id: "outage",
    tabLabel: "Cloud Outage vs. Code Bug",
    question: "Why is the Next.js production build failing on Vercel?",
    withoutPulse: {
      status: "Blind Hallucination",
      action: "Agent inspects local code, guesses syntax issues, and suggests unnecessary refactors to package.json.",
      result: "Wasted developer hours rewriting functional code."
    },
    withPulse: {
      status: "Live Infrastructure Context",
      toolCall: "get_cloud_status() → Vercel (iad1): Incident active",
      result: "Agent immediately informs you that Vercel's build queue is degraded. No code changes required."
    }
  },
  {
    id: "ssl",
    tabLabel: "SSL Expiry & Domain Launch",
    question: "Is our API domain SSL certificate valid for tomorrow's launch?",
    withoutPulse: {
      status: "Static Knowledge Cutoff",
      action: "Agent cannot inspect live TLS sockets. Suggests manually installing openssl or checking browser dev tools.",
      result: "Manual verification required."
    },
    withPulse: {
      status: "Native Socket Inspection",
      toolCall: "inspect_ssl('api.domain.com') → 78 days remaining",
      result: "Agent verifies TLS certificate chain and confirms the certificate is active through Let's Encrypt."
    }
  },
  {
    id: "dns",
    tabLabel: "DNS Propagation & Routing",
    question: "Did our custom domain CNAME finish propagating?",
    withoutPulse: {
      status: "Cannot Probe Network",
      action: "Agent suggests waiting 24-48 hours and running local dig commands.",
      result: "Uncertainty on routing."
    },
    withPulse: {
      status: "Live DNS-over-HTTPS",
      toolCall: "query_dns('app.domain.com', 'CNAME') → cname.vercel-dns.com",
      result: "Agent queries Cloudflare 1.1.1.1 in 18ms and confirms the CNAME record is globally active."
    }
  }
];

export default function AgentSessionDemo() {
  const [selectedId, setSelectedId] = useState("outage");
  const current = DEMOS.find(d => d.id === selectedId) || DEMOS[0];

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-2">
        {DEMOS.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setSelectedId(demo.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              selectedId === demo.id
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-sm font-semibold"
                : "border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]"
            }`}
          >
            {demo.tabLabel}
          </button>
        ))}
      </div>

      {/* Comparison Container */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* User Prompt Header */}
        <div className="space-y-1.5 border-b border-[var(--border)] pb-5">
          <span className="text-xs font-mono text-[var(--muted-foreground)] uppercase tracking-wider">
            Developer prompt in Cursor / Claude
          </span>
          <p className="text-base sm:text-lg font-semibold text-[var(--foreground)]">
            "{current.question}"
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Without WolrdPulse */}
          <div className="p-5 sm:p-6 rounded-xl border border-red-500/20 bg-red-500/[0.02] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-red-600 dark:text-red-400">
                <XCircle size={16} />
                <span>Without WolrdPulse</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                {current.withoutPulse.action}
              </p>
            </div>
            
            <div className="pt-3 border-t border-red-500/10 text-xs font-medium text-red-600/80 dark:text-red-400/80">
              Outcome: {current.withoutPulse.result}
            </div>
          </div>

          {/* With WolrdPulse */}
          <div className="p-5 sm:p-6 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.03] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={16} />
                  <span>With WolrdPulse MCP</span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                  Zero Hallucination
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-[var(--background)] border border-[var(--border)] font-mono text-xs text-[var(--foreground)]">
                {current.withPulse.toolCall}
              </div>

              <p className="text-xs sm:text-sm text-[var(--foreground)] leading-relaxed font-medium">
                {current.withPulse.result}
              </p>
            </div>

            <div className="pt-3 border-t border-emerald-500/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <span>Instant accurate resolution</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
