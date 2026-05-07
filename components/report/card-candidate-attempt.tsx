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

function truncateId(id: string, maxLength: number = 10): string {
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
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
      {/* Gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1E3A5F] via-[#0D7377] to-[#14B8A6]" />
      
      <div className="p-4 pt-5">
        <div className="flex gap-4">
          {/* Left Column - Candidate Info */}
          <div className="flex flex-col items-center gap-2 min-w-[100px]">
            {candidate.photoUrl ? (
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0D7377]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#0D7377] border-2 border-white flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {getInitials(candidate.name)}
                </span>
              </div>
            )}
            <div className="text-center">
              <h3 className="text-[17px] font-bold text-[#1E2A4A]">
                {candidate.name}
              </h3>
              <p className="text-[11px] text-[#6B7280]">{candidate.email}</p>
              <p className="text-[10px] text-[#0D7377] font-mono mt-0.5 bg-teal-50 px-1.5 py-0.5 rounded">
                {candidate.candidateId}
              </p>
            </div>
          </div>

          {/* Right Column - Details Grid */}
          <div className="flex-1 grid grid-cols-3 gap-2">
            {/* Assessment Type */}
            <div className="bg-gradient-to-br from-indigo-50 to-white rounded-lg p-2 border border-indigo-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-indigo-600 font-semibold">
                Assessment
              </p>
              <p className="text-[12px] font-bold text-[#1E2A4A] mt-0.5">
                {meta.assessmentName}
              </p>
            </div>

            {/* Attempt ID */}
            <div className="bg-gradient-to-br from-slate-50 to-white rounded-lg p-2 border border-slate-200">
              <p className="text-[10px] uppercase tracking-[0.08em] text-slate-500 font-semibold">
                Attempt ID
              </p>
              <p className="text-[12px] font-mono text-[#1E2A4A] mt-0.5">
                {truncateId(meta.attemptId)}
              </p>
            </div>

            {/* Status */}
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-lg p-2 border border-emerald-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-emerald-600 font-semibold">
                Status
              </p>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold mt-0.5 ${
                  isCompleted
                    ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                    : "bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900"
                }`}
              >
                {isCompleted ? "Completed" : "Incomplete"}
              </span>
            </div>

            {/* Start Time */}
            <div className="bg-gradient-to-br from-sky-50 to-white rounded-lg p-2 border border-sky-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-sky-600 font-semibold">
                Start Time
              </p>
              <p className="text-[12px] text-[#1E2A4A] mt-0.5">
                {formatDateTime(attempt.startTime)}
              </p>
            </div>

            {/* End Time */}
            <div className="bg-gradient-to-br from-violet-50 to-white rounded-lg p-2 border border-violet-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-violet-600 font-semibold">
                End Time
              </p>
              <p className="text-[12px] text-[#1E2A4A] mt-0.5">
                {formatDateTime(attempt.endTime)}
              </p>
            </div>

            {/* Duration */}
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-lg p-2 border border-teal-100">
              <p className="text-[10px] uppercase tracking-[0.08em] text-teal-600 font-semibold">
                Duration
              </p>
              <p className="text-[12px] font-bold text-[#0D7377] mt-0.5">
                {attempt.durationFormatted}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
