"use client";

import { Proctoring } from "@/lib/mock-report-data";

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
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const gradientId = `integrity-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradient.from} />
          <stop offset="100%" stopColor={gradient.to} />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="8"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 50 50)"
        className="transition-all duration-700 ease-out"
      />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        className="text-2xl font-bold"
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
      className={`rounded-xl p-5 border bg-gradient-to-br ${gradient.bg} ${gradient.border}`}
    >
      <h2 className="text-[11px] uppercase tracking-[0.08em] text-[#6B7280] font-semibold mb-4 flex items-center gap-2">
        <div 
          className="w-2 h-2 rounded-full"
          style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
        />
        Integrity Monitoring
      </h2>

      <div className="grid grid-cols-3 gap-6">
        {/* Integrity Score */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div 
              className="absolute inset-0 blur-xl rounded-full opacity-30"
              style={{ background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})` }}
            />
            <IntegrityRing score={proctoring.integrityScore} gradient={gradient} />
          </div>
          <p className="mt-2 text-sm font-semibold text-[#1E2A4A]">
            Integrity Score
          </p>
        </div>

        {/* Risk Level */}
        <div className="flex flex-col items-center justify-center">
          <span
            className="px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider text-white shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
              boxShadow: `0 4px 14px ${gradient.from}40`
            }}
          >
            {proctoring.riskLevel}
          </span>
          <p className="mt-3 text-sm font-semibold text-[#1E2A4A]">Risk Level</p>
        </div>

        {/* Total Violations */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <p 
              className="text-5xl font-bold"
              style={{ color: gradient.from }}
            >
              {proctoring.totalViolations}
            </p>
          </div>
          <p className="mt-2 text-sm font-semibold text-[#1E2A4A]">
            Total Violations
          </p>
        </div>
      </div>
    </div>
  );
}
