"use client";

import { Section } from "@/lib/mock-report-data";

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
  const barHeight = 18;
  const rowHeight = 32;
  const labelWidth = 150;
  const chartWidth = 380;
  const barAreaWidth = chartWidth - labelWidth - 50;
  const topPadding = 30;
  const svgHeight = sections.length * rowHeight + topPadding + 20;

  return (
    <div className="relative overflow-hidden rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50 to-emerald-50/50 p-5">
      <h3 className="text-sm font-semibold text-[#1E2A4A] mb-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500" />
        Section Score Distribution
      </h3>
      <svg width={chartWidth} height={svgHeight} viewBox={`0 0 ${chartWidth} ${svgHeight}`}>
        <defs>
          {sections.map((section, i) => {
            const gradient = getBandGradient(section.band);
            return (
              <linearGradient key={i} id={`bar-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={gradient.from} />
                <stop offset="100%" stopColor={gradient.to} />
              </linearGradient>
            );
          })}
        </defs>

        {/* Threshold lines */}
        <line
          x1={labelWidth + (50 / 100) * barAreaWidth}
          y1={topPadding - 15}
          x2={labelWidth + (50 / 100) * barAreaWidth}
          y2={svgHeight - 10}
          stroke="#D97706"
          strokeWidth="1.5"
          strokeDasharray="4,4"
        />
        <text
          x={labelWidth + (50 / 100) * barAreaWidth}
          y={topPadding - 20}
          fontSize="9"
          fill="#D97706"
          textAnchor="middle"
          fontWeight="600"
        >
          Pass (50%)
        </text>

        <line
          x1={labelWidth + (75 / 100) * barAreaWidth}
          y1={topPadding - 15}
          x2={labelWidth + (75 / 100) * barAreaWidth}
          y2={svgHeight - 10}
          stroke="#16A34A"
          strokeWidth="1.5"
          strokeDasharray="4,4"
        />
        <text
          x={labelWidth + (75 / 100) * barAreaWidth}
          y={topPadding - 20}
          fontSize="9"
          fill="#16A34A"
          textAnchor="middle"
          fontWeight="600"
        >
          Strong (75%)
        </text>

        {/* Bars */}
        {sections.map((section, i) => {
          const y = topPadding + i * rowHeight;
          const barWidth = (section.score / 100) * barAreaWidth;

          return (
            <g key={section.key}>
              {/* Label */}
              <text
                x={0}
                y={y + barHeight / 2 + 4}
                fontSize="10"
                fill="#1E2A4A"
                fontWeight="500"
              >
                {section.label.length > 20
                  ? section.label.slice(0, 19) + "..."
                  : section.label}
              </text>

              {/* Track */}
              <rect
                x={labelWidth}
                y={y}
                width={barAreaWidth}
                height={barHeight}
                fill="#E0F2FE"
                rx="4"
              />

              {/* Score bar with gradient */}
              <rect
                x={labelWidth}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={`url(#bar-gradient-${i})`}
                rx="4"
              />

              {/* Score value */}
              <text
                x={labelWidth + barAreaWidth + 8}
                y={y + barHeight / 2 + 4}
                fontSize="11"
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
