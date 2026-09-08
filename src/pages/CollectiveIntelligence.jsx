import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import "./CollectiveIntelligence.css";

const trendData = [
  { month: "Jan", score: 58 },
  { month: "Feb", score: 61 },
  { month: "Mar", score: 65 },
  { month: "Apr", score: 68 },
  { month: "Mei", score: 72 },
  { month: "Jun", score: 75 },
  { month: "Jul", score: 78 },
];

const facultyData = [
  { name: "FTI", value: 84 },
  { name: "FBS", value: 79 },
  { name: "FT", value: 75 },
  { name: "FE", value: 72 },
  { name: "FIK", value: 69 },
];

const activities = [
  {
    number: "01",
    title: "Penggunaan Barang Reusable",
    value: 82,
    description: "Penggunaan tumbler, kotak makan, dan barang pakai ulang.",
  },
  {
    number: "02",
    title: "Transportasi Berkelanjutan",
    value: 74,
    description:
      "Pemanfaatan transportasi umum, berjalan kaki, atau bersepeda.",
  },
  {
    number: "03",
    title: "Pengurangan Sampah",
    value: 68,
    description:
      "Perilaku mengurangi penggunaan produk dan kemasan sekali pakai.",
  },
];

const performance = [
  { label: "Behavior Change", value: 78 },
  { label: "Awareness", value: 84 },
  { label: "Participation", value: 72 },
  { label: "Carbon Reduction", value: 69 },
];

const icon = {
  trend: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="3 17 8 12 12 15 21 6" />
      <polyline points="16 6 21 6 21 11" />
    </svg>
  ),

  users: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c.5-3 2.4-4.5 5.5-4.5s5 1.5 5.5 4.5" />
      <path d="M16 11a3 3 0 1 0 0-6" />
      <path d="M17 14.5c2.2.3 3.5 1.7 4 4.5" />
    </svg>
  ),

  carbon: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.5 4.5C13 4.5 6 7 6 13c0 4 2.5 6.5 6 6.5 5 0 7-5.5 7.5-15Z" />
      <path d="M5 20c2.5-4 5.5-6.5 10-9" />
    </svg>
  ),

  faculty: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M8 10h2M14 10h2M8 14h2M14 14h2M8 18h2M14 18h2" />
    </svg>
  ),

  activity: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="3 12 7 12 9.5 5 14 19 16.5 12 21 12" />
    </svg>
  ),

  target: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  ),

  insight: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8.5 14.5C7.5 13.5 7 12.2 7 10.5A5 5 0 0 1 17 10.5c0 1.7-.5 3-1.5 4-.8.8-1.2 1.4-1.5 2.5h-4c-.3-1.1-.7-1.7-1.5-2.5Z" />
    </svg>
  ),
};

const CollectiveIntelligence = () => {
  return (
    <div className="collective-page">
      {/* HEADER */}
      <header className="collective-header">
        <div>
          <span className="section-kicker">COLLECTIVE INTELLIGENCE</span>

          <h1>Campus Sustainability Insight</h1>

          <p>
            Ringkasan pola perilaku keberlanjutan mahasiswa berdasarkan
            aktivitas yang telah tercatat secara kolektif.
          </p>
        </div>

        <div className="data-status">
          <span className="status-dot"></span>
          Data diperbarui
        </div>
      </header>

      {/* SUMMARY */}
      <section className="summary-grid">
        <div className="summary-card featured">
          <div className="summary-top">
            <span className="summary-label">
              Collective Sustainability Score
            </span>

            <div className="summary-icon">{icon.target}</div>
          </div>

          <div className="score-row">
            <strong>78</strong>
            <span>/100</span>
          </div>

          <div className="score-change">
            <span>+8.4%</span>
            dari periode sebelumnya
          </div>

          <div className="score-progress">
            <span style={{ width: "78%" }}></span>
          </div>

          <p>
            Performa keberlanjutan kolektif menunjukkan kecenderungan positif.
          </p>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Students Contributing</span>

            <div className="summary-icon soft">{icon.users}</div>
          </div>

          <div className="summary-number">1,284</div>

          <div className="summary-change">+12.5% dari periode sebelumnya</div>

          <p>Mahasiswa yang berkontribusi dalam pembentukan data kolektif.</p>
        </div>

        <div className="summary-card">
          <div className="summary-top">
            <span className="summary-label">Estimated CO₂ Reduction</span>

            <div className="summary-icon soft">{icon.carbon}</div>
          </div>

          <div className="summary-number">
            18.4 <small>kg</small>
          </div>

          <div className="summary-change">+6.2% dari periode sebelumnya</div>

          <p>Estimasi pengurangan emisi dari aktivitas yang tercatat.</p>
        </div>
      </section>

      {/* TREND + FACULTY */}
      <section className="main-grid">
        {/* BEHAVIORAL TREND */}
        <div className="panel trend-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <div className="panel-icon">{icon.trend}</div>

              <div>
                <h2>Behavioral Trend</h2>
                <p>Perkembangan perilaku keberlanjutan mahasiswa</p>
              </div>
            </div>

            <span className="panel-badge">+20 pts</span>
          </div>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 4" vertical={false} />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />

                <YAxis
                  domain={[40, 90]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip
                  formatter={(value) => [`${value}/100`, "Collective Score"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #dfe9e3",
                    fontSize: "12px",
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#176b3a"
                  strokeWidth={3}
                  dot={{
                    r: 4,
                    fill: "#ffffff",
                    stroke: "#176b3a",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-footer">
            <span>
              Current score <strong>78%</strong>
            </span>

            <span className="positive-text">Positive behavior trajectory</span>
          </div>
        </div>

        {/* FACULTY */}
        <div className="panel faculty-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <div className="panel-icon">{icon.faculty}</div>

              <div>
                <h2>Faculty Pattern</h2>
                <p>Sustainability behavior by faculty</p>
              </div>
            </div>

            <button className="text-button">Compare</button>
          </div>

          <div className="faculty-list">
            {facultyData.map((faculty) => (
              <div className="faculty-item" key={faculty.name}>
                <div className="faculty-name">{faculty.name}</div>

                <div className="faculty-bar">
                  <span
                    style={{
                      width: `${faculty.value}%`,
                    }}
                  ></span>
                </div>

                <div className="faculty-value">{faculty.value}%</div>
              </div>
            ))}
          </div>

          <div className="faculty-footer">
            <span>Highest contribution</span>

            <strong>FTI · 84%</strong>
          </div>
        </div>
      </section>

      {/* HIGH IMPACT ACTIVITIES */}
      <section className="panel activities-panel">
        <div className="panel-header">
          <div className="panel-title-wrap">
            <div className="panel-icon">{icon.activity}</div>

            <div>
              <h2>High-impact Activities</h2>
              <p>
                Aktivitas dengan kontribusi terbesar terhadap perilaku
                berkelanjutan.
              </p>
            </div>
          </div>

          <span className="small-note">Aggregated behavior</span>
        </div>

        <div className="activity-grid">
          {activities.map((activity) => (
            <div className="activity-card" key={activity.number}>
              <div className="activity-number">{activity.number}</div>

              <div className="activity-content">
                <div className="activity-heading">
                  <h3>{activity.title}</h3>

                  <strong>{activity.value}%</strong>
                </div>

                <p>{activity.description}</p>

                <div className="activity-progress">
                  <span
                    style={{
                      width: `${activity.value}%`,
                    }}
                  ></span>
                </div>
              </div>

              <div className="activity-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* PERFORMANCE */}
      <section className="panel performance-panel">
        <div className="panel-header">
          <div className="panel-title-wrap">
            <div className="panel-icon">{icon.target}</div>

            <div>
              <h2>Sustainability Performance</h2>
              <p>Capaian kolektif berdasarkan indikator utama.</p>
            </div>
          </div>

          <div className="performance-score">
            <strong>78</strong>
            <span>/100</span>
          </div>
        </div>

        <div className="performance-content">
          <div className="performance-list">
            {performance.map((item) => (
              <div className="performance-item" key={item.label}>
                <div className="performance-label">
                  <span>{item.label}</span>
                  <strong>{item.value}%</strong>
                </div>

                <div className="performance-bar">
                  <span
                    style={{
                      width: `${item.value}%`,
                    }}
                  ></span>
                </div>
              </div>
            ))}
          </div>

          <div className="collective-insight">
            <div className="insight-icon">{icon.insight}</div>

            <div>
              <span>COLLECTIVE INSIGHT</span>

              <p>
                Perilaku keberlanjutan mahasiswa menunjukkan perkembangan
                positif. Kontribusi paling kuat terlihat pada penggunaan barang
                reusable, sementara pengurangan emisi masih menjadi area yang
                perlu ditingkatkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTNOTE */}
      <div className="collective-footnote">
        {icon.users}

        <span>
          Collective insights are generated from aggregated student behavior
          data.
        </span>
      </div>
    </div>
  );
};

export default CollectiveIntelligence;
