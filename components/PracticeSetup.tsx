import { OperationType, UserSettings } from "@/types";
import { Language, t } from "@/utils/i18n";
import {
  Check,
  ChevronDown,
  HelpCircle,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "motion/react";

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
    symbol: "−",
    activeBg:
      "bg-[#ffe4dc] dark:bg-[#3b2527] text-[#25283b] dark:text-[#ffb8a8]",
    symbolBg: "bg-[#ffad99] text-[#25283b]",
    symbolText: "text-[#25283b]",
  },
  "×": {
    symbol: "×",
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
    { id: "×", label: t("multiplication", undefined, language) },
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

      <div className="space-y-6">
        {/* Maximum number (1 - 6) */}
        <div>
          <label
            htmlFor="mathy-max-number"
            className="flex items-center justify-between text-xs font-bold tracking-wide mb-2.5 text-[#5e6075] dark:text-[#a3a6be]"
          >
            <span>{t("maxNumber", undefined, language)}</span>
            <span
              title={t("maxNumberTooltip", undefined, language)}
              className="text-[#858594] dark:text-[#7e829e] hover:text-[#25283b] dark:hover:text-[#f6f4ec] transition-colors cursor-help"
            >
              <HelpCircle className="w-4 h-4" />
            </span>
          </label>
          <input
            id="mathy-max-number"
            type="number"
            min={2}
            max={10000}
            value={settings.maxNumber}
            onChange={handleMaxNumberChange}
            className="w-full px-4 py-3.5 rounded-2xl bg-[#f7f4ea] dark:bg-[#272b44] text-[#25283b] dark:text-[#f6f4ec] font-mono text-base font-semibold tabular-nums focus:outline-none focus:bg-white dark:focus:bg-[#2d324f] focus:ring-3 focus:ring-[#ffd76a]/80 transition-all"
          />
        </div>

        {/* Number of operations */}
        <div>
          <label
            htmlFor="mathy-op-count"
            className="flex items-center justify-between text-xs font-bold tracking-wide mb-2.5 text-[#5e6075] dark:text-[#a3a6be]"
          >
            <span>{t("numOperations", undefined, language)}</span>
            <span
              title={t("numOperationsTooltip", undefined, language)}
              className="text-[#858594] dark:text-[#7e829e] hover:text-[#25283b] dark:hover:text-[#f6f4ec] transition-colors cursor-help"
            >
              <HelpCircle className="w-4 h-4" />
            </span>
          </label>
          <div className="relative">
            <select
              id="mathy-op-count"
              value={settings.operatorCount}
              onChange={handleOpCountChange}
              className="w-full appearance-none px-4 py-3.5 pr-10 rounded-2xl bg-[#f7f4ea] dark:bg-[#272b44] text-[#25283b] dark:text-[#f6f4ec] text-sm font-semibold focus:outline-none focus:bg-white dark:focus:bg-[#2d324f] focus:ring-3 focus:ring-[#ffd76a]/80 transition-all cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>
                  {n}{" "}
                  {n === 1
                    ? t("operation", undefined, language)
                    : t("operations", undefined, language)}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[#737589] dark:text-[#a3a6be] pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Operation types */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold tracking-wide mb-3 text-[#5e6075] dark:text-[#a3a6be]">
            <span>{t("operationTypes", undefined, language)}</span>
            <span
              title={t("operationTooltip", undefined, language)}
              className="text-[#858594] dark:text-[#7e829e] hover:text-[#25283b] dark:hover:text-[#f6f4ec] transition-colors cursor-help"
            >
              <HelpCircle className="w-4 h-4" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2.5">
            {operations.map((op) => {
              const isSelected = settings.selectedOperations.includes(op.id);
              const style = OPERATION_THEMES[op.id];
              const cleanName = op.label.replace(/\s*\([^)]*\)/, "");

              return (
                <label
                  key={op.id}
                  className={`group relative flex items-center justify-between gap-2.5 p-3 rounded-2xl cursor-pointer select-none transition-all duration-150 ${
                    isSelected
                      ? `${style.activeBg} shadow-[0_6px_16px_-8px_rgba(37,40,59,0.18)]`
                      : "bg-[#f7f4ea]/75 dark:bg-[#252942]/70 text-[#737589] dark:text-[#8f93ad] hover:bg-[#f1ede0] dark:hover:bg-[#2b304d]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleOperationToggle(op.id)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-display text-lg font-extrabold shrink-0 transition-transform duration-150 group-hover:scale-105 ${
                        isSelected
                          ? style.symbolBg
                          : "bg-[#e9e5d8] dark:bg-[#313654] text-[#737589] dark:text-[#a3a6be]"
                      }`}
                    >
                      {style.symbol}
                    </span>
                    <span className="text-sm font-semibold truncate">
                      {cleanName}
                    </span>
                  </div>

                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-opacity duration-150 ${
                      isSelected
                        ? "bg-[#25283b]/10 dark:bg-white/15 opacity-100"
                        : "opacity-0"
                    }`}
                    aria-hidden="true"
                  >
                    <Check className="w-3 h-3 stroke-3" />
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Start Practice button */}
        <motion.button
          type="button"
          onClick={onStartPractice}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.15 }}
          className="w-full min-h-13 py-3.5 px-5 rounded-2xl bg-[#FFD76A] hover:bg-[#FFC93C] text-[#25283B] font-display font-bold text-base shadow-[0_10px_24px_-8px_rgba(255,215,106,0.85)] dark:shadow-[0_10px_24px_-8px_rgba(255,215,106,0.35)] flex items-center justify-center gap-2.5 cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FFD76A]/50"
        >
          <Play className="w-4 h-4 fill-current shrink-0" />
          <span className="whitespace-nowrap">
            {isPracticing
              ? t("restartPractice", undefined, language)
              : t("startPractice", undefined, language)}
          </span>
        </motion.button>
      </div>
    </section>
  );
};
