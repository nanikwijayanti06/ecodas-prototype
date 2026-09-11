import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bus,
  Check,
  ChevronRight,
  CircleHelp,
  Leaf,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Utensils,
  X,
  Zap,
} from "lucide-react";
import "./mahasiswa.css";

const categoryData = [
  {
    id: "Makanan",
    label: "Makanan",
    image: "/assets/tracker-food.png",
    icon: Utensils,
    description: "Pilihan makanan dan penggunaan kemasan.",
  },
  {
    id: "Transportasi",
    label: "Transportasi",
    image: "/assets/tracker-transport.png",
    icon: Bus,
    description: "Perjalanan dan pilihan moda transportasi.",
  },
  {
    id: "Plastik",
    label: "Plastik",
    image: "/assets/tracker-plastic.png",
    icon: ShoppingBag,
    description: "Penggunaan produk sekali pakai.",
  },
  {
    id: "Energi",
    label: "Energi",
    image: "/assets/tracker-energy.png",
    icon: Zap,
    description: "Penggunaan listrik dan perangkat.",
  },
];

const initialActivities = [
  {
    id: 1,
    date: "10 Sep",
    day: "Hari ini",
    category: "Transportasi",
    activity: "Berjalan kaki ke kampus",
    impact: 1.8,
    image: "/assets/tracker-transport.png",
    status: true,
    detail:
      "Berjalan kaki membantu mengurangi penggunaan kendaraan bermotor untuk perjalanan jarak dekat.",
  },
  {
    id: 2,
    date: "10 Sep",
    day: "Hari ini",
    category: "Makanan",
    activity: "Membawa bekal",
    impact: 0.7,
    image: "/assets/tracker-food.png",
    status: true,
    detail:
      "Membawa bekal dapat mengurangi penggunaan kemasan makanan sekali pakai.",
  },
  {
    id: 3,
    date: "9 Sep",
    day: "Kemarin",
    category: "Plastik",
    activity: "Menggunakan tumbler",
    impact: 0.5,
    image: "/assets/tracker-plastic.png",
    status: true,
    detail:
      "Penggunaan tumbler merupakan alternatif terhadap pembelian minuman dalam kemasan sekali pakai.",
  },
  {
    id: 4,
    date: "9 Sep",
    day: "Kemarin",
    category: "Transportasi",
    activity: "Menggunakan transportasi umum",
    impact: 2.1,
    image: "/assets/tracker-transport.png",
    status: true,
    detail:
      "Transportasi umum dapat menjadi alternatif penggunaan kendaraan pribadi.",
  },
  {
    id: 5,
    date: "8 Sep",
    day: "Selasa",
    category: "Energi",
    activity: "Mematikan perangkat setelah digunakan",
    impact: 0.4,
    image: "/assets/tracker-energy.png",
    status: true,
    detail:
      "Mematikan perangkat setelah digunakan membantu mengurangi konsumsi energi yang tidak diperlukan.",
  },
  {
    id: 6,
    date: "8 Sep",
    day: "Selasa",
    category: "Makanan",
    activity: "Memilih makanan dengan kemasan minimal",
    impact: 0.8,
    image: "/assets/tracker-food.png",
    status: true,
    detail:
      "Memilih produk dengan kemasan minimal dapat membantu mengurangi penggunaan material.",
  },
];

const chart7 = [
  { label: "4", day: "Sen", value: 2.3 },
  { label: "5", day: "Sel", value: 1.2 },
  { label: "6", day: "Rab", value: 2.8 },
  { label: "7", day: "Kam", value: 1.5 },
  { label: "8", day: "Jum", value: 2.2 },
  { label: "9", day: "Sab", value: 1.1 },
  { label: "10", day: "Min", value: 2.5 },
];

const chart30 = [
  { label: "12", day: "Agu", value: 1.8 },
  { label: "15", day: "Agu", value: 2.6 },
  { label: "18", day: "Agu", value: 1.4 },
  { label: "21", day: "Agu", value: 3.1 },
  { label: "24", day: "Agu", value: 2.0 },
  { label: "27", day: "Agu", value: 2.8 },
  { label: "30", day: "Agu", value: 1.6 },
  { label: "2", day: "Sep", value: 2.4 },
  { label: "5", day: "Sep", value: 1.7 },
  { label: "10", day: "Sep", value: 2.5 },
];

function ImageWithFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`${className} image-fallback`}>
        <Leaf size={24} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

export default function L2_Tracker() {
  const [activities, setActivities] = useState(initialActivities);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedActivity, setSelectedActivity] = useState(
    initialActivities[0],
  );
  const [period, setPeriod] = useState("7");
  const [selectedChartDay, setSelectedChartDay] = useState(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [newActivity, setNewActivity] = useState({
    activity: "",
    category: "Makanan",
    impact: "",
  });

  const chartData = period === "7" ? chart7 : chart30;

  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      const categoryMatch =
        selectedCategory === "Semua" || item.category === selectedCategory;

      const searchMatch = item.activity
        .toLowerCase()
        .includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activities, selectedCategory, search]);

  const totalImpact = activities.reduce(
    (total, item) => total + item.impact,
    0,
  );

  const completed = activities.filter((item) => item.status).length;

  const progress = Math.min(Math.round((completed / 8) * 100), 100);

  const categoryImpact = categoryData.map((category) => {
    const value = activities
      .filter((item) => item.category === category.id)
      .reduce((sum, item) => sum + item.impact, 0);

    return {
      ...category,
      value,
    };
  });

  const handleToggle = (id) => {
    setActivities((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item,
      ),
    );
  };

  const handleAddActivity = (event) => {
    event.preventDefault();

    if (!newActivity.activity.trim()) return;

    const category = categoryData.find(
      (item) => item.id === newActivity.category,
    );

    const item = {
      id: Date.now(),
      date: "10 Sep",
      day: "Hari ini",
      category: newActivity.category,
      activity: newActivity.activity,
      impact: Number(newActivity.impact) || 0,
      image: category?.image,
      status: true,
      detail: "Aktivitas baru yang kamu catat melalui Eco Tracker.",
    };

    setActivities((current) => [item, ...current]);
    setSelectedActivity(item);

    setNewActivity({
      activity: "",
      category: "Makanan",
      impact: "",
    });

    setModalOpen(false);
  };

  return (
    <div className="l2-page">
      {/* TOP BAR */}
      <div className="l2-topbar">
        <div className="l2-brand">
          <div className="l2-brand-mark">
            <Leaf size={17} />
          </div>

          <div>
            <strong>ECODAS</strong>
            <span>Eco Consumption Decision Support</span>
          </div>
        </div>

        <div className="l2-user">
          <div className="l2-user-avatar">NW</div>

          <div>
            <strong>Nanik Wijayanti</strong>
            <span>Mahasiswa UNY</span>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="l2-header">
        <div>
          <div className="l2-breadcrumb">
            <ChevronRight size={13} />
          </div>

          <div className="l2-title-row">
            <div>
              <h1>Feedback Mechanism</h1>

              <p>
                Kenali dampak dari pilihan konsumsi dan lihat perubahan
                kebiasaanmu dari waktu ke waktu.
              </p>
            </div>
          </div>
        </div>

        <button className="l2-add-button" onClick={() => setModalOpen(true)}>
          <Plus size={17} />
          Catat aktivitas
        </button>
      </header>

      {/* HERO / IMPACT STRIP */}
      <section className="l2-impact-hero">
        <div className="l2-impact-copy">
          <span className="l2-eyebrow">YOUR CONSUMPTION IMPACT</span>

          <h2>
            Pilihan kecil,
            <br />
            terlihat dampaknya.
          </h2>

          <p>
            Catatan konsumsi membantu kamu melihat pola aktivitas dan memahami
            dampaknya terhadap lingkungan.
          </p>

          <div className="l2-impact-number">
            <strong>{totalImpact.toFixed(1)}</strong>
            <span>kg CO₂e</span>
          </div>

          <div className="l2-comparison">
            <ArrowDownRight size={16} />
            <strong>18%</strong>
            <span>lebih rendah dari periode sebelumnya</span>
          </div>
        </div>

        <div className="l2-impact-visual">
          <ImageWithFallback
            src="/assets/tracker-impact.png"
            alt="Environmental impact"
            className="l2-impact-image"
          />

          <div className="l2-floating-label">
            <Leaf size={15} />
            <span>Environmental Impact</span>
          </div>
        </div>
      </section>

      {/* CATEGORY */}
      <section className="l2-section">
        <div className="l2-section-heading">
          <div>
            <span>01 / IMPACT BY CATEGORY</span>
            <h2>Dari mana dampaknya berasal?</h2>
          </div>

          <p>
            Pilih kategori untuk melihat aktivitas yang berkontribusi pada
            catatanmu.
          </p>
        </div>

        <div className="l2-category-grid">
          {categoryImpact.map((category) => {
            const Icon = category.icon;

            const active = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                className={`l2-category-card ${active ? "active" : ""}`}
                onClick={() =>
                  setSelectedCategory(active ? "Semua" : category.id)
                }
              >
                <ImageWithFallback
                  src={category.image}
                  alt={category.label}
                  className="l2-category-image"
                />

                <div className="l2-category-overlay" />

                <div className="l2-category-content">
                  <div className="l2-category-icon">
                    <Icon size={17} />
                  </div>

                  <div>
                    <strong>{category.label}</strong>

                    <span>{category.description}</span>
                  </div>

                  <div className="l2-category-value">
                    {category.value.toFixed(1)}
                    <small>kg</small>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <button
          className={`l2-all-category ${
            selectedCategory === "Semua" ? "active" : ""
          }`}
          onClick={() => setSelectedCategory("Semua")}
        >
          <span>Semua aktivitas</span>
          <ChevronRight size={15} />
        </button>
      </section>

      {/* PROGRESS + CHART */}
      <section className="l2-analysis-grid">
        <div className="l2-progress-panel">
          <div className="l2-panel-label">
            <span>02 / PROGRESS MONITORING</span>
            <BarChart3 size={17} />
          </div>

          <h2>Perubahan kebiasaan</h2>

          <p>
            Pantau aktivitas konsumsi yang sudah kamu catat dalam periode ini.
          </p>

          <div className="l2-big-progress">
            <strong>{progress}%</strong>
            <span>aktivitas tercatat</span>
          </div>

          <div className="l2-progress-line">
            <span style={{ width: `${progress}%` }} />
          </div>

          <div className="l2-progress-meta">
            <span>{completed} aktivitas</span>
            <span>Target 8 aktivitas</span>
          </div>

          <div className="l2-progress-note">
            <Leaf size={15} />

            <span>
              Konsistensi pencatatan membantu sistem mengenali pola konsumsi
              kamu.
            </span>
          </div>
        </div>

        <div className="l2-chart-panel">
          <div className="l2-chart-header">
            <div>
              <span>03 / CONSUMPTION TREND</span>
              <h2>Aktivitas dari waktu ke waktu</h2>
            </div>

            <div className="l2-period">
              <button
                className={period === "7" ? "active" : ""}
                onClick={() => setPeriod("7")}
              >
                7 hari
              </button>

              <button
                className={period === "30" ? "active" : ""}
                onClick={() => setPeriod("30")}
              >
                30 hari
              </button>
            </div>
          </div>

          <div className="l2-chart">
            <div className="l2-chart-y">
              <span>4</span>
              <span>3</span>
              <span>2</span>
              <span>1</span>
              <span>0</span>
            </div>

            <div className="l2-chart-body">
              <div className="l2-chart-lines">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>

              <div className="l2-bars">
                {chartData.map((item) => {
                  const height = (item.value / 4) * 100;

                  const active = selectedChartDay === item.day;

                  return (
                    <button
                      key={`${item.day}-${item.label}`}
                      className={`l2-bar-column ${active ? "selected" : ""}`}
                      onClick={() =>
                        setSelectedChartDay(active ? null : item.day)
                      }
                    >
                      <span className="l2-bar-tooltip">
                        {item.value} kg CO₂e
                      </span>

                      <div
                        className="l2-bar"
                        style={{
                          height: `${height}%`,
                        }}
                      />

                      <small>{item.day}</small>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="l2-chart-caption">
            <span>
              <i />
              Estimasi dampak aktivitas
            </span>

            <span>Klik batang untuk melihat hari</span>
          </div>
        </div>
      </section>

      {/* ACTIVITY */}
      <section className="l2-activity-section">
        <div className="l2-activity-heading">
          <div>
            <span>04 / ACTIVITY LOG</span>
            <h2>Aktivitas konsumsi</h2>
          </div>

          <div className="l2-activity-tools">
            <div className="l2-search">
              <Search size={15} />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari aktivitas"
              />
            </div>

            <button className="l2-filter">
              <SlidersHorizontal size={15} />
              Filter
            </button>
          </div>
        </div>

        <div className="l2-filter-tabs">
          <button
            className={selectedCategory === "Semua" ? "active" : ""}
            onClick={() => setSelectedCategory("Semua")}
          >
            Semua
          </button>

          {categoryData.map((category) => (
            <button
              key={category.id}
              className={selectedCategory === category.id ? "active" : ""}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="l2-activity-list">
          {filteredActivities.map((item) => (
            <button
              key={item.id}
              className={`l2-activity-row ${
                selectedActivity?.id === item.id ? "selected" : ""
              }`}
              onClick={() => setSelectedActivity(item)}
            >
              <span
                className={`l2-check ${item.status ? "checked" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleToggle(item.id);
                }}
              >
                {item.status && <Check size={12} />}
              </span>

              <ImageWithFallback
                src={item.image}
                alt={item.activity}
                className="l2-activity-image"
              />

              <span className="l2-activity-info">
                <strong>{item.activity}</strong>

                <small>
                  {item.category} · {item.day}
                </small>
              </span>

              <span className="l2-activity-impact">
                <strong>{item.impact.toFixed(1)}</strong>

                <small>kg CO₂e</small>
              </span>

              <ChevronRight className="l2-activity-chevron" size={17} />
            </button>
          ))}

          {filteredActivities.length === 0 && (
            <div className="l2-empty">
              <Search size={22} />
              <strong>Aktivitas tidak ditemukan</strong>
              <span>Coba gunakan kata pencarian lain.</span>
            </div>
          )}
        </div>
      </section>

      {/* FEEDBACK */}
      <section className="l2-feedback">
        <div className="l2-feedback-visual">
          <ImageWithFallback
            src="/assets/tracker-impact.png"
            alt="Feedback"
            className="l2-feedback-image"
          />
        </div>

        <div className="l2-feedback-content">
          <span>05 / ACTIONABLE FEEDBACK</span>

          <h2>Apa yang bisa kamu lakukan berikutnya?</h2>

          <p>
            Berdasarkan aktivitas yang kamu catat, transportasi menjadi salah
            satu kontribusi terbesar pada periode ini.
          </p>

          <div className="l2-feedback-action">
            <div className="l2-feedback-icon">
              <Bus size={18} />
            </div>

            <div>
              <strong>Pertimbangkan alternatif perjalanan</strong>

              <span>
                Untuk perjalanan jarak dekat, coba berjalan kaki atau gunakan
                transportasi umum.
              </span>
            </div>

            <ArrowUpRight size={17} />
          </div>
        </div>
      </section>

      {/* COMPARATIVE FEEDBACK */}
      <section className="l2-comparison-section">
        <div>
          <span>06 / COMPARATIVE FEEDBACK</span>

          <h2>Lihat perubahan, bukan sekadar angka.</h2>
        </div>

        <div className="l2-comparison-stats">
          <div>
            <span>Minggu ini</span>
            <strong>6.4</strong>
            <small>kg CO₂e</small>
          </div>

          <div className="l2-comparison-arrow">
            <ArrowDownRight size={18} />
          </div>

          <div>
            <span>Minggu sebelumnya</span>
            <strong>7.8</strong>
            <small>kg CO₂e</small>
          </div>

          <div className="l2-comparison-change">
            <strong>−18%</strong>
            <span>perubahan</span>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalOpen && (
        <div
          className="l2-modal-overlay"
          onMouseDown={() => setModalOpen(false)}
        >
          <div
            className="l2-modal"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="l2-modal-header">
              <div>
                <span>NEW ACTIVITY</span>
                <h2>Catat aktivitas</h2>
                <p>Tambahkan aktivitas konsumsi yang baru kamu lakukan.</p>
              </div>

              <button onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddActivity}>
              <label>
                Aktivitas
                <input
                  autoFocus
                  value={newActivity.activity}
                  onChange={(event) =>
                    setNewActivity({
                      ...newActivity,
                      activity: event.target.value,
                    })
                  }
                  placeholder="Contoh: Membawa botol minum sendiri"
                />
              </label>

              <label>
                Kategori
                <div className="l2-modal-categories">
                  {categoryData.map((category) => {
                    const Icon = category.icon;

                    return (
                      <button
                        type="button"
                        key={category.id}
                        className={
                          newActivity.category === category.id ? "active" : ""
                        }
                        onClick={() =>
                          setNewActivity({
                            ...newActivity,
                            category: category.id,
                          })
                        }
                      >
                        <Icon size={16} />
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </label>

              <label>
                Estimasi dampak
                <div className="l2-impact-input">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={newActivity.impact}
                    onChange={(event) =>
                      setNewActivity({
                        ...newActivity,
                        impact: event.target.value,
                      })
                    }
                    placeholder="0.0"
                  />

                  <span>kg CO₂e</span>
                </div>
                <small>
                  Gunakan nilai estimasi yang digunakan dalam metode perhitungan
                  sistem.
                </small>
              </label>

              <div className="l2-modal-actions">
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setModalOpen(false)}
                >
                  Batal
                </button>

                <button type="submit" className="save">
                  <Plus size={16} />
                  Simpan aktivitas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
