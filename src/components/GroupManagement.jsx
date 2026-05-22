import { useState } from "react";
import { MOCK } from "../api/mockData";
import { Icons } from "../assets/Icons";
import { PageHeader } from "../components/Shared";

// ============================================================
// GROUP MANAGEMENT VIEW
// No props required — self-contained with mock data
// ============================================================
export function GroupManagement() {
  const [expanded, setExpanded] = useState({ 1: true, 2: true });

  const toggle = (id) => setExpanded((e) => ({ ...e, [id]: !e[id] }));

  return (
    <div>
      <PageHeader title="Group Management" subtitle="Organize your quiz library using a multi-tier category hierarchy.">
        <button className="filter-chip"><Icons.Filter /> Filter</button>
        <button className="btn-add"><Icons.Plus /> Add/Manage Category</button>
      </PageHeader>

      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        2 top-level groups &nbsp;·&nbsp; 20 changes noted &nbsp;&nbsp;
        <span className="link">Collapse All</span> &nbsp;
        <span className="link">Expand All</span>
      </div>

      <GroupTree groups={MOCK.adminGroups} expanded={expanded} onToggle={toggle} />

      <div className="create-category-box">
        <div className="create-category-icon">+</div>
        <div className="create-category-title">Create New Top-Level Category</div>
        <div className="create-category-sub">Add a new top-level category and grow your course hierarchy.</div>
      </div>

      <GroupTips />
    </div>
  );
}

// ---- Sub-components ----

function GroupTree({ groups, expanded, onToggle }) {
  return (
    <div className="group-tree">
      {groups.map((g) => (
        <div key={g.id}>
          {/* Top-level group row */}
          <div className="group-row top-level" onClick={() => onToggle(g.id)}>
            <span style={{ cursor: "pointer" }}>{expanded[g.id] ? "▼" : "▶"}</span>
            <span className="group-name">{g.name}</span>
            <span className="group-count">{g.quizzes} QUESTIONS</span>
            <div className="group-actions">
              <button className="table-action">ADD QUIZ</button>
              <button className="table-action">···</button>
            </div>
          </div>

          {/* Subgroups */}
          {expanded[g.id] &&
            g.subgroups.map((sg) => (
              <SubgroupRows key={sg.id} subgroup={sg} />
            ))}

          <div className="group-add-row">
            <Icons.Plus /> Add subgroup to {g.name}
          </div>
        </div>
      ))}
    </div>
  );
}

function SubgroupRows({ subgroup }) {
  return (
    <>
      <div className="group-row sub-level">
        <span>▼</span>
        <span className="group-name" style={{ fontWeight: 600 }}>{subgroup.name}</span>
        <span className="group-count">{subgroup.quizzes} QUESTIONS</span>
        <div className="group-actions">
          <button className="table-action">ADD QUIZ</button>
          <button className="table-action">···</button>
        </div>
      </div>

      {subgroup.items.map((item, idx) => (
        <div key={idx} className="group-row item-level">
          <span style={{ fontSize: 16 }}>▸</span>
          <span className="group-name">{item}</span>
          <div className="group-actions">
            <button className="table-action">ADD MORE</button>
          </div>
        </div>
      ))}

      <div className="group-add-row" style={{ paddingLeft: 40 }}>
        <Icons.Plus /> Add subcategory to {subgroup.name}
      </div>
    </>
  );
}

function GroupTips() {
  const tips = [
    {
      title: "Rearrange Nodes",
      desc: "Use drag-and-drop to rearrange quiz categories, change parent-child relationships between nodes.",
    },
    {
      title: "Hierarchy Links",
      desc: "Connect quiz content across groups and sub-groups with bidirectional linking.",
    },
    {
      title: "Bulk Add",
      desc: "Import multiple quizzes into any group using the CSV import tool to speed up content creation.",
    },
  ];

  return (
    <div className="group-bottom">
      {tips.map((t) => (
        <div key={t.title} className="group-tip">
          <h4>📌 {t.title}</h4>
          <p>{t.desc}</p>
        </div>
      ))}
    </div>
  );
}
