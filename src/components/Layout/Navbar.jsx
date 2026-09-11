import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Settings,
  ChevronDown,
  UserRound,
  LogOut,
  Check,
  CircleAlert,
  Leaf,
} from "lucide-react";
import "./Navbar.css";

import profileAvatar from "../../assets/images/profile-avatar.jpg";
import logo from "../../assets/images/logo.png";

export default function Navbar({ role, toggleSidebar }) {
  const navigate = useNavigate();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    {
      id: 1,
      type: "activity",
      title: "Aktivitas menunggu validasi",
      description:
        "Aktivitas transportasi umum yang kamu catat sedang menunggu validasi.",
      time: "Hari ini",
      unread: true,
    },
    {
      id: 2,
      type: "feedback",
      title: "Progress diperbarui",
      description:
        "Kamu sudah mencatat beberapa aktivitas konsumsi minggu ini.",
      time: "Kemarin",
      unread: true,
    },
    {
      id: 3,
      type: "awareness",
      title: "Materi Awareness tersedia",
      description:
        "Masih ada materi tentang kelangkaan sumber daya yang belum kamu selesaikan.",
      time: "2 hari lalu",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(
    (notification) => notification.unread
  ).length;

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNotificationClick = () => {
    setNotificationOpen((prev) => !prev);
    setProfileOpen(false);
  };

  const handleProfileClick = () => {
    setProfileOpen((prev) => !prev);
    setNotificationOpen(false);
  };

  const goToProfile = () => {
    setProfileOpen(false);
    navigate("/mahasiswa/profile");
  };

  const goToSettings = () => {
    setProfileOpen(false);
    navigate("/mahasiswa/settings");
  };

  const handleLogout = () => {
    setProfileOpen(false);

    // Jika nanti sistem login memakai localStorage/session,
    // proses logout bisa ditambahkan di sini.
    navigate("/login");
  };

  return (
    <header className="navbar-container">
      {/* =========================
          LEFT SIDE
      ========================== */}
      <div className="navbar-left">
        <button
          type="button"
          className="nav-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Buka atau tutup sidebar"
        >
          <Menu size={21} strokeWidth={2} />
        </button>

        <NavLink
          to="/mahasiswa/dashboard"
          className="navbar-brand"
          aria-label="ECODAS Dashboard"
        >
          <img
            src={logo}
            alt="ECODAS"
            className="navbar-logo"
          />

          <div className="navbar-brand-text">
            <span className="brand-name">ECODAS</span>
            <span className="brand-subtitle">
              Eco Consumption &amp; Decision
            </span>
          </div>
        </NavLink>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================== */}
      <div className="navbar-right">

        {/* NOTIFICATION */}
        <div
          className="navbar-action-wrapper"
          ref={notificationRef}
        >
          <button
            type="button"
            className={`navbar-icon-btn ${
              notificationOpen ? "is-open" : ""
            }`}
            onClick={handleNotificationClick}
            aria-label="Notifikasi"
            aria-expanded={notificationOpen}
          >
            <Bell size={19} strokeWidth={1.9} />

            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <div className="notification-panel">
              <div className="notification-header">
                <div>
                  <h3>Notifikasi</h3>
                  <span>
                    {unreadCount} notifikasi belum dibaca
                  </span>
                </div>

                <button
                  type="button"
                  className="mark-read-btn"
                  title="Tandai semua sudah dibaca"
                >
                  <Check size={15} />
                  <span>Sudah dibaca</span>
                </button>
              </div>

              <div className="notification-list">
                {notifications.map((notification) => (
                  <button
                    type="button"
                    className={`notification-item ${
                      notification.unread ? "unread" : ""
                    }`}
                    key={notification.id}
                  >
                    <div className="notification-icon">
                      {notification.type === "activity" && (
                        <CircleAlert size={17} />
                      )}

                      {notification.type === "feedback" && (
                        <Leaf size={17} />
                      )}

                      {notification.type === "awareness" && (
                        <Check size={17} />
                      )}
                    </div>

                    <div className="notification-content">
                      <div className="notification-title-row">
                        <strong>{notification.title}</strong>

                        {notification.unread && (
                          <span className="unread-dot" />
                        )}
                      </div>

                      <p>{notification.description}</p>

                      <span className="notification-time">
                        {notification.time}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="notification-footer"
                onClick={() => {
                  setNotificationOpen(false);
                  navigate("/mahasiswa/tracker");
                }}
              >
                Lihat aktivitas saya
              </button>
            </div>
          )}
        </div>

        {/* SETTINGS */}
        <button
          type="button"
          className="navbar-icon-btn settings-button"
          onClick={goToSettings}
          aria-label="Pengaturan"
          title="Pengaturan"
        >
          <Settings size={19} strokeWidth={1.9} />
        </button>

        {/* PROFILE */}
        <div
          className="navbar-profile-wrapper"
          ref={profileRef}
        >
          <button
            type="button"
            className={`navbar-profile ${
              profileOpen ? "is-open" : ""
            }`}
            onClick={handleProfileClick}
            aria-expanded={profileOpen}
          >
            <img
              src={profileAvatar}
              alt="Profil Nanik Wijayanti"
              className="navbar-avatar"
            />

            <div className="navbar-profile-info">
              <span className="navbar-profile-name">
                Nanik Wijayanti
              </span>

              <span className="navbar-profile-role">
                {role || "Mahasiswa"}
              </span>
            </div>

            <ChevronDown
              size={16}
              className={`profile-chevron ${
                profileOpen ? "rotate" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">

              <div className="profile-dropdown-head">
                <img
                  src={profileAvatar}
                  alt="Profil Nanik Wijayanti"
                  className="profile-dropdown-avatar"
                />

                <div>
                  <strong>Nanik Wijayanti</strong>
                  <span>{role || "Mahasiswa"}</span>
                </div>
              </div>

              <div className="profile-dropdown-divider" />

              <button
                type="button"
                className="profile-dropdown-item"
                onClick={goToProfile}
              >
                <UserRound size={17} />
                <span>Profile</span>
              </button>

              <button
                type="button"
                className="profile-dropdown-item"
                onClick={goToSettings}
              >
                <Settings size={17} />
                <span>Pengaturan</span>
              </button>

              <div className="profile-dropdown-divider" />

              <button
                type="button"
                className="profile-dropdown-item logout"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}