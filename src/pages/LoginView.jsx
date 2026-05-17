import { useState } from "react";
import { CONFIG } from "../api/config";
import { createAuthenticatedSession, register as registerUser } from "../api/api";
import { useAuth } from "../auth/AuthContext";
import { Toggle } from "../components/Shared";
import { Icons } from "../assets/Icons";

// ============================================================
// LOGIN VIEW
// Handles login + register tabs, social auth buttons
// Props:
//   onLogin - optional callback after login succeeds
// ============================================================
export function LoginView({ onLogin }) {
  const { login } = useAuth();
  const [tab, setTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [organisation, setOrganisation] = useState("");
  const [role, setRole] = useState("Viewer");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (CONFIG.USE_MOCK_DATA) {
      setTimeout(() => {
        const mockRole = username.toLowerCase().includes("admin") ? "admin" : "viewer";
        const mockUser = {
          id: "mock-user",
          username: username || "demo-user",
          role: mockRole,
        };

        // Mock mode keeps a local user session without inventing auth tokens.
        login(null, mockUser, remember);
        setLoading(false);
        onLogin?.(mockRole);
      }, 800);
      return;
    }

    try {
      if (tab === "register") {
        const response = await registerUser(username, password, email, organisation, role);
        setUsername("");
        setPassword("");
        setEmail("");
        setOrganisation("");
        setRole("Viewer");
        setTab("login");
        setSuccess(
          response?.message || "Account created successfully. Sign in to continue."
        );
        setLoading(false);
        return;
      }

      const session = await createAuthenticatedSession({
        username,
        password,
        remember,
      });

      login(session.accessToken, session.user, remember, session.refreshToken);
      setLoading(false);
      onLogin?.(session.user.role);
    } catch (err) {
      setError(err.message || "Authentication failed.");
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      {/* Left panel */}
      <div className="login-left">
        <div className="login-logo">
          <div className="login-logo-icon">*</div>
          <span className="login-logo-name">{CONFIG.APP_NAME}</span>
        </div>
        <h1 className="login-hero-title">
          Master any subject with{" "}
          <span className="login-hero-accent">interactive</span> learning.
        </h1>
        <p className="login-hero-sub">{CONFIG.APP_SUBTEXT}</p>
        <div className="login-badges">
          <div className="login-badge">+ 1,000+ Categories</div>
          <div className="login-badge">+ Smart Tracking</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <h2>{tab === "login" ? "Welcome back" : "Create your account"}</h2>
        <p>
          {tab === "login"
            ? "Enter your username and password to access your dashboard"
            : "Choose a username and password to create your account"}
        </p>

        <div className="tab-row">
          <button
            className={`tab-btn ${tab === "login" ? "active" : ""}`}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={`tab-btn ${tab === "register" ? "active" : ""}`}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>

        <div className="form-field">
          <input
            className="form-input"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-field">
          <input
            className="form-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {tab === "register" && (
          <>
            <div className="form-field">
              <input
                className="form-input"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-field">
              <input
                className="form-input"
                placeholder="Organisation"
                type="text"
                value={organisation}
                onChange={(e) => setOrganisation(e.target.value)}
              />
            </div>

            <div className="form-field">
              <select
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Viewer">Viewer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </>
        )}

        {tab === "login" && (
          <div className="form-row-inline">
            <div className="toggle-wrap">
              <Toggle on={remember} onClick={() => setRemember(!remember)} />
              Remember me
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            tab === "login" ? (
              "Signing in..."
            ) : (
              "Creating account..."
            )
          ) : (
            <>
              <span>{tab === "login" ? "Sign In" : "Create Account"}</span>
              <Icons.Arrow />
            </>
          )}
        </button>

        {error && <div className="form-error">{error}</div>}
        {success && <div className="form-success">{success}</div>}

        <div className="login-footer">
          {tab === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <span className="link" onClick={() => setTab("register")}>
                Create one now
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="link" onClick={() => setTab("login")}>
                Sign in
              </span>
            </>
          )}
        </div>

        <div className="login-copy">
          Copyright 2024 {CONFIG.APP_NAME} Inc. Built for professional learners.
          <br />
          <span className="link">Support</span> |{" "}
          <span className="link">Privacy</span> |{" "}
          <span className="link">Terms</span>
        </div>
      </div>
    </div>
  );
}
