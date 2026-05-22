import { theme } from "../api/config";

// ============================================================
// SHARED UI PRIMITIVES
// Small reusable building blocks used across multiple views
// ============================================================

/** On/off toggle switch */
export function Toggle({ on, onClick }) {
  return <button className={`toggle ${on ? "on" : ""}`} onClick={onClick} />;
}

/** Circular score ring with percentage label */
export function ScoreRing({ score, size = 96 }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 96 96">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.purple} />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
        <circle
          cx="48" cy="48" r={r} fill="none"
          stroke="url(#ringGrad)" strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        />
      </svg>
      <div className="score-ring-val">{score}%</div>
    </div>
  );
}

/** Pagination row with prev/next and page number buttons */
export function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="pagination">
      <button className="page-btn" onClick={() => onChange(Math.max(1, page - 1))}>‹</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button key={p} className={`page-btn ${p === page ? "active" : ""}`} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button className="page-btn" onClick={() => onChange(Math.min(totalPages, page + 1))}>Next</button>
    </div>
  );
}

/** Filter/search bar with optional chip buttons */
export function SearchBar({ value, onChange, placeholder = "Search...", children }) {
  return (
    <div className="filter-bar">
      <div className="search-box">
        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      </div>
      {children && <div className="filter-bar-actions">{children}</div>}
    </div>
  );
}

/** Difficulty badge (Easy / Medium / Hard) */
export function DiffBadge({ level }) {
  const cls = level?.toLowerCase() === "easy" ? "diff-easy" : level?.toLowerCase() === "hard" ? "diff-hard" : "diff-medium";
  return <span className={`diff-badge ${cls}`}>{level}</span>;
}

/** Status pill (passed / failed) */
export function StatusPill({ status }) {
  return (
    <span className={`status-pill ${status === "passed" ? "status-passed" : "status-failed"}`}>
      {status === "passed" ? "✓" : "✗"} {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/** Page header with title, subtitle, and optional right-side actions */
export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children && <div className="page-header-actions">{children}</div>}
    </div>
  );
}

/** Breadcrumb nav */
export function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      {items.map((item, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {i > 0 && <span className="breadcrumb-sep">/</span>}
          {item.onClick
            ? <a onClick={item.onClick}>{item.label}</a>
            : <span>{item.label}</span>
          }
        </span>
      ))}
    </div>
  );
}
