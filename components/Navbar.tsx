import { UserSettings } from "@/types";
import { Language } from "@/utils/i18n";

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
      Navigation bar
    </header>
  );
};
