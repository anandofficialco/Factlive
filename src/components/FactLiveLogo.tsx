import React from "react";

interface FactLiveLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textSize?: "sm" | "md" | "lg" | "xl";
  showSubtitle?: boolean;
  variant?: "roundel" | "clean" | "monochrome";
}

export const FactLiveLogo: React.FC<FactLiveLogoProps> = ({
  className = "",
  size = 40,
  showText = false,
  textSize = "md",
  showSubtitle = true,
  variant = "roundel",
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Precision FactLive Crest Monogram */}
      <svg
        viewBox="0 0 500 500"
        width={size}
        height={size}
        className="shrink-0 transition-transform duration-300 select-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FactLive Logo"
      >
        <defs>
          {/* Deep Royal Editorial Navy Radial Gradient */}
          <radialGradient
            id="factliveNavyGradient"
            cx="40%"
            cy="35%"
            r="65%"
            fx="30%"
            fy="25%"
          >
            <stop offset="0%" stopColor="#132743" />
            <stop offset="60%" stopColor="#0A182E" />
            <stop offset="100%" stopColor="#050C17" />
          </radialGradient>

          {/* Crimson Red Gradient */}
          <linearGradient
            id="factliveCrimsonGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FF2A3A" />
            <stop offset="100%" stopColor="#C40E1B" />
          </linearGradient>

          {/* Subtle Outer Gold Ring Gradient */}
          <linearGradient
            id="factliveGoldRing"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#E6C875" />
            <stop offset="50%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#9B7A38" />
          </linearGradient>

          {/* Clean Drop Shadow for Crest Elements */}
          <filter id="crestShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.35" />
          </filter>
        </defs>

        {variant === "roundel" && (
          <>
            {/* Outer Subtle Concentric Gold Accent Ring */}
            <circle
              cx="250"
              cy="250"
              r="242"
              fill="none"
              stroke="url(#factliveGoldRing)"
              strokeWidth="5"
              opacity="0.85"
            />

            {/* Inner Concentric Hairline Ring */}
            <circle
              cx="250"
              cy="250"
              r="236"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              opacity="0.25"
            />

            {/* Deep Navy Circular Background */}
            <circle
              cx="250"
              cy="250"
              r="230"
              fill="url(#factliveNavyGradient)"
            />
          </>
        )}

        {variant === "clean" && (
          <circle cx="250" cy="250" r="235" fill="#0A182E" />
        )}

        {variant === "monochrome" && (
          <circle cx="250" cy="250" r="235" fill="#1C1917" />
        )}

        {/* Group with slight depth filter */}
        <g filter="url(#crestShadow)">
          {/* Stylized Pure White "F" Monogram with Precision Bevels */}
          <path
            d="M 168 380
               L 220 380
               L 220 292
               L 282 292
               L 310 242
               L 220 242
               L 220 190
               L 348 190
               L 326 138
               L 226 138
               C 184 138, 168 162, 168 202
               Z"
            fill={variant === "monochrome" ? "#FFFFFF" : "#FFFFFF"}
          />

          {/* Stylized Vibrant Crimson Red "L" Monogram Interlocking with F */}
          <path
            d="M 288 244
               L 254 300
               L 254 380
               L 352 380
               L 352 328
               L 302 328
               L 302 272
               Z"
            fill={variant === "monochrome" ? "#FFFFFF" : "url(#factliveCrimsonGradient)"}
          />
        </g>
      </svg>

      {showText && (
        <div className="flex flex-col text-left select-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black font-serif tracking-tight text-stone-900 dark:text-stone-100 leading-none ${
                textSize === "sm"
                  ? "text-lg"
                  : textSize === "lg"
                  ? "text-2xl sm:text-3xl"
                  : textSize === "xl"
                  ? "text-3xl sm:text-4xl"
                  : "text-xl sm:text-2xl"
              }`}
            >
              FACTLIVE
            </span>
            <span className="border-2 border-stone-900 dark:border-stone-300 bg-[#F4EFE6] dark:bg-[#22201D] px-1.5 py-0.2 font-mono text-[9px] font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest shadow-2xs">
              .IN
            </span>
          </div>
          {showSubtitle && (
            <span className="text-[10px] font-mono tracking-wider text-stone-500 dark:text-stone-400 uppercase mt-0.5">
              www.factlive.in
            </span>
          )}
        </div>
      )}
    </div>
  );
};
