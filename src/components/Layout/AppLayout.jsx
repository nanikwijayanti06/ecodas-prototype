import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Layout.css";

export default function AppLayout({ allowedRole }) {
  const { role } = useAuth();

  // State untuk mengontrol sidebar terbuka/tertutup (mirip PEM UNY)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Jika role tidak sesuai, lemparkan ke halaman login
  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-shell">
      {/* Lempar state isOpen ke Sidebar agar ukurannya bisa mengecil */}
      <Sidebar role={role} isOpen={isSidebarOpen} />

      <div className="app-main">
        {/* Lempar fungsi toggle ke Navbar agar tombol garis tiga bisa diklik */}
        <Navbar
          role={role}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="app-content">
          <Outlet />{" "}
          {/* Isi halaman (Dashboard, Tracker, dll) muncul di sini */}
        </main>

        <Footer />
      </div>
    </div>
  );
}
