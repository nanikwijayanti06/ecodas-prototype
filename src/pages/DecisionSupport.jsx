import React, { useState } from "react";
import "./DecisionSupport.css";

const DecisionSupport = () => {
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [expandedId, setExpandedId] = useState(null);

  const recommendations = [
    {
      id: 1,
      priority: "High",
      category: "Transportasi",
      title: "Dorong Penggunaan Transportasi Bersama",
      description:
        "Aktivitas transportasi harian mahasiswa memberikan kontribusi signifikan terhadap jejak karbon. Perubahan kecil pada pola transportasi dapat memberikan dampak besar.",
      action:
        "Gunakan transportasi umum, berjalan kaki, bersepeda, atau berbagi kendaraan dengan teman sekelas.",
      impact: "Tinggi",
    },
    {
      id: 2,
      priority: "High",
      category: "Energi",
      title: "Efisiensi Penggunaan Energi Listrik",
      description:
        "Penggunaan listrik dan pendingin ruangan yang berlebihan menjadi salah satu penyumbang terbesar konsumsi energi di kampus.",
      action:
        "Matikan lampu, perangkat elektronik, dan AC ketika ruangan tidak digunakan atau saat jam istirahat.",
      impact: "Tinggi",
    },
    {
      id: 3,
      priority: "Medium",
      category: "Konsumsi",
      title: "Kurangi Produk Sekali Pakai",
      description:
        "Sampah plastik dan kemasan sekali pakai masih menjadi masalah utama di lingkungan kampus.",
      action:
        "Bawa tumbler, tempat makan, dan peralatan makan sendiri. Manfaatkan fasilitas isi ulang air minum.",
      impact: "Sedang",
    },
    {
      id: 4,
      priority: "Supporting",
      category: "Perilaku",
      title: "Konsistensi Perilaku Ramah Lingkungan",
      description:
        "Perubahan perilaku yang dilakukan secara konsisten akan membentuk kebiasaan baru yang berkelanjutan.",
      action:
        "Pertahankan kebiasaan positif dan ajak teman-teman untuk melakukan hal serupa.",
      impact: "Pendukung",
    },
  ];

  const filteredRecommendations =
    selectedPriority === "all"
      ? recommendations
      : recommendations.filter((item) => item.priority === selectedPriority);

  return (
    <div className="ds-container">
      {/* Header */}
      <div className="ds-header">
        <div className="ds-breadcrumb">ECODAS / Decision Support</div>
        <h1 className="ds-title">Dukungan Pengambilan Keputusan</h1>
        <p className="ds-subtitle">
          Rekomendasi tindakan berdasarkan pola aktivitas dan perilaku
          keberlanjutan mahasiswa.
        </p>
        <div className="ds-meta">
          <span>4 Rekomendasi Tersedia</span>
          <span>Diperbarui Hari Ini</span>
          <span className="ds-status">● Sistem Aktif</span>
        </div>
      </div>

      {/* Stats */}
      <div className="ds-stats">
        <div className="ds-stat-card">
          <div className="ds-stat-label">PRIORITAS UTAMA</div>
          <div className="ds-stat-value">Transportasi & Energi</div>
          <div className="ds-stat-desc">
            Area yang paling membutuhkan perhatian berdasarkan data aktivitas
          </div>
          <div className="ds-stat-progress">
            <div className="ds-progress-bar" style={{ width: "78%" }}></div>
            <span className="ds-progress-text">78%</span>
          </div>
        </div>
        <div className="ds-stat-card">
          <div className="ds-stat-label">TOTAL REKOMENDASI</div>
          <div className="ds-stat-value">4 Tindakan</div>
          <div className="ds-stat-desc">Dari 4 kategori prioritas</div>
          <div className="ds-stat-tags">
            <span className="ds-tag ds-tag-high">High: 2</span>
            <span className="ds-tag ds-tag-medium">Medium: 1</span>
            <span className="ds-tag ds-tag-supporting">Supporting: 1</span>
          </div>
        </div>
        <div className="ds-stat-card">
          <div className="ds-stat-label">TERAKHIR DIPERBARUI</div>
          <div className="ds-stat-value">Hari Ini</div>
          <div className="ds-stat-desc">
            Rekomendasi disesuaikan dengan aktivitas terkini
          </div>
          <button className="ds-refresh-btn">Perbarui</button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="ds-recommendations">
        <div className="ds-section-header">
          <div>
            <div className="ds-section-label">REKOMENDASI</div>
            <h2 className="ds-section-title">Filter Prioritas</h2>
            <p className="ds-section-desc">
              Pilih tingkat prioritas untuk melihat rekomendasi yang sesuai
            </p>
          </div>
          <div className="ds-filters">
            <button
              className={`ds-filter ${selectedPriority === "all" ? "active" : ""}`}
              onClick={() => setSelectedPriority("all")}
            >
              Semua
            </button>
            <button
              className={`ds-filter ${selectedPriority === "High" ? "active active-high" : ""}`}
              onClick={() => setSelectedPriority("High")}
            >
              High
            </button>
            <button
              className={`ds-filter ${selectedPriority === "Medium" ? "active active-medium" : ""}`}
              onClick={() => setSelectedPriority("Medium")}
            >
              Medium
            </button>
            <button
              className={`ds-filter ${selectedPriority === "Supporting" ? "active active-supporting" : ""}`}
              onClick={() => setSelectedPriority("Supporting")}
            >
              Supporting
            </button>
          </div>
        </div>

        <div className="ds-list">
          {filteredRecommendations.map((item) => (
            <div key={item.id} className="ds-item">
              <div className="ds-item-header">
                <div className="ds-item-tags">
                  <span
                    className={`ds-priority ${item.priority.toLowerCase()}`}
                  >
                    {item.priority}
                  </span>
                  <span className="ds-category">{item.category}</span>
                </div>
                <button
                  className="ds-expand"
                  onClick={() =>
                    setExpandedId(expandedId === item.id ? null : item.id)
                  }
                >
                  {expandedId === item.id ? "−" : "+"}
                </button>
              </div>
              <h3 className="ds-item-title">{item.title}</h3>
              <p className="ds-item-desc">{item.description}</p>
              {expandedId === item.id && (
                <div className="ds-item-detail">
                  <p>
                    Rekomendasi ini berdasarkan analisis data aktivitas
                    mahasiswa pada periode sebelumnya.
                  </p>
                </div>
              )}
              <div className="ds-item-action">
                <div className="ds-action-label">TINDAKAN YANG DISARANKAN</div>
                <p>{item.action}</p>
              </div>
              <div className="ds-item-footer">
                <span className="ds-impact-label">Dampak Potensial</span>
                <span className={`ds-impact ${item.impact.toLowerCase()}`}>
                  {item.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Flow */}
      <div className="ds-process">
        <div className="ds-process-header">
          <div className="ds-section-label">ALUR REKOMENDASI</div>
          <h2 className="ds-section-title">Proses Pengambilan Keputusan</h2>
          <p className="ds-section-desc">
            Informasi aktivitas digunakan sebagai dasar untuk menentukan
            prioritas tindakan
          </p>
        </div>
        <div className="ds-steps">
          <div className="ds-step">
            <div className="ds-step-num">01</div>
            <div className="ds-step-content">
              <strong>Aktivitas</strong>
              <span>Data aktivitas mahasiswa</span>
            </div>
          </div>
          <div className="ds-step-arrow"></div>
          <div className="ds-step">
            <div className="ds-step-num">02</div>
            <div className="ds-step-content">
              <strong>Pola Perilaku</strong>
              <span>Identifikasi area yang perlu perhatian</span>
            </div>
          </div>
          <div className="ds-step-arrow"></div>
          <div className="ds-step">
            <div className="ds-step-num">03</div>
            <div className="ds-step-content">
              <strong>Prioritas</strong>
              <span>Pengelompokan tingkat urgensi</span>
            </div>
          </div>
          <div className="ds-step-arrow"></div>
          <div className="ds-step">
            <div className="ds-step-num">04</div>
            <div className="ds-step-content">
              <strong>Tindakan</strong>
              <span>Rekomendasi yang dapat dilakukan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="ds-footer">
        <span className="ds-footer-label">Catatan</span>
        <p>
          Rekomendasi pada prototipe digunakan sebagai simulasi dukungan
          keputusan berdasarkan data aktivitas yang tersedia.
        </p>
        <button className="ds-footer-btn">Selengkapnya</button>
      </div>
    </div>
  );
};

export default DecisionSupport;
