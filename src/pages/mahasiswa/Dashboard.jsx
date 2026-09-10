import React, { useState } from "react";
import {
  Users,
  Clock,
  ShoppingBag,
  CheckCircle,
  Search,
  Plus,
  Edit3,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Data Awal Misi untuk CRUD
const INITIAL_MISSIONS = [
  {
    id: 1,
    title: "Misi 01: Tumbler Air",
    category: "Plastik",
    respondentId: "#UNY402",
    status: "Selesai",
    points: "+20 XP",
    progress: 100,
    date: "1 hari lalu",
  },
  {
    id: 2,
    title: "Misi 02: Pindah Gedung",
    category: "Mobilitas",
    respondentId: "#UNY403",
    status: "Selesai",
    points: "+20 XP",
    progress: 100,
    date: "2 hari lalu",
  },
  {
    id: 3,
    title: "Misi 03: Kantin Thinwall",
    category: "Konsumsi",
    respondentId: "#UNY404",
    status: "Proses",
    points: "+10 XP",
    progress: 50,
    date: "3 hari lalu",
  },
  {
    id: 4,
    title: "Misi 04: Laporan Digital",
    category: "Paperless",
    respondentId: "#UNY405",
    status: "Pending",
    points: "0 XP",
    progress: 20,
    date: "5 hari lalu",
  },
  {
    id: 5,
    title: "Misi 05: Matikan AC/Lampu",
    category: "Energi",
    respondentId: "#UNY406",
    status: "Selesai",
    points: "+20 XP",
    progress: 100,
    date: "6 hari lalu",
  },
];

// Data Grafik Tren Kesadaran
const TREND_DATA = {
  Mingguan: {
    labels: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
    aksiHijau: [60, 68, 75, 82, 90, 98, 110],
    penggunaanPlastik: [85, 78, 70, 62, 55, 45, 38],
  },
  Bulanan: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ],
    aksiHijau: [65, 70, 74, 82, 88, 92, 95, 98, 104, 110, 118, 125],
    penggunaanPlastik: [80, 78, 72, 65, 58, 52, 48, 44, 40, 36, 31, 28],
  },
  Tahunan: {
    labels: ["2022", "2023", "2024", "2025", "2026"],
    aksiHijau: [45, 62, 85, 105, 125],
    penggunaanPlastik: [95, 80, 60, 42, 28],
  },
};

export default function Dashboard() {
  // State Filter & Chart
  const [trendTab, setTrendTab] = useState("Bulanan");

  // State CRUD Data
  const [missions, setMissions] = useState(INITIAL_MISSIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // State Modal CRUD
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Plastik",
    respondentId: "",
    status: "Selesai",
    points: "+20 XP",
    progress: 100,
    date: "Baru saja",
  });

  // Filter Data Misi
  const filteredMissions = missions.filter((m) => {
    const matchSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.respondentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus =
      statusFilter === "Semua Status" || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredMissions.length / itemsPerPage) || 1;
  const paginatedMissions = filteredMissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Modal Handlers
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        category: "Plastik",
        respondentId: `#UNY${Math.floor(100 + Math.random() * 900)}`,
        status: "Selesai",
        points: "+20 XP",
        progress: 100,
        date: "Baru saja",
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveData = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingId) {
      setMissions(
        missions.map((m) => (m.id === editingId ? { ...m, ...formData } : m)),
      );
    } else {
      setMissions([{ id: Date.now(), ...formData }, ...missions]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm("Yakin ingin menghapus data misi ini?")) {
      setMissions(missions.filter((m) => m.id !== id));
    }
  };

  const activeTrend = TREND_DATA[trendTab];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-6 md:p-8 space-y-6 text-slate-700 font-sans">
      {/* HEADER ATAS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Ringkasan aktivitas dan perkembangan konsumsi berkelanjutan
            mahasiswa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Semester Ganjil 2024/2025
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-[#007A5e] hover:bg-[#00634c] text-white text-xs font-semibold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Data</span>
          </button>
        </div>
      </div>

      {/* 4 KARTU STATISTIK UTAMA */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-[#007A5e] rounded-xl p-5 text-white shadow-xs flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider">
              TOTAL RESPONDEN
            </p>
            <h2 className="text-3xl font-extrabold mt-1 text-white">8.450</h2>
            <p className="text-[11px] text-emerald-100/80 mt-2">
              Mahasiswa terdaftar aktif
            </p>
          </div>
          <Users className="w-5 h-5 text-emerald-200" />
        </div>

        {/* Card 2 */}
        <div className="bg-[#111827] rounded-xl p-5 text-white shadow-xs flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              SKOR RATA-RATA AWARENESS
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <h2 className="text-3xl font-extrabold text-white">4.25</h2>
              <span className="text-xs text-slate-400 font-medium">/5.0</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Kategori Sangat Sadar
            </p>
          </div>
          <Clock className="w-5 h-5 text-slate-400" />
        </div>

        {/* Card 3 */}
        <div className="bg-[#007A5e] rounded-xl p-5 text-white shadow-xs flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider">
              SAMPAH TEREDUKSI
            </p>
            <h2 className="text-3xl font-extrabold mt-1 text-white">
              625 <span className="text-xl font-medium">kg</span>
            </h2>
            <p className="text-[11px] text-emerald-100/80 mt-2">
              Akumulasi periode berjalan
            </p>
          </div>
          <ShoppingBag className="w-5 h-5 text-emerald-200" />
        </div>

        {/* Card 4 */}
        <div className="bg-[#007A5e] rounded-xl p-5 text-white shadow-xs flex justify-between items-start">
          <div>
            <p className="text-[11px] font-bold text-emerald-100 uppercase tracking-wider">
              TINGKAT KESADARAN
            </p>
            <h2 className="text-3xl font-extrabold mt-1 text-white">82.80%</h2>
            <p className="text-[11px] text-emerald-100/80 mt-2">
              +3.4% dari bulan sebelumnya
            </p>
          </div>
          <CheckCircle className="w-5 h-5 text-emerald-200" />
        </div>
      </div>

      {/* TREN KESADARAN & INDIKATOR AWARENESS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KIRI: GRAFIK TREN KESADARAN */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                TREND KESADARAN
              </h3>
              <p className="text-[11px] text-slate-400">
                Perbandingan rasio aksi ramah lingkungan vs pengurangan sampah
                plastik
              </p>
            </div>

            {/* TAB PERIODE */}
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-500 self-start sm:self-auto">
              {["Mingguan", "Bulanan", "Tahunan"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTrendTab(tab)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    trendTab === tab
                      ? "bg-white text-slate-800 shadow-xs"
                      : "hover:text-slate-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* KETERANGAN KATEGORI (LEGEND) */}
          <div className="flex items-center gap-6 text-xs text-slate-600 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#007A5e] rounded-xs"></span>
              <span className="font-medium">Aksi Hijau Mahasiswa</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-slate-800 rounded-xs"></span>
              <span className="font-medium">Penggunaan Plastik</span>
            </div>
          </div>

          {/* VISUAL SVG LINE CHART */}
          <div className="h-56 w-full pt-4 relative">
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
            >
              {/* Garis Grid Horizontal */}
              <line
                x1="0"
                y1="0"
                x2="500"
                y2="0"
                stroke="#f1f5f9"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="37.5"
                x2="500"
                y2="37.5"
                stroke="#f1f5f9"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="75"
                x2="500"
                y2="75"
                stroke="#f1f5f9"
                strokeDasharray="3 3"
              />
              <line
                x1="0"
                y1="112.5"
                x2="500"
                y2="112.5"
                stroke="#f1f5f9"
                strokeDasharray="3 3"
              />
              <line x1="0" y1="150" x2="500" y2="150" stroke="#e2e8f0" />

              {/* Garis Hijau (Aksi Hijau Mahasiswa) */}
              <path
                d={activeTrend.aksiHijau.reduce((acc, val, idx) => {
                  const x = (idx / (activeTrend.labels.length - 1)) * 500;
                  const y = 150 - (val / 140) * 150;
                  return `${acc} ${idx === 0 ? "M" : "L"} ${x} ${y}`;
                }, "")}
                fill="none"
                stroke="#007A5e"
                strokeWidth="2.5"
              />

              {/* Garis Putus-Putus Gelap (Penggunaan Plastik) */}
              <path
                d={activeTrend.penggunaanPlastik.reduce((acc, val, idx) => {
                  const x = (idx / (activeTrend.labels.length - 1)) * 500;
                  const y = 150 - (val / 140) * 150;
                  return `${acc} ${idx === 0 ? "M" : "L"} ${x} ${y}`;
                }, "")}
                fill="none"
                stroke="#1e293b"
                strokeWidth="2"
                strokeDasharray="4 4"
              />

              {/* Titik-Titik Aksi Hijau */}
              {activeTrend.aksiHijau.map((val, idx) => {
                const x = (idx / (activeTrend.labels.length - 1)) * 500;
                const y = 150 - (val / 140) * 150;
                return (
                  <circle
                    key={`green-${idx}`}
                    cx={x}
                    cy={y}
                    r="3.5"
                    fill="#007A5e"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                );
              })}
            </svg>

            {/* Label X-Axis */}
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-medium mt-2">
              {activeTrend.labels.map((lbl, idx) => (
                <span key={idx}>{lbl}</span>
              ))}
            </div>
          </div>
        </div>

        {/* KANAN: INDIKATOR AWARENESS */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                INDIKATOR AWARENESS
              </h3>
              <p className="text-[11px] text-slate-400">
                Skor agregat per dimensi kuesioner
              </p>
            </div>

            <div className="space-y-4 pt-1">
              {[
                {
                  label: "Sustainable Consumption Alternatives",
                  score: "4.32",
                  percent: 86.4,
                },
                { label: "Environmental Issues", score: "4.25", percent: 85 },
                { label: "Resource Scarcity", score: "4.22", percent: 84.4 },
                {
                  label: "Product & Consumption Impact",
                  score: "4.17",
                  percent: 83.4,
                },
              ].map((ind, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">
                      {ind.label}
                    </span>
                    <span className="font-bold text-slate-900">
                      {ind.score}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#007A5e] h-full rounded-full"
                      style={{ width: `${ind.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 text-[10px] text-slate-400 flex justify-between items-center">
            <span>Skala Likert: 1.00 – 5.00</span>
            <span className="font-semibold text-emerald-700">
              Target Kampus Hijau: 4.00+
            </span>
          </div>
        </div>
      </div>

      {/* TABEL AKTIVITAS MISI TERBARU (CRUD) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        {/* HEADER TABEL & SEARCH */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Aktivitas Misi Terbaru
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Perkembangan partisipasi mahasiswa dalam aktivitas konsumsi
              berkelanjutan.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Cari misi, ID..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#007A5e] w-48"
              />
            </div>

            {/* Dropdown Filter Status */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-slate-50 border border-slate-200 rounded-lg text-xs px-3 py-1.5 text-slate-600 outline-none cursor-pointer"
            >
              <option value="Semua Status">Semua Status</option>
              <option value="Selesai">Selesai</option>
              <option value="Proses">Proses</option>
              <option value="Pending">Pending</option>
            </select>

            {/* Button Tambah Data */}
            <button
              onClick={() => handleOpenModal()}
              className="bg-[#111827] hover:bg-slate-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Data</span>
            </button>
          </div>
        </div>

        {/* TABEL DATA */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-5">MISI / AKTIVITAS</th>
                <th className="py-3.5 px-5">KATEGORI</th>
                <th className="py-3.5 px-5">ID RESPONDEN</th>
                <th className="py-3.5 px-5">STATUS</th>
                <th className="py-3.5 px-5">XP</th>
                <th className="py-3.5 px-5">PENYELESAIAN</th>
                <th className="py-3.5 px-5">TANGGAL</th>
                <th className="py-3.5 px-5 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {paginatedMissions.length > 0 ? (
                paginatedMissions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* MISI */}
                    <td className="py-3.5 px-5 font-semibold text-slate-800">
                      {item.title}
                    </td>

                    {/* KATEGORI */}
                    <td className="py-3.5 px-5 text-slate-600">
                      {item.category}
                    </td>

                    {/* ID RESPONDEN */}
                    <td className="py-3.5 px-5 font-mono text-slate-400 text-[11px]">
                      {item.respondentId}
                    </td>

                    {/* STATUS - PERMINTAAN: TANPA BG KOTAKAN HIJAU, HANYA TEKS WARNA TANPA KOTAK */}
                    <td className="py-3.5 px-5 font-bold">
                      <span
                        className={
                          item.status === "Selesai"
                            ? "text-emerald-700"
                            : item.status === "Proses"
                              ? "text-amber-700"
                              : "text-slate-500"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    {/* XP */}
                    <td className="py-3.5 px-5 font-bold text-slate-800">
                      {item.points}
                    </td>

                    {/* PENYELESAIAN */}
                    <td className="py-3.5 px-5 w-32">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-slate-500 w-8">
                          {item.progress}%
                        </span>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.progress === 100
                                ? "bg-[#007A5e]"
                                : item.progress >= 50
                                  ? "bg-amber-500"
                                  : "bg-slate-300"
                            }`}
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* TANGGAL */}
                    <td className="py-3.5 px-5 text-slate-400 text-[11px]">
                      {item.date}
                    </td>

                    {/* AKSI */}
                    <td className="py-3.5 px-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="p-1 text-slate-400 hover:text-emerald-700 transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-400">
                    Tidak ada data misi yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER & PAGINATION */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Menampilkan{" "}
            <span className="font-semibold text-slate-800">
              {paginatedMissions.length}
            </span>{" "}
            dari{" "}
            <span className="font-semibold text-slate-800">
              {filteredMissions.length}
            </span>{" "}
            data aktivitas
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg font-semibold text-xs ${
                  currentPage === page
                    ? "bg-[#007A5e] text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL EDIT / TAMBAH DATA (CRUD) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingId ? "Edit Data Misi" : "Tambah Misi Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveData} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Nama Misi / Aktivitas
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Contoh: Misi 06: Bawa Botol Minum"
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#007A5e]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="Plastik">Plastik</option>
                    <option value="Mobilitas">Mobilitas</option>
                    <option value="Konsumsi">Konsumsi</option>
                    <option value="Paperless">Paperless</option>
                    <option value="Energi">Energi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="Selesai">Selesai</option>
                    <option value="Proses">Proses</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    ID Responden
                  </label>
                  <input
                    type="text"
                    value={formData.respondentId}
                    onChange={(e) =>
                      setFormData({ ...formData, respondentId: e.target.value })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Skor XP
                  </label>
                  <input
                    type="text"
                    value={formData.points}
                    onChange={(e) =>
                      setFormData({ ...formData, points: e.target.value })
                    }
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#007A5e] hover:bg-[#00634c] text-white font-semibold"
                >
                  Simpan Data
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
