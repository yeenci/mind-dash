import React from "react";

interface MathDoodlesProps {
  variant?: "page" | "card";
}

export const MathDoodles: React.FC<MathDoodlesProps> = ({
  variant = "page",
}) => {
  if (variant === "card") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute top-5 left-6 font-display text-3xl font-bold text-[#ffd76a]/45 dark:text-[#ffd76a]/15 -rotate-12">
          +
        </span>
        <span className="absolute top-8 right-8 font-display text-2xl font-bold text-[#b9a6f5]/45 dark:text-[#dcd0fa]/15 rotate-12">
          x
        </span>
        <span className="absolute bottom-6 left-10 font-display text-2xl font-bold text-[#89c8f0]/45 dark:text-[#c9e4f8]/15 rotate-6">
          ÷
        </span>
        <span className="absolute bottom-7 right-10 font-display text-3xl font-bold text-[#9ed670]/45 dark:text-[#c8e9a7]/15 -rotate-12">
          =
        </span>
      </div>
    );
  }
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
    >
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#ffd76a]/20 dark:bg-[#ffd76a]/5 blur-3xl" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#dcd0fa]/25 dark:bg-[#dcd0fa]/5 blur-3xl" />
      <div className="absolute -bottom-24 left-1/4 w-96 h-96 rounded-full bg-[#c8e9a7]/20 dark:bg-[#c8e9a7]/5 blur-3xl" />
      <div className="hidden lg:block absolute bottom-12 right-12 font-display text-5xl font-bold text-[#c9e4f8]/50 dark:text-[#c9e4f8]/10 rotate-12">
        ÷
      </div>
      <div className="hidden lg:block absolute top-28 left-8 font-display text-5xl font-bold text-[#ffd76a]/40 dark:text-[#ffd76a]/10 -rotate-12">
        +
      </div>
      <div className="hidden lg:block absolute bottom-24 left-12 font-display text-4xl font-bold text-[#dcd0fa]/50 dark:text-[#dcd0fa]/10 rotate-12">
        x
      </div>
      <div className="hidden lg:block absolute top-32 right-12 font-display text-4xl font-bold text-[#c8e9a7]/50 dark:text-[#c8e9a7]/10 -rotate-6">
        -
      </div>
    </div>
  );
};
