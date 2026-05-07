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
    <div className="min-h-screen bg-[#F3F4F6]">
      {/* Navigation Bar */}
      <nav className="no-print sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-3">
        <div className="max-w-[794px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollToPage(page1Ref)}
              className="px-4 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Page 1
            </button>
            <button
              onClick={() => scrollToPage(page2Ref)}
              className="px-4 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Page 2
            </button>
            <button
              onClick={() => scrollToPage(page3Ref)}
              className="px-4 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Page 3
            </button>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#1E3A5F] text-white text-[12px] font-semibold rounded-lg hover:bg-[#2a4a73] transition-colors flex items-center gap-2"
          >
            <svg
              width="14"
              height="14"
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
      <main className="pages-container">
        {/* PAGE 1 */}
        <div ref={page1Ref} className="report-page">
          <ReportHeader candidate={candidate} attempt={attempt} meta={meta} />
          
          <div className="report-content">
            <CardCandidateAttempt
              candidate={candidate}
              attempt={attempt}
              meta={meta}
            />
            <CardOverallPerformance
              summary={summary}
              attempt={attempt}
              sections={sections}
            />
            <CardProctoringCompact proctoring={proctoring} />
            <CardKeyAreas keyAreas={keyAreas} />
            
            {/* Page continuation hint */}
            <div className="mt-auto pt-4 border-t border-slate-200 text-center">
              <p className="text-[12px] text-slate-400 italic">
                Continue to Page 2 for detailed section performance analysis.
              </p>
            </div>
          </div>
          
          <ReportFooter
            attemptId={meta.attemptId}
            generatedAt={meta.generatedAt}
            pageNumber={1}
            totalPages={3}
          />
        </div>

        {/* PAGE 2 */}
        <div ref={page2Ref} className="report-page">
          <ReportHeader candidate={candidate} attempt={attempt} meta={meta} />
          
          <div className="report-content">
            <CardSectionGrid sections={sections} />
            
            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-3">
              <ChartRadar sections={sections} />
              <div className="flex flex-col gap-3">
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
        <div ref={page3Ref} className="report-page">
          <ReportHeader candidate={candidate} attempt={attempt} meta={meta} />
          
          <div className="report-content">
            <CardPerformanceAnalysis
              insights={insights}
              proctoring={proctoring}
            />
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
