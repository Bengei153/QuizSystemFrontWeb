import { CONFIG } from "./config";
import {
  apiCall,
  buildUserFromAuthResponse,
  buildUserFromToken,
  clearStoredAuth,
  storeAuthSession,
  updateStoredUser,
} from "./utils";

function resolveEndpoint(endpoint) {
  if (/^https?:\/\//i.test(endpoint)) {
    return endpoint;
  }

  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${CONFIG.API_BASE_URL}${normalizedEndpoint}`;
}

function request(endpoint, method, body = null, options = {}) {
  return apiCall(resolveEndpoint(endpoint), method, body, options.skipAuth);
}

export function register(username, password, email, organisation, role = "Viewer") {
  return request(
    CONFIG.API.REGISTER,
    "POST",
    { username, password, email, organisation, role },
    { skipAuth: true }
  );
}

export function login(username, password) {
  return request(
    CONFIG.API.LOGIN,
    "POST",
    { username, password },
    { skipAuth: true }
  );
}

export function authenticatedRequest(endpoint, options = {}) {
  return request(endpoint, options.method || "GET", options.body ?? null, options);
}

export function getAuthenticatedUser() {
  return authenticatedRequest(CONFIG.API.AUTHENTICATED);
}

export function getAdminOnlyData() {
  return authenticatedRequest(CONFIG.API.ADMIN_ONLY);
}

export async function checkAdminAccess() {
  try {
    await getAdminOnlyData();
    return true;
  } catch (error) {
    if (error?.status === 401 || error?.status === 403) {
      return false;
    }

    throw error;
  }
}

export async function resolveAuthenticatedUser(fallback = {}) {
  const authData = await getAuthenticatedUser();
  const directUser = buildUserFromAuthResponse(authData);

  if (directUser.role) {
    return buildUserFromAuthResponse(authData, fallback);
  }

  const isAdmin = await checkAdminAccess();

  return buildUserFromAuthResponse(authData, {
    ...fallback,
    role: isAdmin ? "admin" : fallback.role || "viewer",
  });
}

export async function createAuthenticatedSession({
  username,
  password,
  remember = true,
}) {
  const authData = await login(username, password);
  const accessToken = authData?.accessToken || authData?.AccessToken;
  const refreshToken = authData?.refreshToken || authData?.RefreshToken || null;

  if (!accessToken) {
    throw new Error("Authentication token was not returned by the server.");
  }

  const provisionalUser = buildUserFromToken(accessToken, {
    username,
    role: "viewer",
  });

  storeAuthSession({
    accessToken,
    refreshToken,
    user: provisionalUser,
    remember,
  });

  try {
    const user = await resolveAuthenticatedUser({
      username,
      role: provisionalUser.role || "viewer",
    });

    updateStoredUser(user);

    return {
      accessToken,
      refreshToken,
      user,
    };
  } catch (error) {
    clearStoredAuth();
    throw error;
  }
}

const api = {
  // Auth methods
  register,
  login,
  authenticatedRequest,
  getAuthenticatedUser,
  getAdminOnlyData,
  checkAdminAccess,
  resolveAuthenticatedUser,
  createAuthenticatedSession,
  request: authenticatedRequest,
  get: (endpoint, options = {}) =>
    authenticatedRequest(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options = {}) =>
    authenticatedRequest(endpoint, { ...options, method: "POST", body }),
  put: (endpoint, body, options = {}) =>
    authenticatedRequest(endpoint, { ...options, method: "PUT", body }),
  patch: (endpoint, body, options = {}) =>
    authenticatedRequest(endpoint, { ...options, method: "PATCH", body }),
  delete: (endpoint, options = {}) =>
    authenticatedRequest(endpoint, { ...options, method: "DELETE" }),

  // ============================================================
  // ADMIN CONTROLLER (9 endpoints)
  // ============================================================
  admin: {
    getStats: () => request(CONFIG.API.ADMIN_STATS, "GET"),
    getAllQuestions: () => request(CONFIG.API.ADMIN_QUESTIONS, "GET"),
    createQuestion: (data) => request(CONFIG.API.ADMIN_QUESTION_CREATE, "POST", data),
    updateQuestion: (id, data) => request(CONFIG.API.ADMIN_QUESTION_UPDATE.replace(":id", id), "PUT", data),
    deleteQuestion: (id) => request(CONFIG.API.ADMIN_QUESTION_DELETE.replace(":id", id), "DELETE"),
    getAllGroups: () => request(CONFIG.API.ADMIN_GROUPS, "GET"),
    getAllUsers: () => request(CONFIG.API.ADMIN_USERS, "GET"),
    getActivityLog: () => request(CONFIG.API.ADMIN_ACTIVITY, "GET"),
    exportPDF: (data) => request(CONFIG.API.ADMIN_EXPORT_PDF, "POST", data),
  },

  // ============================================================
  // FOLDER CONTROLLER (5 endpoints)
  // ============================================================
  folder: {
    create: (data) => request(CONFIG.API.FOLDER_CREATE, "POST", data),
    getFolder: (groupId, folderId) => request(CONFIG.API.FOLDER_GET.replace(":groupId", groupId).replace(":folderId", folderId), "GET"),
    listFolders: (groupId) => request(CONFIG.API.FOLDER_LIST.replace(":groupId", groupId), "GET"),
    update: (groupId, folderId, data) => request(CONFIG.API.FOLDER_UPDATE.replace(":groupId", groupId).replace(":folderId", folderId), "PUT", data),
    delete: (groupId, folderId) => request(CONFIG.API.FOLDER_DELETE.replace(":groupId", groupId).replace(":folderId", folderId), "DELETE"),
  },

  // ============================================================
  // QUESTION GROUP CONTROLLER (4 endpoints)
  // ============================================================
  questionGroup: {
    get: (id) => request(CONFIG.API.QUESTION_GROUP_GET.replace(":id", id), "GET"),
    create: (data) => request(CONFIG.API.QUESTION_GROUP_CREATE, "POST", data),
    update: (id, data) => request(CONFIG.API.QUESTION_GROUP_UPDATE.replace(":id", id), "PUT", data),
    delete: (id) => request(CONFIG.API.QUESTION_GROUP_DELETE.replace(":id", id), "DELETE"),
  },

  // ============================================================
  // QUESTION CONTROLLER (5 endpoints)
  // ============================================================
  question: {
    create: (data) => request(CONFIG.API.QUESTION_CREATE, "POST", data),
    update: (data) => request(CONFIG.API.QUESTION_UPDATE, "PUT", data),
    submit: (data) => request(CONFIG.API.QUESTION_SUBMIT, "POST", data),
    get: (id) => request(CONFIG.API.QUESTION_GET.replace(":id", id), "GET"),
    delete: (id) => request(CONFIG.API.QUESTION_DELETE.replace(":id", id), "DELETE"),
  },

  // ============================================================
  // QUIZ ATTEMPT CONTROLLER (5 endpoints)
  // ============================================================
  quiz: {
    start: (id) => request(CONFIG.API.QUIZ_START.replace(":id", id), "POST"),
    submit: (id, data) => request(CONFIG.API.QUIZ_SUBMIT.replace(":id", id), "POST", data),
    getResults: (id) => request(CONFIG.API.QUIZ_RESULTS.replace(":id", id), "GET"),
    getMyAttempts: () => request(CONFIG.API.QUIZ_MY_ATTEMPTS, "GET"),
    getAttempt: (attemptId) => request(CONFIG.API.QUIZ_GET_ATTEMPT.replace(":attemptId", attemptId), "GET"),
  },

  // ============================================================
  // ANSWERS CONTROLLER (1 endpoint)
  // ============================================================
  answers: {
    submit: (data) => request(CONFIG.API.ANSWER_SUBMIT, "POST", data),
  },

  // ============================================================
  // QUESTION OPTIONS CONTROLLER (2 endpoints)
  // ============================================================
  questionOptions: {
    add: (questionId, data) => request(CONFIG.API.QUESTION_OPTIONS_ADD.replace(":questionId", questionId), "POST", data),
    delete: (data) => request(CONFIG.API.QUESTION_OPTIONS_DELETE, "DELETE", data),
  },

  // ============================================================
  // SECURED FOLDER CONTROLLER (3 endpoints)
  // ============================================================
  securedFolder: {
    get: (groupId, folderId) => request(CONFIG.API.SECURED_FOLDER_GET.replace(":groupId", groupId).replace(":folderId", folderId), "GET"),
    create: (groupId, data) => request(CONFIG.API.SECURED_FOLDER_CREATE.replace(":groupId", groupId), "POST", data),
    update: (groupId, folderId, data) => request(CONFIG.API.SECURED_FOLDER_UPDATE.replace(":groupId", groupId).replace(":folderId", folderId), "PUT", data),
  },

  // ============================================================
  // SECURED QUESTION CONTROLLER (4 endpoints)
  // ============================================================
  securedQuestion: {
    create: (folderId, data) => request(CONFIG.API.SECURED_QUESTION_CREATE.replace(":folderId", folderId), "POST", data),
    get: (folderId, questionId) => request(CONFIG.API.SECURED_QUESTION_GET.replace(":folderId", folderId).replace(":questionId", questionId), "GET"),
    update: (folderId, questionId, data) => request(CONFIG.API.SECURED_QUESTION_UPDATE.replace(":folderId", folderId).replace(":questionId", questionId), "PUT", data),
    delete: (folderId, questionId) => request(CONFIG.API.SECURED_QUESTION_DELETE.replace(":folderId", folderId).replace(":questionId", questionId), "DELETE"),
  },

  // ============================================================
  // STUDENT CONTROLLER (3 endpoints)
  // ============================================================
  student: {
    getStats: () => request(CONFIG.API.STUDENT_STATS, "GET"),
    getHistory: () => request(CONFIG.API.STUDENT_HISTORY, "GET"),
    getQuestionGroups: () => request(CONFIG.API.STUDENT_QUESTION_GROUPS, "GET"),
  },
};

export default api;
