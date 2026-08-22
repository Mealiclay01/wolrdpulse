"use client";

import React, { useState, useEffect } from "react";
import { ServiceStatus } from "@/lib/services/cloudStatus";
import { formatMs } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw } from "lucide-react";

export default function CloudStatusGrid() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/status");
      const json = await res.json();
      if (json.services) {
        setServices(json.services);
      }
    } catch (err) {
      console.error("Failed to load status:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[var(--border)] text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
            <th className="py-3 px-4">Provider</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Edge Latency</th>
            <th className="py-3 px-4">Active Incidents</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)] text-sm">
          {loading && services.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-10 text-[var(--muted-foreground)]">
                <div className="inline-flex items-center gap-2">
                  <RefreshCw size={16} className="animate-spin text-blue-500" />
                  <span>Streaming live cloud telemetry...</span>
                </div>
              </td>
            </tr>
          ) : (
            services.map((service) => (
              <tr key={service.id} className="hover:bg-[var(--muted)]/50 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[var(--foreground)]">{service.name}</td>
                <td className="py-3.5 px-4 text-xs font-mono text-[var(--muted-foreground)]">{service.category}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    {service.status === 'operational' ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                        Operational
                      </span>
                    ) : service.status === 'degraded' ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 animate-pulse">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        Degraded Performance
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 animate-pulse">
                        <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                        Major Outage
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3.5 px-4 font-mono text-xs font-medium text-[var(--foreground)]">
                  {service.latencyMs ? formatMs(service.latencyMs) : "—"}
                </td>
                <td className="py-3.5 px-4 text-xs">
                  {service.incidents.length > 0 ? (
                    <span className="font-semibold text-rose-500">{service.incidents[0].name}</span>
                  ) : (
                    <span className="text-[var(--muted-foreground)]">0 incidents reported</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
