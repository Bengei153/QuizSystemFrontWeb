import { theme } from "../api/config";

// ============================================================
// GLOBAL CSS — Injected via <style> tag in App.jsx
// Edit variables at the top of config.js to change colors globally
// ============================================================
export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: ${theme.bg}; color: ${theme.text}; }
  .qw-app { min-height: 100vh; }

  /* ---- Login ---- */
  .login-wrap { display: flex; min-height: 100vh; }
  .login-left {
    flex: 1; background: linear-gradient(135deg, #5B5FED 0%, #4547C7 60%, #312a9e 100%);
    padding: 48px; display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden;
  }
  .login-left::before {
    content: ''; position: absolute; top: -80px; right: -80px;
    width: 320px; height: 320px; border-radius: 50%;
    background: rgba(255,255,255,0.06); pointer-events: none;
  }
  .login-left::after {
    content: '✦'; position: absolute; bottom: 80px; right: 60px;
    font-size: 120px; color: rgba(255,255,255,0.06); pointer-events: none;
  }
  .login-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 48px; }
  .login-logo-icon {
    width: 36px; height: 36px; border-radius: 50%; background: rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center; color: white; font-size: 16px;
  }
  .login-logo-name { color: white; font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; }
  .login-hero-title { color: white; font-family: 'Syne', sans-serif; font-size: 32px; font-weight: 800; line-height: 1.2; margin-bottom: 16px; }
  .login-hero-accent { color: ${theme.accent}; }
  .login-hero-sub { color: rgba(255,255,255,0.75); font-size: 14px; line-height: 1.6; margin-bottom: 48px; max-width: 320px; }
  .login-badges { display: flex; gap: 12px; }
  .login-badge {
    background: rgba(255,255,255,0.12); border-radius: 12px; padding: 12px 18px;
    color: white; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px;
  }
  .login-right {
    width: 440px; background: white; padding: 48px 40px; display: flex; flex-direction: column; justify-content: center;
  }
  .login-right h2 { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; margin-bottom: 6px; }
  .login-right p { color: ${theme.textMuted}; font-size: 14px; margin-bottom: 28px; }
  .tab-row { display: flex; border: 1px solid ${theme.border}; border-radius: 8px; overflow: hidden; margin-bottom: 28px; }
  .tab-btn { flex: 1; padding: 10px; border: none; cursor: pointer; font-size: 14px; font-weight: 500; transition: all .2s; background: white; color: ${theme.textMuted}; }
  .tab-btn.active { background: ${theme.purple}; color: white; }
  .form-field { margin-bottom: 16px; }
  .form-input {
    width: 100%; padding: 11px 14px; border: 1px solid ${theme.border}; border-radius: 8px;
    font-size: 14px; font-family: inherit; outline: none; transition: border-color .2s; color: ${theme.text};
  }
  .form-input:focus { border-color: ${theme.purple}; }
  .form-row-inline { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .toggle-wrap { display: flex; align-items: center; gap: 8px; font-size: 13px; color: ${theme.textMuted}; }
  .toggle {
    width: 36px; height: 20px; border-radius: 10px; background: #d1d5db; border: none; cursor: pointer;
    position: relative; transition: background .2s;
  }
  .toggle.on { background: ${theme.purple}; }
  .toggle::after {
    content: ''; position: absolute; top: 3px; left: 3px; width: 14px; height: 14px;
    border-radius: 50%; background: white; transition: transform .2s;
  }
  .toggle.on::after { transform: translateX(16px); }
  .link { color: ${theme.purple}; text-decoration: none; font-size: 13px; font-weight: 500; cursor: pointer; }
  .btn-primary {
    width: 100%; padding: 13px; background: ${theme.purple}; color: white; border: none;
    border-radius: 10px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit;
    transition: background .2s; display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .btn-primary:hover { background: ${theme.purpleDark}; }
  .divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; color: ${theme.textMuted}; font-size: 12px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: ${theme.border}; }
  .social-row { display: flex; gap: 12px; }
  .btn-social {
    flex: 1; padding: 11px; border: 1px solid ${theme.border}; border-radius: 8px; background: white;
    cursor: pointer; font-size: 13px; font-weight: 500; display: flex; align-items: center;
    justify-content: center; gap: 8px; transition: border-color .2s; font-family: inherit;
  }
  .btn-social:hover { border-color: ${theme.purple}; }
  .login-footer { text-align: center; margin-top: 24px; font-size: 13px; color: ${theme.textMuted}; }
  .login-copy { text-align: center; margin-top: 40px; font-size: 11px; color: #9ca3af; }
  .form-error { margin-top: 12px; color: ${theme.danger}; font-size: 13px; }
  .form-success { margin-top: 12px; color: ${theme.success}; font-size: 13px; }

  /* ---- Layout ---- */
  .layout { display: flex; min-height: 100vh; }
  .sidebar {
    width: 200px; background: white; border-right: 1px solid ${theme.border};
    display: flex; flex-direction: column; padding: 20px 0; position: fixed; top: 0; bottom: 0; left: 0; z-index: 50;
  }
  .sidebar-logo { display: flex; align-items: center; gap: 8px; padding: 0 20px 24px; }
  .sidebar-logo-icon { width: 28px; height: 28px; background: ${theme.purple}; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .sidebar-logo-name { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; }
  .sidebar-nav { flex: 1; }
  .sidebar-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 20px; cursor: pointer;
    font-size: 13px; font-weight: 500; color: ${theme.textMuted}; transition: all .15s;
  }
  .sidebar-item:hover { color: ${theme.purple}; background: ${theme.purpleLight}; }
  .sidebar-item.active { color: ${theme.purple}; background: ${theme.purpleLight}; border-right: 2px solid ${theme.purple}; }
  .sidebar-bottom { padding: 0 20px 20px; }
  .sidebar-btn {
    display: flex; align-items: center; gap: 8px; padding: 8px 0; cursor: pointer;
    font-size: 13px; color: ${theme.textMuted}; background: none; border: none; font-family: inherit; width: 100%;
  }
  .sidebar-btn:hover { color: ${theme.danger}; }
  .main { margin-left: 200px; flex: 1; display: flex; flex-direction: column; }
  .topbar {
    position: sticky; top: 0; background: white; border-bottom: 1px solid ${theme.border};
    padding: 0 28px; height: 56px; display: flex; align-items: center; justify-content: space-between; z-index: 40;
  }
  .topbar-left { display: flex; align-items: center; gap: 16px; }
  .topbar-search {
    display: flex; align-items: center; gap: 8px; background: ${theme.bg}; border: 1px solid ${theme.border};
    border-radius: 8px; padding: 7px 12px; width: 260px;
  }
  .topbar-search input { border: none; background: none; font-size: 13px; outline: none; flex: 1; font-family: inherit; color: ${theme.text}; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .avatar {
    width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, ${theme.purple}, #8b5cf6);
    display: flex; align-items: center; justify-content: center; color: white; font-size: 13px; font-weight: 700; cursor: pointer;
  }
  .icon-btn {
    width: 34px; height: 34px; border-radius: 8px; background: ${theme.bg}; border: 1px solid ${theme.border};
    display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 15px;
  }
  .page-content { padding: 28px; flex: 1; }

  /* ---- Shared Buttons ---- */
  .btn-row { display: flex; gap: 12px; }
  .btn-sm {
    padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; border: none; transition: all .2s;
  }
  .btn-purple { background: ${theme.purple}; color: white; }
  .btn-purple:hover { background: ${theme.purpleDark}; }
  .btn-outline { background: white; color: ${theme.text}; border: 1px solid ${theme.border}; }
  .btn-outline:hover { border-color: ${theme.purple}; color: ${theme.purple}; }
  .btn-add { display: flex; align-items: center; gap: 8px; padding: 10px 18px; background: ${theme.purple}; color: white; border: none; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background .2s; }
  .btn-add:hover { background: ${theme.purpleDark}; }
  .btn-export { display: flex; align-items: center; gap: 6px; padding: 9px 14px; border: 1px solid ${theme.border}; background: white; border-radius: 8px; font-size: 13px; cursor: pointer; font-family: inherit; }

  /* ---- Shared UI ---- */
  .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .page-header h1 { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; }
  .page-header p { font-size: 13px; color: ${theme.textMuted}; margin-top: 3px; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 4px; }
  .section-sub { font-size: 13px; color: ${theme.textMuted}; margin-bottom: 16px; }
  .breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 13px; color: ${theme.textMuted}; margin-bottom: 8px; }
  .breadcrumb a { color: ${theme.textMuted}; text-decoration: none; cursor: pointer; }
  .breadcrumb a:hover { color: ${theme.purple}; }
  .breadcrumb-sep { font-size: 10px; }
  .notif-dot { width: 8px; height: 8px; background: ${theme.danger}; border-radius: 50%; position: absolute; top: -2px; right: -2px; }
  .user-info { text-align: right; }
  .user-info-name { font-size: 13px; font-weight: 600; }
  .user-info-role { font-size: 11px; color: ${theme.textMuted}; }
  .pill { padding: 3px 8px; border-radius: 100px; background: ${theme.bg}; font-size: 11px; font-weight: 500; }
  .pill-green { background: #d1fae5; color: #059669; }
  .pill-yellow { background: #fef3c7; color: #d97706; }
  .pill-red { background: #fee2e2; color: #dc2626; }
  .filter-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
  .search-box {
    flex: 1; display: flex; align-items: center; gap: 8px; background: white; border: 1px solid ${theme.border};
    border-radius: 8px; padding: 9px 14px;
  }
  .search-box input { border: none; background: none; font-size: 13px; outline: none; flex: 1; font-family: inherit; color: ${theme.text}; }
  .filter-chip { padding: 9px 14px; border: 1px solid ${theme.border}; border-radius: 8px; background: white; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 6px; font-family: inherit; }
  .score-num { font-family: 'Syne',sans-serif; font-weight: 800; }
  .score-high { color: #059669; }
  .score-mid { color: #d97706; }
  .score-low { color: #dc2626; }
  .diff-badge { padding: 3px 9px; border-radius: 100px; font-size: 11px; font-weight: 600; }
  .diff-easy { background: #d1fae5; color: #059669; }
  .diff-medium { background: #fef3c7; color: #d97706; }
  .diff-hard { background: #fee2e2; color: #dc2626; }
  .table-wrap { background: white; border: 1px solid ${theme.border}; border-radius: 14px; overflow: hidden; }
  table { width: 100%; border-collapse: collapse; }
  thead th { padding: 13px 18px; text-align: left; font-size: 12px; font-weight: 600; color: ${theme.textMuted}; border-bottom: 1px solid ${theme.border}; background: ${theme.bg}; }
  tbody td { padding: 13px 18px; font-size: 13px; border-bottom: 1px solid ${theme.border}; }
  tbody tr:last-child td { border-bottom: none; }
  tbody tr:hover { background: ${theme.bg}; }
  .status-pill { padding: 4px 10px; border-radius: 100px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; gap: 4px; }
  .status-passed { background: #d1fae5; color: #059669; }
  .status-failed { background: #fee2e2; color: #dc2626; }
  .table-footer { padding: 14px 18px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid ${theme.border}; }
  .pagination { display: flex; gap: 4px; align-items: center; }
  .page-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid ${theme.border}; background: white; cursor: pointer; font-size: 13px; display: flex; align-items: center; justify-content: center; }
  .page-btn.active { background: ${theme.purple}; color: white; border-color: ${theme.purple}; }
  .table-action { padding: 5px 10px; border: none; border-radius: 6px; cursor: pointer; font-size: 11px; background: ${theme.bg}; color: ${theme.textMuted}; }
  .table-action:hover { background: ${theme.purpleLight}; color: ${theme.purple}; }
  .pro-tip { background: #eef0ff; border-radius: 10px; padding: 14px 18px; font-size: 13px; color: ${theme.purple}; margin-top: 16px; display: flex; align-items: center; gap: 8px; }

  /* ---- Dashboard ---- */
  .dash-banner {
    background: linear-gradient(135deg, #EEF0FF 0%, #F5F0FF 100%); border-radius: 16px;
    padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px;
  }
  .dash-banner-title { font-family: 'Syne', sans-serif; font-size: 24px; font-weight: 800; margin-bottom: 6px; }
  .dash-banner-sub { color: ${theme.textMuted}; font-size: 13px; margin-bottom: 20px; }
  .stat-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .stat-card { background: white; border: 1px solid ${theme.border}; border-radius: 12px; padding: 16px 18px; }
  .stat-card-label { font-size: 12px; color: ${theme.textMuted}; margin-bottom: 6px; display: flex; align-items: center; gap: 6px; }
  .stat-card-value { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; }
  .category-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 32px; }
  .category-card {
    background: white; border: 1px solid ${theme.border}; border-radius: 14px; padding: 20px; cursor: pointer;
    transition: all .2s;
  }
  .category-card:hover { border-color: ${theme.purple}; box-shadow: 0 4px 16px rgba(91,95,237,0.1); transform: translateY(-2px); }
  .category-icon { font-size: 24px; margin-bottom: 12px; display: block; }
  .category-name { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 4px; }
  .category-desc { font-size: 11px; color: ${theme.textMuted}; margin-bottom: 12px; line-height: 1.4; }
  .category-meta { font-size: 11px; color: ${theme.purple}; font-weight: 600; }
  .rec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
  .rec-card { background: white; border: 1px solid ${theme.border}; border-radius: 14px; overflow: hidden; cursor: pointer; transition: all .2s; }
  .rec-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); transform: translateY(-2px); }
  .rec-card-top { height: 6px; }
  .rec-card-body { padding: 16px; }
  .rec-card-cat { font-size: 11px; color: ${theme.textMuted}; font-weight: 500; margin-bottom: 6px; text-transform: uppercase; letter-spacing: .04em; }
  .rec-card-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 12px; }
  .rec-card-meta { display: flex; gap: 12px; font-size: 12px; color: ${theme.textMuted}; margin-bottom: 14px; }

  /* ---- Quiz ---- */
  .progress-bar-wrap { background: #e5e7eb; border-radius: 100px; height: 6px; margin-bottom: 8px; }
  .progress-bar-fill { height: 100%; border-radius: 100px; background: ${theme.purple}; transition: width .4s; }
  .quiz-q-num { font-size: 12px; color: ${theme.textMuted}; font-weight: 500; margin-bottom: 12px; }
  .quiz-q-text { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; line-height: 1.35; margin-bottom: 28px; }
  .quiz-options { display: flex; flex-direction: column; gap: 12px; margin-bottom: 28px; }
  .quiz-option {
    padding: 14px 18px; border: 1.5px solid ${theme.border}; border-radius: 12px; cursor: pointer;
    display: flex; align-items: center; gap: 14px; transition: all .15s; font-size: 14px; background: white;
  }
  .quiz-option:hover { border-color: ${theme.purple}; background: ${theme.purpleLight}; }
  .quiz-option.selected { border-color: ${theme.purple}; background: ${theme.purpleLight}; }
  .quiz-option-letter {
    width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid ${theme.border};
    display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 600;
    flex-shrink: 0; transition: all .15s;
  }
  .quiz-option.selected .quiz-option-letter { border-color: ${theme.purple}; background: ${theme.purple}; color: white; }
  .quiz-nav-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .quiz-nav-box { background: white; border: 1px solid ${theme.border}; border-radius: 12px; padding: 16px; }
  .quiz-nav-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 12px; }
  .quiz-nav-num {
    width: 32px; height: 32px; border-radius: 8px; border: 1px solid ${theme.border};
    display: flex; align-items: center; justify-content: center; font-size: 12px; cursor: pointer;
    font-weight: 500; transition: all .15s;
  }
  .quiz-nav-num.answered { background: ${theme.purple}; color: white; border-color: ${theme.purple}; }
  .quiz-nav-num.current { border-color: ${theme.purple}; color: ${theme.purple}; font-weight: 700; }
  .quiz-timer { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: ${theme.textMuted}; }
  .quiz-timer-red { color: ${theme.danger}; }
  .quiz-topbar {
    position: sticky; top: 56px; background: white; border-bottom: 1px solid ${theme.border};
    padding: 10px 28px; display: flex; align-items: center; justify-content: space-between; z-index: 30;
  }
  .quiz-layout { display: grid; grid-template-columns: 1fr 220px; gap: 24px; }

  /* ---- Results ---- */
  .results-card { background: white; border: 1px solid ${theme.border}; border-radius: 16px; padding: 32px; margin-bottom: 24px; }
  .results-badge { display: inline-block; background: ${theme.purpleLight}; color: ${theme.purple}; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px; text-transform: uppercase; letter-spacing: .06em; margin-bottom: 12px; }
  .results-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; margin-bottom: 20px; }
  .score-ring { position: relative; width: 96px; height: 96px; }
  .score-ring svg { transform: rotate(-90deg); }
  .score-ring-val { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; }
  .results-meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 20px; }
  .results-meta-label { font-size: 11px; color: ${theme.textMuted}; margin-bottom: 4px; display: flex; align-items: center; gap: 4px; }
  .results-meta-val { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; }
  .results-actions { display: flex; gap: 12px; margin-top: 24px; }
  .review-list { display: flex; flex-direction: column; gap: 10px; }
  .review-item { border: 1px solid ${theme.border}; border-radius: 10px; overflow: hidden; cursor: pointer; }
  .review-item-header { padding: 14px 18px; display: flex; align-items: center; gap: 12px; font-size: 13px; }
  .review-item-icon { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; flex-shrink: 0; }
  .review-item-icon.correct { background: #d1fae5; color: #059669; }
  .review-item-icon.wrong { background: #fee2e2; color: #dc2626; }
  .review-item-icon.neutral { background: ${theme.bg}; color: ${theme.textMuted}; }
  .review-item-body { padding: 0 18px 16px 52px; }
  .review-answer-row { display: flex; gap: 10px; margin-bottom: 8px; }
  .review-answer { padding: 6px 12px; border-radius: 8px; font-size: 12px; }
  .review-answer.wrong-ans { background: #fee2e2; color: #dc2626; }
  .review-answer.correct-ans { background: #d1fae5; color: #059669; }
  .review-explain { font-size: 12px; color: ${theme.textMuted}; line-height: 1.5; }
  .results-cta { background: linear-gradient(135deg, #EEF0FF, #F5F0FF); border-radius: 12px; padding: 24px; text-align: center; }

  /* ---- History ---- */
  .history-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
  .history-stat { background: white; border: 1px solid ${theme.border}; border-radius: 12px; padding: 18px 20px; display: flex; align-items: center; gap: 14px; }
  .history-stat-icon { width: 40px; height: 40px; border-radius: 10px; background: ${theme.purpleLight}; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .history-stat-label { font-size: 12px; color: ${theme.textMuted}; }
  .history-stat-val { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; }
  .history-stat-sub { font-size: 11px; color: ${theme.success}; font-weight: 500; }
  .history-cta { background: linear-gradient(135deg, #EEF0FF, #F5F0FF); border-radius: 12px; padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; margin-top: 24px; }
  .history-cta h3 { font-family: 'Syne',sans-serif; font-size: 17px; font-weight: 700; margin-bottom: 6px; }
  .history-cta p { font-size: 13px; color: ${theme.textMuted}; }

  /* ---- Admin Dashboard ---- */
  .admin-stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .admin-stat { background: white; border: 1px solid ${theme.border}; border-radius: 12px; padding: 18px; }
  .admin-stat-label { font-size: 12px; color: ${theme.textMuted}; margin-bottom: 6px; display: flex; align-items: center; justify-content: space-between; }
  .admin-stat-change { font-size: 11px; font-weight: 600; }
  .change-up { color: ${theme.success}; }
  .change-down { color: ${theme.danger}; }
  .admin-stat-val { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; }
  .admin-charts-row { display: grid; grid-template-columns: 1fr 260px; gap: 20px; margin-bottom: 24px; }
  .chart-card { background: white; border: 1px solid ${theme.border}; border-radius: 14px; padding: 22px; }
  .chart-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 4px; }
  .chart-sub { font-size: 12px; color: ${theme.textMuted}; margin-bottom: 16px; }
  .chart-path { fill: none; stroke: ${theme.purple}; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  .chart-path-area { fill: url(#chartGrad); opacity: 0.18; }
  .chart-path-score { fill: none; stroke: ${theme.accent}; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 4 3; }
  .donut-legend { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; }
  .donut-legend-item { display: flex; align-items: center; justify-content: space-between; font-size: 12px; }
  .donut-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .admin-bottom-row { display: grid; grid-template-columns: 260px 1fr; gap: 20px; }
  .quick-mgmt { background: white; border: 1px solid ${theme.border}; border-radius: 14px; padding: 22px; }
  .quick-mgmt-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 14px; }
  .quick-btn {
    width: 100%; padding: 11px 14px; border-radius: 10px; border: none; cursor: pointer; font-size: 13px; font-weight: 600;
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-family: inherit; transition: all .2s;
  }
  .quick-btn-primary { background: ${theme.purple}; color: white; }
  .quick-btn-primary:hover { background: ${theme.purpleDark}; }
  .quick-btn-outline { background: white; border: 1px solid ${theme.border}; color: ${theme.text}; }
  .quick-btn-outline:hover { border-color: ${theme.purple}; color: ${theme.purple}; }
  .quick-status { background: #d1fae5; border-radius: 10px; padding: 11px 14px; font-size: 12px; color: #059669; display: flex; align-items: center; gap: 8px; margin-top: 14px; }
  .activity-card { background: white; border: 1px solid ${theme.border}; border-radius: 14px; padding: 22px; }
  .activity-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .activity-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; border-bottom: 1px solid ${theme.border}; }
  .activity-item:last-child { border-bottom: none; }
  .activity-avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, ${theme.purple}, #8b5cf6); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 700; flex-shrink: 0; }
  .activity-body { flex: 1; }
  .activity-name { font-size: 13px; font-weight: 600; }
  .activity-desc { font-size: 12px; color: ${theme.textMuted}; }
  .activity-time { font-size: 11px; color: ${theme.textMuted}; }
  .activity-badge { font-size: 10px; padding: 2px 8px; border-radius: 100px; font-weight: 600; }
  .badge-complete { background: #d1fae5; color: #059669; }
  .badge-edit { background: ${theme.purpleLight}; color: ${theme.purple}; }
  .badge-report { background: #fee2e2; color: #dc2626; }
  .badge-create { background: #e0f2fe; color: #0369a1; }

  /* ---- Admin Questions / Create ---- */
  .filter-row { display: grid; grid-template-columns: 240px repeat(3, 1fr); gap: 12px; background: white; border: 1px solid ${theme.border}; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
  .filter-label { font-size: 11px; color: ${theme.textMuted}; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; margin-bottom: 6px; }
  .filter-input { width: 100%; padding: 8px 10px; border: 1px solid ${theme.border}; border-radius: 8px; font-size: 13px; outline: none; font-family: inherit; }
  .filter-input:focus { border-color: ${theme.purple}; }
  .form-section { background: white; border: 1px solid ${theme.border}; border-radius: 14px; padding: 24px; margin-bottom: 20px; }
  .form-section-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
  .form-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .form-label { font-size: 12px; font-weight: 600; color: ${theme.textMuted}; margin-bottom: 6px; display: block; }
  .form-select { width: 100%; padding: 10px 12px; border: 1px solid ${theme.border}; border-radius: 8px; font-size: 13px; font-family: inherit; outline: none; appearance: none; background: white url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E") no-repeat right 12px center; }
  .form-select:focus { border-color: ${theme.purple}; }
  .form-textarea { width: 100%; padding: 12px; border: 1px solid ${theme.border}; border-radius: 8px; font-size: 13px; font-family: inherit; outline: none; min-height: 100px; resize: vertical; line-height: 1.5; }
  .form-textarea:focus { border-color: ${theme.purple}; }
  .char-count { font-size: 11px; color: ${theme.textMuted}; text-align: right; margin-top: 4px; }
  .add-image-btn { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; color: ${theme.purple}; cursor: pointer; border: none; background: none; font-family: inherit; padding: 6px 0; }
  .answer-option { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .answer-letter { width: 28px; height: 28px; border-radius: 50%; background: ${theme.bg}; border: 1px solid ${theme.border}; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: ${theme.textMuted}; flex-shrink: 0; }
  .answer-input-wrap { flex: 1; position: relative; }
  .answer-label { position: absolute; top: 0; left: 10px; font-size: 10px; color: ${theme.textMuted}; font-weight: 600; transform: translateY(-50%); background: white; padding: 0 4px; }
  .answer-input { width: 100%; padding: 11px 12px; border: 1px solid ${theme.border}; border-radius: 8px; font-size: 13px; font-family: inherit; outline: none; }
  .answer-input:focus { border-color: ${theme.purple}; }
  .correct-toggle { display: flex; align-items: center; gap: 6px; font-size: 12px; color: ${theme.textMuted}; white-space: nowrap; }
  .del-btn { width: 28px; height: 28px; border: none; border-radius: 6px; background: #fee2e2; color: #dc2626; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .form-footer { display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; border-top: 1px solid ${theme.border}; }
  .form-steps { font-size: 12px; color: ${theme.textMuted}; }
  .form-actions { display: flex; gap: 10px; }
  .btn-discard { padding: 10px 18px; border: 1px solid ${theme.border}; background: white; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 6px; }
  .btn-save { padding: 10px 18px; background: ${theme.purple}; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; display: flex; align-items: center; gap: 6px; }
  .btn-save:hover { background: ${theme.purpleDark}; }

  /* ---- Groups ---- */
  .group-tree { background: white; border: 1px solid ${theme.border}; border-radius: 14px; overflow: hidden; }
  .group-row { padding: 14px 20px; border-bottom: 1px solid ${theme.border}; display: flex; align-items: center; gap: 10px; }
  .group-row:last-child { border-bottom: none; }
  .group-row.top-level { background: ${theme.bg}; font-family: 'Syne', sans-serif; font-weight: 700; }
  .group-row.sub-level { padding-left: 40px; }
  .group-row.item-level { padding-left: 64px; font-size: 13px; color: ${theme.textMuted}; }
  .group-name { flex: 1; font-size: 14px; }
  .group-count { font-size: 11px; color: ${theme.textMuted}; margin-left: 8px; }
  .group-actions { display: flex; gap: 6px; }
  .group-add-row { padding: 12px 20px; border-bottom: 1px solid ${theme.border}; display: flex; align-items: center; gap: 8px; font-size: 13px; color: ${theme.purple}; cursor: pointer; }
  .group-add-row:hover { background: ${theme.purpleLight}; }
  .group-bottom { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 24px; }
  .group-tip { background: white; border: 1px solid ${theme.border}; border-radius: 12px; padding: 16px; font-size: 13px; }
  .group-tip h4 { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 6px; }
  .group-tip p { color: ${theme.textMuted}; font-size: 12px; line-height: 1.5; }
  .create-category-box { background: ${theme.bg}; border: 2px dashed ${theme.border}; border-radius: 14px; padding: 32px; text-align: center; cursor: pointer; transition: border-color .2s; margin-top: 16px; }
  .create-category-box:hover { border-color: ${theme.purple}; }
  .create-category-icon { font-size: 28px; margin-bottom: 10px; }
  .create-category-title { font-family: 'Syne', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 6px; }
  .create-category-sub { font-size: 12px; color: ${theme.textMuted}; }

  /* ---- Responsive Enhancements ---- */
  html { overflow-x: hidden; }
  body {
    min-width: 320px;
    overflow-x: hidden;
  }
  button, input, select, textarea { font: inherit; }
  .qw-app {
    min-height: 100vh;
    min-height: 100dvh;
    overflow-x: hidden;
    --sidebar-width: 240px;
    --topbar-offset: 72px;
  }
  .login-wrap {
    min-height: 100vh;
    min-height: 100dvh;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(360px, 440px);
  }
  .login-left,
  .login-right,
  .main,
  .page-content,
  .topbar-left,
  .topbar-right,
  .search-box,
  .filter-bar-actions,
  .page-header-actions,
  .quiz-question,
  .results-summary-content,
  .activity-body,
  .answer-input-wrap,
  .group-name { min-width: 0; }
  .login-badges,
  .btn-row,
  .results-actions,
  .form-actions,
  .group-actions,
  .filter-bar-actions { flex-wrap: wrap; }
  .login-badges { align-items: stretch; }
  .login-right {
    width: 100%;
    min-width: 0;
  }
  .layout {
    min-height: 100vh;
    min-height: 100dvh;
    background: ${theme.bg};
  }
  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    border: none;
    background: rgba(15, 23, 42, 0.45);
    opacity: 0;
    pointer-events: none;
    transition: opacity .2s ease;
    z-index: 45;
  }
  .sidebar-backdrop.open {
    opacity: 1;
    pointer-events: auto;
  }
  .sidebar {
    width: var(--sidebar-width);
    padding: 20px 0;
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .sidebar-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 0 20px 24px;
  }
  .sidebar-logo {
    padding: 0;
    flex: 1;
    min-width: 0;
  }
  .sidebar-logo-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 12px;
    overflow-y: auto;
  }
  .sidebar-item {
    border-radius: 12px;
    margin: 0;
  }
  .sidebar-item.active {
    border-right: none;
    box-shadow: inset 0 0 0 1px ${theme.purple};
  }
  .sidebar-bottom {
    padding: 16px 20px 20px;
    margin-top: auto;
    border-top: 1px solid ${theme.border};
  }
  .sidebar-btn {
    padding: 10px 12px;
    border-radius: 10px;
  }
  .sidebar-close,
  .mobile-menu-btn {
    width: 38px;
    height: 38px;
    border: 1px solid ${theme.border};
    border-radius: 10px;
    background: white;
    color: ${theme.text};
    align-items: center;
    justify-content: center;
    cursor: pointer;
    display: none;
    flex-shrink: 0;
  }
  .sidebar-close svg,
  .mobile-menu-btn svg { width: 16px; height: 16px; }
  .main {
    margin-left: var(--sidebar-width);
    min-width: 0;
  }
  .topbar {
    min-height: var(--topbar-offset);
    padding: 12px 28px;
    gap: 16px;
    flex-wrap: wrap;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(14px);
  }
  .topbar-left,
  .topbar-right {
    gap: 12px;
    min-width: 0;
  }
  .topbar-left { flex: 1 1 340px; }
  .topbar-right {
    flex: 0 0 auto;
    margin-left: auto;
  }
  .topbar-search {
    width: min(100%, 320px);
    flex: 1 1 260px;
  }
  .topbar-search input,
  .search-box input,
  .filter-search-field input {
    min-width: 0;
    background: none;
  }
  .page-content { padding: 28px; }
  .page-header {
    align-items: flex-start;
    gap: 16px;
    flex-wrap: wrap;
  }
  .page-header-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .filter-bar {
    align-items: center;
    flex-wrap: wrap;
  }
  .filter-bar-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .search-box {
    flex: 1 1 300px;
    min-width: 260px;
  }
  .table-wrap { overflow: auto; }
  .data-table { min-width: 720px; }
  .table-footer {
    gap: 12px;
    flex-wrap: wrap;
  }
  .pagination { flex-wrap: wrap; }
  .dash-banner,
  .history-cta,
  .activity-header,
  .form-footer,
  .group-row,
  .group-add-row { flex-wrap: wrap; }
  .stat-cards { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .category-grid { grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); }
  .rec-grid { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  .rec-card-meta { flex-wrap: wrap; }
  .quiz-topbar {
    top: var(--topbar-offset);
    padding: 12px 28px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .quiz-topbar-progress {
    flex: 1 1 320px;
    min-width: 0;
  }
  .quiz-progress-label {
    font-size: 11px;
    color: ${theme.textMuted};
    margin-bottom: 4px;
  }
  .quiz-topbar-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  .quiz-layout {
    grid-template-columns: minmax(0, 1fr) 220px;
    align-items: start;
  }
  .quiz-layout-solo { grid-template-columns: minmax(0, 1fr); }
  .quiz-question {
    width: min(100%, 680px);
  }
  .quiz-nav-panel .quiz-nav-box {
    position: sticky;
    top: calc(var(--topbar-offset) + 84px);
  }
  .quiz-help-card { line-height: 1.6; }
  .results-summary-layout {
    display: flex;
    align-items: flex-start;
    gap: 28px;
    flex-wrap: wrap;
  }
  .results-summary-content {
    flex: 1 1 320px;
  }
  .results-summary-copy {
    font-size: 13px;
    color: ${theme.textMuted};
    margin-bottom: 16px;
  }
  .results-meta-grid { grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); }
  .review-question-text {
    flex: 1;
    min-width: 0;
  }
  .review-answer-row { flex-wrap: wrap; }
  .section-heading-row {
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .results-cta { margin-top: 24px; }
  .results-cta-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    margin-bottom: 6px;
  }
  .results-cta-copy {
    font-size: 13px;
    color: ${theme.textMuted};
    margin-bottom: 12px;
  }
  .history-stats { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  .history-cta { gap: 16px; }
  .admin-stat-row { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .admin-charts-row {
    grid-template-columns: minmax(0, 1.6fr) minmax(280px, 1fr);
    align-items: start;
  }
  .admin-bottom-row {
    grid-template-columns: minmax(240px, 280px) minmax(0, 1fr);
    align-items: start;
  }
  .chart-card svg { max-width: 100%; }
  .activity-header { gap: 12px; }
  .filter-row {
    grid-template-columns: minmax(220px, 1.35fr) repeat(3, minmax(150px, 1fr));
    align-items: end;
  }
  .filter-search-field {
    display: flex;
    align-items: center;
    gap: 6px;
    border: 1px solid ${theme.border};
    border-radius: 8px;
    padding: 8px 10px;
    background: white;
  }
  .filter-search-field input {
    border: none;
    outline: none;
    font-size: 13px;
    flex: 1;
  }
  .form-grid-3 { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  .form-footer-shell {
    background: white;
    border: 1px solid ${theme.border};
    border-radius: 14px;
    overflow: hidden;
  }
  .answer-options-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }
  .answer-option { align-items: flex-start; }
  .group-row,
  .group-add-row { gap: 10px; }
  .group-actions { margin-left: auto; }
  .group-bottom { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }

  @media (max-width: 1024px) {
    .qw-app { --topbar-offset: 68px; }
    .sidebar-close,
    .mobile-menu-btn { display: inline-flex; }
    .sidebar {
      width: min(86vw, 320px);
      transform: translateX(-100%);
      box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
    }
    .sidebar.open { transform: translateX(0); }
    .main { margin-left: 0; }
    .page-content { padding: 24px 20px 28px; }
    .topbar,
    .quiz-topbar { padding-left: 20px; padding-right: 20px; }
    .admin-charts-row,
    .admin-bottom-row,
    .quiz-layout { grid-template-columns: 1fr; }
    .quiz-nav-panel .quiz-nav-box { position: static; }
    .filter-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 900px) {
    .login-wrap { grid-template-columns: 1fr; }
    .login-left {
      min-height: auto;
      padding: 32px 24px 20px;
    }
    .login-left::after {
      font-size: 84px;
      bottom: 28px;
      right: 24px;
    }
    .login-right {
      padding: 32px 24px 40px;
      justify-content: flex-start;
    }
    .topbar {
      padding: 12px 20px;
    }
    .topbar-left,
    .topbar-right { width: 100%; }
    .topbar-right {
      order: 1;
      justify-content: space-between;
      margin-left: 0;
    }
    .topbar-left { order: 2; }
    .topbar-search,
    .search-box { width: 100%; }
    .user-info { display: none; }
    .results-meta-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media (max-width: 720px) {
    .qw-app { --topbar-offset: 64px; }
    .page-content { padding: 20px 16px 24px; }
    .topbar,
    .quiz-topbar {
      padding-left: 16px;
      padding-right: 16px;
    }
    .login-left {
      padding: 24px 20px 18px;
    }
    .login-logo { margin-bottom: 28px; }
    .login-hero-title { font-size: 28px; }
    .login-hero-sub {
      max-width: none;
      margin-bottom: 28px;
    }
    .login-right {
      padding: 28px 20px 36px;
    }
    .search-box,
    .topbar-search { min-width: 100%; }
    .page-header-actions,
    .filter-bar-actions,
    .btn-row,
    .results-actions,
    .form-actions { width: 100%; }
    .dash-banner,
    .results-card,
    .history-cta,
    .chart-card,
    .quick-mgmt,
    .activity-card,
    .form-section { padding-left: 20px; padding-right: 20px; }
    .dash-banner-title,
    .results-title { font-size: 22px; }
    .quiz-q-text { font-size: 18px; }
    .quiz-topbar-meta {
      width: 100%;
      justify-content: space-between;
    }
    .quiz-nav-row > * { flex: 1 1 180px; }
    .filter-row,
    .form-grid-3 { grid-template-columns: 1fr; }
    .answer-option { flex-wrap: wrap; }
    .correct-toggle {
      width: 100%;
      justify-content: space-between;
      padding-left: 40px;
    }
    .form-footer {
      flex-direction: column;
      align-items: flex-start;
    }
    .group-row.sub-level { padding-left: 24px; }
    .group-row.item-level { padding-left: 40px; }
    .group-actions {
      width: 100%;
      margin-left: 0;
    }
    .review-item-body {
      padding: 0 16px 16px 16px;
    }
  }

  @media (max-width: 560px) {
    .login-hero-title { font-size: 24px; }
    .login-badge { width: 100%; justify-content: center; }
    .page-header h1 { font-size: 20px; }
    .section-title { font-size: 16px; }
    .stat-cards,
    .category-grid,
    .rec-grid,
    .history-stats,
    .admin-stat-row,
    .results-meta-grid { grid-template-columns: 1fr; }
    .btn-row > *,
    .page-header-actions > *,
    .filter-bar-actions > *,
    .results-actions > *,
    .form-actions > * { flex: 1 1 100%; }
    .history-cta button,
    .results-cta button { width: 100%; }
    .quiz-option {
      align-items: flex-start;
      font-size: 13px;
      padding: 12px 14px;
    }
    .quiz-nav-row > * { flex-basis: 100%; }
    .table-footer { align-items: flex-start; }
  }
`;
