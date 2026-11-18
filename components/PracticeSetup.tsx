import { UserSettings } from "@/types";
import { Language } from "@/utils/i18n";

interface PracticeSetupProps {
    settings: UserSettings
    onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
    onStartPractice: () => void;
    theme: 'light' | 'dark'
    isPracticing: boolean;
    language: Language;
}

export const PracticeSetup: React.FC<PracticeSetupProps> = ({
    settings,
    onUpdateSettings,
    onStartPractice,
    theme,
    isPracticing,
    language
}) => {
    return (
        <div>
            PracticeSetup Area
        </div>
    )
}