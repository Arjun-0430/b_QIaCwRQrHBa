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
    <footer className="h-11 border-t border-[#d2d2d7]/60 px-6 flex items-center justify-between bg-[#f5f5f7]">
      <span className="text-[#86868b] text-[10px] tracking-[-0.01em] flex items-center gap-2">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#86868b]">
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <path d="M7 7h10" />
          <path d="M7 12h10" />
          <path d="M7 17h10" />
        </svg>
        <span className="font-semibold text-[#6e6e73]">CONFIDENTIAL</span> — For Authorized Use Only
      </span>
      <span className="text-[#86868b] text-[10px] font-mono bg-[#e8e8ed] px-2 py-0.5 rounded-md">
        ID: {truncateId(attemptId)}
      </span>
      <div className="flex items-center gap-4 text-[#86868b] text-[10px]">
        <span className="flex items-center gap-1 tracking-[-0.01em]">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#007aff]">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {formatDateTime(generatedAt)}
        </span>
        <span 
          className="font-semibold text-white px-2.5 py-0.5 rounded-full text-[10px] tracking-[-0.01em]"
          style={{
            background: "linear-gradient(135deg, #007aff 0%, #5856d6 100%)"
          }}
        >
          Page {pageNumber} of {totalPages}
        </span>
      </div>
    </footer>
  );
}
