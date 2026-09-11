import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Clock3,
  Edit3,
  Leaf,
  Plus,
  Recycle,
  Trash2,
  TrendingDown,
  Upload,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./dashboard.css";
import {
  CATEGORIES,
  DEFAULT_ACTIVITIES,
  DEFAULT_AWARENESS,
  DEFAULT_HABITS,
  PERIODS,
  STORAGE_KEYS,
} from "./dashboardData";

// Kalau file avatar berbeda, sesuaikan path ini.
import profileAvatar from "../../assets/images/profile-avatar.jpg";
import BarChart from "../../components/Charts/BarChart";
import ProgressBar from "../../Gamification/ProgressBar";

const today = new Date();

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getDaysDifference(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  const current = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  return Math.floor((current - date) / (1000 * 60 * 60 * 24));
}

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) return fallback;

    return JSON.parse(stored);
  } catch {
    return fallback;
  }
}

function saveStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("ECODAS storage error:", error);
  }
}

function getCategoryIcon(category) {
  switch (category) {
    case "Makanan":
      return Leaf;

    case "Transportasi":
      return TrendingDown;

    case "Plastik":
      return Recycle;

    case "Energi":
      return Zap;

    case "Digital":
      return BookOpen;

    default:
      return Activity;
  }
}

function getDayName(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("id-ID", {
    weekday: "short",
  });
}

export default function Dashboard() {
  const navigate = useNavigate();

  /* =====================================================
     STATE
     ===================================================== */

  const [awareness, setAwareness] = useState(() =>
    readStorage(STORAGE_KEYS.awareness, DEFAULT_AWARENESS),
  );

  const [activities, setActivities] = useState(() =>
    readStorage(STORAGE_KEYS.activities, DEFAULT_ACTIVITIES),
  );

  const [habits, setHabits] = useState(() =>
    readStorage(STORAGE_KEYS.habits, DEFAULT_HABITS),
  );

  const [period, setPeriod] = useState("7");
  const [category, setCategory] = useState("Semua");

  const [modal, setModal] = useState(null);

  const [selectedActivity, setSelectedActivity] = useState(null);

  const [editingActivity, setEditingActivity] = useState(null);

  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    category: "Makanan",
    activity: "",
    impact: "",
    note: "",
    evidence: null,
  });

  /* =====================================================
     STORAGE SYNC
     ===================================================== */

  useEffect(() => {
    saveStorage(STORAGE_KEYS.awareness, awareness);
  }, [awareness]);

  useEffect(() => {
    saveStorage(STORAGE_KEYS.activities, activities);
  }, [activities]);

  useEffect(() => {
    saveStorage(STORAGE_KEYS.habits, habits);
  }, [habits]);

  /* =====================================================
     AWARENESS
     ===================================================== */

  const awarenessTotal = Object.keys(awareness).length;

  const awarenessCompleted = Object.values(awareness).filter(
    (item) => item.completed,
  ).length;

  const awarenessProgress =
    awarenessTotal === 0
      ? 0
      : Math.round((awarenessCompleted / awarenessTotal) * 100);

  /* =====================================================
     ACTIVITY FILTER
     ===================================================== */

  const filteredActivities = useMemo(() => {
    return activities
      .filter((item) => {
        if (category === "Semua") return true;

        return item.category === category;
      })
      .filter((item) => {
        if (period === "all") return true;

        return getDaysDifference(item.date) <= Number(period);
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [activities, category, period]);

  const validatedActivities = activities.filter(
    (item) => item.status === "Tervalidasi",
  );

  const activeHabits = habits.filter((habit) => habit.active);

  const averageHabitProgress =
    activeHabits.length === 0
      ? 0
      : Math.round(
          activeHabits.reduce((sum, habit) => sum + habit.progress, 0) /
            activeHabits.length,
        );

  /* =====================================================
     PERSONAL WEEKLY DATA
     ===================================================== */

  const weeklyData = useMemo(() => {
    const result = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();

      date.setDate(date.getDate() - i);

      const iso = date.toISOString().slice(0, 10);

      const count = activities.filter(
        (activity) => activity.date === iso,
      ).length;

      result.push({
        date: iso,
        count,
      });
    }

    return result;
  }, [activities]);

  const maxWeeklyCount = Math.max(...weeklyData.map((item) => item.count), 1);

  /* =====================================================
     CRUD — OPEN CREATE
     ===================================================== */

  function openCreateModal() {
    setEditingActivity(null);

    setForm({
      date: new Date().toISOString().slice(0, 10),
      category: "Makanan",
      activity: "",
      impact: "",
      note: "",
      evidence: null,
    });

    setModal("form");
  }

  /* =====================================================
     CRUD — OPEN EDIT
     ===================================================== */

  function openEditModal(activity) {
    setEditingActivity(activity);

    setForm({
      date: activity.date,
      category: activity.category,
      activity: activity.activity,
      impact: activity.impact,
      note: activity.note || "",
      evidence: activity.evidence || null,
    });

    setModal("form");
  }

  /* =====================================================
     CRUD — SAVE
     ===================================================== */

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.activity.trim()) {
      return;
    }

    if (editingActivity) {
      setActivities((current) =>
        current.map((item) =>
          item.id === editingActivity.id
            ? {
                ...item,
                date: form.date,
                category: form.category,
                activity: form.activity.trim(),
                impact: Number(form.impact) || 0,
                note: form.note.trim(),
                evidence: form.evidence,
              }
            : item,
        ),
      );
    } else {
      const newActivity = {
        id: Date.now(),
        date: form.date,
        category: form.category,
        activity: form.activity.trim(),
        impact: Number(form.impact) || 0,
        note: form.note.trim(),
        evidence: form.evidence,
        status: "Menunggu",
      };

      setActivities((current) => [newActivity, ...current]);
    }

    setModal(null);
    setEditingActivity(null);
  }

  /* =====================================================
     CRUD — DELETE
     ===================================================== */

  function deleteActivity(id) {
    const confirmed = window.confirm(
      "Hapus aktivitas ini dari riwayat dashboard?",
    );

    if (!confirmed) return;

    setActivities((current) =>
      current.filter((activity) => activity.id !== id),
    );

    setModal(null);
    setSelectedActivity(null);
  }

  /* =====================================================
     FILE UPLOAD
     ===================================================== */

  function handleEvidenceUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Bukti aktivitas harus berupa gambar.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((current) => ({
        ...current,
        evidence: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  /* =====================================================
     DETAIL
     ===================================================== */

  function openDetail(activity) {
    setSelectedActivity(activity);
    setModal("detail");
  }

  /* =====================================================
     NAVIGATION
     ===================================================== */

  function goToAwareness() {
    navigate("/awareness");
  }

  function goToTracker() {
    navigate("/tracker");
  }

  function goToBehavior() {
    navigate("/behavior");
  }

  /* =====================================================
     FEEDBACK ENGINE
     ===================================================== */

  const feedback = useMemo(() => {
    const result = [];

    if (awarenessProgress < 100) {
      result.push({
        type: "Awareness",
        title: "Selesaikan materi yang belum dibaca",
        text: `Kamu sudah menyelesaikan ${awarenessCompleted} dari ${awarenessTotal} area pembelajaran. Lanjutkan satu area lagi untuk memperkuat dasar pengambilan keputusan konsumsi.`,
      });
    }

    if (validatedActivities.length === 0) {
      result.push({
        type: "Feedback",
        title: "Mulai catat aktivitas konsumsi",
        text: "Catatan aktivitas akan menjadi dasar untuk melihat pola konsumsi dan memberikan feedback yang lebih personal.",
      });
    } else if (validatedActivities.length < 3) {
      result.push({
        type: "Feedback",
        title: "Tambahkan beberapa aktivitas lagi",
        text: "Semakin konsisten aktivitas dicatat, semakin mudah melihat pola dan menentukan tindakan yang realistis.",
      });
    }

    const lowestHabit = [...activeHabits].sort(
      (a, b) => a.progress - b.progress,
    )[0];

    if (lowestHabit) {
      result.push({
        type: "Behavior",
        title: `Fokus pada "${lowestHabit.name}"`,
        text: `Progress kebiasaan ini berada di ${lowestHabit.progress}%. Coba jadikan satu tindakan kecil sebagai target berikutnya.`,
      });
    }

    return result.slice(0, 3);
  }, [
    awarenessProgress,
    awarenessCompleted,
    awarenessTotal,
    validatedActivities.length,
    activeHabits,
  ]);

  /* =====================================================
     RENDER
     ===================================================== */

  return (
    <main className="dashboard-page">
      <div className="dashboard-shell">
        {/* =================================================
            TOPLINE
        ================================================= */}

        <div className="dashboard-topline">
          <div className="dashboard-brandline">
            <div className="dashboard-brand-mark">E</div>

            <div>
              <span className="dashboard-brand-text">ECODAS</span>
              <span className="dashboard-brand-sub">
                Student Sustainability
              </span>
            </div>
          </div>

          <div className="dashboard-profile-mini">
            <img
              src={profileAvatar}
              alt="Profile"
              className="dashboard-profile-mini-avatar"
            />

            <div className="dashboard-profile-mini-name-wrap">
              <div className="dashboard-profile-name">Nanik Wijayanti</div>

              <div className="dashboard-profile-role">
                Mahasiswa · Teknik Industri
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="dashboard-welcome">
          <div className="dashboard-eyebrow">
            <span className="dashboard-eyebrow-line" />
            Dashboard mahasiswa
          </div>

          <h1 className="dashboard-title">Selamat datang kembali, Nanik.</h1>

          <p className="dashboard-description">
            Lihat perkembangan pemahaman, aktivitas konsumsi, dan kebiasaan
            berkelanjutanmu dalam satu tempat.
          </p>
        </section>

        {/* =================================================
            JOURNEY
        ================================================= */}

        <section className="dashboard-journey">
          <div className="dashboard-journey-head">
            <div>
              <div className="dashboard-section-kicker">
                Sustainability journey
              </div>

              <h2 className="dashboard-journey-title">
                Perjalanan konsumsi bijakmu
              </h2>
            </div>

            <div className="dashboard-journey-progress">
              <strong>
                {Math.round(
                  (awarenessProgress +
                    (validatedActivities.length > 0 ? 100 : 0) +
                    averageHabitProgress) /
                    3,
                )}
                %
              </strong>

              <span>perkembangan keseluruhan</span>
            </div>
          </div>

          <div className="dashboard-steps">
            {/* L1 */}

            <div
              className={`dashboard-step ${
                awarenessProgress > 0 ? "done" : ""
              }`}
            >
              <div className="dashboard-step-marker">
                {awarenessProgress === 100 ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  "01"
                )}
              </div>

              <div className="dashboard-step-label">Awareness</div>

              <div className="dashboard-step-status">
                {awarenessCompleted}/{awarenessTotal} area dipelajari
              </div>
            </div>

            {/* L2 */}

            <div
              className={`dashboard-step ${
                activities.length > 0 ? "done" : ""
              }`}
            >
              <div className="dashboard-step-marker">
                {validatedActivities.length > 0 ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  "02"
                )}
              </div>

              <div className="dashboard-step-label">Feedback Mechanism</div>

              <div className="dashboard-step-status">
                {activities.length} aktivitas tercatat
              </div>
            </div>

            {/* L3 */}

            <div
              className={`dashboard-step ${
                activeHabits.length > 0 ? "done" : ""
              }`}
            >
              <div className="dashboard-step-marker">
                {averageHabitProgress >= 70 ? (
                  <Check size={14} strokeWidth={3} />
                ) : (
                  "03"
                )}
              </div>

              <div className="dashboard-step-label">Behavior Change</div>

              <div className="dashboard-step-status">
                {activeHabits.length} kebiasaan sedang dibangun
              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="dashboard-grid">
          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="dashboard-column">
            {/* STATUS */}

            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <h2 className="dashboard-panel-title">
                    Ringkasan perkembangan
                  </h2>

                  <div className="dashboard-panel-subtitle">
                    Gambaran singkat dari tiga layer utama
                  </div>
                </div>
              </div>

              <div className="dashboard-panel-body">
                <div className="dashboard-status-grid">
                  <div className="dashboard-status">
                    <div className="dashboard-status-top">
                      <div className="dashboard-status-icon">
                        <BookOpen size={15} />
                      </div>

                      <span className="dashboard-status-label">Awareness</span>
                    </div>

                    <div className="dashboard-status-value">
                      {awarenessCompleted}/{awarenessTotal}
                    </div>

                    <div className="dashboard-status-description">
                      area pembelajaran selesai
                    </div>
                  </div>

                  <div className="dashboard-status">
                    <div className="dashboard-status-top">
                      <div className="dashboard-status-icon">
                        <Activity size={15} />
                      </div>

                      <span className="dashboard-status-label">Feedback</span>
                    </div>

                    <div className="dashboard-status-value">
                      {activities.length}
                    </div>

                    <div className="dashboard-status-description">
                      aktivitas telah dicatat
                    </div>
                  </div>

                  <div className="dashboard-status">
                    <div className="dashboard-status-top">
                      <div className="dashboard-status-icon">
                        <TrendingDown size={15} />
                      </div>

                      <span className="dashboard-status-label">Behavior</span>
                    </div>

                    <div className="dashboard-status-value">
                      {averageHabitProgress}%
                    </div>

                    <div className="dashboard-status-description">
                      rata-rata progress kebiasaan
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RECENT ACTIVITY */}

            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <h2 className="dashboard-panel-title">Aktivitas terbaru</h2>

                  <div className="dashboard-panel-subtitle">
                    Catatan dari Feedback Mechanism
                  </div>
                </div>

                <button
                  className="dashboard-add-button"
                  onClick={openCreateModal}
                >
                  <Plus size={13} />
                  Catat aktivitas
                </button>
              </div>

              <div className="dashboard-panel-body">
                <div className="dashboard-toolbar">
                  <div className="dashboard-filter-group">
                    {PERIODS.map((item) => (
                      <button
                        key={item.value}
                        className={`dashboard-filter-button ${
                          period === item.value ? "active" : ""
                        }`}
                        onClick={() => setPeriod(item.value)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="dashboard-filter-group">
                    {CATEGORIES.slice(0, 5).map((item) => (
                      <button
                        key={item}
                        className={`dashboard-filter-button ${
                          category === item ? "active" : ""
                        }`}
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredActivities.length === 0 ? (
                  <div className="dashboard-empty">
                    <div className="dashboard-empty-icon">
                      <Activity size={16} />
                    </div>

                    <div className="dashboard-empty-title">
                      Belum ada aktivitas
                    </div>

                    <div className="dashboard-empty-text">
                      Catat aktivitas konsumsi untuk mulai melihat pola
                      personalmu.
                    </div>
                  </div>
                ) : (
                  <div className="dashboard-activity-list">
                    {filteredActivities.slice(0, 5).map((activity) => {
                      const Icon = getCategoryIcon(activity.category);

                      return (
                        <div
                          key={activity.id}
                          className="dashboard-activity-item"
                          onClick={() => openDetail(activity)}
                        >
                          <div className="dashboard-activity-marker">
                            <Icon size={15} />
                          </div>

                          <div className="dashboard-activity-content">
                            <div className="dashboard-activity-name">
                              {activity.activity}
                            </div>

                            <div className="dashboard-activity-meta">
                              <span>{formatDate(activity.date)}</span>

                              <span>·</span>

                              <span>{activity.category}</span>
                            </div>

                            <span
                              className={`dashboard-status-pill ${
                                activity.status === "Tervalidasi"
                                  ? "valid"
                                  : "pending"
                              }`}
                            >
                              {activity.status}
                            </span>
                          </div>

                          <div className="dashboard-activity-impact">
                            −{activity.impact || 0} kg
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {filteredActivities.length > 5 && (
                  <div style={{ marginTop: 12, textAlign: "right" }}>
                    <button
                      className="dashboard-link-button"
                      onClick={goToTracker}
                    >
                      Lihat semua aktivitas
                      <ChevronRight
                        size={11}
                        style={{
                          verticalAlign: "middle",
                          marginLeft: 3,
                        }}
                      />
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* WEEKLY */}

            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <h2 className="dashboard-panel-title">
                    Aktivitas 7 hari terakhir
                  </h2>

                  <div className="dashboard-panel-subtitle">
                    Frekuensi tindakan yang kamu catat
                  </div>
                </div>

                <Clock3 size={15} color="#758279" />
              </div>

              <div className="dashboard-panel-body">
                <div className="dashboard-week">
                  {weeklyData.map((day) => {
                    const height =
                      day.count === 0
                        ? 4
                        : Math.max(12, (day.count / maxWeeklyCount) * 100);

                    return (
                      <div className="dashboard-day" key={day.date}>
                        <div className="dashboard-day-value">{day.count}</div>

                        <div className="dashboard-day-bar-wrap">
                          <div
                            className="dashboard-day-bar"
                            style={{
                              height: `${height}%`,
                            }}
                            title={`${day.count} aktivitas`}
                          />
                        </div>

                        <div className="dashboard-day-label">
                          {getDayName(day.date)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================= */}

          <div className="dashboard-column">
            {/* HABITS */}

            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <h2 className="dashboard-panel-title">
                    Kebiasaan yang sedang dibangun
                  </h2>

                  <div className="dashboard-panel-subtitle">
                    Terhubung dengan Behavior Change
                  </div>
                </div>

                <button
                  className="dashboard-link-button"
                  onClick={goToBehavior}
                >
                  Kelola
                  <ChevronRight
                    size={11}
                    style={{
                      verticalAlign: "middle",
                      marginLeft: 2,
                    }}
                  />
                </button>
              </div>

              <div className="dashboard-panel-body">
                {activeHabits.length === 0 ? (
                  <div className="dashboard-empty">
                    <div className="dashboard-empty-icon">
                      <TrendingDown size={16} />
                    </div>

                    <div className="dashboard-empty-title">
                      Belum ada kebiasaan aktif
                    </div>

                    <div className="dashboard-empty-text">
                      Pilih kebiasaan dari Layer 3 untuk mulai membangun
                      perubahan.
                    </div>
                  </div>
                ) : (
                  activeHabits.map((habit) => (
                    <div className="dashboard-habit" key={habit.id}>
                      <div className="dashboard-habit-head">
                        <div>
                          <div className="dashboard-habit-name">
                            {habit.name}
                          </div>

                          <div className="dashboard-habit-category">
                            {habit.category}
                          </div>
                        </div>

                        <div className="dashboard-habit-progress-number">
                          {habit.progress}%
                        </div>
                      </div>

                      <div className="dashboard-progress-track">
                        <div
                          className="dashboard-progress-fill"
                          style={{
                            width: `${Math.min(100, habit.progress)}%`,
                          }}
                        />
                      </div>

                      <div className="dashboard-habit-foot">
                        <span>{habit.current}</span>

                        <span>target {habit.target}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* FEEDBACK */}

            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <h2 className="dashboard-panel-title">Feedback untukmu</h2>

                  <div className="dashboard-panel-subtitle">
                    Rekomendasi berdasarkan perkembangan personal
                  </div>
                </div>

                <CircleAlert size={15} color="#758279" />
              </div>

              <div className="dashboard-panel-body">
                {feedback.length === 0 ? (
                  <div className="dashboard-feedback">
                    <div className="dashboard-feedback-label">Progress</div>

                    <div className="dashboard-feedback-title">
                      Perkembanganmu berjalan baik
                    </div>

                    <p className="dashboard-feedback-text">
                      Pertahankan pencatatan aktivitas dan kebiasaan secara
                      konsisten untuk mendapatkan feedback yang lebih relevan.
                    </p>
                  </div>
                ) : (
                  feedback.map((item, index) => (
                    <div className="dashboard-feedback" key={index}>
                      <div className="dashboard-feedback-label">
                        {item.type}
                      </div>

                      <div className="dashboard-feedback-title">
                        {item.title}
                      </div>

                      <p className="dashboard-feedback-text">{item.text}</p>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* QUICK ACCESS */}

            <section className="dashboard-panel">
              <div className="dashboard-panel-header">
                <div>
                  <h2 className="dashboard-panel-title">
                    Lanjutkan perjalanan
                  </h2>

                  <div className="dashboard-panel-subtitle">
                    Akses langsung ke layer ECODAS
                  </div>
                </div>
              </div>

              <div className="dashboard-panel-body">
                <button className="dashboard-quick-row" onClick={goToAwareness}>
                  <div className="dashboard-activity-marker">
                    <BookOpen size={15} />
                  </div>

                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div className="dashboard-activity-name">Awareness</div>

                    <div className="dashboard-activity-meta">
                      Pelajari isu dan alternatif konsumsi
                    </div>
                  </div>

                  <ChevronRight size={14} />
                </button>

                <button className="dashboard-quick-row" onClick={goToTracker}>
                  <div className="dashboard-activity-marker">
                    <Activity size={15} />
                  </div>

                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div className="dashboard-activity-name">
                      Feedback Mechanism
                    </div>

                    <div className="dashboard-activity-meta">
                      Catat dan evaluasi aktivitasmu
                    </div>
                  </div>

                  <ChevronRight size={14} />
                </button>

                <button className="dashboard-quick-row" onClick={goToBehavior}>
                  <div className="dashboard-activity-marker">
                    <TrendingDown size={15} />
                  </div>

                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div className="dashboard-activity-name">
                      Behavior Change
                    </div>

                    <div className="dashboard-activity-meta">
                      Bangun kebiasaan konsumsi berkelanjutan
                    </div>
                  </div>

                  <ChevronRight size={14} />
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* =====================================================
          MODAL — CREATE / EDIT
      ===================================================== */}

      {modal === "form" && (
        <div
          className="dashboard-modal-overlay"
          onMouseDown={() => setModal(null)}
        >
          <div
            className="dashboard-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="dashboard-modal-header">
              <div>
                <h2 className="dashboard-modal-title">
                  {editingActivity ? "Edit aktivitas" : "Catat aktivitas"}
                </h2>
              </div>

              <button
                className="dashboard-close-button"
                onClick={() => setModal(null)}
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="dashboard-modal-body">
                <div className="dashboard-form-grid">
                  <div className="dashboard-form-group">
                    <label className="dashboard-form-label">Tanggal</label>

                    <input
                      type="date"
                      className="dashboard-input"
                      value={form.date}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          date: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="dashboard-form-group">
                    <label className="dashboard-form-label">Kategori</label>

                    <select
                      className="dashboard-select"
                      value={form.category}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          category: event.target.value,
                        })
                      }
                    >
                      {CATEGORIES.filter((item) => item !== "Semua").map(
                        (item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  <div className="dashboard-form-group full">
                    <label className="dashboard-form-label">Aktivitas</label>

                    <input
                      type="text"
                      className="dashboard-input"
                      placeholder="Contoh: Membawa tumbler ke kampus"
                      value={form.activity}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          activity: event.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="dashboard-form-group">
                    <label className="dashboard-form-label">
                      Estimasi dampak
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      className="dashboard-input"
                      placeholder="Contoh: 0.2"
                      value={form.impact}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          impact: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="dashboard-form-group">
                    <label className="dashboard-form-label">Satuan</label>

                    <input
                      className="dashboard-input"
                      value="kg CO₂ (estimasi)"
                      disabled
                    />
                  </div>

                  <div className="dashboard-form-group full">
                    <label className="dashboard-form-label">Catatan</label>

                    <textarea
                      className="dashboard-textarea"
                      placeholder="Tambahkan konteks aktivitas..."
                      value={form.note}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          note: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="dashboard-form-group full">
                    <label className="dashboard-form-label">
                      Bukti aktivitas
                    </label>

                    <label className="dashboard-file">
                      <Upload
                        size={15}
                        style={{
                          verticalAlign: "middle",
                          marginRight: 6,
                        }}
                      />

                      {form.evidence
                        ? "Ganti bukti"
                        : "Upload foto bukti aktivitas"}

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleEvidenceUpload}
                      />

                      {form.evidence && (
                        <img
                          src={form.evidence}
                          alt="Preview bukti"
                          className="dashboard-evidence-preview"
                        />
                      )}
                    </label>
                  </div>
                </div>
              </div>

              <div className="dashboard-modal-footer">
                <button
                  type="button"
                  className="dashboard-button-secondary"
                  onClick={() => setModal(null)}
                >
                  Batal
                </button>

                <button type="submit" className="dashboard-button-primary">
                  {editingActivity ? "Simpan perubahan" : "Simpan aktivitas"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          MODAL — DETAIL
      ===================================================== */}

      {modal === "detail" && selectedActivity && (
        <div
          className="dashboard-modal-overlay"
          onMouseDown={() => setModal(null)}
        >
          <div
            className="dashboard-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="dashboard-modal-header">
              <div>
                <h2 className="dashboard-modal-title">Detail aktivitas</h2>
              </div>

              <button
                className="dashboard-close-button"
                onClick={() => setModal(null)}
              >
                <X size={15} />
              </button>
            </div>

            <div className="dashboard-modal-body">
              <div className="dashboard-detail">
                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Aktivitas</span>

                  <span className="dashboard-detail-value">
                    {selectedActivity.activity}
                  </span>
                </div>

                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Tanggal</span>

                  <span className="dashboard-detail-value">
                    {formatDate(selectedActivity.date)}
                  </span>
                </div>

                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Kategori</span>

                  <span className="dashboard-detail-value">
                    {selectedActivity.category}
                  </span>
                </div>

                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">
                    Estimasi dampak
                  </span>

                  <span className="dashboard-detail-value">
                    −{selectedActivity.impact || 0} kg CO₂
                  </span>
                </div>

                <div className="dashboard-detail-row">
                  <span className="dashboard-detail-label">Status</span>

                  <span className="dashboard-detail-value">
                    {selectedActivity.status}
                  </span>
                </div>

                {selectedActivity.note && (
                  <div className="dashboard-detail-row">
                    <span className="dashboard-detail-label">Catatan</span>

                    <span className="dashboard-detail-value">
                      {selectedActivity.note}
                    </span>
                  </div>
                )}

                {selectedActivity.evidence && (
                  <div>
                    <div
                      className="dashboard-detail-label"
                      style={{ marginBottom: 8 }}
                    >
                      Bukti aktivitas
                    </div>

                    <img
                      src={selectedActivity.evidence}
                      alt="Bukti aktivitas"
                      className="dashboard-detail-evidence"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="dashboard-modal-footer">
              <button
                className="dashboard-button-danger"
                onClick={() => deleteActivity(selectedActivity.id)}
              >
                <Trash2
                  size={12}
                  style={{
                    verticalAlign: "middle",
                    marginRight: 4,
                  }}
                />
                Hapus
              </button>

              <button
                className="dashboard-button-secondary"
                onClick={() => openEditModal(selectedActivity)}
              >
                <Edit3
                  size={12}
                  style={{
                    verticalAlign: "middle",
                    marginRight: 4,
                  }}
                />
                Edit
              </button>

              <button
                className="dashboard-button-primary"
                onClick={() => setModal(null)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
