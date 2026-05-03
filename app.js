import React, { useState, useEffect, useCallback, useRef } from "react";
const CURRENCIES = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
  GHS: "₵",
  KES: "KSh",
  ZAR: "R"
};
const getCurrency = () => localStorage.getItem("sl_currency") || "NGN";
const getCurrencySymbol = () => CURRENCIES[getCurrency()] || "₦";
// Polyfill Promise.allSettled for Android 6 Chrome
if (typeof Promise.allSettled !== 'function') {
  Promise.allSettled = promises => Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
    status: 'fulfilled',
    value
  }), reason => ({
    status: 'rejected',
    reason
  }))));
}
const NAIRA = n => `${getCurrencySymbol()}${Number(n || 0).toLocaleString("en-NG", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})}`;
const TODAY = () => new Date().toISOString().split("T")[0];
const TS = () => new Date().toISOString();
const uid = () => Math.random().toString(36).slice(2, 10);

// Dynamic colors   these are the CSS var equivalents for JSX inline styles
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
  amberLight: "var(--amber-light)"
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
  purpleLight: "#F5F3FF"
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
    --surface2: #1E2640;
    --text: #F1F5F9;
    --text-muted: #94A3B8;
    --text-light: #4B5563;
    --border: rgba(255,255,255,0.09);
    --primary: #3B82F6;
    --primary-dark: #2563EB;
    --primary-light: #1E3A5F;
    --accent: #10B981;
    --accent-light: #0A2E20;
    --danger: #F87171;
    --danger-light: #2D1515;
    --amber: #FBBF24;
    --amber-light: #2D2209;
    --purple: #A78BFA;
    --purple-light: #1E1535;
    --card-shadow: 0 1px 3px rgba(0,0,0,0.4);
  }
  body { font-family: 'Inter', sans-serif; background: var(--bg); color: var(--text); transition: background 0.2s, color 0.2s; -webkit-text-size-adjust: 100%; }
  /* Android 6 touch feedback */
  * { -webkit-tap-highlight-color: transparent; }
  input, textarea, select { -webkit-appearance: none; }
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
  [data-theme="dark"] .topbar { background: #0E1525; border-bottom-color: rgba(255,255,255,0.07); }
  .topbar-breadcrumb { font-size: 14px; font-weight: 600; color: var(--text); }
  .topbar-right { display: flex; gap: 8px; align-items: center; }
  .avatar { width: 30px; height: 30px; border-radius: 50%; background: var(--primary-light); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: var(--primary); cursor: pointer; }

  .main { flex: 1; padding: 1.25rem; overflow-y: auto; background: var(--bg); }
  [data-theme="dark"] .main { background: #0A0F1E; }

  .card { background: var(--surface); border-radius: 16px; border: 1px solid var(--border); padding: 1rem 1.1rem; margin-bottom: 0.75rem; box-shadow: var(--card-shadow, 0 1px 3px rgba(15,23,42,0.04)); }
  [data-theme="dark"] .card { border-color: rgba(255,255,255,0.07); }
  [data-theme="dark"] .card-sm { border-color: rgba(255,255,255,0.06); }
  .card-sm { background: var(--surface); border-radius: 10px; border: 0.5px solid var(--border); padding: 0.75rem 0.9rem; margin-bottom: 0.6rem; }

  .stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 1rem; }
  .stat-card { background: var(--surface); border-radius: 12px; border: 0.5px solid var(--border); padding: 0.85rem 1rem; }
  .stat-label { font-size: 11px; color: var(--text-muted); margin-bottom: 4px; }
  .stat-value { font-size: 20px; font-weight: 600; font-family: 'Space Mono', monospace; color: var(--text); }
  .stat-sub { font-size: 10px; color: var(--text-light); margin-top: 2px; }

  .section-title { font-size: 13px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; margin: 1.25rem 0 0.6rem; }

  .form-group { margin-bottom: 0.85rem; }
  .form-label { font-size: 12px; font-weight: 500; color: var(--text-muted); margin-bottom: 4px; display: block; }
  .form-input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg); font-size: 14px; color: var(--text); outline: none; font-family: 'Inter', sans-serif; transition: border-color 0.2s; }
  [data-theme="dark"] .form-input { background: #0F1629; border-color: rgba(255,255,255,0.12); color: #F1F5F9; }
  [data-theme="dark"] .form-input:focus { border-color: var(--primary); background: #161D31; }
  [data-theme="dark"] .form-input::placeholder { color: rgba(255,255,255,0.25); }
  @media (max-width: 640px) { .form-input, .search-bar, input, select, textarea { font-size: 16px !important; } }
  .form-input:focus { border-color: var(--primary); background: var(--surface); }
  .form-input.error { border-color: var(--danger); }
  .form-error { font-size: 11px; color: var(--danger); margin-top: 3px; }

  .btn { border: none; border-radius: 9px; padding: 11px 20px; font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif; transition: all 0.15s; display: inline-flex; align-items: center; gap: 6px; justify-content: center; }
  .btn-primary { background: linear-gradient(135deg, var(--primary), var(--primary-dark, #1D4ED8)); color: #fff; width: 100%; box-shadow: 0 2px 8px rgba(37,99,235,0.2); }
  .btn-primary:hover { background: linear-gradient(135deg, var(--primary), #1E3A8A); box-shadow: 0 4px 12px rgba(37,99,235,0.3); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-outline { background: transparent; border: 1px solid var(--border); color: var(--text); }
  .btn-outline:hover { background: var(--bg); }
  .btn-danger { background: var(--danger-light); color: var(--danger); border: none; }
  .btn-success { background: var(--accent-light); color: var(--accent); border: none; }
  .btn-sm { padding: 6px 12px; font-size: 12px; border-radius: 7px; }

  .pill { display: inline-flex; align-items: center; border-radius: 20px; padding: 3px 10px; font-size: 11px; font-weight: 500; }
  .pill-green { background: var(--accent-light); color: var(--accent); }
  .pill-amber { background: var(--amber-light); color: var(--amber); }
  .pill-red { background: var(--danger-light); color: var(--danger); }
  .pill-blue { background: var(--primary-light); color: var(--primary); }

  .entry-row { display: flex; align-items: flex-start; gap: 10px; padding: 12px 0; border-bottom: 0.5px solid var(--border); }
  .entry-row:last-child { border-bottom: none; }
  .entry-dot { width: 8px; height: 8px; border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
  .entry-content { flex: 1; min-width: 0; }
  .entry-title { font-size: 14px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .entry-sub { font-size: 12px; color: var(--text-muted); margin-top: 2px; }
  .entry-amount { font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: var(--text); flex-shrink: 0; }

  .search-bar { width: 100%; padding: 10px 36px 10px 38px; border-radius: 12px; border: 1.5px solid var(--border); background: var(--surface); font-size: 13px; font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s, box-shadow 0.2s; color: var(--text); }
  [data-theme="dark"] .search-bar { background: #0F1629; border-color: rgba(255,255,255,0.1); color: #F1F5F9; }
  [data-theme="dark"] .search-bar::placeholder { color: rgba(255,255,255,0.25); }
  [data-theme="dark"] .search-bar:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
  .search-bar:focus { border-color: var(--primary); box-shadow: 0 0 0 3px var(--primary-light); }
  .search-wrap { position: relative; margin-bottom: 0.75rem; }
  .search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text-light); }

  .tab-bar { display: flex; background: var(--bg); border-radius: 10px; padding: 3px; margin-bottom: 1rem; }
  [data-theme="dark"] .tab-bar { background: #0F1629; }
  [data-theme="dark"] .tab-btn.active { background: var(--surface); box-shadow: 0 1px 3px rgba(0,0,0,0.4); }
  .tab-btn { flex: 1; border: none; background: none; padding: 7px; font-size: 12px; font-weight: 500; border-radius: 8px; color: var(--text-muted); font-family: 'Inter', sans-serif; transition: all 0.15s; }
  .tab-btn.active { background: var(--surface); color: var(--primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }

  .sector-card { background: var(--surface); border-radius: 16px; border: 2px solid transparent; padding: 1.25rem; margin-bottom: 0.75rem; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 14px; }
  .sector-card:hover { border-color: var(--primary); }
  .sector-card.active { border-color: var(--primary); background: var(--primary-light); }
  .sector-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .sector-info h3 { font-size: 15px; font-weight: 600; }
  .sector-info p { font-size: 12px; color: var(--text-muted); margin-top: 3px; }

  .welcome-screen { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; background: linear-gradient(145deg, #1E3A8A 0%, #1D4ED8 40%, #2563EB 70%, #0F766E 100%); color: #fff; }
  .welcome-logo { font-family: 'Space Mono', monospace; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
  .welcome-tagline { font-size: 14px; opacity: 0.75; text-align: center; margin-bottom: 3rem; max-width: 260px; }
  .welcome-art { font-size: 72px; margin-bottom: 2rem; }

  .auth-card { background: #fff; border-radius: 20px; padding: 1.75rem; width: 100%; max-width: 360px; }
  .auth-title { font-size: 20px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
  .auth-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 1.5rem; }

  .toast { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); background: var(--text); color: var(--bg); padding: 10px 20px; border-radius: 10px; font-size: 13px; font-weight: 500; z-index: 999; animation: toastIn 0.3s ease; white-space: nowrap; }
  .toast.success { background: var(--accent); color: #fff; }
  .toast.error { background: var(--danger); color: #fff; }
  @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
  @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .empty-state { text-align: center; padding: 3rem 1rem; color: var(--text-muted); }
  .empty-icon { font-size: 48px; margin-bottom: 1rem; }
  .empty-state h3 { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 6px; }
  .empty-state p { font-size: 13px; }

  .stock-bar { height: 4px; border-radius: 2px; background: var(--bg); margin-top: 4px; }
  .stock-fill { height: 100%; border-radius: 2px; transition: width 0.3s; }

  .divider { height: 0.5px; background: var(--border); margin: 0.75rem 0; }

  .profile-avatar-lg { width: 80px; height: 80px; border-radius: 50%; background: var(--primary-light); display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; color: var(--primary); margin: 0 auto 0; overflow: hidden; position: relative; cursor: pointer; }
  .profile-avatar-lg img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }
  .avatar-edit-overlay { position: absolute; inset: 0; border-radius: 50%; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.15s; cursor: pointer; }
  .profile-avatar-lg:hover .avatar-edit-overlay { opacity: 1; }

  .chip { display: inline-flex; align-items: center; gap: 4px; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 500; background: var(--bg); color: var(--text-muted); border: 0.5px solid var(--border); cursor: pointer; transition: all 0.15s; }
  .chip.active { background: var(--primary-light); color: var(--primary); border-color: var(--primary); }

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
  [data-theme="dark"] .bottom-tab-bar { background: #080D1A; border-top-color: rgba(255,255,255,0.06); }
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
  // Business data keys (inventory, sales, etc.) → IDB primary
  // Settings/auth keys → localStorage only
  const isBiz = typeof isBusinessKey === "function" && isBusinessKey(key);
  const [val, setVal] = useState(() => {
    try {
      const s = localStorage.getItem(key);
      return s ? JSON.parse(s) : typeof init === "function" ? init() : init;
    } catch {
      return typeof init === "function" ? init() : init;
    }
  });
  useEffect(() => {
    let active = true;
    // Hydrate business keys from IDB on mount
    if (isBiz) {
      IDB.get(key).then(v => {
        if (!active) return;
        if (v !== undefined && v !== null) {
          setVal(v);
        } else {
          // Migrate from localStorage to IDB on first run
          try {
            const raw = localStorage.getItem(key);
            if (raw !== null) {
              const parsed = JSON.parse(raw);
              IDB.set(key, parsed).catch(() => {});
              setVal(parsed);
            }
          } catch {}
        }
      }).catch(() => {});
    }

    // Re-hydrate on server sync
    const handler = () => {
      if (isBiz) {
        IDB.get(key).then(v => {
          if (active && v !== undefined && v !== null) setVal(v);
        }).catch(() => {
          try {
            const s = localStorage.getItem(key);
            if (s && active) setVal(JSON.parse(s));
          } catch {}
        });
      } else {
        try {
          const s = localStorage.getItem(key);
          if (s && active) setVal(JSON.parse(s));
        } catch {}
      }
    };
    window.addEventListener("rc_sync_update", handler);
    return () => {
      active = false;
      window.removeEventListener("rc_sync_update", handler);
    };
  }, [key, isBiz]);
  const update = useCallback(v => {
    setVal(prev => {
      const next = typeof v === "function" ? v(prev) : v;
      try {
        if (isBiz) {
          // Business data: write to BOTH IDB and localStorage
          // localStorage is the fast-read fallback for initial renders
          // IDB is the primary store for large data
          try {
            localStorage.setItem(key, JSON.stringify(next));
          } catch {}
          IDB.set(key, next).catch(() => {});
          // Signal sync engine to push immediately
          clearTimeout(window.__rcSyncTimer);
          window.__rcSyncTimer = setTimeout(() => {
            window.dispatchEvent(new CustomEvent("rc_data_write"));
          }, 800);
        } else {
          // Settings/auth: localStorage only
          localStorage.setItem(key, JSON.stringify(next));
        }
      } catch {}
      return next;
    });
  }, [key, isBiz]);
  return [val, update];
}
function Toast({
  msg,
  type,
  onDone
}) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: `toast ${type}`
  }, msg);
}
function Icon({
  name,
  size = 20
}) {
  const icons = {
    home: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 21V12h6v9"
    })),
    chart: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "12",
      width: "4",
      height: "9",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "10",
      y: "6",
      width: "4",
      height: "15",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "17",
      y: "3",
      width: "4",
      height: "18",
      rx: "1"
    })),
    history: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 7v5l3 3"
    })),
    user: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 20c0-4 3.6-7 8-7s8 3 8 7"
    })),
    plus: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })),
    trash: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
    })),
    edit: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
    })),
    download: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 3v13M7 11l5 5 5-5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M5 21h14"
    })),
    search: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 21l-4-4"
    })),
    logout: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
    })),
    back: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M19 12H5M12 5l-7 7 7 7"
    })),
    check: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 13l4 4L19 7"
    })),
    store: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M3 9h18v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9zM3 9l2.5-6h13L21 9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 9v12"
    })),
    leaf: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"
    })),
    briefcase: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "7",
      width: "20",
      height: "14",
      rx: "2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 12v2"
    })),
    settings: /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
    }))
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      display: "inline-flex"
    }
  }, icons[name] || null);
}

// ===================== EXPORT UTILITIES =====================
function loadSheetJS(cb) {
  if (window.XLSX) {
    cb();
    return;
  }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js";
  s.onload = cb;
  document.head.appendChild(s);
}
function loadJsPDF(cb) {
  if (window.jspdf) {
    cb(window.jspdf.jsPDF);
    return;
  }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js";
  s.onload = () => cb(window.jspdf.jsPDF);
  document.head.appendChild(s);
}
function loadAutoTable(cb) {
  if (window.jspdfAutotable) {
    cb();
    return;
  }
  const s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/jspdf-autotable@3.8.2/dist/jspdf.plugin.autotable.min.js";
  s.onload = () => {
    window.jspdfAutotable = true;
    cb();
  };
  document.head.appendChild(s);
}
function exportToExcel(filename, sheetName, rows, headers) {
  loadSheetJS(() => {
    const wb = window.XLSX.utils.book_new();
    const data = [headers, ...rows];
    const ws = window.XLSX.utils.aoa_to_sheet(data);
    // column widths
    ws["!cols"] = headers.map(() => ({
      wch: 20
    }));
    window.XLSX.utils.book_append_sheet(wb, ws, sheetName);
    window.XLSX.writeFile(wb, filename + ".xlsx");
  });
}
function exportToPDF(title, headers, rows, filename) {
  loadJsPDF(JsPDF => {
    loadAutoTable(() => {
      const doc = new JsPDF({
        orientation: "landscape",
        unit: "pt",
        format: "a4"
      });
      const pageW = doc.internal.pageSize.getWidth();
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, pageW / 2, 36, {
        align: "center"
      });
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(120);
      doc.text("Record Chief  ·  Exported " + new Date().toLocaleDateString("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric"
      }), pageW / 2, 50, {
        align: "center"
      });
      doc.autoTable({
        startY: 62,
        head: [headers],
        body: rows,
        headStyles: {
          fillColor: [27, 108, 168],
          textColor: 255,
          fontStyle: "bold",
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 9
        },
        alternateRowStyles: {
          fillColor: [245, 248, 252]
        },
        margin: {
          left: 36,
          right: 36
        },
        styles: {
          cellPadding: 5,
          overflow: "linebreak"
        }
      });
      doc.save(filename + "_" + new Date().toISOString().slice(0, 10) + ".pdf");
    });
  });
}
function ExportModal({
  title,
  onClose,
  onExcelExport,
  onPDFExport
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 16,
      padding: "1.5rem",
      width: 320,
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "Export ", title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 20
    }
  }, "Choose a format to download your data."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onExcelExport,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      border: "1.5px solid #1D6F42",
      borderRadius: 10,
      background: "#F0FAF4",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28
    }
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: "#1D6F42"
    }
  }, "Excel Spreadsheet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#4B9B6B",
      marginTop: 2
    }
  }, "Downloads as .xlsx \u2014 open in Excel or Google Sheets"))), /*#__PURE__*/React.createElement("button", {
    onClick: onPDFExport,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      border: `1.5px solid ${COLORS.danger}`,
      borderRadius: 10,
      background: COLORS.dangerLight,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28
    }
  }, "\uD83D\uDCC4"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: COLORS.danger
    }
  }, "PDF Document"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#C0392B99",
      marginTop: 2
    }
  }, "Downloads as .pdf \u2014 formatted, printable report")))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      marginTop: 16,
      width: "100%",
      background: "none",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 8,
      padding: "9px",
      fontSize: 13,
      color: COLORS.textMuted,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Cancel")));
}

// ===================== SMART SEARCH =====================
function SmartSearch({
  value,
  onChange,
  placeholder,
  resultCount
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: COLORS.textLight,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    className: "search-bar",
    placeholder: placeholder || "Search…",
    value: value,
    onChange: e => onChange(e.target.value),
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: "false"
  }), value && /*#__PURE__*/React.createElement("button", {
    onClick: () => onChange(""),
    style: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      background: COLORS.border,
      border: "none",
      borderRadius: "50%",
      width: 22,
      height: 22,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: COLORS.textMuted,
      fontSize: 12,
      lineHeight: 1
    }
  }, "\u2715"), value && resultCount !== undefined && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: value ? 40 : 10,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 10,
      color: COLORS.textMuted,
      whiteSpace: "nowrap"
    }
  }, resultCount, " result", resultCount !== 1 ? "s" : ""));
}

// ===================== NOTIFICATION BANNER =====================
function NotificationBanner({
  user,
  onNavigateDebt
}) {
  const [dismissed, setDismissed] = useState(false);
  const debtKey = `sl_debt_${user.uid}`;
  const records = (() => {
    try {
      return JSON.parse(localStorage.getItem(debtKey)) || [];
    } catch {
      return [];
    }
  })();
  const overdue = records.filter(r => !r.settled && !r.archived && r.dueDate && r.dueDate < TODAY());
  const dueSoon = records.filter(r => {
    if (r.settled || r.archived || !r.dueDate) return false;
    const days = Math.ceil((new Date(r.dueDate) - new Date()) / 86400000);
    const threshold = parseInt(r.reminderDays ?? 1);
    return days >= 0 && days <= threshold;
  });
  if (dismissed || overdue.length === 0 && dueSoon.length === 0) return null;
  const isUrgent = overdue.length > 0;
  const items = isUrgent ? overdue : dueSoon;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: isUrgent ? "#FEF2F2" : "#FFFBEB",
      border: `1.5px solid ${isUrgent ? "#FCA5A5" : "#FCD34D"}`,
      borderRadius: 14,
      padding: "12px 14px",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      flexShrink: 0
    }
  }, isUrgent ? "🚨" : "⏰"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: isUrgent ? COLORS.danger : COLORS.amber
    }
  }, isUrgent ? `${overdue.length} record${overdue.length > 1 ? "s are" : " is"} overdue` : `${dueSoon.length} record${dueSoon.length > 1 ? "s" : ""} due within 3 days`)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDismissed(true),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 16,
      padding: 4,
      flexShrink: 0
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, items.slice(0, 3).map(r => {
    const daysLeft = Math.ceil((new Date(r.dueDate) - new Date()) / 86400000);
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      onClick: onNavigateDebt,
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: isUrgent ? "#FEE2E2" : "#FEF3C7",
        borderRadius: 8,
        padding: "6px 10px",
        cursor: onNavigateDebt ? "pointer" : "default"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: isUrgent ? COLORS.danger : COLORS.amber
      }
    }, r.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: isUrgent ? COLORS.danger : COLORS.amber,
        fontWeight: 700
      }
    }, isUrgent ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? "Due today" : `${daysLeft}d left`));
  }), items.length > 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      paddingLeft: 4
    }
  }, "+", items.length - 3, " more\u2026")), onNavigateDebt && /*#__PURE__*/React.createElement("button", {
    onClick: onNavigateDebt,
    style: {
      marginTop: 8,
      width: "100%",
      padding: "7px",
      border: "none",
      borderRadius: 8,
      background: isUrgent ? COLORS.danger : COLORS.amber,
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "View in Debt & Credit \u2192"));
}

// ===================== MINI BAR CHART =====================
function MiniBarChart({
  data,
  color,
  label
}) {
  // data: [{month: "Jan", value: 12000}, ...]
  const ref = React.useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !data || data.length === 0) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width,
      H = canvas.height;
    const max = Math.max(...data.map(d => d.value), 1);
    const pad = {
      top: 6,
      bottom: 22,
      left: 4,
      right: 4
    };
    const barW = (W - pad.left - pad.right) / data.length;
    ctx.clearRect(0, 0, W, H);
    data.forEach((d, i) => {
      const barH = d.value / max * (H - pad.top - pad.bottom) || 2;
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
      ctx.fillText(d.month.slice(0, 3), x + w / 2, H - 6);
    });
  }, [data, color]);
  return /*#__PURE__*/React.createElement("div", null, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 600,
      color: COLORS.textMuted,
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 4
    }
  }, label), /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    width: 280,
    height: 80,
    style: {
      width: "100%",
      height: 80,
      display: "block"
    }
  }));
}

// ===================== AUTH =====================

//                                                        
// IndexedDB wrapper   faster, larger capacity than localStorage
// Falls back to localStorage silently if IDB not available
//                                                        
// ── Business data keys stored in IndexedDB, not localStorage ──
const BKEYS = ["sl_inv_", "sl_shopsales_", "sl_farm_", "sl_debt_", "sl_sales_", "sl_farms_", "sl_sales_groups_", "sl_sales_fields_"];
const isBusinessKey = k => BKEYS.some(p => k.startsWith(p));
const IDB = (() => {
  const DB_NAME = "RecordChief";
  const DB_VER = 2;
  const STORE = "bizdata";
  let _db = null;
  let _ready = false;
  let _failed = false;
  const open = () => new Promise((res, rej) => {
    if (_db) return res(_db);
    if (_failed) return rej(new Error("IDB unavailable"));
    const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    if (!idb) {
      _failed = true;
      return rej(new Error("No IDB"));
    }
    const req = idb.open(DB_NAME, DB_VER);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      // Migrate from old store name
      if (db.objectStoreNames.contains("data")) db.deleteObjectStore("data");
    };
    req.onsuccess = e => {
      _db = e.target.result;
      _ready = true;
      res(_db);
    };
    req.onerror = e => {
      _failed = true;
      rej(e.target.error);
    };
    req.onblocked = () => {
      _failed = true;
      rej(new Error("IDB blocked"));
    };
  });
  const idbGet = async key => {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, "readonly");
      const r = tx.objectStore(STORE).get(key);
      r.onsuccess = () => res(r.result);
      r.onerror = () => rej(r.error);
    });
  };
  const idbSet = async (key, val) => {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, "readwrite");
      const r = tx.objectStore(STORE).put(val, key);
      r.onsuccess = () => res();
      r.onerror = () => rej(r.error);
    });
  };
  const idbDel = async key => {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(STORE, "readwrite");
      const r = tx.objectStore(STORE).delete(key);
      r.onsuccess = () => res();
      r.onerror = () => rej(r.error);
    });
  };
  return {
    async get(key) {
      try {
        return await idbGet(key);
      } catch {
        // IDB failed — fall back to localStorage
        try {
          const v = localStorage.getItem(key);
          return v !== null ? JSON.parse(v) : undefined;
        } catch {
          return undefined;
        }
      }
    },
    async set(key, value) {
      try {
        await idbSet(key, value);
      } catch {
        try {
          localStorage.setItem(key, JSON.stringify(value));
        } catch {}
      }
    },
    async del(key) {
      try {
        await idbDel(key);
      } catch {}
      try {
        localStorage.removeItem(key);
      } catch {}
    }
  };
})();

// ── Helper: read business data (IDB primary, localStorage fallback) ──
async function bizGet(key) {
  const val = await IDB.get(key);
  if (val !== undefined) return val;
  // Not in IDB yet — check localStorage (migration path)
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      // Migrate to IDB and clean localStorage
      await IDB.set(key, parsed);
      localStorage.removeItem(key);
      return parsed;
    }
  } catch {}
  return null;
}

// ── Helper: write business data to IDB (no localStorage) ──
async function bizSet(key, value) {
  await IDB.set(key, value);
  // Keep localStorage in sync for any code still reading it directly
  // (we'll eliminate these reads progressively)
}

//    Sync conflict log                                  
// Tracks when local data was kept over server data
const SyncLog = {
  KEY: "rc_sync_log",
  MAX: 50,
  add(entry) {
    try {
      const log = this.get();
      log.unshift({
        ...entry,
        ts: new Date().toISOString()
      });
      localStorage.setItem(this.KEY, JSON.stringify(log.slice(0, this.MAX)));
    } catch (e) {}
  },
  get() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || [];
    } catch {
      return [];
    }
  },
  clear() {
    localStorage.removeItem(this.KEY);
  }
};

//    Demo Mode sample data                              
const DEMO_USER = {
  uid: "demo_user",
  name: "Amaka (Demo)",
  email: "demo@recordchief.app",
  phone: "08012345678",
  location: "Lagos Island",
  sectors: ["shop", "farm", "sales"],
  role: "owner",
  emailVerified: true
};
const DEMO_INVENTORY = [{
  id: "d1",
  name: "Indomie Noodles (ctn)",
  price: 4500,
  stock: 24,
  createdAt: "2026-03-01T08:00:00Z"
}, {
  id: "d2",
  name: "Sunflower Oil 1L",
  price: 2800,
  stock: 3,
  createdAt: "2026-03-01T08:00:00Z"
}, {
  id: "d3",
  name: "Peak Milk (tin)",
  price: 1800,
  stock: 0,
  createdAt: "2026-03-01T08:00:00Z"
}, {
  id: "d4",
  name: "Golden Morn 1kg",
  price: 1500,
  stock: 15,
  createdAt: "2026-03-01T08:00:00Z"
}, {
  id: "d5",
  name: "Semovita 2kg",
  price: 3200,
  stock: 8,
  createdAt: "2026-03-01T08:00:00Z"
}];
const DEMO_SALES = [{
  id: "s1",
  itemId: "d1",
  itemName: "Indomie Noodles (ctn)",
  qty: 2,
  price: 4500,
  total: 9000,
  date: new Date().toISOString().split("T")[0],
  createdAt: new Date().toISOString()
}, {
  id: "s2",
  itemId: "d4",
  itemName: "Golden Morn 1kg",
  qty: 3,
  price: 1500,
  total: 4500,
  date: new Date().toISOString().split("T")[0],
  createdAt: new Date().toISOString()
}, {
  id: "s3",
  itemId: "d5",
  itemName: "Semovita 2kg",
  qty: 1,
  price: 3200,
  total: 3200,
  date: new Date(Date.now() - 86400000).toISOString().split("T")[0],
  createdAt: new Date(Date.now() - 86400000).toISOString()
}];
const DEMO_FARM = [{
  id: "f1",
  desc: "Fertilizer purchase",
  amount: 15000,
  cat: "Inputs",
  date: "2026-03-05",
  createdAt: "2026-03-05T09:00:00Z"
}, {
  id: "f2",
  desc: "Labour — planting",
  amount: 8000,
  cat: "Labour",
  date: "2026-03-08",
  createdAt: "2026-03-08T09:00:00Z"
}, {
  id: "f3",
  desc: "Irrigation pump fuel",
  amount: 5500,
  cat: "Equipment",
  date: "2026-03-12",
  createdAt: "2026-03-12T09:00:00Z"
}];
const DEMO_DEBT = [{
  id: "dbt1",
  type: "credit",
  name: "Chinedu Obi",
  amount: 12000,
  paid: 5000,
  dueDate: "2026-04-10",
  settled: false,
  note: "Goods bought on credit",
  createdAt: "2026-03-01T09:00:00Z"
}, {
  id: "dbt2",
  type: "debt",
  name: "Emeka Supplies",
  amount: 8500,
  paid: 8500,
  dueDate: "2026-03-15",
  settled: true,
  note: "Delivery fee owed",
  createdAt: "2026-02-20T09:00:00Z"
}, {
  id: "dbt3",
  type: "credit",
  name: "Ngozi Fashion",
  amount: 6000,
  paid: 0,
  dueDate: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0],
  settled: false,
  note: "3 wrappers sold on credit",
  createdAt: "2026-03-10T09:00:00Z"
}];
const DEMO_SALES_ENTRIES = [{
  id: "se1",
  f_date: "2026-03-18",
  f_name: "Taiwo Bakery",
  f_phone: "08056781234",
  f_product: "Flour (50kg bag)",
  f_amount: "22000",
  f_notes: "Regular customer, weekly order",
  createdAt: "2026-03-18T10:00:00Z"
}, {
  id: "se2",
  f_date: "2026-03-20",
  f_name: "Bello Farms",
  f_phone: "07041235678",
  f_product: "Semovita x10",
  f_amount: "32000",
  f_notes: "Bulk discount applied",
  createdAt: "2026-03-20T10:00:00Z"
}];
async function loadDemoData() {
  const uid = DEMO_USER.uid;
  localStorage.setItem(`sl_inv_${uid}`, JSON.stringify(DEMO_INVENTORY));
  localStorage.setItem(`sl_shopsales_${uid}`, JSON.stringify(DEMO_SALES));
  localStorage.setItem(`sl_farm_${uid}`, JSON.stringify(DEMO_FARM));
  localStorage.setItem(`sl_debt_${uid}`, JSON.stringify(DEMO_DEBT));
  localStorage.setItem(`sl_sales_${uid}`, JSON.stringify(DEMO_SALES_ENTRIES));
  localStorage.setItem(`sl_sales_fields_${uid}`, JSON.stringify(null));
  localStorage.setItem("rc_demo_mode", "1");
}
async function clearDemoData() {
  const uid = DEMO_USER.uid;
  const keys = ["sl_inv_", "sl_shopsales_", "sl_farm_", "sl_debt_", "sl_sales_", "sl_sales_fields_", "sl_sales_groups_", "sl_farms_"];
  await Promise.all(keys.map(k => IDB.del(k + uid).catch(() => {})));
  keys.forEach(k => {
    try {
      localStorage.removeItem(k + uid);
    } catch {}
  });
  localStorage.removeItem("rc_demo_mode");
}
function WelcomeScreen({
  onNavigate
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      justifyContent: "center",
      padding: "2rem 1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      borderRadius: 26,
      background: "rgba(255,255,255,0.15)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 46,
      marginBottom: 20,
      boxShadow: "0 8px 32px rgba(0,0,0,0.2)"
    }
  }, "\uD83D\uDCD2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: "-0.5px",
      marginBottom: 8
    }
  }, "Record Chief"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      opacity: 0.75,
      textAlign: "center",
      maxWidth: 260,
      lineHeight: 1.7
    }
  }, "Track sales, inventory, farm expenses & more \u2014 built for Nigerian businesses."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 18,
      flexWrap: "wrap",
      justifyContent: "center"
    }
  }, ["🏪 Shop Sales", "🌾 Farm Records", "🤝 Debt Tracker", "💼 Sales Rep"].map(f => /*#__PURE__*/React.createElement("span", {
    key: f,
    style: {
      background: "rgba(255,255,255,0.12)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: 20,
      padding: "5px 12px",
      fontSize: 11,
      fontWeight: 600
    }
  }, f)))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 24,
      padding: "28px 24px",
      width: "100%",
      maxWidth: 380,
      boxShadow: "0 20px 60px rgba(0,0,0,0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 19,
      fontWeight: 800,
      color: COLORS.text,
      marginBottom: 4
    }
  }, "Get Started"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 20
    }
  }, "Join thousands of Nigerian business owners"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginBottom: 10,
      fontSize: 15,
      padding: "13px"
    },
    onClick: () => onNavigate("signup")
  }, "\uD83D\uDE80 Create Free Account"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("login"),
    style: {
      width: "100%",
      padding: "13px",
      border: `1.5px solid ${COLORS.border}`,
      borderRadius: 9,
      background: "transparent",
      color: COLORS.text,
      fontWeight: 600,
      fontSize: 15,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      marginBottom: 10
    }
  }, "Log In"), /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("demo"),
    style: {
      width: "100%",
      padding: "11px",
      border: "none",
      borderRadius: 9,
      background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
      color: "#fff",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFAE"), " Try Demo \u2014 No Account Needed"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 14,
      fontSize: 11,
      color: COLORS.textLight
    }
  }, "Free forever \xB7 No credit card required")));
}
const ALL_SECTORS = [{
  id: "sales",
  icon: "💼",
  color: "#E8F2FB",
  borderColor: "#A8C8E8",
  label: "Sales Rep / Account Manager",
  desc: "Track clients, deals, and custom KPIs"
}, {
  id: "shop",
  icon: "🏪",
  color: "#E6F7F1",
  borderColor: "#8ED5B8",
  label: "Shop Sales Record",
  desc: "Inventory management and daily sales log"
}, {
  id: "farm",
  icon: "🌾",
  color: "#FEF3E2",
  borderColor: "#F0C87A",
  label: "Farmers Expense Tracker",
  desc: "Seeds, fertilizer, labor, and all farm costs"
}];

//    Auth helpers   
const isValidEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const isAlphaName = v => /^[a-zA-Z\s'\-]+$/.test(v.trim());
const findAccount = email => {
  try {
    const a = JSON.parse(localStorage.getItem("sl_accounts_v1")) || {};
    return a[email.toLowerCase()] || null;
  } catch {
    return null;
  }
};
//                                                                
// AUTH LAYER   Firebase-ready
//                                                              
// STEP 1 (now): Uses localStorage auth (works offline, no backend)
// STEP 2 (later): Swap FIREBASE_CONFIG and set USE_FIREBASE = true
//                 Everything else stays identical.
//                                                                

//    Backend API URL                                               
const API_URL = "https://recordchief-backend-production-019b.up.railway.app";

//    Auth API   calls the real backend                             
const AuthAPI = {
  async signUp({
    name,
    email,
    phone,
    location,
    password,
    sectors
  }) {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          location,
          password,
          sectors
        })
      });
      const data = await res.json();
      if (!res.ok) return {
        ok: false,
        error: data.error || "Sign up failed."
      };
      const user = {
        ...data.user,
        uid: data.user._id
      };
      localStorage.setItem("rc_token", data.token);
      localStorage.setItem("rc_session", JSON.stringify(user));
      return {
        ok: true,
        user
      };
    } catch (e) {
      return {
        ok: false,
        error: "Network error. Check your connection."
      };
    }
  },
  // Simple hash for offline password verification (not cryptographic   just a fingerprint)
  // Immediate push then pull   call after any data write when online
  async syncNow(uid) {
    if (!navigator.onLine) return;
    await this.syncToServer(uid).catch(() => {});
    await new Promise(r => setTimeout(r, 800));
    await this.syncFromServer(uid).catch(() => {});
  },
  _hashPw(pw) {
    let h = 0;
    for (let i = 0; i < pw.length; i++) {
      h = Math.imul(31, h) + pw.charCodeAt(i) | 0;
    }
    return h.toString(36);
  },
  async signIn({
    email,
    password
  }) {
    const emailKey = email.trim().toLowerCase();

    // Try online first with a short timeout
    try {
      // AbortController with fallback for Android 6 / old browsers
      let signal = undefined;
      let timeout = null;
      if (typeof AbortController !== "undefined") {
        const controller = new AbortController();
        signal = controller.signal;
        timeout = setTimeout(() => controller.abort(), 20000); // 20s for Railway cold start
      }
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        }),
        ...(signal ? {
          signal
        } : {})
      });
      if (timeout) clearTimeout(timeout);
      const data = await res.json();
      if (!res.ok) return {
        ok: false,
        error: data.error || "Login failed."
      };
      const user = {
        ...data.user,
        uid: data.user._id
      };
      localStorage.setItem("rc_token", data.token);
      localStorage.setItem("rc_session", JSON.stringify(user));
      // Always update offline credentials on successful online login
      localStorage.setItem(`rc_offline_${emailKey}`, JSON.stringify({
        hash: AuthAPI._hashPw(password),
        uid: user.uid
      }));
      return {
        ok: true,
        user
      };
    } catch (e) {
      // Network failed or timed out   try offline fallback
      const offlineRec = (() => {
        try {
          return JSON.parse(localStorage.getItem(`rc_offline_${emailKey}`));
        } catch {
          return null;
        }
      })();
      const session = (() => {
        try {
          return JSON.parse(localStorage.getItem("rc_session"));
        } catch {
          return null;
        }
      })();
      const token = localStorage.getItem("rc_token");
      if (!offlineRec || !session || !token) {
        return {
          ok: false,
          error: "No internet connection. Please connect and log in for the first time."
        };
      }
      if (session.email?.toLowerCase() !== emailKey) {
        return {
          ok: false,
          error: "Incorrect email or password."
        };
      }
      if (offlineRec.hash !== AuthAPI._hashPw(password)) {
        return {
          ok: false,
          error: "Incorrect password."
        };
      }
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp * 1000 < Date.now()) {
          return {
            ok: false,
            error: "Your session expired. Please connect to the internet to log in again."
          };
        }
      } catch (ex) {
        return {
          ok: false,
          error: "Session error. Please connect and try again."
        };
      }
      return {
        ok: true,
        user: session,
        offline: true
      };
    }
  },
  async signOut() {
    // Clear business data from IDB on logout (not personal device? optional)
    // We keep rc_offline_* keys so user can log back in offline
    // Business data in IDB stays — re-populated on next login from server
    localStorage.removeItem("rc_token");
    localStorage.removeItem("rc_session");
    localStorage.removeItem("sl_user");
    localStorage.removeItem("rc_last_sync");
  },
  async resetPassword(email) {
    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });
      const data = await res.json();
      return res.ok ? {
        ok: true,
        message: data.message
      } : {
        ok: false,
        error: data.error
      };
    } catch (e) {
      return {
        ok: false,
        error: "Network error. Check your connection."
      };
    }
  },
  // Sync all user data to backend
  async syncToServer(uid) {
    const token = localStorage.getItem("rc_token");
    if (!token || !navigator.onLine) return;
    try {
      // Read from IDB first, fall back to localStorage
      const read = async lsKey => {
        try {
          const idbVal = await IDB.get(lsKey);
          if (idbVal !== undefined && idbVal !== null) return idbVal;
        } catch {}
        try {
          const raw = localStorage.getItem(lsKey);
          return raw ? JSON.parse(raw) : null;
        } catch {
          return null;
        }
      };
      const [inv, sales, farm, entries, salesGroups, fields, debt] = await Promise.all([read(`sl_inv_${uid}`), read(`sl_shopsales_${uid}`),
      // Read all farm expenses (multi-farm: merge all farm-specific keys)
      (async () => {
        const farmsKey = `sl_farms_${uid}`;
        let farms = await IDB.get(farmsKey);
        if (!farms) {
          const r = localStorage.getItem(farmsKey);
          farms = r ? JSON.parse(r) : null;
        }
        if (farms && farms.length > 0) {
          const allExp = [];
          for (const f of farms) {
            const fkey = `sl_farm_${uid}_${f.id}`;
            let fe = await IDB.get(fkey);
            if (!fe) {
              const r = localStorage.getItem(fkey);
              fe = r ? JSON.parse(r) : [];
            }
            allExp.push(...(fe || []));
          }
          return allExp;
        }
        // Legacy single-farm key fallback
        const r = await IDB.get(`sl_farm_${uid}`);
        if (r !== undefined) return r;
        const raw = localStorage.getItem(`sl_farm_${uid}`);
        return raw ? JSON.parse(raw) : [];
      })(), read(`sl_sales_${uid}`), read(`sl_sales_groups_${uid}`), read(`sl_sales_fields_${uid}`), read(`sl_debt_${uid}`)]);

      // Low-bandwidth: only send if there's actual data
      const isStaff = (() => {
        try {
          return JSON.parse(localStorage.getItem("rc_session") || "{}").role === "staff";
        } catch {
          return false;
        }
      })();
      const payload = {
        inventory: inv || [],
        shopSales: sales || [],
        farmExpenses: isStaff ? undefined : farm || [],
        salesEntries: isStaff ? undefined : entries || [],
        salesGroups: isStaff ? undefined : salesGroups || [],
        salesFields: isStaff ? undefined : fields || null,
        debtRecords: isStaff ? undefined : debt || [],
        settings: {
          sector: localStorage.getItem("sl_sector"),
          darkMode: localStorage.getItem("sl_darkmode")
        },
        clientTs: new Date().toISOString(),
        // Include farm structure for multi-farm support
        farmStructure: (() => {
          try {
            const fk = `sl_farms_${uid}`;
            return JSON.parse(localStorage.getItem(fk)) || null;
          } catch {
            return null;
          }
        })()
      };

      // Guard: don't push empty data if we haven't pulled yet this session
      const _lastPull = localStorage.getItem("rc_last_sync");
      const _hasData = (payload.inventory || []).length > 0 || (payload.shopSales || []).length > 0 || (payload.farmExpenses || []).length > 0 || (payload.salesEntries || []).length > 0 || (payload.debtRecords || []).length > 0;
      if (!_hasData && !_lastPull) return; // empty + no pull yet = skip

      await fetch(`${API_URL}/api/data`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
    } catch (e) {/* silent — data safe locally */}
  },
  // Pull ALL data from server and restore to localStorage   triggers UI refresh
  async syncFromServer(uid) {
    const token = localStorage.getItem("rc_token");
    if (!token || !navigator.onLine) return;
    try {
      const res = await fetch(`${API_URL}/api/data`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) return;
      const {
        data
      } = await res.json();
      if (!data) return;
      let changed = false;

      // Write to both localStorage (fast read) and IDB (primary store)
      const persist = async (key, val) => {
        try {
          localStorage.setItem(key, JSON.stringify(val));
        } catch {}
        await IDB.set(key, val).catch(() => {});
      };
      const safeApply = async (key, serverVal, label) => {
        if (serverVal === undefined || serverVal === null) return;
        try {
          let localVal = await IDB.get(key);
          if (localVal === undefined) {
            const raw = localStorage.getItem(key);
            localVal = raw ? JSON.parse(raw) : null;
          }

          // Server ALWAYS wins   it's the single source of truth
          // Exception: if server returns empty array but we have local data,
          // keep local (protects against Railway cold-start empty response)
          if (Array.isArray(serverVal) && Array.isArray(localVal)) {
            if (serverVal.length === 0 && localVal.length > 0) {
              SyncLog.add({
                type: "kept_local",
                label,
                localCount: localVal.length,
                serverCount: 0,
                reason: "Server returned empty — kept local"
              });
              return;
            }
            if (serverVal.length !== localVal.length) {
              SyncLog.add({
                type: "applied_server",
                label,
                localCount: localVal.length,
                serverCount: serverVal.length,
                reason: serverVal.length > localVal.length ? "Server has more records" : "Server has fewer records (deletion synced)"
              });
            }
          }
          const serverStr = JSON.stringify(serverVal);
          const localStr = JSON.stringify(localVal);
          if (localStr !== serverStr) {
            await persist(key, serverVal);
            changed = true;
          }
        } catch (e) {}
      };
      await Promise.all([safeApply(`sl_inv_${uid}`, data.inventory, "Inventory"), safeApply(`sl_shopsales_${uid}`, data.shopSales, "Shop Sales"), safeApply(`sl_farm_${uid}`, data.farmExpenses, "Farm Expenses"), safeApply(`sl_sales_${uid}`, data.salesEntries, "Customer Records"), safeApply(`sl_sales_fields_${uid}`, data.salesFields, "Sales Fields"), safeApply(`sl_debt_${uid}`, data.debtRecords, "Debt Records"), safeApply(`sl_sales_groups_${uid}`, data.salesGroups || [], "Sales Groups")]);
      if (data.settings?.darkMode !== undefined) {
        localStorage.setItem("sl_darkmode", data.settings.darkMode);
      }
      localStorage.setItem("rc_last_sync", new Date().toISOString());

      // Always fire update after pull so UI reflects server state on new devices
      window.dispatchEvent(new CustomEvent("rc_sync_update", {
        detail: {
          uid
        }
      }));
    } catch (e) {/* silent */}
  },
  // Internal fallback (kept for backward compat)
  _getAccounts() {
    try {
      return JSON.parse(localStorage.getItem("sl_accounts_v1")) || {};
    } catch {
      return {};
    }
  },
  _saveAccount() {}
};

// ===================== SECTOR TOUR CARDS =====================
const SECTOR_TOURS = {
  shop: {
    tagline: "Record a sale in 3 taps",
    steps: ["Tap + → Record Sale", "Pick item & quantity", "Sale saved instantly ✅"],
    gradient: "linear-gradient(135deg,#1E40AF,#2563EB)"
  },
  farm: {
    tagline: "Log any farm expense in seconds",
    steps: ["Tap + → Add Expense", "Enter amount & category", "See spend by category 📊"],
    gradient: "linear-gradient(135deg,#065F46,#059669)"
  },
  sales: {
    tagline: "Track every customer & deal",
    steps: ["Create custom fields", "Add a customer record", "Search & export anytime 📤"],
    gradient: "linear-gradient(135deg,#5B21B6,#7C3AED)"
  }
};
function SectorTourCards({
  selectedSectors,
  toggleSector
}) {
  const [expanded, setExpanded] = useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 16
    }
  }, ALL_SECTORS.map(s => {
    const active = selectedSectors.includes(s.id);
    const tour = SECTOR_TOURS[s.id];
    const isOpen = expanded === s.id;
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      style: {
        borderRadius: 14,
        overflow: "hidden",
        border: active ? `2px solid ${s.borderColor}` : `1.5px solid ${COLORS.border}`,
        transition: "all 0.18s",
        background: active ? s.color : COLORS.surface
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 14px",
        cursor: "pointer"
      },
      onClick: () => toggleSector(s.id)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        background: s.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        flexShrink: 0
      }
    }, s.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.text
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, s.desc)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: e => {
        e.stopPropagation();
        setExpanded(isOpen ? null : s.id);
      },
      style: {
        background: COLORS.bg,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 6,
        padding: "3px 8px",
        fontSize: 10,
        fontWeight: 700,
        color: COLORS.primary,
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif",
        whiteSpace: "nowrap"
      }
    }, isOpen ? "Hide ▲" : "Preview ▾"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        border: active ? "none" : `1.5px solid ${COLORS.border}`,
        background: active ? COLORS.primary : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s"
      }
    }, active && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13
    })))), isOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        background: tour.gradient,
        padding: "14px 16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 800,
        color: "#fff",
        marginBottom: 10
      }
    }, "\u26A1 ", tour.tagline), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, tour.steps.map((step, i) => /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: "rgba(255,255,255,0.15)",
        borderRadius: 10,
        padding: "8px",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        fontWeight: 600,
        color: "rgba(255,255,255,0.7)",
        marginBottom: 3
      }
    }, "Step ", i + 1), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        color: "#fff",
        lineHeight: 1.4
      }
    }, step)), i < tour.steps.length - 1 && /*#__PURE__*/React.createElement("div", {
      style: {
        color: "rgba(255,255,255,0.5)",
        fontSize: 16,
        flexShrink: 0
      }
    }, "\u203A"))))));
  }));
}
function SignupScreen({
  onAuth,
  onNavigate
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirm: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [sectorError, setSectorError] = useState("");
  const setField = (field, val) => {
    setForm(p => ({
      ...p,
      [field]: val
    }));
    setErrors(p => ({
      ...p,
      [field]: null
    }));
  };
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";else if (!isAlphaName(form.name)) e.name = "Name can only contain letters, spaces, hyphens or apostrophes";
    if (!form.email.trim()) e.email = "Email address is required";else if (!isValidEmail(form.email)) e.email = "Enter a valid email address (e.g. you@example.com)";else if (AuthAPI._getAccounts()[form.email.trim().toLowerCase()]) e.email = "An account with this email already exists";
    if (form.phone.length < 7) e.phone = "Enter a valid phone number";
    if (!form.location.trim()) e.location = "Business location is required";
    if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };
  const goToSectorStep = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStep(2);
  };
  const toggleSector = id => {
    setSectorError("");
    setSelectedSectors(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };
  const submit = async () => {
    if (selectedSectors.length === 0) {
      setSectorError("Please select at least one sector to continue.");
      return;
    }
    setLoading(true);
    try {
      const result = await AuthAPI.signUp({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone,
        location: form.location.trim(),
        password: form.password,
        sectors: selectedSectors
      });
      if (!result.ok) {
        setErrors({
          email: result.error
        });
        setLoading(false);
        return;
      }
      if (result.message) alert(result.message);
      onAuth(result.user, selectedSectors, true);
    } catch (e) {
      setErrors({
        email: e.message || "Sign up failed. Please try again."
      });
      setLoading(false);
    }
  };
  if (step === 2) return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      justifyContent: "flex-start",
      paddingTop: "2rem",
      paddingBottom: "2rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-card",
    style: {
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(1),
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      marginBottom: 4
    }
  }, "\uD83D\uDDC2\uFE0F"), /*#__PURE__*/React.createElement("div", {
    className: "auth-title",
    style: {
      marginTop: 4
    }
  }, "Pick your sectors"), /*#__PURE__*/React.createElement("div", {
    className: "auth-sub"
  }, "Tap a sector to see what it does \u2014 then select the ones you need."), sectorError && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.dangerLight,
      color: COLORS.danger,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      marginBottom: 12,
      fontWeight: 500
    }
  }, sectorError), /*#__PURE__*/React.createElement(SectorTourCards, {
    selectedSectors: selectedSectors,
    toggleSector: toggleSector
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.primaryLight,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 12,
      color: COLORS.primary,
      marginBottom: 14,
      display: "flex",
      gap: 6,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA1"), /*#__PURE__*/React.createElement("span", null, "You can add or remove sectors any time from your profile settings.")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: submit,
    disabled: loading || selectedSectors.length === 0,
    style: {
      opacity: selectedSectors.length === 0 ? 0.5 : 1
    }
  }, loading ? "Creating account…" : selectedSectors.length === 0 ? "Select at least one sector" : `Finish — ${selectedSectors.length} sector${selectedSectors.length > 1 ? "s" : ""} selected ✓`), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 10,
      fontSize: 12,
      color: COLORS.textLight
    }
  }, "Step 2 of 2")));
  return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      justifyContent: "flex-start",
      paddingTop: "2.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-card"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("welcome"),
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back"), /*#__PURE__*/React.createElement("div", {
    className: "auth-title"
  }, "Create Account"), /*#__PURE__*/React.createElement("div", {
    className: "auth-sub"
  }, "Fill in your details to get started"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 3,
      borderRadius: 2,
      background: COLORS.primary
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 3,
      borderRadius: 2,
      background: COLORS.border
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Full Name"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.name ? " error" : ""}`,
    type: "text",
    placeholder: "Adaeze Okonkwo",
    value: form.name,
    onChange: e => {
      const val = e.target.value.replace(/[^a-zA-Z\s'\-]/g, "");
      setField("name", val);
    }
  }), errors.name && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.name)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.email ? " error" : ""}`,
    type: "email",
    placeholder: "you@example.com",
    value: form.email,
    onChange: e => setField("email", e.target.value)
  }), errors.email && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.email)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Phone Number"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    style: {
      width: 80,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("option", null, "+234"), /*#__PURE__*/React.createElement("option", null, "+233"), /*#__PURE__*/React.createElement("option", null, "+254"), /*#__PURE__*/React.createElement("option", null, "+256")), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.phone ? " error" : ""}`,
    placeholder: "8012345678",
    value: form.phone,
    onChange: e => setField("phone", e.target.value)
  })), errors.phone && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.phone)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Business Location"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.location ? " error" : ""}`,
    type: "text",
    placeholder: "e.g. Lagos, Abuja, Port Harcourt",
    value: form.location,
    onChange: e => setField("location", e.target.value)
  }), errors.location && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.location)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.password ? " error" : ""}`,
    type: "password",
    placeholder: "At least 6 characters",
    value: form.password,
    onChange: e => setField("password", e.target.value)
  }), errors.password && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.password)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Confirm Password"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.confirm ? " error" : ""}`,
    type: "password",
    placeholder: "Repeat your password",
    value: form.confirm,
    onChange: e => setField("confirm", e.target.value)
  }), errors.confirm && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.confirm)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: goToSectorStep,
    style: {
      marginTop: 4
    }
  }, "Next \u2014 Choose Sectors \u2192"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 10,
      fontSize: 12,
      color: COLORS.textLight
    }
  }, "Step 1 of 2"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 8,
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Already have an account? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.primary,
      cursor: "pointer",
      fontWeight: 600
    },
    onClick: () => onNavigate("login")
  }, "Log in"))));
}
function LoginScreen({
  onAuth,
  onNavigate
}) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forgot, setForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotMsg, setForgotMsg] = useState("");
  const setField = (field, val) => {
    setForm(p => ({
      ...p,
      [field]: val
    }));
    setError("");
  };
  const submit = async () => {
    if (!form.email.trim() || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(form.email)) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const result = await AuthAPI.signIn({
        email: form.email.trim(),
        password: form.password
      });
      if (!result.ok) {
        setLoading(false);
        setError(result.error || "Login failed. Please try again.");
        return;
      }
      if (result.offline) {
        // Show brief offline notice but still log them in
        setError(""); // clear any error
      }
      onAuth(result.user, result.user.sectors);
    } catch (e) {
      setLoading(false);
      setError(e.message || "Login failed. Please try again.");
    }
  };
  const handleForgot = async () => {
    if (!forgotEmail.trim() || !isValidEmail(forgotEmail)) {
      setForgotMsg("Enter a valid email address.");
      return;
    }
    const result = await AuthAPI.resetPassword(forgotEmail.trim());
    if (result.ok) setForgotMsg(USE_FIREBASE ? "Password reset email sent! Check your inbox." : "Password hint: no real email in local mode. Reset coming when backend is active.");else setForgotMsg(result.error || "No account found with that email.");
  };
  if (forgot) return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      justifyContent: "flex-start",
      paddingTop: "3rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-card"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setForgot(false);
      setForgotMsg("");
      setForgotEmail("");
    },
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      marginBottom: 12,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back"), /*#__PURE__*/React.createElement("div", {
    className: "auth-title"
  }, "Reset Password"), /*#__PURE__*/React.createElement("div", {
    className: "auth-sub"
  }, "Enter your registered email address"), forgotMsg && /*#__PURE__*/React.createElement("div", {
    style: {
      background: forgotMsg.startsWith("No") || forgotMsg.startsWith("Enter") ? COLORS.dangerLight : COLORS.accentLight,
      color: forgotMsg.startsWith("No") || forgotMsg.startsWith("Enter") ? COLORS.danger : COLORS.accent,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      marginBottom: 12
    }
  }, forgotMsg), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "email",
    placeholder: "you@example.com",
    value: forgotEmail,
    onChange: e => {
      setForgotEmail(e.target.value);
      setForgotMsg("");
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: handleForgot
  }, "Check Account")));
  return /*#__PURE__*/React.createElement("div", {
    className: "welcome-screen",
    style: {
      padding: 0,
      justifyContent: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2.5rem 2rem 1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 12
    }
  }, "\uD83D\uDC4B"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 6
    }
  }, "Welcome back"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      opacity: 0.75,
      textAlign: "center"
    }
  }, "Sign in to your Record Chief account")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "0 20px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 24,
      padding: "28px 24px 36px",
      width: "100%",
      maxWidth: 400,
      marginBottom: 32,
      boxShadow: "0 8px 40px rgba(15,23,42,0.18)"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate("welcome"),
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      marginBottom: 16,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back"), error && /*#__PURE__*/React.createElement("div", {
    style: {
      background: error.includes("waking up") || error.includes("too long") ? "#FEF3C7" : COLORS.dangerLight,
      color: error.includes("waking up") || error.includes("too long") ? "#92400E" : COLORS.danger,
      borderRadius: 10,
      padding: "10px 14px",
      fontSize: 13,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", null, error.includes("waking up") || error.includes("too long") ? "⏳" : "⚠️"), /*#__PURE__*/React.createElement("span", {
    style: {
      lineHeight: 1.5
    }
  }, error)), (error.includes("waking up") || error.includes("too long")) && /*#__PURE__*/React.createElement("button", {
    onClick: submit,
    disabled: loading,
    style: {
      marginTop: 10,
      background: "#2563EB",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "8px 16px",
      fontSize: 13,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      width: "100%"
    }
  }, "\uD83D\uDD04 Try Again")), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email Address"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "email",
    placeholder: "you@example.com",
    value: form.email,
    onChange: e => setField("email", e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Password"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "password",
    placeholder: "Your password",
    value: form.password,
    onChange: e => setField("password", e.target.value),
    onKeyDown: e => e.key === "Enter" && submit()
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      marginTop: -6,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: COLORS.primary,
      cursor: "pointer",
      fontWeight: 500
    },
    onClick: () => setForgot(true)
  }, "Forgot password?")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: submit,
    disabled: loading,
    style: {
      fontSize: 15,
      padding: "13px"
    }
  }, loading ? "Signing in…" : "Sign In"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 16,
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "New here? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.primary,
      cursor: "pointer",
      fontWeight: 700
    },
    onClick: () => onNavigate("signup")
  }, "Create free account")))));
}

// ===================== HOME (SECTOR PICKER) =====================
function HomeScreen({
  user,
  sector,
  onSetSector,
  onManageSectors,
  onViewOverview,
  onViewDebt
}) {
  const userSectors = user.role === "staff" ? ["shop"] : user.sectors && user.sectors.length > 0 ? user.sectors : ["shop"];
  const activeSectors = ALL_SECTORS.filter(s => userSectors.includes(s.id));
  const avatarKey = `sl_avatar_${user.uid}`;
  const storedAvatar = (() => {
    try {
      return JSON.parse(localStorage.getItem(avatarKey));
    } catch {
      return null;
    }
  })();
  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const hour = new Date().getHours();
  const greeting = hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const greetEmoji = hour < 5 ? "🌙" : hour < 12 ? "☀️" : hour < 17 ? "🌤️" : "🌙";
  const today = new Date().toLocaleDateString("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

  // Quick stats
  const invKey = `sl_inv_${user.uid}`;
  const salesKey = `sl_shopsales_${user.uid}`;
  const debtKey = `sl_debt_${user.uid}`;
  const inv = (() => {
    try {
      return JSON.parse(localStorage.getItem(invKey)) || [];
    } catch {
      return [];
    }
  })();
  const sales = (() => {
    try {
      return JSON.parse(localStorage.getItem(salesKey)) || [];
    } catch {
      return [];
    }
  })();
  const debts = (() => {
    try {
      return JSON.parse(localStorage.getItem(debtKey)) || [];
    } catch {
      return [];
    }
  })();
  const todaySales = sales.filter(s => s.date === TODAY()).reduce((a, s) => a + (s.total || 0), 0);
  const outstanding = debts.filter(r => !r.settled).length;
  const overdue = debts.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
  const lowStock = inv.filter(i => i.stock < 5).length;
  const sectorGradients = {
    shop: "linear-gradient(135deg, #1E40AF 0%, #2563EB 100%)",
    farm: "linear-gradient(135deg, #065F46 0%, #059669 100%)",
    sales: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 100%)",
    debt: overdue > 0 ? "linear-gradient(135deg, #991B1B 0%, #DC2626 100%)" : "linear-gradient(135deg, #1E3A8A 0%, #4338CA 100%)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, #1E3A8A 0%, #1D4ED8 55%, #0F766E 100%)",
      borderRadius: 22,
      padding: "22px 18px 18px",
      marginBottom: "1rem",
      position: "relative",
      overflow: "hidden",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -30,
      right: -30,
      width: 110,
      height: 110,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.06)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: -20,
      left: -20,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.04)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 10,
      right: 80,
      width: 50,
      height: 50,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.04)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.18)",
      border: "2px solid rgba(255,255,255,0.35)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: 17,
      overflow: "hidden",
      flexShrink: 0
    }
  }, storedAvatar ? /*#__PURE__*/React.createElement("img", {
    src: storedAvatar,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    },
    alt: ""
  }) : initials), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: 0.75,
      fontWeight: 500
    }
  }, greeting, " ", greetEmoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      marginTop: 1,
      letterSpacing: "-0.3px"
    }
  }, user.name.split(" ")[0])), /*#__PURE__*/React.createElement("button", {
    onClick: onViewOverview,
    style: {
      background: "rgba(255,255,255,0.15)",
      border: "1.5px solid rgba(255,255,255,0.3)",
      borderRadius: 12,
      padding: "8px 12px",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      transition: "background 0.15s",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      fontWeight: 800,
      letterSpacing: "0.06em",
      opacity: 0.9
    }
  }, "OVERVIEW"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 8
    }
  }, [{
    label: "Today's Sales",
    value: todaySales > 0 ? NAIRA(todaySales) : "₦0",
    icon: "💰",
    color: "rgba(255,255,255,0.9)"
  }, {
    label: "Outstanding",
    value: outstanding > 0 ? `${outstanding} record${outstanding !== 1 ? "s" : ""}` : "All clear",
    icon: "🤝",
    color: outstanding > 0 ? "#FCD34D" : "rgba(255,255,255,0.9)"
  }, {
    label: "Low Stock",
    value: lowStock > 0 ? `${lowStock} item${lowStock !== 1 ? "s" : ""}` : "All good",
    icon: "📦",
    color: lowStock > 0 ? "#FCA5A5" : "rgba(255,255,255,0.9)"
  }].map((stat, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: "rgba(255,255,255,0.1)",
      borderRadius: 12,
      padding: "10px 10px 8px",
      border: "1px solid rgba(255,255,255,0.12)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      marginBottom: 4
    }
  }, stat.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      color: stat.color,
      lineHeight: 1.2
    }
  }, stat.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.65,
      marginTop: 3,
      fontWeight: 500
    }
  }, stat.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.5,
      marginTop: 12,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, "\uD83D\uDCC5 ", today, user.location && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 \uD83D\uDCCD ", user.location))), /*#__PURE__*/React.createElement(NotificationBanner, {
    user: user
  }), !navigator.onLine && (() => {
    const lastExportKey = `sl_lastexport_${user?.uid}`;
    const lastExport = localStorage.getItem(lastExportKey);
    const daysSince = lastExport ? Math.floor((Date.now() - new Date(lastExport)) / 86400000) : 999;
    if (daysSince < 7) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--primary-light)",
        border: `1.5px solid var(--primary)`,
        borderRadius: 12,
        padding: "10px 14px",
        marginBottom: "0.75rem",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        flexShrink: 0
      }
    }, "\u2601\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: "var(--primary)"
      }
    }, lastExport ? `No export in ${daysSince} days` : "No local backup yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)",
        marginTop: 1
      }
    }, "Export your records to keep a local copy.")), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setShowExport(true);
        localStorage.setItem(lastExportKey, new Date().toISOString());
      },
      style: {
        flexShrink: 0,
        background: "var(--primary)",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Export"));
  })(), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.7rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      margin: 0
    }
  }, "Your Sectors"), /*#__PURE__*/React.createElement("button", {
    onClick: onManageSectors,
    style: {
      background: "none",
      border: "none",
      color: "var(--primary)",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      alignItems: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 13
  }), " Manage")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginBottom: "1rem"
    }
  }, activeSectors.map(s => /*#__PURE__*/React.createElement("button", {
    key: s.id,
    onClick: () => onSetSector(s.id),
    style: {
      borderRadius: 18,
      padding: "18px 14px",
      background: sectorGradients[s.id] || sectorGradients.shop,
      border: "none",
      cursor: "pointer",
      transition: "all 0.18s",
      boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
      textAlign: "left",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -16,
      right: -16,
      width: 60,
      height: 60,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.08)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 30,
      marginBottom: 10
    }
  }, s.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 800,
      color: "#fff",
      lineHeight: 1.3
    }
  }, s.id === "sales" ? "Sales Rep" : s.id === "shop" ? "Shop Sales" : s.id === "farm" ? "Farm Records" : s.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "rgba(255,255,255,0.65)",
      marginTop: 4,
      lineHeight: 1.4
    }
  }, s.desc.split("—")[0].trim()))), activeSectors.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / -1",
      textAlign: "center",
      padding: "2rem",
      color: "var(--text-muted)",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 8
    }
  }, "\uD83D\uDDC2\uFE0F"), "Tap Manage to select your sectors"), user.role !== "staff" && /*#__PURE__*/React.createElement("button", {
    onClick: onViewDebt,
    style: {
      gridColumn: "1 / -1",
      borderRadius: 18,
      padding: "16px 18px",
      background: sectorGradients.debt,
      border: "none",
      cursor: "pointer",
      transition: "all 0.18s",
      boxShadow: `0 4px 16px ${overdue > 0 ? "rgba(220,38,38,0.3)" : "rgba(79,70,229,0.25)"}`,
      display: "flex",
      alignItems: "center",
      gap: 14,
      textAlign: "left",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 70,
      height: 70,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.07)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 46,
      height: 46,
      borderRadius: 13,
      background: "rgba(255,255,255,0.18)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      flexShrink: 0
    }
  }, "\uD83E\uDD1D"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: "#fff"
    }
  }, "Debt & Credit"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.65)",
      marginTop: 3
    }
  }, outstanding > 0 ? `${outstanding} outstanding record${outstanding !== 1 ? "s" : ""}` : "No outstanding records")), overdue > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.22)",
      color: "#fff",
      borderRadius: 20,
      padding: "4px 12px",
      fontSize: 12,
      fontWeight: 800,
      flexShrink: 0
    }
  }, "\u26A0\uFE0F ", overdue, " overdue") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "rgba(255,255,255,0.15)",
      color: "rgba(255,255,255,0.8)",
      borderRadius: 20,
      padding: "4px 12px",
      fontSize: 11,
      fontWeight: 600,
      flexShrink: 0
    }
  }, "View \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: "1rem",
      padding: "14px 16px",
      background: "var(--surface)",
      borderRadius: 16,
      border: "1px solid var(--border)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text)",
      marginBottom: 3
    }
  }, "\uD83D\uDCD2 Record Chief"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      letterSpacing: "0.01em"
    }
  }, "Your business records, always organized")));
}

// ===================== SALES REP MODE =====================
function SalesRepScreen({
  user
}) {
  const storageKey = `sl_sales_${user.uid}`;
  const fieldsKey = `sl_sales_fields_${user.uid}`;
  const groupsKey = `sl_sales_groups_${user.uid}`;
  const [groups, setGroups] = useLocalState(groupsKey, []);
  const [entries, setEntries] = useLocalState(storageKey, []);
  const [fields, setFields] = useLocalState(fieldsKey, null);
  const defaultFields = [{
    id: "f_date",
    name: "Date",
    type: "Date"
  }, {
    id: "f_notes",
    name: "Notes",
    type: "Text"
  }];
  const activeFields = fields || defaultFields;
  const orderedFields = activeFields;
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [setupMode, setSetupMode] = useState(!fields);
  const [draftFields, setDraftFields] = useState([]);
  const [showExport, setShowExport] = useState(false);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [showManageFields, setShowManageFields] = useState(false);
  const [viewEntry, setViewEntry] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [showNewGroup, setShowNewGroup] = useState(false);
  const [sortBy, setSortBy] = useState("date_desc");
  const showToast = (msg, type = "success") => setToast({
    msg,
    type
  });
  const createNewGroup = () => {
    const name = newGroupName.trim() || `Group ${(groups || []).length + 1}`;
    if (entries.length > 0 || fields) {
      const archived = {
        id: uid(),
        name,
        fields: fields || defaultFields,
        entries,
        createdAt: TS()
      };
      setGroups(prev => [archived, ...(prev || [])]);
    }
    setEntries([]);
    setFields(null);
    setForm({});
    setSetupMode(true);
    setNewGroupName("");
    setShowNewGroup(false);
    showToast(`"${name}" archived. Set up fields for new group.`);
  };
  const saveCurrentFields = combined => {
    setFields(combined);
    setDraftFields([]);
    setSetupMode(false);
    setShowManageFields(false);
    setShowEntryForm(false);
    showToast("Fields saved!");
  };
  const saveEntry = () => {
    const e = {};
    activeFields.forEach(f => {
      if (!form[f.id] && f.id !== "f_notes" && f.id !== "f_date") e[f.id] = `${f.name} is required`;
    });
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const entry = {
      id: editId || uid(),
      ...form,
      createdAt: editId ? entries.find(x => x.id === editId)?.createdAt || TS() : TS()
    };
    if (editId) {
      setEntries(prev => prev.map(x => x.id === editId ? entry : x));
      setEditId(null);
      showToast("Entry updated!");
    } else {
      setEntries(prev => [entry, ...prev]);
      showToast("Record saved!");
    }
    setForm({});
    setErrors({});
    setShowEntryForm(false);
  };
  const deleteEntry = id => {
    setEntries(prev => prev.filter(e => e.id !== id));
    showToast("Deleted", "error");
  };
  const openEdit = entry => {
    setEditId(entry.id);
    setForm({
      ...entry
    });
    setShowEntryForm(true);
    setSetupMode(false);
    setShowManageFields(false);
  };
  const dateId = activeFields.find(f => f.type === "Date")?.id || "f_date";
  const firstId = orderedFields[0]?.id;
  const filtered = [...entries].filter(e => !search || JSON.stringify(e).toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
    if (sortBy === "date_asc") return (a[dateId] || "") < (b[dateId] || "") ? -1 : 1;
    if (sortBy === "name_asc") return (a[firstId] || "").localeCompare(b[firstId] || "");
    if (sortBy === "name_desc") return (b[firstId] || "").localeCompare(a[firstId] || "");
    return (a[dateId] || a.createdAt || "") > (b[dateId] || b.createdAt || "") ? -1 : 1; // date_desc default
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: "var(--text)"
    }
  }, "\uD83D\uDC65 Customer Records"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, entries.length, " record", entries.length !== 1 ? "s" : "", (groups || []).length > 0 ? ` · ${groups.length} archived group${groups.length !== 1 ? "s" : ""}` : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-sm",
    onClick: () => setShowExport(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 14
  }), " Export"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowNewGroup(true),
    style: {
      background: "var(--primary-light)",
      color: "var(--primary)",
      border: "none",
      padding: "6px 12px",
      borderRadius: 8,
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif"
    }
  }, "+ New Group"))), (groups || []).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: "0.75rem",
      paddingBottom: 4,
      scrollbarWidth: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      padding: "5px 12px",
      borderRadius: 20,
      background: "var(--primary)",
      color: "#fff",
      fontSize: 12,
      fontWeight: 700
    }
  }, "\uD83D\uDCCB Current"), (groups || []).map(grp => /*#__PURE__*/React.createElement("div", {
    key: grp.id,
    style: {
      flexShrink: 0,
      padding: "5px 12px",
      borderRadius: 20,
      background: "var(--surface)",
      border: "1px solid var(--border)",
      fontSize: 12,
      fontWeight: 600,
      color: "var(--text-muted)",
      whiteSpace: "nowrap"
    }
  }, "\uD83D\uDCC1 ", grp.name, " (", (grp.entries || []).length, ")"))), setupMode && !showEntryForm && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      textAlign: "center",
      padding: "1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      marginBottom: 8
    }
  }, "\uD83D\uDEE0\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 6
    }
  }, "Set up your record fields"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, "Define the columns for this group (e.g. Name, Product, Amount)."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      setSetupMode(true);
      setDraftFields([{
        id: uid(),
        name: "",
        type: "Text"
      }]);
      setShowEntryForm(true);
    }
  }, "\u2699\uFE0F Set Up Fields")), fields && !setupMode && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: "0.6rem",
      flexWrap: "wrap"
    }
  }, activeFields.filter(f => f.id !== "f_notes" && f.id !== "f_date").map(f => /*#__PURE__*/React.createElement("span", {
    key: f.id,
    style: {
      background: "var(--bg)",
      border: "1px solid var(--border)",
      borderRadius: 6,
      padding: "3px 8px",
      fontSize: 11,
      fontWeight: 600,
      color: "var(--text-muted)"
    }
  }, f.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setDraftFields(activeFields.filter(f => f.id !== "f_date" && f.id !== "f_notes"));
      setShowManageFields(true);
      setShowEntryForm(true);
      setSetupMode(false);
    },
    style: {
      background: "none",
      border: "none",
      color: "var(--primary)",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif"
    }
  }, "\u270F\uFE0F Edit fields")), fields && !setupMode && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SmartSearch, {
    value: search,
    onChange: setSearch,
    placeholder: "Search records\u2026",
    resultCount: filtered.length
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("select", {
    value: sortBy,
    onChange: e => setSortBy(e.target.value),
    className: "form-input",
    style: {
      padding: "9px 12px",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "date_desc"
  }, "\uD83D\uDCC5 Newest date"), /*#__PURE__*/React.createElement("option", {
    value: "date_asc"
  }, "\uD83D\uDCC5 Oldest date"), /*#__PURE__*/React.createElement("option", {
    value: "name_asc"
  }, "\uD83D\uDD24 A \u2192 Z"), /*#__PURE__*/React.createElement("option", {
    value: "name_desc"
  }, "\uD83D\uDD24 Z \u2192 A")))), (groups || []).map(grp => {
    const gFields = grp.fields || defaultFields;
    const gFirst = gFields[0];
    const grpFiltered = (grp.entries || []).filter(e => !search || JSON.stringify(e).toLowerCase().includes(search.toLowerCase()));
    if (grpFiltered.length === 0 && search) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: grp.id,
      style: {
        marginBottom: "1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.06em"
      }
    }, "\uD83D\uDCC1 ", grp.name, " \xB7 ", (grp.entries || []).length, " record", (grp.entries || []).length !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setGroups(prev => (prev || []).filter(g => g.id !== grp.id));
        showToast(`"${grp.name}" deleted`, "error");
      },
      style: {
        background: "none",
        border: "none",
        color: COLORS.danger,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "'Inter',sans-serif"
      }
    }, "Delete group")), /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        padding: 0,
        overflow: "hidden"
      }
    }, grpFiltered.slice(0, 5).map((e, i) => /*#__PURE__*/React.createElement("div", {
      key: e.id || i,
      style: {
        padding: "10px 14px",
        borderBottom: i < Math.min(grpFiltered.length, 5) - 1 ? `0.5px solid var(--border)` : "none",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "var(--text)"
      }
    }, gFirst ? e[gFirst.id] || "—" : "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)",
        marginTop: 2
      }
    }, gFields.slice(1, 3).map(f => e[f.id]).filter(Boolean).join(" · "))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)"
      }
    }, e.f_date || ""))), grpFiltered.length > 5 && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "8px 14px",
        fontSize: 12,
        color: "var(--primary)",
        fontWeight: 600
      }
    }, "+", grpFiltered.length - 5, " more")));
  }), fields && !setupMode && /*#__PURE__*/React.createElement(React.Fragment, null, (groups || []).length > 0 && entries.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--text-muted)",
      textTransform: "uppercase",
      letterSpacing: "0.06em",
      marginBottom: 8
    }
  }, "\uD83D\uDCCB Current Records"), filtered.length === 0 && entries.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83D\uDC65"), /*#__PURE__*/React.createElement("h3", null, "No records yet"), /*#__PURE__*/React.createElement("p", null, "Tap + to add your first record")) : filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("h3", null, "No results"), /*#__PURE__*/React.createElement("p", null, "Try a different search")) : /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, filtered.map(entry => {
    const customFields = activeFields.filter(f => f.id !== "f_date" && f.id !== "f_notes");
    const mainF = customFields[0] || activeFields[0];
    const subF = customFields[1] || activeFields[1];
    const amtF = customFields.find(f => f.type === "Number");
    const dtF = activeFields.find(f => f.type === "Date") || {
      id: "f_date"
    };
    return /*#__PURE__*/React.createElement("div", {
      key: entry.id,
      className: "entry-row"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: "var(--primary-light)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        fontWeight: 700,
        color: "var(--primary)",
        flexShrink: 0
      }
    }, String(entry[mainF?.id] || "?")[0]?.toUpperCase() || "?"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "entry-title"
    }, entry[mainF?.id] || "—"), /*#__PURE__*/React.createElement("div", {
      className: "entry-sub"
    }, [entry[subF?.id], entry[dtF.id]].filter(Boolean).join(" · "))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 4,
        flexShrink: 0
      }
    }, amtF && entry[amtF.id] && /*#__PURE__*/React.createElement("div", {
      className: "entry-amount"
    }, NAIRA(entry[amtF.id])), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setViewEntry(entry),
      style: {
        background: "var(--primary-light)",
        color: "var(--primary)",
        border: "none",
        padding: "5px 9px",
        borderRadius: 7,
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer"
      }
    }, "View"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-outline",
      onClick: () => openEdit(entry)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 13
    })), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-danger",
      onClick: () => deleteEntry(entry.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 13
    })))));
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (!fields) {
        setSetupMode(true);
        setDraftFields([{
          id: uid(),
          name: "",
          type: "Text"
        }]);
      } else {
        setSetupMode(false);
        setShowManageFields(false);
      }
      setEditId(null);
      setForm({});
      setErrors({});
      setShowEntryForm(true);
    },
    style: {
      position: "fixed",
      bottom: "calc(28px + var(--fab-lift,0px))",
      right: 28,
      zIndex: 200,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: "linear-gradient(135deg,#5B21B6,#7C3AED)",
      color: "#fff",
      border: "none",
      boxShadow: "0 4px 18px rgba(124,58,237,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }))), showNewGroup && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setShowNewGroup(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 380,
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 6
    }
  }, "\uD83D\uDCC1 Start New Group"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 16,
      lineHeight: 1.6
    }
  }, "Current records (", entries.length, ") will be archived. You'll define new fields for the next group."), /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Name for current group"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. Jan 2026 Clients, Q1 Sales\u2026",
    value: newGroupName,
    onChange: e => setNewGroupName(e.target.value),
    onKeyDown: e => e.key === "Enter" && createNewGroup(),
    autoFocus: true,
    style: {
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setShowNewGroup(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2,
      background: "linear-gradient(135deg,#5B21B6,#7C3AED)"
    },
    onClick: createNewGroup
  }, "\uD83D\uDCC1 Archive & Start New")))), showEntryForm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center"
    },
    onClick: () => {
      setShowEntryForm(false);
      setSetupMode(!fields);
      setShowManageFields(false);
      setEditId(null);
      setForm({});
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: "22px 22px 0 0",
      width: "100%",
      maxWidth: 520,
      maxHeight: "88vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "18px 18px 10px",
      borderBottom: `1px solid var(--border)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 800,
      color: "var(--text)"
    }
  }, setupMode ? "⚙️ Set Up Fields" : showManageFields ? "✏️ Edit Fields" : editId ? "Edit Record" : "New Record"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowEntryForm(false);
      setSetupMode(!fields);
      setShowManageFields(false);
      setEditId(null);
      setForm({});
    },
    style: {
      background: "var(--bg)",
      border: "none",
      width: 30,
      height: 30,
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: 18,
      color: "var(--text-muted)"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "14px 18px"
    }
  }, setupMode || showManageFields ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, "Define your columns. Date and Notes are always included."), (draftFields || []).map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    style: {
      flex: 1
    },
    placeholder: "Field name",
    value: f.name,
    onChange: e => setDraftFields(prev => prev.map((x, j) => j === i ? {
      ...x,
      name: e.target.value
    } : x))
  }), /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    style: {
      width: 90
    },
    value: f.type,
    onChange: e => setDraftFields(prev => prev.map((x, j) => j === i ? {
      ...x,
      type: e.target.value
    } : x))
  }, /*#__PURE__*/React.createElement("option", null, "Text"), /*#__PURE__*/React.createElement("option", null, "Number"), /*#__PURE__*/React.createElement("option", null, "Date"), /*#__PURE__*/React.createElement("option", null, "Yes/No")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-sm",
    onClick: () => setDraftFields(prev => prev.filter((_, j) => j !== i))
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13
  })))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline btn-sm",
    style: {
      width: "100%",
      marginTop: 4
    },
    onClick: () => setDraftFields(prev => [...(prev || []), {
      id: uid(),
      name: "",
      type: "Text"
    }])
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 13
  }), " Add field")) : /*#__PURE__*/React.createElement("div", null, activeFields.map(f => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, f.name), f.type === "Date" ? /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: `form-input${errors[f.id] ? " error" : ""}`,
    value: form[f.id] || TODAY(),
    onChange: e => {
      setForm(p => ({
        ...p,
        [f.id]: e.target.value
      }));
      setErrors(p => ({
        ...p,
        [f.id]: null
      }));
    }
  }) : f.type === "Number" ? /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${errors[f.id] ? " error" : ""}`,
    placeholder: "0",
    value: form[f.id] || "",
    onChange: e => {
      setForm(p => ({
        ...p,
        [f.id]: e.target.value
      }));
      setErrors(p => ({
        ...p,
        [f.id]: null
      }));
    }
  }) : f.type === "Yes/No" ? /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    value: form[f.id] || "",
    onChange: e => {
      setForm(p => ({
        ...p,
        [f.id]: e.target.value
      }));
      setErrors(p => ({
        ...p,
        [f.id]: null
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Select"), /*#__PURE__*/React.createElement("option", null, "Yes"), /*#__PURE__*/React.createElement("option", null, "No")) : /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors[f.id] ? " error" : ""}`,
    placeholder: `Enter ${f.name}`,
    value: form[f.id] || "",
    onChange: e => {
      setForm(p => ({
        ...p,
        [f.id]: e.target.value
      }));
      setErrors(p => ({
        ...p,
        [f.id]: null
      }));
    }
  }), errors[f.id] && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors[f.id]))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px 20px",
      borderTop: `1px solid var(--border)`,
      flexShrink: 0,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => {
      setShowEntryForm(false);
      setSetupMode(!fields);
      setShowManageFields(false);
      setEditId(null);
      setForm({});
    }
  }, "Cancel"), setupMode || showManageFields ? /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2
    },
    onClick: () => {
      const combined = [...defaultFields, ...(draftFields || []).filter(f => f.name.trim())];
      saveCurrentFields(combined);
    }
  }, "\uD83D\uDCBE Save Fields") : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2,
      background: "linear-gradient(135deg,#5B21B6,#7C3AED)"
    },
    onClick: saveEntry
  }, editId ? "✅ Update" : "💾 Save Record")))), viewEntry && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setViewEntry(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 24,
      width: "100%",
      maxWidth: 480,
      maxHeight: "80vh",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 24px 60px rgba(0,0,0,0.3)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 20px 14px",
      borderBottom: `1px solid var(--border)`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 12,
      background: "var(--primary-light)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20
    }
  }, "\uD83D\uDC64"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--text)"
    }
  }, viewEntry[orderedFields[0]?.id] || "Record"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, "Added ", new Date(viewEntry.createdAt || Date.now()).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setViewEntry(null),
    style: {
      background: "var(--bg)",
      border: "none",
      width: 32,
      height: 32,
      borderRadius: "50%",
      cursor: "pointer",
      fontSize: 18,
      color: "var(--text-muted)"
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: "16px 20px"
    }
  }, orderedFields.map((f, i) => {
    const val = viewEntry[f.id];
    if (!val && val !== 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: f.id,
      style: {
        marginBottom: 14,
        paddingBottom: 14,
        borderBottom: i < orderedFields.length - 1 ? `0.5px solid var(--border)` : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        color: "var(--text-muted)",
        textTransform: "uppercase",
        letterSpacing: "0.07em",
        marginBottom: 5
      }
    }, f.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "var(--text)",
        lineHeight: 1.5,
        wordBreak: "break-word"
      }
    }, val));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 20px 20px",
      borderTop: `1px solid var(--border)`,
      display: "flex",
      gap: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setViewEntry(null)
  }, "Close"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2,
      background: "linear-gradient(135deg,#5B21B6,#7C3AED)"
    },
    onClick: () => {
      openEdit(viewEntry);
      setViewEntry(null);
    }
  }, "\u270F\uFE0F Edit Record")))), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: "Customer Records",
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      loadSheetJS(() => {
        try {
          const wb = window.XLSX.utils.book_new();
          // Current records sheet
          if (entries.length > 0) {
            const headers = activeFields.map(f => f.name);
            const rows = entries.map(e => activeFields.map(f => e[f.id] || ""));
            const ws = window.XLSX.utils.aoa_to_sheet([headers, ...rows]);
            window.XLSX.utils.book_append_sheet(wb, ws, "Current Records");
          }
          // Archived group sheets
          (groups || []).forEach(grp => {
            if (!grp.entries?.length) return;
            const gF = grp.fields || defaultFields;
            const headers = gF.map(f => f.name);
            const rows = grp.entries.map(e => gF.map(f => e[f.id] || ""));
            const ws = window.XLSX.utils.aoa_to_sheet([headers, ...rows]);
            const sheetName = (grp.name || "Group").slice(0, 31).replace(/[^a-zA-Z0-9 _-]/g, "");
            window.XLSX.utils.book_append_sheet(wb, ws, sheetName || "Group");
          });
          if (wb.SheetNames.length === 0) {
            showToast("No data to export", "error");
            return;
          }
          window.XLSX.writeFile(wb, `CustomerRecords_${TODAY()}.xlsx`);
          setShowExport(false);
          showToast("Excel downloaded!");
        } catch (e) {
          showToast("Export failed: " + e.message, "error");
        }
      });
    },
    onPDFExport: () => {
      const headers = activeFields.map(f => f.name);
      const rows = entries.map(e => activeFields.map(f => e[f.id] || ""));
      exportToPDF("Customer Records", headers, rows, "CustomerRecords");
      setShowExport(false);
    }
  }));
}
function RestockRow({
  itemId,
  onRestock,
  onRemove,
  onUpdatePrice,
  currentPrice
}) {
  const [qty, setQty] = useState("");
  const [mode, setMode] = useState(null); // null | "restock" | "price"
  const [newPrice, setNewPrice] = useState("");
  const addStock = () => {
    const q = parseInt(qty);
    if (!q || q <= 0) return;
    onRestock(itemId, q);
    setQty("");
    setMode(null);
  };
  const savePrice = () => {
    const p = parseFloat(newPrice);
    if (!p || p <= 0) return;
    onUpdatePrice(itemId, p);
    setNewPrice("");
    setMode(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, mode === "restock" ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-input",
    placeholder: "Qty to add",
    min: "1",
    value: qty,
    onChange: e => setQty(e.target.value),
    onKeyDown: e => e.key === "Enter" && addStock(),
    style: {
      flex: 1,
      padding: "7px 10px",
      fontSize: 13
    },
    autoFocus: true
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-sm",
    onClick: addStock,
    style: {
      whiteSpace: "nowrap"
    }
  }, "Add"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline btn-sm",
    onClick: () => {
      setMode(null);
      setQty("");
    }
  }, "\u2715")) : mode === "price" ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginBottom: 6,
      fontWeight: 600
    }
  }, "Current: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.primary
    }
  }, NAIRA(currentPrice)), " \u2014 New price:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      color: COLORS.textMuted,
      fontSize: 15,
      fontWeight: 700,
      zIndex: 1,
      pointerEvents: "none"
    }
  }, "\u20A6"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: "form-input",
    placeholder: String(currentPrice),
    min: "1",
    value: newPrice,
    onChange: e => setNewPrice(e.target.value),
    onKeyDown: e => e.key === "Enter" && savePrice(),
    autoFocus: true,
    style: {
      paddingLeft: 28,
      fontSize: 18,
      height: 48,
      fontWeight: 700,
      fontFamily: "'Space Mono', monospace",
      width: "100%",
      boxSizing: "border-box"
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: savePrice,
    style: {
      height: 48,
      width: 44,
      flexShrink: 0,
      background: COLORS.primary,
      color: "#fff",
      border: "none",
      borderRadius: 9,
      fontSize: 20,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setMode(null);
      setNewPrice("");
    },
    style: {
      height: 48,
      width: 36,
      flexShrink: 0,
      background: "none",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 9,
      fontSize: 15,
      cursor: "pointer",
      color: COLORS.textMuted,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "\u2715"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-sm",
    style: {
      flex: 2,
      fontSize: 12
    },
    onClick: () => setMode("restock")
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 13
  }), " Restock"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setNewPrice(String(currentPrice));
      setMode("price");
    },
    style: {
      flex: 2,
      background: COLORS.amberLight,
      border: `1px solid #FCD34D`,
      borderRadius: 8,
      padding: "5px 8px",
      fontSize: 11,
      fontWeight: 700,
      color: COLORS.amber,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 4
    }
  }, "\u270F\uFE0F Price"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger btn-sm",
    onClick: () => onRemove(itemId)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: 13
  }))));
}

// ===================== SHOP MODE =====================
function ShopScreen({
  user
}) {
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
  const [form, setForm] = useState({
    itemId: "",
    qty: ""
  });
  const [invForm, setInvForm] = useState({
    name: "",
    price: "",
    stock: ""
  });
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
  const showToast = (msg, type = "success") => setToast({
    msg,
    type
  });
  const todaySales = sales.filter(s => s.date === TODAY());
  const todayTotal = todaySales.reduce((a, s) => a + s.total, 0);
  const selectedItem = inventory.find(i => i.id === form.itemId);
  const addItem = () => {
    const e = {};
    if (!invForm.name.trim()) e.name = "Item name required";
    if (!invForm.price || isNaN(invForm.price)) e.price = "Enter a valid price";
    if (!invForm.stock || isNaN(invForm.stock)) e.stock = "Enter initial stock";
    if (Object.keys(e).length) {
      setInvErrors(e);
      return;
    }
    const item = {
      id: uid(),
      name: invForm.name.trim(),
      price: parseFloat(invForm.price),
      stock: parseInt(invForm.stock),
      createdAt: TS()
    };
    setInventory(prev => [...prev, item]);
    setInvForm({
      name: "",
      price: "",
      stock: ""
    });
    showToast(`${item.name} added to inventory!`);
  };
  const recordSale = () => {
    const e = {};
    if (!form.itemId) e.itemId = "Select an item";
    const qty = parseInt(form.qty);
    if (!qty || qty <= 0) e.qty = "Enter valid quantity";else if (selectedItem && qty > selectedItem.stock) e.qty = `Only ${selectedItem.stock} in stock`;
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const sale = {
      id: uid(),
      itemId: form.itemId,
      itemName: selectedItem.name,
      qty,
      price: selectedItem.price,
      total: qty * selectedItem.price,
      date: TODAY(),
      createdAt: TS()
    };
    setSales(prev => [sale, ...prev]);
    setInventory(prev => prev.map(i => i.id === form.itemId ? {
      ...i,
      stock: i.stock - qty
    } : i));
    setForm({
      itemId: "",
      qty: ""
    });
    setErrors({});
    setShowSaleForm(false);
    showToast(`Sale recorded! ${NAIRA(sale.total)}`);
  };
  const removeItem = id => {
    setInventory(prev => prev.filter(i => i.id !== id));
    showToast("Item removed", "error");
  };
  const deleteSale = id => {
    setSales(prev => prev.map(s => s.id === id ? {
      ...s,
      archived: true
    } : s));
    showToast("Sale moved to archive", "error");
  };
  const restoreSale = id => {
    setSales(prev => prev.map(s => s.id === id ? {
      ...s,
      archived: false
    } : s));
    showToast("Sale restored!");
  };
  const addStock = (id, qty) => {
    setInventory(prev => prev.map(i => i.id === id ? {
      ...i,
      stock: i.stock + qty
    } : i));
    showToast("Stock updated!");
  };
  const updatePrice = (id, price) => {
    setInventory(prev => prev.map(i => i.id === id ? {
      ...i,
      price
    } : i));
    showToast("Price updated!");
  };
  const filteredSales = sales.filter(s => !search || s.itemName.toLowerCase().includes(search.toLowerCase()));
  const allTimeSales = sales.reduce((a, s) => a + s.total, 0);
  const getPeriodRange = () => {
    const now = new Date();
    const fmt = d => d.toISOString().slice(0, 10);
    if (period === "today") {
      const t = fmt(now);
      return {
        from: t,
        to: t
      };
    }
    if (period === "week") {
      const d = new Date(now);
      d.setDate(d.getDate() - 6);
      return {
        from: fmt(d),
        to: fmt(now)
      };
    }
    if (period === "month") {
      return {
        from: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`,
        to: fmt(now)
      };
    }
    if (period === "year") {
      return {
        from: `${now.getFullYear()}-01-01`,
        to: fmt(now)
      };
    }
    return {
      from: customFrom,
      to: customTo
    };
  };
  const {
    from: pFrom,
    to: pTo
  } = getPeriodRange();
  const periodSalesTotal = sales.filter(s => s.date && (!pFrom || s.date >= pFrom) && (!pTo || s.date <= pTo)).reduce((a, s) => a + s.total, 0);
  const periodSalesCount = sales.filter(s => s.date && (!pFrom || s.date >= pFrom) && (!pTo || s.date <= pTo)).length;
  const periodLabel = {
    today: "Today",
    week: "This Week",
    month: "This Month",
    year: "This Year",
    custom: "Custom"
  }[period];
  const lowStockItems = inventory.filter(i => i.stock > 0 && i.stock < 5);
  const outOfStockItems = inventory.filter(i => i.stock === 0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
      borderRadius: 18,
      padding: "18px 18px 16px",
      marginBottom: "1rem",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.06)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      marginBottom: 4
    }
  }, "\uD83C\uDFEA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: "-0.3px"
    }
  }, "Shop Sales"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      marginTop: 2
    }
  }, inventory.length, " items tracked \xB7 ", sales.length, " total sales")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExport(true),
    style: {
      background: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: 10,
      padding: "7px 12px",
      color: "#fff",
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 13
  }), " Export")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.65,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 6
    }
  }, "View Period Sale"), /*#__PURE__*/React.createElement("select", {
    value: period,
    onChange: e => setPeriod(e.target.value),
    style: {
      width: "100%",
      padding: "9px 12px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.35)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      fontSize: 13,
      fontWeight: 600,
      fontFamily: "'Inter', sans-serif",
      outline: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "today",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "Today"), /*#__PURE__*/React.createElement("option", {
    value: "week",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "This Week"), /*#__PURE__*/React.createElement("option", {
    value: "month",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "This Month"), /*#__PURE__*/React.createElement("option", {
    value: "year",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "This Year"), /*#__PURE__*/React.createElement("option", {
    value: "custom",
    style: {
      color: "#000",
      background: "#fff"
    }
  }, "Custom Range")), period === "custom" && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.6,
      fontWeight: 600,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "From"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: customFrom,
    onChange: e => setCustomFrom(e.target.value),
    style: {
      width: "100%",
      padding: "7px 10px",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      fontSize: 12,
      fontFamily: "'Inter', sans-serif",
      outline: "none"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.6,
      fontWeight: 600,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "To"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: customTo,
    onChange: e => setCustomTo(e.target.value),
    style: {
      width: "100%",
      padding: "7px 10px",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.3)",
      background: "rgba(255,255,255,0.15)",
      color: "#fff",
      fontSize: 12,
      fontFamily: "'Inter', sans-serif",
      outline: "none"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.14)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.65,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Today's Sales"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 15,
      fontWeight: 700,
      marginTop: 4
    }
  }, NAIRA(todayTotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, todaySales.length, " transaction", todaySales.length !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.22)",
      borderRadius: 12,
      padding: "10px 12px",
      border: "1px solid rgba(255,255,255,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.85,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, periodLabel), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 15,
      fontWeight: 700,
      marginTop: 4
    }
  }, NAIRA(periodSalesTotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.6,
      marginTop: 1
    }
  }, periodSalesCount, " sale", periodSalesCount !== 1 ? "s" : ""))))), (lowStockItems.length > 0 || outOfStockItems.length > 0) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.75rem",
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, outOfStockItems.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.dangerLight,
      border: `1px solid #FCA5A5`,
      borderRadius: 10,
      padding: "8px 14px",
      fontSize: 12,
      color: COLORS.danger,
      fontWeight: 600,
      display: "flex",
      gap: 8
    }
  }, "\uD83D\uDEAB ", outOfStockItems.map(i => i.name).join(", "), " \u2014 out of stock"), lowStockItems.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.amberLight,
      border: `1px solid #FCD34D`,
      borderRadius: 10,
      padding: "8px 14px",
      fontSize: 12,
      color: COLORS.amber,
      fontWeight: 600,
      display: "flex",
      gap: 8
    }
  }, "\u26A0\uFE0F Low stock: ", lowStockItems.map(i => `${i.name} (${i.stock})`).join(", "))), /*#__PURE__*/React.createElement("div", {
    className: "tab-bar"
  }, /*#__PURE__*/React.createElement("button", {
    className: `tab-btn${tab === "history" ? " active" : ""}`,
    onClick: () => setTab("history")
  }, "Sales History"), /*#__PURE__*/React.createElement("button", {
    className: `tab-btn${tab === "inventory" ? " active" : ""}`,
    onClick: () => setTab("inventory")
  }, "Inventory (", inventory.length, ")")), tab === "history" && (() => {
    // Best-selling items (all time)
    const itemTotals = {};
    sales.filter(s => !s.archived).forEach(s => {
      if (!itemTotals[s.itemName]) itemTotals[s.itemName] = {
        name: s.itemName,
        qty: 0,
        revenue: 0
      };
      itemTotals[s.itemName].qty += s.qty;
      itemTotals[s.itemName].revenue += s.total;
    });
    const topItems = Object.values(itemTotals).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    const maxRevenue = topItems[0]?.revenue || 1;
    const base = sales.filter(s => {
      if (!s.date) return false;
      if (s.archived) return false;
      if (tagFilter && s.tag !== tagFilter) return false;
      return (!pFrom || s.date >= pFrom) && (!pTo || s.date <= pTo);
    });
    const filtered = base.filter(s => !search || s.itemName.toLowerCase().includes(search.toLowerCase()));
    const sorted = [...filtered].sort((a, b) => {
      switch (salesSortBy) {
        case "date_desc":
          return b.date.localeCompare(a.date);
        case "date_asc":
          return a.date.localeCompare(b.date);
        case "amount_desc":
          return b.total - a.total;
        case "amount_asc":
          return a.total - b.total;
        case "name_asc":
          return a.itemName.localeCompare(b.itemName);
        case "name_desc":
          return b.itemName.localeCompare(a.itemName);
        default:
          return 0;
      }
    });
    return /*#__PURE__*/React.createElement("div", null, topItems.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "0.75rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: COLORS.text,
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, "\uD83C\uDFC6 Best-Selling Items"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, topItems.map((item, i) => /*#__PURE__*/React.createElement("div", {
      key: item.name
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 800,
        color: i === 0 ? "#D97706" : i === 1 ? "#64748B" : i === 2 ? "#92400E" : COLORS.textMuted,
        width: 16
      }
    }, "#", i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: COLORS.text
      }
    }, item.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 12,
        fontWeight: 700,
        color: COLORS.accent
      }
    }, NAIRA(item.revenue)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, item.qty, " sold"))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 5,
        borderRadius: 3,
        background: COLORS.bg,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        borderRadius: 3,
        background: i === 0 ? "#D97706" : COLORS.accent,
        width: `${item.revenue / maxRevenue * 100}%`,
        transition: "width 0.5s"
      }
    })))))), (() => {
      const allTags = [...new Set(sales.filter(s => s.tag).map(s => s.tag))];
      return allTags.length > 0 ? /*#__PURE__*/React.createElement("div", {
        className: "chip-row",
        style: {
          marginBottom: "0.65rem"
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => setTagFilter(""),
        style: {
          padding: "4px 11px",
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          border: tagFilter === "" ? `1.5px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
          background: tagFilter === "" ? COLORS.primaryLight : COLORS.surface,
          color: tagFilter === "" ? COLORS.primary : COLORS.textMuted
        }
      }, "All"), allTags.map(tag => /*#__PURE__*/React.createElement("button", {
        key: tag,
        onClick: () => setTagFilter(t => t === tag ? "" : tag),
        style: {
          padding: "4px 11px",
          borderRadius: 20,
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
          fontFamily: "'Inter', sans-serif",
          border: tagFilter === tag ? `1.5px solid ${COLORS.primary}` : `1px solid ${COLORS.border}`,
          background: tagFilter === tag ? COLORS.primaryLight : COLORS.surface,
          color: tagFilter === tag ? COLORS.primary : COLORS.textMuted
        }
      }, "\uD83C\uDFF7\uFE0F ", tag))) : null;
    })(), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        marginBottom: "0.75rem",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 12,
        top: "50%",
        transform: "translateY(-50%)",
        color: COLORS.textLight,
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })), /*#__PURE__*/React.createElement("input", {
      className: "search-bar",
      style: {
        paddingRight: search ? 32 : 12
      },
      placeholder: "Search by item name\u2026",
      value: search,
      onChange: e => setSearch(e.target.value)
    }), search && /*#__PURE__*/React.createElement("button", {
      onClick: () => setSearch(""),
      style: {
        position: "absolute",
        right: 10,
        top: "50%",
        transform: "translateY(-50%)",
        background: COLORS.border,
        border: "none",
        borderRadius: "50%",
        width: 18,
        height: 18,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.textMuted,
        fontSize: 11
      }
    }, "\u2715")), /*#__PURE__*/React.createElement("select", {
      value: salesSortBy,
      onChange: e => setSalesSortBy(e.target.value),
      style: {
        flexShrink: 0,
        padding: "9px 10px",
        borderRadius: 10,
        border: `1.5px solid ${COLORS.border}`,
        background: COLORS.surface,
        fontSize: 12,
        fontWeight: 600,
        color: COLORS.text,
        fontFamily: "'Inter', sans-serif",
        outline: "none",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: "date_desc"
    }, "\uD83D\uDCC5 Newest"), /*#__PURE__*/React.createElement("option", {
      value: "date_asc"
    }, "\uD83D\uDCC5 Oldest"), /*#__PURE__*/React.createElement("option", {
      value: "amount_desc"
    }, "\uD83D\uDCB0 High \u2192 Low"), /*#__PURE__*/React.createElement("option", {
      value: "amount_asc"
    }, "\uD83D\uDCB0 Low \u2192 High"), /*#__PURE__*/React.createElement("option", {
      value: "name_asc"
    }, "\uD83D\uDD24 A \u2192 Z"), /*#__PURE__*/React.createElement("option", {
      value: "name_desc"
    }, "\uD83D\uDD24 Z \u2192 A"))), search && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginBottom: 8
      }
    }, sorted.length, " result", sorted.length !== 1 ? "s" : "", " for \"", /*#__PURE__*/React.createElement("strong", null, search), "\""), sorted.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: "3rem 1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 48,
        marginBottom: 12
      }
    }, "\uD83D\uDED2"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: COLORS.text,
        marginBottom: 6
      }
    }, search ? `No results for "${search}"` : `No sales for ${periodLabel.toLowerCase()}`), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: COLORS.textMuted
      }
    }, sales.length === 0 ? "Tap the + button to record your first sale" : "Try a different search or period")) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, sorted.map(s => /*#__PURE__*/React.createElement("div", {
      key: s.id,
      style: {
        background: "#fff",
        borderRadius: 14,
        border: `1px solid ${COLORS.border}`,
        padding: "12px 14px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 11,
        background: COLORS.accentLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        flexShrink: 0
      }
    }, "\uD83D\uDECD\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, s.itemName), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2,
        display: "flex",
        gap: 8,
        flexWrap: "wrap",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCC5 ", s.date), /*#__PURE__*/React.createElement("span", null, "\xD7", s.qty, " @ ", NAIRA(s.price)), s.tag && /*#__PURE__*/React.createElement("span", {
      style: {
        background: COLORS.primaryLight,
        color: COLORS.primary,
        borderRadius: 6,
        padding: "1px 7px",
        fontWeight: 600,
        fontSize: 10
      }
    }, "\uD83C\uDFF7\uFE0F ", s.tag))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 15,
        fontWeight: 700,
        color: COLORS.accent,
        flexShrink: 0
      }
    }, NAIRA(s.total))))));
  })(), tab === "inventory" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setInvFormOpen(v => !v),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      background: invFormOpen ? COLORS.primaryLight : COLORS.surface,
      border: `1.5px solid ${invFormOpen ? COLORS.primary : COLORS.border}`,
      borderRadius: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: 600,
      color: invFormOpen ? COLORS.primary : COLORS.text,
      marginBottom: invFormOpen ? 0 : "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Add New Item"), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    style: {
      transform: invFormOpen ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.2s"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), invFormOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      border: `1.5px solid ${COLORS.primary}`,
      borderTop: "none",
      borderRadius: "0 0 12px 12px",
      padding: "14px",
      marginBottom: "0.75rem",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Item Name"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${invErrors.name ? " error" : ""}`,
    placeholder: "e.g. Rice 50kg",
    value: invForm.name,
    onChange: e => {
      setInvForm(p => ({
        ...p,
        name: e.target.value
      }));
      setInvErrors(p => ({
        ...p,
        name: null
      }));
    }
  }), invErrors.name && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, invErrors.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Price (\u20A6)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${invErrors.price ? " error" : ""}`,
    placeholder: "0.00",
    value: invForm.price,
    onChange: e => {
      setInvForm(p => ({
        ...p,
        price: e.target.value
      }));
      setInvErrors(p => ({
        ...p,
        price: null
      }));
    }
  }), invErrors.price && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, invErrors.price)), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Initial Stock"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${invErrors.stock ? " error" : ""}`,
    placeholder: "0",
    value: invForm.stock,
    onChange: e => {
      setInvForm(p => ({
        ...p,
        stock: e.target.value
      }));
      setInvErrors(p => ({
        ...p,
        stock: null
      }));
    }
  }), invErrors.stock && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, invErrors.stock))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: () => {
      addItem();
      setInvFormOpen(false);
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 15
  }), " Add to Inventory")), inventory.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "3rem 1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      marginBottom: 12
    }
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "No items yet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Tap \"Add New Item\" above to stock your shop")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, inventory.map(item => {
    const stockColor = item.stock === 0 ? COLORS.danger : item.stock < 5 ? COLORS.amber : COLORS.accent;
    const stockBg = item.stock === 0 ? COLORS.dangerLight : item.stock < 5 ? COLORS.amberLight : COLORS.accentLight;
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      style: {
        background: "#fff",
        borderRadius: 14,
        overflow: "hidden",
        border: `1px solid ${item.stock === 0 ? "#FCA5A5" : item.stock < 5 ? "#FCD34D" : COLORS.border}`,
        boxShadow: "0 1px 3px rgba(15,23,42,0.04)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 3,
        background: stockColor
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 14px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 11,
        background: stockBg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, item.stock === 0 ? "🚫" : item.stock < 5 ? "⚠️" : "📦"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.text
      }
    }, item.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, NAIRA(item.price), " per unit")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 15,
        fontWeight: 700,
        color: stockColor
      }
    }, item.stock), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: stockColor,
        fontWeight: 600,
        textTransform: "uppercase"
      }
    }, item.stock === 0 ? "out of stock" : "in stock"))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 3,
        background: COLORS.bg,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        borderRadius: 3,
        background: stockColor,
        width: `${Math.min(100, item.stock / Math.max(item.stock, 20) * 100)}%`,
        transition: "width 0.3s"
      }
    }))), /*#__PURE__*/React.createElement(RestockRow, {
      itemId: item.id,
      onRestock: addStock,
      onRemove: removeItem,
      onUpdatePrice: updatePrice,
      currentPrice: item.price
    })));
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowShopAction(true),
    title: "Add sale or stock",
    style: {
      position: "fixed",
      bottom: "calc(28px + var(--fab-lift, 0px))",
      right: 28,
      zIndex: 200,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryDark})`,
      color: "#fff",
      border: "none",
      boxShadow: "0 4px 18px rgba(37,99,235,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "transform 0.15s, box-shadow 0.15s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = "scale(1.1)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }))), showShopAction && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background: "rgba(0,0,0,0.5)"
    },
    onClick: () => setShowShopAction(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 22,
      padding: "28px 20px 20px",
      width: "100%",
      maxWidth: 340,
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.2s cubic-bezier(0.4,0,0.2,1)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 10
    }
  }, "\uD83C\uDFEA"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: COLORS.text
    }
  }, "What would you like to do?")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowShopAction(false);
      setForm({
        itemId: "",
        qty: ""
      });
      setErrors({});
      setShowSaleForm(true);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "16px",
      background: COLORS.accentLight,
      border: `2px solid #6EE7B7`,
      borderRadius: 16,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 14,
      background: COLORS.accent,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      flexShrink: 0
    }
  }, "\uD83D\uDECD\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.text
    }
  }, "Record a Sale"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Log a new sale from your inventory"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowShopAction(false);
      setTab("inventory");
      setInvFormOpen(true);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "16px",
      background: COLORS.primaryLight,
      border: `2px solid #BFDBFE`,
      borderRadius: 16,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 14,
      background: COLORS.primary,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 24,
      flexShrink: 0
    }
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: COLORS.text
    }
  }, "Add New Stock"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "Add a new item or restock inventory")))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowShopAction(false),
    style: {
      width: "100%",
      marginTop: 14,
      padding: "10px",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: 14,
      color: COLORS.textMuted,
      fontFamily: "'Inter', sans-serif"
    }
  }, "Cancel"))), showSaleForm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      background: "rgba(0,0,0,0.5)"
    },
    onClick: () => setShowSaleForm(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      width: "100%",
      maxWidth: 420,
      maxHeight: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.22s cubic-bezier(0.4,0,0.2,1)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 14px",
      borderBottom: `1px solid ${COLORS.border}`,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: COLORS.accentLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20
    }
  }, "\uD83D\uDECD\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "Record Sale")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowSaleForm(false),
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      padding: "16px 18px",
      flex: 1,
      WebkitOverflowScrolling: "touch"
    }
  }, inventory.filter(i => i.stock > 0).length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "2rem 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 10
    }
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "No items in stock"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Switch to the Inventory tab to add items first.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Today's Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-input",
    defaultValue: TODAY(),
    readOnly: true,
    style: {
      background: COLORS.bg,
      color: COLORS.textMuted
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Select Item"), /*#__PURE__*/React.createElement("select", {
    className: `form-input${errors.itemId ? " error" : ""}`,
    value: form.itemId,
    onChange: e => {
      setForm(p => ({
        ...p,
        itemId: e.target.value
      }));
      setErrors(p => ({
        ...p,
        itemId: null
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Choose item \u2014"), inventory.filter(i => i.stock > 0).map(i => /*#__PURE__*/React.createElement("option", {
    key: i.id,
    value: i.id
  }, i.name, " (", i.stock, " left) \u2014 ", NAIRA(i.price)))), errors.itemId && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.itemId)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Quantity Sold"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${errors.qty ? " error" : ""}`,
    placeholder: "1",
    min: "1",
    value: form.qty,
    onChange: e => {
      setForm(p => ({
        ...p,
        qty: e.target.value
      }));
      setErrors(p => ({
        ...p,
        qty: null
      }));
    }
  }), errors.qty && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.qty)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "\uD83C\uDFF7\uFE0F Tag (optional)"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    placeholder: "e.g. Wholesale, Retail, Online\u2026",
    value: saleTag,
    onChange: e => setSaleTag(e.target.value)
  })), selectedItem && form.qty && parseInt(form.qty) > 0 && !errors.qty && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.accentLight,
      border: `1px solid #6EE7B7`,
      borderRadius: 14,
      padding: "14px 16px",
      marginBottom: 8,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.accent,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Total Amount"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, form.qty, " \xD7 ", NAIRA(selectedItem.price))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 24,
      fontWeight: 700,
      color: COLORS.accent
    }
  }, NAIRA(parseInt(form.qty || 0) * selectedItem.price))))), inventory.filter(i => i.stock > 0).length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 18px 16px",
      borderTop: `1px solid ${COLORS.border}`,
      flexShrink: 0,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setShowSaleForm(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2
    },
    onClick: recordSale
  }, "Record Sale")))), confirmDeleteFarm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setConfirmDeleteFarm(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 340
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 8
    }
  }, "\uD83D\uDDD1\uFE0F Delete Farm?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 20,
      lineHeight: 1.6
    }
  }, "This will permanently delete the farm and all its expense records. This cannot be undone."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setConfirmDeleteFarm(null)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    style: {
      flex: 1,
      fontWeight: 800
    },
    onClick: () => doDeleteFarm(confirmDeleteFarm)
  }, "Delete")))), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: "Shop Sales",
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      const headers = ["Date", "Item", "Qty", "Price (₦)", "Total (₦)"];
      const rows = sales.map(s => [s.date, s.itemName, s.qty, s.price, s.total]);
      exportToExcel("Shop_Sales_" + TODAY(), "Sales", rows, headers);
      setShowExport(false);
      showToast("Excel file downloaded!");
    },
    onPDFExport: () => {
      const headers = ["Date", "Item", "Qty", "Price (₦)", "Total (₦)"];
      const rows = sales.map(s => [s.date, s.itemName, s.qty, s.price, s.total]);
      exportToPDF("Shop Sales — Export", headers, rows, "Shop_Sales");
      setShowExport(false);
    }
  }));
}

// ===================== FARM MODE =====================
const FARM_CATS = ["Seeds", "Fertilizer", "Labor", "Transport", "Equipment", "Others"];
function FarmScreen({
  user
}) {
  const FG = {
    dark: "#1B4332",
    main: "#2D6A4F",
    mid: "#40916C",
    light: "#74C69D",
    pale: "#D8F3DC",
    surface: "#F0FAF4",
    border: "#B7E4C7"
  };
  const catMeta = {
    Seeds: {
      icon: "🌱",
      bg: "#E9F5DB",
      color: "#386641"
    },
    Fertilizer: {
      icon: "🧪",
      bg: "#EAF4FB",
      color: "#1B6CA8"
    },
    Labor: {
      icon: "👷",
      bg: "#FEF3E2",
      color: "#D4820A"
    },
    Transport: {
      icon: "🚛",
      bg: "#EAF4FB",
      color: "#1B6CA8"
    },
    Equipment: {
      icon: "⚙️",
      bg: "#F3EFFE",
      color: "#6B3FA0"
    },
    Others: {
      icon: "📦",
      bg: "#F4F6FA",
      color: "#6B7280"
    }
  };

  //    Multi-farm: farms list stored separately   
  const farmsKey = `sl_farms_${user.uid}`;
  const expKey = fid => `sl_farm_${user.uid}_${fid}`;
  const legacyKey = `sl_farm_${user.uid}`; // old single-farm key

  const [farms, setFarms] = useLocalState(farmsKey, null);
  const [activeFarm, setActiveFarm] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [showFarmMgr, setShowFarmMgr] = useState(false);
  const [newFarmName, setNewFarmName] = useState("");
  const [form, setForm] = useState({
    date: TODAY(),
    desc: "",
    amount: "",
    category: "Others"
  });
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [filterCat, setFilterCat] = useState("All");
  const showToast = (msg, type = "success") => setToast({
    msg,
    type
  });

  //    Migrate legacy single-farm data on first load   
  useEffect(() => {
    let initialFarms = farms;
    if (!initialFarms) {
      // First time   check if there's legacy data
      const legacyData = (() => {
        try {
          return JSON.parse(localStorage.getItem(legacyKey)) || [];
        } catch {
          return [];
        }
      })();
      const firstFarm = {
        id: uid(),
        name: "My Farm",
        createdAt: TS()
      };
      initialFarms = [firstFarm];
      setFarms(initialFarms);
      if (legacyData.length > 0) {
        // Migrate old data to new farm-specific key
        localStorage.setItem(expKey(firstFarm.id), JSON.stringify(legacyData));
      }
    }
    if (initialFarms.length > 0 && !activeFarm) {
      setActiveFarm(initialFarms[0].id);
    }
  }, []);

  //    Load expenses when active farm changes   
  useEffect(() => {
    if (!activeFarm) return;
    const raw = (() => {
      try {
        return JSON.parse(localStorage.getItem(expKey(activeFarm))) || [];
      } catch {
        return [];
      }
    })();
    setExpenses(raw);
  }, [activeFarm]);

  //    Persist expenses to localStorage whenever they change   
  useEffect(() => {
    if (!activeFarm) return;
    localStorage.setItem(expKey(activeFarm), JSON.stringify(expenses));
    // Also write to legacy key for backward compat with sync
    const allExp = (farms || []).flatMap(f => {
      const k = expKey(f.id);
      try {
        return JSON.parse(localStorage.getItem(k)) || [];
      } catch {
        return [];
      }
    });
    localStorage.setItem(legacyKey, JSON.stringify(allExp));
  }, [expenses, activeFarm]);
  const addFarm = () => {
    const name = newFarmName.trim();
    if (!name) return;
    const newF = {
      id: uid(),
      name,
      createdAt: TS()
    };
    const updated = [...(farms || []), newF];
    setFarms(updated);
    setActiveFarm(newF.id);
    setNewFarmName("");
    setShowFarmMgr(false);
    showToast(`"${name}" farm created!`);
  };
  const [confirmDeleteFarm, setConfirmDeleteFarm] = useState(null);
  const deleteFarm = fid => {
    if ((farms || []).length <= 1) {
      showToast("Cannot delete your only farm", "error");
      return;
    }
    setConfirmDeleteFarm(fid); // show confirm modal
  };
  const doDeleteFarm = fid => {
    localStorage.removeItem(expKey(fid));
    const updated = (farms || []).filter(f => f.id !== fid);
    setFarms(updated);
    setActiveFarm(updated[0]?.id || null);
    setConfirmDeleteFarm(null);
    showToast("Farm deleted", "error");
  };
  const saveExpense = () => {
    const e = {};
    if (!form.desc.trim()) e.desc = "Description is required";
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    const exp = {
      id: uid(),
      ...form,
      amount: parseFloat(form.amount),
      farmId: activeFarm,
      createdAt: TS()
    };
    setExpenses(prev => [exp, ...prev]);
    setForm({
      date: TODAY(),
      desc: "",
      amount: "",
      category: form.category
    });
    setErrors({});
    setShowForm(false);
    showToast("Expense saved!");
  };
  const deleteExpense = id => {
    setExpenses(prev => prev.filter(e => e.id !== id));
    showToast("Deleted", "error");
  };
  const currentFarm = (farms || []).find(f => f.id === activeFarm);
  const filtered = expenses.filter(e => {
    const matchSearch = !search || e.desc.toLowerCase().includes(search.toLowerCase()) || e.date.includes(search);
    const matchCat = filterCat === "All" || e.category === filterCat;
    return matchSearch && matchCat;
  });
  const totalSpend = expenses.reduce((a, e) => a + e.amount, 0);
  const now = new Date();
  const thisMonth = expenses.filter(e => e.date.startsWith(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`));
  const monthTotal = thisMonth.reduce((a, e) => a + e.amount, 0);
  const byCategory = Object.entries(expenses.reduce((acc, e) => {
    const c = e.category || "Others";
    acc[c] = (acc[c] || 0) + e.amount;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg)",
      minHeight: "100%",
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "0.85rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      overflowX: "auto",
      paddingBottom: 4,
      scrollbarWidth: "none"
    }
  }, (farms || []).map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    onClick: () => {
      setActiveFarm(f.id);
      setSearch("");
      setFilterCat("All");
    },
    style: {
      flexShrink: 0,
      padding: "8px 16px",
      borderRadius: 20,
      border: "none",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: 700,
      background: activeFarm === f.id ? `linear-gradient(135deg, ${FG.dark}, ${FG.main})` : "var(--surface)",
      color: activeFarm === f.id ? "#fff" : "var(--text)",
      boxShadow: activeFarm === f.id ? `0 3px 12px ${FG.main}55` : "none",
      border: activeFarm !== f.id ? `1px solid var(--border)` : "none"
    }
  }, "\uD83C\uDF3E ", f.name)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowFarmMgr(true),
    style: {
      flexShrink: 0,
      padding: "8px 14px",
      borderRadius: 20,
      border: `1.5px dashed ${FG.mid}`,
      background: "transparent",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 13,
      fontWeight: 700,
      color: FG.mid,
      whiteSpace: "nowrap"
    }
  }, "+ Add Farm"))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${FG.dark} 0%, ${FG.main} 60%, ${FG.mid} 100%)`,
      borderRadius: 18,
      padding: "18px 18px 14px",
      marginBottom: "1rem",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 100,
      height: 100,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.06)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      marginBottom: 2
    }
  }, "\uD83C\uDF3E"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "#fff"
    }
  }, currentFarm?.name || "Farm", " Expenses"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "rgba(255,255,255,0.65)",
      marginTop: 3
    }
  }, expenses.length, " records \xB7 ", NAIRA(totalSpend), " total")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExport(true),
    style: {
      background: "rgba(255,255,255,0.18)",
      border: "none",
      borderRadius: 10,
      padding: "7px 12px",
      color: "#fff",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
      fontWeight: 700
    }
  }, "\uD83D\uDCE4 Export"), /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteFarm(activeFarm),
    style: {
      background: "rgba(255,80,80,0.2)",
      border: "none",
      borderRadius: 10,
      padding: "7px 10px",
      color: "#FCA5A5",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 11,
      fontWeight: 700
    }
  }, "\uD83D\uDDD1\uFE0F"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 14
    }
  }, [{
    label: "This Month",
    value: NAIRA(monthTotal)
  }, {
    label: "All Time",
    value: NAIRA(totalSpend)
  }, {
    label: "Records",
    value: expenses.length
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.12)",
      borderRadius: 10,
      padding: "8px 10px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      color: "#fff"
    }
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      color: "rgba(255,255,255,0.65)",
      marginTop: 2
    }
  }, s.label))))), byCategory.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 10
    }
  }, "Spend by Category"), byCategory.map(([cat, amt]) => {
    const meta = catMeta[cat] || catMeta.Others;
    const pct = totalSpend > 0 ? amt / totalSpend * 100 : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: cat,
      style: {
        marginBottom: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 600,
        color: "var(--text)"
      }
    }, meta.icon, " ", cat), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontFamily: "'Space Mono', monospace",
        color: meta.color,
        fontWeight: 700
      }
    }, NAIRA(amt))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        background: "var(--border)",
        borderRadius: 3,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        width: `${pct}%`,
        background: meta.color,
        borderRadius: 3,
        transition: "width 0.5s"
      }
    })));
  })), /*#__PURE__*/React.createElement(SmartSearch, {
    value: search,
    onChange: setSearch,
    placeholder: "Search expenses\u2026",
    resultCount: filtered.length
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      overflowX: "auto",
      marginBottom: "0.75rem",
      paddingBottom: 4,
      scrollbarWidth: "none"
    }
  }, ["All", ...Object.keys(catMeta)].map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setFilterCat(c),
    style: {
      flexShrink: 0,
      padding: "5px 12px",
      borderRadius: 16,
      border: "none",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontSize: 12,
      fontWeight: 600,
      background: filterCat === c ? FG.main : "var(--surface)",
      color: filterCat === c ? "#fff" : "var(--text-muted)",
      border: filterCat !== c ? `1px solid var(--border)` : "none"
    }
  }, c === "All" ? "All" : `${catMeta[c]?.icon} ${c}`))), filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83C\uDF3E"), /*#__PURE__*/React.createElement("h3", null, expenses.length === 0 ? "No expenses yet" : "No results"), /*#__PURE__*/React.createElement("p", null, expenses.length === 0 ? `Tap + to add your first expense for ${currentFarm?.name}` : "Try a different filter")) : /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, filtered.map((exp, i) => {
    const meta = catMeta[exp.category || "Others"] || catMeta.Others;
    return /*#__PURE__*/React.createElement("div", {
      key: exp.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 16px",
        borderBottom: i < filtered.length - 1 ? `0.5px solid var(--border)` : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: meta.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        flexShrink: 0
      }
    }, meta.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: "var(--text)",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, exp.desc), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)",
        marginTop: 2
      }
    }, exp.date, " \xB7 ", exp.category || "Others")), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 800,
        fontFamily: "'Space Mono', monospace",
        color: COLORS.danger
      }
    }, NAIRA(exp.amount)), /*#__PURE__*/React.createElement("button", {
      onClick: () => deleteExpense(exp.id),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: COLORS.danger,
        fontSize: 11,
        marginTop: 2,
        fontFamily: "'Inter', sans-serif"
      }
    }, "Delete")));
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowForm(true),
    style: {
      position: "fixed",
      bottom: "calc(28px + var(--fab-lift, 0px))",
      right: 28,
      zIndex: 200,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${FG.dark}, ${FG.mid})`,
      color: "#fff",
      border: "none",
      boxShadow: `0 4px 18px ${FG.main}66`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }))), showFarmMgr && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setShowFarmMgr(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 360,
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 16
    }
  }, "\uD83C\uDF3E Manage Farms"), (farms || []).map(f => /*#__PURE__*/React.createElement("div", {
    key: f.id,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: `0.5px solid var(--border)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text)",
      fontWeight: 600
    }
  }, "\uD83C\uDF3E ", f.name), (farms || []).length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => deleteFarm(f.id),
    style: {
      background: COLORS.dangerLight,
      border: "none",
      color: COLORS.danger,
      borderRadius: 7,
      padding: "4px 10px",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Delete"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 8
    }
  }, "Add a new farm:"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    style: {
      flex: 1
    },
    placeholder: "e.g. Ogun State Farm",
    value: newFarmName,
    onChange: e => setNewFarmName(e.target.value),
    onKeyDown: e => e.key === "Enter" && addFarm(),
    autoFocus: true
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: addFarm,
    style: {
      width: "auto",
      padding: "0 16px"
    }
  }, "Add"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowFarmMgr(false),
    style: {
      marginTop: 16,
      width: "100%",
      background: "none",
      border: "none",
      color: "var(--text-muted)",
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      padding: 8
    }
  }, "Done"))), showForm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setShowForm(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 400,
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 16
    }
  }, "\uD83C\uDF3E Add Expense \u2014 ", currentFarm?.name), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-input",
    value: form.date,
    onChange: e => setForm(p => ({
      ...p,
      date: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Description"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.desc ? " error" : ""}`,
    placeholder: "e.g. Bought fertilizer bags",
    value: form.desc,
    onChange: e => {
      setForm(p => ({
        ...p,
        desc: e.target.value
      }));
      setErrors(p => ({
        ...p,
        desc: null
      }));
    }
  }), errors.desc && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.desc)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Amount (\u20A6)"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${errors.amount ? " error" : ""}`,
    placeholder: "0",
    value: form.amount,
    onChange: e => {
      setForm(p => ({
        ...p,
        amount: e.target.value
      }));
      setErrors(p => ({
        ...p,
        amount: null
      }));
    }
  }), errors.amount && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.amount)), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Category"), /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    value: form.category,
    onChange: e => setForm(p => ({
      ...p,
      category: e.target.value
    }))
  }, Object.keys(catMeta).map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, catMeta[c].icon, " ", c))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setShowForm(false)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2,
      background: `linear-gradient(135deg, ${FG.dark}, ${FG.mid})`
    },
    onClick: saveExpense
  }, "\uD83D\uDCBE Save Expense")))), confirmDeleteFarm && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    },
    onClick: () => setConfirmDeleteFarm(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface)",
      borderRadius: 20,
      padding: 24,
      width: "100%",
      maxWidth: 340
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      color: "var(--text)",
      marginBottom: 8
    }
  }, "\uD83D\uDDD1\uFE0F Delete Farm?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 20,
      lineHeight: 1.6
    }
  }, "This will permanently delete the farm and all its expense records. This cannot be undone."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => setConfirmDeleteFarm(null)
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    style: {
      flex: 1,
      fontWeight: 800
    },
    onClick: () => doDeleteFarm(confirmDeleteFarm)
  }, "Delete")))), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: `${currentFarm?.name} — Expenditures`,
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      const headers = ["Date", "Description", "Category", "Amount (₦)"];
      const rows = expenses.map(e => [e.date, e.desc, e.category || "—", e.amount]);
      exportToExcel(`Farm_${currentFarm?.name}_${TODAY()}`, "Expenditures", rows, headers);
      setShowExport(false);
      showToast("Excel downloaded!");
    },
    onPDFExport: () => {
      const headers = ["Date", "Description", "Category", "Amount (₦)"];
      const rows = expenses.map(e => [e.date, e.desc, e.category || "—", e.amount]);
      exportToPDF(`${currentFarm?.name} — Farm Expenditures`, headers, rows, `Farm_${currentFarm?.name}`);
      setShowExport(false);
    }
  }));
}

// ===================== HISTORY / DASHBOARD =====================
function HistoryScreen({
  user
}) {
  const [showExport, setShowExport] = useState(false);
  const userSectors = user.sectors && user.sectors.length > 0 ? user.sectors : ["shop"];
  const salesData = userSectors.includes("sales") ? (() => {
    try {
      return JSON.parse(localStorage.getItem(`sl_sales_${user.uid}`)) || [];
    } catch {
      return [];
    }
  })() : [];
  const shopData = userSectors.includes("shop") ? (() => {
    try {
      return JSON.parse(localStorage.getItem(`sl_shopsales_${user.uid}`)) || [];
    } catch {
      return [];
    }
  })() : [];
  const farmData = userSectors.includes("farm") ? (() => {
    try {
      return JSON.parse(localStorage.getItem(`sl_farm_${user.uid}`)) || [];
    } catch {
      return [];
    }
  })() : [];
  const debtData = (() => {
    try {
      return JSON.parse(localStorage.getItem(`sl_debt_${user.uid}`)) || [];
    } catch {
      return [];
    }
  })();
  const now = new Date();
  const thisMonthStr = now.toISOString().slice(0, 7);
  const shopTotal = shopData.reduce((a, s) => a + s.total, 0);
  const shopMonthTotal = shopData.filter(s => s.date?.startsWith(thisMonthStr)).reduce((a, s) => a + s.total, 0);
  const farmTotal = farmData.reduce((a, e) => a + e.amount, 0);
  const farmMonthTotal = farmData.filter(e => e.date?.startsWith(thisMonthStr)).reduce((a, e) => a + e.amount, 0);
  const debtRemaining = r => Math.max(0, r.amount - (r.payments || []).reduce((a, p) => a + p.amount, 0));
  const debtCreditOut = debtData.filter(r => r.type === "credit" && !r.settled).reduce((a, r) => a + debtRemaining(r), 0);
  const debtCreditOwed = debtData.filter(r => r.type === "debt" && !r.settled).reduce((a, r) => a + debtRemaining(r), 0);
  const recentActivity = [...(userSectors.includes("shop") ? shopData.map(s => ({
    ...s,
    type: "shop",
    label: s.itemName,
    value: s.total,
    positive: true
  })) : []), ...(userSectors.includes("farm") ? farmData.map(e => ({
    ...e,
    type: "farm",
    label: e.desc,
    value: e.amount,
    positive: false
  })) : []), ...(userSectors.includes("sales") ? salesData.map(e => ({
    ...e,
    type: "sales",
    label: e.f_notes || "Sales entry",
    value: null,
    positive: true
  })) : []), ...debtData.map(r => ({
    ...r,
    type: "debtcredit",
    label: r.name,
    value: r.amount,
    positive: r.type === "credit"
  }))].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
  const sectorSummaryItems = [userSectors.includes("sales") && {
    icon: "💼",
    label: "Sales Rep",
    sub: `${salesData.length} entries`,
    badge: /*#__PURE__*/React.createElement("span", {
      className: "pill pill-blue"
    }, salesData.length, " records")
  }, userSectors.includes("shop") && {
    icon: "🏪",
    label: "Shop Sales",
    sub: `${shopData.length} transactions`,
    badge: /*#__PURE__*/React.createElement("span", {
      className: "pill pill-green",
      style: {
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700
      }
    }, NAIRA(shopTotal))
  }, userSectors.includes("farm") && {
    icon: "🌾",
    label: "Farm Expenses",
    sub: `${farmData.length} entries`,
    badge: /*#__PURE__*/React.createElement("span", {
      className: "pill pill-red",
      style: {
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700
      }
    }, NAIRA(farmTotal))
  }, {
    icon: "🤝",
    label: "Debt & Credit",
    sub: `${debtData.filter(r => !r.settled).length} outstanding`,
    badge: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "pill pill-green",
      style: {
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        fontSize: 10
      }
    }, "+", NAIRA(debtCreditOut)), /*#__PURE__*/React.createElement("span", {
      className: "pill pill-red",
      style: {
        fontFamily: "'Space Mono', monospace",
        fontWeight: 700,
        fontSize: 10
      }
    }, "-", NAIRA(debtCreditOwed)))
  }].filter(Boolean);

  // Build 6-month chart data
  const getLast6Months = (data, getAmount, getDate) => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      const total = data.filter(x => (getDate(x) || "").startsWith(key)).reduce((a, x) => a + getAmount(x), 0);
      months.push({
        month: d.toLocaleString("default", {
          month: "short"
        }),
        value: total
      });
    }
    return months;
  };
  const shopChart = userSectors.includes("shop") ? getLast6Months(shopData, s => s.total, s => s.date) : [];
  const farmChart = userSectors.includes("farm") ? getLast6Months(farmData, e => e.amount, e => e.date) : [];
  const profitLoss = shopMonthTotal - farmMonthTotal;
  const monthName = now.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });
  const backupKey = `sl_backup_${user.uid}`;
  const lastBackup = (() => {
    try {
      return JSON.parse(localStorage.getItem(backupKey));
    } catch {
      return null;
    }
  })();
  const daysSinceBackup = lastBackup ? Math.floor((Date.now() - new Date(lastBackup)) / 86400000) : 999;
  const showBackupReminder = daysSinceBackup >= 7;
  const dismissBackup = () => {
    try {
      localStorage.setItem(backupKey, JSON.stringify(new Date().toISOString()));
    } catch {}
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700
    }
  }, "Overview"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-success btn-sm",
    onClick: () => setShowExport(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 14
  }), " Export All")), showBackupReminder && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#EFF6FF",
      border: "1.5px solid #BFDBFE",
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: "0.75rem",
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      flexShrink: 0
    }
  }, "\u2601\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.primary
    }
  }, daysSinceBackup >= 999 ? "Back up your data" : `Last export ${daysSinceBackup} days ago`), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 1
    }
  }, "Export all records to keep a safe copy")), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowExport(true);
      dismissBackup();
    },
    style: {
      background: COLORS.primary,
      border: "none",
      borderRadius: 8,
      padding: "6px 12px",
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      flexShrink: 0
    }
  }, "Export now"), /*#__PURE__*/React.createElement("button", {
    onClick: dismissBackup,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 16,
      padding: 2,
      flexShrink: 0
    }
  }, "\u2715")), /*#__PURE__*/React.createElement(NotificationBanner, {
    user: user
  }), !navigator.onLine && (() => {
    const lastExportKey = `sl_lastexport_${user?.uid}`;
    const lastExport = localStorage.getItem(lastExportKey);
    const daysSince = lastExport ? Math.floor((Date.now() - new Date(lastExport)) / 86400000) : 999;
    if (daysSince < 7) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#EFF6FF",
        border: "1.5px solid #BFDBFE",
        borderRadius: 12,
        padding: "10px 14px",
        marginBottom: "0.75rem",
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        flexShrink: 0
      }
    }, "\u2601\uFE0F"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.primary
      }
    }, lastExport ? `No backup in ${daysSince} days` : "No backup yet"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, "Export your records to keep a safe copy.")), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setShowExport(true);
        localStorage.setItem(lastExportKey, new Date().toISOString());
      },
      style: {
        flexShrink: 0,
        background: COLORS.primary,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Export Now"));
  })(), (userSectors.includes("shop") || userSectors.includes("farm")) && /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryDark} 100%)`,
      borderRadius: 18,
      padding: "18px",
      marginBottom: "1rem",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.07)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 10
    }
  }, "\uD83D\uDCC5 ", monthName, " Report"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, userSectors.includes("shop") && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.14)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.6,
      fontWeight: 700,
      textTransform: "uppercase"
    }
  }, "\uD83C\uDFEA Shop Sales"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 14,
      fontWeight: 700,
      marginTop: 4
    }
  }, NAIRA(shopMonthTotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, shopData.filter(s => s.date?.startsWith(thisMonthStr)).length, " sales")), userSectors.includes("farm") && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.14)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.6,
      fontWeight: 700,
      textTransform: "uppercase"
    }
  }, "\uD83C\uDF3E Farm Spend"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 14,
      fontWeight: 700,
      marginTop: 4
    }
  }, NAIRA(farmMonthTotal)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, farmData.filter(e => e.date?.startsWith(thisMonthStr)).length, " expenses")), userSectors.includes("shop") && userSectors.includes("farm") && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: profitLoss >= 0 ? "rgba(52,211,153,0.25)" : "rgba(239,68,68,0.25)",
      borderRadius: 12,
      padding: "10px 12px",
      border: `1px solid ${profitLoss >= 0 ? "rgba(52,211,153,0.4)" : "rgba(239,68,68,0.4)"}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.8,
      fontWeight: 700,
      textTransform: "uppercase"
    }
  }, "\uD83D\uDCC8 Net P&L"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 14,
      fontWeight: 700,
      marginTop: 4,
      color: profitLoss >= 0 ? "#6EE7B7" : "#FCA5A5"
    }
  }, profitLoss >= 0 ? "+" : "", NAIRA(profitLoss)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, profitLoss >= 0 ? "profit" : "loss", " this month")))), (() => {
    const totalOut = debtCreditOut;
    const totalOwed = debtCreditOwed;
    const net = totalOut - totalOwed;
    const ratio = totalOwed === 0 ? 100 : Math.max(0, Math.min(100, Math.round(totalOut / (totalOut + totalOwed) * 100)));
    const scoreColor = ratio >= 70 ? COLORS.accent : ratio >= 40 ? COLORS.amber : COLORS.danger;
    const scoreLabel = ratio >= 70 ? "Healthy" : ratio >= 40 ? "Caution" : "At Risk";
    const scoreEmoji = ratio >= 70 ? "💚" : ratio >= 40 ? "🟡" : "🔴";
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.text
      }
    }, "\uD83D\uDCB3 Debt-to-Credit Health"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: scoreColor,
        background: scoreColor + "18",
        borderRadius: 8,
        padding: "3px 10px"
      }
    }, scoreEmoji, " ", scoreLabel)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: COLORS.accentLight,
        borderRadius: 10,
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.accent,
        fontWeight: 700,
        textTransform: "uppercase"
      }
    }, "Credits (owed to you)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.accent,
        marginTop: 2
      }
    }, NAIRA(totalOut))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        background: COLORS.dangerLight,
        borderRadius: 10,
        padding: "8px 12px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.danger,
        fontWeight: 700,
        textTransform: "uppercase"
      }
    }, "Debts (you owe)"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.danger,
        marginTop: 2
      }
    }, NAIRA(totalOwed)))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 10,
        borderRadius: 5,
        background: COLORS.dangerLight,
        overflow: "hidden",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
        width: `${ratio}%`,
        background: scoreColor,
        borderRadius: 5,
        transition: "width 0.6s"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, "Net: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: net >= 0 ? COLORS.accent : COLORS.danger
      }
    }, net >= 0 ? "+" : "", NAIRA(net))), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, ratio, "% credit coverage")));
  })(), (userSectors.includes("shop") || userSectors.includes("farm")) && (() => {
    const prevMonthDate = new Date(now);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    const prevMonthStr = prevMonthDate.toISOString().slice(0, 7);
    const shopPrevMonth = shopData.filter(s => s.date?.startsWith(prevMonthStr)).reduce((a, s) => a + s.total, 0);
    const farmPrevMonth = farmData.filter(e => e.date?.startsWith(prevMonthStr)).reduce((a, e) => a + e.amount, 0);
    const shopChange = shopPrevMonth === 0 ? null : Math.round((shopMonthTotal - shopPrevMonth) / shopPrevMonth * 100);
    const farmChange = farmPrevMonth === 0 ? null : Math.round((farmMonthTotal - farmPrevMonth) / farmPrevMonth * 100);
    const prevName = prevMonthDate.toLocaleString("default", {
      month: "short"
    });
    const thisName = now.toLocaleString("default", {
      month: "short"
    });
    if (shopPrevMonth === 0 && farmPrevMonth === 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "1rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.text,
        marginBottom: 10
      }
    }, "\uD83D\uDCC5 ", prevName, " \u2192 ", thisName, " Comparison"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, userSectors.includes("shop") && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, "\uD83C\uDFEA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600
      }
    }, "Shop Sales"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, NAIRA(shopPrevMonth), " \u2192 ", NAIRA(shopMonthTotal)))), shopChange !== null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: shopChange >= 0 ? COLORS.accent : COLORS.danger,
        background: shopChange >= 0 ? COLORS.accentLight : COLORS.dangerLight,
        borderRadius: 8,
        padding: "3px 10px"
      }
    }, shopChange >= 0 ? "▲" : "▼", " ", Math.abs(shopChange), "%")), userSectors.includes("farm") && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16
      }
    }, "\uD83C\uDF3E"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        fontWeight: 600
      }
    }, "Farm Expenses"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.textMuted
      }
    }, NAIRA(farmPrevMonth), " \u2192 ", NAIRA(farmMonthTotal)))), farmChange !== null && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        fontWeight: 700,
        color: farmChange <= 0 ? COLORS.accent : COLORS.danger,
        background: farmChange <= 0 ? COLORS.accentLight : COLORS.dangerLight,
        borderRadius: 8,
        padding: "3px 10px"
      }
    }, farmChange >= 0 ? "▲" : "▼", " ", Math.abs(farmChange), "%"))));
  })(), (shopChart.length > 0 || farmChart.length > 0) && /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 12
    }
  }, "\uD83D\uDCC8 6-Month Trend"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, shopChart.length > 0 && /*#__PURE__*/React.createElement(MiniBarChart, {
    data: shopChart,
    color: COLORS.accent,
    label: "Shop Sales"
  }), farmChart.length > 0 && /*#__PURE__*/React.createElement(MiniBarChart, {
    data: farmChart,
    color: COLORS.danger,
    label: "Farm Expenditures"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: COLORS.textMuted,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      marginBottom: 12
    }
  }, "Lifetime Summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, sectorSummaryItems.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: item.label
  }, i > 0 && /*#__PURE__*/React.createElement("div", {
    className: "divider",
    style: {
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 10,
      background: COLORS.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, item.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600
    }
  }, item.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted
    }
  }, item.sub))), item.badge))), sectorSummaryItems.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      textAlign: "center",
      padding: "1rem 0"
    }
  }, "No sectors selected"))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Recent Activity"), recentActivity.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("h3", null, "No activity yet"), /*#__PURE__*/React.createElement("p", null, "Start recording in your sectors")) : /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, recentActivity.map(item => /*#__PURE__*/React.createElement("div", {
    key: item.id,
    className: "entry-row"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 9,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      background: item.type === "farm" ? "#FEF2F2" : item.type === "shop" ? COLORS.accentLight : item.type === "debtcredit" ? COLORS.primaryLight : "#F5F3FF"
    }
  }, item.type === "shop" ? "🏪" : item.type === "farm" ? "🌾" : item.type === "debtcredit" ? item.positive ? "💰" : "📤" : "💼"), /*#__PURE__*/React.createElement("div", {
    className: "entry-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "entry-title"
  }, item.label), /*#__PURE__*/React.createElement("div", {
    className: "entry-sub"
  }, item.type === "shop" ? "Shop Sale" : item.type === "farm" ? "Farm Expense" : item.type === "debtcredit" ? item.positive ? "Credit" : "Debt" : "Sales Entry", " · ", item.date || item.createdAt?.slice(0, 10))), item.value !== null && /*#__PURE__*/React.createElement("div", {
    className: "entry-amount",
    style: {
      color: item.positive ? COLORS.accent : COLORS.danger
    }
  }, NAIRA(item.value))))), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: "Full Summary Report",
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      loadSheetJS(() => {
        const wb = window.XLSX.utils.book_new();
        if (userSectors.includes("shop") && shopData.length) {
          const ws1 = window.XLSX.utils.aoa_to_sheet([["Date", "Item", "Qty", "Price (₦)", "Total (₦)"], ...shopData.map(s => [s.date, s.itemName, s.qty, s.price, s.total])]);
          ws1["!cols"] = [12, 20, 8, 12, 12].map(w => ({
            wch: w
          }));
          window.XLSX.utils.book_append_sheet(wb, ws1, "Shop Sales");
        }
        if (userSectors.includes("farm") && farmData.length) {
          const ws2 = window.XLSX.utils.aoa_to_sheet([["Date", "Description", "Category", "Amount (₦)"], ...farmData.map(e => [e.date, e.desc, e.category || "—", e.amount])]);
          ws2["!cols"] = [12, 28, 14, 14].map(w => ({
            wch: w
          }));
          window.XLSX.utils.book_append_sheet(wb, ws2, "Farm Expenses");
        }
        if (userSectors.includes("sales") && salesData.length) {
          const ws3 = window.XLSX.utils.aoa_to_sheet([["Date", "Notes"], ...salesData.map(e => [e.createdAt?.slice(0, 10) || "", e.f_notes || ""])]);
          ws3["!cols"] = [12, 36].map(w => ({
            wch: w
          }));
          window.XLSX.utils.book_append_sheet(wb, ws3, "Sales Rep");
        }
        if (debtData.length) {
          const ws4 = window.XLSX.utils.aoa_to_sheet([["Type", "Name", "Amount", "Date", "Due Date", "Status", "Note"], ...debtData.map(r => [r.type === "credit" ? "Credit" : "Debt", r.name, r.amount, r.date, r.dueDate || "—", r.settled ? "Settled" : "Outstanding", r.note || "—"])]);
          ws4["!cols"] = [10, 20, 12, 12, 12, 12, 24].map(w => ({
            wch: w
          }));
          window.XLSX.utils.book_append_sheet(wb, ws4, "Debt & Credit");
        }
        window.XLSX.writeFile(wb, "RecordChief_Overview_" + TODAY() + ".xlsx");
      });
      setShowExport(false);
    },
    onPDFExport: () => {
      const allRows = [...(userSectors.includes("shop") ? shopData.map(s => [s.date, "Shop Sale", s.itemName, NAIRA(s.total)]) : []), ...(userSectors.includes("farm") ? farmData.map(e => [e.date, "Farm Expense", e.desc, NAIRA(e.amount)]) : []), ...(userSectors.includes("sales") ? salesData.map(e => [e.createdAt?.slice(0, 10) || "", "Sales Entry", e.f_notes || "—", "—"]) : []), ...debtData.map(r => [r.date, r.type === "credit" ? "Credit" : "Debt", r.name, (r.type === "credit" ? "+" : "-") + NAIRA(r.amount)])].sort((a, b) => a[0] < b[0] ? 1 : -1);
      exportToPDF("Record Chief — Overview Report", ["Date", "Type", "Description", "Amount"], allRows, "Overview_Report");
      setShowExport(false);
    }
  }));
}

// ===================== DEBT & CREDIT =====================
const DC_TYPES = ["debt", "credit"]; // debt = I owe them | credit = they owe me

function DebtCreditScreen({
  user
}) {
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
  const [form, setForm] = useState({
    type: "credit",
    name: "",
    amount: "",
    note: "",
    dueDate: "",
    date: TODAY(),
    paybackPeriod: "",
    paybackUnit: "months"
  });
  const [errors, setErrors] = useState({});
  const showToast = (msg, type = "success") => setToast({
    msg,
    type
  });
  const remaining = r => Math.max(0, r.amount - (r.payments || []).reduce((a, p) => a + p.amount, 0));
  const totalCredit = records.filter(r => r.type === "credit" && !r.settled).reduce((a, r) => a + remaining(r), 0);
  const totalDebt = records.filter(r => r.type === "debt" && !r.settled).reduce((a, r) => a + remaining(r), 0);
  const overdueCount = records.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
  const save = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) e.amount = "Enter a valid amount";
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    // Auto-compute dueDate from payback period if no explicit date set
    let computedDueDate = form.dueDate;
    if (!computedDueDate && form.paybackPeriod && parseInt(form.paybackPeriod) > 0) {
      const d = new Date(form.date || TODAY());
      const n = parseInt(form.paybackPeriod);
      if (form.paybackUnit === "days") d.setDate(d.getDate() + n);
      if (form.paybackUnit === "weeks") d.setDate(d.getDate() + n * 7);
      if (form.paybackUnit === "months") d.setMonth(d.getMonth() + n);
      computedDueDate = d.toISOString().split("T")[0];
    }
    const rec = {
      id: editId || uid(),
      type: form.type,
      name: form.name.trim(),
      amount: parseFloat(form.amount),
      note: form.note,
      dueDate: computedDueDate,
      paybackPeriod: form.paybackPeriod,
      paybackUnit: form.paybackUnit,
      date: form.date,
      settled: false,
      createdAt: editId ? records.find(r => r.id === editId)?.createdAt : TS(),
      updatedAt: TS()
    };
    if (editId) {
      setRecords(prev => prev.map(r => r.id === editId ? {
        ...rec,
        settled: r.settled
      } : r));
      showToast("Record updated!");
    } else {
      setRecords(prev => [rec, ...prev]);
      showToast(form.type === "credit" ? "Credit recorded!" : "Debt recorded!");
    }
    setForm({
      type: "credit",
      name: "",
      amount: "",
      note: "",
      dueDate: "",
      date: TODAY(),
      paybackPeriod: "",
      paybackUnit: "months"
    });
    setEditId(null);
    setErrors({});
    setTab("list");
  };
  const settle = id => {
    const rec = records.find(r => r.id === id);
    const nowSettled = !rec?.settled;
    setRecords(prev => {
      const updated = prev.map(r => r.id === id ? {
        ...r,
        settled: nowSettled,
        updatedAt: TS()
      } : r);
      if (nowSettled && rec?.recurring) {
        const {
          every,
          unit
        } = rec.recurring;
        const addDate = (dateStr, n, u) => {
          const d = new Date(dateStr || TODAY());
          if (u === "week") d.setDate(d.getDate() + n * 7);
          if (u === "month") d.setMonth(d.getMonth() + n);
          if (u === "year") d.setFullYear(d.getFullYear() + n);
          return d.toISOString().split("T")[0];
        };
        const next = {
          ...rec,
          id: uid(),
          date: addDate(rec.date, every, unit),
          dueDate: rec.dueDate ? addDate(rec.dueDate, every, unit) : "",
          settled: false,
          payments: [],
          createdAt: TS(),
          updatedAt: TS()
        };
        setTimeout(() => showToast("🔁 Next recurring record created"), 200);
        return [...updated, next];
      }
      return updated;
    });
    showToast(nowSettled ? "Marked as settled!" : "Marked as unsettled");
  };
  const remove = id => {
    setRecords(prev => prev.map(r => r.id === id ? {
      ...r,
      archived: true
    } : r));
    showToast("Record archived", "error");
  };
  const restore = id => {
    setRecords(prev => prev.map(r => r.id === id ? {
      ...r,
      archived: false
    } : r));
    showToast("Record restored!");
  };
  const hardDelete = id => {
    setRecords(prev => prev.filter(r => r.id !== id));
    showToast("Permanently deleted", "error");
  };
  const recordPayment = (id, amount) => {
    const amt = parseFloat(amount);
    if (!amt || amt <= 0) return;
    setRecords(prev => prev.map(r => {
      if (r.id !== id) return r;
      const payments = [...(r.payments || []), {
        id: uid(),
        amount: amt,
        date: TODAY(),
        createdAt: TS()
      }];
      const paid = payments.reduce((a, p) => a + p.amount, 0);
      return {
        ...r,
        payments,
        settled: paid >= r.amount,
        updatedAt: TS()
      };
    }));
    showToast("Payment recorded!");
  };
  const startEdit = rec => {
    setForm({
      type: rec.type,
      name: rec.name,
      amount: String(rec.amount),
      note: rec.note || "",
      dueDate: rec.dueDate || "",
      date: rec.date || TODAY(),
      paybackPeriod: rec.paybackPeriod || "",
      paybackUnit: rec.paybackUnit || "months"
    });
    setEditId(rec.id);
    setTab("add");
  };
  const archivedRecords = records.filter(r => r.archived);
  const visible = records.filter(r => {
    if (r.archived) return false;
    if (typeFilter !== "all" && r.type !== typeFilter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !(r.note || "").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const unsettled = visible.filter(r => !r.settled);
  const settled = visible.filter(r => r.settled);
  const isOverdue = r => !r.settled && r.dueDate && r.dueDate < TODAY();
  const isCredit = typeFilter === "credit";
  const accentColor = isCredit ? "#1D6F42" : COLORS.danger;
  const accentBg = isCredit ? "#EDF7EE" : COLORS.dangerLight;
  const accentBorder = isCredit ? "#86C99A" : "#E8A0A0";
  const activeUnsettled = records.filter(r => r.type === typeFilter && !r.settled && (!search || r.name.toLowerCase().includes(search.toLowerCase()) || (r.note || "").toLowerCase().includes(search.toLowerCase())));
  const activeSettled = records.filter(r => r.type === typeFilter && r.settled && (!search || r.name.toLowerCase().includes(search.toLowerCase()) || (r.note || "").toLowerCase().includes(search.toLowerCase())));
  const RecordCard = ({
    r,
    dimmed
  }) => /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 14,
      marginBottom: 10,
      border: `1.5px solid ${dimmed ? COLORS.border : accentBorder}`,
      background: dimmed ? COLORS.bg : "#fff",
      overflow: "hidden",
      opacity: dimmed ? 0.65 : 1,
      boxShadow: dimmed ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
      transition: "all 0.15s"
    }
  }, !dimmed && /*#__PURE__*/React.createElement("div", {
    style: {
      height: 3,
      background: accentColor,
      borderRadius: "14px 14px 0 0"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: "50%",
      flexShrink: 0,
      background: dimmed ? COLORS.border : accentBg,
      border: `2px solid ${dimmed ? COLORS.border : accentBorder}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: 700,
      color: dimmed ? COLORS.textMuted : accentColor,
      fontFamily: "'Space Mono', monospace"
    }
  }, dimmed ? "✓" : r.name.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: dimmed ? COLORS.textMuted : COLORS.text,
      textDecoration: dimmed ? "line-through" : "none",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      maxWidth: "calc(100% - 80px)"
    }
  }, r.name), isOverdue(r) && !dimmed && /*#__PURE__*/React.createElement("span", {
    style: {
      background: "#FFF3CD",
      color: "#856404",
      border: "1px solid #FFD166",
      borderRadius: 6,
      fontSize: 9,
      fontWeight: 700,
      padding: "2px 7px",
      letterSpacing: "0.05em",
      flexShrink: 0
    }
  }, "\u26A0 OVERDUE")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2,
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", null, isCredit ? dimmed ? "Owed you" : "Owes you" : dimmed ? "You owed" : "You owe"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.border
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, r.date), r.dueDate && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.border
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: isOverdue(r) ? COLORS.amber : COLORS.textMuted
    }
  }, "Due ", r.dueDate))), r.note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textLight,
      marginTop: 3,
      fontStyle: "italic",
      background: COLORS.bg,
      borderRadius: 6,
      padding: "3px 7px",
      display: "inline-block"
    }
  }, "\"", r.note, "\""), r.recurring && !dimmed && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      background: COLORS.primaryLight,
      color: COLORS.primary,
      borderRadius: 6,
      padding: "2px 7px",
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      marginTop: 3,
      fontWeight: 600,
      marginLeft: 4
    }
  }, "\uD83D\uDD01 every ", r.recurring.every, " ", r.recurring.unit, r.recurring.every > 1 ? "s" : ""), r.dueDate && !dimmed && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      background: COLORS.amberLight,
      color: COLORS.amber,
      borderRadius: 6,
      padding: "2px 7px",
      display: "inline-flex",
      alignItems: "center",
      gap: 3,
      marginTop: 3,
      fontWeight: 600,
      marginLeft: 4
    }
  }, "\uD83D\uDD14 ", r.reminderDays ?? 1, "d reminder")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "right",
      flexShrink: 0
    }
  }, (() => {
    const paid = (r.payments || []).reduce((a, p) => a + p.amount, 0);
    const remaining = Math.max(0, r.amount - paid);
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Space Mono', monospace",
        fontSize: 16,
        fontWeight: 700,
        color: dimmed ? COLORS.textMuted : accentColor,
        textDecoration: dimmed ? "line-through" : "none"
      }
    }, isCredit ? "+" : "-", NAIRA(r.amount)), paid > 0 && !dimmed && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.danger,
        fontWeight: 600,
        marginTop: 1
      }
    }, "-", NAIRA(paid), " paid"), dimmed && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: COLORS.accent,
        fontWeight: 600,
        marginTop: 2
      }
    }, "SETTLED"));
  })())), !dimmed ? (() => {
    const payments = r.payments || [];
    const paid = payments.reduce((a, p) => a + p.amount, 0);
    const remaining = Math.max(0, r.amount - paid);
    const pct = Math.min(100, paid / r.amount * 100);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [payOpen, setPayOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [payAmt, setPayAmt] = useState("");
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12,
        paddingTop: 10,
        borderTop: `0.5px solid ${COLORS.border}`
      }
    }, paid > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 10,
        color: COLORS.textMuted,
        marginBottom: 4
      }
    }, /*#__PURE__*/React.createElement("span", null, "Paid: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: accentColor
      }
    }, NAIRA(paid))), /*#__PURE__*/React.createElement("span", null, "Remaining: ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: COLORS.danger
      }
    }, NAIRA(remaining)))), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 3,
        background: COLORS.bg,
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: "100%",
        borderRadius: 3,
        background: accentColor,
        width: `${pct}%`,
        transition: "width 0.4s"
      }
    })), payments.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        display: "flex",
        flexWrap: "wrap",
        gap: 4
      }
    }, payments.map(p => /*#__PURE__*/React.createElement("span", {
      key: p.id,
      style: {
        fontSize: 10,
        background: accentBg,
        color: accentColor,
        border: `1px solid ${accentBorder}`,
        borderRadius: 6,
        padding: "2px 7px",
        fontWeight: 600
      }
    }, NAIRA(p.amount), " \xB7 ", p.date)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => settle(r.id),
      style: {
        flex: 1,
        padding: "8px 0",
        border: "none",
        borderRadius: 8,
        cursor: "pointer",
        background: accentBg,
        color: accentColor,
        fontWeight: 700,
        fontSize: 12,
        fontFamily: "'Inter', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5"
    })), "Mark Settled"), /*#__PURE__*/React.createElement("button", {
      onClick: () => startEdit(r),
      style: {
        width: 36,
        height: 36,
        border: `1.5px solid ${COLORS.border}`,
        borderRadius: 8,
        background: "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.textMuted,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => remove(r.id),
      style: {
        width: 36,
        height: 36,
        border: `1.5px solid ${COLORS.dangerLight}`,
        borderRadius: 8,
        background: COLORS.dangerLight,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: COLORS.danger,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "trash",
      size: 14
    }))), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setPayOpen(v => !v);
        setPayAmt("");
      },
      style: {
        marginTop: 8,
        width: "100%",
        padding: "7px 12px",
        border: `1px dashed ${accentBorder}`,
        borderRadius: 8,
        background: "transparent",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontSize: 12,
        fontWeight: 600,
        color: accentColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M12 5v14M5 12h14"
    })), payOpen ? "Cancel" : "Record Part Payment"), payOpen && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "flex",
        gap: 8,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: COLORS.textMuted,
        fontWeight: 700,
        fontSize: 13
      }
    }, "\u20A6"), /*#__PURE__*/React.createElement("input", {
      type: "number",
      className: "form-input",
      style: {
        paddingLeft: 26
      },
      placeholder: `Max ${NAIRA(remaining)}`,
      value: payAmt,
      onChange: e => setPayAmt(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter") {
          recordPayment(r.id, payAmt);
          setPayAmt("");
          setPayOpen(false);
        }
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        if (parseFloat(payAmt) > remaining) {
          showToast("Amount exceeds remaining balance", "error");
          return;
        }
        recordPayment(r.id, payAmt);
        setPayAmt("");
        setPayOpen(false);
      },
      style: {
        flexShrink: 0,
        padding: "10px 14px",
        border: "none",
        borderRadius: 8,
        background: accentColor,
        color: "#fff",
        fontWeight: 700,
        fontSize: 12,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Save")));
  })() : /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => settle(r.id),
    style: {
      background: "none",
      border: `1px solid ${COLORS.border}`,
      borderRadius: 7,
      padding: "5px 12px",
      fontSize: 11,
      color: COLORS.textMuted,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Undo"))));

  // Theme palette   entire UI shifts based on active tab
  const debtOutstanding = records.filter(r => r.type === "debt" && !r.settled).length;
  const debtAllClear = !isCredit && debtOutstanding === 0;
  const T = isCredit ? {
    bg: "#F0FAF4",
    bannerBg: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)",
    surface: "#fff",
    card: "#fff",
    cardBorder: "#B7E4C7",
    label: "#1D6F42",
    labelLight: "#4B9B6B",
    pale: "#D8F3DC",
    muted: "#74C69D",
    pill: "#1D6F42",
    sectionHdr: "#2D6A4F",
    searchBorder: "#86C99A",
    inactiveBg: "#EDF7EE",
    inactiveColor: "#1D6F42"
  } : debtAllClear ? {
    // All debts cleared   calming blue theme
    bg: "#EFF6FF",
    bannerBg: `linear-gradient(135deg, #1E3A8A 0%, ${COLORS.primaryDark} 60%, ${COLORS.primary} 100%)`,
    surface: "#fff",
    card: "#fff",
    cardBorder: "#BFDBFE",
    label: COLORS.primary,
    labelLight: "#60A5FA",
    pale: "#DBEAFE",
    muted: "#93C5FD",
    pill: COLORS.primary,
    sectionHdr: COLORS.primaryDark,
    searchBorder: "#BFDBFE",
    inactiveBg: COLORS.primaryLight,
    inactiveColor: COLORS.primary
  } : {
    bg: "#FFF5F5",
    bannerBg: `linear-gradient(135deg, #7F1D1D 0%, #B91C1C 60%, ${COLORS.danger} 100%)`,
    surface: "#fff",
    card: "#fff",
    cardBorder: "#FCA5A5",
    label: COLORS.danger,
    labelLight: "#E57373",
    pale: "#FEE2E2",
    muted: "#F87171",
    pill: COLORS.danger,
    sectionHdr: "#B91C1C",
    searchBorder: "#FCA5A5",
    inactiveBg: COLORS.dangerLight,
    inactiveColor: COLORS.danger
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 90,
      background: T.bg,
      minHeight: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: T.bannerBg,
      borderRadius: 18,
      padding: "18px 18px 16px",
      marginBottom: "1rem",
      color: "#fff",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -20,
      right: -20,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.07)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      marginBottom: 4
    }
  }, isCredit ? "💰" : "📤"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: "-0.3px"
    }
  }, isCredit ? "Credits" : "Debts"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: 0.65,
      marginTop: 2
    }
  }, isCredit ? "Money others owe you" : "Money you owe others")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowExport(true),
    style: {
      background: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.25)",
      borderRadius: 10,
      padding: "7px 12px",
      color: "#fff",
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download",
    size: 13
  }), " Export")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.14)",
      borderRadius: 12,
      padding: "10px 12px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.65,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Outstanding"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 15,
      fontWeight: 700,
      marginTop: 3
    }
  }, NAIRA(isCredit ? totalCredit : totalDebt)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.55,
      marginTop: 1
    }
  }, (isCredit ? records.filter(r => r.type === "credit" && !r.settled) : records.filter(r => r.type === "debt" && !r.settled)).length, " records")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "rgba(255,255,255,0.22)",
      borderRadius: 12,
      padding: "10px 12px",
      border: "1px solid rgba(255,255,255,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      opacity: 0.85,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, "Settled"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 15,
      fontWeight: 700,
      marginTop: 3
    }
  }, (isCredit ? records.filter(r => r.type === "credit" && r.settled) : records.filter(r => r.type === "debt" && r.settled)).length), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      opacity: 0.6,
      marginTop: 1
    }
  }, "records closed")))), overdueCount > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FFF8E1",
      border: "1.5px solid #FFD166",
      borderRadius: 12,
      padding: "10px 14px",
      fontSize: 12,
      color: "#856404",
      fontWeight: 600,
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, "\u26A0\uFE0F"), /*#__PURE__*/React.createElement("span", null, overdueCount, " record", overdueCount > 1 ? "s are" : " is", " past due date")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: "0.75rem"
    }
  }, [{
    id: "credit",
    emoji: "💰",
    label: "Credits",
    active: isCredit,
    activeBg: "#1D6F42",
    inactiveBg: "#EDF7EE",
    activeColor: "#fff",
    inactiveColor: "#1D6F42",
    count: records.filter(r => r.type === "credit" && !r.settled).length
  }, {
    id: "debt",
    emoji: "📤",
    label: "Debts",
    active: !isCredit,
    activeBg: COLORS.danger,
    inactiveBg: COLORS.dangerLight,
    activeColor: "#fff",
    inactiveColor: COLORS.danger,
    count: records.filter(r => r.type === "debt" && !r.settled).length
  }].map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTypeFilter(t.id),
    style: {
      flex: 1,
      padding: "11px 12px",
      borderRadius: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      fontSize: 13,
      border: "none",
      transition: "all 0.18s",
      background: t.active ? t.activeBg : t.inactiveBg,
      color: t.active ? t.activeColor : t.inactiveColor,
      boxShadow: t.active ? `0 3px 12px ${t.activeBg}55` : "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16
    }
  }, t.emoji), /*#__PURE__*/React.createElement("span", null, t.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 20,
      padding: "1px 7px",
      background: t.active ? "rgba(255,255,255,0.25)" : t.activeBg,
      color: "#fff"
    }
  }, t.count)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: T.muted,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15
  })), /*#__PURE__*/React.createElement("input", {
    style: {
      width: "100%",
      padding: "10px 36px 10px 38px",
      borderRadius: 12,
      border: `1.5px solid ${T.searchBorder}`,
      background: T.surface,
      fontSize: 13,
      fontFamily: "'Inter', sans-serif",
      outline: "none",
      color: COLORS.text,
      transition: "box-shadow 0.2s"
    },
    placeholder: `Search ${isCredit ? "credits" : "debts"}…`,
    value: search,
    onChange: e => setSearch(e.target.value)
  }), search && /*#__PURE__*/React.createElement("button", {
    onClick: () => setSearch(""),
    style: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      background: T.muted + "44",
      border: "none",
      borderRadius: "50%",
      width: 18,
      height: 18,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: T.label,
      fontSize: 11
    }
  }, "\u2715")), activeUnsettled.length === 0 && activeSettled.length === 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "3rem 1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      marginBottom: 12
    }
  }, isCredit ? "💰" : "📤"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: T.label,
      marginBottom: 6
    }
  }, "No ", isCredit ? "credits" : "debts", " yet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Tap the + button below to add your first record")) : /*#__PURE__*/React.createElement(React.Fragment, null, activeUnsettled.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: T.label,
      letterSpacing: "0.08em",
      textTransform: "uppercase"
    }
  }, "Outstanding (", activeUnsettled.length, ")"), activeUnsettled.length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setBulkMode(v => !v);
      setBulkSelected(new Set());
    },
    style: {
      background: bulkMode ? T.label : "transparent",
      color: bulkMode ? "#fff" : T.label,
      border: `1.5px solid ${T.label}`,
      borderRadius: 8,
      padding: "3px 10px",
      fontSize: 11,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, bulkMode ? "Cancel" : "Select")), bulkMode && bulkSelected.size > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 10,
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      bulkSelected.forEach(id => settle(id));
      setBulkSelected(new Set());
      setBulkMode(false);
    },
    style: {
      flex: 1,
      padding: "10px",
      border: "none",
      borderRadius: 10,
      background: T.label,
      color: "#fff",
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\u2713 Settle ", bulkSelected.size, " record", bulkSelected.size !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      bulkSelected.forEach(id => remove(id));
      setBulkSelected(new Set());
      setBulkMode(false);
    },
    style: {
      padding: "10px 14px",
      border: "none",
      borderRadius: 10,
      background: COLORS.dangerLight,
      color: COLORS.danger,
      fontWeight: 700,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\uD83D\uDDD1\uFE0F")), activeUnsettled.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      position: "relative"
    }
  }, bulkMode && /*#__PURE__*/React.createElement("div", {
    onClick: () => setBulkSelected(prev => {
      const next = new Set(prev);
      next.has(r.id) ? next.delete(r.id) : next.add(r.id);
      return next;
    }),
    style: {
      position: "absolute",
      top: 12,
      left: 12,
      zIndex: 10,
      width: 22,
      height: 22,
      borderRadius: 6,
      border: `2px solid ${bulkSelected.has(r.id) ? T.label : COLORS.border}`,
      background: bulkSelected.has(r.id) ? T.label : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0
    }
  }, bulkSelected.has(r.id) && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "3"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6L9 17l-5-5"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: bulkMode ? 38 : 0,
      transition: "margin 0.2s"
    }
  }, /*#__PURE__*/React.createElement(RecordCard, {
    r: r,
    dimmed: false
  }))))), activeSettled.length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: T.sectionHdr,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: 8,
      marginTop: 16
    }
  }, "Settled (", activeSettled.length, ")"), activeSettled.map(r => /*#__PURE__*/React.createElement(RecordCard, {
    key: r.id,
    r: r,
    dimmed: true
  })))), archivedRecords.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 700,
      color: COLORS.textLight,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      marginBottom: 8
    }
  }, "\uD83D\uDDD1\uFE0F Archived (", archivedRecords.length, ")"), archivedRecords.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    style: {
      background: COLORS.bg,
      borderRadius: 12,
      padding: "10px 14px",
      marginBottom: 8,
      border: `1px solid ${COLORS.border}`,
      opacity: 0.7,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.textMuted,
      textDecoration: "line-through",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, r.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textLight,
      marginTop: 1
    }
  }, r.type === "credit" ? "💰 Credit" : "📤 Debt", " \xB7 ", r.date, " \xB7 ", NAIRA(r.amount))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => restore(r.id),
    style: {
      background: COLORS.accentLight,
      border: "none",
      borderRadius: 7,
      padding: "5px 10px",
      fontSize: 11,
      color: COLORS.accent,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600
    }
  }, "Restore"), /*#__PURE__*/React.createElement("button", {
    onClick: () => hardDelete(r.id),
    style: {
      background: COLORS.dangerLight,
      border: "none",
      borderRadius: 7,
      padding: "5px 10px",
      fontSize: 11,
      color: COLORS.danger,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 600
    }
  }, "Delete"))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setEditId(null);
      setErrors({});
      setShowTypeChoice(true);
    },
    title: "Add new record",
    style: {
      position: "fixed",
      bottom: "calc(28px + var(--fab-lift, 0px))",
      right: 28,
      zIndex: 200,
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: COLORS.primary,
      color: "#fff",
      border: "none",
      boxShadow: "0 4px 18px rgba(27,108,168,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      fontSize: 28,
      lineHeight: 1,
      transition: "transform 0.15s, box-shadow 0.15s"
    },
    onMouseEnter: e => {
      e.currentTarget.style.transform = "scale(1.1)";
      e.currentTarget.style.boxShadow = "0 6px 24px rgba(27,108,168,0.55)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 18px rgba(27,108,168,0.45)";
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  }))), showTypeChoice && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.45)"
    },
    onClick: () => setShowTypeChoice(false)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 22,
      padding: "28px 22px",
      width: "calc(100% - 56px)",
      maxWidth: 320,
      boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
      animation: "scaleIn 0.2s cubic-bezier(0.4,0,0.2,1)"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 38,
      marginBottom: 10
    }
  }, "\uD83E\uDD1D"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "Add New Record"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      lineHeight: 1.6
    }
  }, "What type of record would you like to add?")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setForm({
        type: "credit",
        name: "",
        amount: "",
        note: "",
        dueDate: "",
        date: TODAY(),
        paybackPeriod: "",
        paybackUnit: "months"
      });
      setShowTypeChoice(false);
      setTab("add");
    },
    style: {
      padding: "14px 16px",
      borderRadius: 14,
      cursor: "pointer",
      border: "2px solid #86C99A",
      background: "#EDF7EE",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      flexShrink: 0
    }
  }, "\uD83D\uDCB0"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: "#1D6F42"
    }
  }, "Credit"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#4B9B6B",
      marginTop: 2
    }
  }, "Someone owes you money")), /*#__PURE__*/React.createElement("svg", {
    style: {
      marginLeft: "auto"
    },
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#1D6F42",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  })))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setForm({
        type: "debt",
        name: "",
        amount: "",
        note: "",
        dueDate: "",
        date: TODAY(),
        paybackPeriod: "",
        paybackUnit: "months"
      });
      setShowTypeChoice(false);
      setTab("add");
    },
    style: {
      padding: "14px 16px",
      borderRadius: 14,
      cursor: "pointer",
      border: `2px solid #E8A0A0`,
      background: COLORS.dangerLight,
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      transition: "all 0.15s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 28,
      flexShrink: 0
    }
  }, "\uD83D\uDCE4"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: COLORS.danger
    }
  }, "Debt"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "#C0392B99",
      marginTop: 2
    }
  }, "You owe someone money")), /*#__PURE__*/React.createElement("svg", {
    style: {
      marginLeft: "auto"
    },
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.danger,
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  }))))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowTypeChoice(false),
    style: {
      width: "100%",
      marginTop: 14,
      background: "none",
      border: "none",
      fontSize: 13,
      color: COLORS.textMuted,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      padding: "6px"
    }
  }, "Cancel"))), tab === "add" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 300,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      background: "rgba(0,0,0,0.4)"
    },
    onClick: () => {
      setTab("list");
      setEditId(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "18px 18px 0 0",
      padding: "0 1rem 1.5rem",
      maxHeight: "90vh",
      overflowY: "auto",
      boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
      animation: "slideUp 0.25s cubic-bezier(0.4,0,0.2,1)",
      width: "100%",
      maxWidth: 340
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: "12px 0 4px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 5,
      borderRadius: 3,
      background: COLORS.border
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 700
    }
  }, editId ? "Edit Record" : "New Record"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setTab("list");
      setEditId(null);
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 20,
      lineHeight: 1,
      padding: 4
    }
  }, "\xD7")), editId && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.amberLight,
      color: COLORS.amber,
      borderRadius: 8,
      padding: "7px 12px",
      fontSize: 12,
      marginBottom: 12,
      fontWeight: 500
    }
  }, "Editing existing record"), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Type"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setForm(p => ({
      ...p,
      type: "credit"
    })),
    style: {
      flex: 1,
      padding: "10px",
      border: `2px solid ${form.type === "credit" ? "#1D6F42" : COLORS.border}`,
      borderRadius: 9,
      background: form.type === "credit" ? "#EDF7EE" : COLORS.bg,
      color: form.type === "credit" ? "#1D6F42" : COLORS.textMuted,
      fontWeight: 600,
      cursor: "pointer",
      fontSize: 13,
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.15s"
    }
  }, "\uD83D\uDCB0 Credit (they owe me)"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setForm(p => ({
      ...p,
      type: "debt"
    })),
    style: {
      flex: 1,
      padding: "10px",
      border: `2px solid ${form.type === "debt" ? COLORS.danger : COLORS.border}`,
      borderRadius: 9,
      background: form.type === "debt" ? COLORS.dangerLight : COLORS.bg,
      color: form.type === "debt" ? COLORS.danger : COLORS.textMuted,
      fontWeight: 600,
      cursor: "pointer",
      fontSize: 13,
      fontFamily: "'Inter', sans-serif",
      transition: "all 0.15s"
    }
  }, "\uD83D\uDCE4 Debt (I owe them)"))), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, form.type === "credit" ? "Debtor's Name" : "Creditor's Name"), /*#__PURE__*/React.createElement("input", {
    className: `form-input${errors.name ? " error" : ""}`,
    placeholder: "Full name or business",
    value: form.name,
    onChange: e => {
      setForm(p => ({
        ...p,
        name: e.target.value
      }));
      setErrors(p => ({
        ...p,
        name: null
      }));
    }
  }), errors.name && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.name)), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Amount (\u20A6)"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: COLORS.textMuted,
      fontWeight: 600
    }
  }, "\u20A6"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    className: `form-input${errors.amount ? " error" : ""}`,
    style: {
      paddingLeft: 28
    },
    placeholder: "0.00",
    value: form.amount,
    onChange: e => {
      setForm(p => ({
        ...p,
        amount: e.target.value
      }));
      setErrors(p => ({
        ...p,
        amount: null
      }));
    }
  })), errors.amount && /*#__PURE__*/React.createElement("div", {
    className: "form-error"
  }, errors.amount)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Date"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-input",
    value: form.date,
    onChange: e => setForm(p => ({
      ...p,
      date: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Due Date (optional)"), /*#__PURE__*/React.createElement("input", {
    type: "date",
    className: "form-input",
    value: form.dueDate,
    onChange: e => setForm(p => ({
      ...p,
      dueDate: e.target.value
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.bg,
      borderRadius: 14,
      padding: "14px",
      marginBottom: "0.85rem",
      border: `1px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 10,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, "\u23F1\uFE0F Payback Period", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      fontWeight: 400
    }
  }, "\u2014 optional")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginBottom: 10
    }
  }, "How long before this should be paid back?"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    className: "form-input",
    placeholder: "e.g. 2",
    value: form.paybackPeriod,
    onChange: e => setForm(p => ({
      ...p,
      paybackPeriod: e.target.value
    })),
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("select", {
    className: "form-input",
    value: form.paybackUnit,
    onChange: e => setForm(p => ({
      ...p,
      paybackUnit: e.target.value
    })),
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "days"
  }, "Days"), /*#__PURE__*/React.createElement("option", {
    value: "weeks"
  }, "Weeks"), /*#__PURE__*/React.createElement("option", {
    value: "months"
  }, "Months"))), form.paybackPeriod && parseInt(form.paybackPeriod) > 0 && !form.dueDate && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.accent,
      marginTop: 8,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
      gap: 5
    }
  }, "\u2713 Due date will be auto-set to ", form.paybackPeriod, " ", form.paybackUnit, " from today"), form.dueDate && form.paybackPeriod && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 8
    }
  }, "Using explicit due date above instead")), /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Note (optional)"), /*#__PURE__*/React.createElement("textarea", {
    className: "form-input",
    rows: 2,
    placeholder: "What is this for?",
    value: form.note,
    onChange: e => setForm(p => ({
      ...p,
      note: e.target.value
    }))
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => {
      setTab("list");
      setEditId(null);
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 2
    },
    onClick: save
  }, editId ? "Update Record" : form.type === "credit" ? "Save Credit" : "Save Debt")))), showExport && /*#__PURE__*/React.createElement(ExportModal, {
    title: "Debt & Credit",
    onClose: () => setShowExport(false),
    onExcelExport: () => {
      const headers = ["Type", "Name", "Amount (₦)", "Date", "Due Date", "Status", "Note"];
      const rows = records.map(r => [r.type === "credit" ? "Credit (they owe me)" : "Debt (I owe them)", r.name, r.amount, r.date, r.dueDate || "—", r.settled ? "Settled" : "Outstanding", r.note || "—"]);
      exportToExcel("Debt_Credit_" + TODAY(), "Records", rows, headers);
      setShowExport(false);
      showToast("Excel file downloaded!");
    },
    onPDFExport: () => {
      const headers = ["Type", "Name", "Amount (₦)", "Date", "Due Date", "Status"];
      const rows = records.map(r => [r.type === "credit" ? "Credit" : "Debt", r.name, NAIRA(r.amount), r.date, r.dueDate || "—", r.settled ? "Settled" : "Outstanding"]);
      exportToPDF("Debt & Credit — Records", headers, rows, "Debt_Credit");
      setShowExport(false);
    }
  }), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }));
}

// ===================== MANAGE SECTORS =====================
function ManageSectorsScreen({
  user,
  onSave,
  onBack
}) {
  const [selected, setSelected] = useState(user.sectors && user.sectors.length > 0 ? [...user.sectors] : ["shop"]);
  const [error, setError] = useState("");
  const toggle = id => {
    setError("");
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };
  const save = () => {
    if (selected.length === 0) {
      setError("Please keep at least one sector selected.");
      return;
    }
    onSave(selected);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontSize: 13,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "back",
    size: 16
  }), " Back")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 4
    }
  }, "Manage Sectors"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: "1rem"
    }
  }, "Select all the sectors you want to track. You can change this anytime."), error && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.dangerLight,
      color: COLORS.danger,
      borderRadius: 8,
      padding: "8px 12px",
      fontSize: 13,
      marginBottom: 12,
      fontWeight: 500
    }
  }, error), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      marginBottom: 16
    }
  }, ALL_SECTORS.map(s => {
    const active = selected.includes(s.id);
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      onClick: () => toggle(s.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px",
        borderRadius: 14,
        cursor: "pointer",
        transition: "all 0.18s",
        border: active ? `2px solid ${s.borderColor}` : `1.5px solid ${COLORS.border}`,
        background: active ? s.color : COLORS.surface
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        background: s.color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22,
        flexShrink: 0
      }
    }, s.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, s.desc)), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        flexShrink: 0,
        border: active ? "none" : `1.5px solid ${COLORS.border}`,
        background: active ? COLORS.primary : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s"
      }
    }, active && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13
    })));
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: save,
    style: {
      opacity: selected.length === 0 ? 0.5 : 1
    }
  }, "Save \u2014 ", selected.length, " sector", selected.length !== 1 ? "s" : "", " selected"));
}

// ===================== PROFILE =====================

// ===================== HELP SUPPORT SECTION =====================
function HelpSupportSection() {
  const [helpModal, setHelpModal] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [suggSent, setSuggSent] = useState(false);
  const faqs = [{
    q: "How do I record a sale?",
    a: "Go to your Shop sector, tap the + button, then choose 'Record a Sale'. Select the item, enter the quantity and tap Save."
  }, {
    q: "How do I add items to inventory?",
    a: "In the Shop screen, tap the + button and choose 'Add New Stock'. Fill in the item name, price and initial quantity."
  }, {
    q: "How do I track who owes me money?",
    a: "Go to Debt & Credit from the bottom bar. Tap +, choose 'Credit' (money owed to you), fill in the person's name and amount."
  }, {
    q: "How do I set a payment reminder?",
    a: "When adding a debt or credit record, set the 'Reminder' field to how many days before the due date you want to be alerted."
  }, {
    q: "How do I export my records?",
    a: "In any screen tap the Export button. You can export to Excel or PDF. The Overview screen lets you export all data at once."
  }, {
    q: "How do I switch between sectors?",
    a: "Tap 'Sector' in the bottom bar. To switch, use the Home screen sector grid or the sidebar on larger screens."
  }, {
    q: "How do I install the app?",
    a: "iPhone: Safari → Share → 'Add to Home Screen'. Android: Chrome menu → 'Add to Home Screen'. Opens full-screen like a native app."
  }, {
    q: "Can I use it on multiple phones?",
    a: "Your data is currently saved on this device. Export your records to back them up. Cloud sync is coming soon."
  }];
  const helpItems = [{
    id: "faq",
    icon: "❓",
    label: "FAQ",
    sub: "Frequently asked questions"
  }, {
    id: "tour",
    icon: "🗺️",
    label: "Guide Tour",
    sub: "How each section works"
  }, {
    id: "contact",
    icon: "💬",
    label: "Contact & Suggestions",
    sub: "Send feedback or get help"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Help & Support"), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, helpItems.map((item, i) => /*#__PURE__*/React.createElement("button", {
    key: item.id,
    onClick: () => setHelpModal(item.id),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      background: "none",
      border: "none",
      cursor: "pointer",
      borderBottom: i < helpItems.length - 1 ? `1px solid ${COLORS.border}` : "none",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 11,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      flexShrink: 0
    }
  }, item.icon), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: COLORS.text
    }
  }, item.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, item.sub)), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.textLight,
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  }))))), helpModal === "faq" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: () => setHelpModal(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      width: "100%",
      maxWidth: 440,
      maxHeight: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 14px",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, "\u2753"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "FAQ")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setHelpModal(null),
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      color: COLORS.textMuted
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      flex: 1
    }
  }, faqs.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderBottom: `0.5px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpenFaq(openFaq === i ? null : i),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 18px",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: COLORS.text,
      lineHeight: 1.4,
      flex: 1
    }
  }, item.q), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.textMuted,
    strokeWidth: "2.5",
    style: {
      flexShrink: 0,
      transition: "transform 0.2s",
      transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)"
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))), openFaq === i && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 18px 14px",
      fontSize: 13,
      color: COLORS.textMuted,
      lineHeight: 1.7
    }
  }, item.a)))))), helpModal === "tour" && /*#__PURE__*/React.createElement(GuideTourModal, {
    onClose: () => setHelpModal(null)
  }), helpModal === "contact" && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: () => setHelpModal(null)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      width: "100%",
      maxWidth: 440,
      maxHeight: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 14px",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, "\uD83D\uDCAC"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "Contact & Suggestions")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setHelpModal(null),
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      color: COLORS.textMuted
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      flex: 1,
      padding: "18px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#F0FDF4",
      border: "1px solid #86EFAC",
      borderRadius: 14,
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: "#25D366",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, "\uD83D\uDCF1"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.text
    }
  }, "Chat with us on WhatsApp"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, "We respond within 24 hours")), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/2348119528922",
    target: "_blank",
    rel: "noreferrer",
    style: {
      background: "#25D366",
      color: "#fff",
      borderRadius: 10,
      padding: "8px 14px",
      fontSize: 13,
      fontWeight: 700,
      textDecoration: "none",
      flexShrink: 0,
      fontFamily: "'Inter', sans-serif"
    }
  }, "Chat")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "\uD83D\uDCA1 Send a Suggestion"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginBottom: 10
    }
  }, "Have an idea to improve Record Chief? We'd love to hear it."), suggSent ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.accentLight,
      border: `1px solid #6EE7B7`,
      borderRadius: 12,
      padding: "14px 16px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      marginBottom: 6
    }
  }, "\uD83C\uDF89"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.accent
    }
  }, "Thank you for your feedback!"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 4
    }
  }, "Your suggestion has been sent.")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", {
    className: "form-input",
    rows: 4,
    placeholder: "e.g. I'd love to attach photos to expenses\u2026",
    value: suggestion,
    onChange: e => setSuggestion(e.target.value),
    style: {
      resize: "none",
      marginBottom: 10
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    disabled: !suggestion.trim(),
    onClick: () => {
      if (suggestion.trim()) {
        const msg = encodeURIComponent("Record Chief Suggestion:\n\n" + suggestion.trim());
        window.open("https://wa.me/2348119528922?text=" + msg, "_blank");
        setSuggSent(true);
        setSuggestion("");
      }
    },
    style: {
      opacity: suggestion.trim() ? 1 : 0.5
    }
  }, "Send via WhatsApp")))))));
}

// ===================== GUIDE TOUR MODAL =====================
function GuideTourModal({
  onClose
}) {
  const [tourStep, setTourStep] = useState(null);
  const fullGuide = [{
    emoji: "🏠",
    title: "Home Screen",
    color: COLORS.primary,
    bg: COLORS.primaryLight,
    short: "Your dashboard and starting point",
    steps: [{
      icon: "👋",
      heading: "Welcome Banner",
      body: "At the top you see your name, today's date and business location. Tap 📊 OVERVIEW to jump to your dashboard."
    }, {
      icon: "🔔",
      heading: "Debt Alerts",
      body: "If any debt or credit is overdue or due soon, a coloured banner appears automatically. Tap it to go straight to Debt & Credit."
    }, {
      icon: "🏪",
      heading: "Sector Cards",
      body: "Your active sectors (Shop, Farm, Customer Records) appear as tappable cards. Tap any card to open that sector."
    }, {
      icon: "🤝",
      heading: "Debt & Credit Card",
      body: "A full-width card shows outstanding records. It turns red when records are overdue. Tap it to manage debts and credits."
    }]
  }, {
    emoji: "🏪",
    title: "Shop Sales",
    color: "#2563EB",
    bg: "#EFF6FF",
    short: "Record sales and manage inventory",
    steps: [{
      icon: "➕",
      heading: "Adding a Sale",
      body: "Tap the blue + button. Choose 'Record a Sale', pick the item, enter quantity and tap Save. Stock is reduced automatically."
    }, {
      icon: "📦",
      heading: "Adding Inventory",
      body: "Tap + then choose 'Add New Stock'. Enter the item name, price per unit, and how many you have. Tap Add to Inventory."
    }, {
      icon: "📋",
      heading: "Sales History",
      body: "The History tab shows every sale. Filter by tag, search by item name, sort by date or amount, and see your best-selling items at the top."
    }, {
      icon: "📅",
      heading: "Period Filter",
      body: "Use the 'View Period Sale' dropdown to see totals for Today, This Week, This Month, This Year or a Custom date range."
    }, {
      icon: "⚠️",
      heading: "Stock Alerts",
      body: "If an item runs out or falls below 5 units, a red or amber alert appears. Check Notifications for a full stock list."
    }]
  }, {
    emoji: "🌾",
    title: "Farm Expenses",
    color: "#1B4332",
    bg: "#ECFDF5",
    short: "Log and categorise farming costs",
    steps: [{
      icon: "➕",
      heading: "Adding an Expense",
      body: "Tap the green + button. Fill in the date, description, amount, and choose a category: Seeds, Fertilizer, Labor, Transport, Equipment or Others."
    }, {
      icon: "📂",
      heading: "Category Filter",
      body: "Tap any category chip to filter expenses by type. Tap 'All' to see everything."
    }, {
      icon: "📊",
      heading: "Spend Breakdown",
      body: "The banner shows a bar chart of your top spending categories so you can see where most of your farm money goes."
    }, {
      icon: "📤",
      heading: "Exporting",
      body: "Tap Export to download your farm expenses as an Excel or PDF file for your records or accountant."
    }]
  }, {
    emoji: "👥",
    title: "Customer Records",
    color: "#7C3AED",
    bg: "#F5F3FF",
    short: "Track clients, deals and custom data",
    steps: [{
      icon: "🔧",
      heading: "Setting Up Fields",
      body: "On your first entry, set up your columns. Add fields like Customer Name, Product, Amount, Status — anything that fits your business."
    }, {
      icon: "➕",
      heading: "Adding a Record",
      body: "Tap +. A popup asks to keep existing fields or reset. Fill in the form and tap Save Record."
    }, {
      icon: "🔤",
      heading: "Sorting Records",
      body: "Use the 'Sort by' dropdown to organise by Newest Date, Oldest Date, A to Z, Z to A, or Recently Added."
    }, {
      icon: "🔍",
      heading: "Searching",
      body: "Type in the search box to instantly find any record across all field values."
    }]
  }, {
    emoji: "🤝",
    title: "Debt & Credit",
    color: "#DC2626",
    bg: "#FEF2F2",
    short: "Track what you owe and what's owed to you",
    steps: [{
      icon: "💰",
      heading: "Credits — Money Owed to You",
      body: "Tap + and choose 'Credit'. Enter the person's name, amount and due date. Tracked as money others owe you."
    }, {
      icon: "📤",
      heading: "Debts — Money You Owe",
      body: "Tap + and choose 'Debt'. Enter who you owe, the amount and due date. The app reminds you before it's due."
    }, {
      icon: "⏱️",
      heading: "Payback Period",
      body: "Set a payback period like '2 months' instead of a specific date. The due date is calculated automatically."
    }, {
      icon: "🔔",
      heading: "Reminders",
      body: "Set how many days before the due date you want to be notified. Alerts appear on Home, Notifications and the bell icon."
    }, {
      icon: "💳",
      heading: "Part Payments",
      body: "For instalments, tap 'Record Part Payment'. Enter the amount. A progress bar shows what's left. Auto-settles when fully paid."
    }, {
      icon: "✅",
      heading: "Settling a Record",
      body: "When fully paid, tap 'Mark Settled'. Settled records move to a separate section. Recurring records auto-create the next one."
    }]
  }, {
    emoji: "📊",
    title: "Overview",
    color: "#059669",
    bg: "#ECFDF5",
    short: "Charts, trends and business health",
    steps: [{
      icon: "📅",
      heading: "Monthly Report Card",
      body: "See this month's Shop Sales, Farm Spend and Net Profit or Loss side by side at a glance."
    }, {
      icon: "💳",
      heading: "Health Score",
      body: "A colour-coded bar shows your debt-to-credit ratio. Green means healthy, amber means caution, red means at risk."
    }, {
      icon: "📈",
      heading: "Month Comparison",
      body: "See how this month compares to last month for shop sales and farm expenses with percentage change badges."
    }, {
      icon: "📊",
      heading: "6-Month Charts",
      body: "Bar charts for Shop Sales and Farm Expenses over the last 6 months let you spot trends easily."
    }, {
      icon: "💾",
      heading: "Export All",
      body: "Tap Export All to download a full Excel or PDF covering all sectors and debt records in one file."
    }]
  }, {
    emoji: "🔔",
    title: "Notifications",
    color: "#D97706",
    bg: "#FFFBEB",
    short: "All your alerts in one place",
    steps: [{
      icon: "🚨",
      heading: "Overdue Records",
      body: "Debts or credits past their due date appear in red showing the name, amount and days overdue."
    }, {
      icon: "⏰",
      heading: "Due Soon",
      body: "Records coming up within your reminder window appear in amber showing days remaining."
    }, {
      icon: "🚫",
      heading: "Out of Stock",
      body: "Shop items at zero stock appear here so you know what to restock immediately."
    }, {
      icon: "⚠️",
      heading: "Low Stock",
      body: "Items with fewer than 5 units show in amber so you can restock before running out."
    }, {
      icon: "🔢",
      heading: "Bell Badge",
      body: "The bell icon in the top bar shows a red number badge with the total count of active alerts."
    }]
  }];
  if (tourStep !== null) {
    const s = fullGuide[tourStep];
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16
      },
      onClick: () => setTourStep(null)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: 20,
        width: "100%",
        maxWidth: 440,
        maxHeight: "calc(100vh - 32px)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        animation: "scaleIn 0.2s ease"
      },
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: s.color,
        borderRadius: "20px 20px 0 0",
        padding: "20px 18px 16px",
        color: "#fff",
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 32
      }
    }, s.emoji), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800
      }
    }, s.title), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        opacity: 0.75,
        marginTop: 2
      }
    }, s.short))), /*#__PURE__*/React.createElement("button", {
      onClick: () => setTourStep(null),
      style: {
        background: "rgba(255,255,255,0.2)",
        border: "none",
        cursor: "pointer",
        width: 32,
        height: 32,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        color: "#fff"
      }
    }, "\xD7"))), /*#__PURE__*/React.createElement("div", {
      style: {
        overflowY: "auto",
        flex: 1,
        padding: "8px 0"
      }
    }, s.steps.map((step, si) => /*#__PURE__*/React.createElement("div", {
      key: si,
      style: {
        display: "flex",
        gap: 14,
        padding: "14px 18px",
        borderBottom: si < s.steps.length - 1 ? "0.5px solid " + COLORS.border : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 10,
        background: s.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, step.icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.text,
        marginBottom: 4
      }
    }, step.heading), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: COLORS.textMuted,
        lineHeight: 1.7
      }
    }, step.body))))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "12px 18px 16px",
        borderTop: "1px solid " + COLORS.border,
        display: "flex",
        gap: 10,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setTourStep(t => Math.max(0, t - 1)),
      disabled: tourStep === 0,
      style: {
        flex: 1,
        padding: "10px",
        border: "1px solid " + COLORS.border,
        borderRadius: 10,
        background: "transparent",
        color: tourStep === 0 ? COLORS.textLight : COLORS.text,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: 14,
        cursor: tourStep === 0 ? "default" : "pointer"
      }
    }, "\u2190 Prev"), /*#__PURE__*/React.createElement("button", {
      onClick: () => setTourStep(t => Math.min(fullGuide.length - 1, t + 1)),
      disabled: tourStep === fullGuide.length - 1,
      style: {
        flex: 1,
        padding: "10px",
        border: "none",
        borderRadius: 10,
        background: s.color,
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        cursor: tourStep === fullGuide.length - 1 ? "default" : "pointer",
        opacity: tourStep === fullGuide.length - 1 ? 0.5 : 1
      }
    }, "Next \u2192"))));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 400,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      width: "100%",
      maxWidth: 440,
      maxHeight: "calc(100vh - 32px)",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
      animation: "scaleIn 0.2s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "16px 18px 14px",
      borderBottom: "1px solid " + COLORS.border,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 10,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    }
  }, "\uD83D\uDDFA\uFE0F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      fontWeight: 700
    }
  }, "Guide Tour")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      width: 32,
      height: 32,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      color: COLORS.textMuted
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: "auto",
      flex: 1,
      padding: "6px 0"
    }
  }, fullGuide.map((section, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setTourStep(i),
    style: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "13px 18px",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      borderBottom: i < fullGuide.length - 1 ? "0.5px solid " + COLORS.border : "none"
    },
    onMouseEnter: e => e.currentTarget.style.background = COLORS.bg,
    onMouseLeave: e => e.currentTarget.style.background = "transparent"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 12,
      background: section.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, section.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: COLORS.text
    }
  }, section.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, section.short)), /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.textLight,
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  })))))));
}

// ===================== STAFF INVITE SECTION =====================
function StaffInviteSection({
  user
}) {
  const [email, setEmail] = useState("");
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg] = useState({
    text: "",
    ok: true,
    isLink: false,
    copied: false
  });
  const [pendingToken] = useState(() => localStorage.getItem("rc_pending_invite"));
  const [acceptMsg, setAcceptMsg] = useState("");
  const [accepting, setAccepting] = useState(false);
  const token = localStorage.getItem("rc_token");

  // Load existing invites
  useEffect(() => {
    if (!token) {
      setFetching(false);
      return;
    }
    fetch(`${API_URL}/api/invite`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(r => r.json()).then(d => {
      setInvites(d.invites || []);
      setFetching(false);
    }).catch(() => setFetching(false));
  }, []);
  const sendInvite = async () => {
    if (!email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      setMsg({
        text: "Enter a valid email address",
        ok: false
      });
      return;
    }
    setLoading(true);
    setMsg({
      text: "",
      ok: true
    });
    try {
      const res = await fetch(`${API_URL}/api/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg({
          text: data.error || "Failed to send invite",
          ok: false
        });
      } else {
        setInvites(prev => [data.invite, ...prev]);
        setEmail("");
        setMsg({
          text: data.inviteURL || window.location.origin + "?invite=" + (data.invite?.token || ""),
          ok: true,
          isLink: true
        });
      }
    } catch (e) {
      setMsg({
        text: "Network error. Try again.",
        ok: false
      });
    }
    setLoading(false);
  };
  const revokeInvite = async inviteId => {
    // Confirmed inline — no window.confirm needed
    try {
      const res = await fetch(`${API_URL}/api/invite/${inviteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.ok) {
        // Remove from list immediately
        setInvites(prev => prev.filter(i => i._id !== inviteId));
      }
    } catch (e) {}
  };
  const acceptPendingInvite = async () => {
    if (!pendingToken) return;
    setAccepting(true);
    setAcceptMsg("");
    try {
      const res = await fetch(`${API_URL}/api/invite/accept`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          token: pendingToken
        })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.removeItem("rc_pending_invite");
        setAcceptMsg("✅ " + data.message);
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setAcceptMsg("❌ " + (data.error || "Failed to accept invite"));
      }
    } catch (e) {
      setAcceptMsg("❌ Network error. Try again.");
    }
    setAccepting(false);
  };

  // If user has a pending invite token, show accept card
  if (pendingToken) {
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "0.75rem",
        background: COLORS.primaryLight,
        border: `1.5px solid ${COLORS.primary}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 12,
        background: COLORS.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22
      }
    }, "\uD83D\uDCE9"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.primary
      }
    }, "You have a pending invite!"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, "Accept to join your employer's business records"))), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: acceptPendingInvite,
      disabled: accepting
    }, accepting ? "Accepting…" : "✅ Accept Invite & Join Business"), acceptMsg && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        marginTop: 8,
        color: acceptMsg.startsWith("✅") ? COLORS.accent : COLORS.danger
      }
    }, acceptMsg), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        localStorage.removeItem("rc_pending_invite");
        window.location.reload();
      },
      style: {
        marginTop: 8,
        background: "none",
        border: "none",
        color: COLORS.textMuted,
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Dismiss invite"));
  }
  if (user.role === "staff") {
    return /*#__PURE__*/React.createElement("div", {
      className: "card",
      style: {
        marginBottom: "0.75rem",
        background: COLORS.accentLight,
        border: `1.5px solid ${COLORS.accent}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 12,
        background: COLORS.accent,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 22
      }
    }, "\uD83D\uDC65"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.accent
      }
    }, "Staff Account"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, "You have access to the Shop Sales section only. Farm, Customer Records and Debt are your own independent sections."))));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22
    }
  }, "\uD83D\uDC65"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700
    }
  }, "Invite Staff"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 1
    }
  }, "Give a partner or employee access to your records"))), fetching ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 12
    }
  }, "Loading...") : invites.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 14
    }
  }, invites.filter(inv => inv.status !== "revoked").map(inv => /*#__PURE__*/React.createElement("div", {
    key: inv._id,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "8px 0",
      borderBottom: `0.5px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: inv.status === "accepted" ? COLORS.accentLight : COLORS.primaryLight,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      fontWeight: 700,
      color: inv.status === "accepted" ? COLORS.accent : COLORS.primary
    }
  }, (inv.staffName || inv.email)[0].toUpperCase()), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.text
    }
  }, inv.staffName || inv.email), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: inv.status === "accepted" ? COLORS.accent : COLORS.amber,
      marginTop: 1
    }
  }, inv.status === "accepted" ? "✅ Active" : inv.status === "revoked" ? "❌ Revoked" : "⏳ Invite pending"))), inv.status !== "revoked" && /*#__PURE__*/React.createElement("button", {
    onClick: () => revokeInvite(inv._id),
    style: {
      background: COLORS.dangerLight,
      border: "none",
      cursor: "pointer",
      color: COLORS.danger,
      fontSize: 11,
      fontWeight: 700,
      borderRadius: 7,
      padding: "5px 10px",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Remove")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    style: {
      flex: 1
    },
    placeholder: "staff@email.com",
    value: email,
    onChange: e => {
      setEmail(e.target.value);
      setMsg({
        text: "",
        ok: true
      });
    },
    onKeyDown: e => e.key === "Enter" && sendInvite(),
    type: "email"
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: sendInvite,
    disabled: loading,
    style: {
      flexShrink: 0,
      width: "auto",
      padding: "0 16px"
    }
  }, loading ? "..." : "Invite")), msg.text && !msg.isLink && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 8,
      color: msg.ok ? COLORS.accent : COLORS.danger,
      lineHeight: 1.5
    }
  }, msg.text), msg.isLink && msg.text && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      background: COLORS.accentLight,
      border: `1px solid #6EE7B7`,
      borderRadius: 12,
      padding: "12px 14px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: COLORS.accent,
      marginBottom: 8
    }
  }, "\u2705 Invite created! Share this link with your staff:"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      wordBreak: "break-all",
      marginBottom: 10,
      background: "var(--surface)",
      borderRadius: 8,
      padding: "8px 10px",
      fontFamily: "'Space Mono', monospace"
    }
  }, msg.text), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      navigator.clipboard.writeText(msg.text).then(() => {
        setMsg(prev => ({
          ...prev,
          copied: true
        }));
        setTimeout(() => setMsg(prev => ({
          ...prev,
          copied: false
        })), 2500);
      });
    },
    style: {
      flex: 1,
      background: COLORS.accent,
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "8px",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, msg.copied ? "✅ Copied!" : "📋 Copy Link"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      const txt = encodeURIComponent("Join my business on Record Chief: " + msg.text);
      window.open("https://wa.me/?text=" + txt, "_blank");
    },
    style: {
      flex: 1,
      background: "#25D366",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "8px",
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\uD83D\uDCF1 WhatsApp"))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      padding: "10px 12px",
      background: COLORS.primaryLight,
      borderRadius: 10,
      fontSize: 12,
      color: COLORS.primary,
      lineHeight: 1.6
    }
  }, "\uD83D\uDCA1 Invited staff will have access to your ", /*#__PURE__*/React.createElement("strong", null, "Shop Sales"), " and ", /*#__PURE__*/React.createElement("strong", null, "Inventory"), " only. Farm, Customer Records and Debt sections remain private to each user. You can remove access anytime."));
}

// ===================== EMAIL VERIFY SECTION =====================
function EmailVerifySection({
  user,
  onVerified
}) {
  const [otp, setOtp] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem("rc_token");
  const sendCode = async () => {
    setSending(true);
    setError("");
    setSent(false);
    try {
      const res = await fetch(`${API_URL}/api/otp/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Failed to send code.");else {
        setSent(true);
        setOtp("");
      }
    } catch (e) {
      setError("Network error. Check your connection.");
    }
    setSending(false);
  };
  const verifyCode = async () => {
    if (!otp.trim()) {
      setError("Enter the code from your email");
      return;
    }
    setVerifying(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          otp: otp.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Incorrect code.");
      } else {
        setSuccess(true);
        if (onVerified) onVerified();
      }
    } catch (e) {
      setError("Network error.");
    }
    setVerifying(false);
  };
  if (user.emailVerified || success) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: COLORS.accentLight,
        border: `1px solid #6EE7B7`,
        borderRadius: 14,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: "0.75rem"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 24
      }
    }, "\u2705"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: COLORS.accent
      }
    }, "Email Verified"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, user.email, " is verified")));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.amberLight,
      border: `1px solid #FCD34D`,
      borderRadius: 14,
      padding: "16px",
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22
    }
  }, "\uD83D\uDCE7"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: COLORS.amber
    }
  }, "Email not verified"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textMuted,
      marginTop: 1
    }
  }, "Verify your email to secure your account"))), sent ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.accent,
      marginBottom: 10,
      background: COLORS.accentLight,
      borderRadius: 8,
      padding: "8px 10px"
    }
  }, "\u2705 Code sent to ", /*#__PURE__*/React.createElement("strong", null, user.email), ". Check your inbox (and spam folder)."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "number",
    placeholder: "Enter 6-digit code",
    value: otp,
    maxLength: 6,
    onChange: e => {
      setOtp(e.target.value.slice(0, 6));
      setError("");
    },
    onKeyDown: e => e.key === "Enter" && verifyCode(),
    style: {
      flex: 1,
      textAlign: "center",
      fontFamily: "'Space Mono', monospace",
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: 6
    },
    autoFocus: true
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-sm",
    onClick: verifyCode,
    disabled: verifying,
    style: {
      flexShrink: 0,
      padding: "0 14px"
    }
  }, verifying ? "…" : "Verify")), /*#__PURE__*/React.createElement("button", {
    onClick: sendCode,
    disabled: sending,
    style: {
      background: "none",
      border: "none",
      color: COLORS.primary,
      fontSize: 12,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      padding: 0
    }
  }, sending ? "Sending…" : "Resend code")) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: sendCode,
    disabled: sending,
    style: {
      background: COLORS.amber
    }
  }, sending ? "Sending…" : "📨 Send Verification Code"), error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: COLORS.danger,
      fontSize: 12,
      marginTop: 8
    }
  }, error));
}

// ===================== DELETE ACCOUNT SECTION =====================
function DeleteAccountSection({
  user,
  onLogout
}) {
  const [open, setOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const confirmDelete = async () => {
    if (emailInput.trim().toLowerCase() !== user.email?.toLowerCase()) {
      setError("Email does not match your account email.");
      return;
    }
    setLoading(true);
    setError("");
    const token = localStorage.getItem("rc_token");
    try {
      const res = await fetch(`${API_URL}/api/auth/account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email: emailInput.trim()
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to delete account.");
        setLoading(false);
        return;
      }
      // Clear all local data
      Object.keys(localStorage).forEach(k => localStorage.removeItem(k));
      onLogout();
    } catch (e) {
      setError("Network error. Check your connection.");
      setLoading(false);
    }
  };
  if (!open) return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(true),
    style: {
      width: "100%",
      background: "none",
      border: `1px solid ${COLORS.danger}`,
      borderRadius: 10,
      padding: "10px 14px",
      color: COLORS.danger,
      fontSize: 13,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      display: "flex",
      alignItems: "center",
      gap: 8,
      justifyContent: "center"
    }
  }, "\uD83D\uDDD1\uFE0F Delete Account"));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      background: COLORS.dangerLight,
      border: `1.5px solid #FCA5A5`,
      borderRadius: 14,
      padding: "16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      color: COLORS.danger,
      marginBottom: 6
    }
  }, "\u26A0\uFE0F Delete Account"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, "This will permanently delete your account and ", /*#__PURE__*/React.createElement("strong", null, "all your business records"), ". This cannot be undone."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "Type your email ", /*#__PURE__*/React.createElement("strong", null, user.email), " to confirm:"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    type: "email",
    placeholder: user.email,
    value: emailInput,
    onChange: e => {
      setEmailInput(e.target.value);
      setError("");
    },
    style: {
      marginBottom: 10
    }
  }), error && /*#__PURE__*/React.createElement("div", {
    style: {
      color: COLORS.danger,
      fontSize: 12,
      marginBottom: 8
    }
  }, error), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setOpen(false);
      setEmailInput("");
      setError("");
    },
    className: "btn btn-outline",
    style: {
      flex: 1
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: confirmDelete,
    disabled: loading || !emailInput.trim(),
    className: "btn btn-danger",
    style: {
      flex: 1,
      opacity: emailInput.trim() ? 1 : 0.5
    }
  }, loading ? "Deleting…" : "Delete Forever")));
}
function CurrencySelector() {
  const [cur, setCur] = useState(localStorage.getItem("sl_currency") || "NGN");
  const [saved, setSaved] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "0.75rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "var(--accent-light)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      flexShrink: 0
    }
  }, "\uD83D\uDCB1"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text)"
    }
  }, "Currency"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 1
    }
  }, saved ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--accent)"
    }
  }, "\u2705 Saved \u2014 restart app to see changes") : "Default is Nigerian Naira (₦)")), /*#__PURE__*/React.createElement("select", {
    value: cur,
    onChange: e => {
      const v = e.target.value;
      setCur(v);
      localStorage.setItem("sl_currency", v);
      setSaved(true);
      // Fire sync event so all screens pick up new currency
      window.dispatchEvent(new CustomEvent("rc_sync_update"));
    },
    className: "form-input",
    style: {
      width: "auto",
      padding: "6px 10px",
      fontSize: 14,
      fontWeight: 700
    }
  }, Object.entries(CURRENCIES).map(([code, sym]) => /*#__PURE__*/React.createElement("option", {
    key: code,
    value: code
  }, sym, " ", code)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      display: "flex",
      gap: 6,
      flexWrap: "wrap"
    }
  }, Object.entries(CURRENCIES).map(([code, sym]) => /*#__PURE__*/React.createElement("button", {
    key: code,
    onClick: () => {
      setCur(code);
      localStorage.setItem("sl_currency", code);
      setSaved(true);
      window.dispatchEvent(new CustomEvent("rc_sync_update"));
    },
    style: {
      padding: "5px 12px",
      borderRadius: 20,
      fontSize: 12,
      fontWeight: 700,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      background: cur === code ? "var(--primary)" : "var(--bg)",
      color: cur === code ? "#fff" : "var(--text-muted)",
      border: `1px solid ${cur === code ? "var(--primary)" : "var(--border)"}`,
      transition: "all 0.15s"
    }
  }, sym, " ", code))));
}
function ProfileScreen({
  user,
  onLogout,
  onManageSectors
}) {
  const avatarKey = `sl_avatar_${user.uid}`;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [toast, setToast] = useState(null);
  const [avatar, setAvatar] = useLocalState(avatarKey, null);
  const initials = user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setToast({
        msg: "Image must be under 2MB",
        type: "error"
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = ev => {
      setAvatar(ev.target.result);
      setToast({
        msg: "Profile picture updated!",
        type: "success"
      });
    };
    reader.readAsDataURL(file);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "1.5rem 0 1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 80,
      height: 80,
      margin: "0 auto 0.5rem"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "avatar-upload",
    style: {
      cursor: "pointer",
      display: "block",
      width: "100%",
      height: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "profile-avatar-lg"
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: "Profile"
  }) : /*#__PURE__*/React.createElement("span", null, initials), /*#__PURE__*/React.createElement("div", {
    className: "avatar-edit-overlay"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "13",
    r: "4"
  }))))), /*#__PURE__*/React.createElement("input", {
    id: "avatar-upload",
    type: "file",
    accept: "image/*",
    style: {
      display: "none"
    },
    onChange: handleAvatarChange
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.primary,
      marginBottom: 4,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "avatar-upload",
    style: {
      cursor: "pointer"
    }
  }, avatar ? "Change photo" : "Add profile photo"), avatar && /*#__PURE__*/React.createElement("span", {
    onClick: () => {
      setAvatar(null);
      setToast({
        msg: "Photo removed",
        type: "success"
      });
    },
    style: {
      color: COLORS.danger,
      marginLeft: 10,
      cursor: "pointer"
    }
  }, "Remove")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700,
      marginTop: 6
    }
  }, user.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, user.email), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: COLORS.textLight,
      marginTop: 3
    }
  }, user.phone)), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, editing ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Display Name"), /*#__PURE__*/React.createElement("input", {
    className: "form-input",
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      flex: 1
    },
    onClick: () => {
      setEditing(false);
      setName(user.name);
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      flex: 1
    },
    onClick: () => {
      user.name = name;
      setEditing(false);
      setToast({
        msg: "Profile updated!",
        type: "success"
      });
    }
  }, "Save"))) : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Full Name"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, user.name)), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline btn-sm",
    onClick: () => setEditing(true)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit",
    size: 14
  }), " Edit")), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Email"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, user.email)), /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Phone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, user.phone)), user.location && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "divider"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted
    }
  }, "Business Location"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 500
    }
  }, user.location))))), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Sharing & Collaboration"), (user.sectors || ["shop"]).includes("shop") && /*#__PURE__*/React.createElement(StaffInviteSection, {
    user: user
  }), /*#__PURE__*/React.createElement(EmailVerifySection, {
    user: user,
    onVerified: () => {
      const updated = {
        ...user,
        emailVerified: true
      };
      const session = localStorage.getItem("rc_session");
      if (session) localStorage.setItem("rc_session", JSON.stringify(updated));
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Currency & Display"), /*#__PURE__*/React.createElement(CurrencySelector, null), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Privacy & Security"), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "0.75rem"
    }
  }, (() => {
    const pinKey = "sl_pin";
    const [currentPin, setCurrentPin] = useLocalState(pinKey, null);
    const [pinSetup, setPinSetup] = useState(false);
    const [p1, setP1] = useState("");
    const [p2, setP2] = useState("");
    const [pErr, setPErr] = useState("");
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: COLORS.primaryLight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18
      }
    }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700
      }
    }, "App PIN Lock"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, currentPin ? "PIN is set" : "No PIN — app is unlocked"))), /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setPinSetup(v => !v);
        setP1("");
        setP2("");
        setPErr("");
      },
      style: {
        background: currentPin ? COLORS.dangerLight : COLORS.primaryLight,
        border: "none",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 12,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        color: currentPin ? COLORS.danger : COLORS.primary
      }
    }, currentPin ? "Remove PIN" : pinSetup ? "Cancel" : "Set PIN")), currentPin && !pinSetup && /*#__PURE__*/React.createElement("button", {
      onClick: () => {
        setCurrentPin(null);
        showToast && showToast("PIN removed");
      },
      style: {
        marginTop: 8,
        width: "100%",
        padding: "8px",
        border: `1px solid ${COLORS.dangerLight}`,
        borderRadius: 8,
        background: COLORS.dangerLight,
        color: COLORS.danger,
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "Remove PIN Lock"), pinSetup && !currentPin && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "New PIN (4 digits)"), /*#__PURE__*/React.createElement("input", {
      type: "password",
      inputMode: "numeric",
      maxLength: 4,
      className: "form-input",
      placeholder: "\u2022\u2022\u2022\u2022",
      value: p1,
      onChange: e => setP1(e.target.value.replace(/\D/g, "").slice(0, 4))
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, "Confirm PIN"), /*#__PURE__*/React.createElement("input", {
      type: "password",
      inputMode: "numeric",
      maxLength: 4,
      className: "form-input",
      placeholder: "\u2022\u2022\u2022\u2022",
      value: p2,
      onChange: e => setP2(e.target.value.replace(/\D/g, "").slice(0, 4))
    })), pErr && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.danger,
        marginBottom: 8
      }
    }, pErr), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary",
      onClick: () => {
        if (p1.length !== 4) {
          setPErr("PIN must be 4 digits");
          return;
        }
        if (p1 !== p2) {
          setPErr("PINs don't match");
          return;
        }
        setCurrentPin(p1);
        setPinSetup(false);
        setP1("");
        setP2("");
        setPErr("");
      }
    }, "Save PIN")));
  })()), (() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
    if (isStandalone) return null;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: COLORS.primaryLight,
        border: `1px solid #BFDBFE`,
        borderRadius: 14,
        padding: "12px 14px",
        marginBottom: "0.75rem",
        display: "flex",
        gap: 10,
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24,
        flexShrink: 0
      }
    }, "\uD83D\uDCF2"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        color: COLORS.primary
      }
    }, "Install on your phone"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, "On iPhone: tap Share \u2192 \"Add to Home Screen\"", /*#__PURE__*/React.createElement("br", null), "On Android: tap menu \u2192 \"Add to Home Screen\"")));
  })(), /*#__PURE__*/React.createElement(HelpSupportSection, null), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Account"), /*#__PURE__*/React.createElement("div", {
    className: "card"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      width: "100%",
      marginBottom: 8,
      justifyContent: "flex-start",
      gap: 10
    },
    onClick: onManageSectors
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    size: 16
  }), " Manage Sectors"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-outline",
    style: {
      width: "100%",
      marginBottom: 8,
      justifyContent: "flex-start",
      gap: 10
    },
    onClick: async () => {
      const result = await AuthAPI.resetPassword(user.email);
      setToast({
        msg: result.ok ? USE_FIREBASE ? "Password reset email sent! Check your inbox." : "Reset sent (local mode)" : result.error || "Could not send reset",
        type: result.ok ? "success" : "error"
      });
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 16
  }), " Change Password"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-danger",
    style: {
      width: "100%",
      justifyContent: "flex-start",
      gap: 10
    },
    onClick: onLogout
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "logout",
    size: 16
  }), " Log Out")), /*#__PURE__*/React.createElement(DeleteAccountSection, {
    user: user,
    onLogout: onLogout
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: "2rem",
      fontSize: 11,
      color: COLORS.textLight
    }
  }, "Record Chief v1.0 \xB7 Built for Nigerian businesses"), toast && /*#__PURE__*/React.createElement(Toast, {
    msg: toast.msg,
    type: toast.type,
    onDone: () => setToast(null)
  }));
}

// ===================== ONBOARDING =====================
function OnboardingScreen({
  user,
  onDone
}) {
  const [step, setStep] = useState(0);
  const steps = [{
    emoji: "👋",
    title: `Welcome, ${user.name.split(" ")[0]}!`,
    body: "Record Chief helps you track your business records — sales, expenses, debts and more — all in one place.",
    color: "#2563EB"
  }, {
    emoji: "🏪",
    title: "Track Your Sales",
    body: "Record every sale, manage your inventory, and see your best-selling items at a glance.",
    color: "#059669"
  }, {
    emoji: "🌾",
    title: "Log Farm Expenses",
    body: "Categorise spending on seeds, fertilizer, labour and more. See exactly where your money goes.",
    color: "#1B4332"
  }, {
    emoji: "🤝",
    title: "Debt & Credit",
    body: "Never forget who owes you money or who you owe. Set due dates and track part-payments.",
    color: "#DC2626"
  }, {
    emoji: "📊",
    title: "Your Overview",
    body: "The Overview screen shows charts, profit/loss summaries, and your business health score — always up to date.",
    color: "#7C3AED"
  }];
  const s = steps[step];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      background: `linear-gradient(145deg, ${s.color}CC, ${s.color})`,
      color: "#fff",
      transition: "background 0.4s"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: "2.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 72,
      marginBottom: 20,
      lineHeight: 1
    }
  }, s.emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: "-0.5px",
      marginBottom: 12
    }
  }, s.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      opacity: 0.85,
      lineHeight: 1.7
    }
  }, s.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      gap: 8,
      marginBottom: 28
    }
  }, steps.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: i === step ? 24 : 8,
      height: 8,
      borderRadius: 4,
      background: i === step ? "#fff" : "rgba(255,255,255,0.35)",
      transition: "all 0.3s"
    }
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: () => step < steps.length - 1 ? setStep(s => s + 1) : onDone(),
    style: {
      width: "100%",
      padding: "15px",
      border: "none",
      borderRadius: 14,
      background: "#fff",
      color: s.color,
      fontWeight: 800,
      fontSize: 16,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      boxShadow: "0 6px 24px rgba(0,0,0,0.2)"
    }
  }, step < steps.length - 1 ? "Next →" : "Get Started 🚀"), step > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setStep(s => s - 1),
    style: {
      width: "100%",
      marginTop: 10,
      padding: "10px",
      border: "1.5px solid rgba(255,255,255,0.4)",
      borderRadius: 14,
      background: "transparent",
      color: "#fff",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\u2190 Back"), /*#__PURE__*/React.createElement("button", {
    onClick: onDone,
    style: {
      width: "100%",
      marginTop: 8,
      background: "none",
      border: "none",
      color: "rgba(255,255,255,0.5)",
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif",
      padding: "6px"
    }
  }, "Skip")));
}

// ===================== SYNC HISTORY SCREEN =====================
function SyncHistoryScreen({
  user
}) {
  const [log, setLog] = useState(() => {
    try {
      return SyncLog.get();
    } catch {
      return [];
    }
  });
  const [downloading, setDownloading] = useState(false);
  const lastSync = localStorage.getItem("rc_last_sync");

  // Weekly backup prompt   show if last backup was >7 days ago
  const lastBackupKey = `rc_last_backup_${user.uid}`;
  const lastBackup = localStorage.getItem(lastBackupKey);
  const daysSinceBackup = lastBackup ? Math.floor((Date.now() - new Date(lastBackup)) / 86400000) : 999;
  const showBackupPrompt = daysSinceBackup >= 7;
  const downloadBackup = async () => {
    const uid = user.uid;
    const readBiz = async k => {
      const v = await IDB.get(k).catch(() => null);
      if (v !== undefined && v !== null) return v;
      try {
        const r = localStorage.getItem(k);
        return r ? JSON.parse(r) : [];
      } catch {
        return [];
      }
    };
    const [_inv, _sales, _farm, _entries, _debt] = await Promise.all([readBiz(`sl_inv_${uid}`), readBiz(`sl_shopsales_${uid}`), readBiz(`sl_farm_${uid}`), readBiz(`sl_sales_${uid}`), readBiz(`sl_debt_${uid}`)]);
    const backup = {
      exportedAt: new Date().toISOString(),
      user: {
        name: user.name,
        email: user.email,
        location: user.location
      },
      inventory: _inv,
      shopSales: _sales,
      farmExpenses: _farm,
      salesEntries: _entries,
      debtRecords: _debt
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RecordChief_Backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    localStorage.setItem(lastBackupKey, new Date().toISOString());
    // refresh display
    setLog(SyncLog.get());
  };
  const typeColor = {
    kept_local: COLORS.amber,
    applied_server: COLORS.accent,
    conflict: COLORS.danger
  };
  const typeLabel = {
    kept_local: "⚠️ Kept Local",
    applied_server: "✅ Applied Server",
    conflict: "❌ Conflict"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: "var(--text)"
    }
  }, "\uD83D\uDD04 Sync History"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 3
    }
  }, lastSync ? `Last synced: ${new Date(lastSync).toLocaleString("en-NG")}` : "Not yet synced this session")), showBackupPrompt && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
      borderRadius: 16,
      padding: "16px 18px",
      marginBottom: "1rem",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 800,
      marginBottom: 5
    }
  }, "\uD83D\uDCE6 Weekly Backup Due"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      opacity: 0.85,
      marginBottom: 14,
      lineHeight: 1.6
    }
  }, lastBackup ? `Your last backup was ${daysSinceBackup} days ago. Download a fresh JSON backup of all your data.` : "You haven't downloaded a local backup yet. It's a safety net in case anything goes wrong."), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      setDownloading(true);
      try {
        await downloadBackup();
      } finally {
        setDownloading(false);
      }
    },
    disabled: downloading,
    style: {
      background: "#fff",
      color: "#1E3A8A",
      border: "none",
      borderRadius: 10,
      padding: "9px 18px",
      fontSize: 13,
      fontWeight: 800,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "\uD83D\uDCBE Download Backup Now")), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginBottom: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 12,
      background: "var(--primary-light)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20
    }
  }, "\uD83D\uDCBE"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text)"
    }
  }, "Local JSON Backup"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      marginTop: 1
    }
  }, lastBackup ? `Last backup: ${new Date(lastBackup).toLocaleDateString("en-NG")}` : "No backup downloaded yet"))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: async () => {
      setDownloading(true);
      try {
        await downloadBackup();
      } finally {
        setDownloading(false);
      }
    },
    disabled: downloading
  }, downloading ? "⏳ Preparing..." : "💾 Download Full Backup (.json)"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-muted)",
      marginTop: 8,
      lineHeight: 1.6
    }
  }, "Downloads all your records as a JSON file. Store it in Google Drive or WhatsApp for safety.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "0.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-title",
    style: {
      margin: 0
    }
  }, "Conflict Log"), log.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      SyncLog.clear();
      setLog([]);
    },
    style: {
      background: "none",
      border: "none",
      color: COLORS.danger,
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "'Inter', sans-serif"
    }
  }, "Clear")), log.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      textAlign: "center",
      padding: "2rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 36,
      marginBottom: 8
    }
  }, "\u2705"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 4
    }
  }, "No conflicts"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)"
    }
  }, "All syncs have been clean")) : /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      padding: 0,
      overflow: "hidden"
    }
  }, log.map((entry, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: "12px 16px",
      borderBottom: i < log.length - 1 ? `0.5px solid var(--border)` : "none",
      display: "flex",
      alignItems: "flex-start",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: typeColor[entry.type] || COLORS.textMuted,
      marginTop: 5,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: typeColor[entry.type] || "var(--text)"
    }
  }, typeLabel[entry.type] || entry.type), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, entry.label, " \u2014 ", entry.reason), entry.localCount !== undefined && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: "var(--text-light)",
      marginTop: 2
    }
  }, "Local: ", entry.localCount, " records \xB7 Server: ", entry.serverCount, " records")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      color: "var(--text-light)",
      flexShrink: 0,
      marginTop: 2
    }
  }, new Date(entry.ts).toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "card",
    style: {
      marginTop: "1rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: "var(--text)",
      marginBottom: 10
    }
  }, "\u2699\uFE0F Sync Settings"), [["Active interval", "Push every 30s · Pull every 15s"], ["Idle interval", "Push every 2min · Pull every 60s (saves battery)"], ["Background", "Sync paused when app is in background"], ["Conflict strategy", "Local data wins when server is behind"], ["Storage", "IndexedDB (primary) · localStorage (fallback)"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "7px 0",
      borderBottom: `0.5px solid var(--border)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-muted)",
      fontWeight: 600
    }
  }, k), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text)",
      textAlign: "right",
      maxWidth: "55%"
    }
  }, v)))));
}

// ===================== OFFLINE INDICATOR =====================
function OfflineIndicator() {
  const [online, setOnline] = useState(navigator.onLine);
  const [showOnline, setShowOnline] = useState(false);
  const timerRef = useRef(null);
  useEffect(() => {
    const goOnline = () => {
      setOnline(true);
      setShowOnline(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowOnline(false), 3000);
    };
    const goOffline = () => {
      setOnline(false);
      setShowOnline(false);
    };
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
      clearTimeout(timerRef.current);
    };
  }, []);

  // Show nothing when online and no recent transition
  if (online && !showOnline) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      // Push below topbar (56px) so it never overlaps nav
      position: "fixed",
      top: 56,
      left: 0,
      right: 0,
      zIndex: 300,
      background: online ? COLORS.accent : "#1E293B",
      color: "#fff",
      fontSize: 13,
      fontWeight: 600,
      padding: "8px 16px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      animation: "slideDown 0.3s ease"
    }
  }, online ? "✅ Back online — syncing your data…" : "📵 You're offline — changes save locally");
}

// ===================== NOTIFICATIONS SCREEN =====================
function NotificationsScreen({
  user,
  onNavigateShop
}) {
  const debtKey = `sl_debt_${user.uid}`;
  const invKey = `sl_inv_${user.uid}`;
  const records = (() => {
    try {
      return JSON.parse(localStorage.getItem(debtKey)) || [];
    } catch {
      return [];
    }
  })();
  const inventory = (() => {
    try {
      return JSON.parse(localStorage.getItem(invKey)) || [];
    } catch {
      return [];
    }
  })();
  const now = new Date();
  const overdue = records.filter(r => !r.settled && !r.archived && r.dueDate && r.dueDate < TODAY());
  const dueSoon = records.filter(r => {
    if (r.settled || r.archived || !r.dueDate) return false;
    const days = Math.ceil((new Date(r.dueDate) - now) / 86400000);
    const threshold = parseInt(r.reminderDays ?? 1);
    return days >= 0 && days <= threshold;
  });
  const outOfStock = inventory.filter(i => i.stock === 0);
  const lowStock = inventory.filter(i => i.stock > 0 && i.stock < 5);
  const hasAny = overdue.length + dueSoon.length + outOfStock.length + lowStock.length > 0;
  const Section = ({
    emoji,
    title,
    color,
    bg,
    border,
    items,
    renderItem
  }) => items.length === 0 ? null : /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: "1.25rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20
    }
  }, emoji), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color
    }
  }, title), /*#__PURE__*/React.createElement("span", {
    style: {
      background: color,
      color: "#fff",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 9px",
      marginLeft: "auto"
    }
  }, items.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: bg,
      border: `1.5px solid ${border}`,
      borderRadius: 14,
      padding: "13px 14px",
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, renderItem(item)))));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg, #1E293B 0%, #334155 100%)`,
      borderRadius: 18,
      padding: "18px",
      marginBottom: "1.25rem",
      color: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      marginBottom: 8
    }
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800
    }
  }, "Notifications"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      opacity: 0.65,
      marginTop: 4
    }
  }, hasAny ? `${overdue.length + dueSoon.length + outOfStock.length + lowStock.length} alerts need your attention` : "You're all caught up!")), !hasAny && /*#__PURE__*/React.createElement("div", {
    className: "empty-state"
  }, /*#__PURE__*/React.createElement("div", {
    className: "empty-icon"
  }, "\u2705"), /*#__PURE__*/React.createElement("h3", null, "All clear!"), /*#__PURE__*/React.createElement("p", null, "No overdue debts, no stock issues. You're on top of everything.")), /*#__PURE__*/React.createElement(Section, {
    emoji: "\uD83D\uDEA8",
    title: "Overdue Records",
    color: COLORS.danger,
    bg: COLORS.dangerLight,
    border: "#FCA5A5",
    items: overdue,
    renderItem: r => {
      const daysOver = Math.abs(Math.ceil((new Date(r.dueDate) - now) / 86400000));
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "#FEE2E2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0
        }
      }, r.type === "credit" ? "💰" : "📤"), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: COLORS.text
        }
      }, r.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: COLORS.textMuted,
          marginTop: 2
        }
      }, r.type === "credit" ? "Owes you" : "You owe", " \xB7 Due ", r.dueDate)), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontFamily: "'Space Mono', monospace",
          fontSize: 15,
          fontWeight: 700,
          color: COLORS.danger
        }
      }, NAIRA(r.amount)), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: COLORS.danger,
          fontWeight: 600,
          marginTop: 2
        }
      }, daysOver, "d overdue")));
    }
  }), /*#__PURE__*/React.createElement(Section, {
    emoji: "\u23F0",
    title: "Due Within 7 Days",
    color: COLORS.amber,
    bg: COLORS.amberLight,
    border: "#FCD34D",
    items: dueSoon,
    renderItem: r => {
      const days = Math.ceil((new Date(r.dueDate) - now) / 86400000);
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        style: {
          width: 42,
          height: 42,
          borderRadius: 12,
          background: "#FEF3C7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          flexShrink: 0
        }
      }, r.type === "credit" ? "💰" : "📤"), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 15,
          fontWeight: 700,
          color: COLORS.text
        }
      }, r.name), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: COLORS.textMuted,
          marginTop: 2
        }
      }, r.type === "credit" ? "Owes you" : "You owe", " \xB7 ", NAIRA(r.amount))), /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "right",
          flexShrink: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 13,
          fontWeight: 700,
          color: COLORS.amber
        }
      }, days === 0 ? "Today!" : `${days}d left`), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: COLORS.textMuted,
          marginTop: 2
        }
      }, "Due ", r.dueDate)));
    }
  }), /*#__PURE__*/React.createElement(Section, {
    emoji: "\uD83D\uDEAB",
    title: "Out of Stock",
    color: COLORS.danger,
    bg: COLORS.dangerLight,
    border: "#FCA5A5",
    items: outOfStock,
    renderItem: item => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 12,
        background: "#FEE2E2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: COLORS.text
      }
    }, item.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, NAIRA(item.price), " per unit \xB7 0 remaining")), /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigateShop && onNavigateShop(),
      style: {
        background: COLORS.danger,
        color: "#fff",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 700,
        flexShrink: 0,
        border: "none",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, "+ Add Stock"))
  }), /*#__PURE__*/React.createElement(Section, {
    emoji: "\u26A0\uFE0F",
    title: "Low Stock",
    color: COLORS.amber,
    bg: COLORS.amberLight,
    border: "#FCD34D",
    items: lowStock,
    renderItem: item => /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 12,
        background: "#FEF3C7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        flexShrink: 0
      }
    }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 700,
        color: COLORS.text
      }
    }, item.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: COLORS.textMuted,
        marginTop: 2
      }
    }, NAIRA(item.price), " per unit")), /*#__PURE__*/React.createElement("button", {
      onClick: () => onNavigateShop && onNavigateShop(),
      style: {
        background: COLORS.amber,
        color: "#fff",
        borderRadius: 8,
        padding: "8px 14px",
        fontSize: 13,
        fontWeight: 700,
        flexShrink: 0,
        border: "none",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif"
      }
    }, item.stock, " left \u2014 Restock"))
  }));
}

// ===================== MAIN APP =====================
export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [user, setUser] = useLocalState("sl_user", null);
  const [sector, setSector] = useLocalState("sl_sector", "shop");
  const [navTab, setNavTab] = useState("home");
  const [navHistory, setNavHistory] = useState(["home"]); // back stack
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

  //    Back button / Android back gesture handler               
  useEffect(() => {
    // Push initial state so back button has somewhere to return to
    window.history.pushState({
      screen: "app",
      navTab: "home"
    }, "");
    const handlePopState = e => {
      // If not in app, let browser handle it
      if (screen !== "app") return;

      // If there's internal nav history, go back within the app
      setNavHistory(prev => {
        if (prev.length > 1) {
          const newHistory = prev.slice(0, -1);
          const prevTab = newHistory[newHistory.length - 1];
          setNavTab(prevTab);
          // Re-push state so there's always something to pop
          window.history.pushState({
            screen: "app",
            navTab: prevTab
          }, "");
          return newHistory;
        }
        // Already at home   go to home if not there
        if (navTab !== "home") {
          setNavTab("home");
          window.history.pushState({
            screen: "app",
            navTab: "home"
          }, "");
          return ["home"];
        }
        // At home   push state again to prevent exit on first press
        window.history.pushState({
          screen: "app",
          navTab: "home"
        }, "");
        return prev;
      });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [screen, navTab]);

  // Real-time sync   push changes every 30s, pull latest every 15s
  useEffect(() => {
    if (!user?.uid) return;
    const uid = user.uid;

    //    Adaptive intervals                               
    // Active (user interacted in last 2 min): push 30s / pull 15s
    // Idle  (no interaction for 2+ min):      push 2min / pull 60s
    // Background (page hidden):               pause entirely
    let lastActivity = Date.now();
    let pushTimer = null;
    let pullTimer = null;
    const ACTIVE_PUSH = 30_000;
    const ACTIVE_PULL = 15_000;
    const IDLE_PUSH = 120_000;
    const IDLE_PULL = 60_000;
    const IDLE_THRESH = 120_000; // 2 min

    const isIdle = () => Date.now() - lastActivity > IDLE_THRESH;
    const markActive = () => {
      lastActivity = Date.now();
    };
    ["click", "keydown", "touchstart", "scroll"].forEach(ev => window.addEventListener(ev, markActive, {
      passive: true
    }));
    const doSync = () => {
      if (!navigator.onLine || document.hidden) return;
      AuthAPI.syncToServer(uid).catch(() => {});
    };
    const doPull = () => {
      if (!navigator.onLine || document.hidden) return;
      AuthAPI.syncFromServer(uid).catch(() => {});
    };
    const schedulePush = () => {
      clearTimeout(pushTimer);
      const delay = isIdle() ? IDLE_PUSH : ACTIVE_PUSH;
      pushTimer = setTimeout(() => {
        doSync();
        schedulePush();
      }, delay);
    };
    const schedulePull = () => {
      clearTimeout(pullTimer);
      const delay = isIdle() ? IDLE_PULL : ACTIVE_PULL;
      pullTimer = setTimeout(() => {
        doPull();
        schedulePull();
      }, delay);
    };

    // On login: PULL FIRST, then schedule normal push/pull
    // Never push on fresh login — would overwrite server data with empty local
    if (navigator.onLine) {
      setTimeout(doPull, 800); // pull server data first
    }
    schedulePush();
    schedulePull();

    // Increment syncTick on every server pull — forces data screens to remount
    const handleSyncUpdate = e => {
      setSyncTick(t => t + 1);
      try {
        const cached = JSON.parse(localStorage.getItem("rc_session") || "{}");
        if (cached.uid) setUser(prev => ({
          ...prev,
          ...cached
        }));
      } catch {}
    };
    window.addEventListener("rc_sync_update", handleSyncUpdate);

    // When coming back online: PULL first (get latest), then push local changes
    const handleOnline = () => {
      setTimeout(() => {
        doPull(); // get server state first
        setTimeout(doSync, 2000); // then push local changes
      }, 500);
    };
    window.addEventListener("online", handleOnline);

    // Push immediately on every data write (real-time cross-device sync)
    let writeTimer = null;
    const handleDataWrite = () => {
      if (!navigator.onLine) return;
      clearTimeout(writeTimer);
      writeTimer = setTimeout(() => {
        doSync();
        setTimeout(doPull, 2000);
      }, 1500);
    };
    window.addEventListener("rc_data_write", handleDataWrite);

    // Pause when tab hidden, resume when visible
    const handleVisibility = () => {
      if (!document.hidden) {
        markActive();
        if (navigator.onLine) {
          doSync();
          setTimeout(doPull, 1000);
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearTimeout(pushTimer);
      clearTimeout(pullTimer);
      clearTimeout(writeTimer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("rc_sync_update", handleSyncUpdate);
      window.removeEventListener("rc_data_write", handleDataWrite);
      document.removeEventListener("visibilitychange", handleVisibility);
      ["click", "keydown", "touchstart", "scroll"].forEach(ev => window.removeEventListener(ev, markActive));
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
          applicationServerKey: 'BII1mr0E_AuVpmeYLMkh56uNYL85STG9nB5AqbkSNQVvZZrkEjzWcadHQaJpYGa7CgoSuvCtNVT5aCvjnkNBYLU'
        });
        const token = localStorage.getItem('rc_token');
        if (!token) return;
        await fetch(`${API_URL}/api/push/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            subscription: sub
          })
        });
        console.log('✅ Push notifications enabled');
      } catch (e) {
        console.log('Push setup skipped:', e.message);
      }
    };
    // Ask after 3 seconds so it doesn't feel intrusive on login
    const timer = setTimeout(registerPush, 3000);
    return () => clearTimeout(timer);
  }, [user?.uid]);

  // Real-time notification count   polls every 3 seconds
  useEffect(() => {
    const compute = () => {
      if (!user?.uid) return;
      const recs = (() => {
        try {
          return JSON.parse(localStorage.getItem(`sl_debt_${user.uid}`)) || [];
        } catch {
          return [];
        }
      })();
      const inv = (() => {
        try {
          return JSON.parse(localStorage.getItem(`sl_inv_${user.uid}`)) || [];
        } catch {
          return [];
        }
      })();
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
  useEffect(() => {
    setShowSectorSwitcher(false);
  }, [navTab]);

  // Track navTab changes to build back stack for Android back button
  const prevNavTabRef = useRef(null);
  useEffect(() => {
    if (!user) return; // don't track pre-login navigation
    const prev = prevNavTabRef.current;
    if (prev !== null && prev !== navTab) {
      // Push new entry to history
      window.history.pushState({
        screen: "app",
        navTab
      }, "");
      setNavHistory(h => {
        // Don't duplicate consecutive same tabs
        if (h[h.length - 1] === navTab) return h;
        // Limit stack to 20 entries
        const next = [...h, navTab].slice(-20);
        return next;
      });
    }
    prevNavTabRef.current = navTab;
  }, [navTab, user]);
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
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify({
              token: pendingInvite
            })
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
      const token = localStorage.getItem("rc_token");
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
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then(r => r.ok ? r.json() : null).then(data => {
              if (data?.user) {
                const fresh = {
                  ...data.user,
                  uid: data.user._id
                };
                setUser(fresh);
                localStorage.setItem("rc_session", JSON.stringify(fresh));
              }
            }).catch(() => {});
            return;
          }
        } catch (e) {}
      }
      setScreen("welcome");
    }
  }, []);
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [syncTick, setSyncTick] = useState(0); // increments on every successful pull
  const [pinSetupMode, setPinSetupMode] = useState("prompt"); // "prompt" | "enter"
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [pinP1, setPinP1] = useState("");
  const [pinP2, setPinP2] = useState("");
  const [pinErr, setPinErr] = useState("");
  const handleAuth = (u, sectors, isNewSignup = false) => {
    const fullUser = {
      ...u,
      sectors: sectors || u.sectors || ["shop"]
    };
    setUser(fullUser);
    localStorage.setItem("rc_session", JSON.stringify(fullUser));
    if (fullUser.role === "staff") {
      setSector("shop");
    } else if (sectors && sectors.length > 0) {
      setSector(sectors[0]);
    }
    setScreen("app");
    setNavTab("home");
    if (!showOnboarding) {
      setShowOnboarding(false);
    }
    // PIN setup is triggered after onboarding completes (see OnboardingScreen onDone)
    // We still set the flag so the onboarding knows to show it
    if (isNewSignup) localStorage.setItem("rc_new_signup", "1");
    // Weekly backup nudge
    const _lbk = `rc_last_backup_${fullUser.uid}`;
    const _lb = localStorage.getItem(_lbk);
    const _days = _lb ? Math.floor((Date.now() - new Date(_lb)) / 86400000) : 999;
    // Backup reminder handled via badge on Sync tab — no forced redirect

    // Pull latest data from server   also refresh profile to get latest sectors
    const token = localStorage.getItem("rc_token");
    if (token) {
      fetch(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(r => r.ok ? r.json() : null).then(data => {
        if (data?.user) {
          const fresh = {
            ...data.user,
            uid: data.user._id
          };
          setUser(fresh);
          localStorage.setItem("rc_session", JSON.stringify(fresh));
        }
      }).catch(() => {});
    }
    // Pull data from server on every login — primary sync trigger on new device
    const authUid = fullUser.uid || fullUser._id;
    if (navigator.onLine) {
      localStorage.removeItem("rc_last_sync"); // force fresh pull
      setTimeout(() => AuthAPI.syncFromServer(authUid).catch(() => {}), 800);
    }
  };
  const handleLogout = async () => {
    await AuthAPI.signOut();
    setUser(null);
    setScreen("login");
  };
  const handleManageSectors = () => setNavTab("manageSectors");
  const handleSaveSectors = async newSectors => {
    const updated = {
      ...user,
      sectors: newSectors
    };
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
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            sectors: newSectors
          })
        });
      } catch (e) {/* silent — localStorage is already updated */}
    }
  };
  if (screen === "welcome") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(WelcomeScreen, {
    onNavigate: setScreen
  }));
  if (screen === "demo") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(145deg,#5B21B6,#7C3AED,#4338CA)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem 1.5rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 52,
      marginBottom: 16
    }
  }, "\uD83C\uDFAE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono',monospace",
      fontSize: 22,
      fontWeight: 700,
      color: "#fff",
      marginBottom: 8
    }
  }, "Demo Mode"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "rgba(255,255,255,0.75)",
      textAlign: "center",
      maxWidth: 280,
      lineHeight: 1.7,
      marginBottom: 28
    }
  }, "Explore Record Chief with sample business data \u2014 no account needed. Changes won't be saved."), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      padding: "20px",
      width: "100%",
      maxWidth: 360
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.text,
      marginBottom: 14
    }
  }, "What you'll explore:"), [["🏪", "Shop Sales", "See a shop with 5 products, today's sales, and stock alerts"], ["🌾", "Farm Records", "View farm expenses across seeds, labour, and equipment"], ["🤝", "Debt & Credit", "See outstanding credits, overdue amounts, and settled records"], ["💼", "Customer Records", "Browse sample customer entries with custom fields"]].map(([icon, title, desc]) => /*#__PURE__*/React.createElement("div", {
    key: title,
    style: {
      display: "flex",
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      flexShrink: 0
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.text
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2,
      lineHeight: 1.5
    }
  }, desc)))), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginBottom: 10,
      background: "linear-gradient(135deg,#7C3AED,#5B21B6)"
    },
    onClick: () => {
      loadDemoData().then(() => {
        setUser(DEMO_USER);
        setSector("shop");
        setScreen("app");
      });
    }
  }, "\uD83D\uDE80 Launch Demo"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setScreen("welcome"),
    style: {
      width: "100%",
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      padding: "8px"
    }
  }, "\u2190 Back to Welcome"))));
  if (screen === "signup") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(SignupScreen, {
    onAuth: handleAuth,
    onNavigate: setScreen
  }));
  if (screen === "login") return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(LoginScreen, {
    onAuth: handleAuth,
    onNavigate: setScreen
  }));
  if (!showOnboarding && user) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(OnboardingScreen, {
    user: user,
    onDone: () => {
      setShowOnboarding(true);
      // Show PIN setup after onboarding completes (new signup only)
      if (!localStorage.getItem("sl_pin")) {
        setTimeout(() => setShowPinSetup(true), 400);
      }
    }
  }));
  if (showPinSetup) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: "linear-gradient(135deg,#1E3A8A 0%,#1D4ED8 55%,#0F766E 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 24,
      padding: "32px 28px",
      width: "100%",
      maxWidth: 360,
      textAlign: "center",
      boxShadow: "0 24px 60px rgba(0,0,0,0.25)"
    }
  }, pinSetupMode === "prompt" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 52,
      marginBottom: 12
    }
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: 800,
      color: COLORS.text,
      marginBottom: 8
    }
  }, "Set a PIN lock?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 28,
      lineHeight: 1.7
    }
  }, "Protect your business records with a 4-digit PIN. You can always set or change this later in Profile."), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginBottom: 12,
      fontSize: 15,
      fontWeight: 700
    },
    onClick: () => {
      setPinSetupMode("enter");
      setPinP1("");
      setPinP2("");
      setPinErr("");
    }
  }, "\uD83D\uDD10 Set PIN Now"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowPinSetup(false);
      setPinSetupMode("prompt");
      localStorage.removeItem("rc_new_signup");
    },
    style: {
      width: "100%",
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      padding: 8
    }
  }, "Skip for now")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 40,
      marginBottom: 10
    }
  }, "\uD83D\uDD10"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 800,
      color: COLORS.text,
      marginBottom: 6
    }
  }, "Create your PIN"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: COLORS.textMuted,
      marginBottom: 20,
      lineHeight: 1.6
    }
  }, "Enter a 4-digit PIN to secure your account."), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "New PIN (4 digits)"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    maxLength: 4,
    className: "form-input",
    value: pinP1,
    onChange: e => {
      setPinP1(e.target.value.replace(/\D/g, ""));
      setPinErr("");
    },
    placeholder: "\u2022\u2022\u2022\u2022",
    style: {
      textAlign: "center",
      fontSize: 30,
      letterSpacing: 14,
      fontFamily: "'Space Mono',monospace"
    },
    autoFocus: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-group",
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Confirm PIN"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    inputMode: "numeric",
    maxLength: 4,
    className: "form-input",
    value: pinP2,
    onChange: e => {
      setPinP2(e.target.value.replace(/\D/g, ""));
      setPinErr("");
    },
    placeholder: "\u2022\u2022\u2022\u2022",
    style: {
      textAlign: "center",
      fontSize: 30,
      letterSpacing: 14,
      fontFamily: "'Space Mono',monospace"
    }
  })), pinErr && /*#__PURE__*/React.createElement("div", {
    style: {
      color: COLORS.danger,
      fontSize: 13,
      marginBottom: 10
    }
  }, pinErr), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    style: {
      marginBottom: 12
    },
    onClick: () => {
      if (pinP1.length !== 4) {
        setPinErr("PIN must be exactly 4 digits");
        return;
      }
      if (pinP1 !== pinP2) {
        setPinErr("PINs do not match. Try again.");
        return;
      }
      localStorage.setItem("sl_pin", pinP1);
      setShowPinSetup(false);
      setPinSetupMode("prompt");
      setPinP1("");
      setPinP2("");
      setPinErr("");
      localStorage.removeItem("rc_new_signup");
    }
  }, "\u2705 Save PIN & Continue"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPinSetupMode("prompt"),
    style: {
      width: "100%",
      background: "none",
      border: "none",
      color: COLORS.textMuted,
      fontSize: 13,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      padding: 8
    }
  }, "\u2190 Back")))));

  // PIN lock screen
  if (pin && !pinUnlocked) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(145deg, #1E3A8A 0%, #1D4ED8 60%, #2563EB 100%)",
      padding: "2rem"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 48,
      marginBottom: 16
    }
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Space Mono', monospace",
      fontSize: 22,
      fontWeight: 700,
      color: "#fff",
      marginBottom: 6
    }
  }, "Record Chief"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: "rgba(255,255,255,0.65)",
      marginBottom: 32
    }
  }, "Enter your PIN to continue"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: 20,
      padding: "28px 24px",
      width: "100%",
      maxWidth: 320,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      marginBottom: 20
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: pinInput.length > i ? COLORS.primary : COLORS.bg,
      border: `2px solid ${pinInput.length > i ? COLORS.primary : COLORS.border}`,
      transition: "all 0.15s"
    }
  }))), pinError && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontSize: 12,
      color: COLORS.danger,
      marginBottom: 12,
      fontWeight: 600
    }
  }, pinError), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 10
    }
  }, [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((d, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    disabled: d === "",
    onClick: () => {
      if (d === "⌫") {
        setPinInput(p => p.slice(0, -1));
        setPinError("");
        return;
      }
      const next = pinInput + d;
      setPinInput(next);
      if (next.length === 4) {
        if (next === pin) {
          setPinUnlocked(true);
          setPinInput("");
          setPinError("");
        } else {
          setPinError("Incorrect PIN");
          setPinInput("");
        }
      }
    },
    style: {
      padding: "16px",
      borderRadius: 12,
      border: `1px solid ${COLORS.border}`,
      background: d === "" ? "transparent" : COLORS.bg,
      fontSize: d === "⌫" ? 18 : 20,
      fontWeight: 700,
      cursor: d === "" ? "default" : "pointer",
      fontFamily: "'Inter', sans-serif",
      color: COLORS.text,
      transition: "background 0.1s"
    }
  }, d))))));
  const sectorMeta = ALL_SECTORS.find(s => s.id === sector) || ALL_SECTORS[0];
  const sectorLabel = `${sectorMeta.icon} ${sectorMeta.id === "sales" ? "Sales" : sectorMeta.id === "shop" ? "Shop" : "Farm"}`;
  const userSectors = user.role === "staff" ? ["shop"] : user.sectors && user.sectors.length > 0 ? user.sectors : ["shop"];
  const activeSectors = ALL_SECTORS.filter(s => userSectors.includes(s.id));
  const initials = user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const breadcrumb = navTab === "home" ? "Home" : navTab === "history" ? "Overview" : navTab === "profile" ? "Profile" : navTab === "manageSectors" ? "Manage Sectors" : navTab === "debtcredit" ? "🤝 Debt & Credit" : navTab === "notifications" ? "🔔 Notifications" : sectorLabel;

  // Onboarding   show once after first login
  // Sidebar active accent   matches each section's theme colour
  const sidebarAccent = (() => {
    if (navTab === "sector") {
      if (sector === "farm") return {
        border: "#40916C",
        bg: "rgba(29,111,66,0.25)"
      };
      if (sector === "shop") return {
        border: "#60A5FA",
        bg: "rgba(37,99,235,0.25)"
      };
      if (sector === "sales") return {
        border: "#A78BFA",
        bg: "rgba(124,58,237,0.25)"
      };
    }
    if (navTab === "debtcredit") return {
      border: "#86C99A",
      bg: "rgba(29,111,66,0.20)"
    };
    if (navTab === "history") return {
      border: "#34D399",
      bg: "rgba(5,150,105,0.18)"
    };
    // home, profile, manageSectors   default blue
    return {
      border: "#60A5FA",
      bg: "rgba(37,99,235,0.25)"
    };
  })();
  const activeNavStyle = {
    background: sidebarAccent.bg,
    borderLeft: `3px solid ${sidebarAccent.border}`,
    borderRadius: "0 8px 8px 0",
    color: "#fff",
    fontWeight: 600,
    paddingLeft: 11
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, css), /*#__PURE__*/React.createElement(OfflineIndicator, null), localStorage.getItem("rc_demo_mode") === "1" && /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg,#7C3AED,#5B21B6)",
      color: "#fff",
      fontSize: 12,
      fontWeight: 700,
      padding: "8px 16px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFAE Demo Mode \u2014 data is not saved"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      clearDemoData().then(() => {
        setUser(null);
        setScreen("welcome");
      });
    },
    style: {
      background: "rgba(255,255,255,0.25)",
      border: "none",
      color: "#fff",
      borderRadius: 6,
      padding: "3px 10px",
      fontSize: 11,
      cursor: "pointer",
      fontFamily: "'Inter',sans-serif",
      fontWeight: 700
    }
  }, "Exit Demo")), /*#__PURE__*/React.createElement("div", {
    className: "app"
  }, /*#__PURE__*/React.createElement("div", {
    className: `sidebar ${sidebarOpen ? "open" : "collapsed"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sidebar-logo"
  }, "Record Chief"), /*#__PURE__*/React.createElement("button", {
    className: "sidebar-toggle",
    onClick: () => setSidebarOpen(o => !o),
    title: sidebarOpen ? "Collapse sidebar" : "Expand sidebar"
  }, sidebarOpen ? /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M15 18l-6-6 6-6"
  })) : /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 18l6-6-6-6"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-tagline"
  }, "Your business records, organized"), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-section"
  }, "Menu"), /*#__PURE__*/React.createElement("button", {
    className: "nav-tab",
    onClick: () => {
      setNavTab("home");
      setSidebarOpen(false);
    },
    title: "Home",
    style: navTab === "home" ? activeNavStyle : {}
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "home",
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, "Home")), user?.role !== "staff" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "nav-tab",
    onClick: () => {
      setNavTab("history");
      setSidebarOpen(false);
    },
    title: "Overview",
    style: navTab === "history" ? activeNavStyle : {}
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chart",
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, "Overview")), /*#__PURE__*/React.createElement("button", {
    className: "nav-tab",
    onClick: () => {
      setNavTab("synclog");
      setSidebarOpen(false);
    },
    title: "Sync & Backup",
    style: navTab === "synclog" ? activeNavStyle : {}
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "history",
    size: 16
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, "Sync"))), activeSectors.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "sidebar-section"
  }, "Sectors"), activeSectors.map(s => {
    const isSectorActive = navTab === "sector" && sector === s.id;
    const sAccent = s.id === "farm" ? {
      border: "#40916C",
      bg: "rgba(29,111,66,0.25)"
    } : s.id === "shop" ? {
      border: "#60A5FA",
      bg: "rgba(37,99,235,0.25)"
    } : {
      border: "#A78BFA",
      bg: "rgba(124,58,237,0.25)"
    };
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      className: "nav-tab",
      title: s.id === "sales" ? "Sales Rep" : s.id === "shop" ? "Shop Sales" : "Farm Expenses",
      onClick: () => {
        setSector(s.id);
        setNavTab("sector");
        setSidebarOpen(false);
      },
      style: isSectorActive ? {
        background: sAccent.bg,
        borderLeft: `3px solid ${sAccent.border}`,
        borderRadius: "0 8px 8px 0",
        color: "#fff",
        fontWeight: 600,
        paddingLeft: 11
      } : {}
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        lineHeight: 1,
        flexShrink: 0
      }
    }, s.icon), /*#__PURE__*/React.createElement("span", {
      className: "nav-label"
    }, s.id === "sales" ? "Sales Rep" : s.id === "shop" ? "Shop Sales" : "Farm Expenses"));
  }), (() => {
    const debtKey = `sl_debt_${user?.uid}`;
    const debtRecs = (() => {
      try {
        return JSON.parse(localStorage.getItem(debtKey)) || [];
      } catch {
        return [];
      }
    })();
    const overdueN = debtRecs.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
    if (user?.role === "staff") return null;
    return /*#__PURE__*/React.createElement("button", {
      className: "nav-tab",
      title: "Debt & Credit",
      onClick: () => {
        setNavTab("debtcredit");
        setSidebarOpen(false);
      },
      style: {
        position: "relative",
        ...(navTab === "debtcredit" ? {
          background: "rgba(29,111,66,0.22)",
          borderLeft: "3px solid #86C99A",
          borderRadius: "0 8px 8px 0",
          color: "#fff",
          fontWeight: 600,
          paddingLeft: 11
        } : {})
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        lineHeight: 1,
        flexShrink: 0
      }
    }, "\uD83E\uDD1D"), /*#__PURE__*/React.createElement("span", {
      className: "nav-label"
    }, "Debt & Credit"), overdueN > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 8,
        right: sidebarOpen ? 14 : 6,
        width: 16,
        height: 16,
        borderRadius: "50%",
        background: COLORS.danger,
        color: "#fff",
        fontSize: 9,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, overdueN > 9 ? "9+" : overdueN));
  })(), /*#__PURE__*/React.createElement("button", {
    className: "nav-tab",
    style: {
      fontSize: 11,
      opacity: 0.6
    },
    onClick: () => {
      handleManageSectors();
      setSidebarOpen(false);
    },
    title: "Manage sectors"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-label"
  }, "Manage sectors")), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-bottom"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-user",
    onClick: () => {
      setNavTab("profile");
      setSidebarOpen(false);
    },
    title: user?.name
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-avatar"
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: ""
  }) : initials), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-userinfo"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-username"
  }, user?.name), /*#__PURE__*/React.createElement("div", {
    className: "sidebar-email"
  }, user?.email))))), /*#__PURE__*/React.createElement("div", {
    className: "main-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSidebarOpen(o => !o),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: COLORS.textMuted,
      padding: 4,
      borderRadius: 6
    },
    className: "desktop-only",
    title: "Toggle sidebar"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 12h18M3 6h18M3 18h18"
  }))), navTab === "sector" ? /*#__PURE__*/React.createElement("button", {
    onClick: () => activeSectors.length > 1 && setShowSectorSwitcher(v => !v),
    title: activeSectors.length > 1 ? "Switch sector" : undefined,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: showSectorSwitcher ? COLORS.primaryLight : COLORS.bg,
      border: `1.5px solid ${showSectorSwitcher ? COLORS.primary : COLORS.border}`,
      borderRadius: 10,
      padding: "5px 10px 5px 8px",
      cursor: activeSectors.length > 1 ? "pointer" : "default",
      fontFamily: "'Inter', sans-serif",
      fontWeight: 700,
      fontSize: 15,
      color: showSectorSwitcher ? COLORS.primary : COLORS.text,
      transition: "all 0.15s",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, activeSectors.find(s => s.id === sector)?.icon || "🏪"), /*#__PURE__*/React.createElement("span", {
    style: {
      maxWidth: 140,
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, breadcrumb), activeSectors.length > 1 && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    style: {
      transition: "transform 0.2s",
      transform: showSectorSwitcher ? "rotate(180deg)" : "rotate(0deg)",
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 9l6 6 6-6"
  }))) : /*#__PURE__*/React.createElement("span", {
    className: "topbar-breadcrumb"
  }, breadcrumb), showSectorSwitcher && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 56,
      left: 16,
      zIndex: 400,
      background: "#fff",
      borderRadius: 16,
      padding: 8,
      boxShadow: "0 8px 32px rgba(15,23,42,0.18)",
      border: `1px solid ${COLORS.border}`,
      minWidth: 200,
      animation: "scaleIn 0.15s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      color: COLORS.textMuted,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      padding: "4px 8px 8px"
    }
  }, "Switch Sector"), activeSectors.map(s => {
    const isActive = sector === s.id;
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      onClick: () => {
        setSector(s.id);
        setNavTab("sector");
        setShowSectorSwitcher(false);
      },
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 10px",
        borderRadius: 10,
        border: "none",
        cursor: "pointer",
        background: isActive ? COLORS.primaryLight : "transparent",
        fontFamily: "'Inter', sans-serif",
        textAlign: "left",
        transition: "background 0.12s"
      },
      onMouseEnter: e => {
        if (!isActive) e.currentTarget.style.background = COLORS.bg;
      },
      onMouseLeave: e => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        width: 36,
        height: 36,
        background: s.color,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0
      }
    }, s.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: isActive ? COLORS.primary : COLORS.text
      }
    }, s.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, s.desc)), isActive && /*#__PURE__*/React.createElement("svg", {
      width: "15",
      height: "15",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: COLORS.primary,
      strokeWidth: "2.5"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20 6L9 17l-5-5"
    })));
  })), showSectorSwitcher && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 399
    },
    onClick: () => setShowSectorSwitcher(false)
  })), /*#__PURE__*/React.createElement("div", {
    className: "topbar-right"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setNavTab("notifications"),
    title: "Notifications",
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: notifCount > 0 ? COLORS.danger : COLORS.textMuted,
      padding: 6,
      borderRadius: 8,
      position: "relative",
      fontSize: 17
    }
  }, "\uD83D\uDD14", notifCount > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 2,
      right: 2,
      width: 14,
      height: 14,
      borderRadius: "50%",
      background: COLORS.danger,
      color: "#fff",
      fontSize: 8,
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, notifCount > 9 ? "9+" : notifCount)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setDarkMode(d => !d),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: COLORS.textMuted,
      padding: 6,
      borderRadius: 8,
      fontSize: 16,
      transition: "background 0.15s"
    },
    title: darkMode ? "Switch to light mode" : "Switch to dark mode"
  }, darkMode ? "☀️" : "🌙"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setShowGlobalSearch(true),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      color: COLORS.textMuted,
      padding: 6,
      borderRadius: 8,
      transition: "background 0.15s"
    },
    onMouseEnter: e => e.currentTarget.style.background = COLORS.bg,
    onMouseLeave: e => e.currentTarget.style.background = "none",
    title: "Search everything"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "17",
    height: "17",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.35-4.35"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar",
    onClick: () => setShowProfileMenu(v => !v),
    style: {
      overflow: "hidden",
      cursor: "pointer"
    }
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "50%"
    }
  }) : initials), showProfileMenu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 398
    },
    onClick: () => setShowProfileMenu(false)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: "calc(100% + 8px)",
      right: 0,
      zIndex: 399,
      background: COLORS.surface,
      borderRadius: 12,
      boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
      border: `1px solid ${COLORS.border}`,
      minWidth: 160,
      overflow: "hidden",
      animation: "scaleIn 0.15s ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "10px 14px",
      borderBottom: `1px solid ${COLORS.border}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: COLORS.text
    }
  }, user?.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: COLORS.textMuted,
      marginTop: 2
    }
  }, user?.email)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setNavTab("profile");
      setShowProfileMenu(false);
    },
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.text,
      fontFamily: "'Inter', sans-serif",
      textAlign: "left"
    },
    onMouseEnter: e => e.currentTarget.style.background = COLORS.bg,
    onMouseLeave: e => e.currentTarget.style.background = "none"
  }, "\uD83D\uDC64 Profile"), /*#__PURE__*/React.createElement("button", {
    onClick: async () => {
      setShowProfileMenu(false);
      await AuthAPI.signOut();
      setUser(null);
      setScreen("login");
    },
    style: {
      width: "100%",
      padding: "11px 14px",
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13,
      fontWeight: 600,
      color: COLORS.danger,
      fontFamily: "'Inter', sans-serif",
      textAlign: "left",
      borderTop: `1px solid ${COLORS.border}`
    },
    onMouseEnter: e => e.currentTarget.style.background = COLORS.dangerLight,
    onMouseLeave: e => e.currentTarget.style.background = "none"
  }, "\uD83D\uDEAA Log Out")))))), showGlobalSearch && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 500,
      background: "rgba(15,23,42,0.6)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "4rem"
    },
    onClick: () => {
      setShowGlobalSearch(false);
      setGlobalSearch("");
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "calc(100% - 32px)",
      maxWidth: 520,
      background: "#fff",
      borderRadius: 16,
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      overflow: "hidden",
      animation: "scaleIn 0.18s ease"
    },
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      padding: "12px 16px",
      borderBottom: `1px solid ${COLORS.border}`,
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: COLORS.textMuted,
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 21l-4.35-4.35"
  })), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    style: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: 16,
      fontFamily: "'Inter', sans-serif",
      color: COLORS.text,
      background: "transparent"
    },
    placeholder: "Search records, sales, expenses\u2026",
    value: globalSearch,
    onChange: e => setGlobalSearch(e.target.value)
  }), globalSearch && /*#__PURE__*/React.createElement("button", {
    onClick: () => setGlobalSearch(""),
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 18
    }
  }, "\u2715"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowGlobalSearch(false);
      setGlobalSearch("");
    },
    style: {
      background: COLORS.bg,
      border: "none",
      cursor: "pointer",
      color: COLORS.textMuted,
      fontSize: 11,
      fontWeight: 600,
      borderRadius: 6,
      padding: "4px 8px",
      fontFamily: "'Inter', sans-serif"
    }
  }, "ESC")), (() => {
    if (!globalSearch.trim()) return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "1.5rem",
        textAlign: "center",
        color: COLORS.textMuted,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        marginBottom: 8
      }
    }, "\uD83D\uDD0D"), "Type to search across all your records");
    const q = globalSearch.toLowerCase();
    const shopData = (() => {
      try {
        return JSON.parse(localStorage.getItem(`sl_shopsales_${user?.uid}`)) || [];
      } catch {
        return [];
      }
    })();
    const farmData = (() => {
      try {
        return JSON.parse(localStorage.getItem(`sl_farm_${user?.uid}`)) || [];
      } catch {
        return [];
      }
    })();
    const debtData = (() => {
      try {
        return JSON.parse(localStorage.getItem(`sl_debt_${user?.uid}`)) || [];
      } catch {
        return [];
      }
    })();
    const results = [...shopData.filter(s => s.itemName?.toLowerCase().includes(q)).map(s => ({
      icon: "🛍️",
      label: s.itemName,
      sub: `Shop · ${s.date} · ${NAIRA(s.total)}`,
      nav: () => {
        setNavTab("sector");
        setSector("shop");
        setShowGlobalSearch(false);
        setGlobalSearch("");
      }
    })), ...farmData.filter(e => e.desc?.toLowerCase().includes(q)).map(e => ({
      icon: "🌾",
      label: e.desc,
      sub: `Farm · ${e.date} · ${NAIRA(e.amount)}`,
      nav: () => {
        setNavTab("sector");
        setSector("farm");
        setShowGlobalSearch(false);
        setGlobalSearch("");
      }
    })), ...debtData.filter(r => r.name?.toLowerCase().includes(q) || r.note?.toLowerCase().includes(q)).map(r => ({
      icon: r.type === "credit" ? "💰" : "📤",
      label: r.name,
      sub: `${r.type === "credit" ? "Credit" : "Debt"} · ${r.date} · ${NAIRA(r.amount)}`,
      nav: () => {
        setNavTab("debtcredit");
        setShowGlobalSearch(false);
        setGlobalSearch("");
      }
    }))].slice(0, 10);
    return results.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "1.5rem",
        textAlign: "center",
        color: COLORS.textMuted,
        fontSize: 13
      }
    }, "No results for \"", /*#__PURE__*/React.createElement("strong", null, globalSearch), "\"") : /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: 320,
        overflowY: "auto"
      }
    }, results.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: r.nav,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 16px",
        cursor: "pointer",
        borderBottom: `0.5px solid ${COLORS.border}`,
        transition: "background 0.1s"
      },
      onMouseEnter: e => e.currentTarget.style.background = COLORS.bg,
      onMouseLeave: e => e.currentTarget.style.background = "transparent"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: COLORS.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        flexShrink: 0
      }
    }, r.icon), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        fontWeight: 600,
        color: COLORS.text,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, r.label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: COLORS.textMuted,
        marginTop: 1
      }
    }, r.sub)), /*#__PURE__*/React.createElement("svg", {
      width: "14",
      height: "14",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: COLORS.textLight,
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M9 18l6-6-6-6"
    })))));
  })())), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, navTab === "home" && /*#__PURE__*/React.createElement(HomeScreen, {
    key: syncTick,
    user: user,
    sector: sector,
    onSetSector: s => {
      setSector(s);
      setNavTab("sector");
    },
    onManageSectors: handleManageSectors,
    onViewOverview: () => setNavTab("history"),
    onViewDebt: () => setNavTab("debtcredit")
  }), navTab === "sector" && sector === "sales" && /*#__PURE__*/React.createElement(SalesRepScreen, {
    key: `sales-${syncTick}`,
    user: user
  }), navTab === "sector" && sector === "shop" && /*#__PURE__*/React.createElement(ShopScreen, {
    key: `shop-${syncTick}`,
    user: user
  }), navTab === "sector" && sector === "farm" && /*#__PURE__*/React.createElement(FarmScreen, {
    key: `farm-${syncTick}`,
    user: user
  }), navTab === "history" && /*#__PURE__*/React.createElement(HistoryScreen, {
    key: `hist-${syncTick}`,
    user: user
  }), navTab === "synclog" && /*#__PURE__*/React.createElement(SyncHistoryScreen, {
    user: user
  }), navTab === "debtcredit" && /*#__PURE__*/React.createElement(DebtCreditScreen, {
    key: `debt-${syncTick}`,
    user: user
  }), navTab === "notifications" && /*#__PURE__*/React.createElement(NotificationsScreen, {
    user: user,
    onNavigateShop: () => {
      setSector("shop");
      setNavTab("sector");
      localStorage.setItem("rc_open_inventory", "1");
    }
  }), navTab === "profile" && /*#__PURE__*/React.createElement(ProfileScreen, {
    user: user,
    onLogout: handleLogout,
    onManageSectors: handleManageSectors
  }), navTab === "manageSectors" && /*#__PURE__*/React.createElement(ManageSectorsScreen, {
    user: user,
    onSave: handleSaveSectors,
    onBack: () => setNavTab("home")
  }))), (() => {
    const debtKey = `sl_debt_${user?.uid}`;
    const debtRecs = (() => {
      try {
        return JSON.parse(localStorage.getItem(debtKey)) || [];
      } catch {
        return [];
      }
    })();
    const overdueN = debtRecs.filter(r => !r.settled && r.dueDate && r.dueDate < TODAY()).length;
    const firstSector = activeSectors[0];
    const activeSectorAccent = sector === "farm" ? "#40916C" : sector === "sales" ? "#A78BFA" : "#60A5FA";
    const tabs = user.role === "staff" ? [{
      id: "home",
      icon: "🏠",
      label: "Home",
      accent: "#60A5FA"
    }, {
      id: "sector",
      icon: "🏪",
      label: "Shop",
      accent: "#60A5FA"
    }, {
      id: "profile",
      icon: "👤",
      label: "Profile",
      accent: "#60A5FA"
    }] : [{
      id: "home",
      icon: "🏠",
      label: "Home",
      accent: "#60A5FA"
    }, {
      id: "sector",
      icon: activeSectors.find(s => s.id === sector)?.icon || "🏪",
      label: "Sector",
      accent: activeSectorAccent
    }, {
      id: "debtcredit",
      icon: "🤝",
      label: "Debts",
      accent: "#86C99A",
      badge: overdueN
    }, {
      id: "history",
      icon: "📊",
      label: "Overview",
      accent: "#34D399"
    }, {
      id: "profile",
      icon: "👤",
      label: "Profile",
      accent: "#60A5FA"
    }];
    return /*#__PURE__*/React.createElement("div", {
      className: "bottom-tab-bar"
    }, tabs.map(t => {
      const isActive = navTab === t.id;
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        className: `bottom-tab-item${isActive ? " active" : ""}`,
        onClick: () => {
          if (t.id === "sector" && activeSectors.length > 0) {
            setSector(activeSectors.find(s => s.id === sector)?.id || activeSectors[0].id);
          }
          setNavTab(t.id);
          setSidebarOpen(false);
        }
      }, isActive && /*#__PURE__*/React.createElement("div", {
        className: "btab-bar",
        style: {
          background: t.accent
        }
      }), t.badge > 0 && /*#__PURE__*/React.createElement("div", {
        className: "btab-dot"
      }), /*#__PURE__*/React.createElement("span", {
        className: "btab-icon"
      }, t.icon), /*#__PURE__*/React.createElement("span", null, t.label));
    }));
  })()));
}

// ── Mount ──────────────────────────────────────────────────
const _rc_root = ReactDOM.createRoot(document.getElementById('root'));
_rc_root.render(/*#__PURE__*/React.createElement(App));