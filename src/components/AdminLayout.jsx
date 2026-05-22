import { useState } from "react";
import { CONFIG, theme } from "../api/config";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { Icons } from "../assets/Icons";
import { AdminDashboard } from "../pages/AdminDashboard";
import { ManageQuestions } from "../components/ManageQuestions";
import { CreateQuestion } from "../components/CreateQuestion";
import { GroupManagement } from "../components/GroupManagement";
import { useAuth } from "../auth/AuthContext";

// ============================================================
// ADMIN LAYOUT
// Props:
//   view     — current nav key
//   setView  — (key: string) => void
//   onLogout — () => void
// ============================================================
export function AdminLayout({ view, setView, onLogout }) {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navItems = [
    { key: "adminDashboard", label: "Dashboard", icon: <Icons.Dashboard /> },
    { key: "groups",         label: "Groups",    icon: <Icons.Folder />    },
    { key: "questions",      label: "Questions", icon: <Icons.Questions /> },
    { key: "users",          label: "Users",     icon: <Icons.Users />     },
  ];

  const bottomItems = [
    { key: "settings", label: "Settings", icon: <Icons.Settings /> },
  ];
  const userName = user?.username || CONFIG.ADMIN.NAME;
  const userRole = user?.role || CONFIG.ADMIN.ROLE;

  return (
    <div className="qw-app">
      <div className="layout">
        <button
          className={`sidebar-backdrop ${isSidebarOpen ? "open" : ""}`}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close navigation"
        />
        <Sidebar
          logo="Quiz Manager"
          items={navItems}
          activeKey={view}
          onNav={(nextView) => {
            setView(nextView);
            setIsSidebarOpen(false);
          }}
          bottomItems={bottomItems}
          onLogout={onLogout}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="main">
          <Topbar
            searchPlaceholder="Search quiz data..."
            userName={userName}
            userRole={userRole}
            showRole
            extraLeft={
              <button
                className="mobile-menu-btn"
                onClick={() => setIsSidebarOpen((open) => !open)}
                aria-label="Open navigation"
              >
                <Icons.Menu />
              </button>
            }
            extraRight={
              <div className="icon-btn"><Icons.Moon /></div>
            }
          />
          <div className="page-content">
            {view === "adminDashboard" && <AdminDashboard onNavigate={setView} />}
            {view === "questions"      && <ManageQuestions onNavigate={setView} />}
            {view === "createQuestion" && <CreateQuestion  onNavigate={setView} />}
            {view === "groups"         && <GroupManagement />}
            {view === "users"          && <UsersPlaceholder />}
            {view === "settings"       && <SettingsPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder screens — replace with real components when ready
function UsersPlaceholder() {
  return (
    <div style={{ padding: 40, textAlign: "center", color: theme.textMuted }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
      <h2 style={{ fontFamily: "Syne,sans-serif", marginBottom: 8 }}>User Management</h2>
      <p>Connect to your backend at <code style={{ background: theme.bg, padding: "2px 6px", borderRadius: 4 }}>{CONFIG.API.ADMIN_USERS}</code></p>
    </div>
  );
}

function SettingsPlaceholder() {
  return (
    <div style={{ padding: 40, textAlign: "center", color: theme.textMuted }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚙️</div>
      <h2 style={{ fontFamily: "Syne,sans-serif", marginBottom: 8 }}>Settings</h2>
      <p>Application and account settings will appear here.</p>
    </div>
  );
}
