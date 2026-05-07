"use client";

import { Section } from "@/lib/mock-report-data";

interface ChartConsistencyProps {
  sections: Section[];
}

export function ChartConsistency({ sections }: ChartConsistencyProps) {
  const scores = sections.map((s) => s.score);
  const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
  const variance =
    scores.reduce((acc, score) => acc + Math.pow(score - mean, 2), 0) /
    scores.length;
  const stdDev = Math.sqrt(variance);

  const chartWidth = 380;
  const chartHeight = 100;
  const trackY = 50;
  const trackWidth = chartWidth - 60;
  const trackX = 30;

  // Map score to x position
  const scoreToX = (score: number) => trackX + (score / 100) * trackWidth;

  const meanX = scoreToX(mean);
  const rangeStart = scoreToX(Math.max(0, mean - stdDev));
  const rangeEnd = scoreToX(Math.min(100, mean + stdDev));

  // Determine consistency level
  let consistencyLabel: string;
  let consistencyGradient: { from: string; to: string };
  if (stdDev < 10) {
    consistencyLabel = "Consistent";
    consistencyGradient = { from: "#16A34A", to: "#4ADE80" };
  } else if (stdDev <= 20) {
    consistencyLabel = "Moderate Variation";
    consistencyGradient = { from: "#D97706", to: "#FBBF24" };
  } else {
    consistencyLabel = "High Variation";
    consistencyGradient = { from: "#DC2626", to: "#F87171" };
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50/50 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-[#1E2A4A] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
          Score Consistency
        </h3>
        <span
          className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
          style={{ 
            background: `linear-gradient(135deg, ${consistencyGradient.from}, ${consistencyGradient.to})`,
            boxShadow: `0 2px 8px ${consistencyGradient.from}40`
          }}
        >
          {consistencyLabel}
        </span>
      </div>

      <svg
        width={chartWidth}
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      >
        <defs>
          <linearGradient id="consistency-range" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="consistency-point" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>

        {/* Track background */}
        <rect
          x={trackX}
          y={trackY - 4}
          width={trackWidth}
          height={8}
          fill="#E9D5FF"
          rx="4"
        />

        {/* Standard deviation range */}
        <rect
          x={rangeStart}
          y={trackY - 12}
          width={rangeEnd - rangeStart}
          height={24}
          fill="url(#consistency-range)"
          rx="6"
        />

        {/* Mean marker */}
        <circle cx={meanX} cy={trackY} r="12" fill="#1E2A4A" />
        <circle cx={meanX} cy={trackY} r="6" fill="white" />

        {/* Score points */}
        {scores.map((score, i) => (
          <circle
            key={i}
            cx={scoreToX(score)}
            cy={trackY}
            r="5"
            fill="url(#consistency-point)"
            stroke="#fff"
            strokeWidth="2"
          />
        ))}

        {/* Labels */}
        <text x={trackX} y={trackY + 30} fontSize="10" fill="#7C3AED" fontWeight="500">
          0
        </text>
        <text
          x={trackX + trackWidth}
          y={trackY + 30}
          fontSize="10"
          fill="#7C3AED"
          textAnchor="end"
          fontWeight="500"
        >
          100
        </text>

        {/* Mean label */}
        <text
          x={meanX}
          y={trackY - 22}
          fontSize="11"
          fill="#1E2A4A"
          fontWeight="700"
          textAnchor="middle"
        >
          Mean: {mean.toFixed(1)}%
        </text>

        {/* StdDev label */}
        <text
          x={(rangeStart + rangeEnd) / 2}
          y={trackY + 35}
          fontSize="10"
          fill="#7C3AED"
          textAnchor="middle"
          fontWeight="600"
        >
          ±{stdDev.toFixed(1)}
        </text>
      </svg>
    </div>
  );
}
