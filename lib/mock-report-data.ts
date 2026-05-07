export interface ReportMeta {
  reportId: string;
  generatedAt: string;
  assessmentKey: string;
  assessmentName: string;
  attemptId: string;
}

export interface Candidate {
  name: string;
  email: string;
  candidateId: string;
  photoUrl: string | null;
}

export interface Attempt {
  status: string;
  startTime: string;
  endTime: string;
  durationFormatted: string;
  reportGeneratedAt: string;
}

export interface Summary {
  overallScore: number;
  totalMarks: number;
  overallAccuracy: number;
  scoreBand: string;
  scoreBandLabel: string;
  percentile: number;
  hiringVerdict: string;
  passed: boolean;
}

export interface Section {
  key: string;
  label: string;
  score: number;
  maxScore: number;
  accuracy: number;
  timeTakenSeconds: number;
  timeFormatted: string;
  correct: number;
  wrong: number;
  skipped: number;
  band: string;
}

export interface Insights {
  performanceSummary: string;
  speedVsAccuracy: string;
  consistencyInsight: string;
  strengthPattern: string;
  weaknessPattern: string;
  integrityNote: string;
}

export interface Recommendations {
  verdict: string;
  nextStep: string;
  interviewFocusAreas: string[];
  developmentPriorities: string[];
  decisionConfidence: string;
}

export interface KeyArea {
  area: string;
  reason: string;
}

export interface FlagCategory {
  type: string;
  count: number;
  label: string;
}

export interface Proctoring {
  integrityScore: number;
  riskLevel: string;
  totalViolations: number;
  tabSwitches: number;
  rapidAnswers: number;
  faceAbsentCount: number;
  faceAbsentDuration: number;
  multipleFacesCount: number;
  gazeAwayCount: number;
  gazeAwayDuration: number;
  headDownCount: number;
  voiceDetectedCount: number;
  copyPasteAttempts: number;
  fullscreenExits: number;
  flagCategories: FlagCategory[];
  professionalNote: string;
}

export interface ReportData {
  meta: ReportMeta;
  candidate: Candidate;
  attempt: Attempt;
  summary: Summary;
  sections: Section[];
  insights: Insights;
  recommendations: Recommendations;
  keyAreas: KeyArea[];
  proctoring: Proctoring;
}

export const mockReportData: ReportData = {
  meta: {
    reportId: "RPT-A1B2C3D4",
    generatedAt: "2025-05-07T10:30:00Z",
    assessmentKey: "mega",
    assessmentName: "Mega Assessment",
    attemptId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  },
  candidate: {
    name: "Arjun Krishnamurthy",
    email: "arjun.k@example.com",
    candidateId: "USR-00421",
    photoUrl: null
  },
  attempt: {
    status: "completed",
    startTime: "2025-05-07T08:00:00Z",
    endTime: "2025-05-07T09:58:00Z",
    durationFormatted: "1h 58m",
    reportGeneratedAt: "2025-05-07T10:30:00Z"
  },
  summary: {
    overallScore: 74,
    totalMarks: 100,
    overallAccuracy: 71,
    scoreBand: "strong",
    scoreBandLabel: "Strong",
    percentile: 72,
    hiringVerdict: "Potential Fit",
    passed: true
  },
  sections: [
    { key: "quant_logical",     label: "Quantitative & Logical",    score: 82, maxScore: 100, accuracy: 85, timeTakenSeconds: 1680, timeFormatted: "28m 0s",  correct: 17, wrong: 3,  skipped: 0, band: "High"   },
    { key: "cognitive_battery", label: "Cognitive Battery",         score: 68, maxScore: 100, accuracy: 70, timeTakenSeconds: 1920, timeFormatted: "32m 0s",  correct: 14, wrong: 6,  skipped: 0, band: "Medium" },
    { key: "skill_technical",   label: "Skill & Technical",         score: 75, maxScore: 100, accuracy: 78, timeTakenSeconds: 1560, timeFormatted: "26m 0s",  correct: 14, wrong: 4,  skipped: 2, band: "High"   },
    { key: "verbal_comm",       label: "Verbal & Communication",    score: 60, maxScore: 100, accuracy: 62, timeTakenSeconds: 2100, timeFormatted: "35m 0s",  correct: 13, wrong: 8,  skipped: 0, band: "Medium" },
    { key: "data_abstract",     label: "Data & Abstract Reasoning", score: 78, maxScore: 100, accuracy: 80, timeTakenSeconds: 1800, timeFormatted: "30m 0s",  correct: 16, wrong: 4,  skipped: 0, band: "High"   },
    { key: "coding",            label: "Coding Fundamentals",       score: 55, maxScore: 100, accuracy: 58, timeTakenSeconds: 2400, timeFormatted: "40m 0s",  correct: 11, wrong: 8,  skipped: 1, band: "Medium" },
    { key: "situational",       label: "Situational Judgement",     score: 80, maxScore: 100, accuracy: 83, timeTakenSeconds: 1440, timeFormatted: "24m 0s",  correct: 15, wrong: 3,  skipped: 2, band: "High"   }
  ],
  insights: {
    performanceSummary: "Candidate demonstrated strong capability across assessed areas, achieving 74% with consistent performance across most competency domains.",
    speedVsAccuracy: "Deliberate approach with high accuracy — may benefit from pacing practice.",
    consistencyInsight: "Moderate variation across sections — some areas stronger.",
    strengthPattern: "Strongest performance in: Quantitative & Logical, Data & Abstract Reasoning with scores of 82% and 78%.",
    weaknessPattern: "Lowest scores recorded in: Coding Fundamentals, Verbal & Communication. Focused preparation in these areas is recommended.",
    integrityNote: "Assessment completed under standard integrity conditions."
  },
  recommendations: {
    verdict: "Potential Fit",
    nextStep: "Conduct structured competency interview focusing on flagged sections.",
    interviewFocusAreas: [
      "Probe depth of knowledge in Coding Fundamentals — candidate scored 55% in this area.",
      "Probe depth of knowledge in Verbal & Communication — candidate scored 60% in this area.",
      "Probe depth of knowledge in Cognitive Battery — candidate scored 68% in this area."
    ],
    developmentPriorities: [
      "Structured practice recommended in Coding Fundamentals.",
      "Structured practice recommended in Verbal & Communication.",
      "Structured practice recommended in Cognitive Battery."
    ],
    decisionConfidence: "Moderate confidence"
  },
  keyAreas: [
    { area: "Coding Fundamentals",       reason: "Lowest section score at 55% — targeted technical practice recommended." },
    { area: "Verbal & Communication",    reason: "Below threshold at 60% — structured language skill development suggested." },
    { area: "Cognitive Battery",         reason: "Moderate performance at 68% — reasoning and memory exercises advised." }
  ],
  proctoring: {
    integrityScore: 88,
    riskLevel: "low",
    totalViolations: 2,
    tabSwitches: 1,
    rapidAnswers: 0,
    faceAbsentCount: 1,
    faceAbsentDuration: 4,
    multipleFacesCount: 0,
    gazeAwayCount: 3,
    gazeAwayDuration: 8,
    headDownCount: 1,
    voiceDetectedCount: 0,
    copyPasteAttempts: 0,
    fullscreenExits: 1,
    flagCategories: [
      { type: "tab_switch",     count: 1, label: "Tab switches detected" },
      { type: "face_absent",    count: 1, label: "Brief face absence noted" },
      { type: "fullscreen_exit",count: 1, label: "Fullscreen exit detected" }
    ],
    professionalNote: "Assessment completed with standard monitoring. Minor irregularities noted are within acceptable range."
  }
};
