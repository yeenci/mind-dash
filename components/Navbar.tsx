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
    <></>
  )
}