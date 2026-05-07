"use client";

import { Section } from "@/lib/mock-report-data";
import { useId } from "react";

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
  const baseId = useId();

  const chartWidth = 280;
  const chartHeight = 60;
  const trackY = 30;
  const trackWidth = chartWidth - 40;
  const trackX = 20;

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
    consistencyLabel = "Moderate";
    consistencyGradient = { from: "#D97706", to: "#FBBF24" };
  } else {
    consistencyLabel = "Variable";
    consistencyGradient = { from: "#DC2626", to: "#F87171" };
  }

  return (
    <div className="relative overflow-hidden rounded-lg border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50/50 p-3" style={{ height: "60px", breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[11px] font-semibold text-[#1E2A4A] flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500" />
          Score Consistency
        </h3>
        <span
          className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
          style={{ 
            background: `linear-gradient(135deg, ${consistencyGradient.from}, ${consistencyGradient.to})`
          }}
        >
          {consistencyLabel}
        </span>
      </div>

      <svg
        width={chartWidth}
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="mx-auto"
      >
        <defs>
          <linearGradient id={`${baseId}-range`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id={`${baseId}-point`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#A78BFA" />
          </linearGradient>
        </defs>

        {/* Track background */}
        <rect
          x={trackX}
          y={trackY - 3}
          width={trackWidth}
          height={6}
          fill="#E9D5FF"
          rx="3"
        />

        {/* Standard deviation range */}
        <rect
          x={rangeStart}
          y={trackY - 8}
          width={rangeEnd - rangeStart}
          height={16}
          fill={`url(#${baseId}-range)`}
          rx="4"
        />

        {/* Mean marker */}
        <circle cx={meanX} cy={trackY} r="8" fill="#1E2A4A" />
        <circle cx={meanX} cy={trackY} r="4" fill="white" />

        {/* Score points */}
        {scores.map((score, i) => (
          <circle
            key={i}
            cx={scoreToX(score)}
            cy={trackY}
            r="3"
            fill={`url(#${baseId}-point)`}
            stroke="#fff"
            strokeWidth="1"
          />
        ))}

        {/* Mean label */}
        <text
          x={meanX}
          y={trackY - 14}
          fontSize="9"
          fill="#1E2A4A"
          fontWeight="700"
          textAnchor="middle"
        >
          {mean.toFixed(0)}%
        </text>

        {/* StdDev label */}
        <text
          x={(rangeStart + rangeEnd) / 2}
          y={trackY + 20}
          fontSize="8"
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
