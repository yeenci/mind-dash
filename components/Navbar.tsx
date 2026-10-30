import { UserSettings } from "@/types";

interface NavbarProps {
    onOpenProgress: () => void;
    onOpenSetting: () => void;
    onHome: () => void;
    onExport: () => void;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
    settings: UserSettings;
    language: Language;
}