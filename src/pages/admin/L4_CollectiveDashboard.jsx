import Card from '../../components/UI/Card';
import LineChart from '../../components/Charts/LineChart';
import BarChart from '../../components/Charts/BarChart';
import ProgressBar from '../../components/Gamification/ProgressBar';
import {
  trendData,
  trendLabels,
  facultyData,
  highImpact,
  sustainabilityPerf,
} from '../../data/dummyData';
import './admin.css';

export default function L4_CollectiveDashboard() {
  return (
    <div>
      <p className="admin-eyebrow">COLLECTIVE INTELLIGENCE</p>
      <h1 className="page-title">Campus Sustainability Insight</h1>
      <p className="page-subtitle">
        Ringkasan pola perilaku keberlanjutan mahasiswa berdasarkan aktivitas yang telah tercatat
        secara kolektif.
      </p>

      <div className="grid-3" style={{ marginBottom: 16 }}>
        <Card>
          <p className="stat-label">Collective Sustainability Score</p>
          <p className="stat-value">78<span className="stat-satuan">/100</span></p>
          <p className="stat-note ok">+6.4% dari periode sebelumnya</p>
        </Card>
        <Card>
          <p className="stat-label">Students Contributing</p>
          <p className="stat-value">1,284</p>
          <p className="stat-note ok">+12.5% dari periode sebelumnya</p>
        </Card>
        <Card>
          <p className="stat-label">Estimated CO2 Reduction</p>
          <p className="stat-value">18.4 <span>kg</span></p>
          <p className="stat-note ok">+5.2% dari periode sebelumnya</p>
        </Card>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <Card title="Behavioral Trend" subtitle="Perkembangan perilaku keberlanjutan mahasiswa.">
          <LineChart data={trendData} labels={trendLabels} />
          <div className="insight-foot">
            <span>Current score: <strong>78%</strong></span>
            <span className="ok-text">Positive behavior trajectory</span>
          </div>
        </Card>

        <Card title="Faculty Pattern" subtitle="Sustainability behavior by faculty.">
          <BarChart data={facultyData} />
          <p className="insight-foot">Highest contribution: <strong>FTI - 84%</strong></p>
        </Card>
      </div>

      <Card title="High-impact Activities" subtitle="Aktivitas dengan kontribusi terbesar terhadap perilaku berkelanjutan." className="mt-16">
        <div className="impact-grid">
          {highImpact.map((h) => (
            <div key={h.rank} className="impact-item">
              <div className="impact-rank">{String(h.rank).padStart(2, '0')}</div>
              <div className="impact-body">
                <h4>{h.judul}</h4>
                <p>{h.deskripsi}</p>
                <ProgressBar value={h.nilai} />
              </div>
              <span className="impact-nilai">{h.nilai}%</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid-2 mt-16" style={{ alignItems: 'start' }}>
        <Card title="Sustainability Performance" subtitle="Capaian keberlanjutan berdasarkan indikator utama.">
          {sustainabilityPerf.map((s) => (
            <div key={s.label} style={{ marginBottom: 12 }}>
              <ProgressBar value={s.value} label={s.label} />
            </div>
          ))}
        </Card>

        <Card title="Collective Insight">
          <p className="insight-text">
            Perilaku keberlanjutan mahasiswa menunjukkan perkembangan positif. Kontribusi paling
            kuat terdapat pada penggunaan barang reusable, sementara pengurangan emisi masih
            menjadi area yang perlu ditingkatkan.
          </p>
        </Card>
      </div>
    </div>
  );
}
