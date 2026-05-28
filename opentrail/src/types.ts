export interface Issue {
  id: string;
  title: string;
  label: string; // e.g. "Good First Issue" | "Testing" | "Feature" | "Bug"
  difficulty: string; // e.g. "Easy" | "Medium" | "Hard"
}

export interface Repository {
  name: string;
  description: string;
  healthScore: number;
  learningPath: string;
  issues: Issue[];
}

export interface LearningModule {
  id: string;
  title: string;
  category: "Newcomer" | "Pro";
  isAiAssisted?: boolean;
  duration: string;
  description: string;
  chaptersCount: number;
  steps: string[];
  progressPercent: number;
}

export interface SkillProgress {
  name: string;
  percent: number;
}

export interface QuickReference {
  id: string;
  command: string;
  description: string;
}

export interface IssueGuidance {
  conceptOverview: string;
  suggestedFiles: string[];
  stepByStepFix: string[];
  reproSteps: string[];
  tipsForNewcomers: string;
}
