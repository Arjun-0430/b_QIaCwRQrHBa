"use client";

import { Section } from "@/lib/mock-report-data";
import { useId } from "react";

interface ChartTimeAccuracyProps {
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

export function ChartTimeAccuracy({ sections }: ChartTimeAccuracyProps) {
  const chartWidth = 340;
  const chartHeight = 220;
  const padding = { top: 35, right: 35, bottom: 40, left: 50 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const baseId = useId();

  // Calculate scales
  const maxTime = Math.max(...sections.map((s) => s.timeTakenSeconds));
  const medianTime =
    [...sections.map((s) => s.timeTakenSeconds)].sort((a, b) => a - b)[
      Math.floor(sections.length / 2)
    ];

  // Map values to coordinates
  const accuracyToX = (accuracy: number) =>
    padding.left + (accuracy / 100) * plotWidth;
  const timeToY = (time: number) =>
    padding.top + plotHeight - (time / maxTime) * plotHeight;

  const thresholdX = accuracyToX(70);
  const medianY = timeToY(medianTime);

  return (
    <div className="relative overflow-hidden rounded-lg border border-sky-200 bg-gradient-to-br from-sky-50 to-blue-50/50 p-3">
      <h3 className="text-[12px] font-semibold text-[#1E2A4A] mb-2 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-500" />
        Speed vs Accuracy Analysis
      </h3>

      <svg
        width={chartWidth}
        height={chartHeight}
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="mx-auto"
      >
        <defs>
          {sections.map((section, i) => {
            const gradient = getBandGradient(section.band);
            return (
              <linearGradient key={i} id={`${baseId}-point-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={gradient.from} />
                <stop offset="100%" stopColor={gradient.to} />
              </linearGradient>
            );
          })}
        </defs>

        {/* Quadrant backgrounds */}
        {/* Fast + Accurate (bottom-right) - Green */}
        <rect
          x={thresholdX}
          y={medianY}
          width={padding.left + plotWidth - thresholdX}
          height={padding.top + plotHeight - medianY}
          fill="rgba(22, 163, 74, 0.08)"
        />
        {/* Slow + Accurate (top-right) - Amber */}
        <rect
          x={thresholdX}
          y={padding.top}
          width={padding.left + plotWidth - thresholdX}
          height={medianY - padding.top}
          fill="rgba(217, 119, 6, 0.08)"
        />
        {/* Fast + Inaccurate (bottom-left) - Amber */}
        <rect
          x={padding.left}
          y={medianY}
          width={thresholdX - padding.left}
          height={padding.top + plotHeight - medianY}
          fill="rgba(217, 119, 6, 0.08)"
        />
        {/* Slow + Inaccurate (top-left) - Red */}
        <rect
          x={padding.left}
          y={padding.top}
          width={thresholdX - padding.left}
          height={medianY - padding.top}
          fill="rgba(220, 38, 38, 0.08)"
        />

        {/* Threshold lines */}
        <line
          x1={thresholdX}
          y1={padding.top}
          x2={thresholdX}
          y2={padding.top + plotHeight}
          stroke="#16A34A"
          strokeWidth="1.5"
          strokeDasharray="4,3"
        />
        <line
          x1={padding.left}
          y1={medianY}
          x2={padding.left + plotWidth}
          y2={medianY}
          stroke="#D97706"
          strokeWidth="1.5"
          strokeDasharray="4,3"
        />

        {/* X axis */}
        <line
          x1={padding.left}
          y1={padding.top + plotHeight}
          x2={padding.left + plotWidth}
          y2={padding.top + plotHeight}
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />
        <text
          x={padding.left + plotWidth / 2}
          y={chartHeight - 8}
          fontSize="10"
          fill="#0284C7"
          textAnchor="middle"
          fontWeight="600"
        >
          Accuracy (%)
        </text>
        {[0, 25, 50, 75, 100].map((v) => (
          <text
            key={v}
            x={accuracyToX(v)}
            y={padding.top + plotHeight + 14}
            fontSize="8"
            fill="#7DD3FC"
            textAnchor="middle"
            fontWeight="500"
          >
            {v}%
          </text>
        ))}

        {/* Y axis */}
        <line
          x1={padding.left}
          y1={padding.top}
          x2={padding.left}
          y2={padding.top + plotHeight}
          stroke="#BAE6FD"
          strokeWidth="1.5"
        />
        <text
          x={12}
          y={padding.top + plotHeight / 2}
          fontSize="10"
          fill="#0284C7"
          textAnchor="middle"
          fontWeight="600"
          transform={`rotate(-90, 12, ${padding.top + plotHeight / 2})`}
        >
          Time (min)
        </text>

        {/* Quadrant labels */}
        <text x={padding.left + 5} y={padding.top + 12} fontSize="8" fill="#DC2626" fontWeight="600">
          Slow + Inaccurate
        </text>
        <text x={thresholdX + 5} y={padding.top + 12} fontSize="8" fill="#D97706" fontWeight="600">
          Slow + Accurate
        </text>
        <text x={padding.left + 5} y={padding.top + plotHeight - 8} fontSize="8" fill="#D97706" fontWeight="600">
          Fast + Inaccurate
        </text>
        <text x={thresholdX + 5} y={padding.top + plotHeight - 8} fontSize="8" fill="#16A34A" fontWeight="600">
          Fast + Accurate
        </text>

        {/* Data points */}
        {sections.map((section, i) => {
          const x = accuracyToX(section.accuracy);
          const y = timeToY(section.timeTakenSeconds);

          return (
            <g key={section.key}>
              <circle 
                cx={x} 
                cy={y} 
                r="8" 
                fill={`url(#${baseId}-point-${i})`}
              />
              <circle 
                cx={x} 
                cy={y} 
                r="3" 
                fill="white"
              />
              <text
                x={x}
                y={y + 16}
                fontSize="7"
                fill="#1E2A4A"
                textAnchor="middle"
                fontWeight="500"
              >
                {section.label.length > 8
                  ? section.label.slice(0, 7) + "..."
                  : section.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
