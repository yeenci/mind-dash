import { UserSettings } from "@/types";
import { Language, t } from "@/utils/i18n";
import { motion } from "motion/react";
import {
  BarChart2,
  Calculator,
  Database,
  Download,
  Globe,
  Home,
  Moon,
  SettingsIcon,
  Sun,
} from "lucide-react";

interface NavbarProps {
  onOpenProgress: () => void;
  onOpenSettings: () => void;
  onHome: () => void;
  onExport: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  settings: UserSettings;
  language: Language;
  onToggleLanguage: () => void;
  isPracticing?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProgress,
  onOpenSettings,
  onHome,
  onExport,
  theme,
  onToggleTheme,
  settings,
  language,
  onToggleLanguage,
  isPracticing = false,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fffdf6]/85 dark:bg-[#151726]/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-6">
        {/* Logo */}
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd76a] rounded-2xl pr-2"
        >
          <motion.div
            whileHover={{ rotate: -6, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#ffd76a] flex items-center justify-center text-[#25283b] shadow-[0_6px_16px_-4px_rgba(255,215,106,0.65)] shrink-0"
          >
            <Calculator className="w-5 h-5" strokeWidth={2.3} />
          </motion.div>
          <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-[#25283b] dark:text-[#f6f4ec] whitespace-nowrap shrink-0">
            {t("appName", undefined, language)}
          </span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Home */}
          <button
            type="button"
            onClick={onHome}
            title={t("home", undefined, language)}
            className={`min-h-10 px-2.5 sm:px-3.5 py-2 rounded-2xl flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd76a] ${
              !isPracticing
                ? "bg-[#fff3c4] text-[#25283b] dark:bg-[#ffd76a]/20 dark:text-[#ffd76a]"
                : "text-[#5e6075] dark:text-[#a3a6be] hover:bg-[#f5f1b4] dark:hover:bg-[#21253b] hover:text-[#25283b] dark:hover:text-[#f6f4ec]"
            }`}
          >
            <Home className="w-6 h-6 shrink-0" />
            {/* <span className="hidden md:inline-flex h-4 items-center leading-4">
              {t("home", undefined, language)}
            </span> */}
          </button>

          {/* Progress */}
          <button
            type="button"
            onClick={onOpenProgress}
            title={t("progress", undefined, language)}
            className="min-h-10 px-2.5 sm:px-3.5 py-2 rounded-2xl flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap shrink-0 text-[##5e6075] dark:text-[#a3a6be] hover:bg-[#eaf6dc] hover:text-[#245322] dark:hover:bg-[#223629] dark:hover:text-[#bce899] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd76a]"
          >
            <BarChart2 className="w-6 h-6 shrink-0" />
            {/* <span className="hidden md:inline-flex h-4 items-center leading-4">
              {t("progress", undefined, language)}
            </span> */}
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={onOpenSettings}
            title={t("settings", undefined, language)}
            className="min-h-10 px-2.5 sm:px-3.5 py-2 rounded-2xl flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap shrink-0 text-[##5e6075] dark:text-[#a3a6be] hover:bg-[#ede6ff] hover:text-[#3c2b73] dark:hover:bg-[#2b2645] dark:hover:text-[#dcd0fa] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd76a]"
          >
            <SettingsIcon className="w-6 h-6 shrink-0" />
            {/* <span className="hidden md:inline-flex h-4 items-center leading-4">
              {t("settings", undefined, language)}
            </span> */}
          </button>

          {/* Export File */}
          <button
            type="button"
            onClick={onExport}
            title={t("export", undefined, language)}
            className="min-h-10 px-2.5 sm:px-3.5 py-2 rounded-2xl flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap shrink-0 text-[##5e6075] dark:text-[#a3a6be] hover:bg-[#e1f1fc] hover:text-[#1e4b75] dark:hover:bg-[#1e3142] dark:hover:text-[#bce0fa] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd76a]"
          >
            <Download className="w-6 h-6 shrink-0" />
            {/* <span className="hidden md:inline-flex h-4 items-center leading-4">
              {t("export", undefined, language)}
            </span> */}
          </button>

          <div
            className={`h-4 w-px mx-0.5 ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}
          />

          {/* Storage */}
          <div
            className="hidden xl:flex items-center gap-1.5 pl-2 pr-1 text-xs font-medium text-[#737589] dark:text-[#969ab3] whitespace-nowrap shrink-0"
            title={`Storage mode: ${settings.storageMode === t("persistent", undefined, "en") ? t("persistent", undefined, language) : t("temporary", undefined, language)}`}
          >
            <Database
              className={`w-4 h-4 shrink-0 ${
                settings.storageMode === t("persistent", undefined, "en")
                  ? "text-[#4e8f3d] dark:text-[#a5df84]"
                  : "text-[#c28114] dark:text-[#ffd76a]"
              }`}
            />
            <span className="capitalize">
              {settings.storageMode === t("persistent", undefined, "en")
                ? t("persistent", undefined, language)
                : t("temporary", undefined, language)}
            </span>
          </div>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={onToggleLanguage}
            title={t("languageToggle", undefined, language)}
            className="min-h-10 px-2.5 sm:px-3 py-2 rounded-2xl bg-[#ede6ff] dark:bg-[#2b2645] text-[#3c2b73] dark:text-[#dcd0fa] hover:bg-[#e2d6fe] dark:hover:bg-[#352f54] flex items-center gap-1.5 text-xs font-bold whitespace-nowrap shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd76a]"
          >
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Light/Dark Mode */}
          <button
            type="button"
            onClick={onToggleTheme}
            title={`${theme === "dark" ? t("lightSwitch", undefined, language) : t("darkSwitch", undefined, language)}`}
            className="min-h-10 min-w-10 p-2 rounded-2xl bg-[#f5f1e4] dark:bg-[#252942] text-[#25283b] dark:text-[#ffd76a] hover:bg-[#fff3c4] dark:hover:bg-[#2f3554] flex items-center justify-center shrink-0 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd76a]"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
