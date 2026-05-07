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
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white" style={{ maxHeight: "200px" }}>
      {/* Verdict Banner - height: 48px */}
      <div
        className="px-4 py-3 flex items-center justify-between relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${verdictGradient.from} 0%, ${verdictGradient.to} 100%)`, height: "48px" }}
      >
        <div className="flex items-center gap-2">
          {recommendations.verdict === "Strong Fit" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {recommendations.verdict === "Not Recommended" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/90">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
          <div>
            <p className="text-white/80 text-[9px] uppercase tracking-[0.08em] font-semibold">
              Final Recommendation
            </p>
            <p className="text-white text-[16px] font-bold">{recommendations.verdict}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white/80 text-[9px] uppercase tracking-[0.08em] font-semibold">
            Confidence
          </p>
          <p className="text-white font-bold text-[14px]">
            {recommendations.decisionConfidence}
          </p>
        </div>
      </div>

      {/* Recommendations Grid - 3 columns */}
      <div className="p-3 grid grid-cols-3 gap-3">
        {/* Next Step */}
        <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 rounded-lg p-3 border border-sky-200">
          <h3 className="text-[9px] uppercase tracking-[0.08em] text-sky-700 font-bold mb-1.5 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            Next Step
          </h3>
          <p className="text-[12px] text-[#1E2A4A] leading-snug line-clamp-3">
            {recommendations.nextStep}
          </p>
        </div>

        {/* Interview Focus Areas */}
        <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-lg p-3 border border-teal-200">
          <h3 className="text-[9px] uppercase tracking-[0.08em] text-teal-700 font-bold mb-1.5 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
            </svg>
            Interview Focus
          </h3>
          <ul className="space-y-0.5">
            {recommendations.interviewFocusAreas.slice(0, 3).map((area, index) => (
              <li
                key={index}
                className="text-[12px] text-[#1E2A4A] flex items-start gap-1 leading-tight"
              >
                <span className="w-1 h-1 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                <span className="line-clamp-1">{area}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Development Priorities */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg p-3 border border-amber-200">
          <h3 className="text-[9px] uppercase tracking-[0.08em] text-amber-700 font-bold mb-1.5 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Development
          </h3>
          <ul className="space-y-0.5">
            {recommendations.developmentPriorities.slice(0, 3).map((priority, index) => (
              <li
                key={index}
                className="text-[12px] text-[#1E2A4A] flex items-start gap-1 leading-tight"
              >
                <span className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                <span className="line-clamp-1">{priority}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
