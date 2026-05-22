import { useState } from "react";
import { CONFIG } from "../api/config";
import { authenticatedRequest } from "../api/api";
import { Toggle } from "../components/Shared";
import { Icons } from "../assets/Icons";

// ============================================================
// CREATE QUESTION VIEW
// Props:
//   onNavigate — (view: string) => void
// ============================================================
export function CreateQuestion({ onNavigate }) {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([
    { text: "Application Layer",  correct: true  },
    { text: "Data Link Layer",    correct: false },
    { text: "Physical Layer",     correct: false },
    { text: "Session Layer",      correct: false },
  ]);

  const setCorrect = (i) => setAnswers((a) => a.map((ans, idx) => ({ ...ans, correct: idx === i })));
  const updateText = (i, t) => setAnswers((a) => a.map((ans, idx) => (idx === i ? { ...ans, text: t } : ans)));

  const handleSave = async () => {
    const payload = { text: questionText, answers };
    if (!CONFIG.USE_MOCK_DATA) {
      await authenticatedRequest(CONFIG.API.ADMIN_QUESTION_CREATE, {
        method: "POST",
        body: payload,
      });
    }
    onNavigate("questions");
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <nav className="breadcrumb">
            <a onClick={() => onNavigate("questions")}>Questions</a>
            <span className="breadcrumb-sep">/</span>
            <span>Create New Question</span>
          </nav>
          <h1>Create New Question</h1>
          <p>Fill in the details below to add a new question to the question bank.</p>
        </div>
        <button className="btn-export">Edit Mode</button>
      </div>

      {/* Step 1 — Classification */}
      <ClassificationSection />

      {/* Step 2 — Question Details */}
      <QuestionDetailsSection
        text={questionText}
        onChange={setQuestionText}
      />

      {/* Step 3 — Answer Options */}
      <AnswerOptionsSection
        answers={answers}
        onCorrect={setCorrect}
        onTextChange={updateText}
      />

      {/* Footer */}
      <div className="form-footer-shell">
        <div className="form-footer">
          <div className="form-steps">‹ › &nbsp; Step 3 of 3: Finalize Answers</div>
          <div className="form-actions">
            <button className="btn-discard" onClick={() => onNavigate("questions")}>✕ Discard</button>
            <button className="btn-save" onClick={handleSave}>💾 Save Question</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Sub-components ----

function ClassificationSection() {
  return (
    <div className="form-section">
      <div className="form-section-title">① Classification</div>
      <div className="form-grid-3">
        {["Major Category", "Secondary Category", "Primary Category"].map((label) => (
          <div key={label}>
            <label className="form-label">{label}</label>
            <select className="form-select">
              <option>Select {label.split(" ")[0]}</option>
              <option>Software Engineering</option>
              <option>Computer Science</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuestionDetailsSection({ text, onChange }) {
  return (
    <div className="form-section">
      <div className="form-section-title">② Question Details</div>
      <label className="form-label">
        Question Text{" "}
        <span style={{ color: "#6b7280", fontWeight: 400 }}>— AI Suggestions →</span>
      </label>
      <textarea
        className="form-textarea"
        placeholder="e.g. Which layer of the OSI model is responsible for data encryption and compression?"
        value={text}
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="char-count">{text.length} characters</div>
      <button className="add-image-btn"><Icons.Image /> Add Image Attachment (Optional)</button>
    </div>
  );
}

function AnswerOptionsSection({ answers, onCorrect, onTextChange }) {
  return (
    <div className="form-section">
      <div className="answer-options-header">
        <div className="form-section-title" style={{ margin: 0 }}>③ Answer Options</div>
        <button className="link">+ Add Another Answer</button>
      </div>
      {answers.map((ans, i) => (
        <AnswerRow
          key={i}
          index={i}
          answer={ans}
          onTextChange={(t) => onTextChange(i, t)}
          onSetCorrect={() => onCorrect(i)}
        />
      ))}
    </div>
  );
}

function AnswerRow({ index, answer, onTextChange, onSetCorrect }) {
  return (
    <div className="answer-option">
      <div className="answer-letter">{String.fromCharCode(65 + index)}</div>
      <div className="answer-input-wrap">
        <span className="answer-label">Answer Choice {index + 1}</span>
        <input className="answer-input" value={answer.text} onChange={(e) => onTextChange(e.target.value)} />
      </div>
      <div className="correct-toggle">
        {answer.correct
          ? <span style={{ color: "#10b981", fontWeight: 600 }}>Correct Answer</span>
          : <span>Mark as Correct</span>
        }
        <Toggle on={answer.correct} onClick={onSetCorrect} />
      </div>
      <button className="del-btn"><Icons.Trash /></button>
    </div>
  );
}
