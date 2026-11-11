import { useEffect, useState } from "react";
import { Attempt, ExerciseStatus, UserSettings } from "./types";
import {
  getTheme,
  loadAttempts,
  loadSettings,
  saveAttempts,
  saveSettings,
  setTheme,
} from "./utils/storageManger";
import { getLanguage, Language, setLanguage } from "./utils/i18n";
import { GeneratedExpression, generateExpression } from "./utils/mathEngine";

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

  return <>Chiiiiiii</>;
}
