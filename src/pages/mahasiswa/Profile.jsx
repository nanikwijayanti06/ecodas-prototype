import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, Phone, ChevronDown, Eye, EyeOff,
  Edit2, FileText, Shield, LogOut, Award, Leaf, 
  TrendingUp, Zap, Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Gambar Asset (Otomatis terdeteksi jika disimpan di src/assets/images/)
import iconStar from '../../assets/images/icon-star.png';
import iconPahlawanPlastik from '../../assets/images/icon-pahlawan-plastik.png';

export default function Profile() {
  const navigate = useNavigate();
  const [showSensitive, setShowSensitive] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Informasi');

  // Data Mahasiswa (Nanik Wijayanti - UNY)
  const studentData = {
    lastName: 'Wijayanti',
    firstName: 'Nanik',
    middleName: '-',
    preferredName: 'Nanik',
    nim: '21508334012',
    status: 'Aktif',
    country: 'Indonesia',
    address: 'Jl. Colombo No. 1, Karang Malang, Depok, Sleman, DI Yogyakarta',
    gender: 'Perempuan',
    birthdate: '12 Agustus 2002',
    email: 'nanik.wijayanti@student.uny.ac.id',
    phone: '+62 852 1234 5678',
    role: 'Mahasiswa (S1)',
    department: 'Teknik Industri',
    university: 'Universitas Negeri Yogyakarta',
    location: 'Yogyakarta'
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen pb-12 font-sans text-slate-800">
      
      {/* Top Bar: Back Button */}
      <div className="px-8 py-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      {/* Main Profile Card Container */}
      <div className="max-w-6xl mx-auto px-8">
        <div className="bg-white rounded-t-xl border border-slate-200 shadow-sm relative mb-6">
          
          {/* Banner Header */}
          <div className="h-40 bg-[#007A5e] rounded-t-xl relative overflow-hidden">
            <div className="absolute -right-10 -top-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
            <div className="absolute left-20 bottom-[-50px] w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>
          </div>

          {/* Profile Header Info */}
          <div className="px-8 pb-6 relative flex justify-between items-end">
            
            <div className="flex-1">
              {/* Avatar Photo */}
              <div className="absolute -top-14 left-8 bg-white p-1 rounded-full shadow-sm">
                <div className="w-28 h-28 rounded-full bg-slate-200 flex items-center justify-center text-3xl font-bold text-slate-400 border-4 border-white object-cover">
                  NW
                </div>
              </div>

              {/* Name & Titles */}
              <div className="mt-16">
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                  {studentData.lastName}, {studentData.firstName}
                  <span className="bg-amber-100 text-amber-700 text-[10px] px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1 font-bold">
                    <Star className="w-3 h-3" fill="currentColor" /> ECO EXPERT
                  </span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  {studentData.role} in {studentData.department}
                </p>
                <p className="text-sm text-slate-500">
                  {studentData.university} | {studentData.location}
                </p>

                {/* Contact Badges */}
                <div className="flex items-center gap-3 mt-4">
                  <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors px-3 py-1.5 rounded-md text-xs font-medium text-slate-600">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {studentData.email}
                  </div>
                  <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors px-3 py-1.5 rounded-md text-xs font-medium text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {studentData.phone}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Button */}
            <div className="relative mb-2">
              <button 
                onClick={() => setIsActionsOpen(!isActionsOpen)}
                className="flex items-center gap-2 bg-[#007A5e] hover:bg-[#00634c] text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors shadow-sm"
              >
                Actions <ChevronDown className="w-4 h-4" />
              </button>

              {/* Dropdown Menu */}
              {isActionsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-10 text-sm">
                  <button className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Edit2 className="w-4 h-4 text-slate-400" /> Edit profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Kelola Dokumen
                  </button>
                  <button className="w-full text-left px-4 py-2 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-slate-400" /> Keamanan Akun
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Log out
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Primary Tabs */}
          <div className="px-8 mt-2 pb-6 flex gap-3">
            {['Informasi', 'Aktivitas', 'Pencapaian'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                  activeTab === tab 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-100 bg-transparent'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* BOTTOM CONTENT AREA */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm px-8 py-6 min-h-[380px]">
          
          {/* ================= TAB 1: INFORMASI (PROFIL MAHASISWA) ================= */}
          {activeTab === 'Informasi' && (
            <div className="animate-in fade-in duration-300">
              
              {/* Top Row: Sub-header Title & Sensitive Data Toggle */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
                  Profil Mahasiswa
                </h2>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-700 transition-colors">
                    Show sensitive data
                  </span>
                  <div className="relative">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={showSensitive}
                      onChange={() => setShowSensitive(!showSensitive)}
                    />
                    <div className={`block w-10 h-6 rounded-full transition-colors ${showSensitive ? 'bg-[#007A5e]' : 'bg-slate-300'}`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showSensitive ? 'translate-x-4' : ''}`}></div>
                  </div>
                </label>
              </div>

              {/* Basic Section */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Basic</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-6">
                  
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-1">First name</span>
                    <span className="text-sm font-medium text-slate-800">{studentData.firstName}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-1">Middle name</span>
                    <span className="text-sm font-medium text-slate-800">{studentData.middleName}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-1">Last name</span>
                    <span className="text-sm font-medium text-slate-800">{studentData.lastName}</span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-1">Preferred name</span>
                    <span className="text-sm font-medium text-slate-800">{studentData.preferredName}</span>
                  </div>

                  <div className="flex flex-col relative group">
                    <span className="text-xs text-slate-400 mb-1">NIM (ID Mahasiswa)</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-800">
                        {showSensitive ? studentData.nim : '•••••••••••'}
                      </span>
                      {!showSensitive && <EyeOff className="w-3.5 h-3.5 text-slate-300" />}
                    </div>
                  </div>

                  <div className="flex flex-col relative group">
                    <span className="text-xs text-slate-400 mb-1">Status</span>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-800">{studentData.status}</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-1">Country</span>
                    <span className="text-sm font-medium text-slate-800">{studentData.country}</span>
                  </div>

                  <div className="flex flex-col col-span-1 md:col-span-2 bg-slate-50 p-2.5 -ml-2 rounded-md">
                    <span className="text-xs text-slate-400 mb-1">Address</span>
                    <span className="text-sm font-medium text-slate-800 leading-relaxed">
                      {showSensitive ? studentData.address : '••••••••••••••••••••••••••••••••••••'}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-1">Birthdate</span>
                    <span className="text-sm font-medium text-slate-800">
                      {showSensitive ? studentData.birthdate : '•• ••••••• ••••'}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 mb-1">Gender</span>
                    <span className="text-sm font-medium text-slate-800">{studentData.gender}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 2: AKTIVITAS (PERSIS SESUAI GAMBAR) ================= */}
          {activeTab === 'Aktivitas' && (
            <div className="animate-in fade-in duration-300 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Riwayat Aktivitas Hijau</h2>
                <p className="text-xs text-slate-500 mt-1">Log aktivitas ramah lingkungan yang kamu laporkan baru-baru ini.</p>
              </div>
              
              <div className="space-y-4">
                {/* Item 1 */}
                <div className="flex items-start justify-between p-4 bg-slate-50/70 border border-slate-100 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center shrink-0 mt-0.5">
                      <Leaf className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Membawa Bekal & Tumbler ke Kampus</h3>
                      <p className="text-xs text-slate-500 mt-1">Menghemat penggunaan 2 kemasan plastik sekali pakai di kantin FT.</p>
                      
                      <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-100/60 text-emerald-800 px-2.5 py-1 rounded-md text-[11px] font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>-0.2 kg CO₂ Terhindar</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">Hari ini, 08:30</span>
                </div>

                {/* Item 2 */}
                <div className="flex items-start justify-between p-4 bg-slate-50/70 border border-slate-100 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-100/80 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Submit Tugas Paperless</h3>
                      <p className="text-xs text-slate-500 mt-1">Mengumpulkan tugas laporan Praktikum Ergonomi via LMS tanpa mencetak kertas (15 lembar).</p>
                      
                      <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-100/60 text-emerald-800 px-2.5 py-1 rounded-md text-[11px] font-bold">
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>-0.5 kg CO₂ Terhindar</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">Kemarin, 14:15</span>
                </div>

                {/* Dashed Button "Lihat Semua Aktivitas" */}
                <button className="w-full py-3.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-50 rounded-xl transition-colors border border-dashed border-slate-200 mt-2">
                  Lihat Semua Aktivitas
                </button>
              </div>
            </div>
          )}

          {/* ================= TAB 3: PENCAPAIAN (PAKAI DUA ASSET GAMBAR) ================= */}
          {activeTab === 'Pencapaian' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Pencapaian & Peringkat</h2>
              <p className="text-xs text-slate-500 mb-6">Status keberlanjutan dan reward dari aksi ramah lingkunganmu.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ECO RANK CARD */}
                <div className="bg-gradient-to-br from-[#007A5e] to-[#005c47] rounded-2xl p-6 text-white shadow-xs relative overflow-hidden flex flex-col justify-between">
                  <Award className="absolute -right-6 -bottom-6 w-32 h-32 text-white opacity-10" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 mb-1">Status ECODAS Saat Ini</p>
                    <h3 className="text-2xl font-extrabold flex items-center gap-2">
                      Eco Expert <Star className="w-5 h-5 fill-amber-300 text-amber-300" />
                    </h3>
                    <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                      Kamu berada di Top 15% kontributor pengurangan emisi karbon di Teknik Industri UNY bulan ini.
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-4 border-t border-emerald-600/50 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] text-emerald-200 uppercase">Total Poin Hijau</p>
                      <p className="text-lg font-bold">1,240 <span className="text-xs font-normal">pts</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-emerald-200 uppercase">Total Reduksi</p>
                      <p className="text-lg font-bold">18.5 <span className="text-xs font-normal">kg CO₂</span></p>
                    </div>
                  </div>
                </div>

                {/* BADGES COLLECTION (MENGGUNAKAN GAMBAR ICON DARI ASSETS) */}
                <div className="border border-slate-200/80 rounded-2xl p-5 bg-white">
                  <h3 className="text-sm font-bold text-slate-800 mb-4">Lencana (Badges) Diperoleh</h3>
                  <div className="space-y-4">
                    
                    {/* Badge 1: Bintang */}
                    <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 p-2">
                        <img 
                          src={iconStar} 
                          alt="Icon Bintang" 
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                        />
                        <Star className="w-5 h-5 text-amber-500 hidden" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Konsistensi 7 Hari</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Mencatat aktivitas eco-friendly 7 hari berturut-turut.</p>
                      </div>
                    </div>

                    {/* Badge 2: Pahlawan Plastik */}
                    <div className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                      <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 p-2">
                        <img 
                          src={iconPahlawanPlastik} 
                          alt="Icon Pahlawan Plastik" 
                          className="w-full h-full object-contain"
                          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                        />
                        <Leaf className="w-5 h-5 text-emerald-600 hidden" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Pahlawan Plastik</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Menghindari 50 kemasan plastik sekali pakai di kampus.</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}