"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Attempt, ExerciseStatus, PracticeStats, UserSettings } from "./types";
import {
  clearAllAttempts,
  exportAttemptsCsv,
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
import { PracticeSetup } from "./components/PracticeSetup";
import { PracticeArea } from "./components/PracticeArea";
import { MathDoodles } from "./components/MathDoodles";
import { ProgressModal } from "./components/ProgressModal";
import { SettingsModal } from "./components/SettingsModal";

const DEFAULT_SETTINGS: UserSettings = {
  maxNumber: 10,
  operatorCount: 2,
  selectedOperations: ["+", "-"],
  consentCompleted: false,
  storageMode: "temporary",
  retentionDays: 1,
  lastActiveAt: "",
};

function subscribeToHydration() {
  return () => {};
}

function getServerSnapshot() {
  return false;
}

function getClientSnapshot() {
  return true;
}

export default function App() {
  // Detect when the component has hydrated.
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );

  // App data
  const settings = isHydrated ? loadSettings() : DEFAULT_SETTINGS;
  const attempts = isHydrated ? loadAttempts() : [];
  const theme = isHydrated ? getTheme() : "light";
  const language = isHydrated ? getLanguage() : "en";

  const [isPracticing, setIsPracticing] = useState(false);
  const [currentExpression, setCurrentExpression] =
    useState<GeneratedExpression | null>(null);

  const [isProgressOpen, setIsProgressOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [currentSettings, setCurrentSettings] =
    useState<UserSettings>(DEFAULT_SETTINGS);
  const [currentAttempts, setCurrentAttempts] = useState<Attempt[]>([]);
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en");

  // Initialize app state after hydration.
  useEffect(() => {
    if (!isHydrated) return;

    setCurrentSettings(settings);
    setCurrentAttempts(attempts);
    setCurrentTheme(theme);
    setCurrentLanguage(language);
    setIsConsentOpen(!settings.consentCompleted);
  }, [isHydrated]);

  // Apply theme to document.
  useEffect(() => {
    if (!isHydrated) return;

    document.documentElement.classList.toggle("dark", currentTheme === "dark");
    setTheme(currentTheme);
  }, [currentTheme, isHydrated]);

  const handleToggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleToggleLanguage = () => {
    const nextLang: Language = currentLanguage === "en" ? "vi" : "en";
    setCurrentLanguage(nextLang);
    setLanguage(nextLang);
  };

  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = { ...currentSettings, ...newSettings };
    setCurrentSettings(updated);
    saveSettings(updated);
  };

  const handleStartPractice = () => {
    const expr = generateExpression(
      currentSettings.maxNumber,
      currentSettings.operatorCount,
      currentSettings.selectedOperations,
    );
    setCurrentExpression(expr);
    setIsPracticing(true);
  };

  const handleNextExercise = () => {
    const expr = generateExpression(
      currentSettings.maxNumber,
      currentSettings.operatorCount,
      currentSettings.selectedOperations,
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

    const updatedAttempts = [newAttempt, ...currentAttempts];
    setCurrentAttempts(updatedAttempts);
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
    setCurrentAttempts([]);
  };

  // Avoid rendering the app before browser data is loaded.
  if (!isHydrated) {
    return <div className="min-h-screen bg-slate-50" />;
  }

  // Compute statistics.
  const correctAttempts = currentAttempts.filter((a) => a.result === "Correct");
  const totalAttempts = currentAttempts.length;
  const correctCount = correctAttempts.length;

  const accuracy = totalAttempts
    ? Math.round((correctCount / totalAttempts) * 100)
    : 0;

  const givenUpCount = currentAttempts.filter(
    (a) => a.result === "Given Up",
  ).length;

  const timedOutCount = currentAttempts.filter(
    (a) => a.result === "Timed Out",
  ).length;

  const totalPracticeTimeSeconds = currentAttempts.reduce(
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
    <div className="relative min-h-screen flex flex-col font-sans bg-[#fffdf6] dark:bg-[#151726] text-[#25283b] dark:text-[#f6f4ec] transition-colors duration-200 overflow-x-hidden">
      <MathDoodles variant="page" />

      <Navbar
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenSettings={() => setIsSettingOpen(true)}
        onHome={() => {
          setIsPracticing(false);
          setCurrentExpression(null);
        }}
        onExport={() => exportAttemptsJson(currentAttempts)}
        theme={currentTheme}
        onToggleTheme={handleToggleTheme}
        settings={currentSettings}
        language={currentLanguage}
        onToggleLanguage={handleToggleLanguage}
        isPracticing={isPracticing}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <PracticeSetup
              settings={currentSettings}
              onUpdateSettings={handleUpdateSettings}
              onStartPractice={handleStartPractice}
              theme={currentTheme}
              isPracticing={isPracticing}
              language={currentLanguage}
            />
          </div>

          <div className="lg:col-span-8">
            <PracticeArea
              currentExpression={currentExpression}
              onCompleteExercise={handleCompleteExercise}
              onNextExercise={handleNextExercise}
              theme={currentTheme}
              isPracticing={isPracticing}
              language={currentLanguage}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <ProgressModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        attempts={attempts}
        stats={stats}
        onViewAll={() => {
          setIsProgressOpen(false);
          setIsHistoryOpen(true);
        }}
        onHome={handleStartPractice}
        theme={theme}
        language={language}
      />

      <SettingsModal
        isOpen={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onExportJson={() => exportAttemptsJson(attempts)}
        onExportCsv={() => exportAttemptsCsv(attempts)}
        onClearProgress={handleClearProgress}
        theme={theme}
        language={language}
      />
    </div>
  );
}
