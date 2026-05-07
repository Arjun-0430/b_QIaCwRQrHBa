"use client";

import { Section } from "@/lib/mock-report-data";
import { useId } from "react";

interface ChartBulletProps {
  sections: Section[];
}

function getBandGradient(band: string): { from: string; to: string } {
  switch (band) {
    case "High":
      return { from: "#16A34A", to: "#4ADE80" };
    case "Medium":
      return { from: "#D97706", to: "#FBBF24" };
    case "Low":
      return { from: "#DC2626", to: "#F87171" };
    default:
      return { from: "#6B7280", to: "#9CA3AF" };
  }
}

export function ChartBullet({ sections }: ChartBulletProps) {
  const barHeight = 12;
  const rowHeight = 28;
  const labelWidth = 100;
  const chartWidth = 280;
  const barAreaWidth = chartWidth - labelWidth - 35;
  const topPadding = 20;
  const svgHeight = sections.length * rowHeight + topPadding + 10;
  const baseId = useId();

  return (
    <div className="relative overflow-hidden rounded-lg border border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50/50 p-3" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <h3 className="text-[11px] font-semibold text-[#1E2A4A] mb-2 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
        Score Distribution
      </h3>
      <svg width={chartWidth} height={svgHeight} viewBox={`0 0 ${chartWidth} ${svgHeight}`}>
        <defs>
          {sections.map((section, i) => {
            const gradient = getBandGradient(section.band);
            return (
              <linearGradient key={i} id={`${baseId}-bar-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={gradient.from} />
                <stop offset="100%" stopColor={gradient.to} />
              </linearGradient>
            );
          })}
        </defs>

        {/* Threshold lines */}
        <line
          x1={labelWidth + (50 / 100) * barAreaWidth}
          y1={topPadding - 10}
          x2={labelWidth + (50 / 100) * barAreaWidth}
          y2={svgHeight - 5}
          stroke="#D97706"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
        <line
          x1={labelWidth + (75 / 100) * barAreaWidth}
          y1={topPadding - 10}
          x2={labelWidth + (75 / 100) * barAreaWidth}
          y2={svgHeight - 5}
          stroke="#16A34A"
          strokeWidth="1"
          strokeDasharray="3,3"
        />

        {/* Bars */}
        {sections.map((section, i) => {
          const y = topPadding + i * rowHeight;
          const barWidth = (section.score / 100) * barAreaWidth;

          return (
            <g key={section.key}>
              {/* Label */}
              <text
                x={0}
                y={y + barHeight / 2 + 3}
                fontSize="8"
                fill="#1E2A4A"
                fontWeight="500"
              >
                {section.label.length > 14
                  ? section.label.slice(0, 13) + "..."
                  : section.label}
              </text>

              {/* Track */}
              <rect
                x={labelWidth}
                y={y}
                width={barAreaWidth}
                height={barHeight}
                fill="#E0F2FE"
                rx="3"
              />

              {/* Score bar */}
              <rect
                x={labelWidth}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={`url(#${baseId}-bar-${i})`}
                rx="3"
              />

              {/* Score value */}
              <text
                x={labelWidth + barAreaWidth + 5}
                y={y + barHeight / 2 + 3}
                fontSize="9"
                fill="#0D7377"
                fontWeight="700"
              >
                {section.score}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
