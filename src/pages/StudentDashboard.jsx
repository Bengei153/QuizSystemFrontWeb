import { CONFIG } from "../api/config";
import { MOCK } from "../api/mockData";
import { Icons } from "../assets/Icons";

// ============================================================
// STUDENT DASHBOARD VIEW
// Props:
//   onNavigate — (view: string) => void
// ============================================================
export function StudentDashboard({ onNavigate }) {
  const s = CONFIG.STUDENT;

  return (
    <div>
      <WelcomeBanner student={s} onStartQuiz={() => onNavigate("quiz")} />
      <StatCards student={s} />
      <FilterBar />
      <CategoryGrid onSelect={() => onNavigate("quiz")} />
      <RecommendedGrid onSelect={() => onNavigate("quiz")} />
    </div>
  );
}

// ---- Sub-components ----

function WelcomeBanner({ student, onStartQuiz }) {
  return (
    <div className="dash-banner">
      <div>
        <div className="dash-banner-title">Welcome back, {student.NAME}! 👋</div>
        <div className="dash-banner-sub">
          Ready to challenge your knowledge today? You've already mastered {student.TOPICS_THIS_MONTH} topics this month. Keep up the great work!
        </div>
        <div className="btn-row">
          <button className="btn-sm btn-purple" onClick={onStartQuiz}>Quick Start Quiz</button>
          <button className="btn-sm btn-outline">View Recommendations</button>
        </div>
      </div>
    </div>
  );
}

function StatCards({ student }) {
  const cards = [
    { label: "Quizzes Taken", value: student.QUIZZES_TAKEN, icon: "📋" },
    { label: "Avg. Score",    value: student.AVG_SCORE + "%", icon: "⭐" },
    { label: "Learning Hours",value: student.LEARNING_HOURS,  icon: "🕒" },
    { label: "Global Rank",   value: student.GLOBAL_RANK,     icon: "🌍" },
  ];
  return (
    <div className="stat-cards">
      {cards.map((c) => (
        <div key={c.label} className="stat-card">
          <div className="stat-card-label">{c.icon} {c.label}</div>
          <div className="stat-card-value">{c.value}</div>
        </div>
      ))}
    </div>
  );
}

function FilterBar() {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <Icons.Search />
        <input placeholder="Search for quizzes, topics, or categories..." />
      </div>
      <button className="filter-chip"><Icons.Filter /> Filters</button>
      <button className="filter-chip">Latest Added ▾</button>
    </div>
  );
}

function CategoryGrid({ onSelect }) {
  return (
    <div>
      <div className="section-title">Browse by Subject</div>
      <div className="section-sub">Select a major group to explore specialized quiz tracks.</div>
      <div className="category-grid">
        {MOCK.categories.map((c) => (
          <div key={c.id} className="category-card" onClick={onSelect}>
            <span className="category-icon">{c.icon}</span>
            <div className="category-name">{c.name}</div>
            <div className="category-desc">{c.description}</div>
            <div className="category-meta">{c.topics} TOPICS <Icons.ChevRight /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendedGrid({ onSelect }) {
  return (
    <div>
      <div className="section-title">Recommended for You</div>
      <div className="section-sub">Based on your previous interest in Web Development and Physics.</div>
      <div className="rec-grid">
        {MOCK.recommended.map((r) => (
          <div key={r.id} className="rec-card" onClick={onSelect}>
            <div className="rec-card-top" style={{ background: r.color }} />
            <div className="rec-card-body">
              <div className="rec-card-cat">{r.category}</div>
              <div className="rec-card-title">{r.title}</div>
              <div className="rec-card-meta">
                <span>🕒 {r.duration}</span>
                <span className={`pill ${r.level === "Advanced" ? "pill-red" : r.level === "Intermediate" ? "pill-yellow" : "pill-green"}`}>
                  {r.level}
                </span>
              </div>
              <button className="btn-sm btn-purple" style={{ fontSize: 12, padding: "7px 14px" }}>Start Now →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
