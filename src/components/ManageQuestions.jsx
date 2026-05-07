import { useState } from "react";
import { MOCK } from "../api/mockData";
import { Icons } from "../assets/Icons";
import { DiffBadge, PageHeader, Pagination } from "../components/Shared";

// ============================================================
// MANAGE QUESTIONS VIEW
// Props:
//   onNavigate — (view: string) => void
// ============================================================
export function ManageQuestions({ onNavigate }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = MOCK.adminQuestions.filter(
    (q) =>
      q.text.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader title="Manage Questions" subtitle="Review, filter, and organize your global question bank.">
        <button className="btn-export"><Icons.Download /> Export to PDF</button>
        <button className="btn-add" onClick={() => onNavigate("createQuestion")}><Icons.Plus /> Add New Question</button>
      </PageHeader>

      <QuestionFilters search={search} onSearch={setSearch} />

      <div className="table-wrap">
        <QuestionsTable rows={filtered} />
        <div className="table-footer">
          <span style={{ fontSize: 13, color: "#6b7280" }}>Showing 1–5 of 124 questions</span>
          <Pagination page={page} totalPages={25} onChange={setPage} />
        </div>
      </div>

      <div className="pro-tip">
        ℹ️ <strong>Pro-tip:</strong> You can use the search bar to find questions by ID, keywords, or specific answer choices.
      </div>
    </div>
  );
}

// ---- Sub-components ----

function QuestionFilters({ search, onSearch }) {
  return (
    <div className="filter-row">
      <div>
        <div className="filter-label">Search Question</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 10px" }}>
          <Icons.Search />
          <input
            style={{ border: "none", outline: "none", fontSize: 13, fontFamily: "inherit", flex: 1 }}
            placeholder="Enter keywords..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>
      {["Major Category", "Secondary Category", "Primary Category"].map((label) => (
        <div key={label}>
          <div className="filter-label">{label}</div>
          <select className="filter-input">
            <option>All {label.split(" ")[0]}</option>
            <option>Software Engineering</option>
            <option>Computer Science</option>
          </select>
        </div>
      ))}
    </div>
  );
}

function QuestionsTable({ rows }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Question Text</th>
          <th>Categories</th>
          <th>Difficulty</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((q) => (
          <tr key={q.id}>
            <td style={{ color: "#6b7280", fontFamily: "monospace", fontSize: 12 }}>{q.id}</td>
            <td style={{ maxWidth: 260 }}>
              <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.text}</div>
            </td>
            <td>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>{q.major}</div>
              <div style={{ fontSize: 12, color: "#5B5FED" }}>{q.minor}</div>
            </td>
            <td><DiffBadge level={q.difficulty} /></td>
            <td style={{ color: "#6b7280", fontSize: 12 }}>{q.created}</td>
            <td><button className="table-action">···</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
