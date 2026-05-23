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

  // ============================================================
  // ALL API ENDPOINTS (41 total) - Organized by Controller
  // ============================================================
  API: {
    // Auth endpoints (5)
    REGISTER: `${AUTH_API_BASE_URL}/api/Auth/register`,
    LOGIN: `${AUTH_API_BASE_URL}/api/Auth/login`,
    REFRESH_TOKEN: `${AUTH_API_BASE_URL}/api/Auth/refresh-token`,
    AUTHENTICATED: `${AUTH_API_BASE_URL}/api/Auth`,
    ADMIN_ONLY: `${AUTH_API_BASE_URL}/api/Auth/admin-only`,

    // ============================================================
    // ADMIN CONTROLLER (9 endpoints) - Requires Admin role
    // ============================================================
    ADMIN_STATS: `${API_BASE_URL}/api/admin/stats`,
    ADMIN_QUESTIONS: `${API_BASE_URL}/api/admin/questions`,
    ADMIN_QUESTION_CREATE: `${API_BASE_URL}/api/admin/questions/create`,
    ADMIN_QUESTION_UPDATE: `${API_BASE_URL}/api/admin/questions/:id`,
    ADMIN_QUESTION_DELETE: `${API_BASE_URL}/api/admin/questions/:id`,
    ADMIN_GROUPS: `${API_BASE_URL}/api/admin/groups`,
    ADMIN_USERS: `${API_BASE_URL}/api/admin/users`,
    ADMIN_ACTIVITY: `${API_BASE_URL}/api/admin/activity`,
    ADMIN_EXPORT_PDF: `${API_BASE_URL}/api/admin/export/pdf`,

    // ============================================================
    // FOLDER CONTROLLER (5 endpoints)
    // ============================================================
    FOLDER_CREATE: `${API_BASE_URL}/api/folder`,
    FOLDER_GET: `${API_BASE_URL}/api/folder/:groupId/folders/:folderId`,
    FOLDER_LIST: `${API_BASE_URL}/api/folder/:groupId/folders`,
    FOLDER_UPDATE: `${API_BASE_URL}/api/folder/question-groups/:groupId/folders/:folderId`,
    FOLDER_DELETE: `${API_BASE_URL}/api/folder/question-groups/:groupId/folders/:folderId`,

    // ============================================================
    // QUESTION GROUP CONTROLLER (4 endpoints)
    // ============================================================
    QUESTION_GROUP_GET: `${API_BASE_URL}/api/questiongroup/:id`,
    QUESTION_GROUP_CREATE: `${API_BASE_URL}/api/questiongroup`,
    QUESTION_GROUP_UPDATE: `${API_BASE_URL}/api/questiongroup/:id`,
    QUESTION_GROUP_DELETE: `${API_BASE_URL}/api/questiongroup/:id`,

    // ============================================================
    // QUESTION CONTROLLER (5 endpoints)
    // ============================================================
    QUESTION_CREATE: `${API_BASE_URL}/api/question/Create`,
    QUESTION_UPDATE: `${API_BASE_URL}/api/question/Update`,
    QUESTION_SUBMIT: `${API_BASE_URL}/api/question/Submit`,
    QUESTION_GET: `${API_BASE_URL}/api/question/:id`,
    QUESTION_DELETE: `${API_BASE_URL}/api/question/:id`,

    // ============================================================
    // QUIZ ATTEMPT CONTROLLER (5 endpoints)
    // ============================================================
    QUIZ_START: `${API_BASE_URL}/api/quizzes/:id/start`,
    QUIZ_SUBMIT: `${API_BASE_URL}/api/quizzes/:id/submit`,
    QUIZ_RESULTS: `${API_BASE_URL}/api/quizzes/:id/results`,
    QUIZ_MY_ATTEMPTS: `${API_BASE_URL}/api/quizzes/my-attempts`,
    QUIZ_GET_ATTEMPT: `${API_BASE_URL}/api/quizzes/:attemptId`,

    // ============================================================
    // ANSWERS CONTROLLER (1 endpoint)
    // ============================================================
    ANSWER_SUBMIT: `${API_BASE_URL}/api/answers`,

    // ============================================================
    // QUESTION OPTIONS CONTROLLER (2 endpoints)
    // ============================================================
    QUESTION_OPTIONS_ADD: `${API_BASE_URL}/api/questionoptions/:questionId`,
    QUESTION_OPTIONS_DELETE: `${API_BASE_URL}/api/questionoptions`,

    // ============================================================
    // SECURED FOLDER CONTROLLER (3 endpoints)
    // ============================================================
    SECURED_FOLDER_GET: `${API_BASE_URL}/api/question-groups/:groupId/folders/:folderId`,
    SECURED_FOLDER_CREATE: `${API_BASE_URL}/api/question-groups/:groupId/folders`,
    SECURED_FOLDER_UPDATE: `${API_BASE_URL}/api/question-groups/:groupId/folders/:folderId`,

    // ============================================================
    // SECURED QUESTION CONTROLLER (4 endpoints)
    // ============================================================
    SECURED_QUESTION_CREATE: `${API_BASE_URL}/api/folders/:folderId/questions`,
    SECURED_QUESTION_GET: `${API_BASE_URL}/api/folders/:folderId/questions/:questionId`,
    SECURED_QUESTION_UPDATE: `${API_BASE_URL}/api/folders/:folderId/questions/:questionId`,
    SECURED_QUESTION_DELETE: `${API_BASE_URL}/api/folders/:folderId/questions/:questionId`,

    // ============================================================
    // STUDENT CONTROLLER (3 endpoints) - Requires Viewer role
    // ============================================================
    STUDENT_STATS: `${API_BASE_URL}/api/student/stats`,
    STUDENT_HISTORY: `${API_BASE_URL}/api/student/history`,
    STUDENT_QUESTION_GROUPS: `${API_BASE_URL}/api/student/question-groups`,
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


