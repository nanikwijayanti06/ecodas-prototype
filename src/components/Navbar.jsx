import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
    },

    {
      name: "Awareness",
      path: "/awareness",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      ),
    },

    {
      name: "Tracker",
      path: "/tracker",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },

    {
      name: "Behavior",
      path: "/behavior",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
    },

    {
      name: "Collective Intelligence",
      path: "/collective-intelligence",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="7" r="3" />
          <circle cx="17" cy="9" r="3" />
          <circle cx="7" cy="17" r="3" />

          <path d="M11.5 8.5l2.5 1" />
          <path d="M10 9.5l-2 4.5" />
          <path d="M9.5 16l4.5-4" />
        </svg>
      ),
    },

    {
      name: "Decision Support",
      path: "/decision-support",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
          <path d="M16 16l3 3" />
        </svg>
      ),
    },

    {
      name: "Profile",
      path: "/profile",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <nav style={styles.sidebar}>
      {/* LOGO */}
      <div style={styles.logoSection}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#166534"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: "10px" }}
        >
          <path d="M20.5 3.5C14 3.5 7.5 5 5 10c-2 4 0 8 3.5 9.5" />
          <path d="M20.5 3.5c0 6-2 10.5-7 12.5-3 1.2-5.5.5-7.5-1.5" />
          <path d="M8 19.5c2.5-3 5.5-5.5 9.5-7" />
        </svg>

        <h1 style={styles.logoText}>ECODAS</h1>
      </div>

      {/* MENU */}
      <div style={styles.menuSection}>
        <p style={styles.menuLabel}>MENU UTAMA</p>

        {menuItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              style={{
                ...styles.navItem,
                backgroundColor: isActive ? "#ecfdf3" : "transparent",
                color: isActive ? "#166534" : "#64748b",
                fontWeight: isActive ? "650" : "500",
              }}
            >
              <span
                style={{
                  ...styles.iconWrapper,
                  color: isActive ? "#166534" : "#94a3b8",
                }}
              >
                {item.icon}
              </span>

              <span style={styles.navText}>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* LOGOUT */}
      <div style={styles.footerSection}>
        <Link to="/login" style={styles.logoutBtn}>
          <span
            style={{
              ...styles.iconWrapper,
              color: "#ef4444",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          Log out
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "260px",
    height: "100vh",
    backgroundColor: "#ffffff",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    zIndex: 9999,
    overflowY: "auto",
  },

  logoSection: {
    display: "flex",
    alignItems: "center",
    padding: "28px 24px 24px 24px",
    flexShrink: 0,
  },

  logoText: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: "0.5px",
  },

  menuSection: {
    display: "flex",
    flexDirection: "column",
    padding: "0 12px",
    flex: 1,
    overflowY: "auto",
  },

  menuLabel: {
    fontSize: "10px",
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: "1px",
    padding: "0 12px",
    marginBottom: "10px",
    marginTop: "12px",
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "11px 14px",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "14px",
    borderRadius: "9px",
    transition: "all 0.2s ease",
    minHeight: "43px",
    boxSizing: "border-box",
  },

  navText: {
    lineHeight: "1.25",
  },

  iconWrapper: {
    marginRight: "13px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  footerSection: {
    padding: "18px 12px",
    borderTop: "1px solid #f1f5f9",
    flexShrink: 0,
    backgroundColor: "#ffffff",
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    padding: "11px 14px",
    textDecoration: "none",
    color: "#ef4444",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "9px",
  },
};

export default Navbar;
