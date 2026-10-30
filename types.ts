export type OperationType = "+" | "-" | "x" | "÷";

export type ExerciseStatus = "Correct" | "Given Up" | "Timed Out";

export interface Attempt {
  id: string;
  expression: string;
  userAnswer: string;
  correctAnswer: number;
  result: ExerciseStatus;
  timeSpentSeconds: number;
  incorrectAttemptsCount: number;
  createdAt: string; // ISO string
}

export interface UserSettings {
  maxNumber: number;
  operatorCount: number;
  selectedOperations: OperationType[];
  storageMode: "persistent" | "temporary";
  retentionDays: 7 | 30 | 1; // 1 day for temporary
  consentCompleted: boolean;
  lastActiveAt: string;
}

export interface PracticeStats {
  totalAttempts: number;
  correctCount: number;
  accuracy: number;
  givenUpCount: number;
  timedOutCount: number;
  avgTimeCount: number;
  fastedTimeSeconds: number | null;
  totalPracticeTimeSeconds: number;
}
