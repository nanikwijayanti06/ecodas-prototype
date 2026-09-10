import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Globe, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ role, toggleSidebar }) {
  const navItems = [
    { path: '/mahasiswa/dashboard', label: 'Dashboard' },
    { path: '/mahasiswa/awareness', label: 'Awareness' },
    { path: '/mahasiswa/tracker', label: 'Tracker' },
    { path: '/mahasiswa/behavior', label: 'Behavior' },
    { path: '/mahasiswa/profile', label: 'Profile' },
  ];

  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button className="nav-toggle-btn" onClick={toggleSidebar}>
          <Menu size={20} />
        </button>
        
        {/* Navigasi Utama Ecodas */}
        <nav className="navbar-top-links">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="navbar-right">
        <div className="nav-item hidden-mobile">
          <Globe size={16} />
          <span>IDN</span>
        </div>
        
        <button className="profile-pill">
          <span className="profile-role">{role || 'Mahasiswa'}</span>
          <div className="avatar-circle">
            <User size={18} />
          </div>
        </button>
      </div>
    </header>
  );
}