"use client";

interface ReportFooterProps {
  attemptId: string;
  generatedAt: string;
  pageNumber: number;
  totalPages: number;
}

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

function truncateId(id: string, maxLength: number = 16): string {
  if (id.length <= maxLength) return id;
  return id.slice(0, maxLength) + "...";
}

export function ReportFooter({
  attemptId,
  generatedAt,
  pageNumber,
  totalPages,
}: ReportFooterProps) {
  return (
    <footer className="report-footer bg-slate-50 border-t border-slate-200">
      <span className="text-slate-500 text-[10px] flex items-center gap-1.5">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <path d="M7 7h10" />
          <path d="M7 12h10" />
          <path d="M7 17h10" />
        </svg>
        <span className="font-semibold text-slate-600">CONFIDENTIAL</span>
      </span>
      <span className="text-slate-500 text-[10px] font-mono">
        ID: {truncateId(attemptId)}
      </span>
      <div className="flex items-center gap-3 text-slate-500 text-[10px]">
        <span>{formatDateTime(generatedAt)}</span>
        <span className="font-semibold text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
          Page {pageNumber} of {totalPages}
        </span>
      </div>
    </footer>
  );
}
