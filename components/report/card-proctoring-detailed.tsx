"use client";

import { Proctoring } from "@/lib/mock-report-data";

interface CardProctoringDetailedProps {
  proctoring: Proctoring;
}

function getRiskGradient(risk: string): { from: string; to: string } {
  switch (risk.toLowerCase()) {
    case "low":
      return { from: "#16A34A", to: "#4ADE80" };
    case "medium":
      return { from: "#D97706", to: "#FBBF24" };
    case "high":
      return { from: "#DC2626", to: "#F87171" };
    default:
      return { from: "#6B7280", to: "#9CA3AF" };
  }
}

const metricColors = [
  { from: "#0284C7", to: "#38BDF8", bg: "from-sky-50 to-sky-100/50", border: "border-sky-200" },
  { from: "#7C3AED", to: "#A78BFA", bg: "from-violet-50 to-violet-100/50", border: "border-violet-200" },
  { from: "#0D7377", to: "#14B8A6", bg: "from-teal-50 to-teal-100/50", border: "border-teal-200" },
  { from: "#4F46E5", to: "#818CF8", bg: "from-indigo-50 to-indigo-100/50", border: "border-indigo-200" },
  { from: "#E11D48", to: "#FB7185", bg: "from-rose-50 to-rose-100/50", border: "border-rose-200" },
  { from: "#D97706", to: "#FBBF24", bg: "from-amber-50 to-amber-100/50", border: "border-amber-200" },
];

function MetricTile({
  label,
  value,
  suffix,
  colorIndex,
}: {
  label: string;
  value: number;
  suffix?: string;
  colorIndex: number;
}) {
  const hasValue = value > 0;
  const colors = metricColors[colorIndex % metricColors.length];
  const alertColors = hasValue ? { from: "#D97706", to: "#FBBF24" } : { from: "#16A34A", to: "#4ADE80" };

  return (
    <div
      className={`rounded-lg p-2.5 bg-gradient-to-br ${colors.bg} border ${colors.border} relative overflow-hidden`}
      style={{ height: "60px" }}
    >
      <div 
        className="absolute top-0 left-0 w-0.5 h-full"
        style={{ background: `linear-gradient(180deg, ${alertColors.from}, ${alertColors.to})` }}
      />
      <p className="text-[9px] uppercase tracking-[0.08em] text-[#6B7280] mb-0.5 font-semibold">
        {label}
      </p>
      <p className="text-[18px] font-bold text-[#1E2A4A] flex items-baseline gap-0.5">
        <span style={{ color: hasValue ? alertColors.from : "#1E2A4A" }}>{value}</span>
        {suffix && <span className="text-[11px] font-normal text-[#6B7280]">{suffix}</span>}
      </p>
    </div>
  );
}

export function CardProctoringDetailed({ proctoring }: CardProctoringDetailedProps) {
  const riskGradient = getRiskGradient(proctoring.riskLevel);

  const metrics = [
    { label: "Tab Switches", value: proctoring.tabSwitches },
    { label: "Rapid Answers", value: proctoring.rapidAnswers },
    { label: "Face Absent", value: proctoring.faceAbsentCount },
    { label: "Face Absent Dur.", value: proctoring.faceAbsentDuration, suffix: "s" },
    { label: "Multiple Faces", value: proctoring.multipleFacesCount },
    { label: "Gaze Away", value: proctoring.gazeAwayCount },
    { label: "Gaze Away Dur.", value: proctoring.gazeAwayDuration, suffix: "s" },
    { label: "Head Down", value: proctoring.headDownCount },
    { label: "Voice Detected", value: proctoring.voiceDetectedCount },
    { label: "Copy/Paste", value: proctoring.copyPasteAttempts },
    { label: "Fullscreen Exits", value: proctoring.fullscreenExits },
    { label: "Total Violations", value: proctoring.totalViolations },
  ];

  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white" style={{ maxHeight: "220px", breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      {/* Header */}
      <div className="px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-700 flex items-center justify-between">
        <h2 className="text-[12px] font-semibold text-white flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Proctoring Analysis
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] uppercase tracking-[0.08em] text-slate-400">
              Integrity
            </span>
            <span className="text-[14px] font-bold text-white">
              {proctoring.integrityScore}%
            </span>
          </div>
          <span
            className="px-2 py-1 rounded-full text-[10px] font-bold uppercase text-white"
            style={{ 
              background: `linear-gradient(135deg, ${riskGradient.from}, ${riskGradient.to})`
            }}
          >
            {proctoring.riskLevel} Risk
          </span>
        </div>
      </div>

      {/* Metrics Grid - 4 columns x 3 rows */}
      <div className="p-3">
        <div className="grid grid-cols-4 gap-2">
          {metrics.map((metric, index) => (
            <MetricTile
              key={metric.label}
              label={metric.label}
              value={metric.value}
              suffix={metric.suffix}
              colorIndex={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
