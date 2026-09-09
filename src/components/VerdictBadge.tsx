import React from "react";
import {
  Check,
  CheckCheck,
  AlertTriangle,
  X,
  Clock,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { VerdictType } from "../types";

interface VerdictBadgeProps {
  verdict: VerdictType;
  size?: "sm" | "md" | "lg";
}

export const getVerdictConfig = (verdict: VerdictType) => {
  switch (verdict) {
    case "VERIFIED_TRUE":
      return {
        label: "VERIFIED TRUE",
        sealText: "DOCUMENTED FACT",
        color: "text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-700/60 dark:border-emerald-500/40",
        stampColor: "border-emerald-700 text-emerald-800 dark:text-emerald-300 dark:border-emerald-500",
        barColor: "bg-emerald-700 dark:bg-emerald-500",
        icon: CheckCheck,
        symbol: "★",
        desc: "Corroborated by primary institutional records & empirical proof",
      };
    case "MOSTLY_TRUE":
      return {
        label: "MOSTLY TRUE",
        sealText: "ACCURATE SUBSTANCE",
        color: "text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 border-teal-700/60 dark:border-teal-500/40",
        stampColor: "border-teal-700 text-teal-800 dark:text-teal-300 dark:border-teal-500",
        barColor: "bg-teal-600 dark:bg-teal-400",
        icon: Check,
        symbol: "✦",
        desc: "Accurate in substance; minor contextual nuance required",
      };
    case "HALF_TRUE":
      return {
        label: "HALF TRUE / MIXED",
        sealText: "SELECTIVE CONTEXT",
        color: "text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 border-amber-700/60 dark:border-amber-500/40",
        stampColor: "border-amber-700 text-amber-800 dark:text-amber-300 dark:border-amber-500",
        barColor: "bg-amber-600 dark:bg-amber-400",
        icon: HelpCircle,
        symbol: "◈",
        desc: "Partially accurate but omits crucial countervailing facts",
      };
    case "MOSTLY_FALSE":
      return {
        label: "MOSTLY FALSE",
        sealText: "MATERIAL DISTORTION",
        color: "text-orange-900 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/50 border-orange-700/60 dark:border-orange-500/40",
        stampColor: "border-orange-700 text-orange-900 dark:text-orange-300 dark:border-orange-500",
        barColor: "bg-orange-600 dark:bg-orange-400",
        icon: AlertTriangle,
        symbol: "⚠",
        desc: "An element of truth is weaponized to draw false conclusions",
      };
    case "FALSE":
      return {
        label: "DOCUMENTED FALSEHOOD",
        sealText: "DEBUNKED RUMOR",
        color: "text-rose-900 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 border-rose-700/60 dark:border-rose-500/40",
        stampColor: "border-rose-700 text-rose-900 dark:text-rose-300 dark:border-rose-500",
        barColor: "bg-rose-700 dark:bg-rose-500",
        icon: X,
        symbol: "✕",
        desc: "Factually unfounded and disproven by verifiable evidence",
      };
    case "MISLEADING":
      return {
        label: "MISLEADING CONTEXT",
        sealText: "DECONTEXTUALIZED",
        color: "text-purple-900 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 border-purple-700/60 dark:border-purple-500/40",
        stampColor: "border-purple-700 text-purple-900 dark:text-purple-300 dark:border-purple-500",
        barColor: "bg-purple-600 dark:bg-purple-400",
        icon: AlertTriangle,
        symbol: "⟐",
        desc: "Authentic imagery or quotes stripped of chronological context",
      };
    default:
      return {
        label: "UNDER INVESTIGATION",
        sealText: "ACTIVE INQUEST",
        color: "text-stone-800 dark:text-stone-300 bg-stone-100 dark:bg-stone-900 border-stone-400 dark:border-stone-700",
        stampColor: "border-stone-500 text-stone-700 dark:text-stone-300 dark:border-stone-600",
        barColor: "bg-stone-500 dark:bg-stone-400",
        icon: Clock,
        symbol: "⏱",
        desc: "Insufficient verifiable records to deliver definitive ruling",
      };
  }
};

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({
  verdict,
  size = "md",
}) => {
  const config = getVerdictConfig(verdict);
  const Icon = config.icon;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] gap-1 tracking-wider",
    md: "px-2.5 py-1 text-xs font-bold gap-1.5 tracking-wider",
    lg: "px-3.5 py-1.5 text-xs sm:text-sm font-extrabold gap-2 tracking-widest",
  }[size];

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-3.5 w-3.5",
    lg: "h-4 w-4",
  }[size];

  return (
    <span
      className={`inline-flex items-center border border-dashed rounded-none font-mono uppercase transition-colors select-none shadow-sm ${config.color} ${sizeClasses}`}
      style={{ letterSpacing: "0.08em" }}
    >
      <span className="font-serif font-bold text-[1.1em] leading-none opacity-80">
        {config.symbol}
      </span>
      <span>{config.label}</span>
    </span>
  );
};
