import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // state user: { name, email, role, faculty }

  const login = (email, password, role = 'mahasiswa') => {
    // Simulasi login autentikasi
    setUser({
      id: 'usr-01',
      name: role === 'admin' ? 'Tim Pengelola Green Campus' : 'Budi Pratama',
      email,
      role, // 'mahasiswa' atau 'admin'
      faculty: 'Fakultas Teknik'
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);