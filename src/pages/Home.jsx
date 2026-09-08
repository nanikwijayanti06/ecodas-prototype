import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Satu Langkah Kecil untuk Kampus Hijau Kita</h1>
          <p className="hero-subtitle">
            ECODAS (Eco Digital Awareness System) membantu kamu membangun kebiasaan konsumsi yang lebih bijak dan berkelanjutan melalui pendekatan berbasis data.
          </p>
          <div className="hero-buttons">
            <Link to="/tracker" className="btn-primary">Mulai Tracker</Link>
            <Link to="/awareness" className="btn-secondary">Pelajari Edukasi</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Nanti ini bisa diganti dengan tag <img> kalau kamu sudah punya aset gambar/vektor */}
          <div className="placeholder-image">🌿 Ilustrasi ECODAS</div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="feature-section">
        <h2 className="section-title">Framework ECODAS</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Awareness</h3>
            <p>Pahami dampak lingkungan dari aktivitas konsumsi dan temukan alternatif ramah lingkungan untuk keseharianmu.</p>
          </div>
          <div className="feature-card">
            <h3>Feedback Mechanism</h3>
            <p>Pantau jejak karbon dan dapatkan rekomendasi tindakan praktis yang bisa langsung kamu terapkan secara real-time.</p>
          </div>
          <div className="feature-card">
            <h3>Behavior Change</h3>
            <p>Jaga motivasimu dengan pengingat, penetapan target, serta sistem penghargaan untuk membentuk kebiasaan berkelanjutan.</p>
          </div>
          <div className="feature-card">
            <h3>Collective Intelligence</h3>
            <p>Data perilakumu akan diagregasikan menjadi pengetahuan kolektif yang membantu institusi memahami pola konsumsi kampus.</p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about-section">
        <div className="about-content">
          <h2 className="section-title">Pendekatan Berbasis Perilaku</h2>
          <p>
            ECODAS dibangun berdasarkan prinsip <strong>behavior-centered design</strong>, menempatkan perubahan perilaku sebagai inti dari keseluruhan sistem. Setiap aktivitasmu bukan sekadar pencapaian individu, melainkan sumber <em>sustainability intelligence</em> yang sangat penting bagi perguruan tinggi untuk merancang kebijakan Green Campus yang lebih adaptif dan presisi.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;