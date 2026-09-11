import React from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";


import "./AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      {/* ==========================================
          ADMIN SIDEBAR
      ========================================== */}
      <AdminSidebar />

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
