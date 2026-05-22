import { useState } from "react";
import { CONFIG } from "../api/config";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import { Icons } from "../assets/Icons";
import { StudentDashboard } from "../pages/StudentDashboard";
import { QuizView } from "../pages/QuizView";
import { ResultsView } from "../pages/ResultsView";
import { HistoryView } from "../pages/HistoryView";
import { useAuth } from "../auth/AuthContext";

// ============================================================
// STUDENT LAYOUT
// Wraps the sidebar + topbar shell around student views.
// Handles quiz flow state (dashboard → quiz → results).
// Props:
//   view     — current nav key
//   setView  — (key: string) => void
//   onLogout — () => void
// ============================================================
export function StudentLayout({ view, setView, onLogout }) {
  const { user } = useAuth();
  const [inQuiz, setInQuiz] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userName = user?.username || CONFIG.STUDENT.NAME;

  const navItems = [
    { key: "dashboard", label: "Dashboard", icon: <Icons.Dashboard /> },
    { key: "history",   label: "My History", icon: <Icons.History /> },
  ];

  // Navigate from within views — intercepts "quiz" route
  const handleNavigate = (target) => {
    setIsSidebarOpen(false);
    if (target === "quiz") { setInQuiz(true); setShowResults(false); }
    else { setInQuiz(false); setShowResults(false); setView(target); }
  };

  // Quiz finished → show results
  const handleQuizFinish = (answers) => {
    setQuizAnswers(answers);
    setInQuiz(false);
    setShowResults(true);
  };

  // Full-screen quiz (no sidebar)
  if (inQuiz) {
    return (
      <div className="qw-app">
        <div className="layout">
          <div className="main" style={{ marginLeft: 0 }}>
            <MinimalTopbar userName={userName} />
            <QuizView onFinish={handleQuizFinish} />
          </div>
        </div>
      </div>
    );
  }

  // Full-screen results (no sidebar)
  if (showResults) {
    return (
      <div className="qw-app">
        <div className="layout">
          <div className="main" style={{ marginLeft: 0 }}>
            <MinimalTopbar userName={userName} />
            <ResultsView
              answers={quizAnswers}
              onRetake={() => { setShowResults(false); setInQuiz(true); }}
              onContinue={() => { setShowResults(false); setView("dashboard"); }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Normal layout with sidebar
  return (
    <div className="qw-app">
      <div className="layout">
        <button
          className={`sidebar-backdrop ${isSidebarOpen ? "open" : ""}`}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close navigation"
        />
        <Sidebar
          logo={CONFIG.APP_NAME}
          items={navItems}
          activeKey={view}
          onNav={(nextView) => {
            setView(nextView);
            setIsSidebarOpen(false);
          }}
          onLogout={onLogout}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="main">
          <Topbar
            searchPlaceholder="Search..."
            userName={userName}
            extraLeft={
              <button
                className="mobile-menu-btn"
                onClick={() => setIsSidebarOpen((open) => !open)}
                aria-label="Open navigation"
              >
                <Icons.Menu />
              </button>
            }
          />
          <div className="page-content">
            {view === "dashboard" && <StudentDashboard onNavigate={handleNavigate} />}
            {view === "history"   && <HistoryView      onNavigate={handleNavigate} />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal topbar used during quiz / results (no sidebar, no search)
function MinimalTopbar({ userName }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon"><span style={{ color: "white", fontSize: 12 }}>✦</span></div>
          <span className="sidebar-logo-name">{CONFIG.APP_NAME}</span>
        </div>
      </div>
      <div className="topbar-right">
        <div className="avatar">{userName?.[0] ?? "U"}</div>
      </div>
    </div>
  );
}
