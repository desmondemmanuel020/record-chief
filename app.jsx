const { useState, useEffect, useCallback, useRef } = React;

const NAIRA = (n) => `₦${Number(n || 0).toLocaleString("en-NG", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
const TODAY = () => new Date().toISOString().split("T")[0];
const TS = () => new Date().toISOString();
const uid = () => Math.random().toString(36).slice(2, 10);

// Dynamic colors — these are the CSS var equivalents for JSX inline styles
// Used alongside static COLORS for gradient/special colours
const DC = {
  bg: "var(--bg)",
  surface: "var(--surface)",
  text: "var(--text)",
  textMuted: "var(--text-muted)",
  textLight: "var(--text-light)",
  border: "var(--border)",
  primary: "var(--primary)",
  primaryLight: "var(--primary-light)",
  accent: "var(--accent)",
  accentLight: "var(--accent-light)",
  danger: "var(--danger)",
  dangerLight: "var(--danger-light)",
  amber: "var(--amber)",
  amberLight: "var(--amber-light)",
};

const COLORS = {
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryLight: "#EFF6FF",
  accent: "#059669",
  accentLight: "#ECFDF5",
  danger: "#DC2626",
  dangerLight: "#FEF2F2",
  amber: "#D97706",
  amberLight: "#FFFBEB",
  surface: "#FFFFFF",
  bg: "#F8FAFC",
  border: "rgba(15,23,42,0.08)",
  text: "#0F172A",
  textMuted: "#64748B",
  textLight: "#94A3B8",
  purple: "#7C3AED",
  purpleLight: "#F5F3FF",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: ${COLORS.bg}; --surface: #ffffff; --text: ${COLORS.text};
    --text-muted: ${COLORS.textMuted}; --text-light: ${COLORS.textLight};
    --border: ${COLORS.border}; --primary: ${COLORS.primary};
    --primary-light: ${COLORS.primaryLight}; --accent: ${COLORS.accent};
    --accent-light: ${COLORS.accentLight}; --danger: ${COLORS.danger};
    --danger-light: ${COLORS.dangerLight}; --amber: ${COLORS.amber};
    --amber-light: ${COLORS.amberLight};
  }
  [data-theme="dark"] {
    --bg: #0A0F1E;
    --surface: #161D31;
    --text: #F1F5F9;
    --text-muted: #94A3B8;
    --text-light: #4B5563;
    --border: rgba(255,255,255,0.08);
    --primary: #00C48C;
    --primary-dark: #00A376;
    --primary-light: #0A2419;
    --accent: #00C48C;
    --accent-light: #0A2419;
    --danger: #F87171;
    --danger-light: #2D1515;
    --amber: #FBBF24;
    --amber-light: #2D2209;
    --purple: #A78BFA;
    --purple-light: #1E1535;
  }
  body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); transition: background 0.2s, color 0.2s; }
  input, select, textarea { font-family: 'Inter', sans-serif; }
  button { cursor: pointer; font-family: 'Inter', sans-serif; }

  @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes scaleIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  .app { min-height: 100vh; display: flex; flex-direction: row; }

  .sidebar { background: linear-gradient(180deg, #0F172A 0%, #1E293B 100%); display: flex; flex-direction: column; min-height: 100vh; position: sticky; top: 0; height: 100vh; overflow: hidden; z-index: 50; transition: width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1); }
  .sidebar.open { width: 220px; min-width: 220px; }
  .sidebar.collapsed { width: 56px; min-width: 56px; }
  .sidebar-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 12px 8px; flex-shrink: 0; }
  .sidebar-logo { font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: #fff; letter-spacing: -0.3px; white-space: nowrap; overflow: hidden; opacity: 1; transition: opacity 0.15s; }
  .sidebar.collapsed .sidebar-logo { opacity: 0; width: 0; }
  .sidebar-toggle { background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; display: flex; align-items: center; justify-content: center; padding: 4px; border-radius: 6px; flex-shrink: 0; transition: background 0.15s; }
  .sidebar-toggle:hover { background: rgba(255,255,255,0.1); color: #fff; }
  .sidebar-tagline { font-size: 10px; color: rgba(255,255,255,0.45); padding: 0 14px 14px; border-bottom: 0.5px solid rgba(255,255,255,0.1); margin-bottom: 6px; white-space: nowrap; overflow: hidden; transition: opacity 0.15s; }
  .sidebar.collapsed .sidebar-tagline { opacity: 0; height: 0; padding: 0; margin: 0; border: none; }
  .sidebar-section { font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; padding: 10px 14px 3px; white-space: nowrap; overflow: hidden; transition: opacity 0.15s; }
  .sidebar.collapsed .sidebar-section { opacity: 0; height: 0; padding: 0; }
  .nav-tab { display: flex; flex-direction: row; align-items: center; gap: 10px; padding: 10px 14px; border: none; background: none; color: rgba(255,255,255,0.6); font-size: 13px; font-family: 'Inter', sans-serif; transition: background 0.15s, color 0.15s, padding 0.25s; width: 100%; text-align: left; border-radius: 0; cursor: pointer; white-space: nowrap; }
  .sidebar.collapsed .nav-tab { padding: 12px 0; justify-content: center; gap: 0; }
  .nav-tab:hover { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.9); }
  .nav-tab.active { background: rgba(37,99,235,0.25); color: #fff; font-weight: 600; border-left: 3px solid #60A5FA; padding-left: 11px; border-radius: 0 8px 8px 0; }
  .sidebar.collapsed .nav-tab.active { border-left: 3px solid #5BB8F5; padding-left: 0; }
  .nav-tab svg { width: 16px; height: 16px; flex-shrink: 0; }
  .nav-tab .nav-label { flex: 1; overflow: hidden; transition: opacity 0.15s, max-width 0.25s; max-width: 200px; }
  .sidebar.collapsed .nav-tab .nav-label { opacity: 0; max-width: 0; overflow: hidden; }
  .sidebar-bottom { margin-top: auto; padding: 12px 8px; border-top: 0.5px solid rgba(255,255,255,0.1); }
  .sidebar-user { display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 8px; cursor: pointer; overflow: hidden; }
  .sidebar.collapsed .sidebar-user { justify-content: center; padding: 6px 4px; }
  .sidebar-user:hover { background: rgba(255,255,255,0.07); }
  .sidebar-avatar { width: 30px; height: 30px; border-radius: 50%; background: rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #fff; flex-shrink: 0; overflow: hidden; }
  .sidebar-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .sidebar-userinfo { overflow: hidden; transition: opacity 0.15s, max-width 0.25s; max-width: 160px; }
  .sidebar.collapsed .sidebar-userinfo { opacity: 0; max-width: 0; }
  .sidebar-username { font-size: 12px; color: rgba(255,255,255,0.8); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sidebar-email { font-size: 10px; color: rgba(255,255,255,0.4); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .main-wrap { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .topbar { background: var(--surface); color: var(--text); padding: 0 1.25rem; display: flex; align-items: center; justify-content: space-between; height: 52px; border-bottom: 0.5px solid var(--border); position: sticky; top: 0; z-index: 40; }
  .topbar-breadcrumb { font-size: 14px; font-weight: 600; color: var(--text); }
  .topbar-right { display: flex; gap: 8px; align-items: center; }
  .avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--primary-light); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--primary); cursor: pointer; }

  .main { flex: 1; padding: 1.25rem; overflow-y: auto; background: var(--bg); }

  .card { background: var(--surface); border-radius: 16px; border: 1px solid var(--border); padding: 1rem 1.1rem; margin-bottom: 0.75rem; box-shadow: 0 1px 3px rgba(15,23,42,0.04); }
  .card-sm { background: var(--surface); border-radius: 10px; border: 0.5px solid var(--border); padding: 0.75rem 0.9rem; margin-bottom: 0.6rem; }

  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 1rem; }
  .stat-card { background: var(--surface); border-radius: 12px; border: 0.5px solid var(--border); padding: 0.85rem 1rem; }
  .stat-label { font-size: 11px; color: ${COLORS.textMuted}; margin-bottom: 4px; }
  .stat-value { font-size: 20px; font-weight: 600; font-family: 'Space Mono', monospace; color: ${COLORS.text}; }
  .stat-sub { font-size: 10px; color: ${COLORS.textLight}; margin-top: 2px; }

  .section-title { font-size: 13px; font-weight: 600; color: ${COLORS.textMuted}; text-transform: uppercase; letter-spacing: 0.08em; margin: 1.25rem 0 0.6rem; }

  .form-group { margin-bottom: 0.85rem; }
  .form-label { font-size: 12px; font-weight: 500; color: ${COLORS.textMuted}; margin-bottom: 4px; display: block; }
  .form-input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg); font-size: 14px; color: var(--text); outline: none; font-family: 'Inter', sans-serif; transition: border-color 0.2s; }
  @media (max-width: 640px) { .form-input, .search-bar, input, select, textarea { font-size: 16px !important; } }
  .form-input:focus { border-color: var(--primary); background: var(--surface); }
  .form-input.error { border-color: var(--danger); }
  .form-error { font-size: 11px; color: ${COLORS.danger}; margin-top: 3px; }

  .btn { border: none; border-radius: 9px; padding: 11px 20px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; transition: all 0.15s; display: inline-flex; align-items: center; gap: 6px; justify-content: center; }
  .btn-primary { background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark}); color: #fff; width: 100%; box-shadow: 0 2px 8px rgba(37,99,235,0.3); }
  .btn-primary:hover { background: linear-gradient(135deg, ${COLORS.primaryDark}, #1E3A8A); box-shadow: 0 4px 12px rgba(37,99,235,0.4); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-outline { background: transparent; border: 1px solid ${COLORS.border}; color: ${COLORS.text}; }
  .btn-outline:hover { background: ${COLORS.bg}; }
  .btn-danger { background: ${COLORS.dangerLight}; color: ${COLORS.danger}; border: none; }
  .btn-success { background: ${COLORS.accentLight}; color: ${COLORS.accent}; border: none; }
  .btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 7px; }

  .pill { display: inline-flex; align-items: center; border-radius: 20px; padding: 3px 10px; font-size: 11px; font-weight: 500; }
  .pill-green { background: ${COLORS.accentLight}; color: ${COLORS.accent}; }
  .pill-amber { background: ${COLORS.amberLight}; color: ${COLORS.amber}; }
  .pill-red { background: ${COLORS.dangerLight}; color: ${COLORS.danger}; }
  .pill-blue { background: ${COLORS.primaryLight}; color: ${COLORS.primary}; }

  .entry-row { display: flex; align-items: flex-start; gap: 10px; padding: 12px 0; border-bottom: 0.5px solid ${COLORS.border}; }
  .entry-row:last-child { border-bottom: none; }
  .entry-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
  .entry-content { flex: 1; min-width: 0; }
  .entry-title { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .entry-sub { font-size: 12px; color: ${COLORS.textMuted}; margin-top: 2px; }
  .entry-amount { font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: ${COLORS.text}; flex-shrink: 0; }

  .search-bar { width: 100%; padding: 10px 36px 10px 38px; border-radius: 12px; border: 1.5px solid var(--border); background: var(--surface); font-size: 13px; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s, box-shadow 0.2s; color: var(--text); }
  .search-bar:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-light); }
  .search-wrap { position: relative; margin-bottom: 0.75rem; }
  .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: ${COLORS.textLight}; }

  .tab-bar { display: flex; background: var(--bg); border-radius: 10px; padding: 3px; margin-bottom: 1rem; }
  .tab-btn { flex: 1; border: none; background: none; padding: 7px; font-size: 12px; font-weight: 500; border-radius: 8px; color: var(--text-muted); font-family: 'Inter', sans-serif; transition: all 0.15s; }
  .tab-btn.active { background: var(--surface); color: var(--primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

  .sector-card { background: ${COLORS.surface}; border-radius: 16px; border: 2px solid transparent; padding: 1.25rem; margin-bottom: 0.75rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 14px; }
  .sector-card:hover { border-color: ${COLORS.primary}; }
  .sector-card.active { border-color: ${COLORS.primary}; background: ${COLORS.primaryLight}; }
  .sector-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .sector-info h3 { font-size: 15px; font-weight: 600; }
  .sector-info p { font-size: 12px; color: ${COLORS.textMuted}; margin-top: 3px; }

  .welcome-screen { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; background: linear-gradient(145deg, #1E3A8A 0%, #1D4ED8 40%, #2563EB 70%, #0F766E 100%); color: #fff; }
  .welcome-logo { font-family: 'Space Mono', monospace; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
  .welcome-tagline { font-size: 14px; opacity: 0.75; text-align: center; margin-bottom: 3rem; max-width: 260px; }
  .welcome-art { font-size: 72px; margin-bottom: 2rem; }

  .auth-card { background: #fff; border-radius: 20px; padding: 1.75rem; width: 100%; max-width: 360px; }
  .auth-title { font-size: 20px; font-weight: 700; color: ${COLORS.text}; margin-bottom: 4px; }
  .auth-sub { font-size: 13px; color: ${COLORS.textMuted}; margin-bottom: 1.5rem; }

  .toast { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); background: ${COLORS.text}; color: #fff; padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 500; z-index: 999; animation: toastIn 0.3s ease; white-space: nowrap; }
  .toast.success { background: ${COLORS.accent}; }
  .toast.error { background: ${COLORS.danger}; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .empty-state { text-align: center; padding: 3rem 1rem; color: ${COLORS.textMuted}; }
  .empty-icon { font-size: 48px; margin-bottom: 1rem; }
  .empty-state h3 { font-size: 16px; font-weight: 600; color: ${COLORS.text}; margin-bottom: 6px; }
  .empty-state p { font-size: 13px; }

  .stock-bar { height: 4px; border-radius: 2px; background: ${COLORS.bg}; margin-top: 4px; }
  .stock-fill { height: 100%; border-radius: 2px; transition: width 0.3s; }

  .divider { height: 0.5px; background: var(--border); margin: 0.75rem 0; }

  .profile-avatar-lg { width: 80px; height: 80px; border-radius: 50%; background: ${COLORS.primaryLight}; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: ${COLORS.primary}; margin: 0 auto 0; overflow: hidden; position: relative; cursor: pointer; }
  .profile-avatar-lg img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .avatar-edit-overlay { position: absolute; inset: 0; border-radius: 50%; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.15s; cursor: pointer; }
  .profile-avatar-lg:hover .avatar-edit-overlay { opacity: 1; }

  .chip { display: inline-flex; align-items: center; gap: 4px; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 500; background: ${COLORS.bg}; color: ${COLORS.textMuted}; border: 0.5px solid ${COLORS.border}; cursor: pointer; transition: all 0.15s; }
  .chip.active { background: ${COLORS.primaryLight}; color: ${COLORS.primary}; border-color: ${COLORS.primary}; }

  .export-row { display: flex; gap: 8px; margin-top: 0.75rem; }
  select.form-input { appearance: none; }

  /* ── Mobile bottom tab bar ── */
  .bottom-tab-bar {
    display: none;
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
    background: #0F172A;
    border-top: 1px solid rgba(255,255,255,0.1);
    padding: 0; height: 62px;
    flex-direction: row; align-items: stretch;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
  }
  .bottom-tab-item {
    flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 3px; border: none; background: none; color: rgba(255,255,255,0.45);
    cursor: pointer; font-family: 'Inter', sans-serif; font-size: 9px; font-weight: 600;
    text-transform: uppercase; letter-spacing: 0.05em; padding: 6px 2px;
    position: relative; transition: color 0.15s;
  }
  .bottom-tab-item.active { color: #fff; }
  .bottom-tab-item .btab-dot {
    position: absolute; top: 8px; right: calc(50% - 14px);
    width: 7px; height: 7px; border-radius: 50%; background: #EF4444;
  }
  .bottom-tab-item .btab-icon { font-size: 20px; line-height: 1; margin-bottom: 1px; }
  .bottom-tab-item .btab-bar {
    position: absolute; bottom: 0; left: 20%; right: 20%; height: 3px;
    border-radius: 3px 3px 0 0;
  }

  /* ── Desktop-only elements ── */
  @media (max-width: 640px) { .desktop-only { display: none !important; } }

  /* ── Touch feedback ── */
  button:active { transform: scale(0.97); }
  .nav-tab:active { background: rgba(255,255,255,0.15) !important; }
  .bottom-tab-item:active { opacity: 0.7; }

  /* ── Scrollable horizontal chip rows ── */
  .chip-row { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .chip-row::-webkit-scrollbar { display: none; }

  /* ── Safe area insets for notched phones ── */
  .bottom-tab-bar { padding-bottom: env(safe-area-inset-bottom, 0px); height: calc(54px + env(safe-area-inset-bottom, 0px)); background: #0F172A; }
  .main { padding-bottom: calc(80px + env(safe-area-inset-bottom, 0px)); }

  /* ── Prevent text size inflation on rotation ── */
  html { -webkit-text-size-adjust: 100%; }

  /* ── Smooth momentum scroll ── */
  .main { -webkit-overflow-scrolling: touch; }

  /* ── FAB lift above bottom tab bar on mobile ── */
  :root { --fab-lift: 0px; }
  @media (max-width: 640px) { :root { --fab-lift: 70px; } }

  /* ── Better tap targets — min 44px ── */
  .btn { min-height: 44px; }
  .btn-sm { min-height: 36px; }
  .nav-tab { min-height: 44px; }

  /* ── On mobile: hide sidebar, show bottom bar ── */
  @media (max-width: 640px) {
    .sidebar { display: none !important; }
    .bottom-tab-bar { display: flex !important; }
    .main { padding: 1rem; padding-bottom: calc(100px + env(safe-area-inset-bottom, 0px)); }
    .topbar { padding: 0 1rem; height: 56px; }
    .topbar-breadcrumb { font-size: 17px; font-weight: 700; }

    /* Bigger cards on mobile */
    .card { padding: 1rem 1rem; border-radius: 16px; margin-bottom: 0.85rem; }
    .card-sm { padding: 0.85rem 1rem; }

    /* Stat grid */
    .stat-grid { grid-template-columns: 1fr 1fr; gap: 10px; }
    .stat-value { font-size: 22px; }
    .stat-label { font-size: 13px; }
    .stat-sub { font-size: 11px; }

    /* Inputs — 16px prevents iOS zoom */
    .form-input { padding: 14px 16px; font-size: 16px; border-radius: 12px; }
    .form-label { font-size: 14px; margin-bottom: 6px; }
    .search-bar { font-size: 16px; padding: 14px 40px 14px 44px; border-radius: 14px; }

    /* Buttons */
    .btn { min-height: 52px; font-size: 16px; border-radius: 12px; }
    .btn-sm { min-height: 40px; font-size: 13px; }
    .tab-btn { font-size: 14px; padding: 10px; min-height: 42px; }

    /* Text sizes */
    .section-title { font-size: 13px; margin: 1.5rem 0 0.75rem; }
    .entry-row { padding: 16px 0; }
    .entry-title { font-size: 16px; font-weight: 600; }
    .entry-sub { font-size: 13px; }
    .entry-amount { font-size: 16px; }

    /* Pills larger */
    .pill { font-size: 12px; padding: 4px 12px; }

    /* Bottom tab bar bigger */
    .bottom-tab-bar { height: calc(58px + env(safe-area-inset-bottom, 0px)); }
    .bottom-tab-item { font-size: 10px; gap: 4px; }
    .bottom-tab-item .btab-icon { font-size: 21px; }
  }

  /* ── Very small phones (360px) ── */
  @media (max-width: 360px) {
    .stat-grid { grid-template-columns: 1fr; }
    .main { padding: 0.85rem; }
    .card { padding: 0.85rem; }
    .btn { font-size: 15px; }
  }
`;

function useLocalState(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : (typeof init === "function" ? init() : init); } catch { return typeof init === "function" ? init() : init; }
  });
  const update = useCallback((v) => {
    setVal(prev => {
      const next = typeof v === "function" ? v(prev) : v;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [val, update];
}

function Toast({ msg, type, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, []);
  return <div className={`toast ${type}`}>{msg}</div>;
}

function Icon({ name, size = 20 }) {
  const icons = {
    home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>,
    chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="12" width="4" height="9" rx="1"/><rect x="10" y="6" width="4" height="15" rx="1"/><rect x="17" y="3" width="4" height="18" rx="1"/></svg>,
    history: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
    user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
    plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>,
    trash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>,
    edit: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v13M7 11l5 5 5-5"/><path d="M5 21h14"/></svg>,
    search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>,
    logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>,
    back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>,
    check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>,
    store: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9zM3 9l2.5-6h13L21 9"/><path d="M12 9v12"/></svg>,
    leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/></svg>,
    briefcase: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M12 12v2"/></svg>,
    settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  };
  return <span style={{ width: size, height: size, display: "inline-flex" }}>{icons[name] || null}</span>;
}


// ===================== EXPORT UTILITIES =====================
function loadSheetJS(cb) {
  if (window.XLSX) { cb(); return; }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
  s.onload = cb;
  document.head.appendChild(s);
}

function loadJsPDF(cb) {
  if (window.jspdf) { cb(window.jspdf.jsPDF); return; }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
  s.onload = () => cb(window.jspdf.jsPDF);
  document.head.appendChild(s);
}

function loadAutoTable(cb) {
  if (window.jspdfAutotable) { cb(); return; }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js";
  s.onload = () => { window.jspdfAutotable = true; cb(); };
  document.head.appendChild(s);
}

function exportToExcel(filename, sheetName, rows, headers) {
  loadSheetJS(() => {
    const wb = window.XLSX.utils.book_new();
    const data = [headers, ...rows];
    const ws = window.XLSX.utils.aoa_to_sheet(data);
    // column widths
    ws["!cols"] = headers.map(() => ({ wch: 20 }));
    window.XLSX.utils.book_append_sheet(wb, ws, sheetName);
    window.XLSX.writeFile(wb, filename + ".xlsx");
  });
}

function exportToPDF(title, headers, rows, filename) {
  loadJsPDF(JsPDF => {
    loadAutoTable(() => {
      const doc = new JsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
      const pageW = doc.internal.pageSize.getWidth();
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, pageW / 2, 36, { align: "center" });
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120);
      doc.text("Record Chief  ·  Exported " + new Date().toLocaleDateString("en-NG", { day:"numeric", month:"long", year:"numeric" }), pageW / 2, 50, { align: "center" });
      doc.autoTable({
        startY: 62,
        head: [headers],
        body: rows,
        headStyles: { fillColor: [27, 108, 168], textColor: 255, fontStyle: "bold", fontSize: 9 },
        bodyStyles: { fontSize: 9 },
        alternateRowStyles: { fillColor: [245, 248, 252] },
        margin: { left: 36, right: 36 },
        styles: { cellPadding: 5, overflow: "linebreak" },
      });
      doc.save(filename + "_" + new Date().toISOString().slice(0,10) + ".pdf");
    });
  });
}

function ExportModal({ title, onClose, onExcelExport, onPDFExport }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999,
    }} onClick={onClose}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "1.5rem", width: 320,
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }} onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Export {title}</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20 }}>
          Choose a format to download your data.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={onExcelExport} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
            border: "1.5px solid #1D6F42", borderRadius: 10, background: "#F0FAF4",
            cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
          }}>
            <span style={{ fontSize: 28 }}>📊</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1D6F42" }}>Excel Spreadsheet</div>
              <div style={{ fontSize: 11, color: "#4B9B6B", marginTop: 2 }}>Downloads as .xlsx — open in Excel or Google Sheets</div>
            </div>
          </button>
          <button onClick={onPDFExport} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
            border: `1.5px solid ${COLORS.danger}`, borderRadius: 10, background: COLORS.dangerLight,
            cursor: "pointer", fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
          }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.danger }}>PDF Document</div>
              <div style={{ fontSize: 11, color: "#C0392B99", marginTop: 2 }}>Downloads as .pdf — formatted, printable report</div>
            </div>
          </button>
        </div>
        <button onClick={onClose} style={{
          marginTop: 16, width: "100%", background: "none", border: `1px solid ${COLORS.border}`,
          borderRadius: 8, padding: "9px", fontSize: 13, color: COLORS.textMuted,
          cursor: "pointer", fontFamily: "'Inter', sans-serif",
        }}>Cancel</button>
      </div>
    </div>
  );
}


// ===================== SMART SEARCH =====================
function SmartSearch({ value, onChange, placeholder, resultCount }) {
  return (
    <div style={{ position: "relative", marginBottom: "0.75rem" }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: COLORS.textLight, pointerEvents: "none" }}>
        <Icon name="search" size={16} />
      </span>
      <input
        className="search-bar"
        placeholder={placeholder || "Search…"}
        value={value}
        onChange={e => onChange(e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      {value && (
        <button onClick={() => onChange("")} style={{
          position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
          background: COLORS.border, border: "none", borderRadius: "50%",
          width: 22, height: 22, cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", color: COLORS.textMuted, fontSize: 12, lineHeight: 1,
        }}>✕</button>
      )}
      {value && resultCount !== undefined && (
        <div style={{ position: "absolute", right: value ? 40 : 10, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: COLORS.textMuted, whiteSpace: "nowrap" }}>
          {resultCount} result{resultCount !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}


// ===================== NOTIFICATION BANNER =====================
function NotificationBanner({ user, onNavigateDebt }) {
  const [dismissed, setDismissed] = useState(false);
  const debtKey = `sl_debt_${user.uid}`;
  const records = (() => { try { return JSON.parse(localStorage.getItem(debtKey)) || []; } catch { return []; } })();
  const overdue = records.filter(r => !r.settled && !r.archived && r.dueDate && r.dueDate < TODAY());
  const dueSoon = records.filter(r => {
    if (r.settled || r.archived || !r.dueDate) return false;
    const days = Math.ceil((new Date(r.dueDate) - new Date()) / 86400000);
    const threshold = parseInt(r.reminderDays ?? 1);
    return days >= 0 && days <= threshold;
  });

  if (dismissed || (overdue.length === 0 && dueSoon.length === 0)) return null;

  const isUrgent = overdue.length > 0;
  const items = isUrgent ? overdue : dueSoon;
  return (
    <div style={{
      background: isUrgent ? "#FEF2F2" : "#FFFBEB",
      border: `1.5px solid ${isUrgent ? "#FCA5A5" : "#FCD34D"}`,
      borderRadius: 14, padding: "12px 14px", marginBottom: "0.75rem",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 20, flexShrink: 0 }}>{isUrgent ? "🚨" : "⏰"}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: isUrgent ? COLORS.danger : COLORS.amber }}>
            {isUrgent
              ? `${overdue.length} record${overdue.length > 1 ? "s are" : " is"} overdue`
              : `${dueSoon.length} record${dueSoon.length > 1 ? "s" : ""} due within 3 days`}
          </div>
        </div>
        <button onClick={() => setDismissed(true)} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.textMuted, fontSize: 16, padding: 4, flexShrink: 0 }}>✕</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {items.slice(0, 3).map(r => {
          const daysLeft = Math.ceil((new Date(r.dueDate) - new Date()) / 86400000);
          return (
            <div key={r.id} onClick={onNavigateDebt} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: isUrgent ? "#FEE2E2" : "#FEF3C7",
              borderRadius: 8, padding: "6px 10px", cursor: onNavigateDebt ? "pointer" : "default",
            }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: isUrgent ? COLORS.danger : COLORS.amber }}>{r.name}</div>
              <div style={{ fontSize: 10, color: isUrgent ? COLORS.danger : COLORS.amber, fontWeight: 700 }}>
                {isUrgent ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? "Due today" : `${daysLeft}d left`}
              </div>
            </div>
          );
        })}
        {items.length > 3 && <div style={{ fontSize: 11, color: COLORS.textMuted, paddingLeft: 4 }}>+{items.length - 3} more…</div>}
      </div>
      {onNavigateDebt && (
        <button onClick={onNavigateDebt} style={{
          marginTop: 8, width: "100%", padding: "7px", border: "none",
          borderRadius: 8, background: isUrgent ? COLORS.danger : COLORS.amber,
          color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
        }}>View in Debt & Credit →</button>
      )}
    </div>
  );
}


// ===================== MINI BAR CHART =====================
function MiniBarChart({ data, color, label }) {
  // data: [{month: "Jan", value: 12000}, ...]
  const ref = React.useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !data || data.length === 0) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const max = Math.max(...data.map(d => d.value), 1);
    const pad = { top: 6, bottom: 22, left: 4, right: 4 };
    const barW = (W - pad.left - pad.right) / data.length;

    ctx.clearRect(0, 0, W, H);

    data.forEach((d, i) => {
      const barH = ((d.value / max) * (H - pad.top - pad.bottom)) || 2;
      const x = pad.left + i * barW + barW * 0.15;
      const y = H - pad.bottom - barH;
      const w = barW * 0.7;

      // bar background
      ctx.fillStyle = "rgba(0,0,0,0.04)";
      ctx.beginPath();
      ctx.roundRect(x, pad.top, w, H - pad.top - pad.bottom, 4);
      ctx.fill();

      // bar fill
      const grad = ctx.createLinearGradient(0, y, 0, H - pad.bottom);
      grad.addColorStop(0, color);
      grad.addColorStop(1, color + "88");
      ctx.fillStyle = d.value > 0 ? grad : "transparent";
      ctx.beginPath();
      ctx.roundRect(x, y, w, barH, 4);
      ctx.fill();

      // month label
      ctx.fillStyle = "rgba(100,116,139,0.8)";
      ctx.font = "8px Sora, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(d.month.slice(0,3), x + w / 2, H - 6);
    });
  }, [data, color]);

  return (
    <div>
      {label && <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>{label}</div>}
      <canvas ref={ref} width={280} height={80} style={{ width: "100%", height: 80, display: "block" }} />
    </div>
  );
}

// ===================== AUTH =====================
function WelcomeScreen({ onNavigate }) {
  return (
    <div className="welcome-screen" style={{ justifyContent: "center", padding: "2rem 1.5rem" }}>
      {/* Logo + branding */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
        <div style={{ width: 88, height: 88, borderRadius: 26, background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46, marginBottom: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>📒</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 28, fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 8 }}>Record Chief</div>
        <div style={{ fontSize: 14, opacity: 0.75, textAlign: "center", maxWidth: 260, lineHeight: 1.7 }}>
          Track sales, inventory, farm expenses & more — built for Nigerian businesses.
        </div>
        {/* Feature pills */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {["🏪 Shop Sales", "🌾 Farm Records", "🤝 Debt Tracker", "💼 Sales Rep"].map(f => (
            <span key={f} style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 600 }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Action card — centred, not snapped to bottom */}
      <div style={{
        background: "#fff", borderRadius: 24, padding: "28px 24px 28px",
        width: "100%", maxWidth: 380,
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: COLORS.text, marginBottom: 4 }}>Get Started</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 22 }}>Join thousands of Nigerian business owners</div>
        <button className="btn btn-primary" style={{ marginBottom: 12, fontSize: 15, padding: "13px" }} onClick={() => onNavigate("signup")}>
          Create Free Account
        </button>
        <button onClick={() => onNavigate("login")} style={{
          width: "100%", padding: "13px", border: `1.5px solid ${COLORS.border}`, borderRadius: 9,
          background: "transparent", color: COLORS.text, fontWeight: 600, fontSize: 15,
          cursor: "pointer", fontFamily: "'Inter', sans-serif",
        }}>Log In</button>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: COLORS.textLight }}>
          Free forever · No credit card required
        </div>
      </div>
    </div>
  );
}

const ALL_SECTORS = [
  { id: "sales",  icon: "💼", color: "#E8F2FB", borderColor: "#A8C8E8", label: "Sales Rep / Account Manager", desc: "Track clients, deals, and custom KPIs" },
  { id: "shop",   icon: "🏪", color: "#E6F7F1", borderColor: "#8ED5B8", label: "Shop Sales Record",           desc: "Inventory management and daily sales log" },
  { id: "farm",   icon: "🌾", color: "#FEF3E2", borderColor: "#F0C87A", label: "Farmers Expense Tracker",     desc: "Seeds, fertilizer, labor, and all farm costs" },
];

// ── Auth helpers ──
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isAlphaName  = (v) => /^[a-zA-Z\s'\-]+$/.test(v.trim());

const findAccount = (email) => { try { const a = JSON.parse(localStorage.getItem("sl_accounts_v1")) || {}; return a[email.toLowerCase()] || null; } catch { return null; } };
// ═══════════════════════════════════════════════════════════════
// AUTH LAYER — Firebase-ready
// ─────────────────────────────────────────────────────────────
// STEP 1 (now): Uses localStorage auth (works offline, no backend)
// STEP 2 (later): Swap FIREBASE_CONFIG and set USE_FIREBASE = true
//                 Everything else stays identical.
// ═══════════════════════════════════════════════════════════════

// ── Backend API URL ──────────────────────────────────────────────
const API_URL = "https://recordchief-backend-production.up.railway.app";

// ── Auth API — calls the real backend ────────────────────────────
const AuthAPI = {

  async signUp({ name, email, phone, location, password, sectors }) {
    try {
      const res  = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, location, password, sectors }),
      });
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data.error || "Sign up failed." };
      const user = { ...data.user, uid: data.user._id };
      localStorage.setItem("rc_token", data.token);
      localStorage.setItem("rc_session", JSON.stringify(user));
      return { ok: true, user };
    } catch(e) {
      return { ok: false, error: "Network error. Check your connection." };
    }
  },

  // Simple hash for offline password verification (not cryptographic — just a fingerprint)
  _hashPw(pw) {
    let h = 0;
    for (let i = 0; i < pw.length; i++) { h = (Math.imul(31, h) + pw.charCodeAt(i)) | 0; }
    return h.toString(36);
  },

  async signIn({ email, password }) {
    const emailKey = email.trim().toLowerCase();

    // Try online first with a short timeout
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (!res.ok) return { ok: false, error: data.error || "Login failed." };
      const user = { ...data.user, uid: data.user._id };
      localStorage.setItem("rc_token", data.token);
      localStorage.setItem("rc_session", JSON.stringify(user));
      // Always update offline credentials on successful online login
      localStorage.setItem(`rc_offline_${emailKey}`, JSON.stringify({
        hash: AuthAPI._hashPw(password),
        uid: user.uid,
      }));
      return { ok: true, user };
    } catch(e) {
      // Network failed or timed out — try offline fallback
      const offlineRec = (() => { try { return JSON.parse(localStorage.getItem(`rc_offline_${emailKey}`)); } catch { return null; } })();
      const session    = (() => { try { return JSON.parse(localStorage.getItem("rc_session")); } catch { return null; } })();
      const token      = localStorage.getItem("rc_token");

      if (!offlineRec || !session || !token) {
        return { ok: false, error: "No internet connection. Please connect and log in for the first time." };
      }
      if (session.email?.toLowerCase() !== emailKey) {
        return { ok: false, error: "Incorrect email or password." };
      }
      if (offlineRec.hash !== AuthAPI._hashPw(password)) {
        return { ok: false, error: "Incorrect password." };
      }
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          return { ok: false, error: "Your session expired. Please connect to the internet to log in again." };
        }
      } catch(ex) {
        return { ok: false, error: "Session error. Please connect and try again." };
      }
      return { ok: true, user: session, offline: true };
    }
  },

  async signOut() {
    localStorage.removeItem("rc_token");
    localStorage.removeItem("rc_session");
    localStorage.removeItem("sl_user");
    // Note: we keep rc_offline_* keys so user can still log back in offline
  },

  async resetPassword(email) {
    try {
      const res  = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      return res.ok ? { ok: true, message: data.message } : { ok: false, error: data.error };
    } catch(e) {
      return { ok: false, error: "Network error. Check your connection." };
    }
  },

  // Sync all user data to backend
  async syncToServer(uid) {
    const token = localStorage.getItem("rc_token");
    if (!token) return;
    try {
      const payload = {
        inventory:    JSON.parse(localStorage.getItem(`sl_inv_${uid}`)          || "[]"),
        shopSales:    JSON.parse(localStorage.getItem(`sl_shopsales_${uid}`)    || "[]"),
        farmExpenses: JSON.parse(localStorage.getItem(`sl_farm_${uid}`)         || "[]"),
        salesEntries: JSON.parse(localStorage.getItem(`sl_sales_${uid}`)        || "[]"),
        salesFields:  JSON.parse(localStorage.getItem(`sl_sales_fields_${uid}`) || "null"),
        debtRecords:  JSON.parse(localStorage.getItem(`sl_debt_${uid}`)         || "[]"),
      };
      await fetch(`${API_URL}/api/data`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
    } catch(e) { /* silent fail — data still safe in localStorage */ }
  },

  // Pull user data from backend and restore to localStorage
  async syncFromServer(uid) {
    const token = localStorage.getItem("rc_token");
    if (!token) return;
    try {
      const res  = await fetch(`${API_URL}/api/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) return;
      const { data } = await res.json();
      if (!data) return;
      if (data.inventory)    localStorage.setItem(`sl_inv_${uid}`,          JSON.stringify(data.inventory));
      if (data.shopSales)    localStorage.setItem(`sl_shopsales_${uid}`,    JSON.stringify(data.shopSales));
      if (data.farmExpenses) localStorage.setItem(`sl_farm_${uid}`,         JSON.stringify(data.farmExpenses));
      if (data.salesEntries) localStorage.setItem(`sl_sales_${uid}`,        JSON.stringify(data.salesEntries));
      if (data.salesFields)  localStorage.setItem(`sl_sales_fields_${uid}`, JSON.stringify(data.salesFields));
      if (data.debtRecords)  localStorage.setItem(`sl_debt_${uid}`,         JSON.stringify(data.debtRecords));
    } catch(e) { /* silent fail */ }
  },

  // Internal fallback (kept for backward compat)
  _getAccounts() { try { return JSON.parse(localStorage.getItem("sl_accounts_v1")) || {}; } catch { return {}; } },
  _saveAccount() {},
};



function SignupScreen({ onAuth, onNavigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", phone: "", location: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [sectorError, setSectorError] = useState("");

  const setField = (field, val) => { setForm(p => ({ ...p, [field]: val })); setErrors(p => ({ ...p, [field]: null })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    else if (!isAlphaName(form.name)) e.name = "Name can only contain letters, spaces, hyphens or apostrophes";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!isValidEmail(form.email)) e.email = "Enter a valid email address (e.g. you@example.com)";
    else if (AuthAPI._getAccounts()[form.email.trim().toLowerCase()]) e.email = "An account with this email already exists";
    if (form.phone.length < 7) e.phone = "Enter a valid phone number";
    if (!form.location.trim()) e.location = "Business location is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const goToSectorStep = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(2);
  };

  const toggleSector = (id) => {
    setSectorError("");
    setSelectedSectors(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const submit = async () => {
    if (selectedSectors.length === 0) { setSectorError("Please select at least one sector to continue."); return; }
    setLoading(true);
    try {
      const result = await AuthAPI.signUp({
        name: form.name.trim(), email: form.email.trim(),
        phone: form.phone, location: form.location.trim(),
        password: form.password, sectors: selectedSectors,
      });
      if (!result.ok) { setErrors({ email: result.error }); setLoading(false); return; }
      if (result.message) alert(result.message);
      onAuth(result.user, selectedSectors, true);
    } catch(e) {
      setErrors({ email: e.message || "Sign up failed. Please try again." });
      setLoading(false);
    }
  };

  if (step === 2) return (
    <div className="welcome-screen" style={{ justifyContent: "flex-start", paddingTop: "2.5rem" }}>
      <div className="auth-card" style={{ maxWidth: 400 }}>
        <button onClick={() => setStep(1)} style={{ background: "none", border: "none", color: COLORS.textMuted, marginBottom: 14, display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
          <Icon name="back" size={16} /> Back
        </button>
        <div style={{ display: "flex", align: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 24 }}>🗂️</span>
        </div>
        <div className="auth-title" style={{ marginTop: 6 }}>Pick your sectors</div>
        <div className="auth-sub">Select all that apply — you can use multiple sectors at once. You can always change this later in your profile.</div>

        {sectorError && (
          <div style={{ background: COLORS.dangerLight, color: COLORS.danger, borderRadius: 8, padding: "8px 12px", fontSize: 13, marginBottom: 12, fontWeight: 500 }}>
            {sectorError}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
          {ALL_SECTORS.map(s => {
            const active = selectedSectors.includes(s.id);
            return (
              <div key={s.id} onClick={() => toggleSector(s.id)} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 14px",
                borderRadius: 12, cursor: "pointer", transition: "all 0.18s",
                border: active ? `2px solid ${s.borderColor}` : `1.5px solid ${COLORS.border}`,
                background: active ? s.color : COLORS.surface,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{s.label}</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{s.desc}</div>
                </div>
                <div style={{
                  width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                  border: active ? "none" : `1.5px solid ${COLORS.border}`,
                  background: active ? COLORS.primary : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}>
                  {active && <Icon name="check" size={13} />}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: COLORS.primaryLight, borderRadius: 8, padding: "8px 12px", fontSize: 12, color: COLORS.primary, marginBottom: 14, display: "flex", gap: 6, alignItems: "flex-start" }}>
          <span style={{ marginTop: 1 }}>💡</span>
          <span>You can switch between your selected sectors any time from the home screen.</span>
        </div>

        <button className="btn btn-primary" onClick={submit} disabled={loading || selectedSectors.length === 0}
          style={{ opacity: selectedSectors.length === 0 ? 0.5 : 1 }}>
          {loading ? "Creating account…" : `Finish — ${selectedSectors.length === 0 ? "Select a sector" : `${selectedSectors.length} sector${selectedSectors.length > 1 ? "s" : ""} selected`}`}
        </button>
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: COLORS.textLight }}>Step 2 of 2</div>
      </div>
    </div>
  );

  return (
    <div className="welcome-screen" style={{ justifyContent: "flex-start", paddingTop: "2.5rem" }}>
      <div className="auth-card">
        <button onClick={() => onNavigate("welcome")} style={{ background: "none", border: "none", color: COLORS.textMuted, marginBottom: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}><Icon name="back" size={16} /> Back</button>
        <div className="auth-title">Create Account</div>
        <div className="auth-sub">Fill in your details to get started</div>
        <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
          <div style={{ flex: 1, height: 3, borderRadius: 2, background: COLORS.primary }} />
          <div style={{ flex: 1, height: 3, borderRadius: 2, background: COLORS.border }} />
        </div>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input className={`form-input${errors.name ? " error" : ""}`} type="text" placeholder="Adaeze Okonkwo" value={form.name}
            onChange={e => {
              const val = e.target.value.replace(/[^a-zA-Z\s'\-]/g, "");
              setField("name", val);
            }} />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className={`form-input${errors.email ? " error" : ""}`} type="email" placeholder="you@example.com" value={form.email}
            onChange={e => setField("email", e.target.value)} />
          {errors.email && <div className="form-error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <div style={{ display: "flex", gap: 6 }}>
            <select className="form-input" style={{ width: 80, flexShrink: 0 }}><option>+234</option><option>+233</option><option>+254</option><option>+256</option></select>
            <input className={`form-input${errors.phone ? " error" : ""}`} placeholder="8012345678" value={form.phone}
              onChange={e => setField("phone", e.target.value)} />
          </div>
          {errors.phone && <div className="form-error">{errors.phone}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Business Location</label>
          <input className={`form-input${errors.location ? " error" : ""}`} type="text" placeholder="e.g. Lagos, Abuja, Port Harcourt" value={form.location}
            onChange={e => setField("location", e.target.value)} />
          {errors.location && <div className="form-error">{errors.location}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input className={`form-input${errors.password ? " error" : ""}`} type="password" placeholder="At least 6 characters" value={form.password}
            onChange={e => setField("password", e.target.value)} />
          {errors.password && <div className="form-error">{errors.password}</div>}
        </div>

        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input className={`form-input${errors.confirm ? " error" : ""}`} type="password" placeholder="Repeat your password" value={form.confirm}
            onChange={e => setField("confirm", e.target.value)} />
          {errors.confirm && <div className="form-error">{errors.confirm}</div>}
        </div>

        <button className="btn btn-primary" onClick={goToSectorStep} style={{ marginTop: 4 }}>
          Next — Choose Sectors →
        </button>
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: COLORS.textLight }}>Step 1 of 2</div>
        <div style={{ textAlign: "center", marginTop: 8, fontSize: 13, color: COLORS.textMuted }}>
          Already have an account? <span style={{ color: COLORS.primary, cursor: "pointer", fontWeight: 600 }} onClick={() => onNavigate("login")}>Log in</span>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onAuth, onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");

  const setField = (field, val) => { setForm(p => ({ ...p, [field]: val })); setError(""); };

  const submit = async () => {
    if (!form.email.trim() || !form.password) { setError("Please fill in all fields."); return; }
    if (!isValidEmail(form.email)) { setError("Enter a valid email address."); return; }
    setLoading(true);
    try {
      const result = await AuthAPI.signIn({ email: form.email.trim(), password: form.password });
      if (!result.ok) { setLoading(false); setError(result.error || "Login failed. Please try again."); return; }
      if (result.offline) {
        // Show brief offline notice but still log them in
        setError(""); // clear any error
      }
      onAuth(result.user, result.user.sectors);
    } catch(e) {
      setLoading(false); setError(e.message || "Login failed. Please try again.");
    }
  };

  const handleForgot = async () => {
    if (!forgotEmail.trim() || !isValidEmail(forgotEmail)) { setForgotMsg("Enter a valid email address."); return; }
    const result = await AuthAPI.resetPassword(forgotEmail.trim());
    if (result.ok) setForgotMsg(USE_FIREBASE ? "Password reset email sent! Check your inbox." : "Password hint: no real email in local mode. Reset coming when backend is active.");
    else setForgotMsg(result.error || "No account found with that email.");
  };

  if (forgot) return (
    <div className="welcome-screen" style={{ justifyContent: "flex-start", paddingTop: "3rem" }}>
      <div className="auth-card">
        <button onClick={() => { setForgot(false); setForgotMsg(""); setForgotEmail(""); }} style={{ background: "none", border: "none", color: COLORS.textMuted, marginBottom: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}><Icon name="back" size={16} /> Back</button>
        <div className="auth-title">Reset Password</div>
        <div className="auth-sub">Enter your registered email address</div>
        {forgotMsg && (
          <div style={{ background: forgotMsg.startsWith("No") || forgotMsg.startsWith("Enter") ? COLORS.dangerLight : COLORS.accentLight, color: forgotMsg.startsWith("No") || forgotMsg.startsWith("Enter") ? COLORS.danger : COLORS.accent, borderRadius: 8, padding: "8px 12px", fontSize: 13, marginBottom: 12 }}>{forgotMsg}</div>
        )}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={forgotEmail} onChange={e => { setForgotEmail(e.target.value); setForgotMsg(""); }} />
        </div>
        <button className="btn btn-primary" onClick={handleForgot}>Check Account</button>
      </div>
    </div>
  );

  return (
    <div className="welcome-screen" style={{ padding: 0, justifyContent: "stretch" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2.5rem 2rem 1.5rem" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>👋</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Welcome back</div>
        <div style={{ fontSize: 13, opacity: 0.75, textAlign: "center" }}>Sign in to your Record Chief account</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: "0 20px" }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "28px 24px 36px", width: "100%", maxWidth: 400, marginBottom: 32, boxShadow: "0 8px 40px rgba(15,23,42,0.18)" }}>
        <button onClick={() => onNavigate("welcome")} style={{ background: "none", border: "none", color: COLORS.textMuted, marginBottom: 16, display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}><Icon name="back" size={16} /> Back</button>
        {error && (
          <div style={{ background: COLORS.dangerLight, color: COLORS.danger, borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
            <span>⚠️</span>{error}
          </div>
        )}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setField("email", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input className="form-input" type="password" placeholder="Your password" value={form.password} onChange={e => setField("password", e.target.value)}
            onKeyDown={e => e.key === "Enter" && submit()} />
        </div>
        <div style={{ textAlign: "right", marginTop: -6, marginBottom: 18 }}>
          <span style={{ fontSize: 12, color: COLORS.primary, cursor: "pointer", fontWeight: 500 }} onClick={() => setForgot(true)}>Forgot password?</span>
        </div>
        <button className="btn btn-primary" onClick={submit} disabled={loading} style={{ fontSize: 15, padding: "13px" }}>
          {loading ? "Signing in…" : "Sign In"}
        </button>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: COLORS.textMuted }}>
          New here? <span style={{ color: COLORS.primary, cursor: "pointer", fontWeight: 700 }} onClick={() => onNavigate("signup")}>Create free account</span>
        </div>
      </div>
      </div>
    </div>
  );
}

// ===================== HOME (SECTOR PICKER) =====================
function HomeScreen({ user, sector, onSetSector, onManageSectors, onViewOverview, onViewDebt }) {
  const userSectors = (user.sectors && user.sectors.length > 0) ? user.sectors : ["shop"];
  const activeSectors = ALL_SECTORS.filter(s => userSectors.includes(s.id));
  const avatarKey = `sl_avatar_${user.uid}`;
  const storedAvatar = (() => { try { return JSON.parse(localStorage.getItem(avatarKey)); } catch { return null; } })();
  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const today = new Date().toLocaleDateString("en-NG", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div style={{ paddingBottom: 16 }}>
      {/* Hero greeting banner */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 50%, #1E3A8A 100%)`,
        borderRadius: 20, padding: "20px 18px", marginBottom: "1rem",
        position: "relative", overflow: "hidden", color: "#fff",
      }}>
        <div style={{ position: "absolute", top: -24, right: -24, width: 96, height: 96, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -16, right: 40, width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, overflow: "hidden", flexShrink: 0 }}>
            {storedAvatar ? <img src={storedAvatar} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="" /> : initials}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>{greeting} 👋</div>
            <div style={{ fontSize: 18, fontWeight: 700, marginTop: 1 }}>{user.name.split(" ")[0]}</div>
          </div>
          <button onClick={onViewOverview} style={{
            background: "rgba(255,255,255,0.15)", border: "1.5px solid rgba(255,255,255,0.3)",
            borderRadius: 12, padding: "7px 12px", color: "#fff", cursor: "pointer",
            fontFamily: "'Inter', sans-serif", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, transition: "background 0.15s", flexShrink: 0,
          }}>
            <span style={{ fontSize: 16 }}>📊</span>
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.04em", opacity: 0.9 }}>OVERVIEW</span>
          </button>
        </div>
        <div style={{ fontSize: 11, opacity: 0.55, marginTop: 10, display: "flex", alignItems: "center", gap: 4 }}>
          📅 {today}
          {user.location && <> · 📍 {user.location}</>}
        </div>
      </div>

      {/* Notification banner */}
      <NotificationBanner user={user} />

      {/* Cloud backup reminder — only show offline */}
      {!navigator.onLine && (() => {
        const lastExportKey = `sl_lastexport_${user?.uid}`;
        const lastExport = localStorage.getItem(lastExportKey);
        const daysSince = lastExport ? Math.floor((Date.now() - new Date(lastExport)) / 86400000) : 999;
        if (daysSince < 7) return null;
        return (
          <div style={{ background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 12, padding: "10px 14px", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>☁️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>
                {lastExport ? `No export in ${daysSince} days` : "No local backup yet"}
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>Export your records to keep a local copy.</div>
            </div>
            <button onClick={() => { setShowExport(true); localStorage.setItem(lastExportKey, new Date().toISOString()); }} style={{
              flexShrink: 0, background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8,
              padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif",
            }}>Export</button>
          </div>
        );
      })()}

      {/* Quick action grid */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
        <div className="section-title" style={{ margin: 0 }}>Your Sectors</div>
        <button onClick={onManageSectors} style={{ background: "none", border: "none", color: COLORS.primary, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 4 }}>
          <Icon name="settings" size={13} /> Manage
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: "1.25rem" }}>
        {activeSectors.map(s => (
          <div key={s.id} onClick={() => onSetSector(s.id)}
            onMouseEnter={e => {
              e.currentTarget.style.border = `2px solid ${s.borderColor}`;
              e.currentTarget.style.background = s.color;
              e.currentTarget.style.boxShadow = `0 4px 14px ${s.borderColor}55`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = `1.5px solid ${COLORS.border}`;
              e.currentTarget.style.background = COLORS.surface;
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(15,23,42,0.04)";
            }}
            style={{
              borderRadius: 16, padding: "16px 14px",
              border: `1.5px solid ${COLORS.border}`,
              background: COLORS.surface,
              cursor: "pointer", transition: "all 0.18s",
              boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
            }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, lineHeight: 1.3 }}>
              {s.id === "sales" ? "Sales Rep" : s.id === "shop" ? "Shop Sales" : "Farm"}
            </div>
            <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 3, lineHeight: 1.4 }}>{s.desc.split("—")[0].trim()}</div>
          </div>
        ))}
        {activeSectors.length === 0 && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem", color: COLORS.textMuted, fontSize: 13 }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>🗂️</div>
            Tap Manage to select your sectors
          </div>
        )}
        {/* Debt & Credit card — always shown, always clickable */}
        {(() => {
          const debtKey = `sl_debt_${user.uid}`;
          const recs = (() => { try { return JSON.parse(localStorage.getItem(debtKey)) || []; } catch { return []; } })();
          const outstanding = recs.filter(r => !r.settled).length;
          const overdue     = recs.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
          return (
            <div onClick={onViewDebt} style={{
              gridColumn: "1 / -1",
              borderRadius: 16, padding: "16px 14px",
              border: `2px solid ${overdue > 0 ? "#FCA5A5" : "#C7D2FE"}`,
              background: overdue > 0 ? "#FEF2F2" : "#EEF2FF",
              cursor: "pointer", transition: "all 0.18s",
              boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              display: "flex", alignItems: "center", gap: 14,
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ height: 3, position: "absolute", top: 0, left: 0, right: 0, background: overdue > 0 ? "#EF4444" : "#6366F1", borderRadius: "14px 14px 0 0" }} />
              <div style={{ width: 44, height: 44, borderRadius: 12, background: overdue > 0 ? "#FEE2E2" : "#E0E7FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🤝</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>Debt & Credit</div>
                <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 2 }}>
                  {outstanding > 0 ? `${outstanding} outstanding record${outstanding !== 1 ? "s" : ""}` : "No outstanding records"}
                </div>
              </div>
              {overdue > 0 && (
                <div style={{ background: "#EF4444", color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                  {overdue} overdue
                </div>
              )}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </div>
          );
        })()}
      </div>

      {/* Bottom caption */}
      <div style={{ textAlign: "center", marginTop: "1.5rem", paddingBottom: 4 }}>
        <div style={{ fontSize: 11, color: COLORS.textLight, fontStyle: "italic", letterSpacing: "0.02em" }}>
          Your business records, organized
        </div>
      </div>

    </div>
  );
}

// ===================== SALES REP MODE =====================
function SalesRepScreen({ user }) {
  const storageKey = `sl_sales_${user.uid}`;
  const fieldsKey = `sl_sales_fields_${user.uid}`;
  const [entries, setEntries] = useLocalState(storageKey, []);
  const [fields, setFields] = useLocalState(fieldsKey, null);
  const [tab, setTab] = useState("entry");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [setupMode, setSetupMode] = useState(false);
  const [draftFields, setDraftFields] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [sortBy, setSortBy] = useState("date_desc");
  const [showFilters, setShowFilters] = useState(false);
  const [showManageFields, setShowManageFields] = useState(false);
  const [showFieldChoice, setShowFieldChoice] = useState(false);

  const showToast = (msg, type = "success") => { setToast({ msg, type }); };

  const defaultFields = [
    { id: "f_date", name: "Date", type: "Date" },
    { id: "f_notes", name: "Notes", type: "Text" },
  ];
  const activeFields = fields || defaultFields;

  useEffect(() => {
    // Show manage fields on first open if no fields defined
    if (!fields) setShowManageFields(false); // handled via inline prompt
  }, []);

  const saveEntry = () => {
    const e = {};
    activeFields.forEach(f => {
      if (!form[f.id] && f.id !== "f_notes") e[f.id] = `${f.name} is required`;
    });
    if (Object.keys(e).length) { setErrors(e); return; }
    const entry = { id: editId || uid(), ...form, createdAt: TS() };
    if (editId) {
      setEntries(prev => prev.map(x => x.id === editId ? entry : x));
      setEditId(null);
      showToast("Entry updated!");
    } else {
      setEntries(prev => [entry, ...prev]);
      showToast("Entry saved!");
    }
    setForm({});
    setShowEntryForm(false);
  };

  const deleteEntry = (id) => { setEntries(prev => prev.filter(x => x.id !== id)); showToast("Entry deleted", "error"); };

  const startEdit = (entry) => {
    setForm({ ...entry });
    setEditId(entry.id);
  };

  const finishSetup = () => {
    const combined = [...defaultFields, ...draftFields.filter(f => f.name.trim())];
    setFields(combined);
    setDraftFields([]);
    setSetupMode(false);
    showToast("Columns saved!");
  };

  // setupMode is now handled inline in the bottom-sheet modal

  const renderField = (field, isFirst = false) => {
    const val = form[field.id] || "";
    const err = errors[field.id];

    // Prominent first-field wrapper style
    const firstWrap = isFirst ? {
      background: COLORS.primaryLight,
      border: `1.5px solid ${COLORS.primary}40`,
      borderRadius: 14,
      padding: "14px 14px 10px",
      marginBottom: "1rem",
    } : {};
    const firstLabel = isFirst ? { fontSize: 11, fontWeight: 700, color: COLORS.primary, textTransform: "uppercase", letterSpacing: "0.06em" } : {};
    const firstInput = isFirst ? { fontSize: 16, fontWeight: 600, border: "none", background: "#fff", borderRadius: 10, padding: "12px 14px", boxShadow: "0 1px 4px rgba(37,99,235,0.10)" } : {};

    if (field.type === "Date") return (
      <div style={firstWrap} className={isFirst ? "" : "form-group"} key={field.id}>
        <label className="form-label" style={firstLabel}>{field.name}</label>
        <input type="date" className={`form-input${err ? " error" : ""}`} style={firstInput} value={val || TODAY()} onChange={e => setForm(p => ({ ...p, [field.id]: e.target.value }))} />
        {err && <div className="form-error">{err}</div>}
      </div>
    );
    if (field.type === "Number") return (
      <div style={firstWrap} className={isFirst ? "" : "form-group"} key={field.id}>
        <label className="form-label" style={firstLabel}>{field.name}</label>
        <input type="number" className={`form-input${err ? " error" : ""}`} style={firstInput} placeholder="0" value={val} onChange={e => setForm(p => ({ ...p, [field.id]: e.target.value }))} />
        {err && <div className="form-error">{err}</div>}
      </div>
    );
    if (field.type === "Yes/No") return (
      <div style={firstWrap} className={isFirst ? "" : "form-group"} key={field.id}>
        <label className="form-label" style={firstLabel}>{field.name}</label>
        <div style={{ display: "flex", gap: 8 }}>
          {["Yes", "No"].map(opt => (
            <button key={opt} className={`btn btn-sm${val === opt ? " btn-primary" : " btn-outline"}`} style={{ flex: 1, ...(isFirst ? { fontWeight: 700, fontSize: 14 } : {}) }} onClick={() => setForm(p => ({ ...p, [field.id]: opt }))}>{opt}</button>
          ))}
        </div>
      </div>
    );
    // Text / Notes
    return (
      <div style={firstWrap} className={isFirst ? "" : "form-group"} key={field.id}>
        <label className="form-label" style={firstLabel}>{field.name}</label>
        <textarea className={`form-input${err ? " error" : ""}`}
          style={{ ...firstInput, ...(isFirst ? { resize: "none" } : {}) }}
          rows={isFirst ? 2 : (field.name === "Notes" ? 3 : 1)}
          placeholder={isFirst ? `Enter ${field.name}…` : `Enter ${field.name}`}
          value={val}
          onChange={e => setForm(p => ({ ...p, [field.id]: e.target.value }))} />
        {err && <div className="form-error">{err}</div>}
      </div>
    );
  };

  const openAdd = () => {
    setEditId(null);
    setErrors({});
    if (fields) {
      // Fields already set up — ask user: keep or reset
      setShowFieldChoice(true);
    } else {
      // First time — go straight to field setup inside form
      const preForm = {};
      defaultFields.forEach(f => { if (f.type === "Date") preForm[f.id] = TODAY(); });
      setForm(preForm);
      setShowManageFields(true);
      setShowEntryForm(true);
    }
  };

  const proceedWithExistingFields = () => {
    const preForm = {};
    activeFields.forEach(f => { if (f.type === "Date") preForm[f.id] = TODAY(); });
    setForm(preForm);
    setShowFieldChoice(false);
    setShowManageFields(false);
    setShowEntryForm(true);
  };

  const proceedWithNewFields = () => {
    setFields(null);
    setDraftFields([]);
    const preForm = {};
    defaultFields.forEach(f => { if (f.type === "Date") preForm[f.id] = TODAY(); });
    setForm(preForm);
    setShowFieldChoice(false);
    setShowManageFields(true);
    setShowEntryForm(true);
  };

  const openEdit = (entry) => {
    setForm({ ...entry });
    setEditId(entry.id);
    setErrors({});
    setShowEntryForm(true);
  };

  // Split fields: date+notes go last, custom fields first
  const dateNoteIds = new Set(["f_date", "f_notes"]);
  const customFields   = activeFields.filter(f => !dateNoteIds.has(f.id));
  const dateNoteFields = activeFields.filter(f => dateNoteIds.has(f.id));
  const orderedFields  = [...customFields, ...dateNoteFields];

  const filtered = (() => {
    let list = entries.filter(e => !search || JSON.stringify(e).toLowerCase().includes(search.toLowerCase()));
    const firstId = orderedFields[0]?.id;
    const dateId  = activeFields.find(f => f.type === "Date")?.id || "f_date";
    list = [...list].sort((a, b) => {
      switch (sortBy) {
        case "date_asc":  return (a[dateId] || a.createdAt) < (b[dateId] || b.createdAt) ? -1 : 1;
        case "date_desc": return (a[dateId] || a.createdAt) > (b[dateId] || b.createdAt) ? -1 : 1;
        case "name_asc":  return (a[firstId] || "").localeCompare(b[firstId] || "");
        case "name_desc": return (b[firstId] || "").localeCompare(a[firstId] || "");
        case "newest":    return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":    return new Date(a.createdAt) - new Date(b.createdAt);
        default:          return 0;
      }
    });
    return list;
  })();


  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>👥 Customer Records</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted }}>{entries.length} customer record{entries.length !== 1 ? "s" : ""}</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-success btn-sm" onClick={() => setShowExport(true)}><Icon name="download" size={14} /> Export</button>
        </div>
      </div>

      {/* History — always visible */}
      <SmartSearch value={search} onChange={setSearch} placeholder="Search entries…" resultCount={filtered.length} />

      {/* Sort dropdown */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
        <label style={{ fontSize: 13, color: COLORS.textMuted, fontWeight: 600, flexShrink: 0 }}>Sort by:</label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="form-input"
          style={{ flex: 1, padding: "9px 12px", fontSize: 14 }}
        >
          <option value="date_desc">📅 Newest date</option>
          <option value="date_asc">📅 Oldest date</option>
          <option value="name_asc">🔤 A → Z</option>
          <option value="name_desc">🔤 Z → A</option>
          <option value="newest">🕐 Recently added</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state"><div class="empty-icon">👥</div><h3>No customer records yet</h3><p>Tap the + button to add your first record</p></div>
      ) : (
        <div className="card">
          {filtered.map(entry => {
            const firstField = orderedFields[0];
            const firstVal   = entry[firstField?.id];
            const otherFields = orderedFields.slice(1).filter(f => entry[f.id] && f.id !== "f_notes");
            return (
              <div key={entry.id} style={{ padding: "12px 0", borderBottom: `0.5px solid ${COLORS.border}` }}>
                {/* First field — prominent headline */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 16 }}>👤</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {firstVal || <span style={{ color: COLORS.textLight, fontStyle: "italic" }}>No {firstField?.name}</span>}
                    </div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>
                      {new Date(entry.createdAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    {otherFields.length > 0 && (
                      <div style={{ display: "flex", gap: 8, marginTop: 5, flexWrap: "wrap" }}>
                        {otherFields.slice(0, 2).map(f => (
                          <span key={f.id} style={{ fontSize: 11, background: COLORS.bg, border: `0.5px solid ${COLORS.border}`, borderRadius: 6, padding: "2px 8px", color: COLORS.textMuted }}>
                            {f.name}: <strong style={{ color: COLORS.text }}>{entry[f.id]}</strong>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                    <button className="btn btn-sm btn-outline" onClick={() => openEdit(entry)}><Icon name="edit" size={13} /></button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteEntry(entry.id)}><Icon name="trash" size={13} /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* FAB */}
      <button
        onClick={openAdd}
        title="New entry"
        style={{
          position: "fixed", bottom: "calc(28px + var(--fab-lift, 0px))", right: 28, zIndex: 200,
          width: 56, height: 56, borderRadius: "50%",
          background: COLORS.primary, color: "#fff", border: "none",
          boxShadow: "0 4px 18px rgba(27,108,168,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(27,108,168,0.55)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)";   e.currentTarget.style.boxShadow="0 4px 18px rgba(27,108,168,0.45)"; }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
      </button>

      {/* ── Field choice pop-up ── */}
      {showFieldChoice && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.45)",
        }} onClick={() => setShowFieldChoice(false)}>
          <div style={{
            background: "#fff", borderRadius: 20, padding: "24px 20px",
            width: "calc(100% - 48px)", maxWidth: 360,
            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            animation: "scaleIn 0.2s cubic-bezier(0.4,0,0.2,1)",
          }} onClick={e => e.stopPropagation()}>

            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, marginBottom: 6 }}>New Entry</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>
                Would you like to keep your existing fields or start fresh with new ones?
              </div>
            </div>

            {/* Current fields preview */}
            <div style={{ background: COLORS.bg, borderRadius: 12, padding: "10px 14px", marginBottom: 18 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Current fields</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {activeFields.map(f => (
                  <span key={f.id} style={{ fontSize: 11, fontWeight: 600, background: COLORS.primaryLight, color: COLORS.primary, border: `1px solid ${COLORS.primary}30`, borderRadius: 6, padding: "3px 9px" }}>
                    {f.name}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button onClick={proceedWithExistingFields} style={{
                padding: "13px", border: "none", borderRadius: 12, cursor: "pointer",
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
                color: "#fff", fontWeight: 700, fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                boxShadow: "0 3px 10px rgba(37,99,235,0.3)",
              }}>
                ✅ Keep current fields
              </button>
              <button onClick={proceedWithNewFields} style={{
                padding: "13px", border: `1.5px solid ${COLORS.border}`, borderRadius: 12, cursor: "pointer",
                background: "#fff", color: COLORS.text, fontWeight: 600, fontSize: 14,
                fontFamily: "'Inter', sans-serif",
              }}>
                🔄 Reset & create new fields
              </button>
            </div>

            <button onClick={() => setShowFieldChoice(false)} style={{
              width: "100%", marginTop: 12, background: "none", border: "none",
              fontSize: 13, color: COLORS.textMuted, cursor: "pointer",
              fontFamily: "'Inter', sans-serif", padding: "6px",
            }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Entry modal — centred, scrollable, never overflows screen */}
      {showEntryForm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "16px",
          background: "rgba(0,0,0,0.5)",
        }} onClick={() => { setShowEntryForm(false); setShowManageFields(false); }}>
          <div style={{
            background: "#fff", borderRadius: 20,
            padding: "0 0 4px",
            width: "100%", maxWidth: 420,
            maxHeight: "calc(100vh - 32px)",
            display: "flex", flexDirection: "column",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            animation: "scaleIn 0.22s cubic-bezier(0.4,0,0.2,1)",
          }} onClick={e => e.stopPropagation()}>

            {/* Sticky header */}
            <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👤</div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>{editId ? "Edit Record" : "New Customer Record"}</div>
                </div>
                <button onClick={() => { setShowEntryForm(false); setShowManageFields(false); setEditId(null); setForm({}); }} style={{ background: COLORS.bg, border: "none", cursor: "pointer", color: COLORS.textMuted, width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>×</button>
              </div>
            </div>

            {/* Scrollable body */}
            <div style={{ overflowY: "auto", padding: "16px 18px", flex: 1, WebkitOverflowScrolling: "touch" }}>

            {editId && <div style={{ background: COLORS.amberLight, color: COLORS.amber, borderRadius: 8, padding: "7px 12px", fontSize: 12, marginBottom: 12, fontWeight: 500 }}>Editing existing entry</div>}

            {/* First-time setup prompt if no custom fields yet */}
            {!fields && !showManageFields && (
              <div style={{ background: COLORS.primaryLight, border: `1px solid ${COLORS.primary}30`, borderRadius: 12, padding: "12px 14px", marginBottom: 16, display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 20 }}>💡</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.primary }}>Customise your fields</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>Date & Notes are included by default. Add custom fields for your business.</div>
                </div>
                <button onClick={() => setShowManageFields(true)} style={{ background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap" }}>Add Fields</button>
              </div>
            )}

            {/* Entry fields */}
            {orderedFields.map((field, i) => renderField(field, i === 0))}

            {/* ── Manage fields section (collapsible) ── */}
            <div style={{ marginTop: 8 }}>
              <button onClick={() => setShowManageFields(v => !v)} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 14px", background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                borderRadius: showManageFields ? "10px 10px 0 0" : 10,
                cursor: "pointer", fontFamily: "'Inter', sans-serif",
                fontSize: 13, fontWeight: 600, color: COLORS.textMuted,
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Icon name="settings" size={14} /> Manage fields
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: "transform 0.2s", transform: showManageFields ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M6 9l6 6 6-6"/></svg>
              </button>

              {showManageFields && (
                <div style={{ border: `1px solid ${COLORS.border}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "14px", background: "#fff" }}>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 10 }}>
                    Default fields (Date, Notes) are always included. Add your own below.
                  </div>

                  {/* Existing custom fields */}
                  {draftFields.length === 0 && (fields || []).filter(f => !["f_date","f_notes"].includes(f.id)).length === 0 && (
                    <div style={{ fontSize: 12, color: COLORS.textLight, fontStyle: "italic", marginBottom: 8 }}>No custom fields yet</div>
                  )}

                  {/* Show current saved custom fields */}
                  {(fields || []).filter(f => !["f_date","f_notes"].includes(f.id)).map(f => (
                    <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, padding: "7px 10px", background: COLORS.bg, borderRadius: 8 }}>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 500 }}>{f.name}</span>
                      <span className="pill pill-blue" style={{ fontSize: 10 }}>{f.type}</span>
                    </div>
                  ))}

                  {/* Draft new fields */}
                  {draftFields.map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                      <input className="form-input" placeholder="Field name" value={f.name}
                        onChange={e => setDraftFields(prev => prev.map((x, j) => j === i ? { ...x, name: e.target.value } : x))}
                        style={{ flex: 1 }} />
                      <select className="form-input" style={{ width: 100, flexShrink: 0 }} value={f.type}
                        onChange={e => setDraftFields(prev => prev.map((x, j) => j === i ? { ...x, type: e.target.value } : x))}>
                        <option>Text</option><option>Number</option><option>Date</option><option>Yes/No</option>
                      </select>
                      <button className="btn btn-danger btn-sm" onClick={() => setDraftFields(prev => prev.filter((_, j) => j !== i))}><Icon name="trash" size={13} /></button>
                    </div>
                  ))}

                  <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                    <button className="btn btn-outline btn-sm" style={{ flex: 1 }}
                      onClick={() => setDraftFields(prev => [...prev, { id: uid(), name: "", type: "Text" }])}>
                      <Icon name="plus" size={13} /> New field
                    </button>
                    {draftFields.length > 0 && (
                      <button className="btn btn-sm" style={{ flex: 1, background: COLORS.accent, color: "#fff" }}
                        onClick={() => {
                          const combined = [...(fields || defaultFields), ...draftFields.filter(f => f.name.trim())];
                          setFields(combined);
                          setDraftFields([]);
                          setShowManageFields(false);
                          showToast("Fields saved!");
                        }}>
                        Save fields
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            </div>{/* end scrollable body */}

            {/* Sticky footer with action buttons */}
            <div style={{ padding: "12px 18px 16px", borderTop: `1px solid ${COLORS.border}`, flexShrink: 0, display: "flex", gap: 10 }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => { setShowEntryForm(false); setShowManageFields(false); setEditId(null); setForm({}); }}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => { saveEntry(); }}>{editId ? "Update Record" : "Save Record"}</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
      {showExport && (
        <ExportModal
          title="Sales Data"
          onClose={() => setShowExport(false)}
          onExcelExport={() => {
            const headers = activeFields.map(f => f.name);
            const rows = entries.map(e => activeFields.map(f => e[f.id] || ""));
            exportToExcel("Sales_Data_" + TODAY(), "Sales", rows, headers);
            setShowExport(false); showToast("Excel file downloaded!");
          }}
          onPDFExport={() => {
            const headers = activeFields.map(f => f.name);
            const rows = entries.map(e => activeFields.map(f => e[f.id] || ""));
            exportToPDF("Sales Rep — Data Export", headers, rows, "Sales_Data");
            setShowExport(false);
          }}
        />
      )}
    </div>
  );
}

function RestockRow({ itemId, onRestock, onRemove, onUpdatePrice, currentPrice }) {
  const [qty, setQty]       = useState("");
  const [mode, setMode]     = useState(null); // null | "restock" | "price"
  const [newPrice, setNewPrice] = useState("");

  const addStock = () => {
    const q = parseInt(qty);
    if (!q || q <= 0) return;
    onRestock(itemId, q);
    setQty(""); setMode(null);
  };

  const savePrice = () => {
    const p = parseFloat(newPrice);
    if (!p || p <= 0) return;
    onUpdatePrice(itemId, p);
    setNewPrice(""); setMode(null);
  };

  return (
    <div style={{ marginTop: 8 }}>
      {mode === "restock" ? (
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <input type="number" className="form-input" placeholder="Qty to add" min="1" value={qty}
            onChange={e => setQty(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addStock()}
            style={{ flex: 1, padding: "7px 10px", fontSize: 13 }} autoFocus />
          <button className="btn btn-success btn-sm" onClick={addStock} style={{ whiteSpace: "nowrap" }}>Add</button>
          <button className="btn btn-outline btn-sm" onClick={() => { setMode(null); setQty(""); }}>✕</button>
        </div>
      ) : mode === "price" ? (
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted, fontSize: 14, fontWeight: 700 }}>₦</span>
            <input type="number" className="form-input" placeholder={String(currentPrice)} min="1" value={newPrice}
              onChange={e => setNewPrice(e.target.value)}
              onKeyDown={e => e.key === "Enter" && savePrice()}
              style={{ paddingLeft: 26, fontSize: 16, height: 44, fontWeight: 700 }} autoFocus />
          </div>
          <button className="btn btn-primary" onClick={savePrice}
            style={{ height: 44, padding: "0 12px", fontSize: 13, whiteSpace: "nowrap", flexShrink: 0 }}>✓</button>
          <button className="btn btn-outline" onClick={() => { setMode(null); setNewPrice(""); }}
            style={{ height: 44, padding: "0 10px", flexShrink: 0 }}>✕</button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 6 }}>
          <button className="btn btn-success btn-sm" style={{ flex: 2, fontSize: 12 }} onClick={() => setMode("restock")}>
            <Icon name="plus" size={13} /> Restock
          </button>
          <button
            onClick={() => { setNewPrice(String(currentPrice)); setMode("price"); }}
            style={{ flex: 2, background: COLORS.amberLight, border: `1px solid #FCD34D`, borderRadius: 8, padding: "5px 8px", fontSize: 11, fontWeight: 700, color: COLORS.amber, cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
            ✏️ Price
          </button>
          <button className="btn btn-danger btn-sm" onClick={() => onRemove(itemId)}><Icon name="trash" size={13} /></button>
        </div>
      )}
    </div>
  );
}

// ===================== SHOP MODE =====================
function ShopScreen({ user }) {
  const invKey = `sl_inv_${user.uid}`;
  const salesKey = `sl_shopsales_${user.uid}`;
  const [inventory, setInventory] = useLocalState(invKey, []);
  const [sales, setSales] = useLocalState(salesKey, []);
  const [tab, setTab] = useState(() => {
    if (localStorage.getItem("rc_open_inventory") === "1") {
      localStorage.removeItem("rc_open_inventory");
      return "inventory";
    }
    return "history";
  });
  const [form, setForm] = useState({ itemId: "", qty: "" });
  const [invForm, setInvForm] = useState({ name: "", price: "", stock: "" });
  const [invErrors, setInvErrors] = useState({});
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [showShopAction, setShowShopAction] = useState(false);
  const [period, setPeriod] = useState("week");
  const [salesSortBy, setSalesSortBy] = useState("date_desc");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [saleTag, setSaleTag] = useState("");
  const [invFormOpen, setInvFormOpen] = useState(false);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const todaySales = sales.filter(s => s.date === TODAY());
  const todayTotal = todaySales.reduce((a, s) => a + s.total, 0);
  const selectedItem = inventory.find(i => i.id === form.itemId);

  const addItem = () => {
    const e = {};
    if (!invForm.name.trim()) e.name = "Item name required";
    if (!invForm.price || isNaN(invForm.price)) e.price = "Enter a valid price";
    if (!invForm.stock || isNaN(invForm.stock)) e.stock = "Enter initial stock";
    if (Object.keys(e).length) { setInvErrors(e); return; }
    const item = { id: uid(), name: invForm.name.trim(), price: parseFloat(invForm.price), stock: parseInt(invForm.stock), createdAt: TS() };
    setInventory(prev => [...prev, item]);
    setInvForm({ name: "", price: "", stock: "" });
    showToast(`${item.name} added to inventory!`);
  };

  const recordSale = () => {
    const e = {};
    if (!form.itemId) e.itemId = "Select an item";
    const qty = parseInt(form.qty);
    if (!qty || qty <= 0) e.qty = "Enter valid quantity";
    else if (selectedItem && qty > selectedItem.stock) e.qty = `Only ${selectedItem.stock} in stock`;
    if (Object.keys(e).length) { setErrors(e); return; }
    const sale = { id: uid(), itemId: form.itemId, itemName: selectedItem.name, qty, price: selectedItem.price, total: qty * selectedItem.price, date: TODAY(), createdAt: TS() };
    setSales(prev => [sale, ...prev]);
    setInventory(prev => prev.map(i => i.id === form.itemId ? { ...i, stock: i.stock - qty } : i));
    setForm({ itemId: "", qty: "" });
    setErrors({});
    setShowSaleForm(false);
    showToast(`Sale recorded! ${NAIRA(sale.total)}`);
  };

  const removeItem = (id) => { setInventory(prev => prev.filter(i => i.id !== id)); showToast("Item removed", "error"); };
  const deleteSale = (id) => { setSales(prev => prev.map(s => s.id === id ? {...s, archived: true} : s)); showToast("Sale moved to archive", "error"); };
  const restoreSale = (id) => { setSales(prev => prev.map(s => s.id === id ? {...s, archived: false} : s)); showToast("Sale restored!"); };
  const addStock = (id, qty) => { setInventory(prev => prev.map(i => i.id === id ? { ...i, stock: i.stock + qty } : i)); showToast("Stock updated!"); };
  const updatePrice = (id, price) => { setInventory(prev => prev.map(i => i.id === id ? { ...i, price } : i)); showToast("Price updated!"); };

  const filteredSales = sales.filter(s => !search || s.itemName.toLowerCase().includes(search.toLowerCase()));


  const allTimeSales = sales.reduce((a, s) => a + s.total, 0);

  const getPeriodRange = () => {
    const now = new Date();
    const fmt = (d) => d.toISOString().slice(0, 10);
    if (period === "today") { const t = fmt(now); return { from: t, to: t }; }
    if (period === "week")  { const d = new Date(now); d.setDate(d.getDate()-6); return { from: fmt(d), to: fmt(now) }; }
    if (period === "month") { return { from: `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-01`, to: fmt(now) }; }
    if (period === "year")  { return { from: `${now.getFullYear()}-01-01`, to: fmt(now) }; }
    return { from: customFrom, to: customTo };
  };
  const { from: pFrom, to: pTo } = getPeriodRange();
  const periodSalesTotal = sales.filter(s => s.date && (!pFrom || s.date >= pFrom) && (!pTo || s.date <= pTo)).reduce((a, s) => a + s.total, 0);
  const periodSalesCount = sales.filter(s => s.date && (!pFrom || s.date >= pFrom) && (!pTo || s.date <= pTo)).length;
  const periodLabel = { today: "Today", week: "This Week", month: "This Month", year: "This Year", custom: "Custom" }[period];
  const lowStockItems = inventory.filter(i => i.stock > 0 && i.stock < 5);
  const outOfStockItems = inventory.filter(i => i.stock === 0);

  return (
    <div style={{ paddingBottom: 90 }}>

      {/* ── Header banner ── */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
        borderRadius: 18, padding: "18px 18px 16px", marginBottom: "1rem",
        color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🏪</div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.3px" }}>Shop Sales</div>
            <div style={{ fontSize: 11, opacity: 0.65, marginTop: 2 }}>{inventory.length} items tracked · {sales.length} total sales</div>
          </div>
          <button onClick={() => setShowExport(true)} style={{
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 10, padding: "7px 12px", color: "#fff", fontSize: 12,
            cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Icon name="download" size={13} /> Export
          </button>
        </div>
        {/* ── View Period Sale dropdown + stat tiles ── */}
        <div style={{ marginTop: 14 }}>

          {/* Dropdown — on top */}
          <div style={{ fontSize: 9, opacity: 0.65, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>View Period Sale</div>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            style={{
              width: "100%", padding: "9px 12px", borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.35)",
              background: "rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 13, fontWeight: 600,
              fontFamily: "'Inter', sans-serif", outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="today"  style={{ color: "#000", background: "#fff" }}>Today</option>
            <option value="week"   style={{ color: "#000", background: "#fff" }}>This Week</option>
            <option value="month"  style={{ color: "#000", background: "#fff" }}>This Month</option>
            <option value="year"   style={{ color: "#000", background: "#fff" }}>This Year</option>
            <option value="custom" style={{ color: "#000", background: "#fff" }}>Custom Range</option>
          </select>

          {/* Custom date inputs */}
          {period === "custom" && (
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, opacity: 0.6, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>From</div>
                <input type="date" value={customFrom} onChange={e => setCustomFrom(e.target.value)}
                  style={{ width: "100%", padding: "7px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontFamily: "'Inter', sans-serif", outline: "none" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, opacity: 0.6, fontWeight: 600, textTransform: "uppercase", marginBottom: 4 }}>To</div>
                <input type="date" value={customTo} onChange={e => setCustomTo(e.target.value)}
                  style={{ width: "100%", padding: "7px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.3)", background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontFamily: "'Inter', sans-serif", outline: "none" }} />
              </div>
            </div>
          )}

          {/* Stat tiles — Today + Selected Period */}
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.14)", borderRadius: 12, padding: "10px 12px" }}>
              <div style={{ fontSize: 9, opacity: 0.65, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Today's Sales</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, marginTop: 4 }}>{NAIRA(todayTotal)}</div>
              <div style={{ fontSize: 10, opacity: 0.55, marginTop: 1 }}>{todaySales.length} transaction{todaySales.length !== 1 ? "s" : ""}</div>
            </div>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.22)", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.3)" }}>
              <div style={{ fontSize: 9, opacity: 0.85, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{periodLabel}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, marginTop: 4 }}>{NAIRA(periodSalesTotal)}</div>
              <div style={{ fontSize: 10, opacity: 0.6, marginTop: 1 }}>{periodSalesCount} sale{periodSalesCount !== 1 ? "s" : ""}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stock alerts ── */}
      {(lowStockItems.length > 0 || outOfStockItems.length > 0) && (
        <div style={{ marginBottom: "0.75rem", display: "flex", flexDirection: "column", gap: 6 }}>
          {outOfStockItems.length > 0 && (
            <div style={{ background: COLORS.dangerLight, border: `1px solid #FCA5A5`, borderRadius: 10, padding: "8px 14px", fontSize: 12, color: COLORS.danger, fontWeight: 600, display: "flex", gap: 8 }}>
              🚫 {outOfStockItems.map(i => i.name).join(", ")} — out of stock
            </div>
          )}
          {lowStockItems.length > 0 && (
            <div style={{ background: COLORS.amberLight, border: `1px solid #FCD34D`, borderRadius: 10, padding: "8px 14px", fontSize: 12, color: COLORS.amber, fontWeight: 600, display: "flex", gap: 8 }}>
              ⚠️ Low stock: {lowStockItems.map(i => `${i.name} (${i.stock})`).join(", ")}
            </div>
          )}
        </div>
      )}

      {/* ── Tabs: History first, then Inventory ── */}
      <div className="tab-bar">
        <button className={`tab-btn${tab === "history" ? " active" : ""}`} onClick={() => setTab("history")}>
          Sales History
        </button>
        <button className={`tab-btn${tab === "inventory" ? " active" : ""}`} onClick={() => setTab("inventory")}>
          Inventory ({inventory.length})
        </button>
      </div>

      {/* ── HISTORY TAB ── */}
      {tab === "history" && (() => {
        // Best-selling items (all time)
        const itemTotals = {};
        sales.filter(s => !s.archived).forEach(s => {
          if (!itemTotals[s.itemName]) itemTotals[s.itemName] = { name: s.itemName, qty: 0, revenue: 0 };
          itemTotals[s.itemName].qty += s.qty;
          itemTotals[s.itemName].revenue += s.total;
        });
        const topItems = Object.values(itemTotals).sort((a,b) => b.revenue - a.revenue).slice(0, 5);
        const maxRevenue = topItems[0]?.revenue || 1;

        const base = sales.filter(s => {
          if (!s.date) return false;
          if (s.archived) return false;
          if (tagFilter && s.tag !== tagFilter) return false;
          return (!pFrom || s.date >= pFrom) && (!pTo || s.date <= pTo);
        });

        const filtered = base.filter(s =>
          !search || s.itemName.toLowerCase().includes(search.toLowerCase())
        );

        const sorted = [...filtered].sort((a, b) => {
          switch (salesSortBy) {
            case "date_desc":   return b.date.localeCompare(a.date);
            case "date_asc":    return a.date.localeCompare(b.date);
            case "amount_desc": return b.total - a.total;
            case "amount_asc":  return a.total - b.total;
            case "name_asc":    return a.itemName.localeCompare(b.itemName);
            case "name_desc":   return b.itemName.localeCompare(a.itemName);
            default:            return 0;
          }
        });

        return (
          <div>
            {/* ── Best-selling items ── */}
            {topItems.length > 0 && (
              <div className="card" style={{ marginBottom: "0.75rem" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  🏆 Best-Selling Items
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {topItems.map((item, i) => (
                    <div key={item.name}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 11, fontWeight: 800, color: i === 0 ? "#D97706" : i === 1 ? "#64748B" : i === 2 ? "#92400E" : COLORS.textMuted, width: 16 }}>#{i+1}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{item.name}</span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700, color: COLORS.accent }}>{NAIRA(item.revenue)}</div>
                          <div style={{ fontSize: 10, color: COLORS.textMuted }}>{item.qty} sold</div>
                        </div>
                      </div>
                      <div style={{ height: 5, borderRadius: 3, background: COLORS.bg, overflow: "hidden" }}>
                        <div style={{ height: "100%", borderRadius: 3, background: i === 0 ? "#D97706" : COLORS.accent, width: `${(item.revenue / maxRevenue) * 100}%`, transition: "width 0.5s" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tag filter chips */}
            {(() => {
              const allTags = [...new Set(sales.filter(s => s.tag).map(s => s.tag))];
              return allTags.length > 0 ? (
                <div className="chip-row" style={{ marginBottom: "0.65rem" }}>
                  <button onClick={() => setTagFilter("")} style={{
                    padding: "4px 11px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer",
                    fontFamily: "'Inter', sans-serif", border: tagFilter === "" ? `1.5px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
                    background: tagFilter === "" ? COLORS.primaryLight : COLORS.surface, color: tagFilter === "" ? COLORS.primary : COLORS.textMuted,
                  }}>All</button>
                  {allTags.map(tag => (
                    <button key={tag} onClick={() => setTagFilter(t => t === tag ? "" : tag)} style={{
                      padding: "4px 11px", borderRadius: 20, fontSize: 11, fontWeight: 600, cursor: "pointer",
                      fontFamily: "'Inter', sans-serif", border: tagFilter === tag ? `1.5px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
                      background: tagFilter === tag ? COLORS.primaryLight : COLORS.surface, color: tagFilter === tag ? COLORS.primary : COLORS.textMuted,
                    }}>🏷️ {tag}</button>
                  ))}
                </div>
              ) : null;
            })()}
            {/* Search + filter row */}
            <div style={{ display: "flex", gap: 8, marginBottom: "0.75rem", alignItems: "center" }}>
              <div style={{ flex: 1, position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: COLORS.textLight, pointerEvents: "none" }}>
                  <Icon name="search" size={15} />
                </span>
                <input
                  className="search-bar"
                  style={{ paddingRight: search ? 32 : 12 }}
                  placeholder="Search by item name…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                {search && (
                  <button onClick={() => setSearch("")} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: COLORS.border, border: "none", borderRadius: "50%", width: 18, height: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, fontSize: 11 }}>✕</button>
                )}
              </div>
              <select
                value={salesSortBy}
                onChange={e => setSalesSortBy(e.target.value)}
                style={{
                  flexShrink: 0, padding: "9px 10px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`,
                  background: COLORS.surface, fontSize: 12, fontWeight: 600, color: COLORS.text,
                  fontFamily: "'Inter', sans-serif", outline: "none", cursor: "pointer",
                }}
              >
                <option value="date_desc">📅 Newest</option>
                <option value="date_asc">📅 Oldest</option>
                <option value="amount_desc">💰 High → Low</option>
                <option value="amount_asc">💰 Low → High</option>
                <option value="name_asc">🔤 A → Z</option>
                <option value="name_desc">🔤 Z → A</option>
              </select>
            </div>

            {/* Result count */}
            {search && (
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>
                {sorted.length} result{sorted.length !== 1 ? "s" : ""} for "<strong>{search}</strong>"
              </div>
            )}

            {sorted.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 6 }}>
                  {search ? `No results for "${search}"` : `No sales for ${periodLabel.toLowerCase()}`}
                </div>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>
                  {sales.length === 0 ? "Tap the + button to record your first sale" : "Try a different search or period"}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {sorted.map(s => (
                  <div key={s.id} style={{
                    background: "#fff", borderRadius: 14,
                    border: `1px solid ${COLORS.border}`,
                    padding: "12px 14px",
                    display: "flex", alignItems: "center", gap: 12,
                    boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                  }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: COLORS.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>🛍️</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.itemName}</div>
                      <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                        <span>📅 {s.date}</span>
                        <span>×{s.qty} @ {NAIRA(s.price)}</span>
                        {s.tag && <span style={{ background: COLORS.primaryLight, color: COLORS.primary, borderRadius: 6, padding: "1px 7px", fontWeight: 600, fontSize: 10 }}>🏷️ {s.tag}</span>}
                      </div>
                    </div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: COLORS.accent, flexShrink: 0 }}>{NAIRA(s.total)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })()}

      {/* ── INVENTORY TAB ── */}
      {tab === "inventory" && (
        <div>
          {/* Add item toggle */}
          <button onClick={() => setInvFormOpen(v => !v)} style={{
            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 16px", background: invFormOpen ? COLORS.primaryLight : COLORS.surface,
            border: `1.5px solid ${invFormOpen ? COLORS.primary : COLORS.border}`,
            borderRadius: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif",
            fontSize: 13, fontWeight: 600, color: invFormOpen ? COLORS.primary : COLORS.text,
            marginBottom: invFormOpen ? 0 : "0.75rem",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Icon name="plus" size={15} /> Add New Item</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: invFormOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}><path d="M6 9l6 6 6-6"/></svg>
          </button>

          {invFormOpen && (
            <div style={{ border: `1.5px solid ${COLORS.primary}`, borderTop: "none", borderRadius: "0 0 12px 12px", padding: "14px", marginBottom: "0.75rem", background: "#fff" }}>
              <div className="form-group">
                <label className="form-label">Item Name</label>
                <input className={`form-input${invErrors.name ? " error" : ""}`} placeholder="e.g. Rice 50kg" value={invForm.name}
                  onChange={e => { setInvForm(p => ({ ...p, name: e.target.value })); setInvErrors(p => ({ ...p, name: null })); }} />
                {invErrors.name && <div className="form-error">{invErrors.name}</div>}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Price (₦)</label>
                  <input type="number" className={`form-input${invErrors.price ? " error" : ""}`} placeholder="0.00" value={invForm.price}
                    onChange={e => { setInvForm(p => ({ ...p, price: e.target.value })); setInvErrors(p => ({ ...p, price: null })); }} />
                  {invErrors.price && <div className="form-error">{invErrors.price}</div>}
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Initial Stock</label>
                  <input type="number" className={`form-input${invErrors.stock ? " error" : ""}`} placeholder="0" value={invForm.stock}
                    onChange={e => { setInvForm(p => ({ ...p, stock: e.target.value })); setInvErrors(p => ({ ...p, stock: null })); }} />
                  {invErrors.stock && <div className="form-error">{invErrors.stock}</div>}
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => { addItem(); setInvFormOpen(false); }}>
                <Icon name="plus" size={15} /> Add to Inventory
              </button>
            </div>
          )}

          {inventory.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📦</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text, marginBottom: 6 }}>No items yet</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>Tap "Add New Item" above to stock your shop</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {inventory.map(item => {
                const stockColor = item.stock === 0 ? COLORS.danger : item.stock < 5 ? COLORS.amber : COLORS.accent;
                const stockBg    = item.stock === 0 ? COLORS.dangerLight : item.stock < 5 ? COLORS.amberLight : COLORS.accentLight;
                return (
                  <div key={item.id} style={{
                    background: "#fff", borderRadius: 14, overflow: "hidden",
                    border: `1px solid ${item.stock === 0 ? "#FCA5A5" : item.stock < 5 ? "#FCD34D" : COLORS.border}`,
                    boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                  }}>
                    <div style={{ height: 3, background: stockColor }} />
                    <div style={{ padding: "12px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 42, height: 42, borderRadius: 11, background: stockBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                          {item.stock === 0 ? "🚫" : item.stock < 5 ? "⚠️" : "📦"}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{item.name}</div>
                          <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{NAIRA(item.price)} per unit</div>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: stockColor }}>
                            {item.stock}
                          </div>
                          <div style={{ fontSize: 9, color: stockColor, fontWeight: 600, textTransform: "uppercase" }}>
                            {item.stock === 0 ? "out of stock" : "in stock"}
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: 10 }}>
                        <div style={{ height: 6, borderRadius: 3, background: COLORS.bg, overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: 3, background: stockColor, width: `${Math.min(100, (item.stock / Math.max(item.stock, 20)) * 100)}%`, transition: "width 0.3s" }} />
                        </div>
                      </div>
                      <RestockRow itemId={item.id} onRestock={addStock} onRemove={removeItem} onUpdatePrice={updatePrice} currentPrice={item.price} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── FAB ── */}
      <button
        onClick={() => setShowShopAction(true)}
        title="Add sale or stock"
        style={{
          position: "fixed", bottom: "calc(28px + var(--fab-lift, 0px))", right: 28, zIndex: 200,
          width: 56, height: 56, borderRadius: "50%",
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
          color: "#fff", border: "none",
          boxShadow: "0 4px 18px rgba(37,99,235,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
      </button>

      {/* ── Action choice popup ── */}
      {showShopAction && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24, background: "rgba(0,0,0,0.5)",
        }} onClick={() => setShowShopAction(false)}>
          <div style={{
            background: "#fff", borderRadius: 22, padding: "28px 20px 20px",
            width: "100%", maxWidth: 340,
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            animation: "scaleIn 0.2s cubic-bezier(0.4,0,0.2,1)",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{ fontSize: 40, marginBottom: 10 }}>🏪</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>What would you like to do?</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button onClick={() => { setShowShopAction(false); setForm({ itemId: "", qty: "" }); setErrors({}); setShowSaleForm(true); }} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "16px",
                background: COLORS.accentLight, border: `2px solid #6EE7B7`,
                borderRadius: 16, cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left",
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: COLORS.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>🛍️</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Record a Sale</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>Log a new sale from your inventory</div>
                </div>
              </button>
              <button onClick={() => { setShowShopAction(false); setTab("inventory"); setInvFormOpen(true); }} style={{
                display: "flex", alignItems: "center", gap: 16, padding: "16px",
                background: COLORS.primaryLight, border: `2px solid #BFDBFE`,
                borderRadius: 16, cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left",
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>📦</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.text }}>Add New Stock</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>Add a new item or restock inventory</div>
                </div>
              </button>
            </div>
            <button onClick={() => setShowShopAction(false)} style={{
              width: "100%", marginTop: 14, padding: "10px",
              background: "none", border: "none", cursor: "pointer",
              fontSize: 14, color: COLORS.textMuted, fontFamily: "'Inter', sans-serif",
            }}>Cancel</button>
          </div>
        </div>
      )}

      {/* ── Record Sale centred modal ── */}
      {showSaleForm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16, background: "rgba(0,0,0,0.5)",
        }} onClick={() => setShowSaleForm(false)}>
          <div style={{
            background: "#fff", borderRadius: 20,
            width: "100%", maxWidth: 420,
            maxHeight: "calc(100vh - 32px)",
            display: "flex", flexDirection: "column",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            animation: "scaleIn 0.22s cubic-bezier(0.4,0,0.2,1)",
          }} onClick={e => e.stopPropagation()}>

            {/* Sticky header */}
            <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🛍️</div>
                  <div style={{ fontSize: 17, fontWeight: 700 }}>Record Sale</div>
                </div>
                <button onClick={() => setShowSaleForm(false)} style={{ background: COLORS.bg, border: "none", cursor: "pointer", color: COLORS.textMuted, width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>×</button>
              </div>
            </div>

            {/* Scrollable body */}
            <div style={{ overflowY: "auto", padding: "16px 18px", flex: 1, WebkitOverflowScrolling: "touch" }}>
              {inventory.filter(i => i.stock > 0).length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>📦</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 6 }}>No items in stock</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted }}>Switch to the Inventory tab to add items first.</div>
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label">Today's Date</label>
                    <input type="date" className="form-input" defaultValue={TODAY()} readOnly style={{ background: COLORS.bg, color: COLORS.textMuted }} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Select Item</label>
                    <select className={`form-input${errors.itemId ? " error" : ""}`} value={form.itemId} onChange={e => { setForm(p => ({ ...p, itemId: e.target.value })); setErrors(p => ({ ...p, itemId: null })); }}>
                      <option value="">— Choose item —</option>
                      {inventory.filter(i => i.stock > 0).map(i => (
                        <option key={i.id} value={i.id}>{i.name} ({i.stock} left) — {NAIRA(i.price)}</option>
                      ))}
                    </select>
                    {errors.itemId && <div className="form-error">{errors.itemId}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">Quantity Sold</label>
                    <input type="number" className={`form-input${errors.qty ? " error" : ""}`} placeholder="1" min="1" value={form.qty}
                      onChange={e => { setForm(p => ({ ...p, qty: e.target.value })); setErrors(p => ({ ...p, qty: null })); }} />
                    {errors.qty && <div className="form-error">{errors.qty}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">🏷️ Tag (optional)</label>
                    <input className="form-input" placeholder="e.g. Wholesale, Retail, Online…" value={saleTag} onChange={e => setSaleTag(e.target.value)} />
                  </div>
                  {selectedItem && form.qty && parseInt(form.qty) > 0 && !errors.qty && (
                    <div style={{ background: COLORS.accentLight, border: `1px solid #6EE7B7`, borderRadius: 14, padding: "14px 16px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 11, color: COLORS.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Amount</div>
                        <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{form.qty} × {NAIRA(selectedItem.price)}</div>
                      </div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 24, fontWeight: 700, color: COLORS.accent }}>{NAIRA(parseInt(form.qty || 0) * selectedItem.price)}</div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Sticky footer */}
            {inventory.filter(i => i.stock > 0).length > 0 && (
              <div style={{ padding: "12px 18px 16px", borderTop: `1px solid ${COLORS.border}`, flexShrink: 0, display: "flex", gap: 10 }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowSaleForm(false)}>Cancel</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={recordSale}>Record Sale</button>
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
      {showExport && (
        <ExportModal
          title="Shop Sales"
          onClose={() => setShowExport(false)}
          onExcelExport={() => {
            const headers = ["Date", "Item", "Qty", "Price (₦)", "Total (₦)"];
            const rows = sales.map(s => [s.date, s.itemName, s.qty, s.price, s.total]);
            exportToExcel("Shop_Sales_" + TODAY(), "Sales", rows, headers);
            setShowExport(false); showToast("Excel file downloaded!");
          }}
          onPDFExport={() => {
            const headers = ["Date", "Item", "Qty", "Price (₦)", "Total (₦)"];
            const rows = sales.map(s => [s.date, s.itemName, s.qty, s.price, s.total]);
            exportToPDF("Shop Sales — Export", headers, rows, "Shop_Sales");
            setShowExport(false);
          }}
        />
      )}
    </div>
  );
}

// ===================== FARM MODE =====================
const FARM_CATS = ["Seeds", "Fertilizer", "Labor", "Transport", "Equipment", "Others"];

function FarmScreen({ user }) {
  // ── Farm green palette ──
  const FG = {
    dark:    "#1B4332",
    main:    "#2D6A4F",
    mid:     "#40916C",
    light:   "#74C69D",
    pale:    "#D8F3DC",
    surface: "#F0FAF4",
    border:  "#B7E4C7",
  };

  const catMeta = {
    Seeds:      { icon: "🌱", bg: "#E9F5DB", color: "#386641" },
    Fertilizer: { icon: "🧪", bg: "#EAF4FB", color: "#1B6CA8" },
    Labor:      { icon: "👷", bg: "#FEF3E2", color: "#D4820A" },
    Transport:  { icon: "🚛", bg: "#EAF4FB", color: "#1B6CA8" },
    Equipment:  { icon: "⚙️", bg: "#F3EFFE", color: "#6B3FA0" },
    Others:     { icon: "📦", bg: "#F4F6FA", color: "#6B7280" },
  };

  const key = `sl_farm_${user.uid}`;
  const [expenses, setExpenses] = useLocalState(key, []);
  const [form, setForm] = useState({ date: TODAY(), desc: "", amount: "", category: "" });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [filterCat, setFilterCat] = useState("All");

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const now = new Date();
  const thisMonth = expenses.filter(e => e.date.startsWith(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`));
  const thisYear  = expenses.filter(e => e.date.startsWith(`${now.getFullYear()}`));

  const saveExpense = () => {
    const e = {};
    if (!form.desc.trim()) e.desc = "Description is required";
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (Object.keys(e).length) { setErrors(e); return; }
    const exp = { id: uid(), ...form, amount: parseFloat(form.amount), createdAt: TS() };
    setExpenses(prev => [exp, ...prev]);
    setForm({ date: TODAY(), desc: "", amount: "", category: "" });
    setErrors({});
    setShowForm(false);
    showToast("Expenditure saved!");
  };

  const deleteExpense = (id) => { setExpenses(prev => prev.filter(e => e.id !== id)); showToast("Deleted", "error"); };

  const filtered = expenses.filter(e => {
    const matchSearch = !search || e.desc.toLowerCase().includes(search.toLowerCase()) || e.date.includes(search);
    const matchCat = filterCat === "All" || e.category === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div style={{ background: FG.surface, minHeight: "100%" }}>
      {/* ── Hero banner ── */}
      <div style={{
        background: `linear-gradient(135deg, ${FG.dark} 0%, ${FG.main} 60%, ${FG.mid} 100%)`,
        borderRadius: 18, padding: "20px 20px 16px", marginBottom: "1rem",
        position: "relative", overflow: "hidden",
      }}>
        {/* decorative circles */}
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -30, right: 30, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 28, marginBottom: 4 }}>🌾</div>
            <div style={{ fontSize: 19, fontWeight: 800, color: "#fff", letterSpacing: "-0.3px" }}>Farming Expenditures</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 2 }}>{expenses.length} entries recorded</div>
          </div>
          <button onClick={() => setShowExport(true)} style={{
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 10, padding: "7px 12px", color: "#fff", fontSize: 12,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
            fontFamily: "'Inter', sans-serif", fontWeight: 600,
          }}>
            <Icon name="download" size={13} /> Export
          </button>
        </div>
        {/* stat row inside banner */}
        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          {[
            { label: "This Month", value: NAIRA(thisMonth.reduce((a, e) => a + e.amount, 0)), sub: `${thisMonth.length} entries` },
            { label: "This Year",  value: NAIRA(thisYear.reduce((a, e) => a + e.amount, 0)),  sub: `${thisYear.length} entries` },
          ].map(s => (
            <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 12px", backdropFilter: "blur(4px)" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 3 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Expense category breakdown ── */}
      {expenses.length > 0 && (() => {
        const catTotals = {};
        expenses.forEach(e => {
          const c = e.category || "Others";
          catTotals[c] = (catTotals[c] || 0) + e.amount;
        });
        const total = Object.values(catTotals).reduce((a,v) => a+v, 0);
        const sorted = Object.entries(catTotals).sort((a,b) => b[1]-a[1]);
        const icons = { Seeds:"🌱", Fertilizer:"🧪", Labor:"👷", Transport:"🚛", Equipment:"⚙️", Others:"📦" };
        return (
          <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "12px 14px", marginBottom: "0.75rem", color: "#fff" }}>
            <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Spend by Category</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {sorted.slice(0,4).map(([cat, amt]) => (
                <div key={cat}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.9 }}>{icons[cat]||"📦"} {cat}</span>
                    <span style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", opacity: 0.85 }}>{NAIRA(amt)} · {Math.round(amt/total*100)}%</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 2, background: "rgba(255,255,255,0.6)", width: `${amt/total*100}%`, transition: "width 0.5s" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ── Category filter chips ── */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, marginBottom: "0.75rem", scrollbarWidth: "none" }}>
        {["All", ...FARM_CATS].map(cat => {
          const meta = catMeta[cat];
          const active = filterCat === cat;
          return (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{
              flexShrink: 0, padding: "6px 12px", borderRadius: 20,
              border: `1.5px solid ${active ? FG.main : FG.border}`,
              background: active ? FG.main : "#fff",
              color: active ? "#fff" : FG.main,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 5,
              transition: "all 0.15s",
            }}>
              {meta && <span>{meta.icon}</span>}
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Search ── */}
      <div style={{ position: "relative", marginBottom: "0.75rem" }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: FG.mid }}>
          <Icon name="search" size={16} />
        </span>
        <input
          style={{
            width: "100%", padding: "10px 12px 10px 38px", borderRadius: 12,
            border: `1.5px solid ${FG.border}`, background: "#fff",
            fontSize: 13, fontFamily: "'Inter', sans-serif", outline: "none",
            color: COLORS.text,
          }}
          placeholder="Search expenditures…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* ── Expenses list ── */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <div style={{ fontSize: 52, marginBottom: 12 }}>🌱</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: FG.dark, marginBottom: 6 }}>No expenditures yet</div>
          <div style={{ fontSize: 13, color: COLORS.textMuted }}>Tap the + button below to log your first one</div>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map(exp => {
            const meta = catMeta[exp.category] || catMeta["Others"];
            return (
              <div key={exp.id} style={{
                background: "#fff", borderRadius: 14,
                border: `1.5px solid ${FG.border}`,
                overflow: "hidden",
                boxShadow: "0 1px 4px rgba(45,106,79,0.07)",
              }}>
                <div style={{ height: 3, background: `linear-gradient(90deg, ${FG.mid}, ${FG.light})` }} />
                <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                    background: meta.bg, border: `1.5px solid ${FG.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                  }}>
                    {meta.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: FG.dark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{exp.desc}</div>
                    <div style={{ display: "flex", gap: 6, marginTop: 3, alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: FG.mid }}>📅 {exp.date}</span>
                      {exp.category && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: meta.color, background: meta.bg, border: `1px solid ${meta.color}30`, borderRadius: 6, padding: "1px 7px" }}>
                          {exp.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: FG.dark }}>{NAIRA(exp.amount)}</div>
                    <button onClick={() => deleteExpense(exp.id)} style={{
                      marginTop: 4, background: "none", border: "none", cursor: "pointer",
                      color: COLORS.danger, opacity: 0.7, padding: "2px 4px",
                    }}>
                      <Icon name="trash" size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── FAB ── */}
      <button
        onClick={() => { setForm({ date: TODAY(), desc: "", amount: "", category: "" }); setErrors({}); setShowForm(true); }}
        title="Add expenditure"
        style={{
          position: "fixed", bottom: "calc(28px + var(--fab-lift, 0px))", right: 28, zIndex: 200,
          width: 56, height: 56, borderRadius: "50%",
          background: `linear-gradient(135deg, ${FG.main}, ${FG.mid})`,
          color: "#fff", border: "none",
          boxShadow: `0 4px 18px ${FG.main}88`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
      </button>

      {/* ── Add Expenditure centred modal ── */}
      {showForm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16, background: "rgba(0,0,0,0.5)",
        }} onClick={() => setShowForm(false)}>
          <div style={{
            background: "#fff", borderRadius: 20,
            width: "100%", maxWidth: 420,
            maxHeight: "calc(100vh - 32px)",
            display: "flex", flexDirection: "column",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            animation: "scaleIn 0.22s cubic-bezier(0.4,0,0.2,1)",
          }} onClick={e => e.stopPropagation()}>

            {/* Sticky header */}
            <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${FG.border}`, flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: FG.pale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🌾</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: FG.dark }}>Add Expenditure</div>
                </div>
                <button onClick={() => setShowForm(false)} style={{ background: COLORS.bg, border: "none", cursor: "pointer", color: COLORS.textMuted, width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>×</button>
              </div>
            </div>

            {/* Scrollable body */}
            <div style={{ overflowY: "auto", padding: "16px 18px", flex: 1, WebkitOverflowScrolling: "touch" }}>
              <div className="form-group">
                <label className="form-label" style={{ color: FG.main }}>Date</label>
                <input type="date" className="form-input" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))}
                  style={{ borderColor: FG.border }} />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ color: FG.main }}>Description</label>
                <textarea className={`form-input${errors.desc ? " error" : ""}`} rows={3}
                  placeholder="What was this expense for?" value={form.desc}
                  style={{ borderColor: FG.border }}
                  onChange={e => { setForm(p => ({ ...p, desc: e.target.value })); setErrors(p => ({ ...p, desc: null })); }} />
                {errors.desc && <div className="form-error">{errors.desc}</div>}
              </div>
              <div className="form-group">
                <label className="form-label" style={{ color: FG.main }}>Amount (₦)</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: FG.mid, fontWeight: 600 }}>₦</span>
                  <input type="number" className={`form-input${errors.amount ? " error" : ""}`}
                    style={{ paddingLeft: 28, borderColor: FG.border }}
                    placeholder="0.00" value={form.amount}
                    onChange={e => { setForm(p => ({ ...p, amount: e.target.value })); setErrors(p => ({ ...p, amount: null })); }} />
                </div>
                {errors.amount && <div className="form-error">{errors.amount}</div>}
              </div>
              <div className="form-group">
                <label className="form-label" style={{ color: FG.main }}>Category (optional)</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {FARM_CATS.map(cat => {
                    const m = catMeta[cat];
                    const active = form.category === cat;
                    return (
                      <button key={cat} onClick={() => setForm(p => ({ ...p, category: p.category === cat ? "" : cat }))} style={{
                        padding: "7px 12px", borderRadius: 20,
                        border: `1.5px solid ${active ? FG.main : FG.border}`,
                        background: active ? FG.main : "#fff",
                        color: active ? "#fff" : FG.main,
                        fontSize: 12, fontWeight: 600, cursor: "pointer",
                        fontFamily: "'Inter', sans-serif",
                        display: "flex", alignItems: "center", gap: 5, transition: "all 0.15s",
                      }}>
                        <span>{m.icon}</span>{cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sticky footer */}
            <div style={{ padding: "12px 18px 16px", borderTop: `1px solid ${FG.border}`, flexShrink: 0, display: "flex", gap: 10 }}>
              <button onClick={() => setShowForm(false)} style={{
                flex: 1, padding: "12px", border: `1.5px solid ${FG.border}`, borderRadius: 12,
                background: "#fff", color: FG.main, fontWeight: 600, fontSize: 14,
                cursor: "pointer", fontFamily: "'Inter', sans-serif",
              }}>Cancel</button>
              <button onClick={saveExpense} style={{
                flex: 2, padding: "12px",
                background: `linear-gradient(135deg, ${FG.main}, ${FG.mid})`,
                border: "none", borderRadius: 12,
                color: "#fff", fontWeight: 700, fontSize: 14,
                cursor: "pointer", fontFamily: "'Inter', sans-serif",
                boxShadow: `0 3px 12px ${FG.main}55`,
              }}>Save Expenditure</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
      {showExport && (
        <ExportModal
          title="Farming Expenditures"
          onClose={() => setShowExport(false)}
          onExcelExport={() => {
            const headers = ["Date", "Description", "Category", "Amount (₦)"];
            const rows = expenses.map(e => [e.date, e.desc, e.category || "—", e.amount]);
            exportToExcel("Farm_Expenditures_" + TODAY(), "Expenditures", rows, headers);
            setShowExport(false); showToast("Excel file downloaded!");
          }}
          onPDFExport={() => {
            const headers = ["Date", "Description", "Category", "Amount (₦)"];
            const rows = expenses.map(e => [e.date, e.desc, e.category || "—", e.amount]);
            exportToPDF("Farming Expenditures — Export", headers, rows, "Farm_Expenditures");
            setShowExport(false);
          }}
        />
      )}
    </div>
  );
}

// ===================== HISTORY / DASHBOARD =====================
function HistoryScreen({ user }) {
  const [showExport, setShowExport] = useState(false);
  const userSectors = (user.sectors && user.sectors.length > 0) ? user.sectors : ["shop"];

  const salesData = userSectors.includes("sales")
    ? (() => { try { return JSON.parse(localStorage.getItem(`sl_sales_${user.uid}`)) || []; } catch { return []; } })()
    : [];
  const shopData = userSectors.includes("shop")
    ? (() => { try { return JSON.parse(localStorage.getItem(`sl_shopsales_${user.uid}`)) || []; } catch { return []; } })()
    : [];
  const farmData = userSectors.includes("farm")
    ? (() => { try { return JSON.parse(localStorage.getItem(`sl_farm_${user.uid}`)) || []; } catch { return []; } })()
    : [];
  const debtData = (() => { try { return JSON.parse(localStorage.getItem(`sl_debt_${user.uid}`)) || []; } catch { return []; } })();

  const now = new Date();
  const thisMonthStr = now.toISOString().slice(0, 7);

  const shopTotal = shopData.reduce((a, s) => a + s.total, 0);
  const shopMonthTotal = shopData.filter(s => s.date?.startsWith(thisMonthStr)).reduce((a, s) => a + s.total, 0);
  const farmTotal = farmData.reduce((a, e) => a + e.amount, 0);
  const farmMonthTotal = farmData.filter(e => e.date?.startsWith(thisMonthStr)).reduce((a, e) => a + e.amount, 0);
  const debtRemaining = (r) => Math.max(0, r.amount - (r.payments || []).reduce((a, p) => a + p.amount, 0));
  const debtCreditOut  = debtData.filter(r => r.type === "credit" && !r.settled).reduce((a, r) => a + debtRemaining(r), 0);
  const debtCreditOwed = debtData.filter(r => r.type === "debt"   && !r.settled).reduce((a, r) => a + debtRemaining(r), 0);

  const recentActivity = [
    ...(userSectors.includes("shop") ? shopData.map(s => ({ ...s, type: "shop", label: s.itemName, value: s.total, positive: true })) : []),
    ...(userSectors.includes("farm") ? farmData.map(e => ({ ...e, type: "farm", label: e.desc, value: e.amount, positive: false })) : []),
    ...(userSectors.includes("sales") ? salesData.map(e => ({ ...e, type: "sales", label: e.f_notes || "Sales entry", value: null, positive: true })) : []),
    ...debtData.map(r => ({ ...r, type: "debtcredit", label: r.name, value: r.amount, positive: r.type === "credit" })),
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);

  const sectorSummaryItems = [
    userSectors.includes("sales") && {
      icon: "💼", label: "Sales Rep", sub: `${salesData.length} entries`,
      badge: <span className="pill pill-blue">{salesData.length} records</span>,
    },
    userSectors.includes("shop") && {
      icon: "🏪", label: "Shop Sales", sub: `${shopData.length} transactions`,
      badge: <span className="pill pill-green" style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{NAIRA(shopTotal)}</span>,
    },
    userSectors.includes("farm") && {
      icon: "🌾", label: "Farm Expenses", sub: `${farmData.length} entries`,
      badge: <span className="pill pill-red" style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}>{NAIRA(farmTotal)}</span>,
    },
    {
      icon: "🤝", label: "Debt & Credit", sub: `${debtData.filter(r=>!r.settled).length} outstanding`,
      badge: (
        <div style={{ display: "flex", gap: 4 }}>
          <span className="pill pill-green" style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 10 }}>+{NAIRA(debtCreditOut)}</span>
          <span className="pill pill-red"   style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700, fontSize: 10 }}>-{NAIRA(debtCreditOwed)}</span>
        </div>
      ),
    },
  ].filter(Boolean);

  // Build 6-month chart data
  const getLast6Months = (data, getAmount, getDate) => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;
      const total = data.filter(x => (getDate(x)||"").startsWith(key)).reduce((a,x) => a + getAmount(x), 0);
      months.push({ month: d.toLocaleString("default",{month:"short"}), value: total });
    }
    return months;
  };
  const shopChart = userSectors.includes("shop") ? getLast6Months(shopData, s=>s.total, s=>s.date) : [];
  const farmChart = userSectors.includes("farm") ? getLast6Months(farmData, e=>e.amount, e=>e.date) : [];

  const profitLoss = shopMonthTotal - farmMonthTotal;
  const monthName = now.toLocaleString("default", { month: "long", year: "numeric" });

  const backupKey = `sl_backup_${user.uid}`;
  const lastBackup = (() => { try { return JSON.parse(localStorage.getItem(backupKey)); } catch { return null; } })();
  const daysSinceBackup = lastBackup ? Math.floor((Date.now() - new Date(lastBackup)) / 86400000) : 999;
  const showBackupReminder = daysSinceBackup >= 7;
  const dismissBackup = () => { try { localStorage.setItem(backupKey, JSON.stringify(new Date().toISOString())); } catch {} };

  return (
    <div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1rem" }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Overview</div>
        <button className="btn btn-success btn-sm" onClick={() => setShowExport(true)}><Icon name="download" size={14} /> Export All</button>
      </div>

      {/* Cloud backup reminder */}
      {showBackupReminder && (
        <div style={{ background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 12, padding: "10px 14px", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 22, flexShrink: 0 }}>☁️</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>
              {daysSinceBackup >= 999 ? "Back up your data" : `Last export ${daysSinceBackup} days ago`}
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>Export all records to keep a safe copy</div>
          </div>
          <button onClick={() => { setShowExport(true); dismissBackup(); }} style={{ background: COLORS.primary, border: "none", borderRadius: 8, padding: "6px 12px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif", flexShrink: 0 }}>
            Export now
          </button>
          <button onClick={dismissBackup} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.textMuted, fontSize: 16, padding: 2, flexShrink: 0 }}>✕</button>
        </div>
      )}

      {/* Notification banner */}
      <NotificationBanner user={user} />

      {/* Cloud backup reminder — offline only */}
      {!navigator.onLine && (() => {
        const lastExportKey = `sl_lastexport_${user?.uid}`;
        const lastExport = localStorage.getItem(lastExportKey);
        const daysSince = lastExport ? Math.floor((Date.now() - new Date(lastExport)) / 86400000) : 999;
        if (daysSince < 7) return null;
        return (
          <div style={{ background: "#EFF6FF", border: "1.5px solid #BFDBFE", borderRadius: 12, padding: "10px 14px", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>☁️</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>
                {lastExport ? `No backup in ${daysSince} days` : "No backup yet"}
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>Export your records to keep a safe copy.</div>
            </div>
            <button onClick={() => { setShowExport(true); localStorage.setItem(lastExportKey, new Date().toISOString()); }} style={{
              flexShrink: 0, background: COLORS.primary, color: "#fff", border: "none", borderRadius: 8,
              padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif",
            }}>Export Now</button>
          </div>
        );
      })()}

      {/* ── Monthly Report Card ── */}
      {(userSectors.includes("shop") || userSectors.includes("farm")) && (
        <div style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
          borderRadius: 18, padding: "18px", marginBottom: "1rem", color: "#fff",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
          <div style={{ fontSize: 11, opacity: 0.65, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>📅 {monthName} Report</div>
          <div style={{ display: "flex", gap: 10 }}>
            {userSectors.includes("shop") && (
              <div style={{ flex: 1, background: "rgba(255,255,255,0.14)", borderRadius: 12, padding: "10px 12px" }}>
                <div style={{ fontSize: 9, opacity: 0.6, fontWeight: 700, textTransform: "uppercase" }}>🏪 Shop Sales</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, marginTop: 4 }}>{NAIRA(shopMonthTotal)}</div>
                <div style={{ fontSize: 10, opacity: 0.55, marginTop: 1 }}>{shopData.filter(s => s.date?.startsWith(thisMonthStr)).length} sales</div>
              </div>
            )}
            {userSectors.includes("farm") && (
              <div style={{ flex: 1, background: "rgba(255,255,255,0.14)", borderRadius: 12, padding: "10px 12px" }}>
                <div style={{ fontSize: 9, opacity: 0.6, fontWeight: 700, textTransform: "uppercase" }}>🌾 Farm Spend</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, marginTop: 4 }}>{NAIRA(farmMonthTotal)}</div>
                <div style={{ fontSize: 10, opacity: 0.55, marginTop: 1 }}>{farmData.filter(e => e.date?.startsWith(thisMonthStr)).length} expenses</div>
              </div>
            )}
            {userSectors.includes("shop") && userSectors.includes("farm") && (
              <div style={{ flex: 1, background: profitLoss >= 0 ? "rgba(52,211,153,0.25)" : "rgba(239,68,68,0.25)", borderRadius: 12, padding: "10px 12px", border: `1px solid ${profitLoss >= 0 ? "rgba(52,211,153,0.4)" : "rgba(239,68,68,0.4)"}` }}>
                <div style={{ fontSize: 9, opacity: 0.8, fontWeight: 700, textTransform: "uppercase" }}>📈 Net P&L</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, marginTop: 4, color: profitLoss >= 0 ? "#6EE7B7" : "#FCA5A5" }}>
                  {profitLoss >= 0 ? "+" : ""}{NAIRA(profitLoss)}
                </div>
                <div style={{ fontSize: 10, opacity: 0.55, marginTop: 1 }}>{profitLoss >= 0 ? "profit" : "loss"} this month</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Health Score ── */}
      {(() => {
        const totalOut  = debtCreditOut;
        const totalOwed = debtCreditOwed;
        const net = totalOut - totalOwed;
        const ratio = totalOwed === 0 ? 100 : Math.max(0, Math.min(100, Math.round((totalOut / (totalOut + totalOwed)) * 100)));
        const scoreColor = ratio >= 70 ? COLORS.accent : ratio >= 40 ? COLORS.amber : COLORS.danger;
        const scoreLabel = ratio >= 70 ? "Healthy" : ratio >= 40 ? "Caution" : "At Risk";
        const scoreEmoji = ratio >= 70 ? "💚" : ratio >= 40 ? "🟡" : "🔴";
        return (
          <div className="card" style={{ marginBottom: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>💳 Debt-to-Credit Health</div>
              <span style={{ fontSize: 12, fontWeight: 700, color: scoreColor, background: scoreColor + "18", borderRadius: 8, padding: "3px 10px" }}>{scoreEmoji} {scoreLabel}</span>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ flex: 1, background: COLORS.accentLight, borderRadius: 10, padding: "8px 12px" }}>
                <div style={{ fontSize: 10, color: COLORS.accent, fontWeight: 700, textTransform: "uppercase" }}>Credits (owed to you)</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: COLORS.accent, marginTop: 2 }}>{NAIRA(totalOut)}</div>
              </div>
              <div style={{ flex: 1, background: COLORS.dangerLight, borderRadius: 10, padding: "8px 12px" }}>
                <div style={{ fontSize: 10, color: COLORS.danger, fontWeight: 700, textTransform: "uppercase" }}>Debts (you owe)</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 14, fontWeight: 700, color: COLORS.danger, marginTop: 2 }}>{NAIRA(totalOwed)}</div>
              </div>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: COLORS.dangerLight, overflow: "hidden", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${ratio}%`, background: scoreColor, borderRadius: 5, transition: "width 0.6s" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <div style={{ fontSize: 10, color: COLORS.textMuted }}>Net: <strong style={{ color: net >= 0 ? COLORS.accent : COLORS.danger }}>{net >= 0 ? "+" : ""}{NAIRA(net)}</strong></div>
              <div style={{ fontSize: 10, color: COLORS.textMuted }}>{ratio}% credit coverage</div>
            </div>
          </div>
        );
      })()}

      {/* ── Month-on-Month Comparison ── */}
      {(userSectors.includes("shop") || userSectors.includes("farm")) && (() => {
        const prevMonthDate = new Date(now);
        prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
        const prevMonthStr = prevMonthDate.toISOString().slice(0, 7);
        const shopPrevMonth = shopData.filter(s => s.date?.startsWith(prevMonthStr)).reduce((a,s) => a+s.total, 0);
        const farmPrevMonth = farmData.filter(e => e.date?.startsWith(prevMonthStr)).reduce((a,e) => a+e.amount, 0);
        const shopChange = shopPrevMonth === 0 ? null : Math.round(((shopMonthTotal - shopPrevMonth) / shopPrevMonth) * 100);
        const farmChange = farmPrevMonth === 0 ? null : Math.round(((farmMonthTotal - farmPrevMonth) / farmPrevMonth) * 100);
        const prevName = prevMonthDate.toLocaleString("default", { month: "short" });
        const thisName = now.toLocaleString("default", { month: "short" });
        if (shopPrevMonth === 0 && farmPrevMonth === 0) return null;
        return (
          <div className="card" style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>📅 {prevName} → {thisName} Comparison</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {userSectors.includes("shop") && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>🏪</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>Shop Sales</div>
                      <div style={{ fontSize: 10, color: COLORS.textMuted }}>{NAIRA(shopPrevMonth)} → {NAIRA(shopMonthTotal)}</div>
                    </div>
                  </div>
                  {shopChange !== null && (
                    <span style={{ fontSize: 12, fontWeight: 700, color: shopChange >= 0 ? COLORS.accent : COLORS.danger, background: (shopChange >= 0 ? COLORS.accentLight : COLORS.dangerLight), borderRadius: 8, padding: "3px 10px" }}>
                      {shopChange >= 0 ? "▲" : "▼"} {Math.abs(shopChange)}%
                    </span>
                  )}
                </div>
              )}
              {userSectors.includes("farm") && (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>🌾</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600 }}>Farm Expenses</div>
                      <div style={{ fontSize: 10, color: COLORS.textMuted }}>{NAIRA(farmPrevMonth)} → {NAIRA(farmMonthTotal)}</div>
                    </div>
                  </div>
                  {farmChange !== null && (
                    <span style={{ fontSize: 12, fontWeight: 700, color: farmChange <= 0 ? COLORS.accent : COLORS.danger, background: (farmChange <= 0 ? COLORS.accentLight : COLORS.dangerLight), borderRadius: 8, padding: "3px 10px" }}>
                      {farmChange >= 0 ? "▲" : "▼"} {Math.abs(farmChange)}%
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* Charts — 6-month trend */}
      {(shopChart.length > 0 || farmChart.length > 0) && (
        <div className="card" style={{ marginBottom: "1rem" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>📈 6-Month Trend</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {shopChart.length > 0 && (
              <MiniBarChart data={shopChart} color={COLORS.accent} label="Shop Sales" />
            )}
            {farmChart.length > 0 && (
              <MiniBarChart data={farmChart} color={COLORS.danger} label="Farm Expenditures" />
            )}
          </div>
        </div>
      )}

      {/* Lifetime summary per sector */}
      <div className="card" style={{ marginBottom: "1rem" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Lifetime Summary</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {sectorSummaryItems.map((item, i) => (
            <div key={item.label}>
              {i > 0 && <div className="divider" style={{ marginBottom: 10 }} />}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted }}>{item.sub}</div>
                  </div>
                </div>
                {item.badge}
              </div>
            </div>
          ))}
          {sectorSummaryItems.length === 0 && (
            <div style={{ fontSize: 13, color: COLORS.textMuted, textAlign: "center", padding: "1rem 0" }}>No sectors selected</div>
          )}
        </div>
      </div>

      <div className="section-title">Recent Activity</div>
      {recentActivity.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">📊</div><h3>No activity yet</h3><p>Start recording in your sectors</p></div>
      ) : (
        <div className="card">
          {recentActivity.map((item) => (
            <div key={item.id} className="entry-row">
              <div style={{ width: 32, height: 32, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, background: item.type === "farm" ? "#FEF2F2" : item.type === "shop" ? COLORS.accentLight : item.type === "debtcredit" ? COLORS.primaryLight : "#F5F3FF" }}>
                {item.type === "shop" ? "🏪" : item.type === "farm" ? "🌾" : item.type === "debtcredit" ? (item.positive ? "💰" : "📤") : "💼"}
              </div>
              <div className="entry-content">
                <div className="entry-title">{item.label}</div>
                <div className="entry-sub">
                  {item.type === "shop" ? "Shop Sale" : item.type === "farm" ? "Farm Expense" : item.type === "debtcredit" ? (item.positive ? "Credit" : "Debt") : "Sales Entry"}
                  {" · "}{item.date || item.createdAt?.slice(0, 10)}
                </div>
              </div>
              {item.value !== null && (
                <div className="entry-amount" style={{ color: item.positive ? COLORS.accent : COLORS.danger }}>{NAIRA(item.value)}</div>
              )}
            </div>
          ))}
        </div>
      )}

      {showExport && (
        <ExportModal
          title="Full Summary Report"
          onClose={() => setShowExport(false)}
          onExcelExport={() => {
            loadSheetJS(() => {
              const wb = window.XLSX.utils.book_new();
              if (userSectors.includes("shop") && shopData.length) {
                const ws1 = window.XLSX.utils.aoa_to_sheet([["Date","Item","Qty","Price (₦)","Total (₦)"], ...shopData.map(s=>[s.date,s.itemName,s.qty,s.price,s.total])]);
                ws1["!cols"] = [12,20,8,12,12].map(w=>({wch:w}));
                window.XLSX.utils.book_append_sheet(wb, ws1, "Shop Sales");
              }
              if (userSectors.includes("farm") && farmData.length) {
                const ws2 = window.XLSX.utils.aoa_to_sheet([["Date","Description","Category","Amount (₦)"], ...farmData.map(e=>[e.date,e.desc,e.category||"—",e.amount])]);
                ws2["!cols"] = [12,28,14,14].map(w=>({wch:w}));
                window.XLSX.utils.book_append_sheet(wb, ws2, "Farm Expenses");
              }
              if (userSectors.includes("sales") && salesData.length) {
                const ws3 = window.XLSX.utils.aoa_to_sheet([["Date","Notes"], ...salesData.map(e=>[e.createdAt?.slice(0,10)||"",e.f_notes||""])]);
                ws3["!cols"] = [12,36].map(w=>({wch:w}));
                window.XLSX.utils.book_append_sheet(wb, ws3, "Sales Rep");
              }
              if (debtData.length) {
                const ws4 = window.XLSX.utils.aoa_to_sheet([["Type","Name","Amount","Date","Due Date","Status","Note"], ...debtData.map(r=>[r.type==="credit"?"Credit":"Debt",r.name,r.amount,r.date,r.dueDate||"—",r.settled?"Settled":"Outstanding",r.note||"—"])]);
                ws4["!cols"] = [10,20,12,12,12,12,24].map(w=>({wch:w}));
                window.XLSX.utils.book_append_sheet(wb, ws4, "Debt & Credit");
              }
              window.XLSX.writeFile(wb, "RecordChief_Overview_" + TODAY() + ".xlsx");
            });
            setShowExport(false);
          }}
          onPDFExport={() => {
            const allRows = [
              ...(userSectors.includes("shop") ? shopData.map(s => [s.date, "Shop Sale", s.itemName, NAIRA(s.total)]) : []),
              ...(userSectors.includes("farm") ? farmData.map(e => [e.date, "Farm Expense", e.desc, NAIRA(e.amount)]) : []),
              ...(userSectors.includes("sales") ? salesData.map(e => [e.createdAt?.slice(0,10)||"", "Sales Entry", e.f_notes||"—", "—"]) : []),
              ...debtData.map(r => [r.date, r.type==="credit"?"Credit":"Debt", r.name, (r.type==="credit"?"+":"-")+NAIRA(r.amount)]),
            ].sort((a,b) => a[0] < b[0] ? 1 : -1);
            exportToPDF("Record Chief — Overview Report", ["Date","Type","Description","Amount"], allRows, "Overview_Report");
            setShowExport(false);
          }}
        />
      )}
    </div>
  );
}

// ===================== DEBT & CREDIT =====================
const DC_TYPES = ["debt", "credit"]; // debt = I owe them | credit = they owe me

function DebtCreditScreen({ user }) {
  const key = `sl_debt_${user.uid}`;
  const [records, setRecords] = useLocalState(key, []);
  const [tab, setTab] = useState("list");
  const [typeFilter, setTypeFilter] = useState("credit");
  const [showTypeChoice, setShowTypeChoice] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkSelected, setBulkSelected] = useState(new Set());
  const [search, setSearch] = useState("");
  const [showExport, setShowExport] = useState(false);
  const [editId, setEditId] = useState(null);
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({ type: "credit", name: "", amount: "", note: "", dueDate: "", date: TODAY(), paybackPeriod: "", paybackUnit: "months" });
  const [errors, setErrors] = useState({});

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const remaining = (r) => Math.max(0, r.amount - (r.payments || []).reduce((a, p) => a + p.amount, 0));
  const totalCredit = records.filter(r => r.type === "credit" && !r.settled).reduce((a, r) => a + remaining(r), 0);
  const totalDebt   = records.filter(r => r.type === "debt"   && !r.settled).reduce((a, r) => a + remaining(r), 0);
  const overdueCount = records.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;

  const save = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (Object.keys(e).length) { setErrors(e); return; }
    // Auto-compute dueDate from payback period if no explicit date set
    let computedDueDate = form.dueDate;
    if (!computedDueDate && form.paybackPeriod && parseInt(form.paybackPeriod) > 0) {
      const d = new Date(form.date || TODAY());
      const n = parseInt(form.paybackPeriod);
      if (form.paybackUnit === "days")   d.setDate(d.getDate() + n);
      if (form.paybackUnit === "weeks")  d.setDate(d.getDate() + n * 7);
      if (form.paybackUnit === "months") d.setMonth(d.getMonth() + n);
      computedDueDate = d.toISOString().split("T")[0];
    }
    const rec = { id: editId || uid(), type: form.type, name: form.name.trim(), amount: parseFloat(form.amount), note: form.note, dueDate: computedDueDate, paybackPeriod: form.paybackPeriod, paybackUnit: form.paybackUnit, date: form.date, settled: false, createdAt: editId ? records.find(r=>r.id===editId)?.createdAt : TS(), updatedAt: TS() };
    if (editId) {
      setRecords(prev => prev.map(r => r.id === editId ? { ...rec, settled: r.settled } : r));
      showToast("Record updated!");
    } else {
      setRecords(prev => [rec, ...prev]);
      showToast(form.type === "credit" ? "Credit recorded!" : "Debt recorded!");
    }
    setForm({ type: "credit", name: "", amount: "", note: "", dueDate: "", date: TODAY(), paybackPeriod: "", paybackUnit: "months" });
    setEditId(null); setErrors({});
    setTab("list");
  };

  const settle = (id) => {
    const rec = records.find(r => r.id === id);
    const nowSettled = !rec?.settled;
    setRecords(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, settled: nowSettled, updatedAt: TS() } : r);
      if (nowSettled && rec?.recurring) {
        const { every, unit } = rec.recurring;
        const addDate = (dateStr, n, u) => {
          const d = new Date(dateStr || TODAY());
          if (u === "week")  d.setDate(d.getDate() + n * 7);
          if (u === "month") d.setMonth(d.getMonth() + n);
          if (u === "year")  d.setFullYear(d.getFullYear() + n);
          return d.toISOString().split("T")[0];
        };
        const next = { ...rec, id: uid(), date: addDate(rec.date, every, unit), dueDate: rec.dueDate ? addDate(rec.dueDate, every, unit) : "", settled: false, payments: [], createdAt: TS(), updatedAt: TS() };
        setTimeout(() => showToast("🔁 Next recurring record created"), 200);
        return [...updated, next];
      }
      return updated;
    });
    showToast(nowSettled ? "Marked as settled!" : "Marked as unsettled");
  };

  const remove = (id) => { setRecords(prev => prev.map(r => r.id === id ? {...r, archived: true} : r)); showToast("Record archived", "error"); };
  const restore = (id) => { setRecords(prev => prev.map(r => r.id === id ? {...r, archived: false} : r)); showToast("Record restored!"); };
  const hardDelete = (id) => { setRecords(prev => prev.filter(r => r.id !== id)); showToast("Permanently deleted", "error"); };

  const recordPayment = (id, amount) => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    setRecords(prev => prev.map(r => {
      if (r.id !== id) return r;
      const payments = [...(r.payments || []), { id: uid(), amount: amt, date: TODAY(), createdAt: TS() }];
      const paid = payments.reduce((a, p) => a + p.amount, 0);
      return { ...r, payments, settled: paid >= r.amount, updatedAt: TS() };
    }));
    showToast("Payment recorded!");
  };

  const startEdit = (rec) => {
    setForm({ type: rec.type, name: rec.name, amount: String(rec.amount), note: rec.note || "", dueDate: rec.dueDate || "", date: rec.date || TODAY(), paybackPeriod: rec.paybackPeriod || "", paybackUnit: rec.paybackUnit || "months" });
    setEditId(rec.id);
    setTab("add");
  };

  const archivedRecords = records.filter(r => r.archived);
  const visible = records.filter(r => {
    if (r.archived) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !(r.note||"").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const unsettled = visible.filter(r => !r.settled);
  const settled   = visible.filter(r => r.settled);

  const isOverdue = (r) => !r.settled && r.dueDate && r.dueDate < TODAY();

  const isCredit = typeFilter === "credit";
  const accentColor = isCredit ? "#1D6F42" : COLORS.danger;
  const accentBg    = isCredit ? "#EDF7EE" : COLORS.dangerLight;
  const accentBorder = isCredit ? "#86C99A" : "#E8A0A0";

  const activeUnsettled = records.filter(r => r.type === typeFilter && !r.settled && (!search || r.name.toLowerCase().includes(search.toLowerCase()) || (r.note||"").toLowerCase().includes(search.toLowerCase())));
  const activeSettled   = records.filter(r => r.type === typeFilter &&  r.settled && (!search || r.name.toLowerCase().includes(search.toLowerCase()) || (r.note||"").toLowerCase().includes(search.toLowerCase())));

  const RecordCard = ({ r, dimmed }) => (
    <div style={{
      borderRadius: 14, marginBottom: 10,
      border: `1.5px solid ${dimmed ? COLORS.border : accentBorder}`,
      background: dimmed ? COLORS.bg : "#fff",
      overflow: "hidden", opacity: dimmed ? 0.65 : 1,
      boxShadow: dimmed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
      transition: "all 0.15s",
    }}>
      {/* top accent bar */}
      {!dimmed && <div style={{ height: 3, background: accentColor, borderRadius: "14px 14px 0 0" }} />}
      <div style={{ padding: "12px 14px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          {/* avatar circle */}
          <div style={{
            width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
            background: dimmed ? COLORS.border : accentBg,
            border: `2px solid ${dimmed ? COLORS.border : accentBorder}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: dimmed ? COLORS.textMuted : accentColor,
            fontFamily: "'Space Mono', monospace",
          }}>
            {dimmed ? "✓" : r.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: dimmed ? COLORS.textMuted : COLORS.text, textDecoration: dimmed ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "calc(100% - 80px)" }}>{r.name}</span>
              {isOverdue(r) && !dimmed && (
                <span style={{ background: "#FFF3CD", color: "#856404", border: "1px solid #FFD166", borderRadius: 6, fontSize: 9, fontWeight: 700, padding: "2px 7px", letterSpacing: "0.05em", flexShrink: 0 }}>⚠ OVERDUE</span>
              )}
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span>{isCredit ? (dimmed ? "Owed you" : "Owes you") : (dimmed ? "You owed" : "You owe")}</span>
              <span style={{ color: COLORS.border }}>·</span>
              <span>{r.date}</span>
              {r.dueDate && <><span style={{ color: COLORS.border }}>·</span><span style={{ color: isOverdue(r) ? COLORS.amber : COLORS.textMuted }}>Due {r.dueDate}</span></>}
            </div>
            {r.note && <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 3, fontStyle: "italic", background: COLORS.bg, borderRadius: 6, padding: "3px 7px", display: "inline-block" }}>"{r.note}"</div>}
            {r.recurring && !dimmed && <span style={{ fontSize: 10, background: COLORS.primaryLight, color: COLORS.primary, borderRadius: 6, padding: "2px 7px", display: "inline-flex", alignItems: "center", gap: 3, marginTop: 3, fontWeight: 600, marginLeft: 4 }}>🔁 every {r.recurring.every} {r.recurring.unit}{r.recurring.every > 1 ? "s" : ""}</span>}
            {r.dueDate && !dimmed && <span style={{ fontSize: 10, background: COLORS.amberLight, color: COLORS.amber, borderRadius: 6, padding: "2px 7px", display: "inline-flex", alignItems: "center", gap: 3, marginTop: 3, fontWeight: 600, marginLeft: 4 }}>🔔 {r.reminderDays ?? 1}d reminder</span>}
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            {(() => {
              const paid = (r.payments || []).reduce((a, p) => a + p.amount, 0);
              const remaining = Math.max(0, r.amount - paid);
              return (
                <>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 16, fontWeight: 700, color: dimmed ? COLORS.textMuted : accentColor, textDecoration: dimmed ? "line-through" : "none" }}>
                    {isCredit ? "+" : "-"}{NAIRA(r.amount)}
                  </div>
                  {paid > 0 && !dimmed && (
                    <div style={{ fontSize: 10, color: COLORS.danger, fontWeight: 600, marginTop: 1 }}>
                      -{NAIRA(paid)} paid
                    </div>
                  )}
                  {dimmed && <div style={{ fontSize: 10, color: COLORS.accent, fontWeight: 600, marginTop: 2 }}>SETTLED</div>}
                </>
              );
            })()}
          </div>
        </div>
        {/* action row */}
        {!dimmed ? (() => {
          const payments = r.payments || [];
          const paid = payments.reduce((a, p) => a + p.amount, 0);
          const remaining = Math.max(0, r.amount - paid);
          const pct = Math.min(100, (paid / r.amount) * 100);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [payOpen, setPayOpen] = useState(false);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const [payAmt, setPayAmt] = useState("");
          return (
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: `0.5px solid ${COLORS.border}` }}>
              {/* Progress bar if partial payments exist */}
              {paid > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: COLORS.textMuted, marginBottom: 4 }}>
                    <span>Paid: <strong style={{ color: accentColor }}>{NAIRA(paid)}</strong></span>
                    <span>Remaining: <strong style={{ color: COLORS.danger }}>{NAIRA(remaining)}</strong></span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: COLORS.bg, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 3, background: accentColor, width: `${pct}%`, transition: "width 0.4s" }} />
                  </div>
                  {payments.length > 0 && (
                    <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {payments.map(p => (
                        <span key={p.id} style={{ fontSize: 10, background: accentBg, color: accentColor, border: `1px solid ${accentBorder}`, borderRadius: 6, padding: "2px 7px", fontWeight: 600 }}>
                          {NAIRA(p.amount)} · {p.date}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Main action buttons */}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => settle(r.id)} style={{
                  flex: 1, padding: "8px 0", border: "none", borderRadius: 8, cursor: "pointer",
                  background: accentBg, color: accentColor, fontWeight: 700, fontSize: 12,
                  fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  Mark Settled
                </button>
                <button onClick={() => startEdit(r)} style={{
                  width: 36, height: 36, border: `1.5px solid ${COLORS.border}`, borderRadius: 8, background: "#fff",
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.textMuted, flexShrink: 0,
                }}>
                  <Icon name="edit" size={14} />
                </button>
                <button onClick={() => remove(r.id)} style={{
                  width: 36, height: 36, border: `1.5px solid ${COLORS.dangerLight}`, borderRadius: 8, background: COLORS.dangerLight,
                  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.danger, flexShrink: 0,
                }}>
                  <Icon name="trash" size={14} />
                </button>
              </div>

              {/* Part Payment toggle */}
              <button onClick={() => { setPayOpen(v => !v); setPayAmt(""); }} style={{
                marginTop: 8, width: "100%", padding: "7px 12px",
                border: `1px dashed ${accentBorder}`, borderRadius: 8,
                background: "transparent", cursor: "pointer",
                fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
                color: accentColor, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                {payOpen ? "Cancel" : "Record Part Payment"}
              </button>

              {/* Part payment input */}
              {payOpen && (
                <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
                  <div style={{ position: "relative", flex: 1 }}>
                    <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted, fontWeight: 700, fontSize: 13 }}>₦</span>
                    <input
                      type="number"
                      className="form-input"
                      style={{ paddingLeft: 26 }}
                      placeholder={`Max ${NAIRA(remaining)}`}
                      value={payAmt}
                      onChange={e => setPayAmt(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          recordPayment(r.id, payAmt);
                          setPayAmt("");
                          setPayOpen(false);
                        }
                      }}
                    />
                  </div>
                  <button onClick={() => {
                    if (parseFloat(payAmt) > remaining) { showToast("Amount exceeds remaining balance", "error"); return; }
                    recordPayment(r.id, payAmt);
                    setPayAmt("");
                    setPayOpen(false);
                  }} style={{
                    flexShrink: 0, padding: "10px 14px", border: "none", borderRadius: 8,
                    background: accentColor, color: "#fff", fontWeight: 700, fontSize: 12,
                    cursor: "pointer", fontFamily: "'Inter', sans-serif",
                  }}>
                    Save
                  </button>
                </div>
              )}
            </div>
          );
        })() : (
          <div style={{ marginTop: 8, display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => settle(r.id)} style={{ background: "none", border: `1px solid ${COLORS.border}`, borderRadius: 7, padding: "5px 12px", fontSize: 11, color: COLORS.textMuted, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
              Undo
            </button>
          </div>
        )}
      </div>
    </div>
  );

  // Theme palette — entire UI shifts based on active tab
  const debtOutstanding = records.filter(r => r.type === "debt" && !r.settled).length;
  const debtAllClear = !isCredit && debtOutstanding === 0;

  const T = isCredit ? {
    bg:        "#F0FAF4",
    bannerBg:  "linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)",
    surface:   "#fff",
    card:      "#fff",
    cardBorder:"#B7E4C7",
    label:     "#1D6F42",
    labelLight:"#4B9B6B",
    pale:      "#D8F3DC",
    muted:     "#74C69D",
    pill:      "#1D6F42",
    sectionHdr:"#2D6A4F",
    searchBorder:"#86C99A",
    inactiveBg: "#EDF7EE",
    inactiveColor: "#1D6F42",
  } : debtAllClear ? {
    // All debts cleared — calming blue theme
    bg:        "#EFF6FF",
    bannerBg:  `linear-gradient(135deg, #1E3A8A 0%, ${COLORS.primaryDark} 60%, ${COLORS.primary} 100%)`,
    surface:   "#fff",
    card:      "#fff",
    cardBorder:"#BFDBFE",
    label:     COLORS.primary,
    labelLight:"#60A5FA",
    pale:      "#DBEAFE",
    muted:     "#93C5FD",
    pill:      COLORS.primary,
    sectionHdr:COLORS.primaryDark,
    searchBorder:"#BFDBFE",
    inactiveBg: COLORS.primaryLight,
    inactiveColor: COLORS.primary,
  } : {
    bg:        "#FFF5F5",
    bannerBg:  `linear-gradient(135deg, #7F1D1D 0%, #B91C1C 60%, ${COLORS.danger} 100%)`,
    surface:   "#fff",
    card:      "#fff",
    cardBorder:"#FCA5A5",
    label:     COLORS.danger,
    labelLight:"#E57373",
    pale:      "#FEE2E2",
    muted:     "#F87171",
    pill:      COLORS.danger,
    sectionHdr:"#B91C1C",
    searchBorder:"#FCA5A5",
    inactiveBg: COLORS.dangerLight,
    inactiveColor: COLORS.danger,
  };

  return (
    <div style={{ paddingBottom: 90, background: T.bg, minHeight: "100%" }}>

      {/* ── Hero banner ── */}
      <div style={{
        background: T.bannerBg, borderRadius: 18, padding: "18px 18px 16px",
        marginBottom: "1rem", color: "#fff", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 22, marginBottom: 4 }}>{isCredit ? "💰" : "📤"}</div>
            <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.3px" }}>{isCredit ? "Credits" : "Debts"}</div>
            <div style={{ fontSize: 11, opacity: 0.65, marginTop: 2 }}>
              {isCredit ? "Money others owe you" : "Money you owe others"}
            </div>
          </div>
          <button onClick={() => setShowExport(true)} style={{
            background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 10, padding: "7px 12px", color: "#fff", fontSize: 12,
            cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <Icon name="download" size={13} /> Export
          </button>
        </div>
        <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.14)", borderRadius: 12, padding: "10px 12px" }}>
            <div style={{ fontSize: 9, opacity: 0.65, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Outstanding</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, marginTop: 3 }}>
              {NAIRA(isCredit ? totalCredit : totalDebt)}
            </div>
            <div style={{ fontSize: 10, opacity: 0.55, marginTop: 1 }}>
              {(isCredit ? records.filter(r=>r.type==="credit"&&!r.settled) : records.filter(r=>r.type==="debt"&&!r.settled)).length} records
            </div>
          </div>
          <div style={{ flex: 1, background: "rgba(255,255,255,0.22)", borderRadius: 12, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.3)" }}>
            <div style={{ fontSize: 9, opacity: 0.85, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>Settled</div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, marginTop: 3 }}>
              {(isCredit ? records.filter(r=>r.type==="credit"&&r.settled) : records.filter(r=>r.type==="debt"&&r.settled)).length}
            </div>
            <div style={{ fontSize: 10, opacity: 0.6, marginTop: 1 }}>records closed</div>
          </div>
        </div>
      </div>

      {/* ── Overdue alert ── */}
      {overdueCount > 0 && (
        <div style={{ background: "#FFF8E1", border: "1.5px solid #FFD166", borderRadius: 12, padding: "10px 14px", fontSize: 12, color: "#856404", fontWeight: 600, marginBottom: "1rem", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <span>{overdueCount} record{overdueCount > 1 ? "s are" : " is"} past due date</span>
        </div>
      )}

      {/* ── Tab nav — Credits / Debts ── */}
      <div style={{ display: "flex", gap: 10, marginBottom: "0.75rem" }}>
        {[
          { id: "credit", emoji: "💰", label: "Credits", active: isCredit,
            activeBg: "#1D6F42", inactiveBg: "#EDF7EE", activeColor: "#fff", inactiveColor: "#1D6F42",
            count: records.filter(r=>r.type==="credit"&&!r.settled).length },
          { id: "debt", emoji: "📤", label: "Debts", active: !isCredit,
            activeBg: COLORS.danger, inactiveBg: COLORS.dangerLight, activeColor: "#fff", inactiveColor: COLORS.danger,
            count: records.filter(r=>r.type==="debt"&&!r.settled).length },
        ].map(t => (
          <button key={t.id} onClick={() => setTypeFilter(t.id)} style={{
            flex: 1, padding: "11px 12px", borderRadius: 12, cursor: "pointer",
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13,
            border: "none", transition: "all 0.18s",
            background: t.active ? t.activeBg : t.inactiveBg,
            color: t.active ? t.activeColor : t.inactiveColor,
            boxShadow: t.active ? `0 3px 12px ${t.activeBg}55` : "none",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          }}>
            <span style={{ fontSize: 16 }}>{t.emoji}</span>
            <span>{t.label}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, borderRadius: 20, padding: "1px 7px",
              background: t.active ? "rgba(255,255,255,0.25)" : t.activeBg,
              color: "#fff",
            }}>{t.count}</span>
          </button>
        ))}
      </div>

      {/* ── Search ── */}
      <div style={{ position: "relative", marginBottom: "0.75rem" }}>
        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.muted, pointerEvents: "none" }}>
          <Icon name="search" size={15} />
        </span>
        <input
          style={{
            width: "100%", padding: "10px 36px 10px 38px", borderRadius: 12,
            border: `1.5px solid ${T.searchBorder}`, background: T.surface,
            fontSize: 13, fontFamily: "'Inter', sans-serif", outline: "none", color: COLORS.text,
            transition: "box-shadow 0.2s",
          }}
          placeholder={`Search ${isCredit ? "credits" : "debts"}…`}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            background: T.muted + "44", border: "none", borderRadius: "50%",
            width: 18, height: 18, cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: T.label, fontSize: 11,
          }}>✕</button>
        )}
      </div>

      {/* ── Records ── */}
      {activeUnsettled.length === 0 && activeSettled.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>{isCredit ? "💰" : "📤"}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.label, marginBottom: 6 }}>No {isCredit ? "credits" : "debts"} yet</div>
          <div style={{ fontSize: 13, color: COLORS.textMuted }}>Tap the + button below to add your first record</div>
        </div>
      ) : (
        <>
          {activeUnsettled.length > 0 && (
            <>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, marginTop: 4 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.label, letterSpacing: "0.08em", textTransform: "uppercase" }}>Outstanding ({activeUnsettled.length})</div>
                {activeUnsettled.length > 1 && (
                  <button onClick={() => { setBulkMode(v => !v); setBulkSelected(new Set()); }} style={{
                    background: bulkMode ? T.label : "transparent",
                    color: bulkMode ? "#fff" : T.label,
                    border: `1.5px solid ${T.label}`, borderRadius: 8,
                    padding: "3px 10px", fontSize: 11, fontWeight: 700,
                    cursor: "pointer", fontFamily: "'Inter', sans-serif",
                  }}>{bulkMode ? "Cancel" : "Select"}</button>
                )}
              </div>
              {bulkMode && bulkSelected.size > 0 && (
                <div style={{ marginBottom: 10, display: "flex", gap: 8 }}>
                  <button onClick={() => {
                    bulkSelected.forEach(id => settle(id));
                    setBulkSelected(new Set());
                    setBulkMode(false);
                  }} style={{ flex: 1, padding: "10px", border: "none", borderRadius: 10, background: T.label, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                    ✓ Settle {bulkSelected.size} record{bulkSelected.size !== 1 ? "s" : ""}
                  </button>
                  <button onClick={() => {
                    bulkSelected.forEach(id => remove(id));
                    setBulkSelected(new Set());
                    setBulkMode(false);
                  }} style={{ padding: "10px 14px", border: "none", borderRadius: 10, background: COLORS.dangerLight, color: COLORS.danger, fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
                    🗑️
                  </button>
                </div>
              )}
              {activeUnsettled.map(r => (
                <div key={r.id} style={{ position: "relative" }}>
                  {bulkMode && (
                    <div onClick={() => setBulkSelected(prev => {
                      const next = new Set(prev);
                      next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                      return next;
                    })} style={{
                      position: "absolute", top: 12, left: 12, zIndex: 10,
                      width: 22, height: 22, borderRadius: 6,
                      border: `2px solid ${bulkSelected.has(r.id) ? T.label : COLORS.border}`,
                      background: bulkSelected.has(r.id) ? T.label : "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer", flexShrink: 0,
                    }}>
                      {bulkSelected.has(r.id) && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                  )}
                  <div style={{ marginLeft: bulkMode ? 38 : 0, transition: "margin 0.2s" }}>
                    <RecordCard r={r} dimmed={false} />
                  </div>
                </div>
              ))}
            </>
          )}
          {activeSettled.length > 0 && (
            <>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.sectionHdr, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, marginTop: 16 }}>Settled ({activeSettled.length})</div>
              {activeSettled.map(r => <RecordCard key={r.id} r={r} dimmed={true} />)}
            </>
          )}
        </>
      )}

      {/* ── Archived / Recycle Bin ── */}
      {archivedRecords.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textLight, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>🗑️ Archived ({archivedRecords.length})</div>
          {archivedRecords.map(r => (
            <div key={r.id} style={{ background: COLORS.bg, borderRadius: 12, padding: "10px 14px", marginBottom: 8, border: `1px solid ${COLORS.border}`, opacity: 0.7, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textMuted, textDecoration: "line-through", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</div>
                <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 1 }}>{r.type === "credit" ? "💰 Credit" : "📤 Debt"} · {r.date} · {NAIRA(r.amount)}</div>
              </div>
              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                <button onClick={() => restore(r.id)} style={{ background: COLORS.accentLight, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, color: COLORS.accent, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Restore</button>
                <button onClick={() => hardDelete(r.id)} style={{ background: COLORS.dangerLight, border: "none", borderRadius: 7, padding: "5px 10px", fontSize: 11, color: COLORS.danger, cursor: "pointer", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── FAB ── */}
      <button
        onClick={() => { setEditId(null); setErrors({}); setShowTypeChoice(true); }}
        title="Add new record"
        style={{
          position: "fixed", bottom: "calc(28px + var(--fab-lift, 0px))", right: 28, zIndex: 200,
          width: 56, height: 56, borderRadius: "50%",
          background: COLORS.primary, color: "#fff", border: "none",
          boxShadow: "0 4px 18px rgba(27,108,168,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", fontSize: 28, lineHeight: 1,
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform="scale(1.1)"; e.currentTarget.style.boxShadow="0 6px 24px rgba(27,108,168,0.55)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform="scale(1)";   e.currentTarget.style.boxShadow="0 4px 18px rgba(27,108,168,0.45)"; }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
      </button>

      {/* ── Type choice popup ── */}
      {showTypeChoice && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.45)",
        }} onClick={() => setShowTypeChoice(false)}>
          <div style={{
            background: "#fff", borderRadius: 22, padding: "28px 22px",
            width: "calc(100% - 56px)", maxWidth: 320,
            boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
            animation: "scaleIn 0.2s cubic-bezier(0.4,0,0.2,1)",
          }} onClick={e => e.stopPropagation()}>

            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{ fontSize: 38, marginBottom: 10 }}>🤝</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, marginBottom: 6 }}>Add New Record</div>
              <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>
                What type of record would you like to add?
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Credit option */}
              <button onClick={() => {
                setForm({ type: "credit", name: "", amount: "", note: "", dueDate: "", date: TODAY(), paybackPeriod: "", paybackUnit: "months" });
                setShowTypeChoice(false);
                setTab("add");
              }} style={{
                padding: "14px 16px", borderRadius: 14, cursor: "pointer",
                border: "2px solid #86C99A", background: "#EDF7EE",
                fontFamily: "'Inter', sans-serif", textAlign: "left",
                transition: "all 0.15s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>💰</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#1D6F42" }}>Credit</div>
                    <div style={{ fontSize: 11, color: "#4B9B6B", marginTop: 2 }}>Someone owes you money</div>
                  </div>
                  <svg style={{ marginLeft: "auto" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D6F42" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              </button>

              {/* Debt option */}
              <button onClick={() => {
                setForm({ type: "debt", name: "", amount: "", note: "", dueDate: "", date: TODAY(), paybackPeriod: "", paybackUnit: "months" });
                setShowTypeChoice(false);
                setTab("add");
              }} style={{
                padding: "14px 16px", borderRadius: 14, cursor: "pointer",
                border: `2px solid #E8A0A0`, background: COLORS.dangerLight,
                fontFamily: "'Inter', sans-serif", textAlign: "left",
                transition: "all 0.15s",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>📤</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.danger }}>Debt</div>
                    <div style={{ fontSize: 11, color: "#C0392B99", marginTop: 2 }}>You owe someone money</div>
                  </div>
                  <svg style={{ marginLeft: "auto" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.danger} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </div>
              </button>
            </div>

            <button onClick={() => setShowTypeChoice(false)} style={{
              width: "100%", marginTop: 14, background: "none", border: "none",
              fontSize: 13, color: COLORS.textMuted, cursor: "pointer",
              fontFamily: "'Inter', sans-serif", padding: "6px",
            }}>Cancel</button>
          </div>
        </div>
      )}

      {/* ── Add / Edit modal sheet ── */}
      {tab === "add" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          alignItems: "center",
          background: "rgba(0,0,0,0.4)",
        }} onClick={() => { setTab("list"); setEditId(null); }}>
          <div style={{
            background: "#fff", borderRadius: "18px 18px 0 0",
            padding: "0 1rem 1.5rem", maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
            animation: "slideUp 0.25s cubic-bezier(0.4,0,0.2,1)",
            width: "100%", maxWidth: 340,
          }} onClick={e => e.stopPropagation()}>
            {/* drag handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
              <div style={{ width: 40, height: 5, borderRadius: 3, background: COLORS.border }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{editId ? "Edit Record" : "New Record"}</div>
              <button onClick={() => { setTab("list"); setEditId(null); }} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.textMuted, fontSize: 20, lineHeight: 1, padding: 4 }}>×</button>
            </div>

            {editId && <div style={{ background: COLORS.amberLight, color: COLORS.amber, borderRadius: 8, padding: "7px 12px", fontSize: 12, marginBottom: 12, fontWeight: 500 }}>Editing existing record</div>}

            {/* type toggle */}
            <div className="form-group">
              <label className="form-label">Type</label>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setForm(p=>({...p,type:"credit"}))} style={{
                  flex: 1, padding: "10px", border: `2px solid ${form.type==="credit" ? "#1D6F42" : COLORS.border}`,
                  borderRadius: 9, background: form.type==="credit" ? "#EDF7EE" : COLORS.bg,
                  color: form.type==="credit" ? "#1D6F42" : COLORS.textMuted, fontWeight: 600,
                  cursor: "pointer", fontSize: 13, fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
                }}>💰 Credit (they owe me)</button>
                <button onClick={() => setForm(p=>({...p,type:"debt"}))} style={{
                  flex: 1, padding: "10px", border: `2px solid ${form.type==="debt" ? COLORS.danger : COLORS.border}`,
                  borderRadius: 9, background: form.type==="debt" ? COLORS.dangerLight : COLORS.bg,
                  color: form.type==="debt" ? COLORS.danger : COLORS.textMuted, fontWeight: 600,
                  cursor: "pointer", fontSize: 13, fontFamily: "'Inter', sans-serif", transition: "all 0.15s",
                }}>📤 Debt (I owe them)</button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">{form.type === "credit" ? "Debtor's Name" : "Creditor's Name"}</label>
              <input className={`form-input${errors.name ? " error" : ""}`} placeholder="Full name or business" value={form.name}
                onChange={e => { setForm(p=>({...p,name:e.target.value})); setErrors(p=>({...p,name:null})); }} />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Amount (₦)</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted, fontWeight: 600 }}>₦</span>
                <input type="number" className={`form-input${errors.amount ? " error" : ""}`} style={{ paddingLeft: 28 }} placeholder="0.00" value={form.amount}
                  onChange={e => { setForm(p=>({...p,amount:e.target.value})); setErrors(p=>({...p,amount:null})); }} />
              </div>
              {errors.amount && <div className="form-error">{errors.amount}</div>}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Date</label>
                <input type="date" className="form-input" value={form.date} onChange={e => setForm(p=>({...p,date:e.target.value}))} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label className="form-label">Due Date (optional)</label>
                <input type="date" className="form-input" value={form.dueDate} onChange={e => setForm(p=>({...p,dueDate:e.target.value}))} />
              </div>
            </div>

            {/* ── Payback Period (optional) ── */}
            <div style={{ background: COLORS.bg, borderRadius: 14, padding: "14px", marginBottom: "0.85rem", border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                ⏱️ Payback Period
                <span style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 400 }}>— optional</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>
                How long before this should be paid back?
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="number" min="1" className="form-input"
                  placeholder="e.g. 2"
                  value={form.paybackPeriod}
                  onChange={e => setForm(p => ({ ...p, paybackPeriod: e.target.value }))}
                  style={{ flex: 1 }}
                />
                <select className="form-input" value={form.paybackUnit}
                  onChange={e => setForm(p => ({ ...p, paybackUnit: e.target.value }))}
                  style={{ flex: 1 }}>
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                </select>
              </div>
              {form.paybackPeriod && parseInt(form.paybackPeriod) > 0 && !form.dueDate && (
                <div style={{ fontSize: 12, color: COLORS.accent, marginTop: 8, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                  ✓ Due date will be auto-set to {form.paybackPeriod} {form.paybackUnit} from today
                </div>
              )}
              {form.dueDate && form.paybackPeriod && (
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>
                  Using explicit due date above instead
                </div>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Note (optional)</label>
              <textarea className="form-input" rows={2} placeholder="What is this for?" value={form.note}
                onChange={e => setForm(p=>({...p,note:e.target.value}))} />
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => { setTab("list"); setEditId(null); }}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={save}>
                {editId ? "Update Record" : form.type === "credit" ? "Save Credit" : "Save Debt"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showExport && (
        <ExportModal
          title="Debt & Credit"
          onClose={() => setShowExport(false)}
          onExcelExport={() => {
            const headers = ["Type", "Name", "Amount (₦)", "Date", "Due Date", "Status", "Note"];
            const rows = records.map(r => [
              r.type === "credit" ? "Credit (they owe me)" : "Debt (I owe them)",
              r.name, r.amount, r.date, r.dueDate || "—",
              r.settled ? "Settled" : "Outstanding", r.note || "—"
            ]);
            exportToExcel("Debt_Credit_" + TODAY(), "Records", rows, headers);
            setShowExport(false); showToast("Excel file downloaded!");
          }}
          onPDFExport={() => {
            const headers = ["Type", "Name", "Amount (₦)", "Date", "Due Date", "Status"];
            const rows = records.map(r => [
              r.type === "credit" ? "Credit" : "Debt",
              r.name, NAIRA(r.amount), r.date, r.dueDate || "—",
              r.settled ? "Settled" : "Outstanding"
            ]);
            exportToPDF("Debt & Credit — Records", headers, rows, "Debt_Credit");
            setShowExport(false);
          }}
        />
      )}
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}

// ===================== MANAGE SECTORS =====================
function ManageSectorsScreen({ user, onSave, onBack }) {
  const [selected, setSelected] = useState(user.sectors && user.sectors.length > 0 ? [...user.sectors] : ["shop"]);
  const [error, setError] = useState("");

  const toggle = (id) => {
    setError("");
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const save = () => {
    if (selected.length === 0) { setError("Please keep at least one sector selected."); return; }
    onSave(selected);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1rem" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
          <Icon name="back" size={16} /> Back
        </button>
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Manage Sectors</div>
      <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: "1rem" }}>Select all the sectors you want to track. You can change this anytime.</div>

      {error && (
        <div style={{ background: COLORS.dangerLight, color: COLORS.danger, borderRadius: 8, padding: "8px 12px", fontSize: 13, marginBottom: 12, fontWeight: 500 }}>{error}</div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {ALL_SECTORS.map(s => {
          const active = selected.includes(s.id);
          return (
            <div key={s.id} onClick={() => toggle(s.id)} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px",
              borderRadius: 14, cursor: "pointer", transition: "all 0.18s",
              border: active ? `2px solid ${s.borderColor}` : `1.5px solid ${COLORS.border}`,
              background: active ? s.color : COLORS.surface,
            }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{s.desc}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0,
                border: active ? "none" : `1.5px solid ${COLORS.border}`,
                background: active ? COLORS.primary : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.15s",
              }}>
                {active && <Icon name="check" size={13} />}
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn btn-primary" onClick={save} style={{ opacity: selected.length === 0 ? 0.5 : 1 }}>
        Save — {selected.length} sector{selected.length !== 1 ? "s" : ""} selected
      </button>
    </div>
  );
}

// ===================== PROFILE =====================


// ===================== HELP SUPPORT SECTION =====================
function HelpSupportSection() {
  const [helpModal, setHelpModal] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [suggSent, setSuggSent] = useState(false);

  const faqs = [
    { q: "How do I record a sale?",            a: "Go to your Shop sector, tap the + button, then choose 'Record a Sale'. Select the item, enter the quantity and tap Save." },
    { q: "How do I add items to inventory?",   a: "In the Shop screen, tap the + button and choose 'Add New Stock'. Fill in the item name, price and initial quantity." },
    { q: "How do I track who owes me money?",  a: "Go to Debt & Credit from the bottom bar. Tap +, choose 'Credit' (money owed to you), fill in the person's name and amount." },
    { q: "How do I set a payment reminder?",   a: "When adding a debt or credit record, set the 'Reminder' field to how many days before the due date you want to be alerted." },
    { q: "How do I export my records?",        a: "In any screen tap the Export button. You can export to Excel or PDF. The Overview screen lets you export all data at once." },
    { q: "How do I switch between sectors?",   a: "Tap 'Sector' in the bottom bar. To switch, use the Home screen sector grid or the sidebar on larger screens." },
    { q: "How do I install the app?",          a: "iPhone: Safari → Share → 'Add to Home Screen'. Android: Chrome menu → 'Add to Home Screen'. Opens full-screen like a native app." },
    { q: "Can I use it on multiple phones?",   a: "Your data is currently saved on this device. Export your records to back them up. Cloud sync is coming soon." },
  ];

  const helpItems = [
    { id: "faq",     icon: "❓", label: "FAQ",                    sub: "Frequently asked questions" },
    { id: "tour",    icon: "🗺️",  label: "Guide Tour",             sub: "How each section works" },
    { id: "contact", icon: "💬", label: "Contact & Suggestions",  sub: "Send feedback or get help" },
  ];

  return (
    <>
      <div className="section-title">Help & Support</div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {helpItems.map((item, i) => (
          <button key={item.id} onClick={() => setHelpModal(item.id)} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 14,
            padding: "14px 16px", background: "none", border: "none", cursor: "pointer",
            borderBottom: i < helpItems.length - 1 ? `1px solid ${COLORS.border}` : "none",
            fontFamily: "'Inter', sans-serif", textAlign: "left",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 11, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.text }}>{item.label}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{item.sub}</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.textLight} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        ))}
      </div>

      {/* FAQ Modal */}
      {helpModal === "faq" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
          onClick={() => setHelpModal(null)}>
          <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440, maxHeight: "calc(100vh - 32px)", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", animation: "scaleIn 0.2s ease" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>❓</div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>FAQ</div>
              </div>
              <button onClick={() => setHelpModal(null)} style={{ background: COLORS.bg, border: "none", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: COLORS.textMuted }}>×</button>
            </div>
            <div style={{ overflowY: "auto", flex: 1 }}>
              {faqs.map((item, i) => (
                <div key={i} style={{ borderBottom: `0.5px solid ${COLORS.border}` }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left", gap: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, lineHeight: 1.4, flex: 1 }}>{item.q}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2.5" style={{ flexShrink: 0, transition: "transform 0.2s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: "0 18px 14px", fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7 }}>{item.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Guide Tour Modal */}
      {helpModal === "tour" && <GuideTourModal onClose={() => setHelpModal(null)} />}

      {/* Contact & Suggestions Modal */}
      {helpModal === "contact" && (
        <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
          onClick={() => setHelpModal(null)}>
          <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440, maxHeight: "calc(100vh - 32px)", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", animation: "scaleIn 0.2s ease" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💬</div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>Contact & Suggestions</div>
              </div>
              <button onClick={() => setHelpModal(null)} style={{ background: COLORS.bg, border: "none", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: COLORS.textMuted }}>×</button>
            </div>
            <div style={{ overflowY: "auto", flex: 1, padding: "18px" }}>
              <div style={{ background: "#F0FDF4", border: "1px solid #86EFAC", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>📱</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>Chat with us on WhatsApp</div>
                  <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>We respond within 24 hours</div>
                </div>
                <a href="https://wa.me/2348119528922" target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 700, textDecoration: "none", flexShrink: 0, fontFamily: "'Inter', sans-serif" }}>Chat</a>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 6 }}>💡 Send a Suggestion</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>Have an idea to improve Record Chief? We'd love to hear it.</div>
                {suggSent ? (
                  <div style={{ background: COLORS.accentLight, border: `1px solid #6EE7B7`, borderRadius: 12, padding: "14px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 24, marginBottom: 6 }}>🎉</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent }}>Thank you for your feedback!</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 4 }}>Your suggestion has been sent.</div>
                  </div>
                ) : (
                  <>
                    <textarea className="form-input" rows={4} placeholder="e.g. I'd love to attach photos to expenses…" value={suggestion} onChange={e => setSuggestion(e.target.value)} style={{ resize: "none", marginBottom: 10 }} />
                    <button className="btn btn-primary" disabled={!suggestion.trim()}
                      onClick={() => {
                        if (suggestion.trim()) {
                          const msg = encodeURIComponent("Record Chief Suggestion:\n\n" + suggestion.trim());
                          window.open("https://wa.me/2348119528922?text=" + msg, "_blank");
                          setSuggSent(true); setSuggestion("");
                        }
                      }}
                      style={{ opacity: suggestion.trim() ? 1 : 0.5 }}>
                      Send via WhatsApp
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ===================== GUIDE TOUR MODAL =====================
function GuideTourModal({ onClose }) {
  const [tourStep, setTourStep] = useState(null);

  const fullGuide = [
    {
      emoji: "🏠", title: "Home Screen", color: COLORS.primary, bg: COLORS.primaryLight,
      short: "Your dashboard and starting point",
      steps: [
        { icon: "👋", heading: "Welcome Banner", body: "At the top you see your name, today's date and business location. Tap 📊 OVERVIEW to jump to your dashboard." },
        { icon: "🔔", heading: "Debt Alerts", body: "If any debt or credit is overdue or due soon, a coloured banner appears automatically. Tap it to go straight to Debt & Credit." },
        { icon: "🏪", heading: "Sector Cards", body: "Your active sectors (Shop, Farm, Customer Records) appear as tappable cards. Tap any card to open that sector." },
        { icon: "🤝", heading: "Debt & Credit Card", body: "A full-width card shows outstanding records. It turns red when records are overdue. Tap it to manage debts and credits." },
      ],
    },
    {
      emoji: "🏪", title: "Shop Sales", color: "#2563EB", bg: "#EFF6FF",
      short: "Record sales and manage inventory",
      steps: [
        { icon: "➕", heading: "Adding a Sale", body: "Tap the blue + button. Choose 'Record a Sale', pick the item, enter quantity and tap Save. Stock is reduced automatically." },
        { icon: "📦", heading: "Adding Inventory", body: "Tap + then choose 'Add New Stock'. Enter the item name, price per unit, and how many you have. Tap Add to Inventory." },
        { icon: "📋", heading: "Sales History", body: "The History tab shows every sale. Filter by tag, search by item name, sort by date or amount, and see your best-selling items at the top." },
        { icon: "📅", heading: "Period Filter", body: "Use the 'View Period Sale' dropdown to see totals for Today, This Week, This Month, This Year or a Custom date range." },
        { icon: "⚠️", heading: "Stock Alerts", body: "If an item runs out or falls below 5 units, a red or amber alert appears. Check Notifications for a full stock list." },
      ],
    },
    {
      emoji: "🌾", title: "Farm Expenses", color: "#1B4332", bg: "#ECFDF5",
      short: "Log and categorise farming costs",
      steps: [
        { icon: "➕", heading: "Adding an Expense", body: "Tap the green + button. Fill in the date, description, amount, and choose a category: Seeds, Fertilizer, Labor, Transport, Equipment or Others." },
        { icon: "📂", heading: "Category Filter", body: "Tap any category chip to filter expenses by type. Tap 'All' to see everything." },
        { icon: "📊", heading: "Spend Breakdown", body: "The banner shows a bar chart of your top spending categories so you can see where most of your farm money goes." },
        { icon: "📤", heading: "Exporting", body: "Tap Export to download your farm expenses as an Excel or PDF file for your records or accountant." },
      ],
    },
    {
      emoji: "👥", title: "Customer Records", color: "#7C3AED", bg: "#F5F3FF",
      short: "Track clients, deals and custom data",
      steps: [
        { icon: "🔧", heading: "Setting Up Fields", body: "On your first entry, set up your columns. Add fields like Customer Name, Product, Amount, Status — anything that fits your business." },
        { icon: "➕", heading: "Adding a Record", body: "Tap +. A popup asks to keep existing fields or reset. Fill in the form and tap Save Record." },
        { icon: "🔤", heading: "Sorting Records", body: "Use the 'Sort by' dropdown to organise by Newest Date, Oldest Date, A to Z, Z to A, or Recently Added." },
        { icon: "🔍", heading: "Searching", body: "Type in the search box to instantly find any record across all field values." },
      ],
    },
    {
      emoji: "🤝", title: "Debt & Credit", color: "#DC2626", bg: "#FEF2F2",
      short: "Track what you owe and what's owed to you",
      steps: [
        { icon: "💰", heading: "Credits — Money Owed to You", body: "Tap + and choose 'Credit'. Enter the person's name, amount and due date. Tracked as money others owe you." },
        { icon: "📤", heading: "Debts — Money You Owe", body: "Tap + and choose 'Debt'. Enter who you owe, the amount and due date. The app reminds you before it's due." },
        { icon: "⏱️", heading: "Payback Period", body: "Set a payback period like '2 months' instead of a specific date. The due date is calculated automatically." },
        { icon: "🔔", heading: "Reminders", body: "Set how many days before the due date you want to be notified. Alerts appear on Home, Notifications and the bell icon." },
        { icon: "💳", heading: "Part Payments", body: "For instalments, tap 'Record Part Payment'. Enter the amount. A progress bar shows what's left. Auto-settles when fully paid." },
        { icon: "✅", heading: "Settling a Record", body: "When fully paid, tap 'Mark Settled'. Settled records move to a separate section. Recurring records auto-create the next one." },
      ],
    },
    {
      emoji: "📊", title: "Overview", color: "#059669", bg: "#ECFDF5",
      short: "Charts, trends and business health",
      steps: [
        { icon: "📅", heading: "Monthly Report Card", body: "See this month's Shop Sales, Farm Spend and Net Profit or Loss side by side at a glance." },
        { icon: "💳", heading: "Health Score", body: "A colour-coded bar shows your debt-to-credit ratio. Green means healthy, amber means caution, red means at risk." },
        { icon: "📈", heading: "Month Comparison", body: "See how this month compares to last month for shop sales and farm expenses with percentage change badges." },
        { icon: "📊", heading: "6-Month Charts", body: "Bar charts for Shop Sales and Farm Expenses over the last 6 months let you spot trends easily." },
        { icon: "💾", heading: "Export All", body: "Tap Export All to download a full Excel or PDF covering all sectors and debt records in one file." },
      ],
    },
    {
      emoji: "🔔", title: "Notifications", color: "#D97706", bg: "#FFFBEB",
      short: "All your alerts in one place",
      steps: [
        { icon: "🚨", heading: "Overdue Records", body: "Debts or credits past their due date appear in red showing the name, amount and days overdue." },
        { icon: "⏰", heading: "Due Soon", body: "Records coming up within your reminder window appear in amber showing days remaining." },
        { icon: "🚫", heading: "Out of Stock", body: "Shop items at zero stock appear here so you know what to restock immediately." },
        { icon: "⚠️", heading: "Low Stock", body: "Items with fewer than 5 units show in amber so you can restock before running out." },
        { icon: "🔢", heading: "Bell Badge", body: "The bell icon in the top bar shows a red number badge with the total count of active alerts." },
      ],
    },
  ];

  if (tourStep !== null) {
    const s = fullGuide[tourStep];
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
        onClick={() => setTourStep(null)}>
        <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440, maxHeight: "calc(100vh - 32px)", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", animation: "scaleIn 0.2s ease" }}
          onClick={e => e.stopPropagation()}>
          <div style={{ background: s.color, borderRadius: "20px 20px 0 0", padding: "20px 18px 16px", color: "#fff", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 32 }}>{s.emoji}</span>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800 }}>{s.title}</div>
                  <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{s.short}</div>
                </div>
              </div>
              <button onClick={() => setTourStep(null)} style={{ background: "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#fff" }}>×</button>
            </div>
          </div>
          <div style={{ overflowY: "auto", flex: 1, padding: "8px 0" }}>
            {s.steps.map((step, si) => (
              <div key={si} style={{ display: "flex", gap: 14, padding: "14px 18px", borderBottom: si < s.steps.length - 1 ? "0.5px solid " + COLORS.border : "none" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{step.icon}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>{step.heading}</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.7 }}>{step.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 18px 16px", borderTop: "1px solid " + COLORS.border, display: "flex", gap: 10, flexShrink: 0 }}>
            <button onClick={() => setTourStep(t => Math.max(0, t - 1))} disabled={tourStep === 0}
              style={{ flex: 1, padding: "10px", border: "1px solid " + COLORS.border, borderRadius: 10, background: "transparent", color: tourStep === 0 ? COLORS.textLight : COLORS.text, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, cursor: tourStep === 0 ? "default" : "pointer" }}>← Prev</button>
            <button onClick={() => setTourStep(t => Math.min(fullGuide.length - 1, t + 1))} disabled={tourStep === fullGuide.length - 1}
              style={{ flex: 1, padding: "10px", border: "none", borderRadius: 10, background: s.color, color: "#fff", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, cursor: tourStep === fullGuide.length - 1 ? "default" : "pointer", opacity: tourStep === fullGuide.length - 1 ? 0.5 : 1 }}>Next →</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 440, maxHeight: "calc(100vh - 32px)", display: "flex", flexDirection: "column", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", animation: "scaleIn 0.2s ease" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ padding: "16px 18px 14px", borderBottom: "1px solid " + COLORS.border, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🗺️</div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Guide Tour</div>
          </div>
          <button onClick={onClose} style={{ background: COLORS.bg, border: "none", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: COLORS.textMuted }}>×</button>
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "6px 0" }}>
          {fullGuide.map((section, i) => (
            <button key={i} onClick={() => setTourStep(i)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "13px 18px",
              background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", textAlign: "left",
              borderBottom: i < fullGuide.length - 1 ? "0.5px solid " + COLORS.border : "none",
            }}
            onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: section.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{section.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{section.title}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{section.short}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textLight} strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


// ===================== STAFF INVITE SECTION =====================
function StaffInviteSection({ user }) {
  const [email, setEmail]       = useState("");
  const [invites, setInvites]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg]           = useState({ text: "", ok: true });
  const token = localStorage.getItem("rc_token");

  // Load existing invites
  useEffect(() => {
    if (!token) { setFetching(false); return; }
    fetch(`${API_URL}/api/invite`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { setInvites(d.invites || []); setFetching(false); })
      .catch(() => setFetching(false));
  }, []);

  const sendInvite = async () => {
    if (!email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setMsg({ text: "Enter a valid email address", ok: false }); return;
    }
    setLoading(true); setMsg({ text: "", ok: true });
    try {
      const res  = await fetch(`${API_URL}/api/invite`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) { setMsg({ text: data.error || "Failed to send invite", ok: false }); }
      else {
        setInvites(prev => [data.invite, ...prev]);
        setEmail("");
        const inviteURL = data.inviteURL || "";
        const msgText = inviteURL
          ? "Invite sent! They will receive an email. You can also share this link: " + inviteURL
          : "Invite sent! They will receive an email with a link to join.";
        setMsg({ text: msgText, ok: true });
      }
    } catch(e) {
      setMsg({ text: "Network error. Try again.", ok: false });
    }
    setLoading(false);
  };

  const revokeInvite = async (inviteId) => {
    if (!window.confirm("Remove this person's access?")) return;
    try {
      await fetch(`${API_URL}/api/invite/${inviteId}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      setInvites(prev => prev.filter(i => i._id !== inviteId));
    } catch(e) {}
  };

  if (user.role === "staff") {
    return (
      <div className="card" style={{ marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: COLORS.accentLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>👥</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Staff Account</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 1 }}>
              You are viewing and editing your employer's business records.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{ marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>👥</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Invite Staff</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 1 }}>Give a partner or employee access to your records</div>
        </div>
      </div>

      {/* Existing invites */}
      {fetching ? (
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 12 }}>Loading...</div>
      ) : invites.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          {invites.map(inv => (
            <div key={inv._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: `0.5px solid ${COLORS.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: inv.status === "accepted" ? COLORS.accentLight : COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: inv.status === "accepted" ? COLORS.accent : COLORS.primary }}>
                  {(inv.staffName || inv.email)[0].toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{inv.staffName || inv.email}</div>
                  <div style={{ fontSize: 11, color: inv.status === "accepted" ? COLORS.accent : COLORS.amber, marginTop: 1 }}>
                    {inv.status === "accepted" ? "✅ Active" : inv.status === "revoked" ? "❌ Revoked" : "⏳ Invite pending"}
                  </div>
                </div>
              </div>
              {inv.status !== "revoked" && (
                <button onClick={() => revokeInvite(inv._id)} style={{ background: COLORS.dangerLight, border: "none", cursor: "pointer", color: COLORS.danger, fontSize: 11, fontWeight: 700, borderRadius: 7, padding: "5px 10px", fontFamily: "'Inter', sans-serif" }}>
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Invite input */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          className="form-input" style={{ flex: 1 }}
          placeholder="staff@email.com"
          value={email}
          onChange={e => { setEmail(e.target.value); setMsg({ text: "", ok: true }); }}
          onKeyDown={e => e.key === "Enter" && sendInvite()}
          type="email"
        />
        <button className="btn btn-primary" onClick={sendInvite} disabled={loading}
          style={{ flexShrink: 0, width: "auto", padding: "0 16px" }}>
          {loading ? "..." : "Invite"}
        </button>
      </div>
      {msg.text && (
        <div style={{ fontSize: 12, marginTop: 8, color: msg.ok ? COLORS.accent : COLORS.danger, lineHeight: 1.5 }}>
          {msg.text}
        </div>
      )}

      <div style={{ marginTop: 12, padding: "10px 12px", background: COLORS.primaryLight, borderRadius: 10, fontSize: 12, color: COLORS.primary, lineHeight: 1.6 }}>
        💡 Invited staff will receive an email, sign up with their own account, and immediately see your business records. You can remove their access anytime.
      </div>
    </div>
  );
}


// ===================== EMAIL VERIFY SECTION =====================
function EmailVerifySection({ user, onVerified }) {
  const [otp, setOtp]         = useState("");
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("rc_token");

  const sendCode = async () => {
    setSending(true); setError(""); setSent(false);
    try {
      const res  = await fetch(`${API_URL}/api/otp/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Failed to send code.");
      else { setSent(true); setOtp(""); }
    } catch(e) { setError("Network error. Check your connection."); }
    setSending(false);
  };

  const verifyCode = async () => {
    if (!otp.trim()) { setError("Enter the code from your email"); return; }
    setVerifying(true); setError("");
    try {
      const res  = await fetch(`${API_URL}/api/otp/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ otp: otp.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Incorrect code."); }
      else {
        setSuccess(true);
        if (onVerified) onVerified();
      }
    } catch(e) { setError("Network error."); }
    setVerifying(false);
  };

  if (user.emailVerified || success) {
    return (
      <div style={{ background: COLORS.accentLight, border: `1px solid #6EE7B7`, borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
        <div style={{ fontSize: 24 }}>✅</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent }}>Email Verified</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{user.email} is verified</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: COLORS.amberLight, border: `1px solid #FCD34D`, borderRadius: 14, padding: "16px", marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ fontSize: 22 }}>📧</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.amber }}>Email not verified</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 1 }}>Verify your email to secure your account</div>
        </div>
      </div>

      {sent ? (
        <>
          <div style={{ fontSize: 12, color: COLORS.accent, marginBottom: 10, background: COLORS.accentLight, borderRadius: 8, padding: "8px 10px" }}>
            ✅ Code sent to <strong>{user.email}</strong>. Check your inbox (and spam folder).
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              className="form-input"
              type="number"
              placeholder="Enter 6-digit code"
              value={otp}
              maxLength={6}
              onChange={e => { setOtp(e.target.value.slice(0,6)); setError(""); }}
              onKeyDown={e => e.key === "Enter" && verifyCode()}
              style={{ flex: 1, textAlign: "center", fontFamily: "'Space Mono', monospace", fontSize: 18, fontWeight: 700, letterSpacing: 6 }}
              autoFocus
            />
            <button className="btn btn-primary btn-sm" onClick={verifyCode} disabled={verifying} style={{ flexShrink: 0, padding: "0 14px" }}>
              {verifying ? "…" : "Verify"}
            </button>
          </div>
          <button onClick={sendCode} disabled={sending} style={{ background: "none", border: "none", color: COLORS.primary, fontSize: 12, cursor: "pointer", fontFamily: "'Inter', sans-serif", padding: 0 }}>
            {sending ? "Sending…" : "Resend code"}
          </button>
        </>
      ) : (
        <button className="btn btn-primary" onClick={sendCode} disabled={sending} style={{ background: COLORS.amber }}>
          {sending ? "Sending…" : "📨 Send Verification Code"}
        </button>
      )}

      {error && <div style={{ color: COLORS.danger, fontSize: 12, marginTop: 8 }}>{error}</div>}
    </div>
  );
}


// ===================== DELETE ACCOUNT SECTION =====================
function DeleteAccountSection({ user, onLogout }) {
  const [open, setOpen]         = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const confirmDelete = async () => {
    if (emailInput.trim().toLowerCase() !== user.email?.toLowerCase()) {
      setError("Email does not match your account email."); return;
    }
    setLoading(true); setError("");
    const token = localStorage.getItem("rc_token");
    try {
      const res  = await fetch(`${API_URL}/api/auth/account`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: emailInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to delete account."); setLoading(false); return; }
      // Clear all local data
      Object.keys(localStorage).forEach(k => localStorage.removeItem(k));
      onLogout();
    } catch(e) {
      setError("Network error. Check your connection."); setLoading(false);
    }
  };

  if (!open) return (
    <div style={{ marginTop: 8 }}>
      <button
        onClick={() => setOpen(true)}
        style={{ width: "100%", background: "none", border: `1px solid ${COLORS.danger}`, borderRadius: 10, padding: "10px 14px", color: COLORS.danger, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif", display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
        🗑️ Delete Account
      </button>
    </div>
  );

  return (
    <div style={{ marginTop: 8, background: COLORS.dangerLight, border: `1.5px solid #FCA5A5`, borderRadius: 14, padding: "16px" }}>
      <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.danger, marginBottom: 6 }}>⚠️ Delete Account</div>
      <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 14, lineHeight: 1.6 }}>
        This will permanently delete your account and <strong>all your business records</strong>. This cannot be undone.
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 6 }}>
        Type your email <strong>{user.email}</strong> to confirm:
      </div>
      <input
        className="form-input"
        type="email"
        placeholder={user.email}
        value={emailInput}
        onChange={e => { setEmailInput(e.target.value); setError(""); }}
        style={{ marginBottom: 10 }}
      />
      {error && <div style={{ color: COLORS.danger, fontSize: 12, marginBottom: 8 }}>{error}</div>}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => { setOpen(false); setEmailInput(""); setError(""); }}
          className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
        <button onClick={confirmDelete} disabled={loading || !emailInput.trim()}
          className="btn btn-danger" style={{ flex: 1, opacity: emailInput.trim() ? 1 : 0.5 }}>
          {loading ? "Deleting…" : "Delete Forever"}
        </button>
      </div>
    </div>
  );
}

function ProfileScreen({ user, onLogout, onManageSectors }) {
  const avatarKey = `sl_avatar_${user.uid}`;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [toast, setToast] = useState(null);
  const [avatar, setAvatar] = useLocalState(avatarKey, null);
  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { setToast({ msg: "Image must be under 2MB", type: "error" }); return; }
    const reader = new FileReader();
    reader.onload = (ev) => { setAvatar(ev.target.result); setToast({ msg: "Profile picture updated!", type: "success" }); };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div style={{ textAlign: "center", padding: "1.5rem 0 1rem" }}>
        {/* Avatar with click-to-change */}
        <div style={{ position: "relative", width: 80, height: 80, margin: "0 auto 0.5rem" }}>
          <label htmlFor="avatar-upload" style={{ cursor: "pointer", display: "block", width: "100%", height: "100%" }}>
            <div className="profile-avatar-lg">
              {avatar
                ? <img src={avatar} alt="Profile" />
                : <span>{initials}</span>
              }
              <div className="avatar-edit-overlay">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
              </div>
            </div>
          </label>
          <input id="avatar-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarChange} />
        </div>
        <div style={{ fontSize: 12, color: COLORS.primary, marginBottom: 4, cursor: "pointer" }}>
          <label htmlFor="avatar-upload" style={{ cursor: "pointer" }}>
            {avatar ? "Change photo" : "Add profile photo"}
          </label>
          {avatar && (
            <span
              onClick={() => { setAvatar(null); setToast({ msg: "Photo removed", type: "success" }); }}
              style={{ color: COLORS.danger, marginLeft: 10, cursor: "pointer" }}>
              Remove
            </span>
          )}
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginTop: 6 }}>{user.name}</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted }}>{user.email}</div>
        <div style={{ fontSize: 12, color: COLORS.textLight, marginTop: 3 }}>{user.phone}</div>
      </div>

      <div className="card">
        {editing ? (
          <>
            <div className="form-group">
              <label className="form-label">Display Name</label>
              <input className="form-input" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => { setEditing(false); setName(user.name); }}>Cancel</button>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => { user.name = name; setEditing(false); setToast({ msg: "Profile updated!", type: "success" }); }}>Save</button>
            </div>
          </>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>Full Name</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{user.name}</div>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setEditing(true)}><Icon name="edit" size={14} /> Edit</button>
            </div>
            <div className="divider" />
            <div>
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>Email</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{user.email}</div>
            </div>
            <div className="divider" />
            <div>
              <div style={{ fontSize: 13, color: COLORS.textMuted }}>Phone</div>
              <div style={{ fontSize: 15, fontWeight: 500 }}>{user.phone}</div>
            </div>
            {user.location && <>
              <div className="divider" />
              <div>
                <div style={{ fontSize: 13, color: COLORS.textMuted }}>Business Location</div>
                <div style={{ fontSize: 15, fontWeight: 500 }}>{user.location}</div>
              </div>
            </>}
          </div>
        )}
      </div>

      <div className="section-title">Sharing & Collaboration</div>
      <StaffInviteSection user={user} />

      <EmailVerifySection user={user} onVerified={() => {
        const updated = { ...user, emailVerified: true };
        const session = localStorage.getItem("rc_session");
        if (session) localStorage.setItem("rc_session", JSON.stringify(updated));
      }} />
      <div className="section-title">Privacy & Security</div>
      <div className="card" style={{ marginBottom: "0.75rem" }}>
        {(() => {
          const pinKey = "sl_pin";
          const [currentPin, setCurrentPin] = useLocalState(pinKey, null);
          const [pinSetup, setPinSetup] = useState(false);
          const [p1, setP1] = useState(""); const [p2, setP2] = useState(""); const [pErr, setPErr] = useState("");
          return (
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: COLORS.primaryLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔒</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>App PIN Lock</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>{currentPin ? "PIN is set" : "No PIN — app is unlocked"}</div>
                  </div>
                </div>
                <button onClick={() => { setPinSetup(v => !v); setP1(""); setP2(""); setPErr(""); }} style={{ background: currentPin ? COLORS.dangerLight : COLORS.primaryLight, border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Inter', sans-serif", color: currentPin ? COLORS.danger : COLORS.primary }}>
                  {currentPin ? "Remove PIN" : (pinSetup ? "Cancel" : "Set PIN")}
                </button>
              </div>
              {currentPin && !pinSetup && (
                <button onClick={() => { setCurrentPin(null); showToast && showToast("PIN removed"); }} style={{ marginTop: 8, width: "100%", padding: "8px", border: `1px solid ${COLORS.dangerLight}`, borderRadius: 8, background: COLORS.dangerLight, color: COLORS.danger, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>Remove PIN Lock</button>
              )}
              {pinSetup && !currentPin && (
                <div style={{ marginTop: 12 }}>
                  <div className="form-group">
                    <label className="form-label">New PIN (4 digits)</label>
                    <input type="password" inputMode="numeric" maxLength={4} className="form-input" placeholder="••••" value={p1} onChange={e => setP1(e.target.value.replace(/\D/g,"").slice(0,4))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm PIN</label>
                    <input type="password" inputMode="numeric" maxLength={4} className="form-input" placeholder="••••" value={p2} onChange={e => setP2(e.target.value.replace(/\D/g,"").slice(0,4))} />
                  </div>
                  {pErr && <div style={{ fontSize: 12, color: COLORS.danger, marginBottom: 8 }}>{pErr}</div>}
                  <button className="btn btn-primary" onClick={() => {
                    if (p1.length !== 4) { setPErr("PIN must be 4 digits"); return; }
                    if (p1 !== p2) { setPErr("PINs don't match"); return; }
                    setCurrentPin(p1); setPinSetup(false); setP1(""); setP2(""); setPErr("");
                  }}>Save PIN</button>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Add to Home Screen tip */}
      {(() => {
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
        if (isStandalone) return null;
        return (
          <div style={{ background: COLORS.primaryLight, border: `1px solid #BFDBFE`, borderRadius: 14, padding: "12px 14px", marginBottom: "0.75rem", display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 24, flexShrink: 0 }}>📲</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.primary }}>Install on your phone</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>
                On iPhone: tap Share → "Add to Home Screen"
                <br />On Android: tap menu → "Add to Home Screen"
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Help & Support ── */}
      <HelpSupportSection />

      <div className="section-title">Account</div>
      <div className="card">
        <button className="btn btn-outline" style={{ width: "100%", marginBottom: 8, justifyContent: "flex-start", gap: 10 }}
          onClick={onManageSectors}>
          <Icon name="chart" size={16} /> Manage Sectors
        </button>
        <button className="btn btn-outline" style={{ width: "100%", marginBottom: 8, justifyContent: "flex-start", gap: 10 }}
          onClick={async () => {
            const result = await AuthAPI.resetPassword(user.email);
            setToast({ msg: result.ok ? (USE_FIREBASE ? "Password reset email sent! Check your inbox." : "Reset sent (local mode)") : (result.error || "Could not send reset"), type: result.ok ? "success" : "error" });
          }}>
          <Icon name="settings" size={16} /> Change Password
        </button>
        <button className="btn btn-danger" style={{ width: "100%", justifyContent: "flex-start", gap: 10 }} onClick={onLogout}>
          <Icon name="logout" size={16} /> Log Out
        </button>
      </div>

      <DeleteAccountSection user={user} onLogout={onLogout} />



      <div style={{ textAlign: "center", marginTop: "2rem", fontSize: 11, color: COLORS.textLight }}>
        Record Chief v1.0 · Built for Nigerian businesses
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onDone={() => setToast(null)} />}
    </div>
  );
}


// ===================== ONBOARDING =====================
function OnboardingScreen({ user, onDone }) {
  const [step, setStep] = useState(0);
  const steps = [
    {
      emoji: "👋",
      title: `Welcome, ${user.name.split(" ")[0]}!`,
      body: "Record Chief helps you track your business records — sales, expenses, debts and more — all in one place.",
      color: "#2563EB",
    },
    {
      emoji: "🏪",
      title: "Track Your Sales",
      body: "Record every sale, manage your inventory, and see your best-selling items at a glance.",
      color: "#059669",
    },
    {
      emoji: "🌾",
      title: "Log Farm Expenses",
      body: "Categorise spending on seeds, fertilizer, labour and more. See exactly where your money goes.",
      color: "#1B4332",
    },
    {
      emoji: "🤝",
      title: "Debt & Credit",
      body: "Never forget who owes you money or who you owe. Set due dates and track part-payments.",
      color: "#DC2626",
    },
    {
      emoji: "📊",
      title: "Your Overview",
      body: "The Overview screen shows charts, profit/loss summaries, and your business health score — always up to date.",
      color: "#7C3AED",
    },
  ];
  const s = steps[step];
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", background: `linear-gradient(145deg, ${s.color}CC, ${s.color})`, color: "#fff", transition: "background 0.4s" }}>
      <div style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: 72, marginBottom: 20, lineHeight: 1 }}>{s.emoji}</div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 12 }}>{s.title}</div>
          <div style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.7 }}>{s.body}</div>
        </div>
        {/* Step dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 28 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 4, background: i === step ? "#fff" : "rgba(255,255,255,0.35)", transition: "all 0.3s" }} />
          ))}
        </div>
        <button onClick={() => step < steps.length - 1 ? setStep(s => s+1) : onDone()} style={{
          width: "100%", padding: "15px", border: "none", borderRadius: 14,
          background: "#fff", color: s.color, fontWeight: 800, fontSize: 16,
          cursor: "pointer", fontFamily: "'Inter', sans-serif",
          boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
        }}>
          {step < steps.length - 1 ? "Next →" : "Get Started 🚀"}
        </button>
        {step > 0 && (
          <button onClick={() => setStep(s => s-1)} style={{ width: "100%", marginTop: 10, padding: "10px", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 14, background: "transparent", color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>
            ← Back
          </button>
        )}
        <button onClick={onDone} style={{ width: "100%", marginTop: 8, background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif", padding: "6px" }}>
          Skip
        </button>
      </div>
    </div>
  );
}


// ===================== OFFLINE INDICATOR =====================
function OfflineIndicator() {
  const [online, setOnline]       = useState(navigator.onLine);
  const [showOnline, setShowOnline] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const goOnline  = () => {
      setOnline(true);
      setShowOnline(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowOnline(false), 3000);
    };
    const goOffline = () => { setOnline(false); setShowOnline(false); };
    window.addEventListener("online",  goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
      clearTimeout(timerRef.current);
    };
  }, []);

  // Show nothing when online and no recent transition
  if (online && !showOnline) return null;

  return (
    <div style={{
      // Push below topbar (56px) so it never overlaps nav
      position: "fixed", top: 56, left: 0, right: 0, zIndex: 300,
      background: online ? COLORS.accent : "#1E293B",
      color: "#fff", fontSize: 13, fontWeight: 600,
      padding: "8px 16px", textAlign: "center",
      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      animation: "slideDown 0.3s ease",
    }}>
      {online
        ? "✅ Back online — syncing your data…"
        : "📵 You're offline — changes save locally"}
    </div>
  );
}


// ===================== NOTIFICATIONS SCREEN =====================
function NotificationsScreen({ user, onNavigateShop }) {
  const debtKey = `sl_debt_${user.uid}`;
  const invKey  = `sl_inv_${user.uid}`;
  const records  = (() => { try { return JSON.parse(localStorage.getItem(debtKey)) || []; } catch { return []; } })();
  const inventory = (() => { try { return JSON.parse(localStorage.getItem(invKey))  || []; } catch { return []; } })();

  const now = new Date();
  const overdue  = records.filter(r => !r.settled && !r.archived && r.dueDate && r.dueDate < TODAY());
  const dueSoon  = records.filter(r => {
    if (r.settled || r.archived || !r.dueDate) return false;
    const days = Math.ceil((new Date(r.dueDate) - now) / 86400000);
    const threshold = parseInt(r.reminderDays ?? 1);
    return days >= 0 && days <= threshold;
  });
  const outOfStock = inventory.filter(i => i.stock === 0);
  const lowStock   = inventory.filter(i => i.stock > 0 && i.stock < 5);

  const hasAny = overdue.length + dueSoon.length + outOfStock.length + lowStock.length > 0;

  const Section = ({ emoji, title, color, bg, border, items, renderItem }) => items.length === 0 ? null : (
    <div style={{ marginBottom: "1.25rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 20 }}>{emoji}</span>
        <div style={{ fontSize: 14, fontWeight: 700, color }}>{title}</div>
        <span style={{ background: color, color: "#fff", borderRadius: 20, fontSize: 11, fontWeight: 700, padding: "2px 9px", marginLeft: "auto" }}>{items.length}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 14, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12 }}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #1E293B 0%, #334155 100%)`, borderRadius: 18, padding: "18px", marginBottom: "1.25rem", color: "#fff" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
        <div style={{ fontSize: 20, fontWeight: 800 }}>Notifications</div>
        <div style={{ fontSize: 13, opacity: 0.65, marginTop: 4 }}>
          {hasAny ? `${overdue.length + dueSoon.length + outOfStock.length + lowStock.length} alerts need your attention` : "You're all caught up!"}
        </div>
      </div>

      {!hasAny && (
        <div className="empty-state">
          <div className="empty-icon">✅</div>
          <h3>All clear!</h3>
          <p>No overdue debts, no stock issues. You're on top of everything.</p>
        </div>
      )}

      {/* Overdue debts */}
      <Section
        emoji="🚨" title="Overdue Records" color={COLORS.danger} bg={COLORS.dangerLight} border="#FCA5A5"
        items={overdue}
        renderItem={r => {
          const daysOver = Math.abs(Math.ceil((new Date(r.dueDate) - now) / 86400000));
          return (
            <>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {r.type === "credit" ? "💰" : "📤"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{r.name}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
                  {r.type === "credit" ? "Owes you" : "You owe"} · Due {r.dueDate}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700, color: COLORS.danger }}>{NAIRA(r.amount)}</div>
                <div style={{ fontSize: 11, color: COLORS.danger, fontWeight: 600, marginTop: 2 }}>{daysOver}d overdue</div>
              </div>
            </>
          );
        }}
      />

      {/* Due soon */}
      <Section
        emoji="⏰" title="Due Within 7 Days" color={COLORS.amber} bg={COLORS.amberLight} border="#FCD34D"
        items={dueSoon}
        renderItem={r => {
          const days = Math.ceil((new Date(r.dueDate) - now) / 86400000);
          return (
            <>
              <div style={{ width: 42, height: 42, borderRadius: 12, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                {r.type === "credit" ? "💰" : "📤"}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{r.name}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>
                  {r.type === "credit" ? "Owes you" : "You owe"} · {NAIRA(r.amount)}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.amber }}>{days === 0 ? "Today!" : `${days}d left`}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>Due {r.dueDate}</div>
              </div>
            </>
          );
        }}
      />

      {/* Out of stock */}
      <Section
        emoji="🚫" title="Out of Stock" color={COLORS.danger} bg={COLORS.dangerLight} border="#FCA5A5"
        items={outOfStock}
        renderItem={item => (
          <>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{item.name}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{NAIRA(item.price)} per unit · 0 remaining</div>
            </div>
            <button onClick={() => onNavigateShop && onNavigateShop()} style={{ background: COLORS.danger, color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 700, flexShrink: 0, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>+ Add Stock</button>
          </>
        )}
      />

      {/* Low stock */}
      <Section
        emoji="⚠️" title="Low Stock" color={COLORS.amber} bg={COLORS.amberLight} border="#FCD34D"
        items={lowStock}
        renderItem={item => (
          <>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>📦</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{item.name}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{NAIRA(item.price)} per unit</div>
            </div>
            <button onClick={() => onNavigateShop && onNavigateShop()} style={{ background: COLORS.amber, color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 700, flexShrink: 0, border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif" }}>{item.stock} left — Restock</button>
          </>
        )}
      />
    </div>
  );
}

// ===================== MAIN APP =====================
function App() {
  const [screen, setScreen] = useState("welcome");
  const [user, setUser] = useLocalState("sl_user", null);
  const [sector, setSector] = useLocalState("sl_sector", "shop");
  const [navTab, setNavTab] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [showGlobalSearch, setShowGlobalSearch] = useState(false);
  const [showSectorSwitcher, setShowSectorSwitcher] = useState(false);
  const [darkMode, setDarkMode] = useLocalState("sl_darkmode", false);
  const [notifCount, setNotifCount] = useState(0);
  const [pin, setPin] = useLocalState("sl_pin", null);
  const [showOnboarding, setShowOnboarding] = useLocalState("sl_onboarded", false);
  const [pinUnlocked, setPinUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Real-time sync — push changes every 30s, pull latest every 15s
  useEffect(() => {
    if (!user?.uid) return;
    const uid = user.uid;

    // On login: push local then pull server
    if (navigator.onLine) {
      AuthAPI.syncToServer(uid).catch(() => {});
      setTimeout(() => AuthAPI.syncFromServer(uid).catch(() => {}), 2000);
    }

    // Push local changes every 30 seconds
    const pushInterval = setInterval(() => {
      if (navigator.onLine) AuthAPI.syncToServer(uid).catch(() => {});
    }, 30000);

    // Pull server changes every 15 seconds (real-time across devices)
    const pullInterval = setInterval(() => {
      if (navigator.onLine) AuthAPI.syncFromServer(uid).catch(() => {});
    }, 15000);

    // Sync immediately when coming back online
    const handleOnline = () => {
      setTimeout(() => {
        AuthAPI.syncToServer(uid).catch(() => {});
        setTimeout(() => AuthAPI.syncFromServer(uid).catch(() => {}), 1500);
      }, 500);
    };
    window.addEventListener("online", handleOnline);

    return () => {
      clearInterval(pushInterval);
      clearInterval(pullInterval);
      window.removeEventListener("online", handleOnline);
    };
  }, [user?.uid]);

  // Register push notification subscription
  useEffect(() => {
    if (!user?.uid) return;
    const registerPush = async () => {
      try {
        if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
        const reg = await navigator.serviceWorker.ready;
        const existing = await reg.pushManager.getSubscription();
        if (existing) return; // already subscribed
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') return;
        const sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BII1mr0E_AuVpmeYLMkh56uNYL85STG9nB5AqbkSNQVvZZrkEjzWcadHQaJpYGa7CgoSuvCtNVT5aCvjnkNBYLU',
        });
        const token = localStorage.getItem('rc_token');
        if (!token) return;
        await fetch(`${API_URL}/api/push/subscribe`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ subscription: sub }),
        });
        console.log('✅ Push notifications enabled');
      } catch(e) {
        console.log('Push setup skipped:', e.message);
      }
    };
    // Ask after 3 seconds so it doesn't feel intrusive on login
    const timer = setTimeout(registerPush, 3000);
    return () => clearTimeout(timer);
  }, [user?.uid]);

  // Real-time notification count — polls every 3 seconds
  useEffect(() => {
    const compute = () => {
      if (!user?.uid) return;
      const recs = (() => { try { return JSON.parse(localStorage.getItem(`sl_debt_${user.uid}`)) || []; } catch { return []; } })();
      const inv  = (() => { try { return JSON.parse(localStorage.getItem(`sl_inv_${user.uid}`))  || []; } catch { return []; } })();
      const debtAlerts = recs.filter(r => {
        if (r.settled || r.archived || !r.dueDate) return false;
        const days = Math.ceil((new Date(r.dueDate) - new Date()) / 86400000);
        return days >= 0 && days <= parseInt(r.reminderDays ?? 1);
      }).length + recs.filter(r => !r.settled && !r.archived && r.dueDate && r.dueDate < new Date().toISOString().split("T")[0]).length;
      const stockAlerts = inv.filter(i => i.stock === 0 || i.stock < 5).length;
      setNotifCount(debtAlerts + stockAlerts);
    };
    compute();
    const timer = setInterval(compute, 3000);
    return () => clearInterval(timer);
  }, [user?.uid]);

  // Close sector switcher when navigating away
  useEffect(() => { setShowSectorSwitcher(false); }, [navTab]);

  useEffect(() => {
    // Mobile PWA hints
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    meta.content = "width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no";

    // Theme colour for browser chrome
    let themeColor = document.querySelector('meta[name="theme-color"]');
    if (!themeColor) {
      themeColor = document.createElement("meta");
      themeColor.name = "theme-color";
      document.head.appendChild(themeColor);
    }
    themeColor.content = darkMode ? "#0F172A" : "#2563EB";

    // PWA capable
    let appleCapable = document.querySelector('meta[name="apple-mobile-web-app-capable"]');
    if (!appleCapable) {
      appleCapable = document.createElement("meta");
      appleCapable.name = "apple-mobile-web-app-capable";
      appleCapable.content = "yes";
      document.head.appendChild(appleCapable);
    }
    let appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    if (!appleTitle) {
      appleTitle = document.createElement("meta");
      appleTitle.name = "apple-mobile-web-app-title";
      appleTitle.content = "Record Chief";
      document.head.appendChild(appleTitle);
    }
    document.title = "Record Chief";
  }, [darkMode]);
  const avatarKey = user ? `sl_avatar_${user.uid}` : null;
  const [avatar] = useLocalState(avatarKey || "sl_avatar_none", null);

  useEffect(() => {
    // Check for invite token in URL
    const params = new URLSearchParams(window.location.search);
    const inviteToken = params.get("invite");
    if (inviteToken) {
      localStorage.setItem("rc_pending_invite", inviteToken);
      // Clean URL
      window.history.replaceState({}, "", "/");
    }

    if (user) {
      setScreen("app");
      // If there's a pending invite, accept it now
      const pendingInvite = localStorage.getItem("rc_pending_invite");
      if (pendingInvite) {
        const jwt = localStorage.getItem("rc_token");
        if (jwt) {
          fetch(`${API_URL}/api/invite/accept`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${jwt}` },
            body: JSON.stringify({ token: pendingInvite }),
          }).then(r => r.json()).then(data => {
            if (data.message) {
              localStorage.removeItem("rc_pending_invite");
              alert("You now have access to the business records!");
              // Sync owner's data to localStorage
              if (data.ownerData) {
                const uid = user.uid || user._id;
                // Will be handled by next syncFromServer call
              }
            }
          }).catch(() => {});
        }
      }
    } else {
      // Try to restore session from cache (works offline)
      const token   = localStorage.getItem("rc_token");
      const session = localStorage.getItem("rc_session");
      if (token && session) {
        try {
          const cached = JSON.parse(session);
          // Verify token hasn't expired (JWT exp is in seconds)
          const payload = JSON.parse(atob(token.split('.')[1]));
          if (payload.exp * 1000 > Date.now()) {
            setUser(cached);
            setScreen("app");
            // Silently try to refresh from server
            fetch(`${API_URL}/api/auth/me`, {
              headers: { Authorization: `Bearer ${token}` }
            }).then(r => r.ok ? r.json() : null)
              .then(data => {
                if (data?.user) {
                  const fresh = { ...data.user, uid: data.user._id };
                  setUser(fresh);
                  localStorage.setItem("rc_session", JSON.stringify(fresh));
                }
              }).catch(() => {});
            return;
          }
        } catch(e) {}
      }
      setScreen("welcome");
    }
  }, []);

  const [showPinSetup, setShowPinSetup] = useState(false);

  const handleAuth = (u, sectors, isNewSignup = false) => {
    const fullUser = { ...u, sectors: sectors || u.sectors || ["shop"] };
    setUser(fullUser);
    localStorage.setItem("rc_session", JSON.stringify(fullUser));
    if (sectors && sectors.length > 0) setSector(sectors[0]);
    setScreen("app");
    setNavTab("home");
    if (!showOnboarding) { setShowOnboarding(false); }
    // Prompt PIN setup for new signups (if no PIN already set)
    if (isNewSignup && !localStorage.getItem("sl_pin")) {
      setTimeout(() => setShowPinSetup(true), 1200);
    }
    // Pull latest data from server — also refresh profile to get latest sectors
    const token = localStorage.getItem("rc_token");
    if (token) {
      fetch(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.ok ? r.json() : null)
        .then(data => {
          if (data?.user) {
            const fresh = { ...data.user, uid: data.user._id };
            setUser(fresh);
            localStorage.setItem("rc_session", JSON.stringify(fresh));
          }
        }).catch(() => {});
    }
    AuthAPI.syncFromServer(fullUser.uid || fullUser._id).catch(() => {});
  };

  const handleLogout = async () => {
    await AuthAPI.signOut();
    setUser(null);
    setScreen("welcome");
  };

  const handleManageSectors = () => setNavTab("manageSectors");

  const handleSaveSectors = async (newSectors) => {
    const updated = { ...user, sectors: newSectors };
    setUser(updated);
    // Update cached session so sectors persist offline
    localStorage.setItem("rc_session", JSON.stringify(updated));
    // if current active sector was removed, switch to first available
    if (!newSectors.includes(sector)) setSector(newSectors[0]);
    setNavTab("home");
    // Save sectors to backend so they persist after logout/login
    const token = localStorage.getItem("rc_token");
    if (token) {
      try {
        await fetch(`${API_URL}/api/auth/profile`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ sectors: newSectors }),
        });
      } catch(e) { /* silent — localStorage is already updated */ }
    }
  };

  if (screen === "welcome") return (<><style>{css}</style><WelcomeScreen onNavigate={setScreen} /></>);
  if (screen === "signup") return (<><style>{css}</style><SignupScreen onAuth={handleAuth} onNavigate={setScreen} /></>);
  if (screen === "login") return (<><style>{css}</style><LoginScreen onAuth={handleAuth} onNavigate={setScreen} /></>);

  // PIN setup prompt for new signups
  if (showPinSetup) return (
    <><style>{css}</style>
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,23,42,0.7)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: COLORS.surface, borderRadius: 24, padding: 28, width: "100%", maxWidth: 360, textAlign: "center", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🔒</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.text, marginBottom: 8 }}>Set a PIN lock?</div>
        <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 24, lineHeight: 1.6 }}>
          Protect your business records with a 4-digit PIN. You can always set or change this later in Profile.
        </div>
        <button className="btn btn-primary" style={{ marginBottom: 10 }} onClick={() => { setShowPinSetup(false); setNavTab("profile"); }}>
          🔐 Set PIN Now
        </button>
        <button onClick={() => setShowPinSetup(false)} style={{ width: "100%", background: "none", border: "none", color: COLORS.textMuted, fontSize: 13, cursor: "pointer", fontFamily: "'Inter', sans-serif", padding: 8 }}>
          Skip for now
        </button>
      </div>
    </div>
    </>
  );

  // PIN lock screen
  if (pin && !pinUnlocked) return (
    <>
      <style>{css}</style>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(145deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%)", padding: "2rem" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Record Chief</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 32 }}>Enter your PIN to continue</div>
        <div style={{ background: "#fff", borderRadius: 20, padding: "28px 24px", width: "100%", maxWidth: 320, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 20 }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{ width: 14, height: 14, borderRadius: "50%", background: pinInput.length > i ? COLORS.primary : COLORS.bg, border: `2px solid ${pinInput.length > i ? COLORS.primary : COLORS.border}`, transition: "all 0.15s" }} />
            ))}
          </div>
          {pinError && <div style={{ textAlign: "center", fontSize: 12, color: COLORS.danger, marginBottom: 12, fontWeight: 600 }}>{pinError}</div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((d, i) => (
              <button key={i} disabled={d === ""} onClick={() => {
                if (d === "⌫") { setPinInput(p => p.slice(0,-1)); setPinError(""); return; }
                const next = pinInput + d;
                setPinInput(next);
                if (next.length === 4) {
                  if (next === pin) { setPinUnlocked(true); setPinInput(""); setPinError(""); }
                  else { setPinError("Incorrect PIN"); setPinInput(""); }
                }
              }} style={{
                padding: "16px", borderRadius: 12, border: `1px solid ${COLORS.border}`,
                background: d === "" ? "transparent" : COLORS.bg, fontSize: d === "⌫" ? 18 : 20,
                fontWeight: 700, cursor: d === "" ? "default" : "pointer",
                fontFamily: "'Inter', sans-serif", color: COLORS.text,
                transition: "background 0.1s",
              }}>{d}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  const sectorMeta = ALL_SECTORS.find(s => s.id === sector) || ALL_SECTORS[0];
  const sectorLabel = `${sectorMeta.icon} ${sectorMeta.id === "sales" ? "Sales" : sectorMeta.id === "shop" ? "Shop" : "Farm"}`;

  const userSectors = (user.sectors && user.sectors.length > 0) ? user.sectors : ["shop"];
  const activeSectors = ALL_SECTORS.filter(s => userSectors.includes(s.id));
  const initials = user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const breadcrumb = navTab === "home" ? "Home"
    : navTab === "history" ? "Overview"
    : navTab === "profile" ? "Profile"
    : navTab === "manageSectors" ? "Manage Sectors"
    : navTab === "debtcredit" ? "🤝 Debt & Credit"
    : navTab === "notifications" ? "🔔 Notifications"
    : sectorLabel;

  // Onboarding — show once after first login
  if (!showOnboarding && user) return (
    <>
      <style>{css}</style>
      <OnboardingScreen user={user} onDone={() => setShowOnboarding(true)} />
    </>
  );

  // Sidebar active accent — matches each section's theme colour
  const sidebarAccent = (() => {
    if (navTab === "sector") {
      if (sector === "farm")  return { border: "#40916C", bg: "rgba(29,111,66,0.25)" };
      if (sector === "shop")  return { border: "#60A5FA", bg: "rgba(37,99,235,0.25)" };
      if (sector === "sales") return { border: "#A78BFA", bg: "rgba(124,58,237,0.25)" };
    }
    if (navTab === "debtcredit") return { border: "#86C99A", bg: "rgba(29,111,66,0.20)" };
    if (navTab === "history")    return { border: "#34D399", bg: "rgba(5,150,105,0.18)" };
    // home, profile, manageSectors — default blue
    return { border: "#60A5FA", bg: "rgba(37,99,235,0.25)" };
  })();

  const activeNavStyle = {
    background: sidebarAccent.bg,
    borderLeft: `3px solid ${sidebarAccent.border}`,
    borderRadius: "0 8px 8px 0",
    color: "#fff",
    fontWeight: 600,
    paddingLeft: 11,
  };

  return (
    <>
      <style>{css}</style>
      <OfflineIndicator />
      <div className="app">

        {/* ── SIDEBAR ── */}
        <div className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
          <div className="sidebar-header">
            <span className="sidebar-logo">Record Chief</span>
            <button className="sidebar-toggle" onClick={() => setSidebarOpen(o => !o)} title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}>
              {sidebarOpen
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              }
            </button>
          </div>
          <div className="sidebar-tagline">Your business records, organized</div>

          <div className="sidebar-section">Menu</div>
          <button className="nav-tab" onClick={() => { setNavTab("home"); setSidebarOpen(false); }} title="Home" style={navTab === "home" ? activeNavStyle : {}}>
            <Icon name="home" size={16} /><span className="nav-label">Home</span>
          </button>
          <button className="nav-tab" onClick={() => { setNavTab("history"); setSidebarOpen(false); }} title="Overview" style={navTab === "history" ? activeNavStyle : {}}>
            <Icon name="history" size={16} /><span className="nav-label">Overview</span>
          </button>

          {activeSectors.length > 0 && <div className="sidebar-section">Sectors</div>}
          {activeSectors.map(s => {
            const isSectorActive = navTab === "sector" && sector === s.id;
            const sAccent = s.id === "farm"
              ? { border: "#40916C", bg: "rgba(29,111,66,0.25)" }
              : s.id === "shop"
              ? { border: "#60A5FA", bg: "rgba(37,99,235,0.25)" }
              : { border: "#A78BFA", bg: "rgba(124,58,237,0.25)" };
            return (
              <button key={s.id}
                className="nav-tab"
                title={s.id === "sales" ? "Sales Rep" : s.id === "shop" ? "Shop Sales" : "Farm Expenses"}
                onClick={() => { setSector(s.id); setNavTab("sector"); setSidebarOpen(false); }}
                style={isSectorActive ? { background: sAccent.bg, borderLeft: `3px solid ${sAccent.border}`, borderRadius: "0 8px 8px 0", color: "#fff", fontWeight: 600, paddingLeft: 11 } : {}}>
                <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>{s.icon}</span>
                <span className="nav-label">{s.id === "sales" ? "Sales Rep" : s.id === "shop" ? "Shop Sales" : "Farm Expenses"}</span>
              </button>
            );
          })}
          {(() => {
            const debtKey = `sl_debt_${user?.uid}`;
            const debtRecs = (() => { try { return JSON.parse(localStorage.getItem(debtKey)) || []; } catch { return []; } })();
            const overdueN = debtRecs.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
            return (
              <button className="nav-tab"
                title="Debt & Credit"
                onClick={() => { setNavTab("debtcredit"); setSidebarOpen(false); }}
                style={{ position: "relative", ...(navTab === "debtcredit" ? { background: "rgba(29,111,66,0.22)", borderLeft: "3px solid #86C99A", borderRadius: "0 8px 8px 0", color: "#fff", fontWeight: 600, paddingLeft: 11 } : {}) }}>
                <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>🤝</span>
                <span className="nav-label">Debt & Credit</span>
                {overdueN > 0 && (
                  <span style={{ position: "absolute", top: 8, right: sidebarOpen ? 14 : 6, width: 16, height: 16, borderRadius: "50%", background: COLORS.danger, color: "#fff", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {overdueN > 9 ? "9+" : overdueN}
                  </span>
                )}
              </button>
            );
          })()}
          <button className="nav-tab" style={{ fontSize: 11, opacity: 0.6 }} onClick={() => { handleManageSectors(); setSidebarOpen(false); }} title="Manage sectors">
            <Icon name="settings" size={14} /><span className="nav-label">Manage sectors</span>
          </button>

          <div className="sidebar-bottom">
            <div className="sidebar-user" onClick={() => { setNavTab("profile"); setSidebarOpen(false); }} title={user?.name}>
              <div className="sidebar-avatar">{avatar ? <img src={avatar} alt="" /> : initials}</div>
              <div className="sidebar-userinfo">
                <div className="sidebar-username">{user?.name}</div>
                <div className="sidebar-email">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="main-wrap">
          <div className="topbar">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setSidebarOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: COLORS.textMuted, padding: 4, borderRadius: 6 }} className="desktop-only" title="Toggle sidebar">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
              </button>

              {/* Breadcrumb:
                  - On sector screen → clickable pill (icon + name + chevron) that opens sector switcher
                  - On all other screens → plain text breadcrumb only
              */}
              {navTab === "sector" ? (
                <button
                  onClick={() => activeSectors.length > 1 && setShowSectorSwitcher(v => !v)}
                  title={activeSectors.length > 1 ? "Switch sector" : undefined}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: showSectorSwitcher ? COLORS.primaryLight : COLORS.bg,
                    border: `1.5px solid ${showSectorSwitcher ? COLORS.primary : COLORS.border}`,
                    borderRadius: 10, padding: "5px 10px 5px 8px",
                    cursor: activeSectors.length > 1 ? "pointer" : "default",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 700, fontSize: 15,
                    color: showSectorSwitcher ? COLORS.primary : COLORS.text,
                    transition: "all 0.15s", flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{activeSectors.find(s => s.id === sector)?.icon || "🏪"}</span>
                  <span style={{ maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{breadcrumb}</span>
                  {activeSectors.length > 1 && (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                      style={{ transition: "transform 0.2s", transform: showSectorSwitcher ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  )}
                </button>
              ) : (
                <span className="topbar-breadcrumb">{breadcrumb}</span>
              )}

              {/* Sector switcher dropdown — sectors only */}
              {showSectorSwitcher && (
                <div style={{
                  position: "absolute", top: 56, left: 16, zIndex: 400,
                  background: "#fff", borderRadius: 16, padding: 8,
                  boxShadow: "0 8px 32px rgba(15,23,42,0.18)", border: `1px solid ${COLORS.border}`,
                  minWidth: 200, animation: "scaleIn 0.15s ease",
                }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 8px 8px" }}>Switch Sector</div>
                  {activeSectors.map(s => {
                    const isActive = sector === s.id;
                    return (
                      <button key={s.id} onClick={() => { setSector(s.id); setNavTab("sector"); setShowSectorSwitcher(false); }} style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 10px", borderRadius: 10, border: "none", cursor: "pointer",
                        background: isActive ? COLORS.primaryLight : "transparent",
                        fontFamily: "'Inter', sans-serif", textAlign: "left", transition: "background 0.12s",
                      }}
                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = COLORS.bg; }}
                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}>
                        <span style={{ fontSize: 20, width: 36, height: 36, background: s.color, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, color: isActive ? COLORS.primary : COLORS.text }}>{s.label}</div>
                          <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>{s.desc}</div>
                        </div>
                        {isActive && <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={COLORS.primary} strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Backdrop to close dropdown */}
              {showSectorSwitcher && (
                <div style={{ position: "fixed", inset: 0, zIndex: 399 }} onClick={() => setShowSectorSwitcher(false)} />
              )}
            </div>
            <div className="topbar-right">
              {/* Notification bell — reactive real-time */}
              <button onClick={() => setNavTab("notifications")} title="Notifications" style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: notifCount > 0 ? COLORS.danger : COLORS.textMuted, padding: 6, borderRadius: 8, position: "relative", fontSize: 17 }}>
                🔔
                {notifCount > 0 && (
                  <span style={{ position: "absolute", top: 2, right: 2, width: 14, height: 14, borderRadius: "50%", background: COLORS.danger, color: "#fff", fontSize: 8, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{notifCount > 9 ? "9+" : notifCount}</span>
                )}
              </button>
              {/* Dark mode toggle */}
              <button onClick={() => setDarkMode(d => !d)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: COLORS.textMuted, padding: 6, borderRadius: 8, fontSize: 16, transition: "background 0.15s" }}
                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
                {darkMode ? "☀️" : "🌙"}
              </button>
              {/* Global search button */}
              <button onClick={() => setShowGlobalSearch(true)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: COLORS.textMuted, padding: 6, borderRadius: 8, transition: "background 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
                title="Search everything">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
              </button>
              {/* Avatar dropdown */}
              {(() => {
                const [showProfileMenu, setShowProfileMenu] = React.useState(false);
                return (
                  <div style={{ position: "relative" }}>
                    <div className="avatar" onClick={() => setShowProfileMenu(v => !v)}
                      style={{ overflow: "hidden", cursor: "pointer" }}>
                      {avatar ? <img src={avatar} alt="" style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%" }} /> : initials}
                    </div>
                    {showProfileMenu && (
                      <>
                        <div style={{ position: "fixed", inset: 0, zIndex: 398 }} onClick={() => setShowProfileMenu(false)} />
                        <div style={{
                          position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 399,
                          background: COLORS.surface, borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
                          border: `1px solid ${COLORS.border}`, minWidth: 160, overflow: "hidden",
                          animation: "scaleIn 0.15s ease",
                        }}>
                          <div style={{ padding: "10px 14px", borderBottom: `1px solid ${COLORS.border}` }}>
                            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text }}>{user?.name}</div>
                            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{user?.email}</div>
                          </div>
                          <button onClick={() => { setNavTab("profile"); setShowProfileMenu(false); }} style={{
                            width: "100%", padding: "11px 14px", background: "none", border: "none",
                            cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                            fontSize: 13, fontWeight: 600, color: COLORS.text, fontFamily: "'Inter', sans-serif",
                            textAlign: "left",
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}>
                            👤 Profile
                          </button>
                          <button onClick={async () => { setShowProfileMenu(false); await AuthAPI.signOut(); setUser(null); setScreen("welcome"); }} style={{
                            width: "100%", padding: "11px 14px", background: "none", border: "none",
                            cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                            fontSize: 13, fontWeight: 600, color: COLORS.danger, fontFamily: "'Inter', sans-serif",
                            textAlign: "left", borderTop: `1px solid ${COLORS.border}`,
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = COLORS.dangerLight}
                          onMouseLeave={e => e.currentTarget.style.background = "none"}>
                            🚪 Log Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* ── Global Search Overlay ── */}
          {showGlobalSearch && (
            <div style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(15,23,42,0.6)", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "4rem" }}
              onClick={() => { setShowGlobalSearch(false); setGlobalSearch(""); }}>
              <div style={{ width: "calc(100% - 32px)", maxWidth: 520, background: "#fff", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.3)", overflow: "hidden", animation: "scaleIn 0.18s ease" }}
                onClick={e => e.stopPropagation()}>
                <div style={{ display: "flex", alignItems: "center", padding: "12px 16px", borderBottom: `1px solid ${COLORS.border}`, gap: 10 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></svg>
                  <input
                    autoFocus
                    style={{ flex: 1, border: "none", outline: "none", fontSize: 16, fontFamily: "'Inter', sans-serif", color: COLORS.text, background: "transparent" }}
                    placeholder="Search records, sales, expenses…"
                    value={globalSearch}
                    onChange={e => setGlobalSearch(e.target.value)}
                  />
                  {globalSearch && <button onClick={() => setGlobalSearch("")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.textMuted, fontSize: 18 }}>✕</button>}
                  <button onClick={() => { setShowGlobalSearch(false); setGlobalSearch(""); }} style={{ background: COLORS.bg, border: "none", cursor: "pointer", color: COLORS.textMuted, fontSize: 11, fontWeight: 600, borderRadius: 6, padding: "4px 8px", fontFamily: "'Inter', sans-serif" }}>ESC</button>
                </div>
                {(() => {
                  if (!globalSearch.trim()) return (
                    <div style={{ padding: "1.5rem", textAlign: "center", color: COLORS.textMuted, fontSize: 13 }}>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>
                      Type to search across all your records
                    </div>
                  );
                  const q = globalSearch.toLowerCase();
                  const shopData = (() => { try { return JSON.parse(localStorage.getItem(`sl_shopsales_${user?.uid}`)) || []; } catch { return []; } })();
                  const farmData = (() => { try { return JSON.parse(localStorage.getItem(`sl_farm_${user?.uid}`)) || []; } catch { return []; } })();
                  const debtData = (() => { try { return JSON.parse(localStorage.getItem(`sl_debt_${user?.uid}`)) || []; } catch { return []; } })();
                  const results = [
                    ...shopData.filter(s => s.itemName?.toLowerCase().includes(q)).map(s => ({ icon: "🛍️", label: s.itemName, sub: `Shop · ${s.date} · ${NAIRA(s.total)}`, nav: () => { setNavTab("sector"); setSector("shop"); setShowGlobalSearch(false); setGlobalSearch(""); } })),
                    ...farmData.filter(e => e.desc?.toLowerCase().includes(q)).map(e => ({ icon: "🌾", label: e.desc, sub: `Farm · ${e.date} · ${NAIRA(e.amount)}`, nav: () => { setNavTab("sector"); setSector("farm"); setShowGlobalSearch(false); setGlobalSearch(""); } })),
                    ...debtData.filter(r => r.name?.toLowerCase().includes(q) || r.note?.toLowerCase().includes(q)).map(r => ({ icon: r.type === "credit" ? "💰" : "📤", label: r.name, sub: `${r.type === "credit" ? "Credit" : "Debt"} · ${r.date} · ${NAIRA(r.amount)}`, nav: () => { setNavTab("debtcredit"); setShowGlobalSearch(false); setGlobalSearch(""); } })),
                  ].slice(0, 10);
                  return results.length === 0 ? (
                    <div style={{ padding: "1.5rem", textAlign: "center", color: COLORS.textMuted, fontSize: 13 }}>No results for "<strong>{globalSearch}</strong>"</div>
                  ) : (
                    <div style={{ maxHeight: 320, overflowY: "auto" }}>
                      {results.map((r, i) => (
                        <div key={i} onClick={r.nav} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", cursor: "pointer", borderBottom: `0.5px solid ${COLORS.border}`, transition: "background 0.1s" }}
                          onMouseEnter={e => e.currentTarget.style.background = COLORS.bg}
                          onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                          <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{r.icon}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.label}</div>
                            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 1 }}>{r.sub}</div>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.textLight} strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
          <div className="main">
            {navTab === "home" && <HomeScreen user={user} sector={sector} onSetSector={(s) => { setSector(s); setNavTab("sector"); }} onManageSectors={handleManageSectors} onViewOverview={() => setNavTab("history")} onViewDebt={() => setNavTab("debtcredit")} />}
            {navTab === "sector" && sector === "sales" && <SalesRepScreen user={user} />}
            {navTab === "sector" && sector === "shop" && <ShopScreen user={user} />}
            {navTab === "sector" && sector === "farm" && <FarmScreen user={user} />}
            {navTab === "history" && <HistoryScreen user={user} />}
            {navTab === "debtcredit" && <DebtCreditScreen user={user} />}
            {navTab === "notifications" && <NotificationsScreen user={user} onNavigateShop={() => { setSector("shop"); setNavTab("sector"); localStorage.setItem("rc_open_inventory", "1"); }} />}
            {navTab === "profile" && <ProfileScreen user={user} onLogout={handleLogout} onManageSectors={handleManageSectors} />}
            {navTab === "manageSectors" && <ManageSectorsScreen user={user} onSave={handleSaveSectors} onBack={() => setNavTab("home")} />}
          </div>
        </div>

        {/* ── Mobile Bottom Tab Bar ── */}
        {(() => {
          const debtKey = `sl_debt_${user?.uid}`;
          const debtRecs = (() => { try { return JSON.parse(localStorage.getItem(debtKey)) || []; } catch { return []; } })();
          const overdueN = debtRecs.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
          const firstSector = activeSectors[0];
          const activeSectorAccent = sector === "farm" ? "#40916C" : sector === "sales" ? "#A78BFA" : "#60A5FA";
          const tabs = [
            { id: "home",       icon: "🏠", label: "Home",     accent: "#60A5FA" },
            { id: "sector",     icon: activeSectors.find(s => s.id === sector)?.icon || "🏪", label: "Sector", accent: activeSectorAccent },
            { id: "debtcredit", icon: "🤝", label: "Debts",    accent: "#86C99A", badge: overdueN },
            { id: "history",    icon: "📊", label: "Overview", accent: "#34D399" },
            { id: "profile",    icon: "👤", label: "Profile",  accent: "#60A5FA" },
          ];
          return (
            <div className="bottom-tab-bar">
              {tabs.map(t => {
                const isActive = navTab === t.id;
                return (
                  <button
                    key={t.id}
                    className={`bottom-tab-item${isActive ? " active" : ""}`}
                    onClick={() => {
                      if (t.id === "sector" && activeSectors.length > 0) {
                        setSector(activeSectors.find(s => s.id === sector)?.id || activeSectors[0].id);
                      }
                      setNavTab(t.id);
                      setSidebarOpen(false);
                    }}>
                    {isActive && <div className="btab-bar" style={{ background: t.accent }} />}
                    {t.badge > 0 && <div className="btab-dot" />}
                    <span className="btab-icon">{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          );
        })()}

      </div>
    </>
  );
}

const __root = ReactDOM.createRoot(document.getElementById("root"));
__root.render(React.createElement(App));
