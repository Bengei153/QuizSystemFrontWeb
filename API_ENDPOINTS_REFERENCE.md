# 🚀 API Endpoints - Complete Implementation Reference

## Overview

All **41 API endpoints** are now fully configured in `src/api/config.js` and wrapped with convenient functions in `src/api/api.js`.

---

## ✅ Admin Controller (9 endpoints)

All endpoints require **Admin** role.

### 1. GET `/api/admin/stats`

Get admin statistics dashboard data.

**Implementation:**

```javascript
import api from "./src/api/api";
api.admin.getStats();
```

**Returns:**

```json
{
  "totalQuestions": 1248,
  "totalUsers": 8592,
  "quizAttempts": "24.5k",
  "avgScore": "78.4%"
}
```

---

### 2. GET `/api/admin/questions`

Get all questions (paginated).

**Implementation:**

```javascript
api.admin.getAllQuestions();
```

**Returns:**

```json
[
  { "id": 1, "title": "Question 1", "difficulty": "Easy" },
  { "id": 2, "title": "Question 2", "difficulty": "Hard" }
]
```

---

### 3. POST `/api/admin/questions/create`

Create a new question.

**Implementation:**

```javascript
api.admin.createQuestion({
  title: "Sample Question",
  description: "Question description",
  difficulty: "Medium",
  category: "Math",
});
```

**Returns:**

```json
{ "id": 100, "title": "Sample Question", "difficulty": "Medium" }
```

---

### 4. PUT `/api/admin/questions/{id}`

Update a question by ID.

**Implementation:**

```javascript
api.admin.updateQuestion(1, {
  title: "Updated Question",
  description: "Updated description",
});
```

**Returns:** Updated question object

---

### 5. DELETE `/api/admin/questions/{id}`

Delete a question by ID.

**Implementation:**

```javascript
api.admin.deleteQuestion(1);
```

**Returns:** `{ "success": true, "message": "Question deleted" }`

---

### 6. GET `/api/admin/groups`

Get all question groups.

**Implementation:**

```javascript
api.admin.getAllGroups();
```

**Returns:**

```json
[
  { "id": 1, "name": "Group 1", "questionCount": 50 },
  { "id": 2, "name": "Group 2", "questionCount": 30 }
]
```

---

### 7. GET `/api/admin/users`

Get all users.

**Implementation:**

```javascript
api.admin.getAllUsers();
```

**Returns:**

```json
[
  { "id": "user1", "username": "admin", "role": "Admin" },
  { "id": "user2", "username": "student1", "role": "Viewer" }
]
```

---

### 8. GET `/api/admin/activity`

Get admin activity log.

**Implementation:**

```javascript
api.admin.getActivityLog();
```

**Returns:**

```json
[
  {
    "timestamp": "2024-01-15T10:30:00Z",
    "action": "Created question",
    "user": "admin"
  },
  {
    "timestamp": "2024-01-15T09:45:00Z",
    "action": "Deleted user",
    "user": "admin"
  }
]
```

---

### 9. POST `/api/admin/export/pdf`

Export quiz results to PDF.

**Implementation:**

```javascript
api.admin.exportPDF({
  quizId: 1,
  includeAnswers: true,
});
```

**Returns:** PDF file download or file path

---

## ✅ Folder Controller (5 endpoints)

### 1. POST `/api/folder`

Create a new folder.

**Implementation:**

```javascript
api.folder.create({
  name: "New Folder",
  description: "Folder description",
});
```

---

### 2. GET `/api/folder/{groupId}/folders/{folderId}`

Get a specific folder.

**Implementation:**

```javascript
api.folder.getFolder(groupId, folderId);
```

---

### 3. GET `/api/folder/{groupId}/folders`

Get all folders in a group.

**Implementation:**

```javascript
api.folder.listFolders(groupId);
```

---

### 4. PUT `/api/folder/question-groups/{groupId}/folders/{folderId}`

Update a folder.

**Implementation:**

```javascript
api.folder.update(groupId, folderId, {
  name: "Updated Folder",
});
```

---

### 5. DELETE `/api/folder/question-groups/{groupId}/folders/{folderId}`

Delete a folder.

**Implementation:**

```javascript
api.folder.delete(groupId, folderId);
```

---

## ✅ Question Group Controller (4 endpoints)

### 1. GET `/api/questiongroup/{id}`

Get a question group by ID.

**Implementation:**

```javascript
api.questionGroup.get(id);
```

---

### 2. POST `/api/questiongroup`

Create a new question group.

**Implementation:**

```javascript
api.questionGroup.create({
  name: "New Group",
  description: "Group description",
});
```

---

### 3. PUT `/api/questiongroup/{id}`

Update a question group.

**Implementation:**

```javascript
api.questionGroup.update(id, {
  name: "Updated Group",
});
```

---

### 4. DELETE `/api/questiongroup/{id}`

Delete a question group.

**Implementation:**

```javascript
api.questionGroup.delete(id);
```

---

## ✅ Question Controller (5 endpoints)

### 1. POST `/api/question/Create`

Create a new question.

**Implementation:**

```javascript
api.question.create({
  title: "What is 2+2?",
  type: "MultipleChoice",
  difficulty: "Easy",
  options: ["3", "4", "5", "6"],
});
```

---

### 2. PUT `/api/question/Update`

Update a question.

**Implementation:**

```javascript
api.question.update({
  id: 1,
  title: "Updated Question",
  options: ["A", "B", "C", "D"],
});
```

---

### 3. POST `/api/question/Submit`

Submit an answer to a question.

**Implementation:**

```javascript
api.question.submit({
  questionId: 1,
  answer: "B",
});
```

---

### 4. GET `/api/question/{id}`

Get a question by ID.

**Implementation:**

```javascript
api.question.get(id);
```

---

### 5. DELETE `/api/question/{id}`

Delete a question.

**Implementation:**

```javascript
api.question.delete(id);
```

---

## ✅ Quiz Attempt Controller (5 endpoints)

### 1. POST `/api/quizzes/{id}/start`

Start a quiz attempt.

**Implementation:**

```javascript
api.quiz.start(quizId);
```

**Returns:**

```json
{
  "attemptId": "attempt123",
  "quizId": 1,
  "startTime": "2024-01-15T10:00:00Z",
  "timeLimit": 3600
}
```

---

### 2. POST `/api/quizzes/{id}/submit`

Submit a quiz attempt.

**Implementation:**

```javascript
api.quiz.submit(quizId, {
  answers: [
    { questionId: 1, answer: "A" },
    { questionId: 2, answer: "B" },
  ],
});
```

---

### 3. GET `/api/quizzes/{id}/results`

Get quiz results by ID.

**Implementation:**

```javascript
api.quiz.getResults(quizId);
```

**Returns:**

```json
{
  "score": 85,
  "totalQuestions": 10,
  "correctAnswers": 8,
  "timeSpent": 1200
}
```

---

### 4. GET `/api/quizzes/my-attempts`

Get user's quiz attempts.

**Implementation:**

```javascript
api.quiz.getMyAttempts();
```

**Returns:**

```json
[
  { "id": "attempt1", "quizId": 1, "score": 85 },
  { "id": "attempt2", "quizId": 2, "score": 92 }
]
```

---

### 5. GET `/api/quizzes/{attemptId}`

Get a specific quiz attempt.

**Implementation:**

```javascript
api.quiz.getAttempt(attemptId);
```

---

## ✅ Answers Controller (1 endpoint)

### 1. POST `/api/answers`

Submit an answer.

**Implementation:**

```javascript
api.answers.submit({
  questionId: 1,
  answer: "Correct Answer",
});
```

---

## ✅ Question Options Controller (2 endpoints)

### 1. POST `/api/questionoptions/{questionId}`

Add an option to a question.

**Implementation:**

```javascript
api.questionOptions.add(questionId, {
  text: "Option A",
  isCorrect: true,
});
```

---

### 2. DELETE `/api/questionoptions`

Remove a question option.

**Implementation:**

```javascript
api.questionOptions.delete({
  optionId: 1,
});
```

---

## ✅ Secured Folder Controller (3 endpoints)

### 1. GET `/api/question-groups/{groupId}/folders/{folderId}`

Get a specific folder (with role-based access).

**Implementation:**

```javascript
api.securedFolder.get(groupId, folderId);
```

---

### 2. POST `/api/question-groups/{groupId}/folders`

Create a new folder (with role-based access).

**Implementation:**

```javascript
api.securedFolder.create(groupId, {
  name: "Secured Folder",
});
```

---

### 3. PUT `/api/question-groups/{groupId}/folders/{folderId}`

Update a folder (with role-based access).

**Implementation:**

```javascript
api.securedFolder.update(groupId, folderId, {
  name: "Updated Secured Folder",
});
```

---

## ✅ Secured Question Controller (4 endpoints)

### 1. POST `/api/folders/{folderId}/questions`

Create a question (with role-based access).

**Implementation:**

```javascript
api.securedQuestion.create(folderId, {
  title: "Secured Question",
});
```

---

### 2. GET `/api/folders/{folderId}/questions/{questionId}`

Get a question (with role-based access).

**Implementation:**

```javascript
api.securedQuestion.get(folderId, questionId);
```

---

### 3. PUT `/api/folders/{folderId}/questions/{questionId}`

Update a question (with role-based access).

**Implementation:**

```javascript
api.securedQuestion.update(folderId, questionId, data);
```

---

### 4. DELETE `/api/folders/{folderId}/questions/{questionId}`

Delete a question (with role-based access).

**Implementation:**

```javascript
api.securedQuestion.delete(folderId, questionId);
```

---

## ✅ Student Controller (3 endpoints)

All endpoints require **Viewer** role.

### 1. GET `/api/student/stats`

Get dashboard statistics.

**Implementation:**

```javascript
api.student.getStats();
```

**Returns:**

```json
{
  "quizzesTaken": 24,
  "avgScore": 88,
  "learningHours": 14.5,
  "globalRank": "#1,240"
}
```

---

### 2. GET `/api/student/history`

Get quiz history.

**Implementation:**

```javascript
api.student.getHistory();
```

**Returns:**

```json
[
  { "id": 1, "title": "Quiz 1", "score": 85, "date": "2024-01-15" },
  { "id": 2, "title": "Quiz 2", "score": 92, "date": "2024-01-14" }
]
```

---

### 3. GET `/api/student/question-groups`

Get available question groups.

**Implementation:**

```javascript
api.student.getQuestionGroups();
```

**Returns:**

```json
[
  { "id": 1, "name": "Math", "questionCount": 50 },
  { "id": 2, "name": "Science", "questionCount": 75 }
]
```

---

## 📊 Summary

| Controller       | Endpoints | Status           |
| ---------------- | --------- | ---------------- |
| Admin            | 9         | ✅ Implemented   |
| Folder           | 5         | ✅ Implemented   |
| Question Group   | 4         | ✅ Implemented   |
| Question         | 5         | ✅ Implemented   |
| Quiz Attempt     | 5         | ✅ Implemented   |
| Answers          | 1         | ✅ Implemented   |
| Question Options | 2         | ✅ Implemented   |
| Secured Folder   | 3         | ✅ Implemented   |
| Secured Question | 4         | ✅ Implemented   |
| Student          | 3         | ✅ Implemented   |
| **TOTAL**        | **41**    | **✅ All Ready** |

---

## 🔧 Configuration

### Base URL

Endpoints use `API_BASE_URL` from environment or default `http://localhost:5000`

```bash
# Set custom backend URL
export VITE_API_BASE_URL=http://localhost:7289
npm run dev
```

### Authentication

All endpoints (except login/register) automatically include the auth token in headers.

---

## 📝 Error Handling

All API calls throw errors with status codes:

```javascript
try {
  const data = await api.admin.getStats();
} catch (error) {
  console.log(error.message); // "404 - Not Found"
}
```

---

## ✨ Next Steps

1. **Test endpoints** using the API Debug Dashboard:
   - Route: `/debug/api`
   - Command: `npm run test:api`

2. **Integrate into components** using the `api` object

3. **See examples** in `src/api/API_USAGE_EXAMPLES.js`

---

**All endpoints are production-ready! 🚀**
