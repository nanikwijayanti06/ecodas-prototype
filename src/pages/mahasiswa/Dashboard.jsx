import { Link } from 'react-router-dom';
import Card from '../../components/UI/Card';
import ProgressBar from '../../components/Gamification/ProgressBar';
import './mahasiswa.css';

export default function Dashboard() {
  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="page-subtitle">Ringkasan aktivitas konsumsi bijakmu hari ini.</p>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <Card>
          <p className="stat-label">Total emisi hari ini</p>
          <p className="stat-value">0.76 <span>kg CO2e</span></p>
          <p className="stat-note ok">0.59 kg di bawah rata-rata kampus</p>
        </Card>
        <Card>
          <p className="stat-label">Total poin</p>
          <p className="stat-value">240</p>
          <p className="stat-note">dari challenge dan aksi harian</p>
        </Card>
        <Card>
          <p className="stat-label">Target minggu ini</p>
          <p className="stat-value">60%</p>
          <ProgressBar value={3} max={5} />
        </Card>
      </div>

      <div className="reminder-banner">
        <span>&#128276;</span>
        <p>
          Pengingat hari ini: Bawa tumbler saat membeli minuman untuk mengurangi
          penggunaan kemasan sekali pakai.
        </p>
      </div>

      <div className="grid-3" style={{ marginTop: 16 }}>
        <Link to="/mahasiswa/awareness" className="quick-card">
          <h4>Awareness</h4>
          <p>Modul edukasi dan kesadaran lingkungan.</p>
        </Link>
        <Link to="/mahasiswa/tracker" className="quick-card">
          <h4>Tracker</h4>
          <p>Catat aktivitas harian dan lihat jejak karbonmu.</p>
        </Link>
        <Link to="/mahasiswa/behavior" className="quick-card">
          <h4>Behavior</h4>
          <p>Bangun kebiasaan konsumsi berkelanjutan.</p>
        </Link>
      </div>
    </div>
  );
}
