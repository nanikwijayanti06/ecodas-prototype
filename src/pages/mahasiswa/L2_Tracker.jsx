import { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import LineChart from '../../components/Charts/LineChart';
import {
  activityTypes,
  weeklyEmissions,
  weekLabels,
  rataRataKampus,
  saranHarian,
} from '../../data/dummyData';
import './mahasiswa.css';

let nextId = 3;

export default function L2_Tracker() {
  const [aktivitas, setAktivitas] = useState([
    { id: 1, jenis: 'kemasan', label: 'Kemasan Sekali Pakai', kategori: 'Makanan & Kemasan', jumlah: 2, emisi: 0.16, waktu: 'Hari ini' },
    { id: 2, jenis: 'motor', label: 'Transportasi Motor', kategori: 'Transportasi', jumlah: 5, emisi: 0.6, waktu: 'Hari ini' },
  ]);

  const [jenis, setJenis] = useState(activityTypes[0].id);
  const [jumlah, setJumlah] = useState('');

  const totalHariIni = aktivitas.reduce((acc, a) => acc + a.emisi, 0);
  const selisih = rataRataKampus - totalHariIni;
  const tipeTerpilih = activityTypes.find((t) => t.id === jenis);

  const handleTambah = (e) => {
    e.preventDefault();
    const qty = parseFloat(jumlah);
    if (!qty || qty <= 0) return;

    setAktivitas([
      {
        id: nextId++,
        jenis,
        label: tipeTerpilih.label,
        kategori: tipeTerpilih.label.split(' ')[0],
        jumlah: qty,
        emisi: +(qty * tipeTerpilih.faktor).toFixed(2),
        waktu: 'Hari ini',
      },
      ...aktivitas,
    ]);
    setJumlah('');
  };

  const handleHapus = (id) => {
    setAktivitas(aktivitas.filter((a) => a.id !== id));
  };

  return (
    <div>
      <h1 className="page-title">Eco-Tracker</h1>
      <p className="page-subtitle">Catat aktivitas harian dan lihat perkiraan jejak karbonmu.</p>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <Card title="Catat Aktivitas">
          <p className="form-hint">Masukkan aktivitas konsumsi yang kamu lakukan hari ini.</p>
          <form onSubmit={handleTambah}>
            <div className="form-group">
              <label>Jenis aktivitas</label>
              <select value={jenis} onChange={(e) => setJenis(e.target.value)}>
                {activityTypes.map((t) => (
                  <option key={t.id} value={t.id}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Jumlah ({tipeTerpilih.satuan})</label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="0"
                value={jumlah}
                onChange={(e) => setJumlah(e.target.value)}
              />
            </div>
            <Button type="submit">Catat Aktivitas</Button>
          </form>
        </Card>

        <Card>
          <p className="stat-label">Total hari ini</p>
          <p className="stat-value big">{totalHariIni.toFixed(2)} <span>kg CO2e</span></p>
          <div className="compare-row">
            <div>
              <p className="compare-label">Rata-rata mahasiswa</p>
              <p className="compare-value">{rataRataKampus} kg</p>
            </div>
            <span className={`compare-badge ${selisih >= 0 ? 'good' : 'bad'}`}>
              {selisih >= 0 ? `${selisih.toFixed(2)} kg di bawah rata-rata` : `${Math.abs(selisih).toFixed(2)} kg di atas rata-rata`}
            </span>
          </div>
          <div className="saran-box">
            <p className="saran-title">Saran untukmu</p>
            <p className="saran-text">{saranHarian}</p>
          </div>
        </Card>
      </div>

      <Card title="Perkembangan Emisi" subtitle="Perkiraan emisi selama beberapa hari terakhir." className="mt-16">
        <LineChart data={weeklyEmissions} labels={weekLabels} />
      </Card>

      <Card title="Riwayat Aktivitas" subtitle={`${aktivitas.length} aktivitas`} className="mt-16">
        <table className="riwayat-table">
          <thead>
            <tr>
              <th>Aktivitas</th>
              <th>Jumlah</th>
              <th>Emisi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {aktivitas.map((a) => (
              <tr key={a.id}>
                <td>
                  <p className="riwayat-judul">{a.label}</p>
                  <p className="riwayat-sub">{a.kategori} - {a.waktu}</p>
                </td>
                <td>{a.jumlah} {activityTypes.find((t) => t.id === a.jenis)?.satuan}</td>
                <td className="riwayat-emisi">{a.emisi.toFixed(2)} kg CO2e</td>
                <td>
                  <button className="btn-hapus" onClick={() => handleHapus(a.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
