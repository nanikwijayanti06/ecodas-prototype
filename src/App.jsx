import { Routes, Route, Navigate } from "react-router-dom";

// =====================================================
// MAHASISWA
// =====================================================
import AppLayout from "./components/Layout/AppLayout";

import Login from "./pages/auth/Login";

import Dashboard from "./pages/mahasiswa/Dashboard";
import L1_Awareness from "./pages/mahasiswa/L1_Awareness";
import L2_Tracker from "./pages/mahasiswa/L2_Tracker";
import L3_Behavior from "./pages/mahasiswa/L3_Behavior";
import Profile from "./pages/mahasiswa/Profile";

// =====================================================
// ADMIN
// =====================================================
import AdminLayout from "./pages/admin/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import Students from "./pages/admin/Students";
import ActivityReview from "./pages/admin/ActivityReview";
import L4_CollectiveDashboard from "./pages/admin/L4_CollectiveDashboard";
import L5_DecisionSupport from "./pages/admin/L5_DecisionSupport";

// =====================================================
// SETTINGS
// =====================================================
import Settings from "./pages/settings/Settings";

export default function App() {
  return (
    <Routes>
      {/* =================================================
          LOGIN
      ================================================= */}
      <Route path="/login" element={<Login />} />

      {/* =================================================
          AREA MAHASISWA
          
          Dashboard
          Layer 1 — Awareness
          Layer 2 — Feedback Mechanism
          Layer 3 — Behavior Change
          Profile
          Settings
      ================================================= */}
      <Route element={<AppLayout allowedRole="mahasiswa" />}>
        {/* Dashboard Mahasiswa */}
        <Route path="/mahasiswa/dashboard" element={<Dashboard />} />

        {/* Layer 1 — Awareness */}
        <Route path="/mahasiswa/awareness" element={<L1_Awareness />} />

        {/* Layer 2 — Feedback Mechanism */}
        <Route path="/mahasiswa/tracker" element={<L2_Tracker />} />

        {/* Layer 3 — Behavior Change */}
        <Route path="/mahasiswa/behavior" element={<L3_Behavior />} />

        {/* Profile Mahasiswa */}
        <Route path="/mahasiswa/profile" element={<Profile />} />

        {/* Settings Mahasiswa */}
        <Route path="/mahasiswa/settings" element={<Settings />} />
      </Route>

      {/* =================================================
          AREA ADMIN
          
          Admin Dashboard
          Student Data
          Activity Review
          Layer 4 — Collective Intelligence
          Layer 5 — Decision Support
          Settings
          
          Layout:
          AdminLayout
          ├── Admin Sidebar
          └── Admin Navbar
      ================================================= */}
      <Route element={<AdminLayout />}>
        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* =================================================
            STUDENT DATA
        ================================================= */}
        <Route path="/admin/students" element={<Students />} />

        {/* =================================================
            ACTIVITY REVIEW
            Admin mengevaluasi aktivitas mahasiswa
        ================================================= */}
        <Route path="/admin/activities" element={<ActivityReview />} />

        {/* =================================================
            LAYER 4
            COLLECTIVE INTELLIGENCE
        ================================================= */}
        <Route path="/admin/collective" element={<L4_CollectiveDashboard />} />

        {/* =================================================
            LAYER 5
            DECISION SUPPORT
        ================================================= */}
        <Route path="/admin/decision" element={<L5_DecisionSupport />} />

        {/* =================================================
            ADMIN SETTINGS
        ================================================= */}
        <Route path="/admin/settings" element={<Settings />} />
      </Route>

      {/* =================================================
          FALLBACK
          
          URL yang tidak terdaftar
          → kembali ke Login
      ================================================= */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
