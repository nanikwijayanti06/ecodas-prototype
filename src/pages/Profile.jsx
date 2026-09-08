import React, { useState } from "react";

// --- ICONS (SVG stroke-style, senada dengan Navbar.jsx) ---
const IconCamera = (props) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);
const IconEdit = (props) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z" />
  </svg>
);
const IconStar = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconLeaf = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);
const IconAward = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const TABS = ["Informasi Akun", "Riwayat Aktivitas"];

const Profile = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [isEditing, setIsEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "Nama Mahasiswa",
    nim: "2XXXXXXXXX",
    university: "Universitas Negeri Yogyakarta",
    faculty: "Fakultas Teknik",
    major: "Teknik Industri",
    year: "2022",
    level: "Level 4 — Eco-Warrior",
    totalPoints: 350,
    carbonSaved: 48.5,
    treesEquivalent: 2,
    email: "namamu@student.uny.ac.id",
  });

  const [formData, setFormData] = useState(userData);

  const [history] = useState([
    {
      id: 1,
      action: "Selesai Tantangan: Bawa Tumbler",
      points: "+50 pts",
      date: "4 Aug 2026",
    },
    {
      id: 2,
      action: "Catat Log Transportasi: Jalan Kaki",
      points: "+1.2 kg CO₂",
      date: "3 Aug 2026",
    },
    {
      id: 3,
      action: "Membaca Artikel: Pengolahan Sampah Organik",
      points: "+10 pts",
      date: "1 Aug 2026",
    },
  ]);

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSave = (e) => {
    e.preventDefault();
    setUserData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const initials = userData.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const formFields = [
    [
      { key: "name", label: "Nama Lengkap" },
      { key: "nim", label: "NIM" },
    ],
    [
      { key: "university", label: "Universitas" },
      { key: "faculty", label: "Fakultas" },
    ],
    [
      { key: "major", label: "Program Studi" },
      { key: "year", label: "Angkatan" },
    ],
  ];

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <div style={styles.layout}>
          {/* ===== KOLOM KIRI: identitas + ringkasan ===== */}
          <div style={styles.sideCard}>
            <div style={styles.cover} />
            <div style={styles.avatarWrap}>
              <div style={styles.avatar}>{initials || "?"}</div>
              <button style={styles.avatarEditBtn} aria-label="Ganti foto">
                <IconCamera />
              </button>
            </div>

            <div style={styles.sideBody}>
              <h1 style={styles.name}>{userData.name}</h1>
              <p style={styles.subline}>{userData.major}</p>
              <p style={styles.sublineMuted}>{userData.faculty}</p>

              <span style={styles.levelBadge}>{userData.level}</span>

              <div style={styles.statList}>
                <div style={styles.statRow}>
                  <span style={styles.statLabelWrap}>
                    <IconStar style={{ color: "#166534" }} />
                    Total Poin
                  </span>
                  <span style={styles.statValue}>{userData.totalPoints}</span>
                </div>
                <div style={styles.statRow}>
                  <span style={styles.statLabelWrap}>
                    <IconLeaf style={{ color: "#166534" }} />
                    CO₂ Dihemat
                  </span>
                  <span style={styles.statValue}>
                    {userData.carbonSaved} kg
                  </span>
                </div>
                <div style={styles.statRow}>
                  <span style={styles.statLabelWrap}>
                    <IconAward style={{ color: "#166534" }} />
                    Setara Pohon
                  </span>
                  <span style={styles.statValue}>
                    {userData.treesEquivalent}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== KOLOM KANAN: tab + konten ===== */}
          <div style={styles.mainCard}>
            <div style={styles.tabBar}>
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.tabButton,
                    color: activeTab === tab ? "#166534" : "#94a3b8",
                    borderBottom:
                      activeTab === tab
                        ? "2px solid #166534"
                        : "2px solid transparent",
                  }}
                >
                  {tab}
                </button>
              ))}
              {activeTab === "Informasi Akun" && !isEditing && (
                <button
                  style={styles.editLink}
                  onClick={() => setIsEditing(true)}
                >
                  <IconEdit /> Edit
                </button>
              )}
            </div>

            <div style={styles.tabContent}>
              {activeTab === "Informasi Akun" ? (
                isEditing ? (
                  <form onSubmit={handleSave} style={styles.form}>
                    {formFields.map((row, i) => (
                      <div style={styles.formRow} key={i}>
                        {row.map((f) => (
                          <div style={styles.formGroup} key={f.key}>
                            <label style={styles.formLabel}>{f.label}</label>
                            <input
                              style={styles.formInput}
                              type="text"
                              value={formData[f.key]}
                              onChange={(e) =>
                                handleChange(f.key, e.target.value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    ))}
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Email Kampus</label>
                      <input
                        style={styles.formInput}
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                    </div>
                    <div style={styles.formActions}>
                      <button type="submit" style={styles.btnPrimary}>
                        Simpan Perubahan
                      </button>
                      <button
                        type="button"
                        style={styles.btnGhost}
                        onClick={handleCancel}
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                ) : (
                  <div style={styles.infoGrid}>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>Email Kampus</span>
                      <span style={styles.infoValue}>{userData.email}</span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>Universitas</span>
                      <span style={styles.infoValue}>
                        {userData.university}
                      </span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>Fakultas</span>
                      <span style={styles.infoValue}>{userData.faculty}</span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>Program Studi</span>
                      <span style={styles.infoValue}>{userData.major}</span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>Angkatan</span>
                      <span style={styles.infoValue}>{userData.year}</span>
                    </div>
                    <div style={styles.infoItem}>
                      <span style={styles.infoLabel}>Status Partisipasi</span>
                      <span
                        style={{
                          ...styles.infoValue,
                          color: "#166534",
                          fontWeight: 700,
                        }}
                      >
                        Aktif (Green Student)
                      </span>
                    </div>
                  </div>
                )
              ) : (
                <div style={styles.historyList}>
                  {history.map((item) => (
                    <div key={item.id} style={styles.historyItem}>
                      <div>
                        <p style={styles.historyAction}>{item.action}</p>
                        <span style={styles.historyDate}>{item.date}</span>
                      </div>
                      <span style={styles.historyPoints}>{item.points}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
  },
  wrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gap: "24px",
    alignItems: "start",
  },

  // Left card
  sideCard: {
    backgroundColor: "white",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    overflow: "hidden",
  },
  cover: {
    height: "80px",
    backgroundColor: "#166534",
  },
  avatarWrap: {
    position: "relative",
    width: "76px",
    marginLeft: "24px",
    marginTop: "-38px",
  },
  avatar: {
    width: "76px",
    height: "76px",
    borderRadius: "50%",
    backgroundColor: "#f0fdf4",
    color: "#166534",
    border: "4px solid white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "700",
  },
  avatarEditBtn: {
    position: "absolute",
    bottom: "0",
    right: "-4px",
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    backgroundColor: "#166534",
    color: "white",
    border: "2px solid white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  sideBody: {
    padding: "16px 24px 24px 24px",
  },
  name: {
    fontSize: "17px",
    fontWeight: "700",
    color: "#0f172a",
    margin: "8px 0 2px 0",
  },
  subline: {
    fontSize: "13px",
    color: "#334155",
    margin: 0,
    fontWeight: "600",
  },
  sublineMuted: {
    fontSize: "12px",
    color: "#94a3b8",
    margin: "2px 0 12px 0",
  },
  levelBadge: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "700",
    color: "#166534",
    backgroundColor: "#f0fdf4",
    padding: "5px 10px",
    borderRadius: "999px",
    marginBottom: "20px",
  },
  statList: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    borderTop: "1px solid #f1f5f9",
    paddingTop: "16px",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabelWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "#64748b",
  },
  statValue: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f172a",
  },

  // Right card
  mainCard: {
    backgroundColor: "white",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    minHeight: "400px",
  },
  tabBar: {
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
    borderBottom: "1px solid #e2e8f0",
  },
  tabButton: {
    background: "none",
    border: "none",
    padding: "18px 4px",
    marginRight: "24px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  editLink: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "none",
    border: "none",
    color: "#166534",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
  },
  tabContent: {
    padding: "28px 24px",
  },

  // Info grid (read-only)
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "22px",
  },
  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  infoLabel: {
    fontSize: "11px",
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  infoValue: {
    fontSize: "14px",
    color: "#0f172a",
    fontWeight: "500",
  },

  // Form (edit mode)
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  formLabel: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#475569",
  },
  formInput: {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },
  formActions: {
    display: "flex",
    gap: "10px",
    marginTop: "4px",
  },
  btnPrimary: {
    backgroundColor: "#166534",
    color: "white",
    border: "none",
    padding: "10px 22px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
  },
  btnGhost: {
    backgroundColor: "transparent",
    color: "#64748b",
    border: "1px solid #cbd5e1",
    padding: "10px 22px",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "13px",
    cursor: "pointer",
  },

  // History
  historyList: {
    display: "flex",
    flexDirection: "column",
  },
  historyItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #f1f5f9",
  },
  historyAction: {
    fontSize: "13.5px",
    color: "#0f172a",
    fontWeight: "600",
    margin: 0,
  },
  historyDate: {
    fontSize: "12px",
    color: "#94a3b8",
  },
  historyPoints: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#166534",
    whiteSpace: "nowrap",
  },
};

export default Profile;
