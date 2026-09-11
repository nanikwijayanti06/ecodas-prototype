import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Eye,
  Activity,
  User,
  LogOut,
  HelpCircle,
  Menu,
  X,
} from "lucide-react";

import logo from "../../assets/images/logo.png";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login", { replace: true });
  };

  const closeMobileSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* =========================
          MOBILE TOGGLE
      ========================= */}
      <button
        className="sidebar-mobile-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={21} /> : <Menu size={21} />}
      </button>

      {/* =========================
          MOBILE OVERLAY
      ========================= */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
      )}

      {/* =========================
          SIDEBAR
      ========================= */}
      <aside
        className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        {/* =========================
            BRAND
        ========================= */}
        <div className="sidebar-brand">
          {/* LOGO BESAR */}
          <div className="sidebar-logo-box">
            <img src={logo} alt="ECODAS Logo" className="sidebar-logo" />
          </div>

          {/* ECODAS */}
          <div className="sidebar-brand-name">ECODAS</div>

          {/* SUBTITLE */}
          <div className="sidebar-brand-subtitle">Eco Consumption Decision</div>
        </div>

        {/* =========================
            SIDEBAR CONTENT
        ========================= */}
        <div className="sidebar-content">
          {/* OVERVIEW */}
          <div className="sidebar-section-label">OVERVIEW</div>

          <nav className="sidebar-nav">
            <NavLink
              to="/mahasiswa/dashboard"
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "sidebar-nav-active" : ""}`
              }
            >
              <LayoutDashboard size={19} strokeWidth={1.8} />

              <span>Dashboard</span>
            </NavLink>
          </nav>

          {/* BIJAK-M */}
          <div className="sidebar-section-label sidebar-section-space">
            BIJAK-M
          </div>

          <nav className="sidebar-nav">
            {/* Awareness */}
            <NavLink
              to="/mahasiswa/awareness"
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "sidebar-nav-active" : ""}`
              }
            >
              <Eye size={19} strokeWidth={1.8} />

              <span>Awareness</span>
            </NavLink>

            {/* Feedback */}
            <NavLink
              to="/mahasiswa/tracker"
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "sidebar-nav-active" : ""}`
              }
            >
              <Activity size={19} strokeWidth={1.8} />

              <span>Feedback Mechanism</span>
            </NavLink>

            {/* Behavior */}
            <NavLink
              to="/mahasiswa/behavior"
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "sidebar-nav-active" : ""}`
              }
            >
              <Activity size={19} strokeWidth={1.8} />

              <span>Behavior Change</span>
            </NavLink>
          </nav>

          {/* PERSONAL */}
          <div className="sidebar-section-label sidebar-section-space">
            PERSONAL
          </div>

          <nav className="sidebar-nav">
            <NavLink
              to="/mahasiswa/profile"
              onClick={closeMobileSidebar}
              className={({ isActive }) =>
                `sidebar-nav-item ${isActive ? "sidebar-nav-active" : ""}`
              }
            >
              <User size={19} strokeWidth={1.8} />

              <span>Profile</span>
            </NavLink>
          </nav>
        </div>

        {/* =========================
            FOOTER
        ========================= */}
        <div className="sidebar-footer">
          {/* SUPPORT */}
          <button type="button" className="sidebar-footer-item">
            <HelpCircle size={18} strokeWidth={1.8} />

            <span>Support</span>
          </button>

          {/* LOGOUT */}
          <button
            type="button"
            className="sidebar-footer-item sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} strokeWidth={1.8} />

            <div className="sidebar-logout-text">
              <span>Sign out</span>

              <small>user@ecodas.co</small>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
