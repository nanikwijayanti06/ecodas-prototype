import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Brain,
  Lightbulb,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  HelpCircle,
  Menu,
  X,
  BarChart3,
} from "lucide-react";

import logo from "../../assets/images/logo.png";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [logoError, setLogoError] = useState(false);

  /* =========================================
     RESPONSIVE SIDEBAR
     ========================================= */

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("toggle-admin-sidebar", handleToggle);

    return () => {
      window.removeEventListener("toggle-admin-sidebar", handleToggle);
    };
  }, []);

  const closeMobileSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  /* =========================================
     LOGOUT
     ========================================= */

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login", {
      replace: true,
    });
  };

  /* =========================================
     NAV ITEM
     ========================================= */

  const navItemClass = ({ isActive }) =>
    `admin-sidebar-nav-item ${isActive ? "admin-sidebar-nav-active" : ""}`;

  return (
    <>
      {/* =====================================
          MOBILE / TOGGLE BUTTON
          ===================================== */}

      <button
        type="button"
        className="admin-sidebar-mobile-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Tutup sidebar" : "Buka sidebar"}
      >
        {isOpen ? (
          <X size={20} strokeWidth={1.8} />
        ) : (
          <Menu size={20} strokeWidth={1.8} />
        )}
      </button>

      {/* =====================================
          OVERLAY
          ===================================== */}

      {isOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* =====================================
          SIDEBAR
          ===================================== */}

      <aside
        className={`admin-sidebar ${
          isOpen ? "admin-sidebar-open" : "admin-sidebar-closed"
        }`}
      >
        {/* ===================================
            BRAND
            =================================== */}

        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo-box">
            {!logoError ? (
              <img
                src={logo}
                alt="ECODAS"
                className="admin-sidebar-logo"
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="admin-sidebar-logo-fallback">
                <span>E</span>
              </div>
            )}
          </div>

          <div className="admin-sidebar-brand-name">ECODAS</div>

          <div className="admin-sidebar-brand-subtitle">
            Sustainability Intelligence
          </div>

          <div className="admin-sidebar-admin-badge">ADMINISTRATION</div>
        </div>

        {/* ===================================
            CONTENT
            =================================== */}

        <div className="admin-sidebar-content">
          {/* OVERVIEW */}

          <div className="admin-sidebar-section-label">OVERVIEW</div>

          <nav className="admin-sidebar-nav">
            <NavLink
              to="/admin/dashboard"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <LayoutDashboard size={18} strokeWidth={1.8} />

              <span>Dashboard</span>
            </NavLink>
          </nav>

          {/* INTELLIGENCE */}

          <div className="admin-sidebar-section-label admin-sidebar-section-space">
            SUSTAINABILITY INTELLIGENCE
          </div>

          <nav className="admin-sidebar-nav">
            <NavLink
              to="/admin/collective"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <Brain size={18} strokeWidth={1.8} />

              <span>Collective Intelligence</span>
            </NavLink>

            <NavLink
              to="/admin/decision"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <Lightbulb size={18} strokeWidth={1.8} />

              <span>Decision Support</span>
            </NavLink>
          </nav>

          {/* DATA */}

          <div className="admin-sidebar-section-label admin-sidebar-section-space">
            DATA
          </div>

          <nav className="admin-sidebar-nav">
            <NavLink
              to="/admin/students"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <Users size={18} strokeWidth={1.8} />

              <span>Students</span>
            </NavLink>

            <NavLink
              to="/admin/activities"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <ClipboardList size={18} strokeWidth={1.8} />

              <span>Activity Data</span>
            </NavLink>

            <NavLink
              to="/admin/dashboard"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <BarChart3 size={18} strokeWidth={1.8} />

              <span>Sustainability Metrics</span>
            </NavLink>
          </nav>

          {/* SYSTEM */}

          <div className="admin-sidebar-section-label admin-sidebar-section-space">
            SYSTEM
          </div>

          <nav className="admin-sidebar-nav">
            <NavLink
              to="/admin/settings"
              className={navItemClass}
              onClick={closeMobileSidebar}
            >
              <Settings size={18} strokeWidth={1.8} />

              <span>Settings</span>
            </NavLink>
          </nav>
        </div>

        {/* ===================================
            FOOTER
            =================================== */}

        <div className="admin-sidebar-footer">
          <button type="button" className="admin-sidebar-footer-item">
            <HelpCircle size={18} strokeWidth={1.8} />

            <span>Support</span>
          </button>

          <button
            type="button"
            className="admin-sidebar-footer-item admin-sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} strokeWidth={1.8} />

            <div className="admin-sidebar-logout-text">
              <span>Sign out</span>

              <small>admin@ecodas.id</small>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
