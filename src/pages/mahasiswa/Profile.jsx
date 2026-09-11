import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  GraduationCap,
  Pencil,
  Plus,
  Trash2,
  Eye,
  Search,
  X,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Clock3,
  Leaf,
  ChevronDown,
  MoreHorizontal,
  FileImage,
  Save,
  ArrowLeft,
} from "lucide-react";

import profileAvatar from "../../assets/images/profile-avatar.jpg";

const ProfileContent = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // =========================================================
  // DATA MAHASISWA
  // =========================================================

  const [studentData, setStudentData] = useState({
    name: "Nanik Wijayanti",
    nim: "236125410XX",
    status: "Mahasiswa Aktif",
    country: "Indonesia",
    address: "Sleman, Daerah Istimewa Yogyakarta",
    gender: "Perempuan",
    birthdate: "2004-XX-XX",
    email: "nanikwijayanti06@gmail.com",
    phone: "08XXXXXXXXXX",
    role: "Mahasiswa",
    department: "Teknik Industri",
    university: "Universitas Negeri Yogyakarta",
  });

  // =========================================================
  // ACTIVITY DATA
  // =========================================================

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "Membawa Bekal & Tumbler ke Kampus",
      category: "Konsumsi",
      date: "2026-09-10",
      reduction: 0.2,
      status: "Tervalidasi",
      description:
        "Mengurangi penggunaan kemasan sekali pakai dengan membawa bekal dan tumbler.",
      evidenceUrl: null,
      evidenceName: "",
    },
    {
      id: 2,
      title: "Submit Tugas Paperless",
      category: "Digital",
      date: "2026-09-09",
      reduction: 0.5,
      status: "Tervalidasi",
      description:
        "Mengumpulkan tugas secara digital untuk mengurangi penggunaan kertas.",
      evidenceUrl: null,
      evidenceName: "",
    },
    {
      id: 3,
      title: "Menggunakan Transportasi Umum",
      category: "Transportasi",
      date: "2026-09-08",
      reduction: 1.2,
      status: "Menunggu",
      description:
        "Menggunakan TransJogja sebagai alternatif transportasi menuju kampus.",
      evidenceUrl: null,
      evidenceName: "",
    },
    {
      id: 4,
      title: "Daur Ulang Kertas Bekas Skripsi",
      category: "Daur Ulang",
      date: "2026-09-05",
      reduction: 0.8,
      status: "Tervalidasi",
      description:
        "Memanfaatkan kembali kertas bekas yang masih layak digunakan.",
      evidenceUrl: null,
      evidenceName: "",
    },
  ]);

  // =========================================================
  // UI STATE
  // =========================================================

  const [activeTab, setActiveTab] = useState("aktivitas");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const [selectedActivity, setSelectedActivity] = useState(null);

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [editingActivity, setEditingActivity] = useState(null);

  // =========================================================
  // FORM ACTIVITY
  // =========================================================

  const emptyActivityForm = {
    title: "",
    category: "Konsumsi",
    date: new Date().toISOString().split("T")[0],
    reduction: "",
    description: "",
    evidenceUrl: null,
    evidenceName: "",
  };

  const [activityForm, setActivityForm] = useState(emptyActivityForm);

  // =========================================================
  // FORM PROFILE
  // =========================================================

  const [profileForm, setProfileForm] = useState(studentData);

  // =========================================================
  // CATEGORY
  // =========================================================

  const categories = [
    "Semua",
    "Konsumsi",
    "Digital",
    "Transportasi",
    "Daur Ulang",
    "Energi",
  ];

  // =========================================================
  // FILTER ACTIVITY
  // =========================================================

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "Semua" || activity.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [activities, searchTerm, selectedCategory]);

  // =========================================================
  // SUMMARY
  // =========================================================

  const totalReduction = useMemo(() => {
    return activities.reduce(
      (total, activity) => total + Number(activity.reduction || 0),
      0,
    );
  }, [activities]);

  const validatedCount = activities.filter(
    (activity) => activity.status === "Tervalidasi",
  ).length;

  const pendingCount = activities.filter(
    (activity) => activity.status === "Menunggu",
  ).length;

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // OPEN CREATE MODAL
  // =========================================================

  const openCreateActivity = () => {
    setEditingActivity(null);
    setActivityForm({
      ...emptyActivityForm,
      date: new Date().toISOString().split("T")[0],
    });
    setIsActivityModalOpen(true);
  };

  // =========================================================
  // OPEN EDIT MODAL
  // =========================================================

  const openEditActivity = (activity) => {
    setEditingActivity(activity);

    setActivityForm({
      title: activity.title,
      category: activity.category,
      date: activity.date,
      reduction: activity.reduction,
      description: activity.description,
      evidenceUrl: activity.evidenceUrl,
      evidenceName: activity.evidenceName,
    });

    setIsActivityModalOpen(true);
  };

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleActivityChange = (e) => {
    const { name, value } = e.target;

    setActivityForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE IMAGE
  // =========================================================

  const handleEvidenceUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setActivityForm((prev) => ({
      ...prev,
      evidenceUrl: imageUrl,
      evidenceName: file.name,
    }));
  };

  // =========================================================
  // SAVE ACTIVITY
  // =========================================================

  const handleSaveActivity = (e) => {
    e.preventDefault();

    if (!activityForm.title.trim()) {
      alert("Nama aktivitas belum diisi.");
      return;
    }

    if (!activityForm.date) {
      alert("Tanggal aktivitas belum diisi.");
      return;
    }

    const newActivity = {
      id: editingActivity ? editingActivity.id : Date.now(),
      title: activityForm.title.trim(),
      category: activityForm.category,
      date: activityForm.date,
      reduction: Number(activityForm.reduction || 0),
      description: activityForm.description.trim(),
      evidenceUrl: activityForm.evidenceUrl,
      evidenceName: activityForm.evidenceName,
      status: editingActivity ? editingActivity.status : "Menunggu",
    };

    if (editingActivity) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === editingActivity.id ? newActivity : activity,
        ),
      );
    } else {
      setActivities((prev) => [newActivity, ...prev]);
    }

    setIsActivityModalOpen(false);
    setEditingActivity(null);
    setActivityForm(emptyActivityForm);
  };

  // =========================================================
  // DELETE ACTIVITY
  // =========================================================

  const handleDeleteActivity = (id) => {
    const activity = activities.find((item) => item.id === id);

    if (!activity) return;

    const confirmed = window.confirm(`Hapus aktivitas "${activity.title}"?`);

    if (!confirmed) return;

    setActivities((prev) => prev.filter((activity) => activity.id !== id));

    if (selectedActivity?.id === id) {
      setSelectedActivity(null);
      setIsDetailModalOpen(false);
    }
  };

  // =========================================================
  // DETAIL
  // =========================================================

  const openDetail = (activity) => {
    setSelectedActivity(activity);
    setIsDetailModalOpen(true);
  };

  // =========================================================
  // PROFILE EDIT
  // =========================================================

  const openProfileEdit = () => {
    setProfileForm(studentData);
    setIsProfileModalOpen(true);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    setStudentData(profileForm);
    setIsProfileModalOpen(false);
  };

  // =========================================================
  // STATUS
  // =========================================================

  const StatusBadge = ({ status }) => {
    const validated = status === "Tervalidasi";

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
          validated
            ? "bg-[#E8F2EB] text-[#21613C]"
            : "bg-[#FFF5D9] text-[#9A6A00]"
        }`}
      >
        {validated ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}

        {status}
      </span>
    );
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-[#F5F7F3] text-[#17231C]">
      {/* =====================================================
          PROFILE HEADER
      ===================================================== */}

      <section className="px-5 md:px-8 pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#173D29] rounded-2xl overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  {/* FOTO PROFIL */}
                  <div className="relative w-[96px] h-[96px] shrink-0">
                    <div className="w-[96px] h-[96px] rounded-full overflow-hidden border-4 border-white bg-[#E8EFEA] shadow-lg">
                      <img
                        src={profileAvatar}
                        alt="Foto profil"
                        className="w-full h-full object-cover"
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={openProfileEdit}
                      className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#F4C95D] text-[#173D29] border-2 border-[#173D29] flex items-center justify-center hover:bg-[#E8B944] transition"
                      title="Edit profil"
                    >
                      <Pencil size={14} />
                    </button>
                  </div>

                  {/* INFORMASI PROFIL */}

                  <div className="min-w-0">
                    <p className="text-[11px] tracking-[0.16em] uppercase text-[#BFD0C5] mb-1">
                      Profil Mahasiswa
                    </p>

                    <h1 className="text-2xl md:text-3xl font-semibold text-white truncate">
                      {studentData.name}
                    </h1>

                    <p className="text-sm text-[#D6E2DA] mt-1">
                      {studentData.nim} · {studentData.department}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white">
                        {studentData.status}
                      </span>

                      <span className="px-3 py-1 rounded-full bg-[#F4C95D] text-[#173D29] text-xs font-semibold">
                        ECODAS Member
                      </span>
                    </div>
                  </div>
                </div>

                {/* EDIT BUTTON */}

                <button
                  onClick={openProfileEdit}
                  className="self-start md:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#173D29] text-sm font-medium hover:bg-[#EEF3EF] transition"
                >
                  <Pencil size={16} />
                  Edit profil
                </button>
              </div>
            </div>

            {/* QUICK PROFILE INFO */}

            <div className="border-t border-white/10 grid grid-cols-2 md:grid-cols-4">
              <div className="p-4 md:px-6">
                <p className="text-[11px] uppercase tracking-wide text-[#AFC3B6]">
                  Program Studi
                </p>
                <p className="text-sm text-white mt-1 font-medium">
                  {studentData.department}
                </p>
              </div>

              <div className="p-4 md:px-6 border-l border-white/10">
                <p className="text-[11px] uppercase tracking-wide text-[#AFC3B6]">
                  Universitas
                </p>
                <p className="text-sm text-white mt-1 font-medium">
                  {studentData.university}
                </p>
              </div>

              <div className="p-4 md:px-6 border-t md:border-t-0 md:border-l border-white/10">
                <p className="text-[11px] uppercase tracking-wide text-[#AFC3B6]">
                  Aktivitas
                </p>
                <p className="text-sm text-white mt-1 font-medium">
                  {activities.length} tercatat
                </p>
              </div>

              <div className="p-4 md:px-6 border-l border-white/10 border-t md:border-t-0">
                <p className="text-[11px] uppercase tracking-wide text-[#AFC3B6]">
                  Estimasi reduksi
                </p>
                <p className="text-sm text-white mt-1 font-medium">
                  {totalReduction.toFixed(1)} kg CO₂
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <main className="px-5 md:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          {/* TAB */}

          <div className="border-b border-[#DCE3DE] mb-6">
            <div className="flex gap-7">
              <button
                onClick={() => setActiveTab("aktivitas")}
                className={`pb-3 text-sm font-medium border-b-2 transition ${
                  activeTab === "aktivitas"
                    ? "border-[#173D29] text-[#173D29]"
                    : "border-transparent text-[#718078]"
                }`}
              >
                Aktivitas saya
              </button>

              <button
                onClick={() => setActiveTab("informasi")}
                className={`pb-3 text-sm font-medium border-b-2 transition ${
                  activeTab === "informasi"
                    ? "border-[#173D29] text-[#173D29]"
                    : "border-transparent text-[#718078]"
                }`}
              >
                Informasi profil
              </button>
            </div>
          </div>

          {/* =================================================
              AKTIVITAS
          ================================================= */}

          {activeTab === "aktivitas" && (
            <>
              {/* SUMMARY */}

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
                <div className="bg-white border border-[#E1E7E2] rounded-xl p-4">
                  <p className="text-xs text-[#718078]">Total aktivitas</p>
                  <p className="text-2xl font-semibold text-[#173D29] mt-1">
                    {activities.length}
                  </p>
                </div>

                <div className="bg-white border border-[#E1E7E2] rounded-xl p-4">
                  <p className="text-xs text-[#718078]">Tervalidasi</p>
                  <p className="text-2xl font-semibold text-[#21613C] mt-1">
                    {validatedCount}
                  </p>
                </div>

                <div className="bg-white border border-[#E1E7E2] rounded-xl p-4">
                  <p className="text-xs text-[#718078]">Menunggu</p>
                  <p className="text-2xl font-semibold text-[#9A6A00] mt-1">
                    {pendingCount}
                  </p>
                </div>

                <div className="bg-white border border-[#E1E7E2] rounded-xl p-4">
                  <p className="text-xs text-[#718078]">Estimasi reduksi</p>
                  <p className="text-2xl font-semibold text-[#173D29] mt-1">
                    {totalReduction.toFixed(1)}
                    <span className="text-sm font-normal ml-1">kg CO₂</span>
                  </p>
                </div>
              </div>

              {/* ACTIVITY SECTION */}

              <section className="bg-white border border-[#E1E7E2] rounded-2xl overflow-hidden">
                {/* HEADER */}

                <div className="p-5 md:p-6 border-b border-[#E7ECE8]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[#173D29]">
                        Riwayat aktivitas
                      </h2>

                      <p className="text-sm text-[#718078] mt-1">
                        Catat tindakan konsumsi berkelanjutan yang kamu lakukan.
                      </p>
                    </div>

                    <button
                      onClick={openCreateActivity}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#173D29] text-white text-sm font-medium hover:bg-[#24583D] transition"
                    >
                      <Plus size={17} />
                      Tambah aktivitas
                    </button>
                  </div>

                  {/* FILTER */}

                  <div className="flex flex-col md:flex-row gap-3 mt-5">
                    <div className="relative flex-1">
                      <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#89968F]"
                      />

                      <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari aktivitas..."
                        className="w-full pl-10 pr-4 py-2.5 border border-[#DCE3DE] rounded-lg text-sm outline-none focus:border-[#173D29] focus:ring-1 focus:ring-[#173D29]"
                      />
                    </div>

                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="appearance-none w-full md:w-48 px-3 pr-9 py-2.5 border border-[#DCE3DE] rounded-lg bg-white text-sm outline-none focus:border-[#173D29]"
                      >
                        {categories.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#718078]"
                      />
                    </div>
                  </div>
                </div>

                {/* TABLE */}

                {filteredActivities.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[760px]">
                      <thead className="bg-[#F8FAF8]">
                        <tr className="text-left">
                          <th className="px-5 py-3 text-[11px] uppercase tracking-wide text-[#718078] font-medium">
                            Aktivitas
                          </th>

                          <th className="px-4 py-3 text-[11px] uppercase tracking-wide text-[#718078] font-medium">
                            Kategori
                          </th>

                          <th className="px-4 py-3 text-[11px] uppercase tracking-wide text-[#718078] font-medium">
                            Tanggal
                          </th>

                          <th className="px-4 py-3 text-[11px] uppercase tracking-wide text-[#718078] font-medium">
                            Reduksi
                          </th>

                          <th className="px-4 py-3 text-[11px] uppercase tracking-wide text-[#718078] font-medium">
                            Status
                          </th>

                          <th className="px-5 py-3 text-right text-[11px] uppercase tracking-wide text-[#718078] font-medium">
                            Aksi
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredActivities.map((activity) => (
                          <tr
                            key={activity.id}
                            className="border-t border-[#EDF0ED] hover:bg-[#FAFCFA] transition"
                          >
                            {/* ACTIVITY */}

                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-[#EAF1EB] flex items-center justify-center shrink-0">
                                  <Leaf size={17} className="text-[#24583D]" />
                                </div>

                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-[#1E2C24]">
                                    {activity.title}
                                  </p>

                                  <p className="text-xs text-[#89968F] mt-0.5">
                                    {activity.evidenceUrl
                                      ? "Bukti tersedia"
                                      : "Belum ada bukti"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* CATEGORY */}

                            <td className="px-4 py-4">
                              <span className="text-sm text-[#4C5B52]">
                                {activity.category}
                              </span>
                            </td>

                            {/* DATE */}

                            <td className="px-4 py-4">
                              <span className="text-sm text-[#4C5B52]">
                                {formatDate(activity.date)}
                              </span>
                            </td>

                            {/* REDUCTION */}

                            <td className="px-4 py-4">
                              <span className="text-sm font-medium text-[#21613C]">
                                -{Number(activity.reduction).toFixed(1)} kg
                              </span>
                            </td>

                            {/* STATUS */}

                            <td className="px-4 py-4">
                              <StatusBadge status={activity.status} />
                            </td>

                            {/* ACTION */}

                            <td className="px-5 py-4">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => openDetail(activity)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#66736B] hover:bg-[#EAF1EB] hover:text-[#173D29]"
                                  title="Lihat detail"
                                >
                                  <Eye size={16} />
                                </button>

                                <button
                                  onClick={() => openEditActivity(activity)}
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#66736B] hover:bg-[#EAF1EB] hover:text-[#173D29]"
                                  title="Edit"
                                >
                                  <Pencil size={16} />
                                </button>

                                <button
                                  onClick={() =>
                                    handleDeleteActivity(activity.id)
                                  }
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8A5C5C] hover:bg-[#F8EAEA] hover:text-[#A33A3A]"
                                  title="Hapus"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-16 text-center px-6">
                    <div className="w-12 h-12 rounded-full bg-[#EAF1EB] mx-auto flex items-center justify-center">
                      <Search size={20} className="text-[#24583D]" />
                    </div>

                    <h3 className="font-medium text-[#173D29] mt-4">
                      Aktivitas tidak ditemukan
                    </h3>

                    <p className="text-sm text-[#718078] mt-1">
                      Coba ubah kata kunci atau kategori pencarian.
                    </p>
                  </div>
                )}
              </section>
            </>
          )}

          {/* =================================================
              INFORMASI PROFIL
          ================================================= */}

          {activeTab === "informasi" && (
            <section className="bg-white border border-[#E1E7E2] rounded-2xl overflow-hidden">
              <div className="p-5 md:p-6 border-b border-[#E7ECE8] flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-[#173D29]">
                    Informasi profil
                  </h2>

                  <p className="text-sm text-[#718078] mt-1">
                    Informasi dasar akun dan identitas mahasiswa.
                  </p>
                </div>

                <button
                  onClick={openProfileEdit}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#D5DED8] text-[#173D29] text-sm font-medium hover:bg-[#F3F7F4]"
                >
                  <Pencil size={15} />
                  Edit
                </button>
              </div>

              <div className="grid md:grid-cols-2">
                <InfoItem
                  icon={<UserRound size={17} />}
                  label="Nama lengkap"
                  value={studentData.name}
                />

                <InfoItem
                  icon={<GraduationCap size={17} />}
                  label="NIM"
                  value={studentData.nim}
                />

                <InfoItem
                  icon={<GraduationCap size={17} />}
                  label="Program studi"
                  value={studentData.department}
                />

                <InfoItem
                  icon={<GraduationCap size={17} />}
                  label="Universitas"
                  value={studentData.university}
                />

                <InfoItem
                  icon={<Mail size={17} />}
                  label="Email"
                  value={studentData.email}
                />

                <InfoItem
                  icon={<Phone size={17} />}
                  label="Nomor telepon"
                  value={studentData.phone}
                />

                <InfoItem
                  icon={<MapPin size={17} />}
                  label="Alamat"
                  value={studentData.address}
                />

                <InfoItem
                  icon={<CalendarDays size={17} />}
                  label="Tanggal lahir"
                  value={studentData.birthdate}
                />
              </div>
            </section>
          )}
        </div>
      </main>

      {/* =====================================================
          ACTIVITY MODAL
      ===================================================== */}

      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* MODAL HEADER */}

            <div className="px-6 py-5 border-b border-[#E5EAE6] flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-[#718078]">
                  {editingActivity ? "Perbarui catatan" : "Catatan aktivitas"}
                </p>

                <h2 className="text-xl font-semibold text-[#173D29] mt-1">
                  {editingActivity ? "Edit aktivitas" : "Tambah aktivitas"}
                </h2>
              </div>

              <button
                onClick={() => setIsActivityModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#718078] hover:bg-[#F0F3F1]"
              >
                <X size={19} />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSaveActivity} className="p-6 space-y-5">
              {/* TITLE */}

              <div>
                <label className="block text-sm font-medium text-[#26352D] mb-2">
                  Nama aktivitas
                </label>

                <input
                  name="title"
                  value={activityForm.title}
                  onChange={handleActivityChange}
                  placeholder="Contoh: Membawa tumbler ke kampus"
                  className="w-full px-3.5 py-3 border border-[#D8E0DA] rounded-lg text-sm outline-none focus:border-[#173D29] focus:ring-1 focus:ring-[#173D29]"
                />
              </div>

              {/* CATEGORY + DATE */}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#26352D] mb-2">
                    Kategori
                  </label>

                  <select
                    name="category"
                    value={activityForm.category}
                    onChange={handleActivityChange}
                    className="w-full px-3.5 py-3 border border-[#D8E0DA] rounded-lg text-sm bg-white outline-none focus:border-[#173D29]"
                  >
                    {categories
                      .filter((category) => category !== "Semua")
                      .map((category) => (
                        <option key={category}>{category}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#26352D] mb-2">
                    Tanggal
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={activityForm.date}
                    onChange={handleActivityChange}
                    className="w-full px-3.5 py-3 border border-[#D8E0DA] rounded-lg text-sm outline-none focus:border-[#173D29]"
                  />
                </div>
              </div>

              {/* REDUCTION */}

              <div>
                <label className="block text-sm font-medium text-[#26352D] mb-2">
                  Estimasi reduksi karbon
                </label>

                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    name="reduction"
                    value={activityForm.reduction}
                    onChange={handleActivityChange}
                    placeholder="0.0"
                    className="w-full px-3.5 py-3 pr-20 border border-[#D8E0DA] rounded-lg text-sm outline-none focus:border-[#173D29]"
                  />

                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#718078]">
                    kg CO₂
                  </span>
                </div>

                <p className="text-xs text-[#8A968F] mt-1.5">
                  Nilai ini merupakan estimasi pada prototype.
                </p>
              </div>

              {/* DESCRIPTION */}

              <div>
                <label className="block text-sm font-medium text-[#26352D] mb-2">
                  Deskripsi
                </label>

                <textarea
                  name="description"
                  value={activityForm.description}
                  onChange={handleActivityChange}
                  rows={3}
                  placeholder="Jelaskan singkat tindakan yang dilakukan..."
                  className="w-full px-3.5 py-3 border border-[#D8E0DA] rounded-lg text-sm outline-none resize-none focus:border-[#173D29]"
                />
              </div>

              {/* EVIDENCE */}

              <div>
                <label className="block text-sm font-medium text-[#26352D] mb-2">
                  Bukti aktivitas
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleEvidenceUpload}
                  className="hidden"
                />

                {activityForm.evidenceUrl ? (
                  <div className="border border-[#D8E0DA] rounded-xl overflow-hidden">
                    <div className="h-48 bg-[#F2F5F2] flex items-center justify-center">
                      <img
                        src={activityForm.evidenceUrl}
                        alt="Bukti aktivitas"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="p-3 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileImage
                          size={17}
                          className="text-[#24583D] shrink-0"
                        />

                        <span className="text-xs text-[#5F6D65] truncate">
                          {activityForm.evidenceName || "Bukti aktivitas"}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setActivityForm((prev) => ({
                            ...prev,
                            evidenceUrl: null,
                            evidenceName: "",
                          }))
                        }
                        className="text-xs text-[#A33A3A] hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border border-dashed border-[#BFCBC2] rounded-xl p-7 hover:border-[#173D29] hover:bg-[#F8FAF8] transition text-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#EAF1EB] mx-auto flex items-center justify-center">
                      <Upload size={19} className="text-[#24583D]" />
                    </div>

                    <p className="text-sm font-medium text-[#26352D] mt-3">
                      Tambahkan foto bukti
                    </p>

                    <p className="text-xs text-[#89968F] mt-1">
                      JPG, PNG, atau WEBP
                    </p>
                  </button>
                )}
              </div>

              {/* STATUS NOTE */}

              <div className="flex gap-3 p-3.5 rounded-lg bg-[#FFF9E8] border border-[#F1E2AF]">
                <Clock3 size={17} className="text-[#9A6A00] shrink-0 mt-0.5" />

                <p className="text-xs leading-5 text-[#725A19]">
                  Aktivitas baru akan berstatus <strong>Menunggu</strong> sampai
                  dilakukan proses verifikasi.
                </p>
              </div>

              {/* BUTTON */}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsActivityModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-[#D5DED8] text-sm font-medium text-[#526057] hover:bg-[#F4F6F4]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#173D29] text-white text-sm font-medium hover:bg-[#24583D]"
                >
                  <Save size={16} />
                  {editingActivity ? "Simpan perubahan" : "Simpan aktivitas"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DETAIL MODAL
      ===================================================== */}

      {isDetailModalOpen && selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b border-[#E5EAE6] flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#718078]">
                  Detail aktivitas
                </p>

                <h2 className="text-xl font-semibold text-[#173D29] mt-1">
                  {selectedActivity.title}
                </h2>
              </div>

              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F1F4F1]"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6">
              {/* EVIDENCE IMAGE */}

              {selectedActivity.evidenceUrl ? (
                <div className="rounded-xl overflow-hidden bg-[#F2F5F2] mb-5">
                  <img
                    src={selectedActivity.evidenceUrl}
                    alt="Bukti aktivitas"
                    className="w-full max-h-72 object-contain"
                  />
                </div>
              ) : (
                <div className="h-40 rounded-xl bg-[#F4F6F4] border border-dashed border-[#CDD6CF] flex flex-col items-center justify-center mb-5">
                  <ImageIcon size={25} className="text-[#9AA69E]" />

                  <p className="text-sm text-[#718078] mt-2">
                    Belum ada bukti foto
                  </p>
                </div>
              )}

              {/* DETAIL */}

              <div className="space-y-4">
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-[#718078]">Kategori</span>

                  <span className="text-sm font-medium text-[#26352D]">
                    {selectedActivity.category}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-[#718078]">Tanggal</span>

                  <span className="text-sm font-medium text-[#26352D]">
                    {formatDate(selectedActivity.date)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-sm text-[#718078]">
                    Estimasi reduksi
                  </span>

                  <span className="text-sm font-semibold text-[#21613C]">
                    -{Number(selectedActivity.reduction).toFixed(1)} kg CO₂
                  </span>
                </div>

                <div className="flex justify-between gap-4 items-center">
                  <span className="text-sm text-[#718078]">Status</span>

                  <StatusBadge status={selectedActivity.status} />
                </div>

                <div className="pt-3 border-t border-[#E8ECE9]">
                  <p className="text-sm text-[#718078] mb-2">Deskripsi</p>

                  <p className="text-sm leading-6 text-[#39483F]">
                    {selectedActivity.description || "Tidak ada deskripsi."}
                  </p>
                </div>
              </div>

              {/* ACTION */}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    openEditActivity(selectedActivity);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#D5DED8] text-sm font-medium text-[#173D29]"
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  onClick={() => handleDeleteActivity(selectedActivity.id)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F8EAEA] text-[#A33A3A] text-sm font-medium"
                >
                  <Trash2 size={15} />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          PROFILE EDIT MODAL
      ===================================================== */}

      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-[#E5EAE6] flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-[#718078]">
                  Pengaturan akun
                </p>

                <h2 className="text-xl font-semibold text-[#173D29] mt-1">
                  Edit profil
                </h2>
              </div>

              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[#F1F4F1]"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
              <ProfileInput
                label="Nama lengkap"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
              />

              <ProfileInput
                label="NIM"
                name="nim"
                value={profileForm.nim}
                onChange={handleProfileChange}
              />

              <div className="grid md:grid-cols-2 gap-4">
                <ProfileInput
                  label="Program studi"
                  name="department"
                  value={profileForm.department}
                  onChange={handleProfileChange}
                />

                <ProfileInput
                  label="Universitas"
                  name="university"
                  value={profileForm.university}
                  onChange={handleProfileChange}
                />
              </div>

              <ProfileInput
                label="Email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
              />

              <ProfileInput
                label="Nomor telepon"
                name="phone"
                value={profileForm.phone}
                onChange={handleProfileChange}
              />

              <ProfileInput
                label="Alamat"
                name="address"
                value={profileForm.address}
                onChange={handleProfileChange}
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-[#D5DED8] text-sm font-medium text-[#526057]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#173D29] text-white text-sm font-medium"
                >
                  <Save size={16} />
                  Simpan profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// =============================================================
// INFO ITEM
// =============================================================

const InfoItem = ({ icon, label, value }) => {
  return (
    <div className="p-5 border-b border-[#E7ECE8] md:nth-[2n]:border-l">
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#EAF1EB] text-[#24583D] flex items-center justify-center shrink-0">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-[#89968F]">{label}</p>

          <p className="text-sm font-medium text-[#29372F] mt-1 break-words">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

// =============================================================
// PROFILE INPUT
// =============================================================

const ProfileInput = ({ label, name, value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#26352D] mb-2">
        {label}
      </label>

      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-3.5 py-3 border border-[#D8E0DA] rounded-lg text-sm outline-none focus:border-[#173D29] focus:ring-1 focus:ring-[#173D29]"
      />
    </div>
  );
};

export default ProfileContent;
