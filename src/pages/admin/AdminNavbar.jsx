import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, Settings, User, LogOut, Menu } from "lucide-react";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const getPageTitle = () => {
    if (location.pathname.includes("/admin/dashboard")) {
      return "Dashboard";
    }

    if (location.pathname.includes("/admin/collective")) {
      return "Collective Intelligence";
    }

    if (location.pathname.includes("/admin/decision")) {
      return "Decision Support";
    }

    if (location.pathname.includes("/admin/students")) {
      return "Students";
    }

    if (location.pathname.includes("/admin/activities")) {
      return "Activity Data";
    }

    if (location.pathname.includes("/admin/settings")) {
      return "Settings";
    }

    return "Dashboard";
  };

  const handleToggleSidebar = () => {
    window.dispatchEvent(new Event("toggle-admin-sidebar"));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login", {
      replace: true,
    });
  };

  const handleProfile = () => {
    setProfileOpen(false);
    navigate("/admin/settings");
  };

  return (
    <header className="admin-navbar">
      {/* LEFT */}
      <div className="admin-navbar-left">
        <button
          type="button"
          className="admin-navbar-menu"
          onClick={handleToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={21} strokeWidth={2} />
        </button>

        <div className="admin-navbar-page">
          <span className="admin-navbar-page-title">{getPageTitle()}</span>

          <span className="admin-navbar-page-subtitle">
            Sustainability Intelligence
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="admin-navbar-right">
        {/* NOTIFICATION */}
        <div className="admin-navbar-dropdown-wrapper">
          <button
            type="button"
            className="admin-navbar-icon-button"
            onClick={() => {
              setNotificationOpen(!notificationOpen);
              setProfileOpen(false);
            }}
            aria-label="Notifications"
          >
            <Bell size={19} strokeWidth={1.9} />

            <span className="admin-navbar-notification-dot" />
          </button>

          {notificationOpen && (
            <div className="admin-navbar-dropdown admin-notification-dropdown">
              <div className="admin-dropdown-header">
                <div>
                  <strong>Notifications</strong>
                  <span>Recent system updates</span>
                </div>

                <span className="admin-notification-count">2</span>
              </div>

              <div className="admin-notification-item">
                <div className="admin-notification-indicator" />

                <div>
                  <strong>Data aggregation completed</strong>

                  <p>
                    Collective Intelligence has processed the latest activity
                    records.
                  </p>

                  <small>10 minutes ago</small>
                </div>
              </div>

              <div className="admin-notification-item">
                <div className="admin-notification-indicator" />

                <div>
                  <strong>Weekly sustainability report</strong>

                  <p>New behavioral trend data is available.</p>

                  <small>1 hour ago</small>
                </div>
              </div>

              <button
                type="button"
                className="admin-dropdown-footer-button"
                onClick={() => setNotificationOpen(false)}
              >
                Mark as reviewed
              </button>
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div className="admin-navbar-divider" />

        {/* PROFILE */}
        <div className="admin-navbar-dropdown-wrapper">
          <button
            type="button"
            className="admin-navbar-profile"
            onClick={() => {
              setProfileOpen(!profileOpen);
              setNotificationOpen(false);
            }}
          >
            <div className="admin-navbar-avatar">A</div>

            <div className="admin-navbar-user">
              <strong>Administrator</strong>
              <span>ECODAS Admin</span>
            </div>

            <ChevronDown
              size={16}
              strokeWidth={1.8}
              className={profileOpen ? "admin-navbar-chevron-open" : ""}
            />
          </button>

          {profileOpen && (
            <div className="admin-navbar-dropdown admin-profile-dropdown">
              <div className="admin-profile-dropdown-head">
                <div className="admin-navbar-avatar admin-navbar-avatar-large">
                  A
                </div>

                <div>
                  <strong>Administrator</strong>
                  <span>ECODAS Admin</span>
                </div>
              </div>

              <div className="admin-dropdown-menu">
                <button type="button" onClick={handleProfile}>
                  <User size={17} strokeWidth={1.8} />
                  <span>Profile & Settings</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/admin/settings");
                  }}
                >
                  <Settings size={17} strokeWidth={1.8} />
                  <span>Settings</span>
                </button>

                <div className="admin-dropdown-menu-divider" />

                <button
                  type="button"
                  className="admin-dropdown-logout"
                  onClick={handleLogout}
                >
                  <LogOut size={17} strokeWidth={1.8} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
