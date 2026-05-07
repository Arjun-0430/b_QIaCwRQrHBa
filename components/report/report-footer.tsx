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

function truncateId(id: string, maxLength: number = 20): string {
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
    <footer className="h-12 border-t border-slate-200 px-6 flex items-center justify-between bg-gradient-to-r from-slate-50 via-white to-slate-50">
      <span className="text-slate-500 text-[11px] tracking-wide flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <path d="M7 7h10" />
          <path d="M7 12h10" />
          <path d="M7 17h10" />
        </svg>
        <span className="font-semibold text-slate-600">CONFIDENTIAL</span> — For Authorized Hiring Use Only
      </span>
      <span className="text-slate-500 text-[11px] font-mono bg-slate-100 px-2 py-1 rounded">
        ID: {truncateId(attemptId)}
      </span>
      <div className="flex items-center gap-4 text-slate-500 text-[11px]">
        <span className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {formatDateTime(generatedAt)}
        </span>
        <span className="font-semibold text-slate-700 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-2 py-0.5 rounded">
          Page {pageNumber}/{totalPages}
        </span>
      </div>
    </footer>
  );
}
