import React from "react";
import { Activity, Heart, Globe, Terminal, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070a11] py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-white">
                wolrdpulse<span className="text-emerald-400">.app</span>
              </span>
              <p className="text-xs text-slate-500 font-mono">
                100% Free-Tier Serverless Infrastructure ($0/mo)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
            <a
              href="/api/status"
              className="hover:text-emerald-400 transition"
              target="_blank"
            >
              REST /api/status
            </a>
            <a
              href="/api/mcp"
              className="hover:text-emerald-400 transition"
              target="_blank"
            >
              Remote MCP /sse
            </a>
            <a
              href="https://modelcontextprotocol.io"
              className="hover:text-emerald-400 transition"
              target="_blank"
              rel="noreferrer"
            >
              MCP Docs
            </a>
            <a
              href="https://github.com"
              className="hover:text-emerald-400 transition"
              target="_blank"
              rel="noreferrer"
            >
              Open Source
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} WolrdPulse. Built for DevOps & AI Agents.</p>
          <div className="flex items-center gap-4">
            <span>Powered by Vercel Serverless</span>
            <span>•</span>
            <span>Cloudflare 1.1.1.1 DoH</span>
            <span>•</span>
            <span>Statuspage Feeds</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
