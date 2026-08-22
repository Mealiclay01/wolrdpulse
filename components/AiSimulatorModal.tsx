"use client";

import React, { useState } from "react";
import { Sparkles, Terminal, Cpu, ArrowRight, Play, CheckCircle2, RefreshCw, X, Copy, Zap } from "lucide-react";
import { useToast } from "./Toast";

interface SimulationStep {
  type: "thinking" | "tool_call" | "tool_result" | "response";
  content: string;
  toolName?: string;
  payload?: any;
  durationMs?: number;
}

export default function AiSimulatorModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedAgent, setSelectedAgent] = useState<"cursor" | "claude" | "antigravity">("cursor");
  const [selectedPrompt, setSelectedPrompt] = useState("Is GitHub or Supabase having an outage right now?");
  const [customPrompt, setCustomPrompt] = useState("");
  const [simulating, setSimulating] = useState(false);
  const [steps, setSteps] = useState<SimulationStep[]>([]);
  const { toast } = useToast();

  const presets = [
    {
      label: "Check Cloud Outages",
      prompt: "Is GitHub or Supabase having an outage right now?",
      tool: "get_cloud_status",
      args: { provider: "github" },
    },
    {
      label: "Ping Edge API",
      prompt: "Ping https://api.github.com and inspect TTFB latency & response headers",
      tool: "ping_endpoint",
      args: { url: "https://api.github.com" },
    },
    {
      label: "Query DNS Records",
      prompt: "Inspect DNS A records for wolrdpulse.app using Cloudflare DoH",
      tool: "inspect_dns",
      args: { domain: "wolrdpulse.app", recordType: "A" },
    },
    {
      label: "Tech Release Radar",
      prompt: "What are the latest developer tool releases across Kubernetes & Next.js?",
      tool: "get_tech_pulse",
      args: {},
    },
  ];

  const runSimulation = async () => {
    const promptText = customPrompt.trim() || selectedPrompt;
    setSimulating(true);
    setSteps([]);

    // Step 1: Simulated Agent Thinking
    setSteps([
      {
        type: "thinking",
        content: `Analyzing prompt: "${promptText}"\nSelecting relevant tool from WolrdPulse MCP Server (/sse)...`,
      },
    ]);

    await new Promise((r) => setTimeout(r, 600));

    // Match preset or default
    const matched = presets.find((p) => p.prompt === promptText) || presets[0];

    // Step 2: Tool Call Dispatch
    setSteps((prev) => [
      ...prev,
      {
        type: "tool_call",
        toolName: matched.tool,
        content: `Invoking tool: ${matched.tool}`,
        payload: matched.args,
      },
    ]);

    const startTime = performance.now();
    let toolResult: any;

    try {
      const res = await fetch("/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: Date.now(),
          method: "tools/call",
          params: {
            name: matched.tool,
            arguments: matched.args,
          },
        }),
      });

      const json = await res.json();
      const rawText = json?.result?.content?.[0]?.text;
      toolResult = rawText ? JSON.parse(rawText) : json;
    } catch (err: any) {
      toolResult = { error: err.message };
    }

    const durationMs = Math.round(performance.now() - startTime);

    // Step 3: Tool Result
    setSteps((prev) => [
      ...prev,
      {
        type: "tool_result",
        toolName: matched.tool,
        content: `Received payload from WolrdPulse Edge MCP`,
        payload: toolResult,
        durationMs,
      },
    ]);

    await new Promise((r) => setTimeout(r, 500));

    // Step 4: Final Synthesized AI Response
    let finalAnswer = "";
    if (matched.tool === "get_cloud_status") {
      finalAnswer = `✅ **${toolResult.name || "Provider"}** is currently **${toolResult.status || "Operational"}** with an edge latency of **${toolResult.latencyMs || 10}ms**. ${
        toolResult.incidents?.length > 0
          ? `⚠️ Active incident: ${toolResult.incidents[0].name}`
          : "Zero active incidents reported across global regions."
      }`;
    } else if (matched.tool === "ping_endpoint") {
      finalAnswer = `🚀 **Ping Result for ${toolResult.url}**: Status **HTTP ${toolResult.statusCode} ${toolResult.statusText}** with a Time to First Byte (TTFB) of **${toolResult.totalTimeMs}ms**. Server identified as \`${toolResult.headers?.server || "Unknown"}\`.`;
    } else if (matched.tool === "inspect_dns") {
      finalAnswer = `🔍 **DNS Resolution for ${toolResult.domain}** (${toolResult.recordType}): Status **${toolResult.statusName}**. Resolved IP records: \`${toolResult.answers?.map((a: any) => a.data).join(", ") || "No records"}\` (Query time: ${toolResult.rawResponseTimeMs}ms).`;
    } else {
      finalAnswer = `📦 **Latest Releases**: Found ${toolResult.releases?.length || 0} framework updates (e.g. Next.js ${toolResult.releases?.[0]?.version || "latest"}, Bun, Rust, Kubernetes) and ${toolResult.trending?.length || 0} trending repositories.`;
    }

    setSteps((prev) => [
      ...prev,
      {
        type: "response",
        content: finalAnswer,
      },
    ]);

    setSimulating(false);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI Agent Simulator"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[85vh] flex flex-col rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white font-mono text-sm sm:text-base">
                Live AI Agent MCP Simulator
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Simulate how Cursor & Claude execute WolrdPulse tools in real-time
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Agent Selector */}
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Select AI Client:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: "cursor", label: "Cursor AI" },
                  { id: "claude", label: "Claude 3.7 Sonnet" },
                  { id: "antigravity", label: "Antigravity Agent" },
                ] as const
              ).map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent.id)}
                  className={`rounded-xl border p-3 text-xs font-mono font-medium transition text-center ${
                    selectedAgent === agent.id
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                  }`}
                >
                  {agent.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Presets */}
          <div>
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Select Test Prompt:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setSelectedPrompt(preset.prompt);
                    setCustomPrompt("");
                  }}
                  className={`rounded-xl border p-3 text-left font-mono text-xs transition ${
                    selectedPrompt === preset.prompt && !customPrompt
                      ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                      : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                  }`}
                >
                  <div className="font-semibold">{preset.label}</div>
                  <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{preset.prompt}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={runSimulation}
            disabled={simulating}
            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3 font-mono text-xs font-bold text-white shadow-lg transition hover:from-emerald-500 hover:to-teal-500 disabled:opacity-50"
          >
            {simulating ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Executing Simulation...</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 fill-white" />
                <span>Run Real-Time AI Simulation</span>
              </>
            )}
          </button>

          {/* Simulation Output Steps */}
          {steps.length > 0 && (
            <div className="rounded-2xl border border-slate-800 bg-[#070a11] p-5 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <span className="text-emerald-400 font-bold uppercase text-[11px] flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Execution Trace
                </span>
                <span className="text-slate-500 text-[10px]">MCP Transport: JSON-RPC 2.0</span>
              </div>

              {steps.map((step, idx) => (
                <div key={idx} className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-200">
                  {step.type === "thinking" && (
                    <div className="text-slate-400 italic bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
                      💡 {step.content}
                    </div>
                  )}

                  {step.type === "tool_call" && (
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-cyan-500/30 text-cyan-300">
                      <div className="font-bold flex items-center justify-between">
                        <span>⚡ Tool Request: <code className="text-cyan-400">{step.toolName}</code></span>
                        <span className="text-[10px] text-cyan-500">POST /api/mcp</span>
                      </div>
                      <pre className="text-[11px] text-slate-300 mt-2 bg-black/40 p-2 rounded overflow-x-auto">
                        {JSON.stringify(step.payload, null, 2)}
                      </pre>
                    </div>
                  )}

                  {step.type === "tool_result" && (
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-emerald-500/30 text-emerald-300">
                      <div className="font-bold flex items-center justify-between">
                        <span>📥 Tool Response: <code className="text-emerald-400">{step.toolName}</code></span>
                        <span className="text-[10px] text-emerald-400">{step.durationMs}ms</span>
                      </div>
                      <pre className="text-[11px] text-slate-300 mt-2 bg-black/40 p-2 rounded max-h-40 overflow-y-auto">
                        {JSON.stringify(step.payload, null, 2)}
                      </pre>
                    </div>
                  )}

                  {step.type === "response" && (
                    <div className="bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/40 text-emerald-200 leading-relaxed font-sans text-sm">
                      <div className="font-mono text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        AI Agent Answer:
                      </div>
                      {step.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
