import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // role disimpan di localStorage biar refresh gak logout sendiri
  const [role, setRole] = useState(() => localStorage.getItem('ecodas_role') || null);

  const login = (userRole) => {
    localStorage.setItem('ecodas_role', userRole);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem('ecodas_role');
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
