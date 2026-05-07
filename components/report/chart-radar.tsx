"use client";

import { Section } from "@/lib/mock-report-data";
import { useId } from "react";

interface ChartRadarProps {
  sections: Section[];
}

// Helper to get short labels for the radar chart
function getShortLabel(label: string): string {
  const shortLabels: Record<string, string> = {
    "Quantitative & Logical": "Quant",
    "Cognitive Battery": "Cognitive",
    "Skill & Technical": "Technical",
    "Verbal & Communication": "Verbal",
    "Data & Abstract Reasoning": "Abstract",
    "Coding Fundamentals": "Coding",
    "Situational Judgement": "Situational",
  };
  return shortLabels[label] || (label.length > 8 ? label.slice(0, 7) + "..." : label);
}

export function ChartRadar({ sections }: ChartRadarProps) {
  const centerX = 120;
  const centerY = 120;
  const maxRadius = 70;
  const levels = [25, 50, 75, 100];
  const gradientId = useId();

  // Calculate points for each section
  const points = sections.map((section, i) => {
    const angle = (i / sections.length) * 2 * Math.PI - Math.PI / 2;
    const ratio = section.score / section.maxScore;
    const x = centerX + maxRadius * ratio * Math.cos(angle);
    const y = centerY + maxRadius * ratio * Math.sin(angle);
    return { x, y, section, angle };
  });

  // Create polygon path
  const polygonPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Calculate label positions
  const labelPoints = sections.map((section, i) => {
    const angle = (i / sections.length) * 2 * Math.PI - Math.PI / 2;
    const labelRadius = maxRadius + 35;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    return { x, y, section, angle };
  });

  return (
    <div className="relative overflow-hidden rounded-lg border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50/50 p-3" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      <h3 className="text-[12px] font-semibold text-[#1E2A4A] mb-2 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        Competency Profile
      </h3>
      <svg width="240" height="240" viewBox="0 0 240 240" className="mx-auto">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>

        {/* Grid rings */}
        {levels.map((level, i) => (
          <circle
            key={level}
            cx={centerX}
            cy={centerY}
            r={(level / 100) * maxRadius}
            fill="none"
            stroke={i === levels.length - 1 ? "#C7D2FE" : "#E0E7FF"}
            strokeWidth={i === levels.length - 1 ? "1.5" : "1"}
          />
        ))}

        {/* Axis lines */}
        {sections.map((_, i) => {
          const angle = (i / sections.length) * 2 * Math.PI - Math.PI / 2;
          const endX = centerX + maxRadius * Math.cos(angle);
          const endY = centerY + maxRadius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={endX}
              y2={endY}
              stroke="#C7D2FE"
              strokeWidth="1"
              strokeDasharray="2,2"
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={polygonPath}
          fill="rgba(79, 70, 229, 0.15)"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="4" fill={`url(#${gradientId})`} stroke="white" strokeWidth="1.5" />
            <text
              x={p.x + (Math.cos(p.angle) > 0 ? 8 : -8)}
              y={p.y + (Math.sin(p.angle) > 0 ? 10 : -6)}
              fontSize="9"
              fontWeight="700"
              fill="#4F46E5"
              textAnchor={Math.cos(p.angle) > 0 ? "start" : "end"}
            >
              {p.section.score}%
            </text>
          </g>
        ))}

        {/* Section labels */}
        {labelPoints.map((p, i) => {
          const label = getShortLabel(p.section.label);
          
          return (
            <text
              key={i}
              x={p.x}
              y={p.y}
              fontSize="8"
              fill="#6B7280"
              textAnchor="middle"
              dominantBaseline="middle"
              fontWeight="500"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
