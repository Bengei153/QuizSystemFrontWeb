/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import {
  clearStoredAuth,
  getStoredToken,
  getStoredUser,
  storeAuthSession,
  updateStoredUser,
} from "../api/utils";
import { resolveAuthenticatedUser } from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(getStoredUser());
  const [isLoading, setIsLoading] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    let isCancelled = false;

    const restoreSession = async () => {
      const storedToken = getStoredToken();

      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const resolvedUser = await resolveAuthenticatedUser(getStoredUser() || {});

        if (isCancelled) {
          return;
        }

        updateStoredUser(resolvedUser);
        setToken(getStoredToken());
        setUser(resolvedUser);
      } catch {
        clearStoredAuth();

        if (isCancelled) {
          return;
        }

        setToken(null);
        setUser(null);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isCancelled = true;
    };
  }, []);

  const login = (newToken, newUser, remember = true, refreshToken = null) => {
    storeAuthSession({
      accessToken: newToken,
      refreshToken,
      user: newUser,
      remember,
    });

    setToken(newToken);
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
