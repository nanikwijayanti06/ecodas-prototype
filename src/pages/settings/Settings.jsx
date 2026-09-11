import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Shield,
  Bell,
  Lock,
  Eye,
  EyeOff,
  Monitor,
  Download,
  Trash2,
  LogOut,
  ChevronRight,
  Check,
  AlertTriangle,
  Save,
  Database,
  ClipboardCheck,
  BarChart3,
  Settings as SettingsIcon,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "../mahasiswa/mahasiswa.css";
import "./Settings.css";

export default function Settings() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // =========================================================
  // ROLE
  // =========================================================

  /*
   * Route dijadikan fallback agar /admin/settings dan
   * /mahasiswa/settings tidak pernah tertukar.
   */
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isStudentRoute = location.pathname.startsWith("/mahasiswa");

  const currentRole =
    role ||
    (isAdminRoute ? "admin" : null) ||
    (isStudentRoute ? "mahasiswa" : null);

  const isAdmin = currentRole === "admin";

  // =========================================================
  // USER DATA
  // =========================================================

  const savedUser = JSON.parse(localStorage.getItem("user") || "null");

  const defaultStudent = {
    name: "Nanik Wijayanti",
    nim: "23051430009",
    email: "nanikwijayanti06@student.uny.ac.id",
    studyProgram: "Teknik Industri",
    university: "Universitas Negeri Yogyakarta",
    role: "Mahasiswa",
  };

  const defaultAdmin = {
    name: "Administrator ECODAS",
    email: "admin@ecodas.co",
    unit: "Pengelola Sistem ECODAS",
    university: "Universitas Negeri Yogyakarta",
    role: "Admin",
  };

  const defaultUser = isAdmin ? defaultAdmin : defaultStudent;

  const initialUser = {
    ...defaultUser,
    ...(savedUser || {}),
    role: isAdmin ? "Admin" : "Mahasiswa",
  };

  const [profile, setProfile] = useState(initialUser);

  // =========================================================
  // STATES
  // =========================================================

  const [activeSection, setActiveSection] = useState("profile");

  const [isEditing, setIsEditing] = useState(false);

  const [password, setPassword] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  /*
   * Preferences mahasiswa dan admin dibuat berbeda.
   */
  const [studentPreferences, setStudentPreferences] = useState({
    activityNotification: true,
    habitReminder: true,
    weeklyFeedback: true,
    publicProfile: false,
    collectiveAnalysis: true,
  });

  const [adminPreferences, setAdminPreferences] = useState({
    reviewNotification: true,
    systemNotification: true,
    weeklyReport: true,
    dataAlert: true,
    collectiveUpdate: true,
  });

  const [language, setLanguage] = useState("Indonesia");
  const [appearance, setAppearance] = useState("Light");

  const [saved, setSaved] = useState(false);

  // =========================================================
  // LOAD SAVED SETTINGS
  // =========================================================

  useEffect(() => {
    const savedPreferences = JSON.parse(
      localStorage.getItem("ecodas_preferences") || "null",
    );

    if (!savedPreferences) return;

    if (isAdmin) {
      setAdminPreferences((prev) => ({
        ...prev,
        ...savedPreferences,
      }));
    } else {
      setStudentPreferences((prev) => ({
        ...prev,
        ...savedPreferences,
      }));
    }

    if (savedPreferences.language) {
      setLanguage(savedPreferences.language);
    }

    if (savedPreferences.appearance) {
      setAppearance(savedPreferences.appearance);
    }
  }, [isAdmin]);

  // =========================================================
  // PROFILE
  // =========================================================

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    const currentSavedUser = JSON.parse(
      localStorage.getItem("user") || "null",
    );

    const updatedUser = {
      ...(currentSavedUser || {}),
      ...profile,
      role: currentRole,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setProfile((prev) => ({
      ...prev,
      role: isAdmin ? "Admin" : "Mahasiswa",
    }));

    setIsEditing(false);
    showSavedMessage();
  };

  // =========================================================
  // PASSWORD
  // =========================================================

  const handlePasswordChange = (field, value) => {
    setPassword((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSavePassword = (e) => {
    e.preventDefault();

    if (!password.old || !password.new || !password.confirm) {
      alert("Lengkapi seluruh kolom password.");
      return;
    }

    if (password.new !== password.confirm) {
      alert("Konfirmasi password tidak sesuai.");
      return;
    }

    if (password.new.length < 8) {
      alert("Password baru minimal 8 karakter.");
      return;
    }

    /*
     * Prototype only.
     * Tidak menyimpan password asli.
     */
    localStorage.setItem(
      "ecodas_password_updated",
      new Date().toISOString(),
    );

    setPassword({
      old: "",
      new: "",
      confirm: "",
    });

    showSavedMessage();
  };

  // =========================================================
  // PREFERENCES
  // =========================================================

  const handleStudentPreference = (field) => {
    setStudentPreferences((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleAdminPreference = (field) => {
    setAdminPreferences((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSavePreferences = () => {
    const preferences = isAdmin
      ? {
          ...adminPreferences,
          language,
          appearance,
          role: "admin",
        }
      : {
          ...studentPreferences,
          language,
          appearance,
          role: "mahasiswa",
        };

    localStorage.setItem(
      "ecodas_preferences",
      JSON.stringify(preferences),
    );

    showSavedMessage();
  };

  // =========================================================
  // UTILITY
  // =========================================================

  const showSavedMessage = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  // =========================================================
  // EXPORT DATA
  // =========================================================

  const handleExportData = () => {
    let data;

    if (isAdmin) {
      /*
       * ADMIN EXPORT
       *
       * Admin tidak mengambil data awareness/habit mahasiswa
       * sebagai data pribadi.
       */
      data = {
        exportedAt: new Date().toISOString(),
        role: "admin",
        profile,

        students: JSON.parse(
          localStorage.getItem("ecodas_students") || "[]",
        ),

        activities: JSON.parse(
          localStorage.getItem("ecodas_activities") || "[]",
        ),

        reviewData: JSON.parse(
          localStorage.getItem("ecodas_activity_review") || "[]",
        ),

        preferences: JSON.parse(
          localStorage.getItem("ecodas_preferences") || "{}",
        ),
      };
    } else {
      /*
       * MAHASISWA EXPORT
       */
      data = {
        exportedAt: new Date().toISOString(),
        role: "mahasiswa",
        profile,

        activities: JSON.parse(
          localStorage.getItem("ecodas_activities") || "[]",
        ),

        habits: JSON.parse(
          localStorage.getItem("ecodas_behavior_habits") || "[]",
        ),

        awareness: JSON.parse(
          localStorage.getItem("ecodas_awareness_progress") || "{}",
        ),

        preferences: JSON.parse(
          localStorage.getItem("ecodas_preferences") || "{}",
        ),
      };
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = isAdmin
      ? "ecodas-admin-data.json"
      : "ecodas-my-data.json";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  // =========================================================
  // RESET DATA
  // =========================================================

  const handleResetStudentData = () => {
    const confirmed = window.confirm(
      "Reset seluruh data aktivitas dan progress kebiasaan mahasiswa pada perangkat ini?",
    );

    if (!confirmed) return;

    localStorage.removeItem("ecodas_activities");
    localStorage.removeItem("ecodas_behavior_habits");

    alert("Data aktivitas berhasil direset.");
  };

  const handleResetAdminData = () => {
    const confirmed = window.confirm(
      "Reset data prototype administrasi? Data mahasiswa dan aktivitas review akan dihapus dari perangkat ini.",
    );

    if (!confirmed) return;

    localStorage.removeItem("ecodas_students");
    localStorage.removeItem("ecodas_activity_review");

    alert("Data administrasi prototype berhasil direset.");
  };

  // =========================================================
  // MENU
  // =========================================================

  const studentMenu = [
    {
      id: "profile",
      label: "Account",
      description: "Informasi akun dan profil mahasiswa",
      icon: User,
    },
    {
      id: "security",
      label: "Security",
      description: "Password dan keamanan akun",
      icon: Shield,
    },
    {
      id: "preferences",
      label: "Preferences",
      description: "Notifikasi dan tampilan",
      icon: Bell,
    },
    {
      id: "privacy",
      label: "Privacy",
      description: "Kontrol penggunaan data",
      icon: Lock,
    },
  ];

  const adminMenu = [
    {
      id: "profile",
      label: "Account",
      description: "Informasi administrator",
      icon: User,
    },
    {
      id: "security",
      label: "Security",
      description: "Password dan keamanan sistem",
      icon: Shield,
    },
    {
      id: "preferences",
      label: "Preferences",
      description: "Notifikasi dan preferensi sistem",
      icon: Bell,
    },
    {
      id: "privacy",
      label: "Data & Privacy",
      description: "Data dan pengelolaan sistem",
      icon: Database,
    },
  ];

  const menu = isAdmin ? adminMenu : studentMenu;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="settings-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="settings-header">
        <div>
          <span className="settings-eyebrow">
            {isAdmin ? "ADMIN SETTINGS" : "ACCOUNT SETTINGS"}
          </span>

          <h1>Pengaturan</h1>

          <p>
            {isAdmin
              ? "Kelola akun administrator, keamanan, notifikasi sistem, dan pengelolaan data ECODAS."
              : "Kelola informasi akun, keamanan, preferensi, dan privasi ECODAS kamu."}
          </p>
        </div>

        {saved && (
          <div className="settings-saved">
            <Check size={16} />
            Perubahan tersimpan
          </div>
        )}
      </div>

      {/* =====================================================
          SETTINGS LAYOUT
      ===================================================== */}

      <div className="settings-layout">
        {/* ===================================================
            LEFT MENU
        =================================================== */}

        <aside className="settings-menu">
          <div className="settings-menu-title">
            {isAdmin ? "ADMIN SETTINGS" : "SETTINGS"}
          </div>

          {menu.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                className={
                  activeSection === item.id
                    ? "settings-menu-item active"
                    : "settings-menu-item"
                }
                onClick={() => setActiveSection(item.id)}
              >
                <span className="settings-menu-icon">
                  <Icon size={18} />
                </span>

                <span className="settings-menu-text">
                  <strong>{item.label}</strong>
                  <small>{item.description}</small>
                </span>

                <ChevronRight size={16} />
              </button>
            );
          })}
        </aside>

        {/* ===================================================
            RIGHT CONTENT
        =================================================== */}

        <main className="settings-content">
          {/* =================================================
              ACCOUNT
          ================================================= */}

          {activeSection === "profile" && (
            <section className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>
                    {isAdmin
                      ? "Informasi administrator"
                      : "Informasi akun"}
                  </h2>

                  <p>
                    {isAdmin
                      ? "Informasi akun yang digunakan untuk mengelola sistem ECODAS."
                      : "Informasi dasar yang digunakan pada akun ECODAS."}
                  </p>
                </div>

                {!isEditing && (
                  <button
                    type="button"
                    className="settings-outline-button"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit profile
                  </button>
                )}
              </div>

              {/* PROFILE CARD */}

              <div className="settings-profile-card">
                <div className="settings-avatar">
                  {profile.name
                    ?.split(" ")
                    .map((word) => word[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="settings-profile-main">
                  <h3>{profile.name}</h3>

                  <p>
                    {isAdmin
                      ? `${profile.unit || "Pengelola Sistem"} · Admin`
                      : `${profile.studyProgram || "Mahasiswa"} · Mahasiswa`}
                  </p>

                  <span className="settings-status">
                    <span />
                    Account aktif
                  </span>
                </div>
              </div>

              {/* PROFILE FORM */}

              <div className="settings-card">
                <div className="settings-card-title">
                  {isAdmin ? "Data administrator" : "Data mahasiswa"}
                </div>

                <div className="settings-form-grid">
                  {/* NAME */}

                  <div className="settings-field">
                    <label>Nama lengkap</label>

                    <input
                      value={profile.name || ""}
                      disabled={!isEditing}
                      onChange={(e) =>
                        handleProfileChange("name", e.target.value)
                      }
                    />
                  </div>

                  {/* STUDENT NIM */}

                  {!isAdmin && (
                    <div className="settings-field">
                      <label>NIM</label>

                      <input value={profile.nim || ""} disabled />
                    </div>
                  )}

                  {/* EMAIL */}

                  <div className="settings-field">
                    <label>Email</label>

                    <input
                      value={profile.email || ""}
                      disabled={!isEditing}
                      onChange={(e) =>
                        handleProfileChange("email", e.target.value)
                      }
                    />
                  </div>

                  {/* STUDENT PROGRAM */}

                  {!isAdmin && (
                    <div className="settings-field">
                      <label>Program Studi</label>

                      <input
                        value={profile.studyProgram || ""}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleProfileChange(
                            "studyProgram",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  )}

                  {/* ADMIN UNIT */}

                  {isAdmin && (
                    <div className="settings-field">
                      <label>Unit / Pengelola</label>

                      <input
                        value={profile.unit || ""}
                        disabled={!isEditing}
                        onChange={(e) =>
                          handleProfileChange("unit", e.target.value)
                        }
                      />
                    </div>
                  )}

                  {/* UNIVERSITY */}

                  <div className="settings-field full">
                    <label>Institusi</label>

                    <input
                      value={profile.university || ""}
                      disabled={!isEditing}
                      onChange={(e) =>
                        handleProfileChange(
                          "university",
                          e.target.value,
                        )
                      }
                    />
                  </div>

                  {/* ROLE */}

                  <div className="settings-field">
                    <label>Role</label>

                    <input
                      value={isAdmin ? "Administrator" : "Mahasiswa"}
                      disabled
                    />
                  </div>

                  {/* ACCOUNT STATUS */}

                  <div className="settings-field">
                    <label>Status akun</label>

                    <input value="Aktif" disabled />
                  </div>
                </div>

                {isEditing && (
                  <div className="settings-actions">
                    <button
                      type="button"
                      className="settings-cancel-button"
                      onClick={() => {
                        setProfile(initialUser);
                        setIsEditing(false);
                      }}
                    >
                      Batal
                    </button>

                    <button
                      type="button"
                      className="settings-primary-button"
                      onClick={handleSaveProfile}
                    >
                      <Save size={16} />
                      Simpan perubahan
                    </button>
                  </div>
                )}
              </div>

              {/* ADMIN ACCESS INFORMATION */}

              {isAdmin && (
                <div className="settings-card">
                  <div className="settings-card-title">
                    Akses administrator
                  </div>

                  <div className="settings-admin-access-grid">
                    <AdminAccessItem
                      icon={ClipboardCheck}
                      title="Activity Review"
                      description="Validasi aktivitas yang dikirim mahasiswa."
                    />

                    <AdminAccessItem
                      icon={BarChart3}
                      title="Collective Intelligence"
                      description="Melihat pola konsumsi kolektif."
                    />

                    <AdminAccessItem
                      icon={SettingsIcon}
                      title="Decision Support"
                      description="Mengakses rekomendasi berbasis data."
                    />
                  </div>
                </div>
              )}
            </section>
          )}

          {/* =================================================
              SECURITY
          ================================================= */}

          {activeSection === "security" && (
            <section className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Keamanan akun</h2>

                  <p>
                    {isAdmin
                      ? "Kelola keamanan akun administrator ECODAS."
                      : "Perbarui password untuk menjaga keamanan akun."}
                  </p>
                </div>
              </div>

              <div className="settings-card">
                <div className="settings-card-title">
                  Ubah password
                </div>

                <form onSubmit={handleSavePassword}>
                  {[
                    ["old", "Password lama"],
                    ["new", "Password baru"],
                    ["confirm", "Konfirmasi password baru"],
                  ].map(([key, label]) => (
                    <div
                      className="settings-field password-field"
                      key={key}
                    >
                      <label>{label}</label>

                      <div className="password-input-wrap">
                        <input
                          type={showPassword[key] ? "text" : "password"}
                          value={password[key]}
                          onChange={(e) =>
                            handlePasswordChange(
                              key,
                              e.target.value,
                            )
                          }
                          placeholder="Masukkan password"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((prev) => ({
                              ...prev,
                              [key]: !prev[key],
                            }))
                          }
                          aria-label={
                            showPassword[key]
                              ? "Sembunyikan password"
                              : "Tampilkan password"
                          }
                        >
                          {showPassword[key] ? (
                            <EyeOff size={17} />
                          ) : (
                            <Eye size={17} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="password-note">
                    Gunakan minimal 8 karakter dengan kombinasi huruf
                    dan angka.
                  </div>

                  <button
                    type="submit"
                    className="settings-primary-button"
                  >
                    <Save size={16} />
                    Simpan password
                  </button>
                </form>
              </div>

              {/* SESSION */}

              <div className="settings-card">
                <div className="settings-card-title">
                  Sesi saat ini
                </div>

                <div className="session-row">
                  <div className="session-icon">
                    <Monitor size={20} />
                  </div>

                  <div>
                    <strong>Browser desktop</strong>

                    <p>Sesi aktif pada perangkat ini</p>
                  </div>

                  <span className="session-active">Aktif</span>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              PREFERENCES
          ================================================= */}

          {activeSection === "preferences" && (
            <section className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>Preferences</h2>

                  <p>
                    {isAdmin
                      ? "Atur notifikasi dan preferensi kerja administrator."
                      : "Atur bagaimana ECODAS memberikan informasi dan pengingat kepadamu."}
                  </p>
                </div>
              </div>

              {/* =============================================
                  ADMIN PREFERENCES
              ============================================= */}

              {isAdmin ? (
                <>
                  <div className="settings-card">
                    <div className="settings-card-title">
                      Notifikasi administrator
                    </div>

                    <SettingToggle
                      title="Activity Review"
                      description="Beritahu ketika terdapat aktivitas mahasiswa yang perlu ditinjau."
                      checked={adminPreferences.reviewNotification}
                      onChange={() =>
                        handleAdminPreference(
                          "reviewNotification",
                        )
                      }
                    />

                    <SettingToggle
                      title="Notifikasi sistem"
                      description="Terima informasi mengenai perubahan dan status sistem ECODAS."
                      checked={adminPreferences.systemNotification}
                      onChange={() =>
                        handleAdminPreference(
                          "systemNotification",
                        )
                      }
                    />

                    <SettingToggle
                      title="Laporan mingguan"
                      description="Tampilkan ringkasan performa keberlanjutan secara berkala."
                      checked={adminPreferences.weeklyReport}
                      onChange={() =>
                        handleAdminPreference("weeklyReport")
                      }
                    />

                    <SettingToggle
                      title="Data alert"
                      description="Berikan peringatan ketika terdapat data yang perlu diperhatikan."
                      checked={adminPreferences.dataAlert}
                      onChange={() =>
                        handleAdminPreference("dataAlert")
                      }
                    />

                    <SettingToggle
                      title="Pembaruan collective intelligence"
                      description="Beritahu ketika agregasi data kolektif diperbarui."
                      checked={adminPreferences.collectiveUpdate}
                      onChange={() =>
                        handleAdminPreference(
                          "collectiveUpdate",
                        )
                      }
                    />
                  </div>
                </>
              ) : (
                /* =============================================
                   STUDENT PREFERENCES
                ============================================= */

                <div className="settings-card">
                  <div className="settings-card-title">
                    Notifikasi mahasiswa
                  </div>

                  <SettingToggle
                    title="Aktivitas tervalidasi"
                    description="Beritahu ketika aktivitas yang kamu kirim telah divalidasi."
                    checked={
                      studentPreferences.activityNotification
                    }
                    onChange={() =>
                      handleStudentPreference(
                        "activityNotification",
                      )
                    }
                  />

                  <SettingToggle
                    title="Pengingat kebiasaan"
                    description="Terima pengingat untuk menjalankan target kebiasaan."
                    checked={studentPreferences.habitReminder}
                    onChange={() =>
                      handleStudentPreference("habitReminder")
                    }
                  />

                  <SettingToggle
                    title="Feedback mingguan"
                    description="Tampilkan ringkasan perkembangan konsumsi setiap minggu."
                    checked={studentPreferences.weeklyFeedback}
                    onChange={() =>
                      handleStudentPreference("weeklyFeedback")
                    }
                  />
                </div>
              )}

              {/* =============================================
                  APPEARANCE
              ============================================= */}

              <div className="settings-card">
                <div className="settings-card-title">
                  Tampilan
                </div>

                <div className="settings-select-row">
                  <div>
                    <strong>Bahasa</strong>

                    <p>
                      Bahasa yang digunakan pada antarmuka.
                    </p>
                  </div>

                  <select
                    value={language}
                    onChange={(e) =>
                      setLanguage(e.target.value)
                    }
                  >
                    <option>Indonesia</option>
                    <option>English</option>
                  </select>
                </div>

                <div className="settings-select-row">
                  <div>
                    <strong>Tampilan</strong>

                    <p>Mode tampilan aplikasi.</p>
                  </div>

                  <select
                    value={appearance}
                    onChange={(e) =>
                      setAppearance(e.target.value)
                    }
                  >
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="settings-primary-button"
                  onClick={handleSavePreferences}
                >
                  <Save size={16} />
                  Simpan preferences
                </button>
              </div>
            </section>
          )}

          {/* =================================================
              PRIVACY / DATA
          ================================================= */}

          {activeSection === "privacy" && (
            <section className="settings-section">
              <div className="settings-section-heading">
                <div>
                  <h2>
                    {isAdmin
                      ? "Data & privacy"
                      : "Privacy & data"}
                  </h2>

                  <p>
                    {isAdmin
                      ? "Kelola data yang digunakan dalam administrasi dan analisis ECODAS."
                      : "Kontrol bagaimana data aktivitas digunakan dalam ECODAS."}
                  </p>
                </div>
              </div>

              {/* =============================================
                  STUDENT PRIVACY
              ============================================= */}

              {!isAdmin && (
                <div className="settings-card">
                  <div className="settings-card-title">
                    Penggunaan data
                  </div>

                  <SettingToggle
                    title="Profil publik"
                    description="Izinkan profilmu ditampilkan pada lingkungan ECODAS."
                    checked={studentPreferences.publicProfile}
                    onChange={() =>
                      handleStudentPreference(
                        "publicProfile",
                      )
                    }
                  />

                  <SettingToggle
                    title="Analisis kolektif"
                    description="Izinkan data aktivitas anonim digunakan untuk pola konsumsi kolektif."
                    checked={
                      studentPreferences.collectiveAnalysis
                    }
                    onChange={() =>
                      handleStudentPreference(
                        "collectiveAnalysis",
                      )
                    }
                  />
                </div>
              )}

              {/* =============================================
                  ADMIN DATA MANAGEMENT
              ============================================= */}

              {isAdmin && (
                <div className="settings-card">
                  <div className="settings-card-title">
                    Pengelolaan data sistem
                  </div>

                  <div className="settings-data-info">
                    <div className="settings-data-icon">
                      <Database size={20} />
                    </div>

                    <div>
                      <strong>
                        Data ECODAS pada perangkat
                      </strong>

                      <p>
                        Administrator dapat mengakses data
                        mahasiswa, aktivitas, dan data review
                        prototype yang tersimpan pada perangkat.
                      </p>
                    </div>
                  </div>

                  <div className="settings-data-scope">
                    <div>
                      <span>Students</span>
                      <small>Data mahasiswa</small>
                    </div>

                    <div>
                      <span>Activities</span>
                      <small>Data aktivitas</small>
                    </div>

                    <div>
                      <span>Review</span>
                      <small>Validasi aktivitas</small>
                    </div>
                  </div>
                </div>
              )}

              {/* =============================================
                  EXPORT
              ============================================= */}

              <div className="settings-card">
                <div className="settings-card-title">
                  {isAdmin
                    ? "Export data sistem"
                    : "Data kamu"}
                </div>

                <div className="privacy-action">
                  <div className="privacy-action-icon">
                    <Download size={20} />
                  </div>

                  <div>
                    <strong>
                      {isAdmin
                        ? "Export data administrasi"
                        : "Export data"}
                    </strong>

                    <p>
                      {isAdmin
                        ? "Unduh data mahasiswa, aktivitas, review, profil, dan preferensi prototype."
                        : "Unduh data profil, aktivitas, kebiasaan, dan progress awareness."}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="settings-outline-button"
                    onClick={handleExportData}
                  >
                    Export
                  </button>
                </div>
              </div>

              {/* =============================================
                  DANGER ZONE
              ============================================= */}

              <div className="settings-danger">
                <div className="settings-danger-header">
                  <AlertTriangle size={19} />

                  <div>
                    <h3>Danger zone</h3>

                    <p>
                      {isAdmin
                        ? "Tindakan ini dapat menghapus data administrasi prototype pada perangkat."
                        : "Tindakan di bawah dapat mengubah atau menghapus data aktivitas."}
                    </p>
                  </div>
                </div>

                <div className="danger-action">
                  <div>
                    <strong>
                      {isAdmin
                        ? "Reset data administrasi"
                        : "Reset data aktivitas"}
                    </strong>

                    <p>
                      {isAdmin
                        ? "Menghapus data mahasiswa dan aktivitas review prototype."
                        : "Menghapus data aktivitas dan kebiasaan yang tersimpan pada perangkat."}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="danger-button"
                    onClick={
                      isAdmin
                        ? handleResetAdminData
                        : handleResetStudentData
                    }
                  >
                    <Trash2 size={16} />
                    Reset data
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* =================================================
              LOGOUT
          ================================================= */}

          <div className="settings-logout-card">
            <div>
              <strong>Keluar dari ECODAS</strong>

              <p>
                Akhiri sesi{" "}
                {isAdmin
                  ? "administrator"
                  : "mahasiswa"}{" "}
                pada perangkat ini.
              </p>
            </div>

            <button
              type="button"
              className="settings-logout-button"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Log out
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ============================================================
   TOGGLE COMPONENT
============================================================ */

function SettingToggle({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="settings-toggle-row">
      <div>
        <strong>{title}</strong>

        <p>{description}</p>
      </div>

      <button
        type="button"
        className={
          checked
            ? "settings-toggle checked"
            : "settings-toggle"
        }
        onClick={onChange}
        aria-label={title}
      >
        <span />
      </button>
    </div>
  );
}

/* ============================================================
   ADMIN ACCESS ITEM
============================================================ */

function AdminAccessItem({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="settings-admin-access-item">
      <div className="settings-admin-access-icon">
        <Icon size={19} />
      </div>

      <div>
        <strong>{title}</strong>

        <p>{description}</p>
      </div>
    </div>
  );
}