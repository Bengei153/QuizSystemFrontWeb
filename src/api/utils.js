import { CONFIG } from "./config";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_STORAGE_KEY = "user";
const LEGACY_ACCESS_TOKEN_KEY = "Token";
const LEGACY_REFRESH_TOKEN_KEY = "RefreshToken";

// ============================================================
// API HELPER - wraps fetch with JSON handling
// Usage: apiCall("/endpoint", "POST", { username, password })
// ============================================================
export async function apiCall(endpoint, method = "GET", body = null, skipAuth = false) {
  try {
    return await performRequest(endpoint, method, body, skipAuth);
  } catch (error) {
    if (skipAuth || error?.status !== 401) {
      throw error;
    }

    const refreshToken = getStoredRefreshToken();

    if (!refreshToken) {
      clearStoredAuth();
      throw error;
    }

    try {
      await refreshStoredSession();
    } catch (refreshError) {
      clearStoredAuth();
      throw refreshError;
    }

    return performRequest(endpoint, method, body, skipAuth);
  }
}

export function getStoredToken() {
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    localStorage.getItem(LEGACY_ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(LEGACY_ACCESS_TOKEN_KEY)
  );
}

export function getStoredRefreshToken() {
  return (
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    localStorage.getItem(LEGACY_REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(LEGACY_REFRESH_TOKEN_KEY)
  );
}

export function getStoredUser() {
  const rawUser =
    localStorage.getItem(USER_STORAGE_KEY) || sessionStorage.getItem(USER_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
}

export function clearStoredAuth() {
  clearAuthBucket(localStorage);
  clearAuthBucket(sessionStorage);
}

export function storeAuthSession({ accessToken, refreshToken, user, remember }) {
  const storage = remember ? localStorage : sessionStorage;
  const otherStorage = remember ? sessionStorage : localStorage;

  clearAuthBucket(otherStorage);
  setStoredTokens(storage, accessToken, refreshToken);
  updateStoredUser(user, storage);
}

export function updateStoredTokens({ accessToken, refreshToken }) {
  setStoredTokens(getActiveStorage(), accessToken, refreshToken);
}

export function updateStoredUser(user, storage = getActiveStorage()) {
  if (!user) {
    storage.removeItem(USER_STORAGE_KEY);
    return;
  }

  storage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

export async function refreshStoredSession() {
  const refreshToken = getStoredRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  const response = await performRequest(
    `${CONFIG.API_BASE_URL}${CONFIG.API.REFRESH_TOKEN}`,
    "POST",
    { refreshToken },
    true,
    null
  );

  if (!response?.accessToken) {
    throw new Error("A new access token was not returned by the server.");
  }

  updateStoredTokens({
    accessToken: response.accessToken,
    refreshToken: response.refreshToken ?? refreshToken,
  });

  return response;
}

function normalizeRole(...candidates) {
  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      const normalized = candidate.trim().toLowerCase();

      if (normalized.includes("admin")) {
        return "admin";
      }

      if (["viewer", "user", "student", "member"].includes(normalized)) {
        return "viewer";
      }

      return normalized;
    }
  }

  return "";
}

export function getAppRole(role) {
  if (!role) {
    return "";
  }

  return role === "admin" ? "admin" : "viewer";
}

export function buildUserFromAuthResponse(data, fallback = {}) {
  const user =
    data?.user ||
    data?.User ||
    data?.profile ||
    data?.Profile ||
    data?.data?.user ||
    null;

  const role = normalizeRole(
    user?.role,
    user?.Role,
    user?.userRole,
    user?.roles?.[0],
    user?.isAdmin === true ? "admin" : "",
    data?.role,
    data?.Role,
    data?.userRole,
    data?.roles?.[0],
    data?.isAdmin === true ? "admin" : "",
    fallback.role
  );

  return {
    id: user?.id || user?.Id || data?.userId || data?.id || "",
    username:
      user?.username ||
      user?.userName ||
      user?.name ||
      user?.fullName ||
      data?.username ||
      data?.userName ||
      data?.name ||
      fallback.username ||
      "",
    email: user?.email || data?.email || fallback.email || "",
    role,
    organisation:
      user?.organisation ||
      user?.organization ||
      user?.organisationId ||
      data?.organisation ||
      data?.organization ||
      data?.organisationId ||
      fallback.organisation ||
      "",
  };
}

// Returns initials from a full name, e.g. "John Doe" -> "JD"
export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Returns a Tailwind-style class name based on quiz score
export function scoreColorClass(score) {
  if (score >= 80) return "score-high";
  if (score >= 60) return "score-mid";
  return "score-low";
}

// Capitalizes the first letter of a string
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Formats seconds into MM:SS
export function formatTime(seconds) {
  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

async function performRequest(
  endpoint,
  method,
  body = null,
  skipAuth = false,
  token = getStoredToken()
) {
  const headers = { "Content-Type": "application/json" };

  if (token && !skipAuth) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    method,
    headers,
    body: body === null ? undefined : JSON.stringify(body),
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw createHttpError(response.status, data);
  }

  return data;
}

function createHttpError(status, data) {
  const message =
    data?.message ||
    data?.error ||
    `Request failed with status ${status}`;
  const error = new Error(message);

  error.status = status;
  error.data = data;

  return error;
}

function getActiveStorage() {
  if (
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    localStorage.getItem(LEGACY_ACCESS_TOKEN_KEY)
  ) {
    return localStorage;
  }

  if (
    sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(LEGACY_ACCESS_TOKEN_KEY)
  ) {
    return sessionStorage;
  }

  return localStorage;
}

function clearAuthBucket(storage) {
  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(REFRESH_TOKEN_KEY);
  storage.removeItem(USER_STORAGE_KEY);
  storage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  storage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
}

function setStoredTokens(storage, accessToken, refreshToken) {
  if (accessToken) {
    storage.setItem(ACCESS_TOKEN_KEY, accessToken);
    storage.setItem(LEGACY_ACCESS_TOKEN_KEY, accessToken);
  } else {
    storage.removeItem(ACCESS_TOKEN_KEY);
    storage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  }

  if (refreshToken) {
    storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    storage.setItem(LEGACY_REFRESH_TOKEN_KEY, refreshToken);
  } else {
    storage.removeItem(REFRESH_TOKEN_KEY);
    storage.removeItem(LEGACY_REFRESH_TOKEN_KEY);
  }
}
