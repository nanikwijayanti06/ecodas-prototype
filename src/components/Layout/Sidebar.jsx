import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Eye, 
  Compass, 
  Activity, 
  User, 
  LogOut,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // State untuk buka tutup sidebar

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { path: '/mahasiswa/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/mahasiswa/awareness', label: 'Awareness', icon: Eye },
    { path: '/mahasiswa/tracker', label: 'Tracker', icon: Compass },
    { path: '/mahasiswa/behavior', label: 'Behavior', icon: Activity },
    { path: '/mahasiswa/profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Tombol Hamburger untuk Mobile */}
      <button className="mobile-toggle" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay gelap jika sidebar terbuka di mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <aside className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
        {/* Header / Logo */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            {/* Ganti dengan logo Ecodas kamu */}
            <div className="logo-placeholder">E</div> 
            <span className="logo-text">Ecodas</span>
          </div>
        </div>

        {/* Menu Utama */}
        <div className="sidebar-menu-wrapper">
          <nav className="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => window.innerWidth <= 768 && setIsOpen(false)} // Otomatis tutup di mobile saat diklik
                  className={({ isActive }) => 
                    `nav-item ${isActive ? 'nav-item-active' : ''}`
                  }
                >
                  <Icon className="nav-icon" size={20} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer (Bawah) - Mirip Grammarly */}
        <div className="sidebar-footer">
          <div className="footer-divider"></div>
          
          <button className="nav-item footer-item">
            <HelpCircle className="nav-icon" size={20} />
            <span>Support</span>
          </button>
          
          <button onClick={handleLogout} className="nav-item footer-item text-danger">
            <LogOut className="nav-icon" size={20} />
            <div className="logout-text">
              <span>Sign out</span>
              <span className="logout-email">user@ecodas.co</span>
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}