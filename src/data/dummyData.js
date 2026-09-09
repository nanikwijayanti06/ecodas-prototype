// Data sementara buat prototipe.
// Nanti kalau backend sudah jadi, file ini tinggal diganti panggilan API.

export const rataRataKampus = 1.35;

export const modules = [
  {
    id: 1,
    kategori: 'KONSUMSI',
    judul: 'Dampak Konsumsi Produk Sehari-hari',
    prioritas: 'Medium',
    waktu: 5,
    deskripsi:
      'Modul edukasi mengenai dampak lingkungan dari aktivitas konsumsi mahasiswa, mulai dari makanan hingga penggunaan sumber daya kampus.',
  },
  {
    id: 2,
    kategori: 'SUMBER DAYA',
    judul: 'Krisis Sumber Daya',
    prioritas: 'High',
    waktu: 6,
    deskripsi:
      'Visualisasi keterbatasan sumber daya alam serta konsekuensi dari tingkat konsumsi yang berlebih.',
  },
  {
    id: 3,
    kategori: 'IKLIM',
    judul: 'Isu Lingkungan & Iklim',
    prioritas: 'High',
    waktu: 8,
    deskripsi:
      'Materi interaktif mengenai hubungan langsung antara konsumsi mahasiswa dengan perubahan iklim dan pemanasan global.',
  },
  {
    id: 4,
    kategori: 'KONSUMSI',
    judul: 'Alternatif Konsumsi Bijak',
    prioritas: 'High',
    waktu: 5,
    deskripsi:
      'Rekomendasi alternatif konsumsi yang lebih ramah lingkungan dalam kehidupan sehari-hari, mulai dari sekali pakai hingga transportasi.',
  },
  {
    id: 5,
    kategori: 'EDUKASI',
    judul: 'Literasi Greenwashing',
    prioritas: 'Supporting',
    waktu: 7,
    deskripsi:
      'Cara cerdas mengevaluasi produk dan menghindari manipulasi label ramah lingkungan dari perusahaan.',
  },
];

export const activityTypes = [
  { id: 'kemasan', label: 'Makanan & Kemasan Sekali Pakai', satuan: 'unit', faktor: 0.08 },
  { id: 'motor', label: 'Transportasi Motor', satuan: 'km', faktor: 0.12 },
  { id: 'listrik', label: 'Penggunaan Listrik', satuan: 'kWh', faktor: 0.7 },
  { id: 'air', label: 'Penggunaan Air', satuan: 'liter', faktor: 0.0003 },
];

export const saranHarian =
  'Pertimbangkan berjalan kaki, bersepeda, atau berbagi kendaraan untuk perjalanan tertentu.';

// urutan: Sen, Sel, Rab, Kam, Jum, Sab (dari mockup halaman tracker)
export const weeklyEmissions = [0.8, 0.8, 0.8, 0.63, 0.8, 0.4];
export const weekLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

export const badges = [
  { nama: 'Eco Starter', deskripsi: 'Memulai perjalanan konsumsi bijak', didapat: true },
  { nama: 'Reusable', deskripsi: 'Konsisten menggunakan barang ulang', didapat: true },
  { nama: 'Green Habit', deskripsi: 'Membangun kebiasaan berkelanjutan', didapat: false },
];

export const challenges = [
  {
    id: 1,
    judul: '7 Hari Tanpa Kantong Plastik',
    deskripsi: 'Bawa tas belanja sendiri setiap kali belanja di kantin atau minimarket kampus.',
    poin: 100,
    peserta: 118,
    status: 'ikut',
  },
  {
    id: 2,
    judul: 'Tumbler Challenge',
    deskripsi: 'Gunakan tumbler pribadi selama 5 hari kerja berturut-turut.',
    poin: 40,
    peserta: 95,
    progres: 60,
  },
  {
    id: 3,
    judul: 'Hemat Energi',
    deskripsi: 'Matikan lampu dan pengatur ruang saat ruangan tidak digunakan.',
    poin: 25,
    peserta: 47,
  },
];

// ---- data halaman collective intelligence (admin) ----
export const trendLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'];
export const trendData = [53, 56, 61, 66, 71, 74, 78];

export const facultyData = [
  { nama: 'FTI', nilai: 84 },
  { nama: 'FBS', nilai: 79 },
  { nama: 'FT', nilai: 75 },
  { nama: 'FE', nilai: 72 },
  { nama: 'FIK', nilai: 69 },
];

export const highImpact = [
  { rank: 1, judul: 'Penggunaan Barang Reusable', deskripsi: 'Penggunaan tumbler, kantong belanja, dan barang pakai ulang.', nilai: 82 },
  { rank: 2, judul: 'Transportasi Berkelanjutan', deskripsi: 'Pemanfaatan transportasi umum, berjalan kaki, atau bersepeda.', nilai: 74 },
  { rank: 3, judul: 'Pengurangan Sampah', deskripsi: 'Praktik mengurangi penggunaan produk dan kemasan sekali pakai.', nilai: 68 },
];

export const sustainabilityPerf = [
  { label: 'Behavior Change', value: 78 },
  { label: 'Awareness', value: 84 },
  { label: 'Participation', value: 72 },
  { label: 'Carbon Reduction', value: 69 },
];

// ---- data halaman decision support (admin) ----
export const recommendations = [
  {
    id: 1,
    prioritas: 'High',
    kategori: 'Transportasi',
    judul: 'Dorong Penggunaan Transportasi Bersama',
    deskripsi:
      'Aktivitas transportasi harian mahasiswa memberikan kontribusi signifikan terhadap jejak karbon. Perubahan kecil pada pola transportasi dapat memberikan dampak besar.',
    tindakan:
      'Gunakan transportasi umum, berjalan kaki, bersepeda, atau berbagi kendaraan dengan teman sekelas.',
    dampak: 'Tinggi',
  },
  {
    id: 2,
    prioritas: 'Medium',
    kategori: 'Konsumsi',
    judul: 'Kurangi Produk Sekali Pakai',
    deskripsi:
      'Sampah plastik dan kemasan sekali pakai masih menjadi masalah utama di lingkungan kampus.',
    tindakan:
      'Bawa tumbler, tempat makan, dan peralatan makan sendiri. Manfaatkan fasilitas isi ulang air minum.',
    dampak: 'Sedang',
  },
  {
    id: 3,
    prioritas: 'Supporting',
    kategori: 'Perilaku',
    judul: 'Konsistensi Perilaku Ramah Lingkungan',
    deskripsi:
      'Perubahan perilaku yang dilakukan secara konsisten akan membentuk kebiasaan baik yang berkelanjutan.',
    tindakan:
      'Pertahankan kebiasaan positif dan ajak teman untuk melakukan hal serupa.',
    dampak: 'Pendukung',
  },
];
