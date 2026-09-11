import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

import "./AdminLayout.css";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  /* ==========================================
     Listen for sidebar toggle events
     (from AdminNavbar menu button)
  ========================================== */

  useEffect(() => {
    const handleToggle = () => {
      setSidebarOpen((prev) => !prev);
    };

    window.addEventListener("toggle-admin-sidebar", handleToggle);

    return () => {
      window.removeEventListener("toggle-admin-sidebar", handleToggle);
    };
  }, []);

  return (
    <div
      className={`admin-layout ${sidebarOpen ? "" : "admin-sidebar-is-closed"}`}
    >
      {/* ==========================================
          ADMIN SIDEBAR
      ========================================== */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* ==========================================
          ADMIN MAIN AREA
      ========================================== */}
      <div className="admin-main">
        {/* ADMIN NAVBAR */}
        <AdminNavbar />

        {/* ========================================
            PAGE CONTENT
        ======================================== */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
