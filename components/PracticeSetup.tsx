import { UserSettings } from "@/types";
import { Language } from "@/utils/i18n";

interface PracticeSetupProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onStartPractice: () => void;
  theme: "light" | "dark";
  isPracticing: boolean;
  language: Language;
}

export const PracticeSetup: React.FC<PracticeSetupProps> = ({
  settings,
  onUpdateSettings,
  onStartPractice,
  theme,
  isPracticing,
  language,
}) => {
  return (
    <div
      className={`p-6 rounded-2xl border shadow-sm transition-colors ${
        theme === "dark"
          ? "bg-slate-900 border-slate-800 text-white"
          : "bg-white border-slate-200 text-slate-800"
      }`}
    >
      PracticeSetup Area
    </div>
  );
};
