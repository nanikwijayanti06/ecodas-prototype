import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import logoImg from '../../assets/images/logo.png'; // Sesuaikan path logo

export default function Sidebar({ role, isOpen }) {
  return (
    <aside className={`sidebar-pem ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-logo-container">
        <img src={logoImg} alt="Ecodas" className="sidebar-logo" />
      </div>

      <div className="sidebar-menu-title">
        {isOpen && <span>MENU UTAMA</span>}
      </div>

      <ul className="sidebar-nav">
        <li><NavLink to="/mahasiswa/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/mahasiswa/awareness">Awareness</NavLink></li>
        <li><NavLink to="/mahasiswa/tracker">Tracker</NavLink></li>
        <li><NavLink to="/mahasiswa/behavior">Behavior</NavLink></li>
        <li><NavLink to="/mahasiswa/profile">Profile</NavLink></li>
      </ul>

      <div className="sidebar-footer">
        <button className="logout-btn">Log out</button>
      </div>
    </aside>
  );
}