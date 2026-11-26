import React, { useState, useEffect, useRef } from "react";
import {
  Clock,
  Send,
  Flag,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Lightbulb,
  Calculator,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GeneratedExpression } from "../utils/mathEngine";
import { ExerciseStatus } from "../types";
import { GiveUpModal } from "./GiveUpModal";
import { MathDoodles } from "./MathDoodles";
import { Language, t } from "../utils/i18n";

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
    case "×":
    case "*":
      return "text-[#6d4aff] dark:text-[#dcd0fa]";
    case "÷":
    case "/":
      return "text-[#1e82c4] dark:text-[#9ad0f5]";
    default:
      return "text-[#25283b] dark:text-[#f6f4ec]";
  }
}

interface ActivePracticeSessionProps {
  currentExpression: GeneratedExpression;
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

const ActivePracticeSession: React.FC<ActivePracticeSessionProps> = ({
  currentExpression,
  onCompleteExercise,
  onNextExercise,
  theme,
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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const incorrectCountRef = useRef<number>(0);
  const languageRef = useRef<Language>(language);
  const onCompleteRef = useRef(onCompleteExercise);

  const isFinished = exerciseState !== "active";

  useEffect(() => {
    languageRef.current = language;
    onCompleteRef.current = onCompleteExercise;
  }, [language, onCompleteExercise]);

  // 🪼 Handle Enter keypress for Next Exercise when finished
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isFinished) {
        e.preventDefault();
        onNextExercise();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFinished, onNextExercise]);

  // 🪼 Focus input and start countdown timer on mount for this exercise
  useEffect(() => {
    startTimeRef.current = Date.now();
    inputRef.current?.focus();

    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, TIMER_SECONDS - elapsed);
      setTimeLeft(remaining);
      setTimeSpent(elapsed);

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setExerciseState("timed_out");
        setFeedbackMessage(
          `${t("timesUp", undefined, languageRef.current)} ${currentExpression.result}.`,
        );
        onCompleteRef.current(
          "Timed Out",
          "—",
          TIMER_SECONDS,
          incorrectCountRef.current,
        );
      }
    }, 250);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentExpression]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exerciseState !== "active") return;

    const trimmed = userAnswer.trim();
    if (!trimmed) return;

    const parsedAns = parseFloat(trimmed);
    const actualTime = Math.min(
      TIMER_SECONDS,
      Math.floor((Date.now() - startTimeRef.current) / 1000),
    );

    if (parsedAns === currentExpression.result) {
      if (timerRef.current) clearInterval(timerRef.current);
      setExerciseState("correct");
      setFeedbackMessage(
        `${t("correctMsg", undefined, language)} ${actualTime}s.`,
      );
      onCompleteExercise("Correct", trimmed, actualTime, incorrectCount);
    } else {
      const nextIncorrect = incorrectCount + 1;
      incorrectCountRef.current = nextIncorrect;
      setIncorrectCount(nextIncorrect);
      setFeedbackMessage(t("notQuite", undefined, language));
      if (inputRef.current) {
        inputRef.current.select();
      }
    }
  };

  const handleConfirmGiveUp = () => {
    setIsGiveUpModalOpen(false);
    if (exerciseState !== "active") return;
    if (timerRef.current) clearInterval(timerRef.current);
    const actualTime = Math.min(
      TIMER_SECONDS,
      Math.floor((Date.now() - startTimeRef.current) / 1000),
    );
    setExerciseState("given_up");
    setFeedbackMessage(
      `${t("givenUpMsg", undefined, language)} ${currentExpression.result}.`,
    );
    onCompleteExercise(
      "Given Up",
      userAnswer || "—",
      actualTime,
      incorrectCount,
    );
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  const timerProgress = Math.max(0, Math.min(1, timeLeft / TIMER_SECONDS));
  const tokens = currentExpression.displayString.split(" ");

  return (
    <section className="relative overflow-hidden p-5 sm:p-8 lg:p-10 rounded-4xl bg-[#fff8df] dark:bg-[#1e2136] text-[#25283b] dark:text-[#f6f4ec] shadow-[0_14px_40px_-14px_rgba(37,40,59,0.09)] dark:shadow-[0_14px_40px_-14px_rgba(0,0,0,0.48)] transition-colors duration-200">
      <MathDoodles variant="card" />

      {/* Inner Puzzle Card */}
      <div className="relative z-10 rounded-[26px] bg-white/95 dark:bg-[#252942] shadow-[0_10px_30px_-12px_rgba(37,40,59,0.08)] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] overflow-hidden p-6 sm:p-10">
        {/* Top Timer Progress Strip */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5 bg-[#f2ede0] dark:bg-[#1a1d30] overflow-hidden"
          aria-hidden="true"
        >
          <div
            className={`h-full origin-left transition-transform duration-300 ${
              timeLeft <= 30
                ? "bg-[#ff8a75]"
                : exerciseState === "correct"
                  ? "bg-[#94d65a]"
                  : "bg-[#ffd76a]"
            }`}
            style={{ transform: `scaleX(${timerProgress})` }}
          />
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 pt-1">
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-mono font-bold text-base sm:text-lg tabular-nums tracking-wider transition-colors duration-200 ${
              timeLeft <= 30 && exerciseState === "active"
                ? "bg-[#ffe4de] dark:bg-[#2b2326] text-[#b83227] dark:text-[#ff9e8a]"
                : "bg-[#e6f3fc] dark:bg-[#1e3245] text-[#1e4b75] dark:text-[#bde1fa]"
            }`}
          >
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            <span>{timeFormatted}</span>
          </div>
          <span className="text-xs font-medium mt-2 text-[#737589] dark:text-[#969ab3]">
            {t("timeLimit", undefined, language)}
          </span>
        </div>

        {/* Arithmetic Expression Centerpiece */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentExpression.displayString}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="my-6 sm:my-10 px-2 py-4 rounded-3xl bg-[#fffdf7] dark:bg-[#1e2238] flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-3.5 gap-y-2 select-none"
          >
            {tokens.map((token, idx) => (
              <span
                key={`${token}-${idx}`}
                className={`font-mono text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight tabular-nums ${getOperatorColorClass(
                  token,
                )}`}
              >
                {token === "-" ? "−" : token}
              </span>
            ))}
            <span className="font-mono text-2xl sm:text-4xl lg:text-5xl font-bold text-[#858594] dark:text-[#8f93ad]">
              =
            </span>
            <span className="inline-flex items-center justify-center min-w-11 sm:min-w-14 px-3 py-1 rounded-2xl bg-[#fff3c4] dark:bg-[#3a311d] font-mono text-2xl sm:text-4xl lg:text-5xl font-bold text-[#25283b] dark:text-[#ffd76a]">
              ?
            </span>
          </motion.div>
        </AnimatePresence>

        {!isFinished ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <div>
              <input
                ref={inputRef}
                type="number"
                step="any"
                placeholder={t("enterAnswerPlaceholder", undefined, language)}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-[#f7f4ea] dark:bg-[#181b2c] text-[#25283b] dark:text-[#f6f4ec] placeholder-[#858594] dark:placeholder-[#7a7e9a] text-xl sm:text-2xl font-mono font-bold text-center tabular-nums focus:outline-none focus:bg-white dark:focus:bg-[#141726] focus:ring-4 focus:ring-[#ffd76a]/70 shadow-inner transition-all"
              />
            </div>

            <AnimatePresence>
              {feedbackMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className={`p-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 ${
                    incorrectCount > 0
                      ? "bg-[#ffe4de] dark:bg-[#2b2326] text-[#9e2a1f] dark:text-[#ffaca0]"
                      : "bg-[#fff1cc] dark:bg-[#382f1d] text-[#7a4b00] dark:text-[#ffd76a]"
                  }`}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsGiveUpModalOpen(true)}
                className="flex-1 min-h-12 py-3.5 px-5 rounded-2xl bg-[#f2efe5] dark:bg-[#2f3452] hover:bg-[#e8e3d5] dark:hover:bg-[#393f61] text-[#45485e] dark:text-[#d5d7e6] text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors focus:outline-none focus-visible:ring-3 focus-visible:ring-[#ffd76a]"
              >
                <Flag className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">
                  {t("giveUp", undefined, language)}
                </span>
              </motion.button>

              <motion.button
                type="submit"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 min-h-12 py-3.5 px-5 rounded-2xl bg-[#ffd76a] hover:bg-[#ffc93c] text-[#25283b] font-display font-bold text-sm sm:text-base shadow-[0_8px_22px_-6px_rgba(255,215,106,0.85)] dark:shadow-[0_8px_22px_-6px_rgba(255,215,106,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd76a]/50"
              >
                <Send className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">
                  {t("submit", undefined, language)}
                </span>
              </motion.button>
            </div>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="max-w-md mx-auto text-center space-y-5"
          >
            <div
              className={`p-6 rounded-3xl flex flex-col items-center gap-2.5 ${
                exerciseState === "correct"
                  ? "bg-[#e5f6d3] dark:bg-[#213829] text-[#245322] dark:text-[#bce899]"
                  : exerciseState === "given_up"
                    ? "bg-[#fff1cc] dark:bg-[#382f1d] text-[#7a4b00] dark:text-[#ffd76a]"
                    : "bg-[#ffe4de] dark:bg-[#2b2326] text-[#9e2a1f] dark:text-[#ffaca0]"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  exerciseState === "correct"
                    ? "bg-[#c8e9a7] dark:bg-[#2e4d38]"
                    : exerciseState === "given_up"
                      ? "bg-[#ffe08a] dark:bg-[#4d3f24]"
                      : "bg-[#ffc4b8] dark:bg-[#522d32]"
                }`}
              >
                {exerciseState === "correct" ? (
                  <CheckCircle2 className="w-6 h-6" />
                ) : exerciseState === "timed_out" ? (
                  <Clock className="w-6 h-6" />
                ) : (
                  <AlertCircle className="w-6 h-6" />
                )}
              </div>

              <div className="font-display text-lg sm:text-xl font-extrabold">
                {feedbackMessage}
              </div>

              <div className="text-sm font-semibold tabular-nums opacity-90">
                {t("timeSpent", undefined, language)}:{" "}
                <span className="font-mono font-bold">{timeSpent}s</span>
                {incorrectCount > 0 &&
                  ` · ${t("incorrectAttempts", undefined, language)}: ${incorrectCount}`}
              </div>

              <div className="text-xs font-medium opacity-75">
                {t("pressEnterToContinue", undefined, language)}
              </div>
            </div>

            <motion.button
              type="button"
              onClick={onNextExercise}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full min-h-13 py-4 px-6 rounded-2xl bg-[#ffd76a] hover:bg-[#ffc93c] text-[#25283b] font-display font-bold text-base shadow-[0_10px_24px_-8px_rgba(255,215,106,0.9)] dark:shadow-[0_10px_24px_-8px_rgba(255,215,106,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#ffd76a]/50"
            >
              <span>{t("nextExercise", undefined, language)}</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Encouraging footer note */}
      <div className="relative z-10 mt-4 flex items-center justify-center sm:justify-end gap-2 text-xs font-semibold text-[#737589] dark:text-[#969ab3] select-none">
        <span>{t("smallSteps", undefined, language)}</span>
      </div>

      <GiveUpModal
        isOpen={isGiveUpModalOpen}
        onConfirm={handleConfirmGiveUp}
        onCancel={() => setIsGiveUpModalOpen(false)}
        theme={theme}
        language={language}
      />
    </section>
  );
};

export const PracticeArea: React.FC<PracticeAreaProps> = ({
  currentExpression,
  onCompleteExercise,
  onNextExercise,
  theme,
  isPracticing,
  language,
}) => {
  if (!isPracticing || !currentExpression) {
    return (
      <section className="relative overflow-hidden p-8 sm:p-14 rounded-4xl bg-[#fff8df] dark:bg-[#1e2136] text-[#25283b] dark:text-[#f6f4ec] shadow-[0_14px_40px_-14px_rgba(37,40,59,0.08)] dark:shadow-[0_14px_40px_-14px_rgba(0,0,0,0.45)] min-h-110 flex flex-col items-center justify-center text-center transition-colors duration-200">
        <MathDoodles variant="card" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 flex flex-col items-center max-w-md"
        >
          {/* Playful Math Tiles Illustration */}
          <div className="flex items-center gap-2.5 mb-6" aria-hidden="true">
            <span className="w-11 h-11 rounded-2xl bg-[#c8e9a7] dark:bg-[#223629] text-[#245322] dark:text-[#bce899] font-display text-xl font-extrabold flex items-center justify-center -rotate-6 shadow-sm">
              +
            </span>
            <div className="w-16 h-16 rounded-3xl bg-[#ffd76a] text-[#25283b] flex items-center justify-center shadow-[0_10px_24px_-6px_rgba(255,215,106,0.75)]">
              <Lightbulb className="w-8 h-8" strokeWidth={2.2} />
            </div>
            <span className="w-11 h-11 rounded-2xl bg-[#dcd0fa] dark:bg-[#2b2645] text-[#3c2b73] dark:text-[#dcd0fa] font-display text-xl font-extrabold flex items-center justify-center rotate-6 shadow-sm">
              ×
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-balance">
            {t("readyToPractice", undefined, language)}
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-[#5e6075] dark:text-[#a3a6be] mb-6">
            {t("readyDescription", undefined, language)}
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#737589] dark:text-[#8f93ad]">
            <Calculator className="w-4 h-4 text-[#d99b00] dark:text-[#ffd76a]" />
            <span>{t("smallSteps", undefined, language)}</span>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <ActivePracticeSession
      key={currentExpression.expressionString}
      currentExpression={currentExpression}
      onCompleteExercise={onCompleteExercise}
      onNextExercise={onNextExercise}
      theme={theme}
      language={language}
    />
  );
};
