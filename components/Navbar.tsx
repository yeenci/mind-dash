import { UserSettings } from "@/types";
import { Language, t } from "@/utils/i18n";
import { Zap } from "lucide-react";

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
      className={`stickey top-0 z-30 border-b transition-colors duration-200 ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-200 text-slate-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* 🪼 Logo 🪼 */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={onHome}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Zap className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t("appName", undefined, language)}
          </span>
        </div>

        {/* 🪼 Actions 🪼 */}
        <div className="flex items-center space-x-1.5 sm:space-x-3">
          <button
            onClick={onHome}
            title={t("home", undefined, language)}
            
          ></button>
        </div>
      </div>
    </header>
  );
};
