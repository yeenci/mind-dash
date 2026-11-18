import { useEffect, useState } from "react";
import { Attempt, ExerciseStatus, PracticeStats, UserSettings } from "./types";
import {
  clearAllAttempts,
  exportAttemptsJson,
  getTheme,
  loadAttempts,
  loadSettings,
  saveAttempts,
  saveSettings,
  setTheme,
} from "./utils/storageManger";
import { getLanguage, Language, setLanguage } from "./utils/i18n";
import { GeneratedExpression, generateExpression } from "./utils/mathEngine";
import { Navbar } from "./components/Navbar";

export default function App() {
  const [settings, setSettings] = useState<UserSettings>(loadSettings());
  const [attempts, setAttempts] = useState<Attempt[]>(loadAttempts());
  const [theme, setThemeState] = useState<"light" | "dark">(getTheme);
  const [language, setLanguageState] = useState<Language>(getLanguage());

  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [currentExpression, setCurrentExpression] =
    useState<GeneratedExpression | null>(null);

  // Modals state
  const [isProgressOpen, setIsProgressOpen] = useState<boolean>(false);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);
  const [isConsentOpen, setIsConsentOpen] = useState<boolean>(
    !loadSettings().consentCompleted,
  );
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // Apply dark class to root html/body
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setThemeState(nextTheme);
  };

  const handleToggleLanguage = () => {
    const nextLang: Language = language === "en" ? "vi" : "en";
    setLanguageState(nextLang);
    setLanguage(nextLang);
  };

  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveSettings(updated);
  };

  const handleStartPractice = () => {
    const expr = generateExpression(
      settings.maxNumber,
      settings.operatorCount,
      settings.selectedOperations,
    );
    setCurrentExpression(expr);
    setIsPracticing(true);
  };

  const handleNextPractice = () => {
    const expr = generateExpression(
      settings.maxNumber,
      settings.operatorCount,
      settings.selectedOperations,
    );
    setCurrentExpression(expr);
  };

  const handleCompleteExercise = (
    status: ExerciseStatus,
    userAnswer: string,
    timeSpentSeconds: number,
    incorrectCount: number,
  ) => {
    if (!currentExpression) return;

    const newAttempt: Attempt = {
      id: Math.random().toString(36).substring(2, 9),
      expression: currentExpression.displayString,
      userAnswer,
      correctAnswer: currentExpression.result,
      result: status,
      timeSpentSeconds,
      incorrectAttemptsCount: incorrectCount,
      createdAt: new Date().toISOString(),
    };

    const updatedAttempts = [newAttempt, ...attempts];
    setAttempts(updatedAttempts);
    saveAttempts(updatedAttempts);
  };

  const handleConsentAccept = () => {
    handleUpdateSettings({
      consentCompleted: true,
      storageMode: "persistent",
      retentionDays: 30,
    });
    setIsConsentOpen(false);
  };

  const handleConsentDecline = () => {
    handleUpdateSettings({
      consentCompleted: true,
      storageMode: "temporary",
      retentionDays: 1,
    });
    setIsConsentOpen(false);
  };

  const handleClearProgress = () => {
    clearAllAttempts();
    setAttempts([]);
  };

  // Compute stats
  const correctAttempts = attempts.filter((a) => a.result === "Correct");
  const totalAttempts = attempts.length;
  const correctCount = correctAttempts.length;
  const accuracy = totalAttempts
    ? Math.round((correctCount / totalAttempts) * 100)
    : 0;
  const givenUpCount = attempts.filter((a) => a.result === "Given Up").length;
  const timedOutCount = attempts.filter((a) => a.result === "Timed Out").length;
  const totalPracticeTimeSeconds = attempts.reduce(
    (acc, a) => acc + a.timeSpentSeconds,
    0,
  );
  const avgTimeSeconds = totalAttempts
    ? Math.round(totalPracticeTimeSeconds / totalAttempts)
    : 0;
  const fastestTimeSeconds = correctAttempts.length
    ? Math.min(...correctAttempts.map((a) => a.timeSpentSeconds))
    : null;

  const stats: PracticeStats = {
    totalAttempts,
    correctCount,
    accuracy,
    givenUpCount,
    timedOutCount,
    avgTimeSeconds,
    fastestTimeSeconds,
    totalPracticeTimeSeconds,
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Navbar */}
      <Navbar
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenSettings={() => setIsSettingOpen(true)}
        onHome={() => {
          setIsPracticing(false);
          setCurrentExpression(null);
        }}
        onExport={() => exportAttemptsJson(attempts)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        settings={settings}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />
    </div>
  );
}
