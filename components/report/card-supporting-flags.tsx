"use client";

import { FlagCategory } from "@/lib/mock-report-data";

interface CardSupportingFlagsProps {
  flagCategories: FlagCategory[];
  professionalNote: string;
}

const flagColors = [
  { bg: "from-rose-50 to-rose-100/50", border: "border-rose-200", accent: { from: "#E11D48", to: "#FB7185" } },
  { bg: "from-amber-50 to-amber-100/50", border: "border-amber-200", accent: { from: "#D97706", to: "#FBBF24" } },
  { bg: "from-violet-50 to-violet-100/50", border: "border-violet-200", accent: { from: "#7C3AED", to: "#A78BFA" } },
  { bg: "from-sky-50 to-sky-100/50", border: "border-sky-200", accent: { from: "#0284C7", to: "#38BDF8" } },
  { bg: "from-teal-50 to-teal-100/50", border: "border-teal-200", accent: { from: "#0D7377", to: "#14B8A6" } },
  { bg: "from-indigo-50 to-indigo-100/50", border: "border-indigo-200", accent: { from: "#4F46E5", to: "#818CF8" } },
];

export function CardSupportingFlags({
  flagCategories,
  professionalNote,
}: CardSupportingFlagsProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white" style={{ height: "auto" }}>
      <div className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-200">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" x2="4" y1="22" y2="15" />
        </svg>
        <h2 className="text-[11px] font-semibold text-white">Supporting Flags</h2>
      </div>

      <div className="p-2 flex items-center gap-3">
        {/* Flag Categories - Inline */}
        <div className="flex flex-wrap gap-1.5">
          {flagCategories.map((flag, index) => {
            const colors = flagColors[index % flagColors.length];
            const hasValue = flag.count > 0;
            
            return (
              <div
                key={flag.type}
                className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gradient-to-br ${colors.bg} ${colors.border} border`}
              >
                <span className="text-[10px] font-medium text-[#1E2A4A]">{flag.label}</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[9px] font-bold text-white"
                  style={{ 
                    background: hasValue 
                      ? `linear-gradient(135deg, ${colors.accent.from}, ${colors.accent.to})`
                      : "linear-gradient(135deg, #9CA3AF, #D1D5DB)"
                  }}
                >
                  {flag.count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Professional Note - Compact */}
        <div className="flex-1 text-[10px] text-[#6B7280] italic line-clamp-1 border-l border-slate-200 pl-3">
          &ldquo;{professionalNote}&rdquo;
        </div>
      </div>
    </div>
  );
}
