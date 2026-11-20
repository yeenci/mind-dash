import { ExerciseStatus } from "@/types";
import { Language } from "@/utils/i18n";
import { GeneratedExpression } from "@/utils/mathEngine";
import { MathDoodles } from "./MathDoodles";

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
    <div className="relative overflow-hidden p-5 sm:p-8 lg:p-10 rounded-4xl bg-[#fff8df] dark:bg-[#1e2136] text-[#25283b] dark:text-[#f6f4ec] shadow-[0_14px_40px_-14px_rgba(37,40,59,0.09)] dark:shadow-[0_14px_40px_-14px_rgba(0,0,0,0.48)] transition-colors duration-200">
      <MathDoodles variant="card" />

      {/* Inner Puzzle Card */}
      <div className="relative z-10 rounded-[26px] bg-white/95 dark:bg-[#252942] shadow-[0_10px_30px_-12px_rgba(37,40,59,0.08)] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] overflow-hidden p-6 sm:p-10">
        {/* Top Timer Progress Strip */}
        <div
          className="abosulute top-0 left-0 right-0 h-1.5 bg-[#f2ede0] dark:bg-[#1a1d30] overflow-hidden"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};
