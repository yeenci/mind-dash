import { ExerciseStatus } from "@/types";
import { Language } from "@/utils/i18n";
import { GeneratedExpression } from "@/utils/mathEngine";
import { MathDoodles } from "./MathDoodles";
import { useEffect, useRef, useState } from "react";

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

const TIMER_SECONDS = 300;

function getOperatorColorClass(token: string): string {
  switch (token) {
    case "+":
      return "text-[#d98200] dark:text-[#ffd76a]";
    case "-":
    case "−":
      return "text-[#d9534f] dark:text-[#ff9e8a]";
    case "x":
    case "*":
      return "text-[#6d4aff] dark:text-[#dcd0fa]";
    case "÷":
    case "/":
      return "text-[#1e82c4] dark:text-[#9ad0f5]";
    default:
      return "text-[#25283b] dark:text-[#f6f4ec]";
  }
}

interface ActivePracticeProps {
  currectExpression: GeneratedExpression
  onCompleteExercise: (
    status: ExerciseStatus,
    userAnswer: string,
    timeSpentSeconds: number,
    incorrectCount: number,
  ) => void;
  onNextExercise: () => void;
  theme: "light" | "dark";
  language: Language;
}

export const PracticeArea: React.FC<PracticeAreaProps> = ({
  currentExpression,
  onCompleteExercise,
  onNextExercise,
  theme,
  isPracticing,
  language,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_SECONDS);
  const [exerciseState, setExerciseState] = useState<
    "active" | "correct" | "given_up" | "timed_out"
  >("active");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [isGiveUpModalOpen, setIsGiveUpModalOpen] = useState<boolean>(false);

  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isFinished = exerciseState !== "active";

  // useEffect(()) => {
  //   languageRef
  // }

  // Handle Enter keypress for Next Exercise when finished or Submit when active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isFinished && isPracticing) {
        e.preventDefault();
        onNextExercise();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFinished, isPracticing, onNextExercise]);

  // Reset or start new exercise timer
  useEffect(() => {
    if (!currentExpression || !isPracticing) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    setUserAnswer("");
    setExerciseState("active");
    setFeedbackMessage(null);
    setIncorrectCount(0);
    setTimeLeft(TIMER_SECONDS);
    setTimeSpent(0);
    startTimeRef.current = Date.now();

    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    });
  });

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
