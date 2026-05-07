// ============================================================
// MOCK DATA — Replace with real API responses when USE_MOCK_DATA = false
// ============================================================
export const MOCK = {
  categories: [
    { id: 1, name: "Computer Science", description: "Algorithms, Data Structures, and Web Development", topics: 8, icon: "<>" },
    { id: 2, name: "Natural Sciences", description: "Biology, Chemistry, Physics, and Astronomy", topics: 6, icon: "⚗" },
    { id: 3, name: "Humanities", description: "History, Philosophy, Literature, and Arts", topics: 13, icon: "🌍" },
    { id: 4, name: "Design & Arts", description: "UI/UX Design, Graphic Design, and Fine Arts", topics: 5, icon: "✦" },
  ],

  recommended: [
    { id: 1, title: "Advanced Quantum Mechanics", category: "Physics", duration: "25 Min", level: "Advanced", color: "#6366f1" },
    { id: 2, title: "Ethical Hacking Intro", category: "Compiler", duration: "15 Min", level: "Intermediate", color: "#8b5cf6" },
    { id: 3, title: "Modern Architecture Basics", category: "Design", duration: "10 Min", level: "Easy", color: "#06b6d4" },
  ],

  quizQuestions: [
    {
      id: 1,
      text: "In React, what is the primary purpose of the 'useEffect' hook?",
      options: [
        "To manage local component state only",
        "To handle side effects like data fetching or manual DOM mutations",
        "To create a context for global state",
        "To optimize rendering performance of child components",
      ],
      correct: 1,
    },
    {
      id: 2,
      text: "Which hook is used to handle side effects in a functional React component?",
      options: ["useState", "useEffect", "useContext", "useReducer"],
      correct: 1,
    },
    {
      id: 3,
      text: "What does JSX stand for in React development?",
      options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JavaScript Extension"],
      correct: 0,
    },
    {
      id: 4,
      text: "What is the purpose of 'key' prop in React lists?",
      options: [
        "To style elements",
        "To help React identify which items have changed",
        "To bind event handlers",
        "To pass data between components",
      ],
      correct: 1,
    },
    {
      id: 5,
      text: "Can functional components have state in React?",
      options: ["No, only class components can", "Yes, using hooks like useState", "Only with Redux", "Only in React 18+"],
      correct: 1,
    },
  ],

  history: [
    { id: 1, name: "Introduction to Quantum Physics", category: "Science", date: "Oct 24, 2023", score: 85, time: "24m 12s", status: "passed" },
    { id: 2, name: "Ancient Roman History", category: "Humanities", date: "Oct 20, 2023", score: 62, time: "18m 45s", status: "failed" },
    { id: 3, name: "Advanced React Hooks", category: "Technology", date: "Oct 15, 2023", score: 92, time: "12m 30s", status: "passed" },
    { id: 4, name: "Macroeconomics 101", category: "Social Sciences", date: "Oct 13, 2023", score: 78, time: "35m 00s", status: "passed" },
    { id: 5, name: "Cellular Biology Basics", category: "Science", date: "Oct 05, 2023", score: 45, time: "20m 10s", status: "failed" },
    { id: 6, name: "Digital Marketing Fundamentals", category: "Business", date: "Sep 28, 2023", score: 88, time: "15m 55s", status: "passed" },
  ],

  adminQuestions: [
    { id: "Q-1001", text: "What is the primary function of the ASP.NET Core Middleware?", major: "Software Engineering", minor: "Web Dev", difficulty: "Medium", created: "2024-03-15" },
    { id: "Q-1002", text: "Explain the difference between IEnumerable and IQueryable in", major: "Computer Science", minor: "DotNet", difficulty: "Hard", created: "2024-03-12" },
    { id: "Q-1003", text: "Which HTTP method is used to update an existing resource?", major: "Software Engineering", minor: "REST API", difficulty: "Easy", created: "2024-03-10" },
    { id: "Q-1004", text: "Describe the Dependency Injection lifecycle: Scoped vs", major: "Software Engineering", minor: "Web Dev", difficulty: "Hard", created: "2024-03-08" },
    { id: "Q-1005", text: 'What does the "static" keyword do in a C# class definition?', major: "Computer Science", minor: "C# Basics", difficulty: "Easy", created: "2024-03-05" },
  ],

  adminGroups: [
    {
      id: 1,
      name: "Information Technology",
      quizzes: 124,
      subgroups: [
        { id: 11, name: "Web Development", quizzes: 36, items: ["React.js Fundamentals", "Advanced CSS & Tailwind", "TypeScript Integration"] },
        { id: 12, name: "Cloud Computing", quizzes: 28, items: ["AWS Practitioner", "Azure Fundamentals"] },
      ],
    },
    {
      id: 2,
      name: "Business Management",
      quizzes: 89,
      subgroups: [
        { id: 21, name: "Human Resources", quizzes: 22, items: ["Certified Recruitment", "Recruitment Strategies"] },
        { id: 22, name: "Finance & Accounting", quizzes: 31, items: ["Tax Compliance 2024", "Corporate Audit Basics"] },
      ],
    },
  ],

  adminActivity: [
    { id: 1, user: "Sarah Jenkins", action: "completed quiz", subject: "Cybersecurity Basics", time: "5 mins ago", type: "complete" },
    { id: 2, user: "Michael Chen", action: "updated question", subject: "React hooks Advanced", time: "38 mins ago", type: "edit" },
    { id: 3, user: "Grace William", action: "reported issue", subject: "Nodejs Architecture", time: "1 hour ago", type: "report" },
    { id: 4, user: "Daniel Smith", action: "created group", subject: "G3 Onboarding", time: "3 hours ago", type: "create" },
  ],

  participationTrend: [300, 180, 250, 370, 320, 290, 260],
  scoreTrend: [75, 72, 78, 82, 79, 80, 77],

  questionDistribution: [
    { label: "Technical", value: 450, color: "#6366f1" },
    { label: "Soft Skills", value: 300, color: "#8b5cf6" },
    { label: "Compliance", value: 150, color: "#06b6d4" },
    { label: "Product", value: 100, color: "#f472b6" },
  ],
};
