"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";

export const LOCALES = [
  { code: "en", label: "English", native: "English", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", dir: "rtl" },
  { code: "fr", label: "French", native: "Français", dir: "ltr" },
  { code: "de", label: "German", native: "Deutsch", dir: "ltr" },
  { code: "ru", label: "Russian", native: "Русский", dir: "ltr" },
  { code: "zh", label: "Chinese", native: "简体中文", dir: "ltr" },
  { code: "ko", label: "Korean", native: "한국어", dir: "ltr" },
  { code: "ja", label: "Japanese", native: "日本語", dir: "ltr" },
  { code: "es", label: "Spanish", native: "Español", dir: "ltr" },
];

export default function LanguageSelector({ currentLocale }: { currentLocale: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const current = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && LOCALES.some((l) => l.code === segments[0])) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }
    const rest = segments.slice(1).join("/");
    const englishOnly = /^(tools|integrations|status|guides)(\/|$)/.test(rest);
    const newPath = englishOnly && newLocale !== "en"
      ? `/${newLocale}`
      : `/${segments.join("/")}`;
    window.location.assign(newPath);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors focus:outline-none"
        title="Select Language"
      >
        <Globe size={13} className="text-[var(--muted-foreground)]" />
        <span className="font-mono uppercase">{current.code}</span>
        <ChevronDown size={11} className="text-[var(--muted-foreground)]" />
      </button>

      {isOpen && (
        <div className="absolute inset-inline-end-0 mt-1.5 w-44 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-xl p-1 z-[60] animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase text-[var(--muted-foreground)] border-b border-[var(--border)] mb-1">
            Language / اللغة
          </div>
          <div className="max-h-64 overflow-y-auto space-y-0.5">
            {LOCALES.map((locale) => {
              const isActive = locale.code === currentLocale;
              return (
                <button
                  key={locale.code}
                  onClick={() => switchLocale(locale.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                    isActive
                      ? "bg-[var(--foreground)] text-[var(--background)] font-medium"
                      : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono uppercase text-[10px] opacity-75">{locale.code}</span>
                    <span>{locale.native}</span>
                  </div>
                  {isActive && <Check size={12} />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
