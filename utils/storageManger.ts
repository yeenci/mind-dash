import { Attempt, UserSettings } from "@/types";

const SETTINGS_KEY = "minddash_settings_v1";
const ATTEMPS_KEY = "minddash_attempts_v1";
const THEME_KEY = "minddash_theme_v1";

export const DEFAULT_SETTINGS: UserSettings = {
  maxNumber: 100,
  operatorCount: 6,
  selectedOperations: ["+", "-", "x", "÷"],
  storageMode: "persistent",
  retentionDays: 30,
  consentCompleted: false,
  lastActiveAt: new Date().toISOString(),
};

export function loadSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: UserSettings): void {
  try {
    localStorage.setItem(
      SETTINGS_KEY,
      JSON.stringify({
        ...settings,
        lastActiveAt: new Date().toISOString(),
      }),
    );
  } catch (err) {
    console.error("Failed to save settings:", err);
  }
}

export function loadAttempts(): Attempt[] {
  try {
    const raw = localStorage.getItem(ATTEMPS_KEY);
    if (!raw) return [];
    const attempts: Attempt[] = JSON.parse(raw);

    // 🪼 Check expiration on load
    const settings = loadSettings();
    const now = new Date().getTime();
    const lastActive = new Date(settings.lastActiveAt).getTime();

    let maxAgeMs = 30 * 24 * 60 * 60 * 1000; // default 30 days
    if (settings.storageMode === "temporary") {
      maxAgeMs = 24 * 60 * 60 * 1000; // 24 hours
    } else if (settings.retentionDays === 7) {
      maxAgeMs = 7 * 24 * 60 * 60 * 1000; // 7 days
    } else if (settings.retentionDays === 30) {
      maxAgeMs = 30 * 24 * 60 * 60 * 1000;
    }

    // 🪼 If inactive longer than retention period and temporary/expired
    if (now - lastActive > maxAgeMs && settings.storageMode === "temporary") {
      // 🪼 Clear attempts if expired
      localStorage.removeItem(ATTEMPS_KEY);
      return [];
    }

    return attempts;
  } catch {
    return [];
  }
}

export function saveAttempts(attempts: Attempt[]): void {
  try {
    localStorage.setItem(ATTEMPS_KEY, JSON.stringify(attempts));

    // 🪼 Update last active
    const settings = loadSettings();
    settings.lastActiveAt = new Date().toISOString();
    saveSettings(settings);
  } catch (err) {
    console.error("Failed to save attempts:", err);
  }
}

export function clearAllAttempts(): void {
  try {
    localStorage.removeItem(ATTEMPS_KEY);
  } catch (err) {
    console.error("Failed to clear attempts:", err);
  }
}

export function getTheme(): "light" | "dark" {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function setTheme(theme: "light" | "dark"): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    console.error("Failed to save theme:", err);
  }
}

export function exportAttemptsJson(attempts: Attempt[]): void {
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(attempts, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute(
    "download",
    `minddash_progress_${new Date().toISOString().slice(0, 10)}.json`,
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportAttemptsCsv(attempts: Attempt[]): void {
  const headers = [
    "Attempt ID",
    "Expression",
    "User Answer",
    "Correct Answer",
    "Result",
    "Time Spent (s)",
    "Incorrect Attempts",
    "Date",
  ];
  const rows = attempts.map((a, idx) => [
    idx + 1,
    `"${a.expression.replace(/"/g, '""')}"`,
    a.userAnswer,
    a.correctAnswer,
    a.result,
    a.timeSpentSeconds,
    a.incorrectAttemptsCount,
    `"${a.createdAt}"`,
  ]);
  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", encodedUri);
  downloadAnchor.setAttribute(
    "download",
    `minddash_progress_${new Date().toISOString().slice(0, 10)}.csv`,
  );
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
