import { useState, useEffect } from "react";
import { CONFIG } from "../api/config";
import { MOCK } from "../api/mockData";
import { formatTime } from "../api/utils";

// ============================================================
// QUIZ VIEW
// Full-screen quiz taking experience with timer + navigator
// Props:
//   onFinish — (answers: { [questionIndex]: selectedOptionIndex }) => void
// ============================================================
export function QuizView({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [time, setTime] = useState(CONFIG.QUIZ_TIME_LIMIT);
  const [showNav, setShowNav] = useState(true);

  const questions = MOCK.quizQuestions;
  const total = questions.length;
  const q = questions[current];
  const progress = Math.round((Object.keys(answers).length / total) * 100);

  useEffect(() => {
    const t = setInterval(() => setTime((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const selectOption = (i) => setAnswers((a) => ({ ...a, [current]: i }));

  const handleNext = () => {
    if (current < total - 1) setCurrent((c) => c + 1);
    else onFinish(answers);
  };

  return (
    <div>
      <QuizTopbar
        progress={progress}
        time={time}
        showNav={showNav}
        onToggleNav={() => setShowNav((s) => !s)}
      />
      <div className="page-content">
        <div className={showNav ? "quiz-layout" : ""}>
          <QuizQuestion
            question={q}
            questionIndex={current}
            total={total}
            selected={answers[current]}
            onSelect={selectOption}
            onPrev={() => setCurrent((c) => Math.max(0, c - 1))}
            onNext={handleNext}
            isFirst={current === 0}
            isLast={current === total - 1}
          />
          {showNav && (
            <QuizNavigator
              total={total}
              current={current}
              answers={answers}
              onJump={setCurrent}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Sub-components ----

function QuizTopbar({ progress, time, showNav, onToggleNav }) {
  const isUrgent = time < 20;
  return (
    <div className="quiz-topbar">
      <div className="quiz-topbar-progress" style={{ flex: 1 }}>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>
          OVERALL PROGRESS &nbsp;&nbsp;&nbsp; {progress}% COMPLETE
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: 24 }}>
        <div className={`quiz-timer ${isUrgent ? "quiz-timer-red" : ""}`}>
          🕒 {formatTime(time)}
        </div>
        <button className="filter-chip" style={{ fontSize: 12 }} onClick={onToggleNav}>
          {showNav ? "✕ Hide Navigator" : "Show Navigator"}
        </button>
      </div>
    </div>
  );
}

function QuizQuestion({ question, questionIndex, total, selected, onSelect, onPrev, onNext, isFirst, isLast }) {
  return (
    <div style={{ maxWidth: 640 }}>
      <div className="quiz-q-num">Question {questionIndex + 1}/{total}</div>
      <div className="quiz-q-text">{question.text}</div>

      <div className="quiz-options">
        {question.options.map((opt, i) => (
          <div
            key={i}
            className={`quiz-option ${selected === i ? "selected" : ""}`}
            onClick={() => onSelect(i)}
          >
            <div className="quiz-option-letter">{String.fromCharCode(65 + i)}</div>
            {opt}
          </div>
        ))}
      </div>

      <div className="quiz-nav-row">
        <button className="btn-sm btn-outline" onClick={onPrev} disabled={isFirst}>‹ Previous</button>
        <button className="btn-sm btn-purple" onClick={onNext}>
          {isLast ? "Submit Quiz" : "Next Question →"}
        </button>
      </div>

      <div className="quiz-nav-box" style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>
        <strong>ℹ Need help?</strong><br />
        You can jump between questions using the sidebar navigator on the right. Unsure about an answer?
        You can leave it blank and come back to it later. Your progress is saved automatically every time
        you select an option.
      </div>
    </div>
  );
}

function QuizNavigator({ total, current, answers, onJump }) {
  return (
    <div>
      <div className="quiz-nav-box">
        <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>QUESTION NAVIGATOR</div>
        <div className="quiz-nav-grid">
          {Array.from({ length: total }, (_, i) => (
            <div
              key={i}
              className={`quiz-nav-num ${answers[i] !== undefined ? "answered" : ""} ${i === current ? "current" : ""}`}
              onClick={() => onJump(i)}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#6b7280" }}>Progress is saved automatically</div>
      </div>
    </div>
  );
}
