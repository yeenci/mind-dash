import { OperationType, UserSettings } from "@/types";
import { Language, t } from "@/utils/i18n";
import { SlidersHorizontal } from "lucide-react";

interface PracticeSetupProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onStartPractice: () => void;
  theme: "light" | "dark";
  isPracticing: boolean;
  language: Language;
}

const OPERATION_THEMES: Record<
  OperationType,
  {
    symbol: string;
    activeBg: string;
    symbolBg: string;
    symbolText: string;
  }
> = {
  "+": {
    symbol: "+",
    activeBg:
      "bg-[#fff3c4] dark:bg-[#3a311d] text-[#25283b] dark:text-[#ffe596]",
    symbolBg: "bg-[#ffd76a] text-[#25283b]",
    symbolText: "text-[#25283b]",
  },
  "-": {
    symbol: "-",
    activeBg:
      "bg-[#ffe4dc] dark:bg-[#3b2527] text-[#25283b] dark:text-[#ffb8a8]",
    symbolBg: "bg-[#ffad99] text-[#25283b]",
    symbolText: "text-[#25283b]",
  },
  x: {
    symbol: "x",
    activeBg:
      "bg-[#ede6ff] dark:bg-[#2c2547] text-[#25283b] dark:text-[#dcd0fa]",
    symbolBg: "bg-[#c9b7fa] text-[#25283b]",
    symbolText: "text-[#25283b]",
  },
  "÷": {
    symbol: "÷",
    activeBg:
      "bg-[#dff0fc] dark:bg-[#1e3245] text-[#25283b] dark:text-[#bde1fa]",
    symbolBg: "bg-[#a6d6f7] text-[#25283b]",
    symbolText: "text-[#25283b]",
  },
};

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

  const operations: { id: OperationType; label: string }[] = [
    { id: "+", label: t("addition", undefined, language) },
    { id: "-", label: t("subtraction", undefined, language) },
    { id: "x", label: t("multiplication", undefined, language) },
    { id: "÷", label: t("division", undefined, language) },
  ];

  return (
    <section className="p-6 sm:p-7 rounded-[28px] bg-white dark:bg-[#1e2136] text-[#25283b] dark:text-[#f6f4ec] shadow-[0_14px_38px_-14px_rgba(37,40,59,0.09)] dark:shadow-[0_14px_38px_-14px_rgba(0,0,0,0.45)] transition-colors duration-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-7">
        <div className="w-10 h-10 rounded-2xl bg-[#fff3c4] dark:bg-[#3a311d] text-[#25283b] dark:text-[#ffd76a] flex items-center justify-center shrink-0">
          <SlidersHorizontal className="w-5 h-5" />
        </div>
        <h2 className="font-display text-lg font-bold tracking-tight">
          {t("practiceSetup", undefined, language)}
        </h2>
      </div>
    </section>
  );
};
