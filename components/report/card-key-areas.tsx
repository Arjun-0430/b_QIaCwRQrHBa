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
  // Ensure we display all 3 items
  const displayAreas = keyAreas.slice(0, 3);
  
  return (
    <div className="relative overflow-hidden rounded-lg border border-amber-200 bg-white" style={{ maxHeight: "180px", breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      {/* Header with gradient */}
      <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
        </div>
        <h2 className="text-[12px] font-semibold text-white">
          Key Areas to Develop
        </h2>
      </div>

      {/* Areas List - Compact */}
      <div className="p-3 flex gap-2">
        {displayAreas.map((area, index) => {
          const colors = areaColors[index % areaColors.length];
          
          return (
            <div
              key={area.area}
              className={`flex-1 flex items-start gap-2 rounded-lg p-2 bg-gradient-to-r ${colors.bg} border ${colors.border}`}
            >
              <div 
                className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`
                }}
              >
                <span className="text-white font-bold text-[10px]">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#1E2A4A] text-[12px] leading-tight">{area.area}</h3>
                <p className="text-[#6B7280] text-[11px] mt-0.5 leading-tight line-clamp-2">{area.reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
