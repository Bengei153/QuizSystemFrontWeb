import { useState } from "react";
import { MOCK } from "../api/mockData";
import { ScoreRing } from "../components/Shared";
import { Icons } from "../assets/Icons";

// ============================================================
// RESULTS VIEW
// Shown after quiz submission — shows score, review, CTA
// Props:
//   answers    — { [questionIndex]: selectedOptionIndex }
//   onRetake   — () => void
//   onContinue — () => void
// ============================================================
export function ResultsView({ answers, onRetake, onContinue }) {
  const correct = MOCK.quizQuestions.filter((q, i) => answers[i] === q.correct).length;
  const total = MOCK.quizQuestions.length;
  const score = Math.round((correct / total) * 100);
  const incorrect = total - correct;

  const title =
    score >= 80 ? "Outstanding Work!" :
    score >= 60 ? "Good Effort!" :
    "Keep Practicing!";

  return (
    <div>
      <ResultsSummary score={score} correct={correct} total={total} incorrect={incorrect} title={title} onRetake={onRetake} />
      <QuestionReview answers={answers} />
      <ResultsCTA onContinue={onContinue} />
    </div>
  );
}

// ---- Sub-components ----

function ResultsSummary({ score, correct, total, incorrect, title, onRetake }) {
  return (
    <div className="results-card">
      <div className="results-summary-layout">
        <ScoreRing score={score} />
        <div className="results-summary-content">
          <div className="results-badge">Quiz Completed</div>
          <div className="results-title">{title}</div>
          <div className="results-summary-copy">
            You've successfully finished the React Fundamentals quiz.
          </div>
          <div className="results-meta-grid">
            {[
              { label: "⏱ Test Time",  val: "12m 45s" },
              { label: "⭐ Accuracy",  val: `${score}%` },
              { label: "✅ Correct",   val: `${correct} / ${total}` },
              { label: "❌ Incorrect", val: `${incorrect} / ${total}` },
            ].map((m) => (
              <div key={m.label}>
                <div className="results-meta-label">{m.label}</div>
                <div className="results-meta-val">{m.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="results-actions">
        <button className="btn-sm btn-outline" onClick={onRetake}>↺ Retake Quiz</button>
        <button className="btn-sm btn-outline">Review Show Scores</button>
        <button className="btn-sm btn-outline">See Detailed History →</button>
      </div>
    </div>
  );
}

function QuestionReview({ answers }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <div className="section-heading-row">
        <div>
          <div className="section-title">Question Review</div>
          <div className="section-sub">Go through each question to understand your incorrect answers.</div>
        </div>
        <button className="filter-chip">Incorrect Only</button>
      </div>

      <div className="review-list">
        {MOCK.quizQuestions.map((q, i) => {
          const userAns = answers[i];
          const isCorrect = userAns === q.correct;
          const isOpen = expanded === i;

          return (
            <div key={i} className="review-item">
              <div className="review-item-header" onClick={() => setExpanded(isOpen ? null : i)}>
                <div className={`review-item-icon ${userAns === undefined ? "neutral" : isCorrect ? "correct" : "wrong"}`}>
                  {userAns === undefined ? "?" : isCorrect ? <Icons.Check /> : <Icons.X />}
                </div>
                <div className="review-question-text">QUESTION {i + 1} — {q.text}</div>
                <span style={{ fontSize: 12, color: "#6b7280" }}>{isOpen ? "▲" : "▼"}</span>
              </div>

              {isOpen && (
                <div className="review-item-body">
                  <div className="review-answer-row">
                    {userAns !== undefined && userAns !== q.correct && (
                      <div className="review-answer wrong-ans">Your answer: {q.options[userAns]}</div>
                    )}
                    <div className="review-answer correct-ans">Correct: {q.options[q.correct]}</div>
                  </div>
                  <div className="review-explain">
                    <strong>Expert Explanation:</strong> Keys help React identify which items have changed, are added, or are
                    removed. They should be given to the elements inside the array to give the elements a stable identity.
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ResultsCTA({ onContinue }) {
  return (
    <div className="results-cta">
      <h3 className="results-cta-title">
        Ready to take another challenge?
      </h3>
      <p className="results-cta-copy">
        Explore hundreds of quizzes across various technologies and improve your knowledge score.
      </p>
      <button className="btn-sm btn-purple" onClick={onContinue}>Continue Learning</button>
    </div>
  );
}
