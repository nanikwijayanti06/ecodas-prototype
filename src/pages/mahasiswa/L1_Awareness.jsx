import { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { modules } from '../../data/dummyData';
import './mahasiswa.css';

const filters = ['Semua', 'High', 'Medium', 'Supporting'];

export default function L1_Awareness() {
  const [query, setQuery] = useState('');
  const [aktif, setAktif] = useState('Semua');

  const hasil = modules.filter((m) => {
    const cocokFilter = aktif === 'Semua' || m.prioritas === aktif;
    const cocokCari = m.judul.toLowerCase().includes(query.toLowerCase());
    return cocokFilter && cocokCari;
  });

  return (
    <div>
      <h1 className="page-title">Awareness</h1>
      <p className="page-subtitle">Modul Edukasi & Kesadaran Lingkungan.</p>

      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Cari modul edukasi..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {filters.map((f) => (
          <button
            key={f}
            className={`pill ${aktif === f ? 'pill-active' : ''}`}
            onClick={() => setAktif(f)}
          >
            {f === 'Semua' ? f : `${f} Priority`}
          </button>
        ))}
      </div>

      <div className="module-grid">
        {hasil.map((m) => (
          <Card key={m.id}>
            <div className="module-head">
              <span className="module-kategori">{m.kategori}</span>
              <span className={`priority-tag tag-${m.prioritas.toLowerCase()}`}>
                {m.prioritas} Priority
              </span>
            </div>
            <h3 className="module-judul">{m.judul}</h3>
            <p className="module-deskripsi">{m.deskripsi}</p>
            <div className="module-foot">
              <span className="module-waktu">Estimasi {m.waktu} Menit</span>
              <Button variant="primary">Baca Modul</Button>
            </div>
          </Card>
        ))}
        {hasil.length === 0 && <p className="empty-text">Modul tidak ditemukan.</p>}
      </div>
    </div>
  );
}
