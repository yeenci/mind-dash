import { Language } from "@/utils/i18n";

interface GiveUpModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  theme: "light" | "dark";
  language: Language;
}

export const GiveUpModal: React.FC<GiveUpModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  language,
}) => {};
