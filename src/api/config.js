const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const AUTH_API_BASE_URL =
  import.meta.env.VITE_AUTH_API_BASE_URL || "https://organisationalauth.onrender.com";

// ============================================================
// CONFIG — Edit API endpoints and app settings here
// ============================================================
export const CONFIG = {
  APP_NAME: "QuizWiz",
  APP_TAGLINE: "Master any subject with interactive learning.",
  APP_SUBTEXT:
    "Join 50,000+ students and professionals using QuizWiz to sharpen their skills and track their progress effortlessly.",
  API_BASE_URL,
  AUTH_API_BASE_URL,

  // Auth endpoints
  API: {
    REGISTER: `${AUTH_API_BASE_URL}/api/Auth/register`,
    LOGIN: `${AUTH_API_BASE_URL}/api/Auth/login`,
    REFRESH_TOKEN: `${AUTH_API_BASE_URL}/api/Auth/refresh-token`,
    AUTHENTICATED: `${AUTH_API_BASE_URL}/api/Auth`,
    ADMIN_ONLY: `${AUTH_API_BASE_URL}/api/Auth/admin-only`,

    // Student endpoints
    DASHBOARD_STATS: "https://quizwebapp-dp64.onrender.com/api/student/stats",
    CATEGORIES: "https://quizwebapp-dp64.onrender.com/api/categories",
    RECOMMENDED_QUIZZES: "https://quizwebapp-dp64.onrender.com/api/student/recommended",
    QUIZ_HISTORY: "https://quizwebapp-dp64.onrender.com/api/student/history",
    QUIZ_START: "https://quizwebapp-dp64.onrender.com/api/quizzes/:id/start",
    QUIZ_SUBMIT: "https://quizwebapp-dp64.onrender.com/api/quizzes/:id/submit",
    QUIZ_RESULTS: "https://quizwebapp-dp64.onrender.com/api/quizzes/:id/results",

    // Admin endpoints
    ADMIN_STATS: "https://quizwebapp-dp64.onrender.com/api/admin/stats",
    ADMIN_QUESTIONS: "https://quizwebapp-dp64.onrender.com/api/admin/questions",
    ADMIN_QUESTION_CREATE: "https://quizwebapp-dp64.onrender.com/api/admin/questions/create",
    ADMIN_QUESTION_UPDATE: "https://quizwebapp-dp64.onrender.com/api/admin/questions/:id",
    ADMIN_QUESTION_DELETE: "https://quizwebapp-dp64.onrender.com/api/admin/questions/:id",
    ADMIN_GROUPS: "https://quizwebapp-dp64.onrender.com/api/admin/groups",
    ADMIN_USERS: "https://quizwebapp-dp64.onrender.com/api/admin/users",
    ADMIN_ACTIVITY: "https://quizwebapp-dp64.onrender.com/api/admin/activity",
    ADMIN_EXPORT_PDF: "https://quizwebapp-dp64.onrender.com/api/admin/export/pdf",
    ADMIN_EXPORT_CSV: "https://quizwebapp-dp64.onrender.com/api/admin/export/csv",
  },

  // Demo / mock data toggle — set to false to use real API
  USE_MOCK_DATA: false,

  // Roles shown in auth forms
  AUTH_ROLES: ["Viewer", "Admin"],

  // Pagination
  QUESTIONS_PER_PAGE: 5,
  HISTORY_PER_PAGE: 6,

  // Quiz timer (seconds)
  QUIZ_TIME_LIMIT: 60,

  // Student stats (mock values shown when USE_MOCK_DATA is true)
  STUDENT: {
    NAME: "Felix",
    QUIZZES_TAKEN: 24,
    AVG_SCORE: 88,
    LEARNING_HOURS: "14.5h",
    GLOBAL_RANK: "#1,240",
    TOPICS_THIS_MONTH: 12,
  },

  // Admin stats (mock values shown when USE_MOCK_DATA is true)
  ADMIN: {
    NAME: "Admin User",
    ROLE: "Manager",
    TOTAL_QUESTIONS: 1248,
    TOTAL_USERS: 8592,
    QUIZ_ATTEMPTS: "24.5k",
    AVG_SCORE: "78.4%",
  },
};

// ============================================================
// THEME — Colors used across the app
// ============================================================
export const theme = {
  purple: "#5B5FED",
  purpleDark: "#4547C7",
  purpleLight: "#E8E9FF",
  accent: "#00D4A4",
  text: "#1a1a2e",
  textMuted: "#6b7280",
  border: "#e5e7eb",
  bg: "#f8f9fc",
  white: "#ffffff",
  danger: "#ef4444",
  success: "#10b981",
  warning: "#f59e0b",
};


