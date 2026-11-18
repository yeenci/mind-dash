import { OperationType, UserSettings } from "@/types";
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
  const handleMaxNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 2 && val <= 10000) {
      onUpdateSettings({ maxNumber: val });
    }
  };

  const handleOpCountChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= 10) {
      onUpdateSettings({ operatorCount: val });
    }
  };

  const handleOperationToggle = (op: OperationType) => {
    const current = settings.selectedOperations;
    let updated: OperationType[];
    if (current.includes(op)) {
      if (current.length === 1) return;
      updated = current.filter((o) => o !== op);
    } else {
      updated = [...current, op];
    }
    onUpdateSettings({ selectedOperations: updated });
  };

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
