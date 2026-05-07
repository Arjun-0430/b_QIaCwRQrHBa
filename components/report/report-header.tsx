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
    <header className="h-[72px] bg-[#f5f5f7] px-6 flex items-center justify-between relative border-b border-[#d2d2d7]/60"
      style={{
        boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)"
      }}
    >
      {/* Left side - Logo and Report Title */}
      <div className="flex items-center gap-5">
        {/* Logo Card with Neumorphic Effect */}
        <div 
          className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center bg-[#f5f5f7] overflow-hidden"
          style={{
            boxShadow: "6px 6px 12px rgba(0,0,0,0.08), -6px -6px 12px rgba(255,255,255,0.9), inset 1px 1px 1px rgba(255,255,255,0.5)"
          }}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        
        {/* Title */}
        <div className="flex flex-col">
          <span className="text-[#1d1d1f] text-[17px] font-semibold tracking-[-0.022em]">
            Candidate Assessment Report
          </span>
          <span className="text-[#86868b] text-[12px] font-medium tracking-[-0.01em]">
            {meta.assessmentName}
          </span>
        </div>
      </div>

      {/* Right side - Candidate Info */}
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-[#1d1d1f] font-semibold text-[15px] tracking-[-0.016em]">{candidate.name}</p>
          <p className="text-[#86868b] text-[12px] font-medium">
            {formatDate(attempt.startTime)}
          </p>
        </div>
        {candidate.photoUrl ? (
          <div 
            className="w-[44px] h-[44px] rounded-full overflow-hidden bg-[#f5f5f7]"
            style={{
              boxShadow: "4px 4px 8px rgba(0,0,0,0.08), -4px -4px 8px rgba(255,255,255,0.9)"
            }}
          >
            <img
              src={candidate.photoUrl}
              alt={candidate.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div 
            className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-[#007aff] to-[#5856d6] flex items-center justify-center"
            style={{
              boxShadow: "4px 4px 8px rgba(0,0,0,0.08), -4px -4px 8px rgba(255,255,255,0.9)"
            }}
          >
            <span className="text-white font-semibold text-[13px] tracking-[-0.01em]">
              {getInitials(candidate.name)}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
