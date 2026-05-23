import { Icons } from "../assets/Icons";
import { DarkModeToggle } from "../theme/DarkModeToggle";
import { getInitials } from "../api/utils";

// ============================================================
// TOPBAR
// Props:
//   searchPlaceholder — string
//   userName          — string (used for initials avatar)
//   userRole          — optional string subtitle (admin only)
//   showRole          — boolean, show role text next to avatar
//   extraLeft         — optional JSX rendered in left slot
//   extraRight        — optional JSX rendered in right slot
// ============================================================
export function Topbar({ searchPlaceholder = "Search...", userName, userRole, showRole = false, extraLeft, extraRight }) {
  return (
    <div className="topbar">
      <div className="topbar-left">
        {extraLeft}
        <div className="topbar-search">
          <Icons.Search />
          <input placeholder={searchPlaceholder} />
        </div>
      </div>

      <div className="topbar-right">
        {extraRight}
        <DarkModeToggle />
        <div className="icon-btn" style={{ position: "relative" }}>
          <Icons.Bell />
          <div className="notif-dot" />
        </div>
        {showRole && (
          <div className="user-info">
            <div className="user-info-name">{userName}</div>
            <div className="user-info-role">{userRole}</div>
          </div>
        )}
        <div className="avatar">{getInitials(userName || "U")}</div>
      </div>
    </div>
  );
}
