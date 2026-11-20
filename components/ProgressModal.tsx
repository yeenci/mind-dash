import { Attempt, PracticeStats } from "@/types";
import { Language, t } from "@/utils/i18n";
import React from "react";
import { motion } from "motion/react";
import { BarChart3, X } from "lucide-react";

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  attempts: Attempt[];
  stats: PracticeStats;
  onViewAll: () => void;
  onHome: () => void;
  theme: "light" | "dark";
  language: Language;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  onClose,
  attempts,
  stats,
  onViewAll,
  onHome,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25283b]/45 dark:bg-black/65 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-4xl p-6 sm:p-8 rounded-4xl bg-[#fffdf6] dark:bg-[#1c1f33] text-[#25283b] dark:text-[#f6f4ec] shadow-[0_24px_64px_-16px_rgba(0,0,0,0.65)] max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#eaf6dc] text-[#245322] dark:bg-[#223629] dark:text-[#bce899] flex items-center justify-center shrink-0">
              <BarChart3 className="w=5 h-5" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-[#245322] dark:text-[#bce899]">
              {t("yourProgress", undefined, language)}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close", undefined, language)}
            className="w-10 h-10 rounded-2xl bg-[#f2efe5] dark:bg-[#272b44] hover:bg-[#e7e2d4] dark:hover:bg-[#313654] text-[#5e6075] dark:text-[#a3a6be] flex items-center justify-center cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffd76a]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
