import React from "react";

interface FactLiveLogoProps {
  className?: string;
  size?: number | string;
  showText?: boolean;
  textSize?: "sm" | "md" | "lg" | "xl";
  lightMode?: boolean;
}

export const FactLiveLogo: React.FC<FactLiveLogoProps> = ({
  className = "",
  size = 40,
  showText = false,
  textSize = "md",
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Exact FL Monogram Roundel SVG */}
      <svg
        viewBox="0 0 500 500"
        width={size}
        height={size}
        className="shrink-0 transition-transform duration-200"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="FactLive Logo"
      >
        {/* Navy Circular Background */}
        <circle cx="250" cy="250" r="230" fill="#0A182E" />

        {/* Stylized White "F" with smooth top-left curve and chamfered terminal */}
        <path
          d="M 170 375
             L 218 375
             L 218 290
             L 278 290
             L 306 242
             L 218 242
             L 218 194
             L 344 194
             L 322 142
             L 226 142
             C 188 142, 170 165, 170 204
             Z"
          fill="#FFFFFF"
        />

        {/* Stylized Crimson Red "L" nested with chevron wedge top */}
        <path
          d="M 284 246
             L 252 300
             L 252 375
             L 348 375
             L 348 326
             L 298 326
             L 298 272
             Z"
          fill="#D91621"
        />
      </svg>

      {showText && (
        <div className="flex flex-col text-left">
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
            <span className="border border-stone-800 dark:border-stone-300 bg-[#F4EFE6] dark:bg-[#22201D] px-1 py-0.2 font-mono text-[9px] font-bold text-stone-900 dark:text-stone-100 uppercase tracking-widest">
              .IN
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-wider text-stone-500 dark:text-stone-400 uppercase">
            www.factlive.in
          </span>
        </div>
      )}
    </div>
  );
};
