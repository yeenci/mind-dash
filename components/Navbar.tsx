import { UserSettings } from "@/types";
import { Language, t } from "@/utils/i18n";
import { Moon, Sun, Zap } from "lucide-react";

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
          className="flex items-center space-x-2 cursor pointer"
          onClick={onHome}
        >
          <div className="w-8 h-8 sm:w-9 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight bg-linear-to-r from-blue-600 from-blue to-indigo-600 bg-clip-text text-transparent truncate max-w-27.5 sm:max-w-none">
            {t("appName", undefined, language)}
          </span>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2">
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
