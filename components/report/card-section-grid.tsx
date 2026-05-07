"use client";

import { Section } from "@/lib/mock-report-data";

interface CardSectionGridProps {
  sections: Section[];
}

function getBandGradient(band: string): { from: string; to: string; text: string } {
  switch (band) {
    case "High":
      return { from: "#16A34A", to: "#4ADE80", text: "#FFFFFF" };
    case "Medium":
      return { from: "#D97706", to: "#FBBF24", text: "#FFFFFF" };
    case "Low":
      return { from: "#DC2626", to: "#F87171", text: "#FFFFFF" };
    default:
      return { from: "#6B7280", to: "#9CA3AF", text: "#FFFFFF" };
  }
}

function getScoreBarGradient(band: string): { from: string; to: string } {
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

const rowColors = [
  "from-slate-50/50 to-white",
  "from-sky-50/30 to-white",
  "from-violet-50/30 to-white",
  "from-teal-50/30 to-white",
  "from-amber-50/30 to-white",
  "from-rose-50/30 to-white",
  "from-indigo-50/30 to-white",
];

export function CardSectionGrid({ sections }: CardSectionGridProps) {
  const totals = sections.reduce(
    (acc, section) => ({
      correct: acc.correct + section.correct,
      wrong: acc.wrong + section.wrong,
      skipped: acc.skipped + section.skipped,
      time: acc.time + section.timeTakenSeconds,
    }),
    { correct: 0, wrong: 0, skipped: 0, time: 0 }
  );

  const totalMinutes = Math.floor(totals.time / 60);
  const totalSeconds = totals.time % 60;
  const totalTimeFormatted = `${totalMinutes}m ${totalSeconds}s`;

  const avgScore = Math.round(
    sections.reduce((acc, s) => acc + s.score, 0) / sections.length
  );
  const avgAccuracy = Math.round(
    sections.reduce((acc, s) => acc + s.accuracy, 0) / sections.length
  );

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header with gradient */}
      <div className="px-6 py-4 bg-gradient-to-r from-[#1E2A4A] to-[#2D3E6A] flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-300">
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
          Section-wise Performance
        </h2>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-white/60">Legend:</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-green-400" />
            <span className="text-emerald-300">Correct</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-red-400 to-rose-400" />
            <span className="text-rose-300">Wrong</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="text-slate-300">Skipped</span>
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-slate-100 to-slate-50">
              <th className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.08em] text-slate-600 font-semibold">
                Section
              </th>
              <th className="text-center px-3 py-3 text-[11px] uppercase tracking-[0.08em] text-slate-600 font-semibold w-36">
                Score
              </th>
              <th className="text-center px-3 py-3 text-[11px] uppercase tracking-[0.08em] text-slate-600 font-semibold">
                Accuracy
              </th>
              <th className="text-center px-3 py-3 text-[11px] uppercase tracking-[0.08em] text-slate-600 font-semibold">
                Time
              </th>
              <th className="text-center px-3 py-3 text-[11px] uppercase tracking-[0.08em] text-slate-600 font-semibold">
                C / W / S
              </th>
              <th className="text-center px-3 py-3 text-[11px] uppercase tracking-[0.08em] text-slate-600 font-semibold">
                Band
              </th>
            </tr>
          </thead>
          <tbody>
            {sections.map((section, index) => {
              const bandGradient = getBandGradient(section.band);
              const barGradient = getScoreBarGradient(section.band);
              const rowColor = rowColors[index % rowColors.length];

              return (
                <tr
                  key={section.key}
                  className={`bg-gradient-to-r ${rowColor} hover:from-teal-50/40 hover:to-white transition-colors`}
                >
                  <td className="px-5 py-3.5 text-sm text-[#1E2A4A] font-medium">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-1.5 h-8 rounded-full"
                        style={{ background: `linear-gradient(180deg, ${barGradient.from}, ${barGradient.to})` }}
                      />
                      {section.label}
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex flex-col items-center gap-1.5">
                      <span className="text-sm font-bold text-[#1E2A4A]">
                        {section.score}%
                      </span>
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${section.score}%`,
                            background: `linear-gradient(90deg, ${barGradient.from}, ${barGradient.to})`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <span className="text-sm font-semibold text-[#0284C7] bg-sky-50 px-2 py-1 rounded-lg">
                      {section.accuracy}%
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-center text-sm text-[#6B7280]">
                    {section.timeFormatted}
                  </td>
                  <td className="px-3 py-3.5 text-center text-sm font-mono">
                    <span className="text-emerald-600 font-semibold">{section.correct}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="text-red-500 font-semibold">{section.wrong}</span>
                    <span className="text-slate-400 mx-1">/</span>
                    <span className="text-slate-500">{section.skipped}</span>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${bandGradient.from}, ${bandGradient.to})`,
                        color: bandGradient.text,
                        boxShadow: `0 2px 8px ${bandGradient.from}40`,
                      }}
                    >
                      {section.band}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-gradient-to-r from-[#1E2A4A]/10 to-[#0D7377]/10 border-t-2 border-[#0D7377]">
              <td className="px-5 py-4 text-sm text-[#1E2A4A] font-bold">
                Total / Average
              </td>
              <td className="px-3 py-4 text-center">
                <span className="text-sm font-bold text-[#0D7377] bg-teal-50 px-3 py-1 rounded-lg">
                  {avgScore}%
                </span>
              </td>
              <td className="px-3 py-4 text-center">
                <span className="text-sm font-bold text-[#0284C7] bg-sky-50 px-3 py-1 rounded-lg">
                  {avgAccuracy}%
                </span>
              </td>
              <td className="px-3 py-4 text-center text-sm font-bold text-[#1E2A4A]">
                {totalTimeFormatted}
              </td>
              <td className="px-3 py-4 text-center text-sm font-mono font-bold">
                <span className="text-emerald-600">{totals.correct}</span>
                <span className="text-slate-400 mx-1">/</span>
                <span className="text-red-500">{totals.wrong}</span>
                <span className="text-slate-400 mx-1">/</span>
                <span className="text-slate-500">{totals.skipped}</span>
              </td>
              <td className="px-3 py-4 text-center text-slate-400">—</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
