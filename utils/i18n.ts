export type Language = "en" | "vi";

const translations = {
  en: {
    appName: "MindDash",
    home: "Home",
    progress: "Progress",
    settings: "Settings",
    export: "Export",
    practiceSetup: "Practice Setup",
    maxNumber: "Maximum number",
    maxNumberTooltip:
      "All individual operands will be within 1 and this number",
    numOperations: "Number of operations",
    numOperationsTooltip: "Number of operators in each generated expression",
    operationTypes: "Operation types",
    operationTooltip: "Select which operations to include",
    addition: "Addition (+)",
    subtraction: "Subtraction (-)",
    multiplication: "Multiplication (x)",
    division: "Division (÷)",
    startPractice: "Start Practice",
    restartPractice: "Restart Practice",
    readyToPractice: "Ready to practice?",
    readyDescription:
      "Configure your preferred settings in the sidebar and click Start Practice to begin your mental math session.",
    enterAnswerPlaceholder: "Enter your answer...",
    submit: "Submit",
    giveUp: "Give Up",
    nextExercise: "Next Exercise",
    timeLimit: "(5:00 limit)",
    timesUp: "Time's up! The correct answer was",
    correctMsg: "Correct! Solved in",
    notQuite: "Not quite! Try again.",
    givenUpMsg: "Given up. The correct answer was",
    timeSpent: "Time spent",
    incorrectAttempts: "Incorrect attempts",
    pressEnterToContinue: "Press Enter to continue",
    smallSteps: "Small steps. Big progress.",
    // Modals
    yourProgress: "Your Progress",
    totalAttempts: "Total attempts",
    correct: "Correct",
    accuracy: "accuracy",
    givenUp: "Given Up",
    timedOut: "Timed Out",
    avgTime: "Avg. time",
    fastest: "Fastest",
    totalPracticeTime: "Total practice time",
    recentAttempts: "Recent Attempts",
    viewAll: "View all",
    close: "Close",
    noHistory: "No practice history yet",
    noHistoryDesc: "Your progress will appear here once you start practicing.",
    // Settings
    storagePrivacy: "Storage & Privacy",
    progressStorage: "Progress storage",
    progressStorageDesc: "Save your practice history on this device.",
    retentionPeriod: "Retention period",
    retentionDesc:
      "Your data will be kept for {days} days after your last activity.",
    storageStatus: "Storage status",
    active: "Active",
    exportProgress: "Export progress",
    exportDesc: "Download your practice history (JSON/CSV)",
    clearProgress: "Clear all progress",
    clearDesc: "Permanently delete all stored data",
    clearPrompt: "Are you sure? This action cannot be undone.",
    cancel: "Cancel",
    yesDeleteEverything: "Yes, Delete Everything",
    temporary: "Temporary",
    persistent: "Persistent",
    // Consent Modal
    saveYourProgress: "Save your progress?",
    saveConsentDesc:
      "Your practice history can be saved locally on this device, so you can track your improvement over time.",
    dataStaysDevice: "Your Data Stays on Your Device",
    dataStaysDesc:
      "No account required. Your practice history is stored locally and is not uploaded to a server.",
    autoExpiration: "Automatic expiration",
    autoExpirationDesc:
      "Saved progress expires after your selected retention period.",
    yesSaveMyProgress: "Yes, save my progress",
    noKeepTemporarily: "No, keep it temporarily",
    changeSettingAnytime: "You can change this setting anytime.",
    // Give up modal
    giveUpTitle: "Give up on this exercise?",
    giveUpDesc:
      "Are you sure you want to give up? The correct answer will be revealed and this attempt will be recorded as given up.",
    keepTrying: "Keep Trying",
    // History Modal
    fullHistory: "Full Practice History",
    showingAll: "Showing all recorded calculation exercises ({count} total)",
    searchExpressions: "Search expressions...",
    userAnswer: "User Answer",
    correctAnswer: "Correct Answer",
    result: "Result",
    timeSpentCol: "Time Spent",
    incorrectTries: "Incorrect Tries",
    date: "Date",
    noMatchingRecords: "No matching practice records found.",
  },
  vi: {
    appName: "MindDash",
    home: "Trang chủ",
    progress: "Tiến độ",
    settings: "Cài đặt",
    export: "Xuất dữ liệu",
    practiceSetup: "Cài đặt luyện tập",
    maxNumber: "Số tối đa",
    maxNumberTooltip: "Tất cả các toán hạng nằm trong khoảng từ 1 đến số này",
    numOperations: "Số phép tính",
    numOperationsTooltip: "Số lượng toán tử trong mỗi biểu thức",
    operationTypes: "Loại phép tính",
    operationTooltip: "Chọn các phép tính muốn luyện tập",
    addition: "Cộng (+)",
    subtraction: "Trừ (-)",
    multiplication: "Nhân (x)",
    division: "Chia (÷)",
    startPractice: "Bắt đầu luyện tập",
    restartPractice: "Làm lại",
    readyToPractice: "Sẵn sàng luyện tập?",
    readyDescription:
      "Cấu hình tùy chọn ở thanh bên và nhấn Bắt đầu luyện tập để bắt đầu phiên tính nhẩm.",
    enterAnswerPlaceholder: "Nhập kết quả của bạn...",
    submit: "Nộp bài",
    giveUp: "Bỏ cuộc",
    nextExercise: "Bài tiếp theo",
    timeLimit: "(giới hạn 5:00)",
    timesUp: "Hết giờ! Đáp án đúng là",
    correctMsg: "Chính xác! Hoàn thành trong",
    notQuite: "Chưa chính xác! Hãy thử lại.",
    given_up: "Đã bỏ cuộc. Đáp án đúng là",
    givenUpMsg: "Đã bỏ cuộc. Đáp án đúng là",
    timeSpent: "Thời gian",
    incorrectAttempts: "Số lần sai",
    pressEnterToContinue: "Nhấn Enter để tiếp tục",
    smallSteps: "Bước nhỏ. Tiến bộ lớn.",
    // Modals
    yourProgress: "Tiến độ của bạn",
    totalAttempts: "Tổng số lần",
    correct: "Đúng",
    accuracy: "độ chính xác",
    givenUp: "Bỏ cuộc",
    timedOut: "Hết giờ",
    avgTime: "Thời gian TB",
    fastest: "Nhanh nhất",
    totalPracticeTime: "Tổng TG luyện tập",
    recentAttempts: "Các lần gần đây",
    viewAll: "Xem tất cả",
    close: "Đóng",
    noHistory: "Chưa có lịch sử luyện tập",
    noHistoryDesc:
      "Tiến độ của bạn sẽ hiển thị ở đây sau khi bạn bắt đầu luyện tập.",
    // Settings
    storagePrivacy: "Lưu trữ & Quyền riêng tư",
    progressStorage: "Lưu trữ tiến độ",
    progressStorageDesc: "Lưu lịch sử luyện tập trên thiết bị này.",
    retentionPeriod: "Thời gian lưu trữ",
    retentionDesc:
      "Dữ liệu sẽ được giữ trong {days} ngày kể từ hoạt động gần nhất.",
    storageStatus: "Trạng thái lưu trữ",
    active: "Đang hoạt động",
    exportProgress: "Xuất tiến độ",
    exportDesc: "Tải xuống lịch sử luyện tập (JSON/CSV)",
    clearProgress: "Xóa toàn bộ tiến độ",
    clearDesc: "Xóa vĩnh viễn tất cả dữ liệu đã lưu",
    clearPrompt: "Bạn có chắc chắn không? Hành động này không thể hoàn tác.",
    cancel: "Hủy",
    yesDeleteEverything: "Có, xóa tất cả",
    temporary: "Tạm thời",
    persistent: "Lâu dài",
    // Consent Modal
    saveYourProgress: "Lưu tiến độ của bạn?",
    saveConsentDesc:
      "Lịch sử luyện tập có thể được lưu cục bộ trên thiết bị này để bạn theo dõi sự tiến bộ theo thời gian.",
    dataStaysDevice: "Dữ liệu ở trên thiết bị của bạn",
    dataStaysDesc:
      "Không cần tài khoản. Lịch sử được lưu cục bộ và không tải lên máy chủ.",
    autoExpiration: "Tự động hết hạn",
    autoExpirationDesc:
      "Tiến độ đã lưu sẽ hết hạn sau thời gian lưu trữ bạn chọn.",
    yesSaveMyProgress: "Có, lưu tiến độ",
    noKeepTemporarily: "Không, chỉ lưu tạm thời",
    changeSettingAnytime: "Bạn có thể thay đổi cài đặt này bất cứ lúc nào.",
    // Give up modal
    giveUpTitle: "Bỏ cuộc ở bài tập này?",
    giveUpDesc:
      "Bạn có chắc chắn muốn bỏ cuộc? Đáp án đúng sẽ được hiển thị và lần thử này được ghi nhận là bỏ cuộc.",
    keepTrying: "Tiếp tục thử",
    // History Modal
    fullHistory: "Lịch sử luyện tập đầy đủ",
    showingAll: "Hiển thị tất cả các bài tập đã làm (tổng {count})",
    searchExpressions: "Tìm kiếm biểu thức...",
    userAnswer: "Trả lời",
    correctAnswer: "Đáp án đúng",
    result: "Kết quả",
    timeSpentCol: "Thời gian",
    incorrectTries: "Số lần sai",
    date: "Ngày giờ",
    noMatchingRecords: "Không tìm thấy bản ghi phù hợp.",
  },
};

const LANGUAGE_KEY = "minddash_lang_v1";

export function getLanguage(): Language {
  try {
    const l = localStorage.getItem(LANGUAGE_KEY);
    return l === "vi" ? "vi" : "en";
  } catch {
    return "en";
  }
}

export function setLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch (err) {
    console.error("Failed to save language:", err);
  }
}

export function t(
  key: keyof (typeof translations)["en"],
  params?: Record<string, string | number>,
  lang: Language = getLanguage(),
): string {
  const dict = translations[lang] || translations.en;
  let text = dict[key] || translations.en[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp(`{${k}`, "g"), String(v));
    });
  }
  return text;
}
