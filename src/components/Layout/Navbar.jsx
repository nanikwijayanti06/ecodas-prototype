import React from 'react';
import './Navbar.css'; // Pastikan CSS dipanggil

export default function Navbar({ role, toggleSidebar }) {
  return (
    <header className="navbar-pem">
      <div className="navbar-left">
        {/* Tombol garis tiga untuk buka/tutup sidebar */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </button>
      </div>
      <div className="navbar-right">
        <span className="user-text">Login sebagai {role}</span>
      </div>
    </header>
  );
}