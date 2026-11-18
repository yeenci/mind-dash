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

export const PracticeArea: React.FC<PracticeAreaProps> = ({}) => {
    return (
        <>Practice Area</>
    )
};
