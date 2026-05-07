import { Icons } from "../assets/Icons";

// ============================================================
// SIDEBAR
// Props:
//   logo      — string, brand name shown in header
//   items     — [{ key, label, icon }]
//   activeKey — currently selected nav key
//   onNav     — (key) => void
//   bottomItems — optional extra items at bottom (e.g. Settings)
//   onLogout  — () => void
// ============================================================
export function Sidebar({ logo, items, activeKey, onNav, bottomItems = [], onLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <span style={{ color: "white", fontSize: 12 }}>✦</span>
        </div>
        <span className="sidebar-logo-name">{logo}</span>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <div
            key={item.key}
            className={`sidebar-item ${activeKey === item.key ? "active" : ""}`}
            onClick={() => onNav(item.key)}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        {bottomItems.map((item) => (
          <div key={item.key} className="sidebar-item" onClick={() => onNav(item.key)}>
            {item.icon} {item.label}
          </div>
        ))}
        <button className="sidebar-btn" onClick={onLogout}>
          <Icons.LogOut /> Logout
        </button>
      </div>
    </div>
  );
}
