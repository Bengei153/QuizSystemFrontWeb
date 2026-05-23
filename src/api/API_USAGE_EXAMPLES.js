/**
 * API Implementation Guide
 * ======================
 * 
 * All 41 endpoints are now configured and ready to use.
 * They are organized by controller in api.js
 * 
 * Usage: import api from './src/api/api'
 */

// ============================================================
// ADMIN CONTROLLER (9 endpoints)
// ============================================================
// GET /api/admin/stats
api.admin.getStats()
  .then(data => console.log("Admin Stats:", data))
  .catch(err => console.error("Error getting stats:", err));

// GET /api/admin/questions
api.admin.getAllQuestions()
  .then(questions => console.log("All Questions:", questions))
  .catch(err => console.error("Error:", err));

// POST /api/admin/questions/create
api.admin.createQuestion({
  title: "Sample Question",
  description: "Question description",
  difficulty: "Medium",
  category: "Math"
})
  .then(question => console.log("Created:", question))
  .catch(err => console.error("Error:", err));

// PUT /api/admin/questions/{id}
api.admin.updateQuestion(1, {
  title: "Updated Question",
  description: "Updated description"
})
  .then(data => console.log("Updated:", data))
  .catch(err => console.error("Error:", err));

// DELETE /api/admin/questions/{id}
api.admin.deleteQuestion(1)
  .then(data => console.log("Deleted:", data))
  .catch(err => console.error("Error:", err));

// GET /api/admin/groups
api.admin.getAllGroups()
  .then(groups => console.log("Groups:", groups))
  .catch(err => console.error("Error:", err));

// GET /api/admin/users
api.admin.getAllUsers()
  .then(users => console.log("Users:", users))
  .catch(err => console.error("Error:", err));

// GET /api/admin/activity
api.admin.getActivityLog()
  .then(activity => console.log("Activity:", activity))
  .catch(err => console.error("Error:", err));

// POST /api/admin/export/pdf
api.admin.exportPDF({ quizId: 1, includeAnswers: true })
  .then(data => console.log("PDF exported:", data))
  .catch(err => console.error("Error:", err));

// ============================================================
// FOLDER CONTROLLER (5 endpoints)
// ============================================================
// POST /api/folder
api.folder.create({
  name: "New Folder",
  description: "Folder description"
})
  .then(folder => console.log("Folder created:", folder))
  .catch(err => console.error("Error:", err));

// GET /api/folder/{groupId}/folders/{folderId}
api.folder.getFolder(1, 1)
  .then(folder => console.log("Folder:", folder))
  .catch(err => console.error("Error:", err));

// GET /api/folder/{groupId}/folders
api.folder.listFolders(1)
  .then(folders => console.log("Folders:", folders))
  .catch(err => console.error("Error:", err));

// PUT /api/folder/question-groups/{groupId}/folders/{folderId}
api.folder.update(1, 1, { name: "Updated Folder" })
  .then(data => console.log("Updated:", data))
  .catch(err => console.error("Error:", err));

// DELETE /api/folder/question-groups/{groupId}/folders/{folderId}
api.folder.delete(1, 1)
  .then(data => console.log("Deleted:", data))
  .catch(err => console.error("Error:", err));

// ============================================================
// QUESTION GROUP CONTROLLER (4 endpoints)
// ============================================================
// GET /api/questiongroup/{id}
api.questionGroup.get(1)
  .then(group => console.log("Question Group:", group))
  .catch(err => console.error("Error:", err));

// POST /api/questiongroup
api.questionGroup.create({
  name: "New Group",
  description: "Group description"
})
  .then(group => console.log("Created:", group))
  .catch(err => console.error("Error:", err));

// PUT /api/questiongroup/{id}
api.questionGroup.update(1, { name: "Updated Group" })
  .then(data => console.log("Updated:", data))
  .catch(err => console.error("Error:", err));

// DELETE /api/questiongroup/{id}
api.questionGroup.delete(1)
  .then(data => console.log("Deleted:", data))
  .catch(err => console.error("Error:", err));

// ============================================================
// QUESTION CONTROLLER (5 endpoints)
// ============================================================
// POST /api/question/Create
api.question.create({
  title: "What is 2+2?",
  type: "MultipleChoice",
  difficulty: "Easy",
  options: ["3", "4", "5", "6"]
})
  .then(question => console.log("Created:", question))
  .catch(err => console.error("Error:", err));

// PUT /api/question/Update
api.question.update({
  id: 1,
  title: "Updated Question",
  options: ["A", "B", "C", "D"]
})
  .then(data => console.log("Updated:", data))
  .catch(err => console.error("Error:", err));

// POST /api/question/Submit
api.question.submit({
  questionId: 1,
  answer: "B",
  userId: "user123"
})
  .then(data => console.log("Submitted:", data))
  .catch(err => console.error("Error:", err));

// GET /api/question/{id}
api.question.get(1)
  .then(question => console.log("Question:", question))
  .catch(err => console.error("Error:", err));

// DELETE /api/question/{id}
api.question.delete(1)
  .then(data => console.log("Deleted:", data))
  .catch(err => console.error("Error:", err));

// ============================================================
// QUIZ ATTEMPT CONTROLLER (5 endpoints)
// ============================================================
// POST /api/quizzes/{id}/start
api.quiz.start(1)
  .then(attempt => console.log("Quiz started:", attempt))
  .catch(err => console.error("Error:", err));

// POST /api/quizzes/{id}/submit
api.quiz.submit(1, {
  answers: [
    { questionId: 1, answer: "A" },
    { questionId: 2, answer: "B" }
  ]
})
  .then(results => console.log("Submitted:", results))
  .catch(err => console.error("Error:", err));

// GET /api/quizzes/{id}/results
api.quiz.getResults(1)
  .then(results => console.log("Results:", results))
  .catch(err => console.error("Error:", err));

// GET /api/quizzes/my-attempts
api.quiz.getMyAttempts()
  .then(attempts => console.log("My attempts:", attempts))
  .catch(err => console.error("Error:", err));

// GET /api/quizzes/{attemptId}
api.quiz.getAttempt(1)
  .then(attempt => console.log("Attempt:", attempt))
  .catch(err => console.error("Error:", err));

// ============================================================
// ANSWERS CONTROLLER (1 endpoint)
// ============================================================
// POST /api/answers
api.answers.submit({
  questionId: 1,
  answer: "Correct Answer",
  userId: "user123"
})
  .then(data => console.log("Answer submitted:", data))
  .catch(err => console.error("Error:", err));

// ============================================================
// QUESTION OPTIONS CONTROLLER (2 endpoints)
// ============================================================
// POST /api/questionoptions/{questionId}
api.questionOptions.add(1, {
  text: "Option A",
  isCorrect: true
})
  .then(option => console.log("Option added:", option))
  .catch(err => console.error("Error:", err));

// DELETE /api/questionoptions
api.questionOptions.delete({ optionId: 1 })
  .then(data => console.log("Deleted:", data))
  .catch(err => console.error("Error:", err));

// ============================================================
// SECURED FOLDER CONTROLLER (3 endpoints)
// ============================================================
// GET /api/question-groups/{groupId}/folders/{folderId}
api.securedFolder.get(1, 1)
  .then(folder => console.log("Secured Folder:", folder))
  .catch(err => console.error("Error:", err));

// POST /api/question-groups/{groupId}/folders
api.securedFolder.create(1, {
  name: "Secured Folder",
  description: "Protected folder"
})
  .then(folder => console.log("Created:", folder))
  .catch(err => console.error("Error:", err));

// PUT /api/question-groups/{groupId}/folders/{folderId}
api.securedFolder.update(1, 1, {
  name: "Updated Secured Folder"
})
  .then(data => console.log("Updated:", data))
  .catch(err => console.error("Error:", err));

// ============================================================
// SECURED QUESTION CONTROLLER (4 endpoints)
// ============================================================
// POST /api/folders/{folderId}/questions
api.securedQuestion.create(1, {
  title: "Secured Question",
  type: "MultipleChoice"
})
  .then(question => console.log("Created:", question))
  .catch(err => console.error("Error:", err));

// GET /api/folders/{folderId}/questions/{questionId}
api.securedQuestion.get(1, 1)
  .then(question => console.log("Secured Question:", question))
  .catch(err => console.error("Error:", err));

// PUT /api/folders/{folderId}/questions/{questionId}
api.securedQuestion.update(1, 1, {
  title: "Updated Secured Question"
})
  .then(data => console.log("Updated:", data))
  .catch(err => console.error("Error:", err));

// DELETE /api/folders/{folderId}/questions/{questionId}
api.securedQuestion.delete(1, 1)
  .then(data => console.log("Deleted:", data))
  .catch(err => console.error("Error:", err));

// ============================================================
// STUDENT CONTROLLER (3 endpoints)
// ============================================================
// GET /api/student/stats
api.student.getStats()
  .then(stats => console.log("Student Stats:", stats))
  .catch(err => console.error("Error:", err));

// GET /api/student/history
api.student.getHistory()
  .then(history => console.log("Student History:", history))
  .catch(err => console.error("Error:", err));

// GET /api/student/question-groups
api.student.getQuestionGroups()
  .then(groups => console.log("Available Groups:", groups))
  .catch(err => console.error("Error:", err));

// ============================================================
// USAGE IN REACT COMPONENTS
// ============================================================
// Example 1: Admin Dashboard - Get Statistics
import { useEffect, useState } from "react";
import api from "./api/api";

function AdminStatsComponent() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.admin.getStats()
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <h2>Admin Statistics</h2>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}

// Example 2: Create Question Form
function CreateQuestionForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "Medium"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const question = await api.admin.createQuestion(formData);
      alert("Question created: " + question.id);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
      />
      <select
        value={formData.difficulty}
        onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
      >
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
      <button type="submit">Create Question</button>
    </form>
  );
}

// Example 3: Quiz Attempt Flow
async function takeQuiz(quizId) {
  try {
    // Start quiz
    const attempt = await api.quiz.start(quizId);
    console.log("Quiz started:", attempt);

    // Submit answers
    const submission = await api.quiz.submit(quizId, {
      answers: [
        { questionId: 1, answer: "A" },
        { questionId: 2, answer: "B" }
      ]
    });
    console.log("Submitted:", submission);

    // Get results
    const results = await api.quiz.getResults(quizId);
    console.log("Results:", results);

    return results;
  } catch (err) {
    console.error("Error:", err);
  }
}

// ============================================================
// ERROR HANDLING
// ============================================================
// All API calls return promises, use .then().catch() or async/await

// Using async/await
async function getAdminStats() {
  try {
    const stats = await api.admin.getStats();
    console.log("Stats retrieved successfully:", stats);
    return stats;
  } catch (error) {
    console.error("Failed to get stats:", error.message);
    // Handle error - show toast, redirect, etc.
  }
}

// Using .then().catch()
api.student.getHistory()
  .then(history => console.log("Success:", history))
  .catch(error => console.log("Error:", error.message));

// ============================================================
// AUTHENTICATION
// ============================================================
// All API calls automatically include authentication headers
// The auth token is managed by the AuthContext and utils.js
// No need to manually set headers - they're added automatically

// ============================================================
// RESPONSE FORMAT
// ============================================================
// Successful responses contain the data directly:
// { id: 1, name: "Question", ... }

// Error responses throw an Error with status code:
// Error: 404 - Not Found
// Error: 401 - Unauthorized
// Error: 403 - Forbidden
// Error: 500 - Internal Server Error

export default {
  getAdminStats,
  takeQuiz
};
