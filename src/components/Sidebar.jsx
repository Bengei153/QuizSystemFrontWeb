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
export function Sidebar({
  logo,
  items,
  activeKey,
  onNav,
  bottomItems = [],
  onLogout,
  isOpen = false,
  onClose,
}) {
  const handleNav = (key) => {
    onNav(key);
    onClose?.();
  };

  const handleLogout = () => {
    onClose?.();
    onLogout?.();
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-head">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <span style={{ color: "white", fontSize: 12 }}>✦</span>
          </div>
          <span className="sidebar-logo-name">{logo}</span>
        </div>
        <button className="sidebar-close" onClick={onClose} aria-label="Close navigation">
          <Icons.X />
        </button>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <div
            key={item.key}
            className={`sidebar-item ${activeKey === item.key ? "active" : ""}`}
            onClick={() => handleNav(item.key)}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div className="sidebar-bottom">
        {bottomItems.map((item) => (
          <div key={item.key} className="sidebar-item" onClick={() => handleNav(item.key)}>
            {item.icon} {item.label}
          </div>
        ))}
        <button className="sidebar-btn" onClick={handleLogout}>
          <Icons.LogOut /> Logout
        </button>
      </div>
    </div>
  );
}
