import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Eye,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Pencil,
  Trash2,
  X,
  Image as ImageIcon,
  FileCheck2,
  Clock3,
  AlertCircle,
  ChevronDown,
  UserRound,
  CalendarDays,
  Tag,
  MessageSquareText,
} from "lucide-react";

import "./ActivityReview.css";

/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "ecodas_activity_review";

/* =========================================================
   DEFAULT DATA
   Prototype data — nantinya dapat diganti dengan data
   aktivitas mahasiswa dari Layer 2 / Layer 3.
   ========================================================= */

const DEFAULT_ACTIVITIES = [
  {
    id: 1,
    studentName: "Nanik Wijayanti",
    nim: "23051430009",
    faculty: "Fakultas Teknik",
    category: "Konsumsi",
    activity: "Membawa tumbler ke kampus",
    date: "2026-09-10",
    impact: 0.2,
    status: "Menunggu",
    evidence: null,
    studentNote:
      "Menggunakan tumbler pribadi selama kegiatan di kampus untuk mengurangi penggunaan botol sekali pakai.",
    adminNote: "",
    submittedAt: "2026-09-10 14:20",
  },
  {
    id: 2,
    studentName: "Aulia Putri",
    nim: "23051430021",
    faculty: "Fakultas Bahasa, Seni, dan Budaya",
    category: "Transportasi",
    activity: "Menggunakan transportasi umum",
    date: "2026-09-09",
    impact: 1.2,
    status: "Menunggu",
    evidence: null,
    studentNote:
      "Menggunakan TransJogja untuk perjalanan dari tempat tinggal menuju kampus.",
    adminNote: "",
    submittedAt: "2026-09-09 10:15",
  },
  {
    id: 3,
    studentName: "Dimas Pratama",
    nim: "23051430035",
    faculty: "Fakultas Ilmu Sosial, Hukum, dan Ilmu Politik",
    category: "Digital",
    activity: "Mengumpulkan tugas tanpa mencetak",
    date: "2026-09-08",
    impact: 0.5,
    status: "Tervalidasi",
    evidence: null,
    studentNote:
      "Menggunakan dokumen digital untuk pengumpulan tugas dan mengurangi kebutuhan pencetakan.",
    adminNote: "Aktivitas sesuai dengan keterangan yang diberikan.",
    submittedAt: "2026-09-08 16:42",
  },
  {
    id: 4,
    studentName: "Salsa Maharani",
    nim: "23051430047",
    faculty: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    category: "Plastik",
    activity: "Mengurangi penggunaan kantong plastik",
    date: "2026-09-07",
    impact: 0.7,
    status: "Perlu Revisi",
    evidence: null,
    studentNote:
      "Menggunakan tas belanja ulang pakai ketika membeli kebutuhan sehari-hari.",
    adminNote:
      "Bukti aktivitas belum cukup jelas. Silakan unggah foto yang menunjukkan penggunaan tas ulang pakai.",
    submittedAt: "2026-09-07 09:30",
  },
  {
    id: 5,
    studentName: "Raka Aditya",
    nim: "23051430052",
    faculty: "Fakultas Ilmu Keolahragaan",
    category: "Energi",
    activity: "Mematikan perangkat setelah digunakan",
    date: "2026-09-06",
    impact: 0.4,
    status: "Ditolak",
    evidence: null,
    studentNote:
      "Mematikan perangkat elektronik setelah kegiatan selesai.",
    adminNote:
      "Bukti belum menunjukkan aktivitas secara memadai dan tidak dapat diverifikasi.",
    submittedAt: "2026-09-06 18:10",
  },
  {
    id: 6,
    studentName: "Ayu Lestari",
    nim: "23051430063",
    faculty: "Fakultas Ekonomi dan Bisnis",
    category: "Makanan",
    activity: "Membawa bekal ke kampus",
    date: "2026-09-05",
    impact: 0.8,
    status: "Tervalidasi",
    evidence: null,
    studentNote:
      "Membawa makanan dari rumah menggunakan wadah makan yang dapat digunakan kembali.",
    adminNote: "Aktivitas tervalidasi.",
    submittedAt: "2026-09-05 12:05",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

function loadActivities() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Gagal membaca activity review:", error);
  }

  return DEFAULT_ACTIVITIES;
}

function saveActivities(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Gagal menyimpan activity review:", error);
  }
}

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* =========================================================
   STATUS
   ========================================================= */

const STATUS_CONFIG = {
  Menunggu: {
    className: "review-status-pending",
    icon: Clock3,
  },
  Tervalidasi: {
    className: "review-status-valid",
    icon: CheckCircle2,
  },
  "Perlu Revisi": {
    className: "review-status-revision",
    icon: RotateCcw,
  },
  Ditolak: {
    className: "review-status-rejected",
    icon: XCircle,
  },
};

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.Menunggu;
  const Icon = config.icon;

  return (
    <span className={`review-status ${config.className}`}>
      <Icon size={12} strokeWidth={2} />
      {status}
    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function ActivityReview() {
  const [activities, setActivities] = useState(loadActivities);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");

  const [selectedActivity, setSelectedActivity] = useState(null);

  const [reviewMode, setReviewMode] = useState(false);

  const [adminNote, setAdminNote] = useState("");

  const [editingActivity, setEditingActivity] = useState(null);

  const [deleteTarget, setDeleteTarget] = useState(null);

  /* =======================================================
     SAVE
     ======================================================= */

  const updateActivities = (nextData) => {
    setActivities(nextData);
    saveActivities(nextData);
  };

  /* =======================================================
     FILTER OPTIONS
     ======================================================= */

  const categories = useMemo(() => {
    const values = activities.map((item) => item.category);

    return ["Semua", ...new Set(values)];
  }, [activities]);

  /* =======================================================
     FILTERED DATA
     ======================================================= */

  const filteredActivities = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return activities.filter((item) => {
      const matchesSearch =
        !keyword ||
        item.studentName?.toLowerCase().includes(keyword) ||
        item.nim?.toLowerCase().includes(keyword) ||
        item.activity?.toLowerCase().includes(keyword) ||
        item.faculty?.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "Semua" || item.status === statusFilter;

      const matchesCategory =
        categoryFilter === "Semua" || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [activities, search, statusFilter, categoryFilter]);

  /* =======================================================
     STATISTICS
     ======================================================= */

  const statistics = useMemo(() => {
    return {
      total: activities.length,
      pending: activities.filter((item) => item.status === "Menunggu").length,
      valid: activities.filter((item) => item.status === "Tervalidasi").length,
      revision: activities.filter(
        (item) => item.status === "Perlu Revisi"
      ).length,
      rejected: activities.filter((item) => item.status === "Ditolak").length,
    };
  }, [activities]);

  /* =======================================================
     OPEN DETAIL
     ======================================================= */

  const openDetail = (activity) => {
    setSelectedActivity(activity);
    setReviewMode(false);
    setAdminNote(activity.adminNote || "");
  };

  /* =======================================================
     OPEN REVIEW
     ======================================================= */

  const openReview = (activity) => {
    setSelectedActivity(activity);
    setReviewMode(true);
    setAdminNote(activity.adminNote || "");
  };

  /* =======================================================
     CLOSE MODAL
     ======================================================= */

  const closeModal = () => {
    setSelectedActivity(null);
    setReviewMode(false);
    setAdminNote("");
  };

  /* =======================================================
     UPDATE STATUS
     ======================================================= */

  const handleReview = (newStatus) => {
    if (!selectedActivity) return;

    const updated = activities.map((item) => {
      if (item.id !== selectedActivity.id) return item;

      return {
        ...item,
        status: newStatus,
        adminNote: adminNote.trim(),
      };
    });

    updateActivities(updated);

    const updatedItem = updated.find(
      (item) => item.id === selectedActivity.id
    );

    setSelectedActivity(updatedItem);
    setReviewMode(false);
  };

  /* =======================================================
     EDIT
     ======================================================= */

  const openEdit = (activity) => {
    setEditingActivity({
      ...activity,
    });
  };

  const handleEditChange = (field, value) => {
    setEditingActivity((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();

    if (!editingActivity) return;

    const updated = activities.map((item) =>
      item.id === editingActivity.id ? editingActivity : item
    );

    updateActivities(updated);
    setEditingActivity(null);
  };

  /* =======================================================
     DELETE
     ======================================================= */

  const handleDelete = () => {
    if (!deleteTarget) return;

    const updated = activities.filter(
      (item) => item.id !== deleteTarget.id
    );

    updateActivities(updated);

    if (selectedActivity?.id === deleteTarget.id) {
      closeModal();
    }

    setDeleteTarget(null);
  };

  /* =======================================================
     RESET PROTOTYPE DATA
     ======================================================= */

  const handleReset = () => {
    const confirmed = window.confirm(
      "Kembalikan data Activity Review ke data prototype awal?"
    );

    if (!confirmed) return;

    updateActivities(DEFAULT_ACTIVITIES);
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <section className="review-page">
      {/* ===================================================
          HEADER
          =================================================== */}

      <header className="review-header">
        <div className="review-header-copy">
          <span className="review-eyebrow">
            ADMINISTRATION / REVIEW & VALIDATION
          </span>

          <h1>Activity Review</h1>

          <p>
            Menilai aktivitas keberlanjutan yang dikirim mahasiswa sebelum
            data digunakan untuk analisis Collective Intelligence.
          </p>
        </div>

        <button
          type="button"
          className="review-reset-button"
          onClick={handleReset}
        >
          <RotateCcw size={14} />
          Reset prototype
        </button>
      </header>

      {/* ===================================================
          STATISTICS
          =================================================== */}

      <section className="review-stat-grid">
        <div className="review-stat-card">
          <div className="review-stat-icon">
            <FileCheck2 size={17} />
          </div>

          <div>
            <span>Total aktivitas</span>
            <strong>{statistics.total}</strong>
            <small>Seluruh kiriman mahasiswa</small>
          </div>
        </div>

        <div className="review-stat-card">
          <div className="review-stat-icon pending">
            <Clock3 size={17} />
          </div>

          <div>
            <span>Menunggu review</span>
            <strong>{statistics.pending}</strong>
            <small>Perlu penilaian admin</small>
          </div>
        </div>

        <div className="review-stat-card">
          <div className="review-stat-icon valid">
            <CheckCircle2 size={17} />
          </div>

          <div>
            <span>Tervalidasi</span>
            <strong>{statistics.valid}</strong>
            <small>Masuk dataset tervalidasi</small>
          </div>
        </div>

        <div className="review-stat-card">
          <div className="review-stat-icon revision">
            <AlertCircle size={17} />
          </div>

          <div>
            <span>Perlu tindakan</span>
            <strong>{statistics.revision + statistics.rejected}</strong>
            <small>Revisi atau ditolak</small>
          </div>
        </div>
      </section>

      {/* ===================================================
          INFORMATION
          =================================================== */}

      <div className="review-information">
        <div className="review-information-icon">
          <FileCheck2 size={17} />
        </div>

        <div>
          <strong>Data tervalidasi menjadi sumber analisis L4</strong>

          <p>
            Aktivitas dengan status <b>Tervalidasi</b> dapat digunakan untuk
            membentuk pola konsumsi, perilaku, dan performa keberlanjutan.
          </p>
        </div>
      </div>

      {/* ===================================================
          FILTER PANEL
          =================================================== */}

      <section className="review-control-panel">
        <div className="review-control-top">
          <div className="review-search">
            <Search size={15} />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari mahasiswa, NIM, aktivitas..."
            />

            {search && (
              <button
                type="button"
                className="review-clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="review-filter-group">
            <SlidersHorizontal size={14} />

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter status"
            >
              <option value="Semua">Semua status</option>
              <option value="Menunggu">Menunggu</option>
              <option value="Tervalidasi">Tervalidasi</option>
              <option value="Perlu Revisi">Perlu Revisi</option>
              <option value="Ditolak">Ditolak</option>
            </select>
          </div>

          <div className="review-filter-group">
            <Tag size={14} />

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              aria-label="Filter kategori"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "Semua" ? "Semua kategori" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="review-filter-summary">
          <span>
            Menampilkan <strong>{filteredActivities.length}</strong> dari{" "}
            <strong>{activities.length}</strong> aktivitas
          </span>

          {(search ||
            statusFilter !== "Semua" ||
            categoryFilter !== "Semua") && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("Semua");
                setCategoryFilter("Semua");
              }}
            >
              Reset filter
            </button>
          )}
        </div>
      </section>

      {/* ===================================================
          TABLE
          =================================================== */}

      <section className="review-table-section">
        <div className="review-section-heading">
          <div>
            <span className="review-section-kicker">SUBMITTED ACTIVITIES</span>
            <h2>Aktivitas mahasiswa</h2>
          </div>

          <span className="review-result-count">
            {filteredActivities.length} data
          </span>
        </div>

        <div className="review-table-wrapper">
          <table className="review-table">
            <thead>
              <tr>
                <th>Mahasiswa</th>
                <th>Aktivitas</th>
                <th>Kategori</th>
                <th>Tanggal</th>
                <th>Dampak</th>
                <th>Status</th>
                <th>Bukti</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="8">
                    <div className="review-empty">
                      <Search size={23} />
                      <strong>Data tidak ditemukan</strong>
                      <span>
                        Coba ubah kata kunci atau filter yang digunakan.
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredActivities.map((activity) => (
                  <tr key={activity.id}>
                    {/* STUDENT */}
                    <td>
                      <div className="review-student">
                        <div className="review-avatar">
                          {getInitials(activity.studentName)}
                        </div>

                        <div>
                          <strong>{activity.studentName}</strong>
                          <span>{activity.nim}</span>
                        </div>
                      </div>
                    </td>

                    {/* ACTIVITY */}
                    <td>
                      <div className="review-activity">
                        <strong>{activity.activity}</strong>
                        <span>{activity.faculty}</span>
                      </div>
                    </td>

                    {/* CATEGORY */}
                    <td>
                      <span className="review-category">
                        {activity.category}
                      </span>
                    </td>

                    {/* DATE */}
                    <td>
                      <span className="review-date">
                        {formatDate(activity.date)}
                      </span>
                    </td>

                    {/* IMPACT */}
                    <td>
                      <span className="review-impact">
                        {activity.impact}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <StatusBadge status={activity.status} />
                    </td>

                    {/* EVIDENCE */}
                    <td>
                      {activity.evidence ? (
                        <span className="review-evidence available">
                          <ImageIcon size={12} />
                          Ada
                        </span>
                      ) : (
                        <span className="review-evidence">
                          Tidak ada
                        </span>
                      )}
                    </td>

                    {/* ACTION */}
                    <td>
                      <div className="review-actions">
                        <button
                          type="button"
                          onClick={() => openDetail(activity)}
                          title="Lihat detail"
                        >
                          <Eye size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openReview(activity)}
                          title="Review"
                          className="review-action-primary"
                        >
                          <FileCheck2 size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => openEdit(activity)}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteTarget(activity)}
                          title="Hapus"
                          className="review-action-danger"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ===================================================
          DETAIL / REVIEW MODAL
          =================================================== */}

      {selectedActivity && (
        <div
          className="review-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="review-modal">
            <div className="review-modal-header">
              <div>
                <span className="review-section-kicker">
                  {reviewMode ? "VALIDATION" : "ACTIVITY DETAIL"}
                </span>

                <h2>
                  {reviewMode ? "Review aktivitas" : "Detail aktivitas"}
                </h2>
              </div>

              <button
                type="button"
                className="review-modal-close"
                onClick={closeModal}
              >
                <X size={17} />
              </button>
            </div>

            <div className="review-modal-body">
              {/* STUDENT IDENTITY */}

              <div className="review-detail-student">
                <div className="review-detail-avatar">
                  {getInitials(selectedActivity.studentName)}
                </div>

                <div>
                  <strong>{selectedActivity.studentName}</strong>
                  <span>
                    {selectedActivity.nim} · {selectedActivity.faculty}
                  </span>
                </div>

                <StatusBadge status={selectedActivity.status} />
              </div>

              {/* ACTIVITY */}

              <div className="review-detail-grid">
                <div>
                  <span className="review-detail-label">
                    <CalendarDays size={12} />
                    Tanggal
                  </span>

                  <strong>
                    {formatDate(selectedActivity.date)}
                  </strong>
                </div>

                <div>
                  <span className="review-detail-label">
                    <Tag size={12} />
                    Kategori
                  </span>

                  <strong>{selectedActivity.category}</strong>
                </div>

                <div>
                  <span className="review-detail-label">
                    Dampak
                  </span>

                  <strong>{selectedActivity.impact}</strong>
                </div>
              </div>

              <div className="review-detail-activity">
                <span>Aktivitas</span>
                <strong>{selectedActivity.activity}</strong>
              </div>

              {/* EVIDENCE */}

              <div className="review-evidence-section">
                <div className="review-detail-title">
                  <ImageIcon size={14} />
                  <span>Bukti aktivitas</span>
                </div>

                {selectedActivity.evidence ? (
                  <div className="review-evidence-preview">
                    <img
                      src={selectedActivity.evidence}
                      alt="Bukti aktivitas mahasiswa"
                    />
                  </div>
                ) : (
                  <div className="review-no-evidence">
                    <ImageIcon size={22} />

                    <strong>Belum ada bukti foto</strong>

                    <span>
                      Mahasiswa belum mengunggah evidence untuk aktivitas ini.
                    </span>
                  </div>
                )}
              </div>

              {/* STUDENT NOTE */}

              <div className="review-note-box">
                <span>
                  <MessageSquareText size={13} />
                  Catatan mahasiswa
                </span>

                <p>
                  {selectedActivity.studentNote ||
                    "Tidak ada catatan dari mahasiswa."}
                </p>
              </div>

              {/* ADMIN REVIEW */}

              {reviewMode && (
                <div className="review-assessment">
                  <div className="review-detail-title">
                    <FileCheck2 size={14} />
                    <span>Penilaian admin</span>
                  </div>

                  <label className="review-form-label">
                    Catatan / alasan
                  </label>

                  <textarea
                    value={adminNote}
                    onChange={(event) => setAdminNote(event.target.value)}
                    placeholder="Tulis catatan penilaian admin..."
                    rows={4}
                  />

                  <p className="review-assessment-help">
                    Catatan akan disimpan bersama status aktivitas dan dapat
                    menjadi informasi bagi mahasiswa.
                  </p>
                </div>
              )}

              {/* EXISTING ADMIN NOTE */}

              {!reviewMode && selectedActivity.adminNote && (
                <div className="review-admin-note">
                  <span>Catatan admin</span>
                  <p>{selectedActivity.adminNote}</p>
                </div>
              )}
            </div>

            {/* FOOTER */}

            <div className="review-modal-footer">
              {!reviewMode ? (
                <>
                  <button
                    type="button"
                    className="review-secondary-button"
                    onClick={closeModal}
                  >
                    Tutup
                  </button>

                  <button
                    type="button"
                    className="review-primary-button"
                    onClick={() => {
                      setReviewMode(true);
                      setAdminNote(selectedActivity.adminNote || "");
                    }}
                  >
                    <FileCheck2 size={14} />
                    Mulai review
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    className="review-danger-button"
                    onClick={() => handleReview("Ditolak")}
                  >
                    <XCircle size={14} />
                    Tolak
                  </button>

                  <button
                    type="button"
                    className="review-revision-button"
                    onClick={() => handleReview("Perlu Revisi")}
                  >
                    <RotateCcw size={14} />
                    Perlu revisi
                  </button>

                  <button
                    type="button"
                    className="review-primary-button"
                    onClick={() => handleReview("Tervalidasi")}
                  >
                    <CheckCircle2 size={14} />
                    Validasi
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================
          EDIT MODAL
          =================================================== */}

      {editingActivity && (
        <div
          className="review-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setEditingActivity(null);
            }
          }}
        >
          <div className="review-modal review-edit-modal">
            <div className="review-modal-header">
              <div>
                <span className="review-section-kicker">DATA MANAGEMENT</span>
                <h2>Edit aktivitas</h2>
              </div>

              <button
                type="button"
                className="review-modal-close"
                onClick={() => setEditingActivity(null)}
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div className="review-edit-form">
                <div className="review-form-group">
                  <label>Nama mahasiswa</label>

                  <input
                    type="text"
                    value={editingActivity.studentName}
                    onChange={(event) =>
                      handleEditChange(
                        "studentName",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="review-form-group">
                  <label>NIM</label>

                  <input
                    type="text"
                    value={editingActivity.nim}
                    onChange={(event) =>
                      handleEditChange("nim", event.target.value)
                    }
                  />
                </div>

                <div className="review-form-group review-form-full">
                  <label>Fakultas</label>

                  <input
                    type="text"
                    value={editingActivity.faculty}
                    onChange={(event) =>
                      handleEditChange("faculty", event.target.value)
                    }
                  />
                </div>

                <div className="review-form-group review-form-full">
                  <label>Aktivitas</label>

                  <input
                    type="text"
                    value={editingActivity.activity}
                    onChange={(event) =>
                      handleEditChange(
                        "activity",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="review-form-group">
                  <label>Kategori</label>

                  <select
                    value={editingActivity.category}
                    onChange={(event) =>
                      handleEditChange(
                        "category",
                        event.target.value
                      )
                    }
                  >
                    <option value="Konsumsi">Konsumsi</option>
                    <option value="Makanan">Makanan</option>
                    <option value="Transportasi">Transportasi</option>
                    <option value="Plastik">Plastik</option>
                    <option value="Energi">Energi</option>
                    <option value="Digital">Digital</option>
                  </select>
                </div>

                <div className="review-form-group">
                  <label>Status</label>

                  <select
                    value={editingActivity.status}
                    onChange={(event) =>
                      handleEditChange(
                        "status",
                        event.target.value
                      )
                    }
                  >
                    <option value="Menunggu">Menunggu</option>
                    <option value="Tervalidasi">
                      Tervalidasi
                    </option>
                    <option value="Perlu Revisi">
                      Perlu Revisi
                    </option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>

                <div className="review-form-group">
                  <label>Tanggal</label>

                  <input
                    type="date"
                    value={editingActivity.date}
                    onChange={(event) =>
                      handleEditChange(
                        "date",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="review-form-group">
                  <label>Dampak</label>

                  <input
                    type="number"
                    step="0.1"
                    value={editingActivity.impact}
                    onChange={(event) =>
                      handleEditChange(
                        "impact",
                        Number(event.target.value)
                      )
                    }
                  />
                </div>

                <div className="review-form-group review-form-full">
                  <label>Catatan mahasiswa</label>

                  <textarea
                    rows="3"
                    value={editingActivity.studentNote || ""}
                    onChange={(event) =>
                      handleEditChange(
                        "studentNote",
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="review-form-group review-form-full">
                  <label>Catatan admin</label>

                  <textarea
                    rows="3"
                    value={editingActivity.adminNote || ""}
                    onChange={(event) =>
                      handleEditChange(
                        "adminNote",
                        event.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="review-modal-footer">
                <button
                  type="button"
                  className="review-secondary-button"
                  onClick={() => setEditingActivity(null)}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="review-primary-button"
                >
                  <CheckCircle2 size={14} />
                  Simpan perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================================================
          DELETE CONFIRMATION
          =================================================== */}

      {deleteTarget && (
        <div className="review-modal-backdrop">
          <div className="review-delete-modal">
            <div className="review-delete-icon">
              <Trash2 size={18} />
            </div>

            <h2>Hapus aktivitas?</h2>

            <p>
              Aktivitas{" "}
              <strong>{deleteTarget.activity}</strong> milik{" "}
              <strong>{deleteTarget.studentName}</strong> akan dihapus
              dari data review prototype.
            </p>

            <div className="review-delete-actions">
              <button
                type="button"
                className="review-secondary-button"
                onClick={() => setDeleteTarget(null)}
              >
                Batal
              </button>

              <button
                type="button"
                className="review-danger-button"
                onClick={handleDelete}
              >
                <Trash2 size={14} />
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}