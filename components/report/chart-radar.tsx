"use client";

import { Section } from "@/lib/mock-report-data";

interface ChartRadarProps {
  sections: Section[];
}

// Helper to get short labels for the radar chart
function getShortLabel(label: string): string {
  const shortLabels: Record<string, string> = {
    "Quantitative & Logical": "Quant & Logic",
    "Cognitive Battery": "Cognitive",
    "Skill & Technical": "Technical",
    "Verbal & Communication": "Verbal",
    "Data & Abstract Reasoning": "Data & Abstract",
    "Coding Fundamentals": "Coding",
    "Situational Judgement": "Situational",
  };
  return shortLabels[label] || (label.length > 12 ? label.slice(0, 11) + "..." : label);
}

export function ChartRadar({ sections }: ChartRadarProps) {
  const centerX = 150;
  const centerY = 150;
  const maxRadius = 90;
  const levels = [25, 50, 75, 100];
  const gradientId = "radar-gradient";

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
    const labelRadius = maxRadius + 45;
    const x = centerX + labelRadius * Math.cos(angle);
    const y = centerY + labelRadius * Math.sin(angle);
    return { x, y, section, angle };
  });

  return (
    <div className="relative overflow-hidden rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50/50 p-5">
      <h3 className="text-sm font-semibold text-[#1E2A4A] mb-4 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
        Competency Profile
      </h3>
      <svg width="300" height="300" viewBox="0 0 300 300" className="mx-auto">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Grid rings with gradient colors */}
        {levels.map((level, i) => (
          <circle
            key={level}
            cx={centerX}
            cy={centerY}
            r={(level / 100) * maxRadius}
            fill="none"
            stroke={i === levels.length - 1 ? "#C7D2FE" : "#E0E7FF"}
            strokeWidth={i === levels.length - 1 ? "2" : "1"}
          />
        ))}

        {/* Grid level labels */}
        {levels.map((level) => (
          <text
            key={`label-${level}`}
            x={centerX + 5}
            y={centerY - (level / 100) * maxRadius + 3}
            fontSize="8"
            fill="#818CF8"
            fontWeight="500"
          >
            {level}
          </text>
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
              strokeDasharray="3,3"
            />
          );
        })}

        {/* Data polygon with gradient */}
        <path
          d={polygonPath}
          fill="rgba(79, 70, 229, 0.15)"
          stroke={`url(#${gradientId})`}
          strokeWidth="3"
          filter="url(#glow)"
        />

        {/* Data points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="6" fill={`url(#${gradientId})`} stroke="white" strokeWidth="2" />
            <text
              x={p.x + (Math.cos(p.angle) > 0 ? 10 : -10)}
              y={p.y + (Math.sin(p.angle) > 0 ? 14 : -8)}
              fontSize="10"
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
              fontSize="9"
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
