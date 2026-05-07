"use client";

import { Candidate, Attempt, ReportMeta } from "@/lib/mock-report-data";

interface CardCandidateAttemptProps {
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

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

function truncateId(id: string, maxLength: number = 12): string {
  if (id.length <= maxLength) return id;
  return id.slice(0, maxLength) + "...";
}

export function CardCandidateAttempt({
  candidate,
  attempt,
  meta,
}: CardCandidateAttemptProps) {
  const isCompleted = attempt.status === "completed";

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1E2A4A] via-[#0D7377] to-[#14B8A6]" />
      
      <div className="p-6 pt-7">
        <div className="flex gap-6">
          {/* Left Column - Candidate Info */}
          <div className="flex flex-col items-center gap-3 min-w-[140px]">
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-20 h-20 rounded-full object-cover border-3 border-[#0D7377] shadow-lg shadow-teal-500/20"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#1E2A4A] to-[#0D7377] border-3 border-white shadow-lg shadow-teal-500/20 flex items-center justify-center">
                <span className="text-white font-semibold text-xl">
                  {getInitials(candidate.name)}
                </span>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-xl font-bold text-[#1E2A4A]">
                {candidate.name}
              </h3>
              <p className="text-[13px] text-[#6B7280]">{candidate.email}</p>
              <p className="text-xs text-[#0D7377] font-mono mt-1 bg-teal-50 px-2 py-0.5 rounded">
                {candidate.candidateId}
              </p>
            </div>
          </div>

          {/* Right Column - Details Grid */}
          <div className="flex-1 grid grid-cols-3 gap-4">
            {/* Assessment Type */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-3 border border-indigo-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-indigo-600 font-semibold">
                Assessment Type
              </p>
              <p className="text-sm font-bold text-[#1E2A4A] mt-1">
                {meta.assessmentName}
              </p>
            </div>

            {/* Attempt ID */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-lg p-3 border border-slate-200">
              <p className="text-[10px] uppercase tracking-[0.08em] text-slate-500 font-semibold">
                Attempt ID
              </p>
              <p className="text-sm font-mono text-[#1E2A4A] mt-1">
                {truncateId(meta.attemptId)}
              </p>
            </div>

            {/* Status */}
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-lg p-3 border border-emerald-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-emerald-600 font-semibold">
                Status
              </p>
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mt-1 ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                    : "bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900"
                }`}
              >
                {isCompleted ? "Completed" : "Incomplete"}
              </span>
            </div>

            {/* Start Time */}
            <div className="bg-gradient-to-br from-sky-50 to-white rounded-lg p-3 border border-sky-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-sky-600 font-semibold">
                Start Time
              </p>
              <p className="text-sm text-[#1E2A4A] mt-1">
                {formatDateTime(attempt.startTime)}
              </p>
            </div>

            {/* End Time */}
            <div className="bg-gradient-to-br from-violet-50 to-white rounded-lg p-3 border border-violet-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-violet-600 font-semibold">
                End Time
              </p>
              <p className="text-sm text-[#1E2A4A] mt-1">
                {formatDateTime(attempt.endTime)}
              </p>
            </div>

            {/* Duration */}
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-3 border border-teal-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-teal-600 font-semibold">
                Duration
              </p>
              <p className="text-sm font-bold text-[#0D7377] mt-1">
                {attempt.durationFormatted}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
