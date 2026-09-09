import { useState } from 'react';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import ProgressBar from '../../components/Gamification/ProgressBar';
import BadgeList from '../../components/Gamification/BadgeList';
import { badges, challenges } from '../../data/dummyData';
import './mahasiswa.css';

export default function L3_Behavior() {
  const [poin, setPoin] = useState(240);
  const [sudahAksi, setSudahAksi] = useState(false);

  return (
    <div>
      <h1 className="page-title">Behavior Change</h1>
      <p className="page-subtitle">Bangun kebiasaan konsumsi berkelanjutan lewat tindakan kecil yang konsisten.</p>

      <div className="aksi-banner">
        <div>
          <h2>Satu tindakan untuk hari ini.</h2>
          <p>Perubahan perilaku dimulai dari tindakan sederhana yang dilakukan secara konsisten.</p>
        </div>
        <span className="aksi-poin">+10 poin</span>
      </div>

      <Card className="mt-16">
        <div className="rekomendasi-head">
          <div>
            <p className="module-kategori">RECOMMENDED ACTION</p>
            <h3 className="module-judul">Bawa tumbler saat membeli minuman.</h3>
            <p className="module-deskripsi">
              Tampung tumbler di dalam tas kuliah agar selalu siap digunakan.
            </p>
          </div>
          {!sudahAksi ? (
            <Button onClick={() => { setPoin(poin + 10); setSudahAksi(true); }}>
              Saya sudah melakukannya
            </Button>
          ) : (
            <span className="done-badge">Selesai &#10003;</span>
          )}
        </div>
      </Card>

      <div className="grid-2 mt-16" style={{ alignItems: 'start' }}>
        <Card title="Goal Setting & Self Monitoring" subtitle="Pantau perubahanmu. Tetapkan target pribadi dan lihat perkembangan perilaku konsumsi berkelanjutanmu dari waktu ke waktu.">
          <div className="goal-row">
            <div>
              <p className="goal-persen">60% <span>minggu ini</span></p>
              <p className="goal-nama">Kurangi Kemasan Sekali Pakai</p>
            </div>
            <span className="goal-target">Target 3/5</span>
          </div>
          <ProgressBar value={3} max={5} />
          <p className="goal-status">Tandai 1 aktivitas lagi untuk mencapai target minggu ini.</p>

          <p className="stat-label" style={{ marginTop: 18 }}>Perkembangan minggu ini</p>
          <div className="hari-row">
            {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((h, i) => (
              <span key={h} className={`hari-dot ${i < 6 ? 'filled' : ''}`}>{h}</span>
            ))}
          </div>
        </Card>

        <Card title="Pencapaianmu" subtitle={`Total poin: ${poin}`}>
          <BadgeList badges={badges} />
        </Card>
      </div>

      <Card title="Pilih tantangan" subtitle="Ikuti tantangan dan dapatkan penghargaan atas kebiasaan baik yang kamu bangun." className="mt-16">
        <div className="challenge-list">
          {challenges.map((c) => (
            <div key={c.id} className="challenge-item">
              <div className="challenge-info">
                <div className="challenge-title-row">
                  <h4>{c.judul}</h4>
                  <span className="challenge-poin">+{c.poin} poin</span>
                </div>
                <p>{c.deskripsi}</p>
                <p className="challenge-meta">{c.peserta} mahasiswa ikut serta</p>
                {c.progres && <ProgressBar value={c.progres} />}
              </div>
              {c.status === 'ikut' ? (
                <Button variant="outline">Ikuti challenge</Button>
              ) : c.progres ? (
                <Button variant="outline">Detail</Button>
              ) : (
                <Button>Ikuti challenge</Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Komunitas kampus" subtitle="Lihat perkembangan poin dan aktivitas mahasiswa lain, diskusi, dan saling dukung bersama." className="mt-16">
        <p className="empty-text">Fitur komunitas masih dalam pengembangan.</p>
      </Card>
    </div>
  );
}
