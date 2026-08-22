"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Terminal,
  Activity,
  Globe,
  Network,
  Sparkles,
  Copy,
  Cpu,
  X,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { useToast } from "./Toast";

interface CommandItem {
  id: string;
  category: "Navigation" | "MCP Setup" | "Dev Tools" | "Cloud Providers";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette({
  open,
  setOpen,
  onOpenAiSimulator,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  onOpenAiSimulator?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const copyConfig = (type: "cursor" | "claude" | "zed" | "curl") => {
    let text = "";
    if (type === "cursor" || type === "claude") {
      text = JSON.stringify(
        { mcpServers: { worldpulse: { url: "https://wolrdpulse.app/sse" } } },
        null,
        2
      );
    } else if (type === "zed") {
      text = JSON.stringify(
        { context_servers: { worldpulse: { url: "https://wolrdpulse.app/sse" } } },
        null,
        2
      );
    } else {
      text = `curl -X POST https://wolrdpulse.app/api/mcp -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_cloud_status"}}'`;
    }

    navigator.clipboard.writeText(text);
    toast({
      type: "success",
      message: `${type.toUpperCase()} MCP config copied!`,
      description: "Paste into your IDE or terminal to connect instantly.",
    });
    setOpen(false);
  };

  const scrollToSection = (id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const items: CommandItem[] = [
    {
      id: "ai-sim",
      category: "Dev Tools",
      title: "Open AI Agent Simulator",
      subtitle: "Simulate Cursor / Claude calling MCP tools in real-time",
      icon: <Sparkles className="h-4 w-4 text-emerald-400" />,
      action: () => {
        setOpen(false);
        onOpenAiSimulator?.();
      },
    },
    {
      id: "copy-cursor",
      category: "MCP Setup",
      title: "Copy Cursor MCP Configuration",
      subtitle: "Add wolrdpulse to .cursor/mcp.json",
      icon: <Cpu className="h-4 w-4 text-teal-400" />,
      action: () => copyConfig("cursor"),
    },
    {
      id: "copy-claude",
      category: "MCP Setup",
      title: "Copy Claude Desktop Configuration",
      subtitle: "Add wolrdpulse to claude_desktop_config.json",
      icon: <Cpu className="h-4 w-4 text-teal-400" />,
      action: () => copyConfig("claude"),
    },
    {
      id: "copy-curl",
      category: "MCP Setup",
      title: "Copy cURL MCP Test Command",
      subtitle: "Run JSON-RPC tools/call over HTTP",
      icon: <Terminal className="h-4 w-4 text-cyan-400" />,
      action: () => copyConfig("curl"),
    },
    {
      id: "nav-cloud",
      category: "Navigation",
      title: "Jump to Global Cloud Radar",
      subtitle: "View live status for AWS, GitHub, OpenAI, Supabase, Vercel",
      icon: <Activity className="h-4 w-4 text-emerald-400" />,
      action: () => scrollToSection("cloud-radar"),
    },
    {
      id: "nav-pinger",
      category: "Navigation",
      title: "Jump to Edge Latency Pinger",
      subtitle: "Measure TTFB, status codes, and HTTP headers",
      icon: <Globe className="h-4 w-4 text-cyan-400" />,
      action: () => scrollToSection("pinger-section"),
    },
    {
      id: "nav-dns",
      category: "Navigation",
      title: "Jump to DNS-over-HTTPS (DoH) Resolver",
      subtitle: "Query A, AAAA, CNAME, MX, TXT records via Cloudflare",
      icon: <Network className="h-4 w-4 text-teal-400" />,
      action: () => scrollToSection("dns-section"),
    },
    {
      id: "nav-tech-pulse",
      category: "Navigation",
      title: "Jump to Tech Release Pulse",
      subtitle: "Latest releases for Kubernetes, Bun, Next.js, Rust",
      icon: <Sparkles className="h-4 w-4 text-amber-400" />,
      action: () => scrollToSection("tech-pulse"),
    },
    {
      id: "prov-github",
      category: "Cloud Providers",
      title: "GitHub Status",
      subtitle: "Open official githubstatus.com",
      icon: <ExternalLink className="h-4 w-4 text-slate-400" />,
      action: () => {
        window.open("https://www.githubstatus.com", "_blank");
        setOpen(false);
      },
    },
    {
      id: "prov-openai",
      category: "Cloud Providers",
      title: "OpenAI Status",
      subtitle: "Open official status.openai.com",
      icon: <ExternalLink className="h-4 w-4 text-slate-400" />,
      action: () => {
        window.open("https://status.openai.com", "_blank");
        setOpen(false);
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleArrowKeys = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[12vh] bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl overflow-hidden backdrop-blur-xl animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-slate-800 px-4 py-3.5 bg-slate-950/60">
          <Search className="h-4 w-4 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleArrowKeys}
            placeholder="Type a command or search (e.g. 'Cursor', 'GitHub', 'DNS')..."
            className="w-full bg-transparent font-mono text-xs text-white placeholder-slate-500 focus:outline-none"
          />
          <kbd className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">ESC</kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              No matching commands found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between gap-3 rounded-xl p-3 text-left transition font-mono text-xs ${
                  selectedIndex === idx
                    ? "bg-emerald-500/15 text-white border border-emerald-500/40"
                    : "text-slate-300 hover:bg-slate-800/60 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-2 rounded-lg ${
                      selectedIndex === idx ? "bg-emerald-950 border border-emerald-800" : "bg-slate-950 border border-slate-800"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{item.title}</div>
                    {item.subtitle && <div className="text-[11px] text-slate-400 truncate">{item.subtitle}</div>}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 rounded bg-slate-950 px-2 py-0.5">
                    {item.category}
                  </span>
                  <ArrowRight className={`h-3.5 w-3.5 ${selectedIndex === idx ? "text-emerald-400" : "opacity-0"}`} />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between border-t border-slate-800/80 bg-slate-950/80 px-4 py-2 text-[10px] font-mono text-slate-500">
          <span>Navigate: ↑ ↓ • Select: ↵</span>
          <span>WolrdPulse Quick Actions</span>
        </div>
      </div>
    </div>
  );
}
