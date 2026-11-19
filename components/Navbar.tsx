"use client";

import { UserSettings } from "@/types";
import { Language, t } from "@/utils/i18n";
import {
  BarChart2,
  Database,
  Download,
  Globe,
  Home,
  Moon,
  SettingsIcon,
  Sun,
  Zap,
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
}) => {
  return (
    <header
      className={`sticky top-0 z-30 border-b transition-colors duration-200 ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-200 text-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={onHome}
        >
          <div className="w-8 h-8 sm:w-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight bg-linear-to-r from-blue-600 from-blue to-indigo-600 bg-clip-text text-transparent truncate max-w-27.5 sm:max-w-none">
            {t("appName", undefined, language)}
          </span>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-3">
          {/* Home */}
          <button
            onClick={onHome}
            title={t("home", undefined, language)}
            className={`inline-flex h-10 w-10 items-center justify-center gap-1 px-2 rounded-xl text-sm font-medium transition-colors ${
              theme === "dark"
                ? "hover:bg-slate-800 text-slate-300"
                : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            <Home className="w-6 h-6 shrink-0" />
            {/* <span className="hidden md:inline-flex h-4 items-center leading-4">
              {t("home", undefined, language)}
            </span> */}
          </button>

          {/* Progress */}
          <button
            onClick={onOpenProgress}
            title={t("progress", undefined, language)}
            className={`inline-flex h-10 w-10 items-center justify-center gap-1 px-2 rounded-xl text-sm font-medium transition-colors ${
              theme === "dark"
                ? "hover:bg-slate-800 text-slate-300"
                : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            <BarChart2 className="w-6 h-6 shrink-0" />
            {/* <span className="hidden md:inline-flex h-4 items-center leading-4">
              {t("progress", undefined, language)}
            </span> */}
          </button>

          {/* Settings */}
          <button
            onClick={onOpenSettings}
            title={t("settings", undefined, language)}
            className={`inline-flex h-10 w-10 items-center justify-center gap-1 px-2 rounded-xl text-sm font-medium transition-colors ${
              theme === "dark"
                ? "hover:bg-slate-800 text-slate-300"
                : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            <SettingsIcon className="w-6 h-6 shrink-0" />
            {/* <span className="hidden md:inline-flex h-4 items-center leading-4">
              {t("settings", undefined, language)}
            </span> */}
          </button>

          {/* Export File */}
          <button
            onClick={onExport}
            title={t("export", undefined, language)}
            className={`inline-flex h-10 w-10 items-center justify-center gap-1 px-2 rounded-xl text-sm font-medium transition-colors ${
              theme === "dark"
                ? "hover:bg-slate-800 text-slate-300"
                : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            <Download className="w-6 h-6 shrink-0" />
            {/* <span className="hidden md:inline-flex h-4 items-center leading-4">
              {t("export", undefined, language)}
            </span> */}
          </button>

          <div
            className={`h-4 w-px mx-0.5 ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}
          />

          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            title={t("languageToggle", undefined, language)}
            className={`ml-3 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg sm:rounded-xl border flex items-center space-x-1 text-xs font-bold transition-colors shrink-0 ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-blue-400 hover:bg-slate-700"
                : "bg-slate-100 border-slate-200 text-blue-600 hover:bg-slate-200"
            }`}
          >
            <Globe className="w-3.5 h-3.5 shrink-0" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Storage */}
          <div
            className={`hidden xl:flex items-center space-x-1.5 text-xs px-2.5 py-1 rounded-full border ${
              settings.storageMode === "persistent"
                ? theme === "dark"
                  ? "bg-emerald-950/40 border-emerald-800 text-emerald-400"
                  : "bg-emerald-50 border-emerald-200 text-emerald-700"
                : theme === "dark"
                  ? "bg-amber-950/40 border-amber-800 text-amber-400"
                  : "bg-amber-50 border-amber-200 text-amber-700"
            }`}
            title={`Storage mode: ${settings.storageMode === t("persistent", undefined, "en") ? t("persistent", undefined, language) : t("temporary", undefined, language)}`}
          >
            <Database className="w-3 h-3 shrink-0" />
            <span className="capitalize">
              {settings.storageMode === t("persistent", undefined, "en")
                ? t("persistent", undefined, language)
                : t("temporary", undefined, language)}
            </span>
          </div>

          {/* Light/Dark Mode */}
          <button
            onClick={onToggleTheme}
            title="Toggle theme"
            className={`p-1.5 sm:p-2 rounded-xl transition-color shrink-0 ${
              theme === "dark"
                ? "hover:bg-slate-800 text-amber-400"
                : "hover:bg-slate-100 text-slate-600"
            }`}
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
