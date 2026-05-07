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
    <div className="relative overflow-hidden rounded-lg border border-amber-200 bg-white" style={{ height: "auto" }}>
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

      {/* Areas List - Vertical Stacked */}
      <div className="p-4 flex flex-col gap-2">
        {displayAreas.map((area, index) => {
          return (
            <div
              key={area.area}
              className="flex items-start gap-3 rounded-lg p-3 bg-[#FFFBEB] border-l-4 border-amber-300"
              style={{ borderLeft: "3px solid #FBBF24" }}
            >
              <div 
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ 
                  background: "linear-gradient(135deg, #D97706, #FBBF24)"
                }}
              >
                <span className="text-white font-bold text-[11px]">{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#1E2A4A] text-[12px] leading-tight">{area.area}</h3>
                <p className="text-[#6B7280] text-[11px] mt-1 leading-snug">{area.reason}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
