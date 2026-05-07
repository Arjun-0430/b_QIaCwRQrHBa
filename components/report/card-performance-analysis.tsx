"use client";

import { Insights, Proctoring } from "@/lib/mock-report-data";

interface CardPerformanceAnalysisProps {
  insights: Insights;
  proctoring: Proctoring;
}

const insightStyles = [
  { from: "#0D7377", to: "#14B8A6", bg: "from-teal-50 to-teal-100/50", border: "border-teal-200", icon: "M9 12l2 2 4-4" },
  { from: "#1E2A4A", to: "#374785", bg: "from-slate-50 to-slate-100/50", border: "border-slate-200", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { from: "#4F46E5", to: "#818CF8", bg: "from-indigo-50 to-indigo-100/50", border: "border-indigo-200", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { from: "#16A34A", to: "#4ADE80", bg: "from-emerald-50 to-emerald-100/50", border: "border-emerald-200", icon: "M12 2v20M2 12h20" },
  { from: "#D97706", to: "#FBBF24", bg: "from-amber-50 to-amber-100/50", border: "border-amber-200", icon: "M12 9v2m0 4h.01" },
  { from: "#DC2626", to: "#F87171", bg: "from-red-50 to-red-100/50", border: "border-red-200", icon: "M9 12l2 2 4-4" },
];

function InsightBlock({
  style,
  label,
  text,
}: {
  style: typeof insightStyles[0];
  label: string;
  text: string;
}) {
  return (
    <div className={`rounded-xl p-4 bg-gradient-to-br ${style.bg} border ${style.border} hover:shadow-md transition-all`}>
      <div className="flex items-start gap-3">
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm"
          style={{ background: `linear-gradient(135deg, ${style.from}, ${style.to})` }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={style.icon} />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h4 
            className="font-bold text-[13px] mb-1"
            style={{ color: style.from }}
          >
            {label}
          </h4>
          <p className="text-[#6B7280] text-sm leading-relaxed">{text}</p>
        </div>
      </div>
    </div>
  );
}

export function CardPerformanceAnalysis({
  insights,
  proctoring,
}: CardPerformanceAnalysisProps) {
  const integrityStyle =
    proctoring.riskLevel === "low"
      ? insightStyles[3]
      : proctoring.riskLevel === "medium"
      ? insightStyles[4]
      : insightStyles[5];

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header with gradient */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#4F46E5] to-[#818CF8]">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-200">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          Performance Analysis
        </h2>
      </div>

      <div className="p-5 grid grid-cols-2 gap-4">
        <InsightBlock
          style={insightStyles[0]}
          label="Performance Summary"
          text={insights.performanceSummary}
        />
        <InsightBlock
          style={insightStyles[1]}
          label="Speed vs Accuracy"
          text={insights.speedVsAccuracy}
        />
        <InsightBlock
          style={insightStyles[2]}
          label="Consistency"
          text={insights.consistencyInsight}
        />
        <InsightBlock
          style={insightStyles[3]}
          label="Strength Pattern"
          text={insights.strengthPattern}
        />
        <InsightBlock
          style={insightStyles[4]}
          label="Weakness Pattern"
          text={insights.weaknessPattern}
        />
        <InsightBlock
          style={integrityStyle}
          label="Integrity Note"
          text={insights.integrityNote}
        />
      </div>
    </div>
  );
}
