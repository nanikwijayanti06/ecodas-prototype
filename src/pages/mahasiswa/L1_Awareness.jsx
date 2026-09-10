import React, { useState } from 'react';
import { 
  Search, Settings, HelpCircle, Bell, ChevronDown, ChevronUp, 
  ChevronRight, ChevronLeft, ArrowRight, CheckCircle2, Info, 
  RotateCcw, Lock, BookOpen, Sparkles, X, Home, Users, 
  CreditCard, BarChart2, Grid, Droplet, Footprints, Utensils, Laptop, ShieldAlert
} from 'lucide-react';

// --- DATA MAHASISWA & PLATFORM ---
const studentData = {
  name: "Nanik Wijayanti",
  university: "Universitas Negeri Yogyakarta",
  ecoPoints: 1250,
  rank: "Eco Explorer",
  level: 3,
  streak: 4,
  xp: 720,
  maxXp: 1000
};

// --- DATA 5 SKENARIO KAMPUS (LENGKAP DARI KODE ASLI) ---
const missions = [
  {
    id: 1,
    category: "PLASTIK SEKALI PAKAI",
    title: "Misi 01: Tumbler & Minuman Kampus",
    context: "Kamu baru selesai kuliah 2 SKS dan merasa sangat haus. Kamu membawa tumbler kosong di tas, tetapi di depan kelas ada vending machine & kedai es kopi kemasan.",
    choices: [
      { 
        id: 'a', 
        text: "Beli air kemasan sekali pakai", 
        subtext: "Praktis & langsung minum dari mesin",
        isSustainable: false, 
        feedback: "Botol plastik sekali pakai membutuhkan hingga 450 tahun untuk terurai. Mengisi ulang tumbler dapat mengurangi timbulan sampah plastik harian kampus secara signifikan." 
      },
      { 
        id: 'b', 
        text: "Isi ulang tumbler di water station", 
        subtext: "Cari dispenser / water refill station terdekat",
        isSustainable: true, 
        feedback: "Keputusan tepat. Mengisi ulang tumbler langsung menekan jejak limbah plastik harianmu dan menghemat pengeluaran harian." 
      },
      { 
        id: 'c', 
        text: "Beli es kopi dalam cup plastik", 
        subtext: "Segar untuk bekal kelas berikutnya",
        isSustainable: false, 
        feedback: "Cup plastik es kopi berlapis polimer sangat sulit didaur ulang secara lokal. Biasakan meminta barista mengisikan ke tumblermu." 
      }
    ]
  },
  {
    id: 2,
    category: "TRANSPORTASI LOKAL",
    title: "Misi 02: Pindah Gedung Perkuliahan",
    context: "Kamu harus berpindah dari Gedung Fakultas ke Perpustakaan Pusat yang berjarak sekitar 700 meter untuk jadwal kuliah berikutnya.",
    choices: [
      { 
        id: 'a', 
        text: "Naik ojek online", 
        subtext: "Cepat dan tidak melelahkan",
        isSustainable: false, 
        feedback: "Penggunaan kendaraan bermotor untuk jarak di bawah 1 km menghasilkan emisi karbon yang sebenarnya tidak perlu." 
      },
      { 
        id: 'b', 
        text: "Jalan kaki atau gunakan sepeda kampus", 
        subtext: "Nol emisi karbon dan lebih sehat",
        isSustainable: true, 
        feedback: "Pilihan ideal. Jalan kaki adalah moda mobilitas paling hijau, tanpa emisi CO2, serta menjaga kebugaran fisik." 
      }
    ]
  },
  {
    id: 3,
    category: "KONSUMSI MAKANAN",
    title: "Misi 03: Makan Siang di Kantin",
    context: "Waktu istirahat tiba. Kamu hendak membeli makanan di kantin kampus untuk dinikmati bersama teman di gazebo.",
    choices: [
      { 
        id: 'a', 
        text: "Gunakan wadah makan sendiri (Thinwall)", 
        subtext: "Minta penjual mengisikan ke tempat makanmu",
        isSustainable: true, 
        feedback: "Luar biasa. Membawa wadah sendiri secara konsisten mencegah tumpukan bungkus styrofoam dan kertas minyak di tempat sampah kantin." 
      },
      { 
        id: 'b', 
        text: "Minta dibungkus plastik & styrofoam", 
        subtext: "Praktis dan bisa langsung dibuang setelah makan",
        isSustainable: false, 
        feedback: "Styrofoam mengandung bahan berbahaya dan tidak terurai alami. Biasakan selalu menyimpan wadah guna ulang di dalam tas kuliah." 
      }
    ]
  },
  {
    id: 4,
    category: "PENGGUNAAN KERTAS",
    title: "Misi 04: Pengumpulan Tugas Kuliah",
    context: "Dosen memberikan opsi pengumpulan laporan ilmiah: dicetak kertas (hardcopy) atau diunggah dalam format PDF (softcopy).",
    choices: [
      { 
        id: 'a', 
        text: "Unggah dokumen digital via LMS", 
        subtext: "Paperless, praktis, dan efisien",
        isSustainable: true, 
        feedback: "Tepat sekali. Penerapan paperless menghemat penggunaan ribuan lembar kertas, air industri, dan penebangan pohon secara global." 
      },
      { 
        id: 'b', 
        text: "Mencetak 20 halaman laporan kertas", 
        subtext: "Printout berwarna dengan jilid mika",
        isSustainable: false, 
        feedback: "Mencetak dokumen yang dapat dibaca secara digital menambah limbah kertas dan jejak karbon manufaktur secara tidak langsung." 
      }
    ]
  },
  {
    id: 5,
    category: "EFISIENSI ENERGI",
    title: "Misi 05: Selesai Perkuliahan Terakhir",
    context: "Sesi perkuliahan berakhir dan seluruh mahasiswa meninggalkan ruangan. Kamu menjadi orang terakhir yang masih ada di dalam kelas.",
    choices: [
      { 
        id: 'a', 
        text: "Matikan AC dan lampu ruang kelas", 
        subtext: "Inisiatif hemat energi sebelum keluar",
        isSustainable: true, 
        feedback: "Sangat baik. Mematikan sakelar listrik di ruangan kosong mencegah pemborosan energi fosil pembangkit listrik secara langsung." 
      },
      { 
        id: 'b', 
        text: "Langsung keluar ruangan", 
        subtext: "Mengasumsikan petugas kebersihan yang akan mematikan",
        isSustainable: false, 
        feedback: "Peralatan elektronik yang dibiarkan menyala di ruangan kosong selama berjam-jam merupakan salah satu pemborosan energi terbesar di kampus." 
      }
    ]
  }
];

// --- DATA MATERI KTI LAYER 1 AWARENESS ---
const ktiTopics = [
  {
    id: "01",
    score: "4.32",
    priority: "High Priority",
    title: "Alternatif Konsumsi Berkelanjutan",
    category: "Substitusi Harian",
    desc: "Langkah praktis mengganti barang sekali pakai dengan alternatif ramah lingkungan di kampus.",
    items: [
      { name: "Tumbler & Thinwall", desc: "Gantikan botol sekali pakai & wadah plastik dengan tempat makan bawaan.", icon: <Droplet className="w-5 h-5 text-indigo-600" /> },
      { name: "Transportasi Mikro", desc: "Gunakan jalan kaki atau sepeda untuk mobilitas antar gedung perkuliahan.", icon: <Footprints className="w-5 h-5 text-emerald-600" /> },
      { name: "Zero Food Waste", desc: "Pilih porsi makan secukupnya dan utamakan bahan makanan lokal.", icon: <Utensils className="w-5 h-5 text-amber-600" /> },
      { name: "Digital & Paperless", desc: "Gunakan LMS dan e-book tanpa perlu mencetak kertas laporan.", icon: <Laptop className="w-5 h-5 text-purple-600" /> }
    ]
  },
  {
    id: "02",
    score: "4.25",
    priority: "High Priority",
    title: "Isu Lingkungan Kampus & Global",
    category: "Krisis & Iklim",
    desc: "Memahami krisis sampah plastik harian dan kaitannya dengan pemanasan global.",
    modules: [
      {
        id: 0,
        num: "01",
        title: "Krisis Sampah Plastik Sekali Pakai",
        sub: "Dampak akumulasi botol, cup kopi, dan bungkus makanan harian.",
        content: "Lebih dari 8 juta ton plastik berakhir di lautan setiap tahun. Di lingkungan kampus, ribuan kemasan sekali pakai dibuang harian. Hanya sekitar 9% limbah plastik yang terdaur ulang secara efektif."
      },
      {
        id: 1,
        num: "02",
        title: "Pemanasan Global & Jejak Karbon Mahasiswa",
        sub: "Hubungan aktivitas mobilitas dan penggunaan energi perkuliahan.",
        content: "Penggunaan kendaraan bermotor untuk jarak pendek serta penggunaan pendingin udara (AC) di ruangan kosong menyumbang jejak karbon langsung yang mempercepat krisis iklim."
      }
    ]
  },
  {
    id: "03",
    score: "4.22",
    priority: "High Priority",
    title: "Kelangkaan Sumber Daya Alam",
    category: "Water & Energy",
    desc: "Persentase konsumsi sumber daya dan dampaknya terhadap daya dukung lingkungan.",
    stats: [
      { name: "Air Bersih (Water Footprint)", usage: 85, text: "1 botol plastik 500ml memerlukan 3 liter air bersih dalam manufaktur industrinya." },
      { name: "Energi Fosil Kampus", usage: 70, text: "Konsumsi AC dan penerangan kelas menyedot pasokan listrik berbahan bakar batu bara." },
      { name: "Bahan Baku & Hutan", usage: 60, text: "Penebangan pohon untuk pemenuhan kertas cetak dan kemasan sekali pakai." }
    ]
  },
  {
    id: "04",
    score: "4.17",
    priority: "Medium Priority",
    title: "Dampak Produk & Aktivitas Konsumsi",
    category: "Siklus Hidup Produk",
    desc: "Melacak alur linear produk dari ekstraksi industri hingga akumulasi limbah.",
    flows: [
      { step: "01", title: "Keputusan Konsumsi", desc: "Membeli minuman atau makanan berbungkus plastik sekali pakai." },
      { step: "02", title: "Ekstraksi Industri", desc: "Penggunaan minyak bumi, energi fosil, dan air bersih manufaktur." },
      { step: "03", title: "Jejak Logistik", desc: "Transportasi distribusi menghasilkan emisi karbon CO2 di jalan." },
      { step: "04", title: "Akumulasi Limbah", desc: "Berakhir di TPA lokal atau mencemari ekosistem laut jangka panjang." }
    ]
  }
];

export default function AwarenessPage() {
  // Navigation & Interactive States
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [selectedNav, setSelectedNav] = useState('overview');
  const [showPromoBox, setShowPromoBox] = useState(true);
  
  // Mission Simulation States
  const [isStarted, setIsStarted] = useState(false);
  const [currentMission, setCurrentMission] = useState(0);
  const [missionState, setMissionState] = useState('question'); // 'question' | 'feedback' | 'result'
  const [selectedChoice, setSelectedChoice] = useState(null);
  
  // Accordion State
  const [openAccordion, setOpenAccordion] = useState(0);

  // Handlers
  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setMissionState('feedback');
  };

  const handleNext = () => {
    if (currentMission < missions.length - 1) {
      setCurrentMission(currentMission + 1);
      setMissionState('question');
      setSelectedChoice(null);
    } else {
      setMissionState('result');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-slate-800 font-sans flex flex-col">
      
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (Sesuai Navigasi Atas Gambar Reference) */}
      {/* ========================================================================= */}
      <nav className="h-14 bg-white border-b border-slate-200/80 px-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-purple-700 rounded-full flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              e.
            </div>
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:bg-slate-100 px-2 py-1 rounded-md transition-colors">
              <span className="bg-slate-900 text-white font-mono px-1.5 py-0.5 rounded text-[10px]">UNY</span>
              <span>ECODAS Group</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Top Level Nav Links */}
          <div className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600">
            <button className="px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-slate-500" /> Home
            </button>
            <button className="px-3 py-1.5 rounded-md bg-purple-50 text-purple-700 font-semibold flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Awareness (L1)
            </button>
            <button className="px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-slate-400">
              <BarChart2 className="w-3.5 h-3.5" /> Feedback (L2) <Lock className="w-3 h-3 ml-0.5" />
            </button>
            <button className="px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors flex items-center gap-1.5 text-slate-400">
              <Users className="w-3.5 h-3.5" /> Collective (L4) <Lock className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Right Search & Profile Tools */}
        <div className="flex items-center gap-3">
          {/* Search bar mini */}
          <div className="relative hidden lg:block w-48">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari modul..."
              className="w-full bg-slate-100/80 hover:bg-slate-100 text-xs pl-8 pr-8 py-1.5 rounded-md outline-none focus:ring-1 focus:ring-purple-500 border border-transparent transition-all"
            />
            <span className="absolute right-2 top-1.5 text-[10px] font-mono bg-white border border-slate-200 text-slate-400 px-1 rounded">⌘K</span>
          </div>

          <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors">
              <Settings className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded-md transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>

          {/* User Avatar Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 bg-gradient-to-tr from-purple-600 to-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-xs">
              NW
            </div>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 2. MAIN LAYOUT (SIDEBAR + CONTENT GRID ASLI DEEL) */}
      {/* ========================================================================= */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-4 sm:p-6 gap-6">
        
        {/* ----------------------------------------------------------------------- */}
        {/* LEFT SIDEBAR (Filter Nav / Category Tree) */}
        {/* ----------------------------------------------------------------------- */}
        <aside className="w-60 shrink-0 hidden md:flex flex-col gap-5">
          {/* Search box inside sidebar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Find modules" 
              className="w-full bg-white text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 shadow-2xs outline-none focus:border-purple-400 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Sidebar Navigation Tree */}
          <div className="space-y-1 text-xs font-medium">
            <button 
              onClick={() => setSelectedNav('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-colors ${
                selectedNav === 'overview' ? 'bg-slate-200/70 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Grid className="w-4 h-4 text-slate-500" />
              <span>Awareness overview</span>
            </button>

            <button 
              onClick={() => setSelectedNav('simulation')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                selectedNav === 'simulation' ? 'bg-slate-200/70 text-slate-900 font-semibold' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Simulasi Skenario</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">5 Misi</span>
            </button>

            {/* Categories Collapsible Menu */}
            <div className="pt-2">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-slate-600 hover:text-slate-900 transition-colors text-xs font-medium"
              >
                <span>Kategori KTI</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryOpen && (
                <div className="mt-1 ml-3 pl-2 border-l border-slate-200 space-y-1">
                  <a href="#kti-01" className="block px-2.5 py-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors truncate">
                    01. Alternatif Konsumsi
                  </a>
                  <a href="#kti-02" className="block px-2.5 py-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors truncate">
                    02. Isu Lingkungan Kampus
                  </a>
                  <a href="#kti-03" className="block px-2.5 py-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors truncate">
                    03. Kelangkaan Sumber Daya
                  </a>
                  <a href="#kti-04" className="block px-2.5 py-1.5 text-slate-500 hover:text-purple-700 hover:bg-purple-50 rounded-md transition-colors truncate">
                    04. Dampak Produk & Konsumsi
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Card (Looking for Developer / Progres Promo Box) */}
          {showPromoBox && (
            <div className="mt-auto bg-white border border-slate-200/90 rounded-xl p-3.5 space-y-2.5 shadow-2xs relative">
              <button 
                onClick={() => setShowPromoBox(false)}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <h4 className="text-xs font-bold text-slate-900 leading-tight pr-4">
                Progres Layer 1
              </h4>
              <p className="text-[11px] text-slate-500 leading-normal">
                Selesaikan 5 simulasi untuk membuka fitur analisis dampak di Layer 2 (Feedback).
              </p>
              <button 
                onClick={() => { setSelectedNav('simulation'); setIsStarted(true); }}
                className="w-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold text-[11px] py-1.5 px-3 rounded-lg border border-purple-200 transition-colors flex items-center justify-center gap-1"
              >
                Mulai Skenario
              </button>
            </div>
          )}
        </aside>

        {/* ----------------------------------------------------------------------- */}
        {/* MAIN CONTENT AREA */}
        {/* ----------------------------------------------------------------------- */}
        <main className="flex-1 space-y-6 min-w-0">
          
          {/* Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">Awareness overview</h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{studentData.name} ({studentData.university})</span>
            </div>
          </div>

          {/* 3. HERO BANNER PURPLE (Sama persis seperti "Welcome to Deel's app store") */}
          <div className="bg-gradient-to-r from-[#EDE9FE] via-[#F3E8FF] to-[#E0E7FF] border border-purple-200/80 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-2xs">
            <div className="max-w-md space-y-2 z-10 relative">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                Selamat Datang di ECODAS Layer 1
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pahami dampak dari keputusan harianmu di kampus. Pelajari 4 modul indikator KTI ECODAS dan selesaikan simulasi interaktif.
              </p>
              
              {/* Badges / Metrics Row */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold">
                <div className="bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-purple-800 border border-purple-200/60 shadow-2xs">
                  XP Kamu: {studentData.ecoPoints.toLocaleString()} XP
                </div>
                <div className="bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-slate-700 border border-slate-200/60 shadow-2xs">
                  Rank: {studentData.rank} (Lv. {studentData.level})
                </div>
                <div className="bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full text-amber-700 border border-amber-200/60 shadow-2xs">
                  Streak: {studentData.streak} Hari 🔥
                </div>
              </div>
            </div>

            {/* Illustration Graphics SVG on Right */}
            <div className="absolute right-4 bottom-2 hidden sm:block opacity-90 pointer-events-none">
              <div className="w-44 h-32 relative flex items-center justify-center">
                <div className="w-24 h-24 bg-purple-300/40 rounded-2xl rotate-12 absolute backdrop-blur-xs"></div>
                <div className="w-20 h-20 bg-indigo-400/30 rounded-2xl -rotate-6 absolute backdrop-blur-xs"></div>
                <div className="w-28 h-20 bg-white/90 rounded-xl shadow-md p-3 border border-purple-100 flex flex-col justify-between relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">e</div>
                    <span className="text-[10px] font-bold text-slate-800">ECODAS</span>
                  </div>
                  <div className="w-full bg-purple-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-3/4"></div>
                  </div>
                  <span className="text-[9px] font-mono text-purple-700 font-semibold">Layer 1 Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 4. FEATURED GRID 2 COLUMNS (Top picks for you & Featured apps layout) */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="simulation-section">
            
            {/* BOX LEFT: SIMULASI SKENARIO KAMPUS (INTERAKTIF KUIS) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs flex flex-col justify-between">
              <div>
                {/* Visual Header Illustration Banner */}
                <div className="w-full h-28 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100/80 rounded-xl mb-4 flex items-center justify-between px-6 relative overflow-hidden">
                  <div className="space-y-1 z-10">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-indigo-200">
                      Top Picks For You
                    </span>
                    <h3 className="text-base font-bold text-slate-900">Simulasi Skenario Kampus</h3>
                    <p className="text-xs text-slate-500">5 Misi Keputusan Harian Mahasiswa</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-sm shrink-0 z-10">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>

                {!isStarted ? (
                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Uji sejauh mana kesadaran ekologismu dalam membuat keputusan harian saat berkuliah di kampus. Jawab 5 kuis skenario nyata.
                    </p>
                    <div className="pt-2">
                      <button 
                        onClick={() => setIsStarted(true)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl inline-flex items-center justify-center gap-2 transition-all shadow-2xs"
                      >
                        Mulai Simulasi Sekarang <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : missionState !== 'result' ? (
                  <div className="space-y-4">
                    {/* Mission Header */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                        MISI 0{currentMission + 1} / 0{missions.length} • {missions[currentMission].category}
                      </span>
                      <div className="flex items-center gap-1">
                        {missions.map((_, idx) => (
                          <div 
                            key={idx} 
                            className={`h-1.5 w-4 rounded-full transition-all ${
                              idx === currentMission ? 'bg-purple-600 w-6' : idx < currentMission ? 'bg-emerald-500' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Mission Context */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-bold text-slate-900">{missions[currentMission].title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80 italic">
                        "{missions[currentMission].context}"
                      </p>
                    </div>

                    {/* Mission Options */}
                    {missionState === 'question' && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono font-semibold uppercase text-slate-400">Pilih Opsi Tindakanmu:</span>
                        {missions[currentMission].choices.map((choice) => (
                          <button
                            key={choice.id}
                            onClick={() => handleChoice(choice)}
                            className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 transition-all flex items-center justify-between group bg-white shadow-2xs"
                          >
                            <div className="space-y-0.5">
                              <p className="text-xs font-bold text-slate-800 group-hover:text-purple-900">{choice.text}</p>
                              <p className="text-[11px] text-slate-500">{choice.subtext}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Mission Feedback */}
                    {missionState === 'feedback' && (
                      <div className="space-y-3 pt-1">
                        <div className={`p-3.5 rounded-xl border-l-4 text-xs ${
                          selectedChoice.isSustainable 
                            ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950' 
                            : 'border-amber-500 bg-amber-50/70 text-amber-950'
                        }`}>
                          <div className="flex items-start gap-2.5">
                            {selectedChoice.isSustainable ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                            )}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold">
                                  {selectedChoice.isSustainable ? 'Opsi Berkelanjutan' : 'Evaluasi Pilihan'}
                                </span>
                                {selectedChoice.isSustainable && (
                                  <span className="text-[9px] font-mono font-bold bg-emerald-600 text-white px-1.5 py-0.2 rounded">
                                    +20 XP
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-600 leading-relaxed">{selectedChoice.feedback}</p>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={handleNext}
                          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors"
                        >
                          {currentMission < missions.length - 1 ? 'Misi Berikutnya' : 'Selesai & Lihat Ringkasan'} <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Result State */
                  <div className="space-y-3 py-2 text-center">
                    <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">Semua Simulasi Selesai!</h4>
                    <p className="text-xs text-slate-600">
                      Kamu berhasil menyelesaikan 5 skenario kesadaran konsumsi dan memperoleh <strong className="text-emerald-700">+100 Eco XP</strong>.
                    </p>
                    <button 
                      onClick={() => {
                        setIsStarted(false);
                        setCurrentMission(0);
                        setMissionState('question');
                      }}
                      className="text-xs text-purple-700 font-semibold hover:underline inline-flex items-center gap-1 pt-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Ulangi Simulasi Skenario
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* BOX RIGHT: HIGHLIGHT INDIKATOR KTI 01 (Alternatif Konsumsi) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-2xs flex flex-col justify-between" id="kti-01">
              <div>
                <div className="w-full h-28 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100/80 rounded-xl mb-4 flex items-center justify-between px-6 relative overflow-hidden">
                  <div className="space-y-1 z-10">
                    <span className="text-[10px] font-mono font-bold text-purple-700 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-purple-200">
                      KTI Skor 4.32 • Priority 1
                    </span>
                    <h3 className="text-base font-bold text-slate-900">Alternatif Konsumsi</h3>
                    <p className="text-xs text-slate-500">Substitusi Barang Sekali Pakai</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-700 text-white rounded-xl flex items-center justify-center shadow-sm shrink-0 z-10">
                    <BookOpen className="w-6 h-6" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {ktiTopics[0].items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50/80 border border-slate-200/70 rounded-xl space-y-1 hover:border-purple-300 transition-all">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <h4 className="text-xs font-bold text-slate-900 truncate">{item.name}</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>4 Opsi Substitusi Harian</span>
                <span className="text-purple-700 font-semibold cursor-pointer hover:underline">Pelajari Selengkapnya →</span>
              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* 5. FEATURED MODULES CAROUSEL / LIST (Matches "Featured apps" Grid Layout) */}
          {/* ========================================================================= */}
          <div className="space-y-4 pt-2">
            
            {/* Section Header with Carousel Control Arrows */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">Modul Indikator KTI ECODAS</h2>
                <p className="text-xs text-slate-500">Materi kesadaran berbasis data empiris riset KTI Layer 1</p>
              </div>

              {/* Slider Control Arrows (Sama persis dengan tombol < > pada gambar reference) */}
              <div className="flex items-center gap-1.5">
                <button className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-2xs">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="w-7 h-7 rounded-full border border-slate-200 bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors shadow-2xs">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Grid of 3 Detailed Module Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* CARD 02: ISU LINGKUNGAN KAMPUS (Accordion Dropdown) */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-2xs flex flex-col justify-between" id="kti-02">
                <div className="space-y-3">
                  {/* Top Graphic Header Card */}
                  <div className="w-full h-24 bg-gradient-to-tr from-slate-800 to-slate-900 rounded-xl flex items-center justify-center p-3 text-white relative overflow-hidden">
                    <ShieldAlert className="w-10 h-10 text-amber-400 opacity-80" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-300">Skor: 4.25</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Isu Lingkungan Kampus
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">Krisis Plastik & Karbon</h3>
                  </div>

                  {/* Accordion List */}
                  <div className="space-y-2 pt-1">
                    {ktiTopics[1].modules.map((m) => (
                      <div key={m.id} className="border border-slate-200 rounded-lg p-2.5 space-y-1.5 text-xs bg-slate-50/50">
                        <div 
                          onClick={() => setOpenAccordion(openAccordion === m.id ? null : m.id)}
                          className="flex items-center justify-between cursor-pointer font-bold text-slate-800 hover:text-purple-700 transition-colors"
                        >
                          <span>{m.num}. {m.title}</span>
                          {openAccordion === m.id ? <ChevronUp className="w-3.5 h-3.5 text-slate-400" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-400" />}
                        </div>
                        {openAccordion === m.id && (
                          <p className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-200/60 pt-1.5 mt-1">
                            {m.content}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                  Indikator KTI #02
                </div>
              </div>

              {/* CARD 03: KELANGKAAN SUMBER DAYA (Minimal Progress Bars) */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-2xs flex flex-col justify-between" id="kti-03">
                <div className="space-y-3">
                  <div className="w-full h-24 bg-gradient-to-tr from-emerald-700 to-teal-800 rounded-xl flex items-center justify-center p-3 text-white relative overflow-hidden">
                    <Droplet className="w-10 h-10 text-emerald-200 opacity-80" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-mono text-emerald-100">Skor: 4.22</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Kelangkaan Sumber Daya
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">Water & Energy Footprint</h3>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {ktiTopics[2].stats.map((st, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-semibold text-slate-700">
                          <span className="truncate">{st.name}</span>
                          <span className="font-mono text-purple-700">{st.usage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-purple-600 h-full rounded-full" style={{ width: `${st.usage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                  Indikator KTI #03
                </div>
              </div>

              {/* CARD 04: DAMPAK PRODUK & KONSUMSI (Linear Steps) */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-2xs flex flex-col justify-between" id="kti-04">
                <div className="space-y-3">
                  <div className="w-full h-24 bg-gradient-to-tr from-indigo-800 to-purple-900 rounded-xl flex items-center justify-center p-3 text-white relative overflow-hidden">
                    <BarChart2 className="w-10 h-10 text-purple-300 opacity-80" />
                    <span className="absolute bottom-2 left-3 text-[10px] font-mono text-purple-200">Skor: 4.17</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Dampak Konsumsi
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">Siklus Hidup Produk</h3>
                  </div>

                  <div className="space-y-2 pt-1">
                    {ktiTopics[3].flows.map((f, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <span className="font-mono font-bold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded text-[10px] shrink-0">{f.step}</span>
                        <div>
                          <p className="font-bold text-slate-800 text-[11px]">{f.title}</p>
                          <p className="text-[10px] text-slate-500 leading-tight">{f.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-mono pt-2 border-t border-slate-100">
                  Indikator KTI #04
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================================= */}
          {/* 6. ROADMAP LAYER FOOTER (Progress Tracker Bottom) */}
          {/* ========================================================================= */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3 shadow-2xs">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
              ECODAS LAYER PROGRESSION ROADMAP
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              {[
                { name: 'Layer 1: Awareness', active: true },
                { name: 'Layer 2: Feedback', active: false },
                { name: 'Layer 3: Behavior', active: false },
                { name: 'Layer 4: Collective', active: false },
                { name: 'Layer 5: Decision', active: false }
              ].map((layer, idx) => (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between transition-colors ${
                    layer.active 
                      ? 'border-purple-300 bg-purple-50/80 text-purple-900 font-bold shadow-2xs' 
                      : 'border-slate-200 bg-slate-50 text-slate-400'
                  }`}
                >
                  <span className="text-[11px] truncate">{layer.name}</span>
                  {layer.active ? <CheckCircle2 className="w-3.5 h-3.5 text-purple-700 shrink-0" /> : <Lock className="w-3 h-3 text-slate-300 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>

      {/* ========================================================================= */}
      {/* 7. FOOTER BOTTOM BAR (Copyright & Credit) */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200/80 py-3 px-6 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold text-[9px]">e</div>
          <span>ECODAS Platform © 2026 Universitas Negeri Yogyakarta</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-slate-600 transition-colors">Panduan Pengguna</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Metodologi KTI</a>
          <a href="#" className="hover:text-slate-600 transition-colors">Bantuan</a>
        </div>
      </footer>

    </div>
  );
}