import { ExerciseStatus } from "@/types";
import { Language } from "@/utils/i18n";
import { GeneratedExpression } from "@/utils/mathEngine";

interface PracticeAreaProps {
  currentExpression: GeneratedExpression | null;
  onCompleteExercise: (
    status: ExerciseStatus,
    userAnswer: string,
    timeSpentSeconds: number,
    incorrectCount: number,
  ) => void;
  onNextExercise: () => void;
  theme: "light" | "dark";
  isPracticing: boolean;
  language: Language;
}

const TIMER_SECONDS = 3000;

export const PracticeArea: React.FC<PracticeAreaProps> = ({
  currentExpression,
  onCompleteExercise,
  onNextExercise,
  theme,
  isPracticing,
  language,
}) => {
  return (
    <div
      className={`p-6 sm:p-10 rounded-3xl border shadow-sm relative overflow-hidden transition-colors ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-200 text-slate-800"
      }`}
    >
      Practice Area
    </div>
  );
};
