import React, { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  ChevronDown,
  Edit2,
  FileText,
  LogOut,
  Award,
  Star,
  Search,
  Filter,
  ArrowUpRight,
  X,
  Eye,
  EyeOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Path gambar profil yang bisa diganti sesuai file di folder assets kamu
import profileAvatar from "../../assets/images/profile-avatar.jpg";

export default function ProfileContent() {
  const navigate = useNavigate();

  const [showSensitive, setShowSensitive] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Informasi");
  const [activeSubTab, setActiveSubTab] = useState("PERSONAL");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [studentData, setStudentData] = useState({
    lastName: "Wijayanti",
    firstName: "Nanik",
    middleName: "-",
    preferredName: "Nanik",
    nim: "21508334012",
    status: "Aktif",
    country: "Indonesia",
    address:
      "Jl. Colombo No. 1, Karang Malang, Depok, Sleman, DI Yogyakarta 55281",
    gender: "Perempuan",
    birthdate: "12 Agustus 2002",
    email: "nanik.wijayanti@student.uny.ac.id",
    phone: "+62 852 1234 5678",
    role: "Mahasiswa (S1)",
    department: "Teknik Industri",
    university: "Universitas Negeri Yogyakarta",
  });

  const activityHistory = [
    {
      id: 1,
      name: "Membawa Bekal & Tumbler ke Kampus",
      status: "Tervalidasi",
      category: "Konsumsi",
      date: "2026-09-10",
      detail:
        "Menghemat penggunaan 2 kemasan plastik sekali pakai di kantin FT.",
      reduction: "-0.2 kg CO2",
    },
    {
      id: 2,
      name: "Submit Tugas Paperless (Ergonomi)",
      status: "Tervalidasi",
      category: "Digital",
      date: "2026-09-09",
      detail: "Mengumpulkan laporan via LMS tanpa cetak kertas 15 lembar.",
      reduction: "-0.5 kg CO2",
    },
    {
      id: 3,
      name: "Menggunakan Transportasi Umum (TransJogja)",
      status: "Menunggu",
      category: "Transportasi",
      date: "2026-09-08",
      detail: "Perjalanan kampus menggunakan bus umum TransJogja.",
      reduction: "-1.2 kg CO2",
    },
    {
      id: 4,
      name: "Daur Ulang Kertas Bekas Skripsi",
      status: "Tervalidasi",
      category: "Daur Ulang",
      date: "2026-09-05",
      detail: "Menyetorkan 3 kg kertas bekas ke Bank Sampah Fakultas.",
      reduction: "-0.8 kg CO2",
    },
  ];

  const filteredActivities = activityHistory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Main Container - Full Width */}
      <div className="w-full bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner Hijau Solid */}
        <div className="h-40 md:h-48 bg-[#1e584b] w-full relative"></div>

        {/* Profile Header Info */}
        <div className="px-6 md:px-10 pb-6 relative">
          {/* Avatar / Profil Foto */}
          <div className="absolute -top-16 left-6 md:left-10">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-200">
              <img
                src={profileAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
              <div
                className="w-full h-full bg-emerald-700 text-white font-bold text-2xl flex items-center justify-center"
                style={{ display: "none" }}
              >
                {studentData.firstName.charAt(0)}
                {studentData.lastName.charAt(0)}
              </div>
            </div>
          </div>

          {/* Action Buttons & Profile Details */}
          <div className="pt-16 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {studentData.lastName}, {studentData.firstName}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                {studentData.role} in {studentData.department} |{" "}
                {studentData.university}
              </p>

              {/* Contact Chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-600">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{studentData.email}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-xs text-slate-600">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{studentData.phone}</span>
                </div>
              </div>
            </div>

            {/* Dropdown Actions */}
            <div className="relative self-start">
              <button
                onClick={() => setIsActionsOpen(!isActionsOpen)}
                className="px-4 py-2 bg-[#1e584b] hover:bg-[#17453b] text-white rounded-lg text-xs font-semibold shadow-sm flex items-center gap-2 transition-colors"
              >
                Actions <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {isActionsOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30 text-xs">
                  <button
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setIsActionsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-slate-400" /> Edit
                    profile
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> Dokumen
                  </button>
                  <button className="w-full text-left px-4 py-2.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                    <LogOut className="w-3.5 h-3.5" /> Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="px-6 md:px-10 border-b border-slate-200 flex gap-2">
          {["Informasi", "Aktivitas", "Pencapaian"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-xs font-bold transition-all relative ${
                activeTab === tab
                  ? "text-[#1e584b] border-b-2 border-[#1e584b]"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="p-6 md:p-10">
          {/* TAB INFORMASI (Workable HR Style) */}
          {activeTab === "Informasi" && (
            <div className="space-y-6">
              {/* Sub Navigation & Sensitive Data Toggle Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-4">
                <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
                  {["PERSONAL", "AKADEMIK", "BERKAS"].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setActiveSubTab(sub)}
                      className={`tracking-wider ${
                        activeSubTab === sub
                          ? "text-slate-900 border-b-2 border-slate-900 pb-1"
                          : "hover:text-slate-600"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowSensitive(!showSensitive)}
                  className="flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-800"
                >
                  {showSensitive ? (
                    <EyeOff className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-slate-400" />
                  )}
                  <span>Show sensitive data</span>
                  <div
                    className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
                      showSensitive ? "bg-[#1e584b]" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 bg-white rounded-full transition-transform ${
                        showSensitive ? "translate-x-4" : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                </button>
              </div>

              {/* Sub-Tab: PERSONAL */}
              {activeSubTab === "PERSONAL" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 mb-4">
                      Basic
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8 text-xs">
                      <div>
                        <span className="text-slate-400 block mb-1">
                          First name
                        </span>
                        <span className="text-slate-800 font-medium">
                          {studentData.firstName}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-1">
                          Middle name
                        </span>
                        <span className="text-slate-800 font-medium">
                          {studentData.middleName}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-1">
                          Last name
                        </span>
                        <span className="text-slate-800 font-medium">
                          {studentData.lastName}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-1">
                          Preferred name
                        </span>
                        <span className="text-slate-800 font-medium">
                          {studentData.preferredName}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-1">
                          NIM (Student ID)
                        </span>
                        <span className="text-slate-800 font-medium">
                          {showSensitive ? studentData.nim : "•••••••••••"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-1">
                          Status
                        </span>
                        <span className="text-emerald-600 font-semibold">
                          {studentData.status}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-1">
                          Country
                        </span>
                        <span className="text-slate-800 font-medium">
                          {studentData.country}
                        </span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-slate-400 block mb-1">
                          Address
                        </span>
                        <span className="text-slate-800 font-medium">
                          {showSensitive
                            ? studentData.address
                            : "••••••••••••••••••••••••••••••••••••••••"}
                        </span>
                      </div>

                      <div>
                        <span className="text-slate-400 block mb-1">
                          Gender
                        </span>
                        <span className="text-slate-800 font-medium">
                          {studentData.gender}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-1">
                          Birthdate
                        </span>
                        <span className="text-slate-800 font-medium">
                          {showSensitive
                            ? studentData.birthdate
                            : "••••••••••••"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-Tab: AKADEMIK */}
              {activeSubTab === "AKADEMIK" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1">
                      Program Studi
                    </span>
                    <span className="text-slate-800 font-medium">
                      {studentData.department}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Jenjang</span>
                    <span className="text-slate-800 font-medium">
                      Sarjana (S1)
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">
                      Universitas
                    </span>
                    <span className="text-slate-800 font-medium">
                      {studentData.university}
                    </span>
                  </div>
                </div>
              )}

              {/* Sub-Tab: BERKAS */}
              {activeSubTab === "BERKAS" && (
                <div className="text-xs text-slate-500">
                  Tidak ada dokumen sensitif yang diunggah.
                </div>
              )}
            </div>
          )}

          {/* TAB AKTIVITAS */}
          {activeTab === "Aktivitas" && (
            <div className="space-y-4">
              {/* Search & Filter */}
              <div className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari aktivitas..."
                    className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs bg-white focus:outline-none focus:border-[#1e584b]"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    <Filter className="w-4 h-4" />
                    <span>{selectedCategory}</span>
                  </button>

                  {isFilterOpen && (
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-30 text-xs">
                      {[
                        "Semua",
                        "Konsumsi",
                        "Digital",
                        "Transportasi",
                        "Daur Ulang",
                      ].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsFilterOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-slate-50 text-slate-700"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tabel Tanpa Border Box Berlebih pada Status */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-400 uppercase">
                      <th className="py-3 px-2">Aktivitas</th>
                      <th className="py-3 px-2">Kategori</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {filteredActivities.map((act) => (
                      <tr key={act.id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-2 font-medium text-slate-800">
                          {act.name}
                        </td>
                        <td className="py-3.5 px-2 text-slate-500">
                          {act.category}
                        </td>
                        {/* Status berupa TULISAN BERWARNA TANPA BOX / BORDER */}
                        <td className="py-3.5 px-2 font-semibold">
                          <span
                            className={
                              act.status === "Tervalidasi"
                                ? "text-emerald-600"
                                : "text-amber-600"
                            }
                          >
                            {act.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-right">
                          <button
                            onClick={() => setSelectedActivity(act)}
                            className="text-[#1e584b] font-bold inline-flex items-center gap-0.5 hover:underline"
                          >
                            View <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB PENCAPAIAN (Card Hijau Solid Tanpa Garis Putih) */}
          {activeTab === "Pencapaian" && (
            <div className="space-y-4">
              <div className="bg-[#1e584b] rounded-xl p-6 text-white relative overflow-hidden">
                <Award className="absolute -right-4 -bottom-4 w-32 h-32 text-white/10" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Status ECODAS
                </span>
                <h3 className="text-2xl font-bold flex items-center gap-2 mt-1">
                  Eco Expert{" "}
                  <Star className="w-6 h-6 fill-amber-300 text-amber-300" />
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-emerald-700/60 pt-4">
                  <div>
                    <p className="text-xs text-emerald-200">Poin Hijau</p>
                    <p className="text-xl font-bold mt-0.5">1,240 pts</p>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-200">Reduksi</p>
                    <p className="text-xl font-bold mt-0.5">18.5 kg CO₂</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL VIEW AKTIVITAS */}
      {selectedActivity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 text-xs shadow-xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">
                {selectedActivity.name}
              </h3>
              <button onClick={() => setSelectedActivity(null)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <div className="py-4 space-y-2.5">
              <p>
                <span className="text-slate-400">Kategori:</span>{" "}
                <span className="font-semibold text-slate-700">
                  {selectedActivity.category}
                </span>
              </p>
              <p>
                <span className="text-slate-400">Reduksi:</span>{" "}
                <strong className="text-emerald-600 font-bold">
                  {selectedActivity.reduction}
                </strong>
              </p>
              <p className="bg-slate-50 p-3 rounded-xl text-slate-600 leading-relaxed">
                {selectedActivity.detail}
              </p>
            </div>
            <button
              onClick={() => setSelectedActivity(null)}
              className="w-full py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* MODAL EDIT PROFIL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 text-xs shadow-xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Edit Profil</h3>
              <button onClick={() => setIsEditModalOpen(false)}>
                <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
              </button>
            </div>
            <form onSubmit={handleSaveProfile} className="py-4 space-y-3">
              <div>
                <label className="block text-slate-400 text-[10px] font-bold mb-1 uppercase">
                  Nama Depan
                </label>
                <input
                  type="text"
                  value={studentData.firstName}
                  onChange={(e) =>
                    setStudentData({
                      ...studentData,
                      firstName: e.target.value,
                    })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1e584b]"
                />
              </div>
              <div>
                <label className="block text-slate-400 text-[10px] font-bold mb-1 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={studentData.email}
                  onChange={(e) =>
                    setStudentData({ ...studentData, email: e.target.value })
                  }
                  className="w-full p-2.5 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1e584b]"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1e584b] text-white rounded-xl font-semibold hover:bg-[#17453b]"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
