import { useState } from "react";
import { MOCK } from "../api/mockData";
import { scoreColorClass } from "../api/utils";
import { PageHeader, SearchBar, Pagination, StatusPill } from "../components/Shared";

// ============================================================
// QUIZ HISTORY VIEW
// Props:
//   onNavigate — (view: string) => void
// ============================================================
export function HistoryView({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = MOCK.history.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <nav className="breadcrumb">
        <a onClick={() => onNavigate("dashboard")}>Dashboard</a>
        <span className="breadcrumb-sep">/</span>
        <span>History</span>
      </nav>

      <PageHeader title="Quiz History" subtitle="Monitor your progress and review previous attempts.">
        <button className="btn-export">⬇ Export CSV</button>
      </PageHeader>

      <HistoryStats />

      <SearchBar value={search} onChange={setSearch} placeholder="Search quiz names...">
        <button className="filter-chip">All Categories ▾</button>
        <button className="filter-chip">📅 Last 30 Days ▾</button>
      </SearchBar>

      <HistoryTable rows={filtered} />

      <div className="table-footer">
        <span style={{ fontSize: 13, color: "#6b7280" }}>Showing 1–6 of 42 results</span>
        <Pagination page={page} totalPages={3} onChange={setPage} />
      </div>

      <HistoryCTA onExplore={() => onNavigate("quiz")} />
    </div>
  );
}

// ---- Sub-components ----

function HistoryStats() {
  const stats = [
    { icon: "📋", label: "Total Attempts", val: "42",   sub: "+3 this week" },
    { icon: "⭐", label: "Avg. Accuracy",  val: "78%",  sub: "Top 15% of users" },
    { icon: "🕒", label: "Study Time",     val: "12.5h",sub: "Total across all quizzes" },
  ];
  return (
    <div className="history-stats">
      {stats.map((s) => (
        <div key={s.label} className="history-stat">
          <div className="history-stat-icon">{s.icon}</div>
          <div>
            <div className="history-stat-label">{s.label}</div>
            <div className="history-stat-val">{s.val}</div>
            <div className="history-stat-sub">{s.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function HistoryTable({ rows }) {
  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Quiz Name ↑</th>
            <th>Category</th>
            <th>Date ↑</th>
            <th>Score</th>
            <th>Time Taken</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((h) => (
            <tr key={h.id}>
              <td>{h.name}</td>
              <td style={{ color: "#6b7280" }}>{h.category}</td>
              <td style={{ color: "#6b7280" }}>{h.date}</td>
              <td><span className={`score-num ${scoreColorClass(h.score)}`}>{h.score}%</span></td>
              <td style={{ color: "#6b7280" }}>{h.time}</td>
              <td><StatusPill status={h.status} /></td>
              <td><button className="table-action">···</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HistoryCTA({ onExplore }) {
  return (
    <div className="history-cta">
      <div>
        <h3>Ready to beat your high score?</h3>
        <p>Browse our curated collection of new quizzes in Science and Technology added this week.</p>
      </div>
      <button className="btn-sm btn-purple" onClick={onExplore}>Explore More Quizzes</button>
    </div>
  );
}
