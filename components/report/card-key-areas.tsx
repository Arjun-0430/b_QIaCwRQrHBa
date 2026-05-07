"use client";

import { KeyArea } from "@/lib/mock-report-data";

interface CardKeyAreasProps {
  keyAreas: KeyArea[];
}

const areaColors = [
  { from: "#D97706", to: "#FBBF24", bg: "from-amber-50 to-amber-100/50", border: "border-amber-200" },
  { from: "#EA580C", to: "#FB923C", bg: "from-orange-50 to-orange-100/50", border: "border-orange-200" },
  { from: "#DC2626", to: "#F87171", bg: "from-red-50 to-red-100/50", border: "border-red-200" },
];

export function CardKeyAreas({ keyAreas }: CardKeyAreasProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-amber-200 bg-white shadow-sm">
      {/* Header with gradient */}
      <div className="px-6 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </div>
        <h2 className="text-sm font-semibold text-white">
          Key Areas to Develop
        </h2>
      </div>

      {/* Areas List */}
      <div className="p-5 space-y-3">
        {keyAreas.map((area, index) => {
          const colors = areaColors[index % areaColors.length];
          
          return (
            <div
              key={area.area}
              className={`flex items-start gap-4 rounded-xl p-4 bg-gradient-to-r ${colors.bg} border ${colors.border} transition-all hover:shadow-md`}
            >
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                  boxShadow: `0 4px 12px ${colors.from}40`
                }}
              >
                <span className="text-white font-bold text-sm">{index + 1}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#1E2A4A] text-sm">{area.area}</h3>
                <p className="text-[#6B7280] text-sm mt-1 leading-relaxed">{area.reason}</p>
              </div>
              <div 
                className="w-1.5 h-full min-h-[48px] rounded-full self-stretch"
                style={{ background: `linear-gradient(180deg, ${colors.from}, ${colors.to})` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
