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
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="px-6 py-4 bg-gradient-to-r from-rose-500 to-pink-500">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-rose-200">
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" x2="4" y1="22" y2="15" />
          </svg>
          Supporting Flags & Notes
        </h2>
      </div>

      <div className="p-5 space-y-4">
        {/* Flag Categories */}
        <div className="flex flex-wrap gap-3">
          {flagCategories.map((flag, index) => {
            const colors = flagColors[index % flagColors.length];
            const hasValue = flag.count > 0;
            
            return (
              <div
                key={flag.type}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br ${colors.bg} ${colors.border} border transition-all hover:shadow-md`}
              >
                <span className="text-sm font-medium text-[#1E2A4A]">{flag.label}</span>
                <span
                  className="px-2 py-0.5 rounded-lg text-xs font-bold text-white shadow-sm"
                  style={{ 
                    background: hasValue 
                      ? `linear-gradient(135deg, ${colors.accent.from}, ${colors.accent.to})`
                      : "linear-gradient(135deg, #9CA3AF, #D1D5DB)",
                    boxShadow: hasValue ? `0 2px 6px ${colors.accent.from}40` : "none"
                  }}
                >
                  {flag.count}
                </span>
              </div>
            );
          })}
        </div>

        {/* Professional Note */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl p-5 border border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
            </div>
            <p className="text-sm text-[#4B5563] italic leading-relaxed">
              &ldquo;{professionalNote}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
