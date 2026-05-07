"use client";

import { Recommendations } from "@/lib/mock-report-data";

interface CardRecommendationsProps {
  recommendations: Recommendations;
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

export function CardRecommendations({
  recommendations,
}: CardRecommendationsProps) {
  const verdictGradient = getVerdictGradient(recommendations.verdict);

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
      {/* Verdict Banner with gradient */}
      <div
        className="px-6 py-6 flex items-center justify-between relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${verdictGradient.from} 0%, ${verdictGradient.to} 100%)` }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/10 rounded-full" />
        
        <div className="relative">
          <p className="text-white/80 text-[11px] uppercase tracking-[0.08em] mb-1 font-semibold">
            Final Recommendation
          </p>
          <h2 className="text-white text-3xl font-bold flex items-center gap-3">
            {recommendations.verdict === "Strong Fit" && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {recommendations.verdict === "Not Recommended" && (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
            {recommendations.verdict}
          </h2>
        </div>
        <div className="relative text-right">
          <p className="text-white/80 text-[11px] uppercase tracking-[0.08em] mb-1 font-semibold">
            Confidence Level
          </p>
          <p className="text-white font-bold text-xl">
            {recommendations.decisionConfidence}
          </p>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="p-6 grid grid-cols-3 gap-6">
        {/* Next Step */}
        <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 rounded-xl p-5 border border-sky-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
            <h3 className="text-[11px] uppercase tracking-[0.08em] text-sky-700 font-bold">
              Recommended Next Step
            </h3>
          </div>
          <p className="text-sm text-[#1E2A4A] leading-relaxed">
            {recommendations.nextStep}
          </p>
        </div>

        {/* Interview Focus Areas */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-xl p-5 border border-teal-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h3 className="text-[11px] uppercase tracking-[0.08em] text-teal-700 font-bold">
              Interview Focus Areas
            </h3>
          </div>
          <ul className="space-y-2">
            {recommendations.interviewFocusAreas.map((area, index) => (
              <li
                key={index}
                className="text-sm text-[#1E2A4A] flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{area}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Development Priorities */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-5 border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </div>
            <h3 className="text-[11px] uppercase tracking-[0.08em] text-amber-700 font-bold">
              Development Priorities
            </h3>
          </div>
          <ul className="space-y-2">
            {recommendations.developmentPriorities.map((priority, index) => (
              <li
                key={index}
                className="text-sm text-[#1E2A4A] flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{priority}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
