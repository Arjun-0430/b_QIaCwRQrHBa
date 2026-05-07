"use client";

import { Summary, Attempt, Section } from "@/lib/mock-report-data";

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
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const gradientId = `score-gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={bandGradient.from} />
          <stop offset="100%" stopColor={bandGradient.to} />
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle
        cx="65"
        cy="65"
        r={radius}
        fill="none"
        stroke="#E5E7EB"
        strokeWidth="10"
      />
      {/* Progress circle with gradient */}
      <circle
        cx="65"
        cy="65"
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform="rotate(-90 65 65)"
        className="transition-all duration-700 ease-out"
      />
      {/* Score text */}
      <text
        x="65"
        y="58"
        textAnchor="middle"
        className="text-3xl font-bold"
        fill="#1E2A4A"
      >
        {score}%
      </text>
      <text x="65" y="78" textAnchor="middle" className="text-sm" fill="#6B7280">
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
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/30 via-transparent to-indigo-50/30 pointer-events-none" />
      
      <div className="relative p-6">
        <h2 className="text-[11px] uppercase tracking-[0.08em] text-[#0D7377] font-semibold mb-5 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0D7377] to-[#14B8A6]" />
          Overall Performance
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {/* Column 1 - Score Display */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 to-transparent rounded-full blur-xl" />
              <ScoreRing
                score={summary.overallScore}
                maxScore={summary.totalMarks}
                bandGradient={bandGradient}
              />
            </div>
            <span
              className="mt-3 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${bandGradient.from} 0%, ${bandGradient.to} 100%)`,
                boxShadow: `0 4px 14px ${bandGradient.from}40`
              }}
            >
              {summary.scoreBandLabel}
            </span>
            <p className="mt-2 text-sm text-[#6B7280]">
              Top {100 - summary.percentile}% of candidates
            </p>
          </div>

          {/* Column 2 - Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 rounded-xl p-3 text-center border border-sky-200/50">
              <p className="text-2xl font-bold text-[#0284C7]">
                {summary.overallAccuracy}%
              </p>
              <p className="text-[10px] uppercase tracking-[0.08em] text-sky-600 mt-1 font-semibold">
                Accuracy
              </p>
            </div>
            <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl p-3 text-center border border-violet-200/50">
              <p className="text-2xl font-bold text-[#7C3AED]">
                {attempt.durationFormatted}
              </p>
              <p className="text-[10px] uppercase tracking-[0.08em] text-violet-600 mt-1 font-semibold">
                Duration
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-3 text-center border border-emerald-200/50">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                    : "bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900"
                }`}
              >
                {isCompleted ? "Completed" : "Incomplete"}
              </span>
              <p className="text-[10px] uppercase tracking-[0.08em] text-emerald-600 mt-2 font-semibold">
                Status
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl p-3 text-center border border-indigo-200/50">
              <p className="text-2xl font-bold text-[#4F46E5]">
                {sections.length}
              </p>
              <p className="text-[10px] uppercase tracking-[0.08em] text-indigo-600 mt-1 font-semibold">
                Sections
              </p>
            </div>
          </div>

          {/* Column 3 - Verdict */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-[10px] uppercase tracking-[0.08em] text-[#6B7280] font-semibold mb-3">
              Hiring Verdict
            </p>
            <div
              className="w-full py-5 rounded-xl text-center shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${verdictGradient.from} 0%, ${verdictGradient.to} 100%)`,
                boxShadow: `0 8px 20px ${verdictGradient.from}30`
              }}
            >
              <p className="text-white text-lg font-bold">
                {summary.hiringVerdict}
              </p>
            </div>
            <p
              className={`mt-3 text-sm font-semibold flex items-center gap-1.5 ${
                summary.passed ? "text-[#16A34A]" : "text-[#DC2626]"
              }`}
            >
              {summary.passed ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
              {summary.passed ? "Pass" : "Did not meet threshold"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
