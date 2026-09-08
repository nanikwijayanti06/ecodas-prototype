import React, { useState } from "react";

const Awareness = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");

  // Modul dipetakan langsung ke Tabel 4.2.1 "User Requirement Analysis for Layer 1-3"
  // supaya prototipe ECODAS konsisten dengan hasil analisis Mean di laporan.
  const modules = [
    {
      id: 1,
      category: "Konsumsi",
      title: "Dampak Konsumsi Produk Sehari-hari",
      desc: "Modul edukasi mengenai dampak lingkungan dari aktivitas konsumsi mahasiswa, mulai dari makanan hingga penggunaan sumber daya kampus.",
      priority: "Medium Priority", // Product and consumption impact, Mean 4.17
      readTime: "5 Menit",
    },
    {
      id: 2,
      category: "Sumber Daya",
      title: "Krisis Sumber Daya",
      desc: "Visualisasi keterbatasan sumber daya alam serta konsekuensi dari tingkat konsumsi yang berlebih.",
      priority: "High Priority", // Resource scarcity, Mean 4.22
      readTime: "6 Menit",
    },
    {
      id: 3,
      category: "Iklim",
      title: "Isu Lingkungan & Iklim",
      desc: "Materi interaktif mengenai hubungan langsung antara konsumsi mahasiswa dengan perubahan iklim dan pemanasan global.",
      priority: "High Priority", // Environmental issues, Mean 4.25
      readTime: "8 Menit",
    },
    {
      id: 4,
      category: "Konsumsi",
      title: "Alternatif Konsumsi Bijak",
      desc: "Rekomendasi alternatif konsumsi yang lebih ramah lingkungan dalam kehidupan sehari-hari, mulai dari produk sekali pakai hingga transportasi.",
      priority: "High Priority", // Sustainable consumption alternatives, Mean 4.32
      readTime: "5 Menit",
    },
    {
      id: 5,
      category: "Edukasi",
      title: "Literasi Greenwashing",
      desc: "Cara cerdas mengevaluasi produk dan menghindari manipulasi label ramah lingkungan dari perusahaan.",
      priority: "Supporting Priority", // Muncul dari open requirement kualitatif (20.9%), bukan dari 4 indikator formal
      readTime: "7 Menit",
    },
  ];

  const filteredModules = modules.filter((modul) => {
    const matchSearch = modul.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchFilter =
      activeFilter === "Semua" || modul.priority === activeFilter;
    return matchSearch && matchFilter;
  });

  const priorityColors = {
    "High Priority": { bg: "#fee2e2", text: "#991b1b" },
    "Medium Priority": { bg: "#fef3c7", text: "#92400e" },
    "Supporting Priority": { bg: "#e0f2fe", text: "#075985" },
  };

  return (
    <div style={styles.container}>
      {/* Header Section - Full Width */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>ECODAS</h1>
          <p style={styles.headerSub}>Modul Edukasi & Kesadaran Lingkungan</p>
        </div>
      </div>

      {/* Main Content - Centered with Max Width */}
      <div style={styles.content}>
        {/* Controls Section (Search & Filter) */}
        <div style={styles.controlsContainer}>
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Cari modul edukasi..."
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div style={styles.filterContainer}>
            {[
              "Semua",
              "High Priority",
              "Medium Priority",
              "Supporting Priority",
            ].map((filter) => (
              <button
                key={filter}
                style={{
                  ...styles.filterButton,
                  backgroundColor:
                    activeFilter === filter ? "#166534" : "#e5e7eb",
                  color: activeFilter === filter ? "white" : "#374151",
                }}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Module Cards - Responsive Grid */}
        {filteredModules.length > 0 ? (
          <div style={styles.gridContainer}>
            {filteredModules.map((modul) => (
              <div key={modul.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.categoryLabel}>{modul.category}</span>
                  <span
                    style={{
                      ...styles.priorityBadge,
                      backgroundColor: priorityColors[modul.priority].bg,
                      color: priorityColors[modul.priority].text,
                    }}
                  >
                    {modul.priority}
                  </span>
                </div>

                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{modul.title}</h3>
                  <p style={styles.cardDesc}>{modul.desc}</p>
                </div>

                <div style={styles.cardFooter}>
                  <span style={styles.readTime}>
                    Estimasi: {modul.readTime}
                  </span>
                  <button style={styles.actionButton}>Baca Modul</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p>Modul edukasi tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    minHeight: "100vh",
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#166534",
    color: "white",
    padding: "40px 20px",
    borderBottom: "4px solid #14532d",
    display: "flex",
    justifyContent: "center",
  },
  headerContent: {
    width: "100%",
    maxWidth: "1200px",
  },
  headerTitle: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  headerSub: { margin: "8px 0 0 0", fontSize: "15px", opacity: 0.9 },
  content: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 20px",
    boxSizing: "border-box",
  },
  controlsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
  },
  searchWrapper: {
    flex: "1 1 300px",
    minWidth: "250px",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  filterContainer: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  filterButton: {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxSizing: "border-box",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  categoryLabel: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  priorityBadge: {
    fontSize: "11px",
    padding: "4px 10px",
    borderRadius: "6px",
    fontWeight: "700",
  },
  cardBody: {
    flexGrow: 1,
  },
  cardTitle: {
    margin: "0 0 12px 0",
    fontSize: "18px",
    color: "#0f172a",
    fontWeight: "700",
  },
  cardDesc: {
    margin: "0 0 24px 0",
    fontSize: "14px",
    color: "#64748b",
    lineHeight: "1.6",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    borderTop: "1px dashed #e2e8f0",
  },
  readTime: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "500",
  },
  actionButton: {
    backgroundColor: "#166534",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  emptyState: {
    textAlign: "center",
    padding: "40px",
    color: "#64748b",
    backgroundColor: "white",
    borderRadius: "12px",
    border: "1px dashed #cbd5e1",
  },
};

export default Awareness;
