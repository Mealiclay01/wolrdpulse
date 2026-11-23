"use client";

import React, { useState } from "react";
import { Cpu, Terminal, Check, Copy, Sparkles, BookOpen, Code2 } from "lucide-react";

export default function McpIntegrationGuide() {
  const [activeTab, setActiveTab] = useState<"tools" | "cursor" | "claude" | "zed">("tools");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const tools = [
    {
      name: "get_cloud_status",
      desc: "Fetches live operational status, incidents, and latency across AWS, GitHub, Cloudflare, OpenAI, Anthropic, Vercel, Supabase, NPM, and Docker.",
      examplePrompt: '"Is GitHub or Supabase down right now?"',
    },
    {
      name: "ping_endpoint",
      desc: "Measures Time to First Byte (TTFB), status codes, and response headers for any target URL or microservice.",
      examplePrompt: '"Ping https://api.myapp.com and check response time and server headers."',
    },
    {
      name: "inspect_dns",
      desc: "Queries Cloudflare DNS-over-HTTPS (DoH) for A, AAAA, CNAME, MX, TXT, and NS records.",
      examplePrompt: '"Check the A and MX records for wolrdpulse.app."',
    },
    {
      name: "get_tech_pulse",
      desc: "Returns latest releases from Kubernetes, Docker, Bun, Next.js, Go, Rust, plus trending GitHub repositories.",
      examplePrompt: '"What are the latest developer tool releases and trending repos today?"',
    },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="mcp-guide" className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Model Context Protocol (MCP) Integration
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Connect any AI coding assistant to WolrdPulse over remote Server-Sent Events (SSE).
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
          {(
            [
              { id: "tools", label: "Available Tools" },
              { id: "cursor", label: "Cursor Setup" },
              { id: "claude", label: "Claude Desktop" },
              { id: "zed", label: "Zed Editor" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition ${
                activeTab === tab.id
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: Available Tools */}
      {activeTab === "tools" && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {tools.map((tool, idx) => (
            <div
              key={tool.name}
              className="rounded-xl border border-slate-800/80 bg-slate-950/70 p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {tool.name}
                </span>
                <span className="text-[10px] font-mono rounded bg-slate-800 px-2 py-0.5 text-slate-400">
                  Tool
                </span>
              </div>
              <p className="text-xs text-slate-300">{tool.desc}</p>
              <div className="rounded-lg bg-[#090d16] p-2.5 text-[11px] font-mono text-slate-400 border border-slate-800/50">
                <span className="text-slate-500 block text-[10px] uppercase font-sans">Example user prompt:</span>
                <span className="text-teal-300">{tool.examplePrompt}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Cursor */}
      {activeTab === "cursor" && (
        <div className="mt-6 space-y-4">
          <p className="text-xs text-slate-300">
            In Cursor, open <strong>Settings &gt; Features &gt; MCP</strong> or create a <code className="text-emerald-400">.cursor/mcp.json</code> in your project:
          </p>
          <div className="relative rounded-xl border border-slate-800 bg-[#070a11] p-4 font-mono text-xs text-emerald-300">
            <pre className="overflow-x-auto">{`{
  "mcpServers": {
    "wolrdpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}`}</pre>
            <button
              onClick={() => handleCopy(`{\n  "mcpServers": {\n    "wolrdpulse": {\n      "url": "https://wolrdpulse.app/sse"\n    }\n  }\n}`, 1)}
              className="absolute top-3 right-3 rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700"
            >
              {copiedIndex === 1 ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Claude Desktop */}
      {activeTab === "claude" && (
        <div className="mt-6 space-y-4">
          <p className="text-xs text-slate-300">
            Edit your <code className="text-emerald-400">claude_desktop_config.json</code> (on macOS: <code className="text-slate-400">~/Library/Application Support/Claude/claude_desktop_config.json</code>):
          </p>
          <div className="relative rounded-xl border border-slate-800 bg-[#070a11] p-4 font-mono text-xs text-emerald-300">
            <pre className="overflow-x-auto">{`{
  "mcpServers": {
    "wolrdpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}`}</pre>
            <button
              onClick={() => handleCopy(`{\n  "mcpServers": {\n    "wolrdpulse": {\n      "url": "https://wolrdpulse.app/sse"\n    }\n  }\n}`, 2)}
              className="absolute top-3 right-3 rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700"
            >
              {copiedIndex === 2 ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Zed */}
      {activeTab === "zed" && (
        <div className="mt-6 space-y-4">
          <p className="text-xs text-slate-300">
            In Zed editor settings (<code className="text-emerald-400">~/.config/zed/settings.json</code>):
          </p>
          <div className="relative rounded-xl border border-slate-800 bg-[#070a11] p-4 font-mono text-xs text-emerald-300">
            <pre className="overflow-x-auto">{`{
  "context_servers": {
    "wolrdpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}`}</pre>
            <button
              onClick={() => handleCopy(`{\n  "context_servers": {\n    "wolrdpulse": {\n      "url": "https://wolrdpulse.app/sse"\n    }\n  }\n}`, 3)}
              className="absolute top-3 right-3 rounded bg-slate-800 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-700"
            >
              {copiedIndex === 3 ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
