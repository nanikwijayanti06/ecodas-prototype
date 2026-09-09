import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import Login from './pages/auth/Login';
import Dashboard from './pages/mahasiswa/Dashboard';
import L1_Awareness from './pages/mahasiswa/L1_Awareness';
import L2_Tracker from './pages/mahasiswa/L2_Tracker';
import L3_Behavior from './pages/mahasiswa/L3_Behavior';
import L4_CollectiveDashboard from './pages/admin/L4_CollectiveDashboard';
import L5_DecisionSupport from './pages/admin/L5_DecisionSupport';
import Settings from './pages/settings/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* area mahasiswa (layer 1-3 framework Bijak-M) */}
      <Route element={<AppLayout allowedRole="mahasiswa" />}>
        <Route path="/mahasiswa/dashboard" element={<Dashboard />} />
        <Route path="/mahasiswa/awareness" element={<L1_Awareness />} />
        <Route path="/mahasiswa/tracker" element={<L2_Tracker />} />
        <Route path="/mahasiswa/behavior" element={<L3_Behavior />} />
        <Route path="/mahasiswa/settings" element={<Settings />} />
      </Route>

      {/* area admin (layer 4-5 framework Bijak-M) */}
      <Route element={<AppLayout allowedRole="admin" />}>
        <Route path="/admin/dashboard" element={<L4_CollectiveDashboard />} />
        <Route path="/admin/decision" element={<L5_DecisionSupport />} />
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
