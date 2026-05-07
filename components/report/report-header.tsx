"use client";

import Image from "next/image";
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
    <header className="report-header">
      {/* Left side - Logo and Report Title */}
      <div className="flex items-center gap-4">
        {/* Logo on white background */}
        <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center overflow-hidden">
          <Image
            src="/logo.png"
            alt="Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        
        {/* Title */}
        <div className="flex flex-col">
          <span className="text-white text-[15px] font-semibold tracking-[-0.01em]">
            Candidate Assessment Report
          </span>
          <span className="text-white/70 text-[11px] font-medium">
            {meta.assessmentName}
          </span>
        </div>
      </div>

      {/* Right side - Candidate Info */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-white text-[13px] font-semibold">{candidate.name}</p>
          <p className="text-white/65 text-[11px]">
            {formatDate(attempt.startTime)}
          </p>
        </div>
        {candidate.photoUrl ? (
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/40">
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center">
            <span className="text-white font-semibold text-[11px]">
              {getInitials(candidate.name)}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
