export const trackerActivities = [
  {
    id: 1,
    category: "Consumption",
    title: "Membawa tumbler",
    description: "Menggunakan wadah minum yang dapat digunakan kembali.",
    impact: "Mengurangi penggunaan botol sekali pakai.",
    action: "Pertahankan penggunaan tumbler saat membeli minuman.",
    type: "positive",
  },

  {
    id: 2,
    category: "Mobility",
    title: "Berjalan kaki atau bersepeda",
    description: "Menggunakan mobilitas aktif untuk perjalanan jarak dekat.",
    impact: "Mengurangi kebutuhan perjalanan menggunakan kendaraan bermotor.",
    action:
      "Pertimbangkan berjalan kaki atau bersepeda untuk perjalanan dekat.",
    type: "positive",
  },

  {
    id: 3,
    category: "Food",
    title: "Membawa wadah makanan",
    description: "Menggunakan wadah pribadi ketika membeli makanan.",
    impact: "Mengurangi kebutuhan wadah makanan sekali pakai.",
    action: "Bawa wadah saat memperkirakan akan membeli makanan.",
    type: "positive",
  },

  {
    id: 4,
    category: "Paper",
    title: "Menggunakan dokumen digital",
    description:
      "Menggunakan LMS atau dokumen digital untuk aktivitas akademik.",
    impact: "Mengurangi kebutuhan penggunaan kertas.",
    action: "Gunakan dokumen digital jika pencetakan tidak diperlukan.",
    type: "positive",
  },

  {
    id: 5,
    category: "Energy",
    title: "Mematikan lampu dan AC",
    description: "Mematikan perangkat ketika ruang tidak lagi digunakan.",
    impact: "Membantu mengurangi penggunaan energi.",
    action: "Periksa lampu dan AC sebelum meninggalkan ruang.",
    type: "positive",
  },

  {
    id: 6,
    category: "Consumption",
    title: "Menghindari pembelian yang tidak diperlukan",
    description: "Mempertimbangkan kebutuhan sebelum membeli suatu produk.",
    impact: "Mengurangi konsumsi produk yang tidak diperlukan.",
    action: "Tunda pembelian dan pertimbangkan kembali kebutuhan produk.",
    type: "positive",
  },
];

/*
  Data aktivitas yang sudah dilakukan pengguna.
  Nantinya bisa diganti dengan database/API.
*/
export const initialCompletedActivities = [1, 2, 4];

/*
  Feedback utama yang ditampilkan ketika
  pengguna menyelesaikan aktivitas.
*/
export const feedbackMessages = {
  default: {
    label: "Your feedback",
    title: "Pilihanmu tercatat.",
    description:
      "Aktivitas yang kamu lakukan akan digunakan untuk melihat perkembangan perilaku konsumsi.",
  },

  completed: {
    label: "Environmental impact",
    title: "Satu tindakan berkelanjutan tercatat.",
    description:
      "Perubahan kecil dalam aktivitas sehari-hari dapat membantu mengurangi penggunaan sumber daya dan timbulan dampak lingkungan.",
  },
};

/*
  Rekomendasi tindakan.
*/
export const recommendations = [
  {
    id: 1,
    title: "Bawa kembali wadah yang sudah digunakan.",
    description:
      "Siapkan tumbler atau wadah makanan sebelum beraktivitas di kampus.",
    category: "Consumption",
  },

  {
    id: 2,
    title: "Pilih mobilitas aktif untuk jarak dekat.",
    description:
      "Jika jaraknya memungkinkan, pertimbangkan berjalan kaki atau bersepeda.",
    category: "Mobility",
  },

  {
    id: 3,
    title: "Periksa kebutuhan sebelum membeli.",
    description:
      "Pertimbangkan apakah produk benar-benar diperlukan sebelum melakukan pembelian.",
    category: "Consumption",
  },
];

/*
  Data perkembangan mingguan.
  Ini contoh struktur UI.
  Nantinya dapat dihubungkan dengan data pengguna.
*/
export const weeklyProgress = [
  {
    day: "Sen",
    completed: 2,
  },
  {
    day: "Sel",
    completed: 3,
  },
  {
    day: "Rab",
    completed: 2,
  },
  {
    day: "Kam",
    completed: 4,
  },
  {
    day: "Jum",
    completed: 3,
  },
  {
    day: "Sab",
    completed: 2,
  },
  {
    day: "Min",
    completed: 0,
  },
];
