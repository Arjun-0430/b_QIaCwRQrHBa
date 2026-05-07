"use client";

import { Proctoring } from "@/lib/mock-report-data";
import { useId } from "react";

interface CardProctoringCompactProps {
  proctoring: Proctoring;
}

function getRiskGradient(risk: string): { from: string; to: string; bg: string; border: string } {
  switch (risk.toLowerCase()) {
    case "low":
      return { from: "#16A34A", to: "#4ADE80", bg: "from-emerald-50 to-green-50", border: "border-emerald-200" };
    case "medium":
      return { from: "#D97706", to: "#FBBF24", bg: "from-amber-50 to-yellow-50", border: "border-amber-200" };
    case "high":
      return { from: "#DC2626", to: "#F87171", bg: "from-red-50 to-rose-50", border: "border-red-200" };
    default:
      return { from: "#6B7280", to: "#9CA3AF", bg: "from-slate-50 to-gray-50", border: "border-slate-200" };
  }
}

function IntegrityRing({ score, gradient }: { score: number; gradient: { from: string; to: string } }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const gradientId = useId();

  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradient.from} />
          <stop offset="100%" stopColor={gradient.to} />
        </linearGradient>
      </defs>
      <circle
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="6"
      />
      <circle
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 36 36)"
      />
      <text
        x="36"
        y="40"
        textAnchor="middle"
        className="text-[16px] font-bold"
        fill="#1E2A4A"
      >
        {score}
      </text>
    </svg>
  );
}

export function CardProctoringCompact({ proctoring }: CardProctoringCompactProps) {
  const gradient = getRiskGradient(proctoring.riskLevel);

  return (
    <div
      className={`rounded-lg py-4 px-4 border bg-gradient-to-br ${gradient.bg} ${gradient.border}`}
      style={{ maxHeight: "110px", breakInside: 'avoid', pageBreakInside: 'avoid' }}
    >
      <h2 className="text-[10px] uppercase tracking-[0.08em] text-[#6B7280] font-semibold mb-2 flex items-center gap-1.5">
        <div 
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
        />
        Integrity Monitoring
      </h2>

      <div className="grid grid-cols-3 gap-4 items-center">
        {/* Integrity Score */}
        <div className="flex items-center gap-3">
          <IntegrityRing score={proctoring.integrityScore} gradient={gradient} />
          <p className="text-[12px] font-semibold text-[#1E2A4A]">
            Integrity Score
          </p>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col items-center justify-center">
          <span
            className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white"
            style={{ 
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`
            }}
          >
            {proctoring.riskLevel}
          </span>
          <p className="mt-1 text-[11px] font-semibold text-[#1E2A4A]">Risk Level</p>
        </div>

        {/* Total Violations */}
        <div className="flex flex-col items-center justify-center">
          <p 
            className="text-[28px] font-bold"
            style={{ color: gradient.from }}
          >
            {proctoring.totalViolations}
          </p>
          <p className="text-[11px] font-semibold text-[#1E2A4A]">
            Total Violations
          </p>
        </div>
      </div>
    </div>
  );
}
