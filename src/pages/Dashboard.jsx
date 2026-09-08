import React from 'react';

const Dashboard = () => {
  const leaderboardData = [
    { rank: 1, faculty: 'Fakultas Teknik', points: 15420, trend: 'up' },
    { rank: 2, faculty: 'Fakultas MIPA', points: 14250, trend: 'up' },
    { rank: 3, faculty: 'Fakultas Ekonomi', points: 12800, trend: 'down' },
    { rank: 4, faculty: 'Fakultas Ilmu Budaya', points: 10430, trend: 'up' },
  ];

  return (
    <div className="dashboard-container">
      {/* HEADER SECTION */}
      <section className="dashboard-header">
        <h1 className="dashboard-title">Collective Intelligence Dashboard</h1>
        <p className="dashboard-subtitle">
          Agregasi data perilaku seluruh mahasiswa untuk memonitor capaian Green Campus dan mendukung kebijakan berkelanjutan.
        </p>
      </section>

      {/* OVERVIEW STATS (MACRO LEVEL) */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🌍</div>
          <div className="stat-info">
            <h3>Total CO₂ Dihemat</h3>
            <p className="stat-value">2,450 <span>kg</span></p>
            <span className="stat-desc">Bulan ini</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Partisipasi Aktif</h3>
            <p className="stat-value">1,284 <span>Mhs</span></p>
            <span className="stat-desc">+12% dari minggu lalu</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">♻️</div>
          <div className="stat-info">
            <h3>Plastik Dicegah</h3>
            <p className="stat-value">8,920 <span>Unit</span></p>
            <span className="stat-desc">Kotak makan & tumbler</span>
          </div>
        </div>
      </section>

      <div className="dashboard-main-grid">
        {/* LEADERBOARD FAKULTAS */}
        <div className="dashboard-card leaderboard-card">
          <h2>🏆 Klasemen Fakultas Hijau</h2>
          <div className="leaderboard-list">
            {leaderboardData.map((item) => (
              <div key={item.rank} className="leaderboard-item">
                <div className="lb-rank">#{item.rank}</div>
                <div className="lb-faculty">{item.faculty}</div>
                <div className="lb-points">{item.points.toLocaleString()} pts</div>
                <div className={`lb-trend ${item.trend}`}>
                  {item.trend === 'up' ? '▲' : '▼'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INSIGHTS & DECISION SUPPORT */}
        <div className="dashboard-card insights-card">
          <h2>💡 Sustainability Insights</h2>
          <ul className="insights-list">
            <li>
              <strong>Puncak Emisi Transportasi:</strong> Terjadi pada pukul 08:00 - 10:00 pagi. <em>Rekomendasi: Penambahan jadwal shuttle bus kampus di jam tersebut.</em>
            </li>
            <li>
              <strong>Tren Kantin:</strong> Penggunaan wadah sekali pakai turun 25% di Kantin Pusat setelah kampanye "Sehari Tanpa Plastik".
            </li>
            <li>
              <strong>Konsumsi Energi:</strong> Fakultas Teknik berhasil memangkas 15% penggunaan AC di luar jam kelas.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;