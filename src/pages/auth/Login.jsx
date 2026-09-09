import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // <-- BARU: Panggil AuthContext
import './Login.css';
import logoImg from '../../assets/images/logo.png'; // Pastikan path gambarnya benar

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- BARU: Ambil fungsi login dari Context
  
  const [role, setRole] = useState('mahasiswa'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = {};

    if (!email) errs.email = 'Email wajib diisi';
    if (!password) errs.password = 'Password wajib diisi';

    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      // 1. Simpan info peran menggunakan AuthContext (bukan manual localStorage lagi)
      login(role);

      // 2. Arahkan pengguna ke halaman yang tepat sesuai role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/mahasiswa/tracker');
      }
    }
  };

  const handleSSO = () => {
    login('mahasiswa');
    navigate('/mahasiswa/tracker');
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        
        {/* LOGO */}
        <div className="logo-container">
          <img src={logoImg} alt="Ecodas Logo" className="app-logo" />
        </div>

        {/* TAB PERAN (MAHASISWA / ADMIN) */}
        <div className="role-tabs">
          <button
            type="button"
            className={`role-tab ${role === 'mahasiswa' ? 'active' : ''}`}
            onClick={() => setRole('mahasiswa')}
          >
            Mahasiswa
          </button>
          <button
            type="button"
            className={`role-tab ${role === 'admin' ? 'active' : ''}`}
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
        </div>

        {/* TOMBOL SSO KHUSUS MAHASISWA */}
        {role === 'mahasiswa' && (
          <div className="sso-section">
            <button 
              type="button" 
              className="btn-sso-primary"
              onClick={handleSSO} // <-- Dipersingkat agar lebih rapi
            >
              Log in with SSO (UNY)
            </button>
            <button type="button" className="btn-google">
              <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google" 
                className="google-icon"
              />
              Sign in with Google
            </button>
            <div className="divider"><span>atau pakai email</span></div>
          </div>
        )}

        {/* FORM LOGIN EMAIL & PASSWORD */}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email address ({role})</label>
            <input
              type="email"
              placeholder={role === 'mahasiswa' ? "nanikwijayanti.2023@student.uny.ac.id" : "admin@ecodas.id"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <div className="label-row">
              <label>Password</label>
              <button
                type="button"
                className="toggle-pass-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide Password' : 'Show Password'}
              </button>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'input-error' : ''}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <div className="forgot-wrapper">
            <a href="#forgot" className="forgot-link">Forgot my password</a>
          </div>

          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="btn-login-blue">
            Log in {role === 'admin' ? 'as Admin' : 'as Mahasiswa'}
          </button>
        </form>

        <footer className="login-footer">
          <p>©2026 Ecodas, Inc. All Rights Reserved.</p>
          <a href="#privacy">Privacy Policy</a>
        </footer>

      </div>
    </div>
  );
}