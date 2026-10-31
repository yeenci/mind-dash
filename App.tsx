import { useEffect, useState } from "react";
import {
  exportAttemptsJson,
  getTheme,
  loadAttempts,
  loadSettings,
  setTheme,
} from "./utils/storageManger";
import { Navbar } from "./components/Navbar";
import { getLanguage, Language, setLanguage } from "./utils/i18n";
import { GeneratedExpression } from "./utils/mathEngine";
import { Attempt, UserSettings } from "./types";

export default function App() {
  const [settings, setSettings] = useState<UserSettings>(loadSettings());
  const [attempts, setAttempts] = useState<Attempt[]>(loadAttempts());
  const [theme, setThemeState] = useState<"light" | "dark">(getTheme());
  const [language, setLanguageState] = useState<Language>(getLanguage());

  const [isPracticing, setIsPracticing] = useState<boolean>(false);
  const [currentExpression, setCurrentExpression] =
    useState<GeneratedExpression | null>(null);

  // 🪼 Modals state
  const [isProgressOpen, setIsProgressOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isConsentOpen, setIsConsentOpen] = useState<boolean>(
    !loadSettings().consentCompleted,
  );
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);

  // 🪼 Apply dark class to root html/body
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(theme);
  }, [theme]);

  // 🪼 Theme
  const handleToggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setThemeState(nextTheme);
  };

  // 🪼 Language
  const handleToggleLanguage = () => {
    const nextLang: Language = language === "en" ? "vi" : "en";
    setLanguageState(nextLang);
    setLanguage(language);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        theme === "dark"
          ? "bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* 🪼 Top navbar 🪼 */}
      <Navbar
        onOpenProgress={() => setIsProgressOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
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
