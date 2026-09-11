// dashboardData.js
// Data default untuk Dashboard Mahasiswa ECODAS.
// Data ini hanya fallback. Setelah user melakukan aktivitas,
// data akan disimpan di localStorage browser.

export const DEFAULT_AWARENESS = {
  "01": {
    title: "Alternatif Konsumsi Berkelanjutan",
    completed: true,
  },
  "02": {
    title: "Isu Lingkungan & Iklim",
    completed: true,
  },
  "03": {
    title: "Kelangkaan Sumber Daya",
    completed: false,
  },
  "04": {
    title: "Dampak Produk & Aktivitas Konsumsi",
    completed: false,
  },
};

export const DEFAULT_ACTIVITIES = [
  {
    id: 1,
    date: "2026-09-10",
    category: "Makanan",
    activity: "Membawa bekal ke kampus",
    impact: 0.2,
    status: "Tervalidasi",
    note: "Mengurangi pembelian makanan dengan kemasan sekali pakai.",
    evidence: null,
  },
  {
    id: 2,
    date: "2026-09-09",
    category: "Digital",
    activity: "Mengumpulkan tugas tanpa mencetak",
    impact: 0.5,
    status: "Tervalidasi",
    note: "Menggunakan dokumen digital untuk pengumpulan tugas.",
    evidence: null,
  },
  {
    id: 3,
    date: "2026-09-08",
    category: "Transportasi",
    activity: "Menggunakan transportasi umum",
    impact: 1.2,
    status: "Menunggu",
    note: "Menggunakan TransJogja untuk perjalanan ke kampus.",
    evidence: null,
  },
];

export const DEFAULT_HABITS = [
  {
    id: 1,
    name: "Membawa tumbler",
    category: "Konsumsi",
    progress: 75,
    target: "5 hari/minggu",
    current: "4 hari",
    active: true,
  },
  {
    id: 2,
    name: "Mengurangi plastik sekali pakai",
    category: "Plastik",
    progress: 60,
    target: "5 aksi/minggu",
    current: "3 aksi",
    active: true,
  },
  {
    id: 3,
    name: "Menggunakan transportasi umum",
    category: "Transportasi",
    progress: 40,
    target: "3 kali/minggu",
    current: "1 kali",
    active: true,
  },
];

export const CATEGORIES = [
  "Semua",
  "Makanan",
  "Transportasi",
  "Plastik",
  "Energi",
  "Digital",
  "Konsumsi",
];

export const PERIODS = [
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
    label: "Semua",
  },
];

export const STORAGE_KEYS = {
  awareness: "ecodas_awareness_progress",
  activities: "ecodas_activities",
  habits: "ecodas_behavior_habits",
};
