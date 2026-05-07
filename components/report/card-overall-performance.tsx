"use client";

import { Summary, Attempt, Section } from "@/lib/mock-report-data";
import { useId } from "react";

interface CardOverallPerformanceProps {
  summary: Summary;
  attempt: Attempt;
  sections: Section[];
}

function getBandGradient(band: string): { from: string; to: string; text: string } {
  const bandLower = band.toLowerCase();
  switch (bandLower) {
    case "exceptional":
      return { from: "#16A34A", to: "#4ADE80", text: "#16A34A" };
    case "strong":
      return { from: "#0D7377", to: "#14B8A6", text: "#0D7377" };
    case "moderate":
      return { from: "#D97706", to: "#FBBF24", text: "#D97706" };
    case "developing":
      return { from: "#EA580C", to: "#FB923C", text: "#EA580C" };
    case "low":
      return { from: "#DC2626", to: "#F87171", text: "#DC2626" };
    default:
      return { from: "#0D7377", to: "#14B8A6", text: "#0D7377" };
  }
}

function getVerdictGradient(verdict: string): { from: string; to: string } {
  switch (verdict) {
    case "Strong Fit":
      return { from: "#16A34A", to: "#4ADE80" };
    case "Potential Fit":
      return { from: "#0D7377", to: "#14B8A6" };
    case "Needs Review":
      return { from: "#D97706", to: "#FBBF24" };
    case "Not Recommended":
      return { from: "#DC2626", to: "#F87171" };
    default:
      return { from: "#0D7377", to: "#14B8A6" };
  }
}

function ScoreRing({
  score,
  maxScore,
  bandGradient,
}: {
  score: number;
  maxScore: number;
  bandGradient: { from: string; to: string; text: string };
}) {
  const percentage = (score / maxScore) * 100;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const gradientId = useId();

  return (
    <svg width="96" height="96" viewBox="0 0 96 96">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={bandGradient.from} />
          <stop offset="100%" stopColor={bandGradient.to} />
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle
        cx="48"
        cy="48"
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="8"
      />
      {/* Progress circle with gradient */}
      <circle
        cx="48"
        cy="48"
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 48 48)"
      />
      {/* Score text */}
      <text
        x="48"
        y="44"
        textAnchor="middle"
        className="text-[22px] font-bold"
        fill="#1E2A4A"
      >
        {score}%
      </text>
      <text x="48" y="58" textAnchor="middle" className="text-[11px]" fill="#6B7280">
        /{maxScore}
      </text>
    </svg>
  );
}

export function CardOverallPerformance({
  summary,
  attempt,
  sections,
}: CardOverallPerformanceProps) {
  const bandGradient = getBandGradient(summary.scoreBandLabel);
  const verdictGradient = getVerdictGradient(summary.hiringVerdict);
  const isCompleted = attempt.status === "completed";

  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <div className="relative p-4">
        <h2 className="text-[11px] uppercase tracking-[0.08em] text-[#0D7377] font-semibold mb-3 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#0D7377] to-[#14B8A6]" />
          Overall Performance
        </h2>

        <div className="grid grid-cols-3 gap-4">
          {/* Column 1 - Score Display */}
          <div className="flex flex-col items-center">
            <ScoreRing
              score={summary.overallScore}
              maxScore={summary.totalMarks}
              bandGradient={bandGradient}
            />
            <span
              className="mt-2 px-3 py-1 rounded-full text-[10px] font-bold text-white"
              style={{ 
                background: `linear-gradient(135deg, ${bandGradient.from} 0%, ${bandGradient.to} 100%)`
              }}
            >
              {summary.scoreBandLabel}
            </span>
            <p className="mt-1 text-[11px] text-[#6B7280]">
              Top {100 - summary.percentile}%
            </p>
          </div>

          {/* Column 2 - Stats Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 rounded-lg p-2 text-center border border-sky-200/50">
              <p className="text-[18px] font-bold text-[#0284C7]">
                {summary.overallAccuracy}%
              </p>
              <p className="text-[9px] uppercase tracking-[0.08em] text-sky-600 font-semibold">
                Accuracy
              </p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-lg p-2 text-center border border-violet-200/50">
              <p className="text-[18px] font-bold text-[#7C3AED]">
                {attempt.durationFormatted}
              </p>
              <p className="text-[9px] uppercase tracking-[0.08em] text-violet-600 font-semibold">
                Duration
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg p-2 text-center border border-emerald-200/50">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                    : "bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900"
                }`}
              >
                {isCompleted ? "Done" : "Incomplete"}
              </span>
              <p className="text-[9px] uppercase tracking-[0.08em] text-emerald-600 mt-1 font-semibold">
                Status
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-lg p-2 text-center border border-indigo-200/50">
              <p className="text-[18px] font-bold text-[#4F46E5]">
                {sections.length}
              </p>
              <p className="text-[9px] uppercase tracking-[0.08em] text-indigo-600 font-semibold">
                Sections
              </p>
            </div>
          </div>

          {/* Column 3 - Verdict */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-[9px] uppercase tracking-[0.08em] text-[#6B7280] font-semibold mb-2">
              Hiring Verdict
            </p>
            <div
              className="w-full py-3 rounded-lg text-center"
              style={{ 
                background: `linear-gradient(135deg, ${verdictGradient.from} 0%, ${verdictGradient.to} 100%)`
              }}
            >
              <p className="text-white text-[14px] font-bold">
                {summary.hiringVerdict}
              </p>
            </div>
            <p
              className={`mt-2 text-[12px] font-semibold flex items-center gap-1 ${
                summary.passed ? "text-[#16A34A]" : "text-[#DC2626]"
              }`}
            >
              {summary.passed ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
              {summary.passed ? "Pass" : "Below threshold"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
