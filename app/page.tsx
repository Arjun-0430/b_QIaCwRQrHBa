"use client";

import { useRef } from "react";
import { mockReportData, ReportData } from "@/lib/mock-report-data";
import { ReportHeader } from "@/components/report/report-header";
import { ReportFooter } from "@/components/report/report-footer";
import { CardCandidateAttempt } from "@/components/report/card-candidate-attempt";
import { CardOverallPerformance } from "@/components/report/card-overall-performance";
import { CardSectionGrid } from "@/components/report/card-section-grid";
import { CardProctoringCompact } from "@/components/report/card-proctoring-compact";
import { CardProctoringDetailed } from "@/components/report/card-proctoring-detailed";
import { CardKeyAreas } from "@/components/report/card-key-areas";
import { CardPerformanceAnalysis } from "@/components/report/card-performance-analysis";
import { CardSupportingFlags } from "@/components/report/card-supporting-flags";
import { CardRecommendations } from "@/components/report/card-recommendations";
import { ChartRadar } from "@/components/report/chart-radar";
import { ChartTimeAccuracy } from "@/components/report/chart-time-accuracy";
import { ChartBullet } from "@/components/report/chart-bullet";
import { ChartConsistency } from "@/components/report/chart-consistency";

interface UniversalReportPageProps {
  reportData?: ReportData;
}

export default function UniversalReportPage({
  reportData = mockReportData,
}: UniversalReportPageProps) {
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const page3Ref = useRef<HTMLDivElement>(null);

  const scrollToPage = (pageRef: React.RefObject<HTMLDivElement | null>) => {
    pageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  const {
    meta,
    candidate,
    attempt,
    summary,
    sections,
    insights,
    recommendations,
    keyAreas,
    proctoring,
  } = reportData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Navigation Bar with gradient */}
      <nav className="no-print sticky top-0 z-50 bg-gradient-to-r from-[#1E2A4A] to-[#2D3E6A] shadow-lg px-6 py-3">
        <div className="max-w-[900px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollToPage(page1Ref)}
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              Page 1
            </button>
            <button
              onClick={() => scrollToPage(page2Ref)}
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              Page 2
            </button>
            <button
              onClick={() => scrollToPage(page3Ref)}
              className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              Page 3
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="px-5 py-2 bg-gradient-to-r from-[#0D7377] to-[#14B8A6] text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-teal-500/25 transition-all flex items-center gap-2"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download PDF
          </button>
        </div>
      </nav>

      {/* Pages Container */}
      <main className="max-w-[900px] mx-auto py-8 px-4">
        {/* PAGE 1 */}
        <div
          ref={page1Ref}
          className="page bg-white min-h-[1123px] shadow-xl shadow-slate-200/50 rounded-xl mb-8 flex flex-col overflow-hidden"
        >
          <ReportHeader candidate={candidate} attempt={attempt} meta={meta} />
          
          {/* White section */}
          <div className="bg-white p-7 pb-4">
            <CardCandidateAttempt
              candidate={candidate}
              attempt={attempt}
              meta={meta}
            />
          </div>
          
          {/* Gradient section - teal tinted */}
          <div className="flex-1 bg-gradient-to-b from-teal-50/50 to-white p-7 pt-4 flex flex-col gap-4">
            <CardOverallPerformance
              summary={summary}
              attempt={attempt}
              sections={sections}
            />
            <CardProctoringCompact proctoring={proctoring} />
            <CardKeyAreas keyAreas={keyAreas} />
          </div>
          
          <ReportFooter
            attemptId={meta.attemptId}
            generatedAt={meta.generatedAt}
            pageNumber={1}
            totalPages={3}
          />
        </div>

        {/* PAGE 2 */}
        <div
          ref={page2Ref}
          className="page bg-white min-h-[1123px] shadow-xl shadow-slate-200/50 rounded-xl mb-8 flex flex-col overflow-hidden"
        >
          <ReportHeader candidate={candidate} attempt={attempt} meta={meta} />
          
          {/* White section */}
          <div className="bg-white p-7 pb-4">
            <CardSectionGrid sections={sections} />
          </div>
          
          {/* Gradient section - indigo tinted */}
          <div className="flex-1 bg-gradient-to-b from-indigo-50/40 to-white p-7 pt-4 flex flex-col gap-4">
            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-4">
              <ChartRadar sections={sections} />
              <div className="flex flex-col gap-4">
                <ChartConsistency sections={sections} />
                <ChartBullet sections={sections} />
              </div>
            </div>
            
            <ChartTimeAccuracy sections={sections} />
          </div>
          
          <ReportFooter
            attemptId={meta.attemptId}
            generatedAt={meta.generatedAt}
            pageNumber={2}
            totalPages={3}
          />
        </div>

        {/* PAGE 3 */}
        <div
          ref={page3Ref}
          className="page bg-white min-h-[1123px] shadow-xl shadow-slate-200/50 rounded-xl mb-8 flex flex-col overflow-hidden"
        >
          <ReportHeader candidate={candidate} attempt={attempt} meta={meta} />
          
          {/* White section */}
          <div className="bg-white p-7 pb-4">
            <CardPerformanceAnalysis
              insights={insights}
              proctoring={proctoring}
            />
          </div>
          
          {/* Gradient section - amber tinted */}
          <div className="flex-1 bg-gradient-to-b from-amber-50/40 to-white p-7 pt-4 flex flex-col gap-4">
            <CardProctoringDetailed proctoring={proctoring} />
            <CardSupportingFlags
              flagCategories={proctoring.flagCategories}
              professionalNote={proctoring.professionalNote}
            />
            <CardRecommendations recommendations={recommendations} />
          </div>
          
          <ReportFooter
            attemptId={meta.attemptId}
            generatedAt={meta.generatedAt}
            pageNumber={3}
            totalPages={3}
          />
        </div>
      </main>
    </div>
  );
}
