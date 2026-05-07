# Copilot instructions for QuizSystemFrontWeb

## Build, test, and lint commands
- Start dev server (HMR): npm run dev  (runs `vite`)
- Build production bundle: npm run build  (runs `vite build`)
- Preview production build: npm run preview  (runs `vite preview`)
- Lint: npm run lint  (runs `eslint .`)
- Tests: No test runner or test scripts are configured in package.json. There is no single-test command to run — add a test framework (Jest, Vitest, etc.) and corresponding scripts to enable running individual tests.

## High-level architecture (big picture)
- Framework: React app built with Vite (entry: `index.html` -> `/src/main.jsx`).
- App structure (src/): organized into feature folders: `api`, `auth`, `components`, `pages`, `assets`, `files`, `styles`. Each top-level folder represents a domain or UI area — look in `src/` for the concrete implementations.
- Routing: Uses react-router-dom (v7) for client-side routing; pages live under `src/pages` and are mounted from `src/main.jsx`.
- HTTP: Uses axios for API calls. Vite dev server proxies `/Auth` requests to the backend at `http://localhost:7289/api` (see `vite.config.js`), so client code should call `/Auth/...` in development.
- Assets: Static assets referenced under `/src/assets` (example: `quizIcon.svg` referenced in `index.html`). Vite serves them by path (`/src/assets/...`) during dev and packs them at build.

## Key conventions and repository-specific patterns
- ESLint: Project uses a flat-config ESLint setup in `eslint.config.js`. Notes:
  - Files targeted: `**/*.{js,jsx}`.
  - Rule: `no-unused-vars` ignores symbols that match `^[A-Z_]` (commonly used to allow React components or constants to be declared but referenced indirectly).
  - `dist` is globally ignored.
- Proxy usage: Backend API requests for authentication go to the `/Auth` path and are proxied to `http://localhost:7289/api` in dev. Use `/Auth` base path in client code during local development.
- Module type: package.json sets `type: "module"` so use ES module syntax (import/export) in JS/JSX files.
- DevDependencies: Type declarations are present (`@types/react`, `@types/react-dom`) but source is JavaScript/JSX — TypeScript isn't enabled. Be careful when adding TypeScript: update configs and tooling.
- Plugins: Vite configured with `@vitejs/plugin-react` for fast refresh; keep plugin in sync when changing React setup.

## Files to check for changes when modifying core behavior
- Vite dev proxy and server behavior: `vite.config.js`
- App entry and routing: `src/main.jsx` and contents of `src/pages`
- API wrapper / HTTP layer: `src/api` (axios setup)
- ESLint rules: `eslint.config.js`

## Existing docs integrated
- This file consolidates the relevant parts of README.md (React + Vite template notes) and the repo package.json scripts and configurations.

---

If you want this file extended (for example, add recommended test setup, Playwright/Playwright test commands, or environment variable conventions), say which area to cover and Copilot sessions will include it.
