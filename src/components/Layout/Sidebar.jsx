import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Eye, 
  Compass, 
  Activity, 
  User, 
  LogOut 
} from 'lucide-react';
import './Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();

  // Fungsi Log Out yang Benar
  const handleLogout = () => {
    // 1. Hapus data login dari browser
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    
    // 2. Lempar pengguna kembali ke halaman Login
    navigate('/login', { replace: true });
  };

  const menuItems = [
    { path: '/mahasiswa/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/mahasiswa/awareness', label: 'Awareness', icon: Eye },
    { path: '/mahasiswa/tracker', label: 'Tracker', icon: Compass },
    { path: '/mahasiswa/behavior', label: 'Behavior', icon: Activity },
    { path: '/mahasiswa/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className="sidebar-container">
      {/* Logo Ecodas */}
      <div className="sidebar-logo">
        <img src="/src/assets/images/logo.png" alt="Ecodas Logo" className="logo-img" onError={(e) => e.target.style.display = 'none'} />
        <span className="logo-text">Ecodas</span>
      </div>

      <div className="sidebar-menu-wrapper">
        <p className="menu-title">MENU UTAMA</p>
        
        {/* Navigasi Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `nav-item ${isActive ? 'nav-item-active' : ''}`
                }
              >
                <Icon className="nav-icon" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Tombol Log Out di Bawah */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}