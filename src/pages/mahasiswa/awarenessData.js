import { Leaf, CloudSun, Droplets, Recycle } from "lucide-react";

export const awarenessAreas = [
  {
    id: "01",
    title: "Alternatif Konsumsi Berkelanjutan",
    priority: "High",
    icon: Leaf,

    description:
      "Mengenali pilihan konsumsi yang dapat diterapkan dalam aktivitas sehari-hari mahasiswa.",

    topics: [
      {
        title: "Tumbler & Thinwall",
        description:
          "Penggunaan wadah yang dapat digunakan kembali sebagai alternatif dalam aktivitas konsumsi.",
      },
      {
        title: "Transportasi Mikro",
        description:
          "Alternatif mobilitas mahasiswa yang dapat dipertimbangkan dalam aktivitas sehari-hari.",
      },
      {
        title: "Zero Food Waste",
        description:
          "Hubungan antara keputusan konsumsi makanan dengan potensi pemborosan pangan.",
      },
      {
        title: "Digital & Paperless",
        description:
          "Alternatif digital dalam aktivitas akademik yang berkaitan dengan penggunaan kertas.",
      },
    ],
  },

  {
    id: "02",
    title: "Isu Lingkungan & Iklim",
    priority: "High",
    icon: CloudSun,

    description:
      "Memahami persoalan lingkungan dan iklim yang berkaitan dengan aktivitas konsumsi.",

    topics: [
      {
        title: "Krisis Sampah Plastik Sekali Pakai",
        description:
          "Memahami persoalan sampah yang berkaitan dengan penggunaan produk plastik sekali pakai.",
      },
      {
        title: "Pemanasan Global",
        description:
          "Mengenali hubungan antara aktivitas manusia, konsumsi, dan perubahan iklim.",
      },
      {
        title: "Jejak Karbon Mahasiswa",
        description:
          "Mengenali bahwa aktivitas konsumsi sehari-hari dapat berkaitan dengan terbentuknya jejak karbon.",
      },
    ],
  },

  {
    id: "03",
    title: "Kelangkaan Sumber Daya",
    priority: "High",
    icon: Droplets,

    description:
      "Memahami bahwa setiap produk dan aktivitas konsumsi membutuhkan sumber daya yang terbatas.",

    topics: [
      {
        title: "Water Footprint",
        description:
          "Mengenali penggunaan air yang berkaitan dengan aktivitas dan konsumsi.",
      },
      {
        title: "Energi Fosil Kampus",
        description:
          "Memahami penggunaan energi dalam aktivitas dan fasilitas kampus.",
      },
      {
        title: "Bahan Baku & Hutan",
        description:
          "Mengenali hubungan antara kebutuhan bahan baku dan sumber daya alam.",
      },
    ],
  },

  {
    id: "04",
    title: "Dampak Produk & Aktivitas Konsumsi",
    priority: "Medium",
    icon: Recycle,

    description:
      "Melihat hubungan antara keputusan konsumsi, proses produksi, distribusi, hingga terbentuknya limbah.",

    topics: [
      {
        title: "Keputusan Konsumsi",
        description:
          "Memahami keputusan memilih dan menggunakan produk sebagai bagian dari rangkaian dampak konsumsi.",
      },
      {
        title: "Ekstraksi & Industri",
        description:
          "Melihat pengambilan bahan dan aktivitas industri sebagai bagian dari perjalanan produk.",
      },
      {
        title: "Jejak Logistik",
        description:
          "Mengenali distribusi dan perpindahan produk sebagai bagian dari siklus konsumsi.",
      },
      {
        title: "Akumulasi Limbah",
        description:
          "Memahami bahwa produk yang telah digunakan dapat berakhir menjadi limbah.",
      },
    ],

    lifecycle: [
      "Keputusan Konsumsi",
      "Ekstraksi & Industri",
      "Jejak Logistik",
      "Akumulasi Limbah",
    ],
  },
];

/* =========================================================
   GREENWASHING
========================================================= */

export const greenwashingContent = {
  label: "Critical literacy",

  title: "Greenwashing",

  description:
    "Mengenali dan mengevaluasi klaim keberlanjutan suatu produk secara kritis.",

  introduction:
    "Tidak semua produk yang terlihat ramah lingkungan benar-benar memiliki dampak lingkungan yang rendah. Mahasiswa perlu memahami bagaimana klaim keberlanjutan dapat digunakan dalam komunikasi produk.",

  points: [
    {
      title: "Periksa klaim",
      description:
        "Jangan langsung menerima istilah seperti eco-friendly, natural, atau sustainable tanpa melihat informasi pendukung.",
    },

    {
      title: "Cari bukti",
      description:
        "Perhatikan informasi mengenai bahan, proses produksi, penggunaan, dan pengelolaan produk setelah digunakan.",
    },

    {
      title: "Lihat keseluruhan dampak",
      description:
        "Sebuah produk dapat memiliki satu aspek yang lebih baik bagi lingkungan, tetapi tetap memiliki dampak pada tahap produksi, distribusi, atau pembuangan.",
    },
  ],

  checklist: [
    "Apakah klaim lingkungan dijelaskan dengan jelas?",
    "Apakah terdapat informasi atau bukti yang mendukung klaim?",
    "Apakah hanya satu aspek produk yang ditonjolkan?",
    "Apakah dampak produk dari awal hingga akhir ikut dipertimbangkan?",
  ],
};

/* =========================================================
   INTERACTIVE AWARENESS SCENARIOS
========================================================= */

export const awarenessScenarios = [
  {
    id: 1,

    category: "Alternatif konsumsi",

    question:
      "Kamu membeli minuman saat berada di kampus. Pilihan mana yang merupakan alternatif konsumsi yang lebih berkelanjutan?",

    options: [
      "Menggunakan botol sekali pakai setiap kali membeli minuman",
      "Membawa tumbler pribadi",
      "Membeli botol baru meskipun sudah memiliki wadah",
    ],

    answer: 1,

    explanation:
      "Membawa tumbler pribadi merupakan contoh alternatif konsumsi yang dapat mengurangi penggunaan wadah sekali pakai.",
  },

  {
    id: 2,

    category: "Alternatif konsumsi",

    question:
      "Saat membeli makanan di kampus, pilihan mana yang paling berkaitan dengan upaya mengurangi food waste?",

    options: [
      "Memilih porsi sesuai kebutuhan",
      "Selalu memilih porsi terbesar",
      "Membeli makanan lebih banyak dari kebutuhan",
    ],

    answer: 0,

    explanation:
      "Memilih porsi sesuai kebutuhan membantu menghindari konsumsi makanan yang berlebihan.",
  },

  {
    id: 3,

    category: "Lingkungan & iklim",

    question:
      "Mengapa penggunaan produk sekali pakai perlu diperhatikan dalam konteks konsumsi berkelanjutan?",

    options: [
      "Karena penggunaannya dapat berkaitan dengan timbulan sampah",
      "Karena semua produk sekali pakai pasti tidak memiliki manfaat",
      "Karena semua produk sekali pakai memiliki dampak yang sama",
    ],

    answer: 0,

    explanation:
      "Penggunaan produk sekali pakai berkaitan dengan persoalan sampah sehingga menjadi salah satu isu yang perlu dipahami.",
  },

  {
    id: 4,

    category: "Kelangkaan sumber daya",

    question:
      "Apa yang perlu dipahami ketika membahas kelangkaan sumber daya dalam aktivitas konsumsi?",

    options: [
      "Produk tidak membutuhkan sumber daya jika sudah tersedia di toko",
      "Setiap produk dan aktivitas konsumsi berkaitan dengan penggunaan sumber daya",
      "Sumber daya hanya digunakan pada produk makanan",
    ],

    answer: 1,

    explanation:
      "Produk dan aktivitas konsumsi membutuhkan sumber daya sehingga penggunaannya perlu dipahami dalam konteks keberlanjutan.",
  },

  {
    id: 5,

    category: "Dampak konsumsi",

    question:
      "Bagaimana cara melihat dampak sebuah produk secara lebih menyeluruh?",

    options: [
      "Hanya melihat produk ketika sudah berada di tangan konsumen",
      "Melihat rangkaian dari keputusan konsumsi hingga terbentuknya limbah",
      "Hanya melihat kemasan produk",
    ],

    answer: 1,

    explanation:
      "Dampak konsumsi dapat dilihat melalui rangkaian keputusan konsumsi, ekstraksi dan industri, logistik, hingga akumulasi limbah.",
  },
];
