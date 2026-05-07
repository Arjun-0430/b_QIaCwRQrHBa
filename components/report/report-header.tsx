"use client";

import { Candidate, Attempt, ReportMeta } from "@/lib/mock-report-data";

interface ReportHeaderProps {
  candidate: Candidate;
  attempt: Attempt;
  meta: ReportMeta;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export function ReportHeader({ candidate, attempt, meta }: ReportHeaderProps) {
  return (
    <header className="h-16 bg-gradient-to-r from-[#1E2A4A] via-[#2D3E6A] to-[#1E2A4A] px-6 flex items-center justify-between relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/10 to-transparent" />
      
      {/* Left side - Logo and Report Title */}
      <div className="flex items-center gap-6 relative">
        <div className="w-[120px] h-10 bg-gradient-to-r from-teal-500/20 to-teal-600/20 border border-teal-400/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
          <span className="text-white font-bold text-sm tracking-wider">
            COGNIQUE
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-white/90 text-[13px] uppercase tracking-[0.08em] font-semibold">
            Candidate Assessment Report
          </span>
          <span className="text-teal-300/70 text-[10px] uppercase tracking-wider">
            Enterprise Analytics
          </span>
        </div>
      </div>

      {/* Right side - Candidate Info */}
      <div className="flex items-center gap-4 relative">
        <div className="text-right">
          <p className="text-white font-semibold text-base">{candidate.name}</p>
          <p className="text-teal-300/80 text-[12px]">{meta.assessmentName}</p>
          <p className="text-white/50 text-[11px]">
            {formatDate(attempt.startTime)}
          </p>
        </div>
        {candidate.photoUrl ? (
          <img
            src={candidate.photoUrl}
            alt={candidate.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-teal-400 shadow-lg shadow-teal-500/20"
          />
        ) : (
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 border-2 border-teal-300 flex items-center justify-center shadow-lg shadow-teal-500/30">
            <span className="text-white font-bold text-sm">
              {getInitials(candidate.name)}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
