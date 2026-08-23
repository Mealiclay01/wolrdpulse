import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";

export default function LocalizedNotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-lg">
          <Activity size={28} />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--muted)] text-[var(--muted-foreground)]">404 Error</span>
          <h1 className="text-3xl font-bold tracking-tight">Page Not Found</h1>
          <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
        </div>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold shadow-md hover:opacity-90 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Return to WolrdPulse</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
