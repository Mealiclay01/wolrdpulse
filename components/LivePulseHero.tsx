"use client";

import React, { useState } from "react";
import { Copy, Terminal, Zap, Sparkles, Play, Search, Radio, Check, Globe } from "lucide-react";
import { useToast } from "./Toast";

export default function LivePulseHero({
  onOpenSimulator,
  onOpenCommandPalette,
}: {
  onOpenSimulator?: () => void;
  onOpenCommandPalette?: () => void;
}) {
  const [selectedClient, setSelectedClient] = useState<"cursor" | "claude" | "zed" | "curl">("cursor");
  const { toast } = useToast();

  const mcpConfigs = {
    cursor: `// .cursor/mcp.json
{
  "mcpServers": {
    "worldpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}`,
    claude: `// claude_desktop_config.json
{
  "mcpServers": {
    "worldpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}`,
    zed: `// ~/.config/zed/settings.json
{
  "context_servers": {
    "worldpulse": {
      "url": "https://wolrdpulse.app/sse"
    }
  }
}`,
    curl: `curl -X POST https://wolrdpulse.app/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_cloud_status"}}'`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(mcpConfigs[selectedClient]);
    toast({
      type: "success",
      message: `${selectedClient.toUpperCase()} config copied!`,
      description: "Paste into your IDE settings to connect to WolrdPulse.",
    });
  };

  return (
    <section className="relative pt-8 pb-12 lg:pt-14 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Handcrafted Editorial & Mission */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-md bg-[#16161e] border border-[#23232e] px-2.5 py-1 text-xs font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>TELEMETRY DECK • ZERO LATENCY OVERHEAD</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Is AWS or GitHub down again?
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Live outage radar, edge TTFB benchmarks, and DoH diagnostics. Feed live internet context directly to your AI agents in <span className="text-white font-medium">Cursor & Claude</span> with one Model Context Protocol (MCP) endpoint.
              </p>
            </div>

            {/* Quick Regional Heartbeat Matrix */}
            <div className="rounded-2xl border border-[#1f1f28] bg-[#121218] p-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#1c1c24] pb-2.5 mb-3 text-slate-400">
                <div className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-white font-semibold">Edge Probe Heartbeats</span>
                </div>
                <span className="text-[11px] text-slate-500">Every 30s • 100% Free</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { region: "US-East", city: "Virginia", ping: "9ms", status: "ok" },
                  { region: "EU-Central", city: "Frankfurt", ping: "14ms", status: "ok" },
                  { region: "AP-East", city: "Tokyo", ping: "38ms", status: "ok" },
                  { region: "SA-East", city: "São Paulo", ping: "62ms", status: "ok" },
                ].map((item) => (
                  <div
                    key={item.region}
                    className="rounded-xl border border-[#1e1e26] bg-[#0c0c10] p-2.5 transition hover:border-[#2f2f3e]"
                  >
                    <div className="text-[10px] text-slate-500">{item.city}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{item.region}</div>
                    <div className="text-emerald-400 font-bold mt-1 text-[11px] flex items-center justify-between">
                      <span>{item.ping}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenSimulator}
                className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-mono text-xs font-bold text-black shadow-md hover:bg-slate-200 transition active:scale-[0.98]"
              >
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>Simulate Agent Tool Call</span>
                <Play className="h-2.5 w-2.5 fill-black" />
              </button>

              <button
                onClick={onOpenCommandPalette}
                className="flex items-center gap-2 rounded-xl border border-[#262634] bg-[#14141c] px-4 py-2.5 font-mono text-xs text-slate-300 hover:border-[#38384a] hover:text-white transition"
              >
                <Search className="h-3.5 w-3.5 text-slate-400" />
                <span>Quick Actions (⌘K)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Tactile Hardware MCP Terminal */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex-1 flex flex-col rounded-3xl border border-[#22222c] bg-[#111117] shadow-xl overflow-hidden">
              
              {/* Terminal Titlebar */}
              <div className="flex items-center justify-between border-b border-[#1c1c24] px-4 py-3 bg-[#0d0d12]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a36]"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a36]"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-[#2a2a36]"></span>
                  <span className="ml-1 text-xs font-mono text-slate-400 font-medium">MCP Remote Bridge</span>
                </div>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 rounded-md bg-[#1d1d26] border border-[#2b2b38] px-2.5 py-1 text-xs font-mono text-emerald-400 hover:bg-[#252532] transition"
                  title="Copy configuration"
                >
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </button>
              </div>

              {/* Client Selector Segmented Controls */}
              <div className="flex border-b border-[#1c1c24] bg-[#0c0c10] p-1.5 gap-1">
                {(["cursor", "claude", "zed", "curl"] as const).map((client) => (
                  <button
                    key={client}
                    onClick={() => setSelectedClient(client)}
                    className={`flex-1 rounded-lg py-1 text-xs font-mono font-medium transition ${
                      selectedClient === client
                        ? "bg-[#1f1f2c] text-white border border-[#323244] shadow-sm"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {client.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Code Panel */}
              <div className="flex-1 p-4 font-mono text-xs text-slate-300 overflow-x-auto bg-[#09090d]">
                <pre className="text-emerald-300/90 whitespace-pre-wrap leading-relaxed">
                  {mcpConfigs[selectedClient]}
                </pre>
              </div>

              {/* Status Bar */}
              <div className="border-t border-[#1c1c24] bg-[#0d0d12] px-4 py-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Endpoint Active: /sse
                </span>
                <span className="text-slate-500">JSON-RPC 2.0</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
