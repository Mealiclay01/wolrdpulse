"use client";

import React from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import BrandLogo from "@/components/BrandLogo";
import { Github, Terminal, Heart, ArrowLeft } from "lucide-react";

interface NavbarProps {
  onConnectClick?: () => void;
  showBackToHome?: boolean;
  t: any;
  locale: string;
}

export default function Navbar({ onConnectClick, showBackToHome, t, locale }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-[var(--border)] px-4 sm:px-6 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href={`/${locale}`} className="group flex items-center">
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-[var(--muted-foreground)]">
            <Link 
              href={`/${locale}/features`} 
              className="px-3 py-1.5 rounded-md hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            >
              {t.features}
            </Link>
            <Link 
              href={`/${locale}/developer`} 
              className="px-3 py-1.5 rounded-md hover:text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors flex items-center gap-1"
            >
              <Heart size={12} className="text-rose-500 fill-rose-500/30" />
              {t.sponsor}
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Mealiclay01/wolrdpulse"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
            title="View on GitHub"
          >
            <Github size={14} />
            <span className="hidden lg:inline">GitHub</span>
          </a>

          <ThemeToggle />

          {onConnectClick ? (
            <button
              onClick={onConnectClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold hover:opacity-90 transition-all shadow-sm cursor-pointer"
            >
              <Terminal size={13} />
              <span>{t.connectAgent}</span>
            </button>
          ) : (
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              <ArrowLeft size={13} />
              <span>{t.backHome}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
