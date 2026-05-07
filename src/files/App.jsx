import { useState } from "react";
import { globalCSS } from "../assets/styles";
import { LoginView } from "../pages/LoginView";
import { StudentLayout } from "../components/StudentLayout";
import { AdminLayout } from "../components/AdminLayout";
import { useAuth } from "../auth/AuthContext";
import { getAppRole } from "../api/utils";

// ============================================================
// ROOT APP
// Controls top-level auth state and which layout to render.
// ============================================================
export default function App() {
  const { user, logout, isLoading } = useAuth();
  const auth = getAppRole(user?.role);
  const [viewerView, setViewerView] = useState("dashboard");
  const [adminView, setAdminView] = useState("adminDashboard");
  const handleLogout = () => {
    logout();
    setViewerView("dashboard");
    setAdminView("adminDashboard");
  };

  return (
    <>
      <style>{globalCSS}</style>

      {!auth && !isLoading && <LoginView />}

      {!auth && isLoading && (
        <div className="qw-app">
          <div
            style={{
              minHeight: "100vh",
              display: "grid",
              placeItems: "center",
              background: "#f8f9fc",
              color: "#1a1a2e",
              fontFamily: "inherit",
            }}
          >
            Restoring your session...
          </div>
        </div>
      )}

      {auth === "viewer" && (
        <StudentLayout
          view={viewerView}
          setView={setViewerView}
          onLogout={handleLogout}
        />
      )}

      {auth === "admin" && (
        <AdminLayout
          view={adminView}
          setView={setAdminView}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
