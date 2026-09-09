import { useState } from 'react';
import Card from '../../components/UI/Card';
import ProgressBar from '../../components/Gamification/ProgressBar';
import { recommendations } from '../../data/dummyData';
import './admin.css';

const filters = ['Semua', 'High', 'Medium', 'Supporting'];

export default function L5_DecisionSupport() {
  const [aktif, setAktif] = useState('Semua');

  const hasil = recommendations.filter(
    (r) => aktif === 'Semua' || r.prioritas === aktif
  );

  return (
    <div>
      <div className="ds-hero">
        <p className="ds-breadcrumb">ECODAS / Decision Support</p>
        <h1>Dukungan Pengambilan Keputusan</h1>
        <p className="ds-sub">
          Rekomendasi tindakan berdasarkan pola aktivitas dan perilaku keberlanjutan mahasiswa.
        </p>
        <div className="ds-meta">
          <span>4 Rekomendasi Tersedia</span>
          <span>Diperbarui Hari ini</span>
          <span className="ds-status">Sistem Aktif</span>
        </div>
      </div>

      <div className="grid-3" style={{ margin: '16px 0' }}>
        <Card className="prioritas-card">
          <p className="stat-label">Prioritas Utama</p>
          <h3 className="prioritas-judul">Transportasi &amp; Energi</h3>
          <p className="stat-note">Area yang paling membutuhkan perhatian berdasarkan data aktivitas.</p>
          <div style={{ marginTop: 12 }}>
            <ProgressBar value={78} />
          </div>
        </Card>
        <Card>
          <p className="stat-label">Total Rekomendasi</p>
          <p className="stat-value">4 <span>Tindakan</span></p>
          <div className="rekap-tags">
            <span className="priority-tag tag-high">High: 1</span>
            <span className="priority-tag tag-medium">Medium: 1</span>
            <span className="priority-tag tag-supporting">Supporting: 1</span>
          </div>
        </Card>
        <Card>
          <p className="stat-label">Terakhir Diperbarui</p>
          <p className="stat-value">Hari Ini</p>
          <p className="stat-note">Rekomendasi disesuaikan dengan aktivitas terbaru.</p>
        </Card>
      </div>

      <div className="filter-bar">
        <span className="filter-label">Filter Prioritas</span>
        {filters.map((f) => (
          <button
            key={f}
            className={`pill ${aktif === f ? 'pill-active' : ''}`}
            onClick={() => setAktif(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {hasil.map((r) => (
        <Card key={r.id} className="rek-card">
          <div className="rek-head">
            <span className={`priority-tag tag-${r.prioritas.toLowerCase()}`}>{r.prioritas}</span>
            <span className="rek-kategori">{r.kategori}</span>
          </div>
          <h3 className="rek-judul">{r.judul}</h3>
          <p className="rek-deskripsi">{r.deskripsi}</p>
          <div className="rek-tindakan">
            <p className="rek-tindakan-title">Tindakan yang Disarankan</p>
            <p>{r.tindakan}</p>
          </div>
          <div className="rek-dampak">
            <span className="stat-label">Dampak Potensial</span>
            <span className="dampak-badge">{r.dampak}</span>
          </div>
        </Card>
      ))}

      <div className="alur-box">
        <h3>Proses Pengambilan Keputusan</h3>
        <p className="alur-sub">Informasi aktivitas digunakan sebagai dasar untuk menentukan prioritas tindakan.</p>
        <div className="alur-grid">
          <div className="alur-step">
            <span className="alur-nomor">01</span>
            <h4>Aktivitas</h4>
            <p>Data aktivitas mahasiswa.</p>
          </div>
          <div className="alur-step">
            <span className="alur-nomor">02</span>
            <h4>Pola Perilaku</h4>
            <p>Identifikasi area yang perlu perhatian.</p>
          </div>
          <div className="alur-step">
            <span className="alur-nomor">03</span>
            <h4>Prioritas</h4>
            <p>Pengelompokan tingkat urgensi.</p>
          </div>
          <div className="alur-step">
            <span className="alur-nomor">04</span>
            <h4>Tindakan</h4>
            <p>Rekomendasi yang dapat dijalankan.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
