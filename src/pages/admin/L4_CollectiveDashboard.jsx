import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Eye,
  X,
  ChevronDown,
  ChevronUp,
  Trophy,
  Users,
  Building2,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Filter,
  RotateCcw,
  BarChart3,
  Leaf,
  Target,
  Award,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import "./L4_CollectiveDashboard.css";

/* =========================================================
   STORAGE
   ========================================================= */

const STORAGE_KEY = "ecodas_l4_collective_data";

/* =========================================================
   FACULTY DATA
   ========================================================= */

const DEFAULT_FACULTIES = [
  {
    id: 1,
    code: "FT",
    name: "Fakultas Teknik",
    shortName: "FT",
    students: 286,
    activities: 1284,
    awareness: 86,
    behaviorChange: 78,
    carbonImpact: 82,
    sustainabilityScore: 86.4,
    trend: 14.2,
    dominantActivity: "Transportasi umum",
    rankChange: 2,
    logo: "/assets/faculties/ft.png",
  },
  {
    id: 2,
    code: "FE",
    name: "Fakultas Ekonomi",
    shortName: "FE",
    students: 241,
    activities: 1106,
    awareness: 83,
    behaviorChange: 74,
    carbonImpact: 79,
    sustainabilityScore: 82.7,
    trend: 11.8,
    dominantActivity: "Membawa bekal",
    rankChange: 0,
    logo: "/assets/faculties/fe.png",
  },
  {
    id: 3,
    code: "FBS",
    name: "Fakultas Bahasa, Seni, dan Budaya",
    shortName: "FBS",
    students: 218,
    activities: 984,
    awareness: 81,
    behaviorChange: 72,
    carbonImpact: 76,
    sustainabilityScore: 79.5,
    trend: 9.7,
    dominantActivity: "Mengurangi plastik",
    rankChange: 1,
    logo: "/assets/faculties/fbs.png",
  },
  {
    id: 4,
    code: "FMIPA",
    name: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    shortName: "FMIPA",
    students: 204,
    activities: 912,
    awareness: 79,
    behaviorChange: 69,
    carbonImpact: 74,
    sustainabilityScore: 77.8,
    trend: 8.9,
    dominantActivity: "Penghematan energi",
    rankChange: -1,
    logo: "/assets/faculties/fmipa.png",
  },
  {
    id: 5,
    code: "FISIP",
    name: "Fakultas Ilmu Sosial, Hukum, dan Politik",
    shortName: "FISIP",
    students: 187,
    activities: 845,
    awareness: 77,
    behaviorChange: 67,
    carbonImpact: 71,
    sustainabilityScore: 75.9,
    trend: 7.5,
    dominantActivity: "Transportasi umum",
    rankChange: 0,
    logo: "/assets/faculties/fisip.png",
  },
  {
    id: 6,
    code: "FIK",
    name: "Fakultas Ilmu Keolahragaan dan Kesehatan",
    shortName: "FIKK",
    students: 148,
    activities: 694,
    awareness: 75,
    behaviorChange: 65,
    carbonImpact: 69,
    sustainabilityScore: 73.8,
    trend: 6.4,
    dominantActivity: "Aktivitas berjalan",
    rankChange: 0,
    logo: "/assets/faculties/fik.png",
  },
];

/* =========================================================
   STUDENT DATA
   ========================================================= */

const DEFAULT_STUDENTS = [
  {
    id: 1,
    name: "Nanik Wijayanti",
    nim: "23051430009",
    faculty: "Fakultas Teknik",
    facultyCode: "FT",
    awareness: 100,
    activities: 24,
    behaviorChange: 21,
    sustainabilityScore: 92.4,
    carbonImpact: 88,
    consistency: 94,
    dominantActivity: "Membawa bekal",
    status: "Aktif",
  },
  {
    id: 2,
    name: "Alya Putri Ramadhani",
    nim: "23021430118",
    faculty: "Fakultas Ekonomi",
    facultyCode: "FE",
    awareness: 100,
    activities: 21,
    behaviorChange: 19,
    sustainabilityScore: 89.7,
    carbonImpact: 86,
    consistency: 91,
    dominantActivity: "Mengurangi plastik",
    status: "Aktif",
  },
  {
    id: 3,
    name: "Dimas Pratama",
    nim: "23051430124",
    faculty: "Fakultas Teknik",
    facultyCode: "FT",
    awareness: 100,
    activities: 20,
    behaviorChange: 18,
    sustainabilityScore: 87.8,
    carbonImpact: 83,
    consistency: 89,
    dominantActivity: "Transportasi umum",
    status: "Aktif",
  },
  {
    id: 4,
    name: "Salsa Maharani",
    nim: "23031430201",
    faculty: "Fakultas Bahasa, Seni, dan Budaya",
    facultyCode: "FBS",
    awareness: 75,
    activities: 18,
    behaviorChange: 17,
    sustainabilityScore: 85.6,
    carbonImpact: 81,
    consistency: 88,
    dominantActivity: "Membawa tumbler",
    status: "Aktif",
  },
  {
    id: 5,
    name: "Raka Aditya",
    nim: "23021430087",
    faculty: "Fakultas Ekonomi",
    facultyCode: "FE",
    awareness: 100,
    activities: 17,
    behaviorChange: 15,
    sustainabilityScore: 83.9,
    carbonImpact: 79,
    consistency: 86,
    dominantActivity: "Penghematan energi",
    status: "Aktif",
  },
  {
    id: 6,
    name: "Intan Permata",
    nim: "23011430042",
    faculty: "Fakultas Matematika dan Ilmu Pengetahuan Alam",
    facultyCode: "FMIPA",
    awareness: 75,
    activities: 16,
    behaviorChange: 14,
    sustainabilityScore: 82.5,
    carbonImpact: 77,
    consistency: 84,
    dominantActivity: "Paperless",
    status: "Aktif",
  },
  {
    id: 7,
    name: "Bagas Nugroho",
    nim: "23041430112",
    faculty: "Fakultas Ilmu Sosial, Hukum, dan Politik",
    facultyCode: "FISIP",
    awareness: 75,
    activities: 15,
    behaviorChange: 13,
    sustainabilityScore: 80.8,
    carbonImpact: 74,
    consistency: 82,
    dominantActivity: "Transportasi umum",
    status: "Aktif",
  },
  {
    id: 8,
    name: "Citra Ayuningtyas",
    nim: "23061430077",
    faculty: "Fakultas Ilmu Keolahragaan dan Kesehatan",
    facultyCode: "FIKK",
    awareness: 100,
    activities: 14,
    behaviorChange: 12,
    sustainabilityScore: 79.6,
    carbonImpact: 72,
    consistency: 80,
    dominantActivity: "Aktivitas berjalan",
    status: "Aktif",
  },
];

/* =========================================================
   HIGH IMPACT ACTIVITIES
   ========================================================= */

const HIGH_IMPACT_ACTIVITIES = [
  {
    id: 1,
    name: "Menggunakan transportasi umum",
    category: "Transportasi",
    records: 1248,
    impact: "Tinggi",
    change: 18.4,
  },
  {
    id: 2,
    name: "Membawa bekal",
    category: "Makanan",
    records: 986,
    impact: "Tinggi",
    change: 15.7,
  },
  {
    id: 3,
    name: "Mengurangi plastik sekali pakai",
    category: "Plastik",
    records: 742,
    impact: "Sedang",
    change: 12.1,
  },
  {
    id: 4,
    name: "Menghemat penggunaan energi",
    category: "Energi",
    records: 618,
    impact: "Sedang",
    change: 9.8,
  },
];

/* =========================================================
   PERIODS
   ========================================================= */

const PERIODS = [
  {
    value: "7",
    label: "7 hari",
  },
  {
    value: "30",
    label: "30 hari",
  },
  {
    value: "all",
    label: "Semua data",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

function loadData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);

    if (!saved) {
      return fallback;
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function getRankChangeIcon(value) {
  if (value > 0) {
    return <ArrowUpRight size={14} />;
  }

  if (value < 0) {
    return <ArrowDownRight size={14} />;
  }

  return <Minus size={13} />;
}

function getRankChangeClass(value) {
  if (value > 0) return "l4-rank-up";
  if (value < 0) return "l4-rank-down";
  return "l4-rank-neutral";
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function L4_CollectiveDashboard() {
  /* =====================================
     DATA
     ===================================== */

  const [faculties, setFaculties] = useState(() =>
    loadData(`${STORAGE_KEY}_faculties`, DEFAULT_FACULTIES),
  );

  const [students, setStudents] = useState(() =>
    loadData(`${STORAGE_KEY}_students`, DEFAULT_STUDENTS),
  );

  /* =====================================
     UI STATE
     ===================================== */

  const [activeTab, setActiveTab] = useState("faculty");

  const [search, setSearch] = useState("");

  const [facultyFilter, setFacultyFilter] = useState("all");

  const [period, setPeriod] = useState("all");

  const [sortBy, setSortBy] = useState("score");

  const [sortDirection, setSortDirection] = useState("desc");

  const [selectedItem, setSelectedItem] = useState(null);

  const [selectedType, setSelectedType] = useState(null);

  const [modalMode, setModalMode] = useState(null);

  const [editingItem, setEditingItem] = useState(null);

  const [showFilters, setShowFilters] = useState(false);

  /* =====================================
     FORM
     ===================================== */

  const emptyFaculty = {
    name: "",
    shortName: "",
    students: "",
    activities: "",
    awareness: 0,
    behaviorChange: 0,
    carbonImpact: 0,
    sustainabilityScore: 0,
    trend: 0,
    dominantActivity: "",
    rankChange: 0,
    logo: "",
  };

  const emptyStudent = {
    name: "",
    nim: "",
    faculty: "",
    facultyCode: "",
    awareness: 0,
    activities: 0,
    behaviorChange: 0,
    sustainabilityScore: 0,
    carbonImpact: 0,
    consistency: 0,
    dominantActivity: "",
    status: "Aktif",
  };

  const [formData, setFormData] = useState(emptyFaculty);

  /* =====================================
     SAVE DATA
     ===================================== */

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_faculties`, JSON.stringify(faculties));
  }, [faculties]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_students`, JSON.stringify(students));
  }, [students]);

  /* =====================================
     FILTER FACULTY
     ===================================== */

  const filteredFaculties = useMemo(() => {
    let result = [...faculties];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.shortName.toLowerCase().includes(keyword),
      );
    }

    result.sort((a, b) => {
      let aValue;
      let bValue;

      if (sortBy === "score") {
        aValue = a.sustainabilityScore;
        bValue = b.sustainabilityScore;
      }

      if (sortBy === "activities") {
        aValue = a.activities;
        bValue = b.activities;
      }

      if (sortBy === "students") {
        aValue = a.students;
        bValue = b.students;
      }

      if (sortBy === "behavior") {
        aValue = a.behaviorChange;
        bValue = b.behaviorChange;
      }

      if (sortDirection === "asc") {
        return aValue - bValue;
      }

      return bValue - aValue;
    });

    return result;
  }, [faculties, search, sortBy, sortDirection]);

  /* =====================================
     FILTER STUDENTS
     ===================================== */

  const filteredStudents = useMemo(() => {
    let result = [...students];

    if (facultyFilter !== "all") {
      result = result.filter((item) => item.facultyCode === facultyFilter);
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(keyword) ||
          item.nim.toLowerCase().includes(keyword) ||
          item.faculty.toLowerCase().includes(keyword),
      );
    }

    result.sort((a, b) => {
      let aValue;
      let bValue;

      if (sortBy === "score") {
        aValue = a.sustainabilityScore;
        bValue = b.sustainabilityScore;
      }

      if (sortBy === "activities") {
        aValue = a.activities;
        bValue = b.activities;
      }

      if (sortBy === "behavior") {
        aValue = a.behaviorChange;
        bValue = b.behaviorChange;
      }

      if (sortBy === "consistency") {
        aValue = a.consistency;
        bValue = b.consistency;
      }

      if (sortDirection === "asc") {
        return aValue - bValue;
      }

      return bValue - aValue;
    });

    return result;
  }, [students, facultyFilter, search, sortBy, sortDirection]);

  /* =====================================
     KPI
     ===================================== */

  const totalStudents = faculties.reduce(
    (sum, item) => sum + Number(item.students || 0),
    0,
  );

  const totalActivities = faculties.reduce(
    (sum, item) => sum + Number(item.activities || 0),
    0,
  );

  const averageScore =
    faculties.length > 0
      ? (
          faculties.reduce(
            (sum, item) => sum + Number(item.sustainabilityScore || 0),
            0,
          ) / faculties.length
        ).toFixed(1)
      : "0.0";

  const averageBehavior =
    faculties.length > 0
      ? (
          faculties.reduce(
            (sum, item) => sum + Number(item.behaviorChange || 0),
            0,
          ) / faculties.length
        ).toFixed(1)
      : "0.0";

  /* =====================================
     MODAL
     ===================================== */

  const openDetail = (item, type) => {
    setSelectedItem(item);
    setSelectedType(type);
    setModalMode("detail");
  };

  const openCreate = () => {
    setEditingItem(null);

    setFormData(
      activeTab === "faculty" ? { ...emptyFaculty } : { ...emptyStudent },
    );

    setModalMode("form");
  };

  const openEdit = (item, type) => {
    setEditingItem(item);

    setFormData({
      ...item,
    });

    setSelectedType(type);

    setModalMode("form");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedItem(null);
    setSelectedType(null);
    setEditingItem(null);
  };

  /* =====================================
     FORM CHANGE
     ===================================== */

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================
     CREATE / UPDATE
     ===================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFaculty = activeTab === "faculty";

    if (isFaculty) {
      const prepared = {
        ...formData,

        students: Number(formData.students) || 0,
        activities: Number(formData.activities) || 0,
        awareness: Number(formData.awareness) || 0,
        behaviorChange: Number(formData.behaviorChange) || 0,
        carbonImpact: Number(formData.carbonImpact) || 0,
        sustainabilityScore: Number(formData.sustainabilityScore) || 0,
        trend: Number(formData.trend) || 0,
        rankChange: Number(formData.rankChange) || 0,
      };

      if (editingItem) {
        setFaculties((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...prepared,
                  id: editingItem.id,
                }
              : item,
          ),
        );
      } else {
        setFaculties((prev) => [
          ...prev,
          {
            ...prepared,
            id: Date.now(),
            code: prepared.shortName || `F${prev.length + 1}`,
            logo: prepared.logo || "",
          },
        ]);
      }
    } else {
      const prepared = {
        ...formData,

        awareness: Number(formData.awareness) || 0,

        activities: Number(formData.activities) || 0,

        behaviorChange: Number(formData.behaviorChange) || 0,

        sustainabilityScore: Number(formData.sustainabilityScore) || 0,

        carbonImpact: Number(formData.carbonImpact) || 0,

        consistency: Number(formData.consistency) || 0,
      };

      if (editingItem) {
        setStudents((prev) =>
          prev.map((item) =>
            item.id === editingItem.id
              ? {
                  ...prepared,
                  id: editingItem.id,
                }
              : item,
          ),
        );
      } else {
        setStudents((prev) => [
          ...prev,
          {
            ...prepared,
            id: Date.now(),
          },
        ]);
      }
    }

    closeModal();
  };

  /* =====================================
     DELETE
     ===================================== */

  const handleDelete = (item, type) => {
    const confirmed = window.confirm(
      `Hapus ${
        type === "faculty" ? item.name : item.name
      } dari data Collective Intelligence?`,
    );

    if (!confirmed) return;

    if (type === "faculty") {
      setFaculties((prev) => prev.filter((data) => data.id !== item.id));
    } else {
      setStudents((prev) => prev.filter((data) => data.id !== item.id));
    }

    closeModal();
  };

  /* =====================================
     RESET PROTOTYPE
     ===================================== */

  const resetData = () => {
    const confirmed = window.confirm(
      "Reset seluruh data Layer 4 ke data prototype awal?",
    );

    if (!confirmed) return;

    setFaculties(DEFAULT_FACULTIES);
    setStudents(DEFAULT_STUDENTS);

    localStorage.setItem(
      `${STORAGE_KEY}_faculties`,
      JSON.stringify(DEFAULT_FACULTIES),
    );

    localStorage.setItem(
      `${STORAGE_KEY}_students`,
      JSON.stringify(DEFAULT_STUDENTS),
    );
  };

  /* =====================================
     SORT
     ===================================== */

  const handleSort = (value) => {
    if (sortBy === value) {
      setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortBy(value);
      setSortDirection("desc");
    }
  };

  /* =====================================
     RENDER
     ===================================== */

  return (
    <div className="l4-page">
      {/* ===================================
          HEADER
          =================================== */}

      <section className="l4-header">
        <div className="l4-header-copy">
          <div className="l4-eyebrow"></div>

          <h1>Campus Sustainability Observatory</h1>

          <p>
            Mengagregasikan pola konsumsi dan perubahan perilaku mahasiswa dari
            Layer 1–3 menjadi informasi kolektif untuk melihat pola fakultas,
            aktivitas berdampak tinggi, dan performa keberlanjutan kampus.
          </p>
        </div>

        <div className="l4-header-actions">
          <button
            type="button"
            className="l4-button l4-button-secondary"
            onClick={resetData}
          >
            <RotateCcw size={15} />
            Reset prototype
          </button>

          <button
            type="button"
            className="l4-button l4-button-primary"
            onClick={openCreate}
          >
            <Plus size={16} />
            Tambah data
          </button>
        </div>
      </section>

      {/* ===================================
          PROTOTYPE NOTICE
          =================================== */}

      <div className="l4-prototype-notice">
        <div className="l4-prototype-icon">
          <BarChart3 size={16} />
        </div>

        <div>
          <strong>Prototype / simulated data</strong>

          <span>
            Data pada halaman ini merupakan simulasi antarmuka Layer 4. Nilai
            dapat diganti dengan data aktual dari L1–L3 saat backend tersedia.
          </span>
        </div>
      </div>

      {/* ===================================
          KPI
          =================================== */}

      <section className="l4-kpi-grid">
        <div className="l4-kpi-card">
          <div className="l4-kpi-top">
            <span>Mahasiswa terlibat</span>

            <Users size={17} />
          </div>

          <strong>{totalStudents.toLocaleString("id-ID")}</strong>

          <small>Data kolektif mahasiswa</small>
        </div>

        <div className="l4-kpi-card">
          <div className="l4-kpi-top">
            <span>Aktivitas tercatat</span>

            <Activity size={17} />
          </div>

          <strong>{totalActivities.toLocaleString("id-ID")}</strong>

          <small>Agregasi aktivitas L2–L3</small>
        </div>

        <div className="l4-kpi-card">
          <div className="l4-kpi-top">
            <span>Sustainability performance</span>

            <Leaf size={17} />
          </div>

          <strong>{averageScore}</strong>

          <small>Rata-rata fakultas</small>
        </div>

        <div className="l4-kpi-card">
          <div className="l4-kpi-top">
            <span>Behavior change</span>

            <TrendingUp size={17} />
          </div>

          <strong>+{averageBehavior}%</strong>

          <small>Perubahan perilaku agregat</small>
        </div>
      </section>

      {/* ===================================
          TAB + FILTER
          =================================== */}

      <section className="l4-control-panel">
        <div className="l4-tabs">
          <button
            type="button"
            className={
              activeTab === "faculty" ? "l4-tab l4-tab-active" : "l4-tab"
            }
            onClick={() => {
              setActiveTab("faculty");
              setSearch("");
              setSortBy("score");
            }}
          >
            <Building2 size={16} />
            Faculty Ranking
          </button>

          <button
            type="button"
            className={
              activeTab === "student" ? "l4-tab l4-tab-active" : "l4-tab"
            }
            onClick={() => {
              setActiveTab("student");
              setSearch("");
              setSortBy("score");
            }}
          >
            <Users size={16} />
            Student Ranking
          </button>
        </div>

        <div className="l4-controls">
          <div className="l4-search">
            <Search size={16} />

            <input
              type="text"
              placeholder={
                activeTab === "faculty"
                  ? "Cari fakultas..."
                  : "Cari nama atau NIM..."
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="l4-clear-search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {activeTab === "student" && (
            <select
              value={facultyFilter}
              onChange={(e) => setFacultyFilter(e.target.value)}
              className="l4-select"
            >
              <option value="all">Semua fakultas</option>

              {faculties.map((faculty) => (
                <option key={faculty.code} value={faculty.code}>
                  {faculty.shortName}
                </option>
              ))}
            </select>
          )}

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="l4-select"
          >
            {PERIODS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={
              showFilters ? "l4-filter-button active" : "l4-filter-button"
            }
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <Filter size={15} />
            Filter
          </button>
        </div>

        {showFilters && (
          <div className="l4-filter-drawer">
            <div>
              <label>Urutkan berdasarkan</label>

              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
              >
                <option value="score">Sustainability Score</option>

                <option value="activities">Jumlah aktivitas</option>

                <option value="behavior">Behavior Change</option>

                {activeTab === "faculty" && (
                  <option value="students">Jumlah mahasiswa</option>
                )}

                {activeTab === "student" && (
                  <option value="consistency">Consistency</option>
                )}
              </select>
            </div>

            <div>
              <label>Arah pengurutan</label>

              <button
                type="button"
                className="l4-sort-direction"
                onClick={() =>
                  setSortDirection((prev) => (prev === "desc" ? "asc" : "desc"))
                }
              >
                {sortDirection === "desc" ? (
                  <>
                    <ChevronDown size={15} />
                    Tertinggi ke terendah
                  </>
                ) : (
                  <>
                    <ChevronUp size={15} />
                    Terendah ke tertinggi
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ===================================
          FACULTY RANKING
          =================================== */}

      {activeTab === "faculty" && (
        <section className="l4-ranking-section">
          <div className="l4-section-heading">
            <div>
              <span className="l4-section-kicker">COLLECTIVE PATTERN</span>

              <h2>Faculty Sustainability Ranking</h2>

              <p>
                Perbandingan performa keberlanjutan berdasarkan data kolektif
                mahasiswa tiap fakultas.
              </p>
            </div>

            <div className="l4-result-count">
              {filteredFaculties.length} fakultas
            </div>
          </div>

          <div className="l4-table-wrapper">
            <table className="l4-table">
              <thead>
                <tr>
                  <th>Rank</th>

                  <th>Fakultas</th>

                  <th>Students</th>

                  <th>Activities</th>

                  <th>Awareness</th>

                  <th>Behavior Change</th>

                  <th>Performance</th>

                  <th>Trend</th>

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredFaculties.map((faculty, index) => (
                  <tr key={faculty.id}>
                    <td>
                      <div
                        className={
                          index < 3 ? "l4-rank-number top" : "l4-rank-number"
                        }
                      >
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </td>

                    <td>
                      <div className="l4-faculty-cell">
                        <div className="l4-faculty-logo">
                          <img
                            src={faculty.logo}
                            alt=""
                            onError={(e) => {
                              e.currentTarget.style.display = "none";

                              e.currentTarget.parentElement.classList.add(
                                "l4-logo-fallback",
                              );

                              e.currentTarget.parentElement.setAttribute(
                                "data-code",
                                faculty.shortName,
                              );
                            }}
                          />
                        </div>

                        <div>
                          <strong>{faculty.name}</strong>

                          <span>{faculty.shortName}</span>
                        </div>
                      </div>
                    </td>

                    <td>{faculty.students.toLocaleString("id-ID")}</td>

                    <td>{faculty.activities.toLocaleString("id-ID")}</td>

                    <td>
                      <div className="l4-mini-progress">
                        <div className="l4-mini-progress-track">
                          <span
                            style={{
                              width: `${faculty.awareness}%`,
                            }}
                          />
                        </div>

                        <small>{faculty.awareness}%</small>
                      </div>
                    </td>

                    <td>
                      <span className="l4-value-pill">
                        +{faculty.behaviorChange}%
                      </span>
                    </td>

                    <td>
                      <strong className="l4-score">
                        {faculty.sustainabilityScore}
                      </strong>
                    </td>

                    <td>
                      <span
                        className={`l4-trend ${getRankChangeClass(
                          faculty.rankChange,
                        )}`}
                      >
                        {getRankChangeIcon(faculty.rankChange)}

                        {Math.abs(faculty.rankChange)}
                      </span>
                    </td>

                    <td>
                      <div className="l4-row-actions">
                        <button
                          type="button"
                          title="Lihat detail"
                          onClick={() => openDetail(faculty, "faculty")}
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          title="Edit"
                          onClick={() => openEdit(faculty, "faculty")}
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          title="Hapus"
                          className="danger"
                          onClick={() => handleDelete(faculty, "faculty")}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredFaculties.length === 0 && (
              <div className="l4-empty">
                <Search size={22} />
                <strong>Data tidak ditemukan</strong>
                <span>Coba ubah kata kunci atau filter.</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===================================
          STUDENT RANKING
          =================================== */}

      {activeTab === "student" && (
        <section className="l4-ranking-section">
          <div className="l4-section-heading">
            <div>
              <span className="l4-section-kicker">INDIVIDUAL CONTRIBUTION</span>

              <h2>Student Sustainability Ranking</h2>

              <p>
                Gambaran kontribusi individu terhadap pola konsumsi dan
                perubahan perilaku berkelanjutan.
              </p>
            </div>

            <div className="l4-result-count">
              {filteredStudents.length} mahasiswa
            </div>
          </div>

          <div className="l4-student-list">
            {filteredStudents.map((student, index) => (
              <article className="l4-student-row" key={student.id}>
                <div
                  className={
                    index < 3 ? "l4-student-rank top" : "l4-student-rank"
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="l4-student-avatar">
                  {student.name
                    .split(" ")
                    .slice(0, 2)
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="l4-student-main">
                  <div className="l4-student-name">
                    <strong>{student.name}</strong>

                    <span>{student.nim}</span>
                  </div>

                  <div className="l4-student-faculty">
                    <span>{student.facultyCode}</span>

                    {student.faculty}
                  </div>
                </div>

                <div className="l4-student-metric">
                  <span>Activities</span>

                  <strong>{student.activities}</strong>
                </div>

                <div className="l4-student-metric">
                  <span>Behavior</span>

                  <strong>+{student.behaviorChange}%</strong>
                </div>

                <div className="l4-student-metric">
                  <span>Consistency</span>

                  <strong>{student.consistency}%</strong>
                </div>

                <div className="l4-student-score">
                  <span>Score</span>

                  <strong>{student.sustainabilityScore}</strong>
                </div>

                <div className="l4-row-actions">
                  <button
                    type="button"
                    title="Lihat detail"
                    onClick={() => openDetail(student, "student")}
                  >
                    <Eye size={15} />
                  </button>

                  <button
                    type="button"
                    title="Edit"
                    onClick={() => openEdit(student, "student")}
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    type="button"
                    title="Hapus"
                    className="danger"
                    onClick={() => handleDelete(student, "student")}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </article>
            ))}

            {filteredStudents.length === 0 && (
              <div className="l4-empty">
                <Search size={22} />
                <strong>Data mahasiswa tidak ditemukan</strong>
                <span>Coba ubah pencarian atau filter.</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===================================
          LOWER INTELLIGENCE PANELS
          =================================== */}

      <section className="l4-insight-grid">
        {/* HIGH IMPACT */}

        <div className="l4-insight-card">
          <div className="l4-card-heading">
            <div>
              <span className="l4-section-kicker">HIGH-IMPACT ACTIVITIES</span>

              <h3>Aktivitas dengan kontribusi terbesar</h3>
            </div>

            <Target size={18} />
          </div>

          <div className="l4-impact-list">
            {HIGH_IMPACT_ACTIVITIES.map((activity) => (
              <div className="l4-impact-item" key={activity.id}>
                <div className="l4-impact-rank">
                  {String(activity.id).padStart(2, "0")}
                </div>

                <div className="l4-impact-main">
                  <strong>{activity.name}</strong>

                  <span>{activity.category}</span>
                </div>

                <div className="l4-impact-records">
                  <strong>{activity.records.toLocaleString("id-ID")}</strong>

                  <span>records</span>
                </div>

                <div className="l4-impact-change">
                  <TrendingUp size={13} />+{activity.change}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BEHAVIORAL TREND */}

        <div className="l4-insight-card">
          <div className="l4-card-heading">
            <div>
              <span className="l4-section-kicker">BEHAVIORAL TREND</span>

              <h3>Perubahan aktivitas kolektif</h3>
            </div>

            <TrendingUp size={18} />
          </div>

          <div className="l4-trend-chart">
            {[42, 48, 51, 58, 61, 68, 74].map((value, index) => (
              <div className="l4-chart-column" key={index}>
                <div className="l4-chart-value">{value}</div>

                <div className="l4-chart-bar">
                  <span
                    style={{
                      height: `${value}%`,
                    }}
                  />
                </div>

                <small>M{index + 1}</small>
              </div>
            ))}
          </div>

          <div className="l4-chart-footer">
            <div>
              <TrendingUp size={14} />
              <strong>+14.8%</strong>
              <span>perubahan aktivitas</span>
            </div>

            <small>Prototype 7 minggu</small>
          </div>
        </div>
      </section>

      {/* ===================================
          SUSTAINABILITY PERFORMANCE
          =================================== */}

      <section className="l4-performance-section">
        <div className="l4-section-heading">
          <div>
            <span className="l4-section-kicker">
              SUSTAINABILITY PERFORMANCE
            </span>

            <h2>Campus Performance Overview</h2>

            <p>
              Indikator agregat yang menggambarkan hasil kolektif dari
              Awareness, Feedback Mechanism, dan Behavior Change.
            </p>
          </div>
        </div>

        <div className="l4-performance-grid">
          <div className="l4-performance-card">
            <div className="l4-performance-icon">
              <Eye size={18} />
            </div>

            <span>Awareness Level</span>

            <strong>82.1%</strong>

            <div className="l4-performance-track">
              <span style={{ width: "82.1%" }} />
            </div>
          </div>

          <div className="l4-performance-card">
            <div className="l4-performance-icon">
              <Activity size={18} />
            </div>

            <span>Feedback Engagement</span>

            <strong>78.4%</strong>

            <div className="l4-performance-track">
              <span style={{ width: "78.4%" }} />
            </div>
          </div>

          <div className="l4-performance-card">
            <div className="l4-performance-icon">
              <Target size={18} />
            </div>

            <span>Behavior Change</span>

            <strong>71.6%</strong>

            <div className="l4-performance-track">
              <span style={{ width: "71.6%" }} />
            </div>
          </div>

          <div className="l4-performance-card">
            <div className="l4-performance-icon">
              <Award size={18} />
            </div>

            <span>Sustainability Performance</span>

            <strong>79.2</strong>

            <div className="l4-performance-track">
              <span style={{ width: "79.2%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ===================================
          DETAIL MODAL
          =================================== */}

      {modalMode === "detail" && selectedItem && (
        <div
          className="l4-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="l4-modal">
            <div className="l4-modal-header">
              <div>
                <span className="l4-section-kicker">
                  {selectedType === "faculty"
                    ? "FACULTY DETAIL"
                    : "STUDENT DETAIL"}
                </span>

                <h2>{selectedItem.name}</h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="l4-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="l4-detail-content">
              {selectedType === "faculty" ? (
                <>
                  <div className="l4-detail-identity">
                    <div className="l4-detail-logo">
                      {selectedItem.shortName}
                    </div>

                    <div>
                      <strong>{selectedItem.name}</strong>

                      <span>{selectedItem.students} mahasiswa</span>
                    </div>
                  </div>

                  <div className="l4-detail-score-box">
                    <span>Sustainability Performance</span>

                    <strong>{selectedItem.sustainabilityScore}</strong>

                    <small>
                      {selectedItem.dominantActivity} menjadi aktivitas dominan
                    </small>
                  </div>

                  <div className="l4-detail-grid">
                    <div>
                      <span>Awareness</span>

                      <strong>{selectedItem.awareness}%</strong>
                    </div>

                    <div>
                      <span>Behavior Change</span>

                      <strong>+{selectedItem.behaviorChange}%</strong>
                    </div>

                    <div>
                      <span>Carbon Impact</span>

                      <strong>{selectedItem.carbonImpact}</strong>
                    </div>

                    <div>
                      <span>Activity Records</span>

                      <strong>{selectedItem.activities}</strong>
                    </div>
                  </div>

                  <div className="l4-detail-note">
                    <strong>Collective pattern</strong>

                    <p>
                      Data fakultas ini merupakan agregasi aktivitas mahasiswa
                      yang digunakan untuk membaca pola konsumsi, perubahan
                      perilaku, dan performa keberlanjutan.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="l4-detail-identity">
                    <div className="l4-detail-avatar">
                      {selectedItem.name
                        .split(" ")
                        .slice(0, 2)
                        .map((word) => word[0])
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div>
                      <strong>{selectedItem.name}</strong>

                      <span>{selectedItem.nim}</span>
                    </div>
                  </div>

                  <div className="l4-detail-score-box">
                    <span>Sustainability Score</span>

                    <strong>{selectedItem.sustainabilityScore}</strong>

                    <small>{selectedItem.faculty}</small>
                  </div>

                  <div className="l4-detail-grid">
                    <div>
                      <span>Awareness</span>

                      <strong>{selectedItem.awareness}%</strong>
                    </div>

                    <div>
                      <span>Activities</span>

                      <strong>{selectedItem.activities}</strong>
                    </div>

                    <div>
                      <span>Behavior Change</span>

                      <strong>+{selectedItem.behaviorChange}%</strong>
                    </div>

                    <div>
                      <span>Consistency</span>

                      <strong>{selectedItem.consistency}%</strong>
                    </div>
                  </div>

                  <div className="l4-detail-note">
                    <strong>Dominant sustainable activity</strong>

                    <p>{selectedItem.dominantActivity}</p>
                  </div>
                </>
              )}
            </div>

            <div className="l4-modal-footer">
              <button
                type="button"
                className="l4-button l4-button-secondary"
                onClick={() => openEdit(selectedItem, selectedType)}
              >
                <Pencil size={15} />
                Edit data
              </button>

              <button
                type="button"
                className="l4-button l4-button-danger"
                onClick={() => handleDelete(selectedItem, selectedType)}
              >
                <Trash2 size={15} />
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================
          CREATE / EDIT MODAL
          =================================== */}

      {modalMode === "form" && (
        <div
          className="l4-modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="l4-modal l4-form-modal">
            <div className="l4-modal-header">
              <div>
                <span className="l4-section-kicker">
                  {activeTab === "faculty" ? "FACULTY DATA" : "STUDENT DATA"}
                </span>

                <h2>{editingItem ? "Edit data" : "Tambah data"}</h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="l4-modal-close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="l4-form">
              {activeTab === "faculty" ? (
                <>
                  <div className="l4-form-grid">
                    <div className="l4-form-group full">
                      <label>Nama fakultas</label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleFormChange}
                        placeholder="Contoh: Fakultas Teknik"
                        required
                      />
                    </div>

                    <div className="l4-form-group">
                      <label>Singkatan</label>

                      <input
                        type="text"
                        name="shortName"
                        value={formData.shortName || ""}
                        onChange={handleFormChange}
                        placeholder="FT"
                        required
                      />
                    </div>

                    <div className="l4-form-group">
                      <label>Jumlah mahasiswa</label>

                      <input
                        type="number"
                        name="students"
                        value={formData.students || ""}
                        onChange={handleFormChange}
                        min="0"
                        required
                      />
                    </div>

                    <div className="l4-form-group">
                      <label>Activity records</label>

                      <input
                        type="number"
                        name="activities"
                        value={formData.activities || ""}
                        onChange={handleFormChange}
                        min="0"
                        required
                      />
                    </div>

                    <div className="l4-form-group">
                      <label>Awareness (%)</label>

                      <input
                        type="number"
                        name="awareness"
                        value={formData.awareness || ""}
                        onChange={handleFormChange}
                        min="0"
                        max="100"
                      />
                    </div>

                    <div className="l4-form-group">
                      <label>Behavior Change (%)</label>

                      <input
                        type="number"
                        name="behaviorChange"
                        value={formData.behaviorChange || ""}
                        onChange={handleFormChange}
                        min="0"
                        max="100"
                      />
                    </div>

                    <div className="l4-form-group">
                      <label>Carbon Impact</label>

                      <input
                        type="number"
                        name="carbonImpact"
                        value={formData.carbonImpact || ""}
                        onChange={handleFormChange}
                        min="0"
                        max="100"
                      />
                    </div>

                    <div className="l4-form-group">
                      <label>Sustainability Score</label>

                      <input
                        type="number"
                        name="sustainabilityScore"
                        value={formData.sustainabilityScore || ""}
                        onChange={handleFormChange}
                        min="0"
                        max="100"
                        step="0.1"
                      />
                    </div>

                    <div className="l4-form-group">
                      <label>Trend (%)</label>

                      <input
                        type="number"
                        name="trend"
                        value={formData.trend || ""}
                        onChange={handleFormChange}
                        step="0.1"
                      />
                    </div>

                    <div className="l4-form-group">
                      <label>Rank change</label>

                      <input
                        type="number"
                        name="rankChange"
                        value={formData.rankChange || ""}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="l4-form-group full">
                      <label>Aktivitas dominan</label>

                      <input
                        type="text"
                        name="dominantActivity"
                        value={formData.dominantActivity || ""}
                        onChange={handleFormChange}
                        placeholder="Contoh: Transportasi umum"
                      />
                    </div>

                    <div className="l4-form-group full">
                      <label>
                        Path logo fakultas
                        <span>opsional</span>
                      </label>

                      <input
                        type="text"
                        name="logo"
                        value={formData.logo || ""}
                        onChange={handleFormChange}
                        placeholder="/assets/faculties/ft.png"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="l4-form-grid">
                  <div className="l4-form-group full">
                    <label>Nama mahasiswa</label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleFormChange}
                      placeholder="Nama lengkap"
                      required
                    />
                  </div>

                  <div className="l4-form-group">
                    <label>NIM</label>

                    <input
                      type="text"
                      name="nim"
                      value={formData.nim || ""}
                      onChange={handleFormChange}
                      placeholder="Nomor mahasiswa"
                      required
                    />
                  </div>

                  <div className="l4-form-group">
                    <label>Kode fakultas</label>

                    <select
                      name="facultyCode"
                      value={formData.facultyCode || ""}
                      onChange={(e) => {
                        const code = e.target.value;

                        const faculty = faculties.find(
                          (item) => item.code === code,
                        );

                        setFormData((prev) => ({
                          ...prev,
                          facultyCode: code,
                          faculty: faculty ? faculty.name : "",
                        }));
                      }}
                      required
                    >
                      <option value="">Pilih fakultas</option>

                      {faculties.map((faculty) => (
                        <option key={faculty.code} value={faculty.code}>
                          {faculty.shortName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="l4-form-group">
                    <label>Awareness (%)</label>

                    <input
                      type="number"
                      name="awareness"
                      value={formData.awareness || ""}
                      onChange={handleFormChange}
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="l4-form-group">
                    <label>Activities</label>

                    <input
                      type="number"
                      name="activities"
                      value={formData.activities || ""}
                      onChange={handleFormChange}
                      min="0"
                    />
                  </div>

                  <div className="l4-form-group">
                    <label>Behavior Change (%)</label>

                    <input
                      type="number"
                      name="behaviorChange"
                      value={formData.behaviorChange || ""}
                      onChange={handleFormChange}
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="l4-form-group">
                    <label>Carbon Impact</label>

                    <input
                      type="number"
                      name="carbonImpact"
                      value={formData.carbonImpact || ""}
                      onChange={handleFormChange}
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="l4-form-group">
                    <label>Consistency (%)</label>

                    <input
                      type="number"
                      name="consistency"
                      value={formData.consistency || ""}
                      onChange={handleFormChange}
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="l4-form-group">
                    <label>Sustainability Score</label>

                    <input
                      type="number"
                      name="sustainabilityScore"
                      value={formData.sustainabilityScore || ""}
                      onChange={handleFormChange}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div className="l4-form-group full">
                    <label>Aktivitas dominan</label>

                    <input
                      type="text"
                      name="dominantActivity"
                      value={formData.dominantActivity || ""}
                      onChange={handleFormChange}
                      placeholder="Contoh: Membawa bekal"
                    />
                  </div>

                  <div className="l4-form-group">
                    <label>Status</label>

                    <select
                      name="status"
                      value={formData.status || "Aktif"}
                      onChange={handleFormChange}
                    >
                      <option value="Aktif">Aktif</option>

                      <option value="Tidak aktif">Tidak aktif</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="l4-modal-footer">
                <button
                  type="button"
                  className="l4-button l4-button-secondary"
                  onClick={closeModal}
                >
                  Batal
                </button>

                <button type="submit" className="l4-button l4-button-primary">
                  {editingItem ? "Simpan perubahan" : "Tambah data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
