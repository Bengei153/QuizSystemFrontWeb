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
};

export default api;
