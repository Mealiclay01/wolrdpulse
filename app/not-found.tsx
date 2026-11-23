import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Error: Page Not Found | WolrdPulse",
  description: "The telemetry endpoint or route you requested does not exist.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070a11] text-white flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-lg">
          <Activity size={28} />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-400">404 Error</span>
          <h1 className="text-3xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The telemetry endpoint or route you requested does not exist or has been relocated.
          </p>
        </div>
        <div>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all"
          >
            <ArrowLeft size={14} />
            <span>Return to WolrdPulse</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
