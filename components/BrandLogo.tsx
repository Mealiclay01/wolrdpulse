import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function BrandLogo({ size = "md", showText = true, className = "" }: BrandLogoProps) {
  const iconSizes = {
    sm: "w-6 h-6 rounded-md text-xs",
    md: "w-7 h-7 rounded-lg text-sm",
    lg: "w-9 h-9 rounded-xl text-base",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Crisp White Rounded Square with Bold Black W */}
      <div 
        className={`${iconSizes[size]} bg-white text-black font-extrabold flex items-center justify-center shadow-sm border border-black/10 shrink-0 transition-transform group-hover:scale-105`}
        style={{ fontFamily: "var(--font-sans, system-ui, -apple-system, sans-serif)" }}
      >
        W
      </div>

      {showText && (
        <span 
          className={`${textSizes[size]} font-bold tracking-tight text-[var(--foreground)] leading-none`}
        >
          WolrdPulse
        </span>
      )}
    </div>
  );
}
