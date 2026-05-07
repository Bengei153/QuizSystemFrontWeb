import { CONFIG } from "../api/config";
import { MOCK } from "../api/mockData";
import { theme } from "../api/config";
import { getInitials } from "../api/utils";
import { Icons } from "../assets/Icons";
import { PageHeader } from "../components/Shared";

// ============================================================
// ADMIN DASHBOARD VIEW
// Props:
//   onNavigate — (view: string) => void
// ============================================================
export function AdminDashboard({ onNavigate }) {
  return (
    <div>
      <PageHeader title="Manager Dashboard" subtitle="Welcome back, Administrator. Here's your school's performance overview.">
        <button className="btn-export"><Icons.Download /> Export to PDF</button>
        <button className="btn-add" onClick={() => onNavigate("createQuestion")}><Icons.Plus /> Add New Question</button>
      </PageHeader>

      <AdminStatRow />

      <div className="admin-charts-row">
        <ParticipationChart />
        <DistributionChart />
      </div>

      <div className="admin-bottom-row">
        <QuickManagement onNavigate={onNavigate} />
        <RecentActivity />
      </div>
    </div>
  );
}

// ---- Sub-components ----

function AdminStatRow() {
  const admin = CONFIG.ADMIN;
  const stats = [
    { label: "Total Questions", val: admin.TOTAL_QUESTIONS.toLocaleString(), change: "+19%", up: true },
    { label: "Total Users",     val: admin.TOTAL_USERS.toLocaleString(),    change: "+5.4%", up: true },
    { label: "Quiz Attempts",   val: admin.QUIZ_ATTEMPTS,                   change: "+0.1%", up: false },
    { label: "Average Score",   val: admin.AVG_SCORE,                       change: "+2.2%", up: true },
  ];
  return (
    <div className="admin-stat-row">
      {stats.map((s) => (
        <div key={s.label} className="admin-stat">
          <div className="admin-stat-label">
            {s.label}
            <span className={`admin-stat-change ${s.up ? "change-up" : "change-down"}`}>{s.change}</span>
          </div>
          <div className="admin-stat-val">{s.val}</div>
        </div>
      ))}
    </div>
  );
}

function ParticipationChart() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const tries = MOCK.participationTrend;
  const scores = MOCK.scoreTrend;
  const maxT = Math.max(...tries);
  const W = 340, H = 120;
  const px = (i) => (i / (tries.length - 1)) * (W - 20) + 10;
  const py = (v, max) => H - 10 - (v / max) * (H - 20);
  const pathD = (arr, max) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${px(i)},${py(v, max)}`).join(" ");

  return (
    <div className="chart-card">
      <div className="chart-title">Participation Trends</div>
      <div className="chart-sub">Daily quiz attempts and average scores over the last 7 days.</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H + 20}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={theme.purple} />
            <stop offset="100%" stopColor={theme.purple} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${pathD(tries, maxT)} L${px(tries.length - 1)},${H - 10} L${px(0)},${H - 10} Z`} className="chart-path-area" />
        <path d={pathD(tries, maxT)} className="chart-path" />
        <path d={pathD(scores, 100)} className="chart-path-score" />
        {days.map((d, i) => (
          <text key={d} x={px(i)} y={H + 16} fontSize="10" fill={theme.textMuted} textAnchor="middle">{d}</text>
        ))}
      </svg>
      <div style={{ display: "flex", gap: 16, fontSize: 12, color: theme.textMuted, marginTop: 8 }}>
        <span><span style={{ display: "inline-block", width: 12, height: 3, background: theme.purple, borderRadius: 2, marginRight: 4 }} />Attempts</span>
        <span><span style={{ display: "inline-block", width: 12, height: 2, background: theme.accent, borderRadius: 2, marginRight: 4 }} />Avg Score</span>
      </div>
    </div>
  );
}

function DistributionChart() {
  const dist = MOCK.questionDistribution;
  const total = dist.reduce((a, c) => a + c.value, 0);
  let angle = -Math.PI / 2;
  const slices = dist.map((d) => {
    const sweep = (d.value / total) * 2 * Math.PI;
    const x1 = 60 + 50 * Math.cos(angle);
    const y1 = 60 + 50 * Math.sin(angle);
    angle += sweep;
    const x2 = 60 + 50 * Math.cos(angle);
    const y2 = 60 + 50 * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    return { ...d, path: `M60,60 L${x1},${y1} A50,50 0 ${large},1 ${x2},${y2} Z` };
  });

  return (
    <div className="chart-card">
      <div className="chart-title">Question Distribution</div>
      <div className="chart-sub">Breakdown by major group</div>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {slices.map((s) => <path key={s.label} d={s.path} fill={s.color} />)}
        <circle cx="60" cy="60" r="28" fill="white" />
      </svg>
      <div className="donut-legend">
        {dist.map((d) => (
          <div key={d.label} className="donut-legend-item">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className="donut-legend-dot" style={{ background: d.color }} />
              <span>{d.label}</span>
            </div>
            <span style={{ fontWeight: 600 }}>{d.value} Qs</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickManagement({ onNavigate }) {
  return (
    <div className="quick-mgmt">
      <div className="quick-mgmt-title">⚡ Quick Management</div>
      <button className="quick-btn quick-btn-primary" onClick={() => onNavigate("createQuestion")}>
        <span>+ Add New Question</span> <Icons.ChevRight />
      </button>
      <button className="quick-btn quick-btn-outline" onClick={() => onNavigate("groups")}>
        <span>Manage Groups</span> <Icons.ChevRight />
      </button>
      <button className="quick-btn quick-btn-outline" onClick={() => onNavigate("questions")}>
        <span>View Question Bank</span> <Icons.ChevRight />
      </button>
      <div className="quick-status">✓ All Systems Operational — Database Sync: 99.9% uptime</div>
    </div>
  );
}

function RecentActivity() {
  const badgeClass = { complete: "badge-complete", edit: "badge-edit", report: "badge-report", create: "badge-create" };

  return (
    <div className="activity-card">
      <div className="activity-header">
        <div>
          <div className="chart-title">Recent Activity</div>
          <div className="chart-sub">Live feed of student and manager actions.</div>
        </div>
        <span className="link">View All Activity</span>
      </div>
      {MOCK.adminActivity.map((a) => (
        <div key={a.id} className="activity-item">
          <div className="activity-avatar">{getInitials(a.user)}</div>
          <div className="activity-body">
            <div className="activity-name">{a.user}</div>
            <div className="activity-desc">{a.action}: <strong>{a.subject}</strong></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <span className={`activity-badge ${badgeClass[a.type]}`}>{a.type}</span>
            <div className="activity-time">{a.time}</div>
          </div>
        </div>
      ))}
      <div style={{ fontSize: 12, color: theme.textMuted, marginTop: 8 }}>Showing 4 of 74 activities</div>
    </div>
  );
}
