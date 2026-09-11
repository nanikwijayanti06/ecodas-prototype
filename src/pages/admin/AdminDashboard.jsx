import React from "react";
import {
  Users,
  Activity,
  TrendingUp,
  Leaf,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Building2,
  Target,
  AlertCircle,
} from "lucide-react";

import "./AdminDashboard.css";


export default function AdminDashboard() {
  // =====================================================
  // PROTOTYPE DATA
  // Data ini masih berupa simulasi untuk tampilan prototype.
  // =====================================================

  const overviewData = [
    {
      label: "Student Participation",
      value: "1,284",
      description: "mahasiswa tercatat",
      trend: "+8.4%",
      trendType: "up",
      icon: Users,
    },
    {
      label: "Activity Records",
      value: "8,492",
      description: "aktivitas konsumsi",
      trend: "+12.6%",
      trendType: "up",
      icon: Activity,
    },
    {
      label: "Sustainability Performance",
      value: "78%",
      description: "performa keberlanjutan",
      trend: "+5.2%",
      trendType: "up",
      icon: Leaf,
    },
    {
      label: "Behavior Change",
      value: "+14.8%",
      description: "perubahan perilaku",
      trend: "vs. baseline",
      trendType: "up",
      icon: TrendingUp,
    },
  ];


  // =====================================================
  // FACULTY PATTERN
  // =====================================================

  const facultyPattern = [
    {
      faculty: "Fakultas Teknik",
      students: 318,
      activities: 2146,
      score: 82,
    },
    {
      faculty: "Fakultas Ekonomi",
      students: 276,
      activities: 1872,
      score: 79,
    },
    {
      faculty: "Fakultas Ilmu Pendidikan",
      students: 241,
      activities: 1568,
      score: 77,
    },
    {
      faculty: "Fakultas Bahasa, Seni, dan Budaya",
      students: 198,
      activities: 1304,
      score: 74,
    },
    {
      faculty: "Fakultas Ilmu Keolahragaan",
      students: 151,
      activities: 1021,
      score: 71,
    },
  ];


  // =====================================================
  // CAMPUS CONSUMPTION PATTERN
  // =====================================================

  const consumptionPattern = [
    {
      category: "Makanan",
      value: 34,
    },
    {
      category: "Transportasi",
      value: 27,
    },
    {
      category: "Plastik",
      value: 21,
    },
    {
      category: "Energi",
      value: 12,
    },
    {
      category: "Digital",
      value: 6,
    },
  ];


  // =====================================================
  // BEHAVIORAL TREND
  // =====================================================

  const behavioralTrend = [
    {
      month: "Apr",
      awareness: 58,
      behavior: 42,
    },
    {
      month: "Mei",
      awareness: 63,
      behavior: 48,
    },
    {
      month: "Jun",
      awareness: 67,
      behavior: 53,
    },
    {
      month: "Jul",
      awareness: 71,
      behavior: 59,
    },
    {
      month: "Agu",
      awareness: 75,
      behavior: 65,
    },
    {
      month: "Sep",
      awareness: 78,
      behavior: 70,
    },
  ];


  // =====================================================
  // HIGH IMPACT ACTIVITIES
  // =====================================================

  const highImpactActivities = [
    {
      rank: "01",
      activity: "Menggunakan transportasi umum",
      category: "Transportasi",
      contribution: "28%",
      records: 1248,
    },
    {
      rank: "02",
      activity: "Membawa tumbler",
      category: "Konsumsi",
      contribution: "22%",
      records: 986,
    },
    {
      rank: "03",
      activity: "Mengurangi plastik sekali pakai",
      category: "Plastik",
      contribution: "19%",
      records: 842,
    },
    {
      rank: "04",
      activity: "Membawa bekal",
      category: "Makanan",
      contribution: "16%",
      records: 716,
    },
  ];


  // =====================================================
  // SUSTAINABILITY PERFORMANCE
  // =====================================================

  const performanceData = [
    {
      label: "Awareness Level",
      value: 78,
    },
    {
      label: "Feedback Engagement",
      value: 72,
    },
    {
      label: "Behavior Change",
      value: 70,
    },
    {
      label: "Sustainability Performance",
      value: 78,
    },
  ];


  return (
    <div className="admin-dashboard">


      {/* =================================================
          HEADER
      ================================================= */}

      <section className="admin-dashboard-header">

        <div>
          <div className="admin-eyebrow">
            INSTITUTIONAL OVERVIEW
          </div>

          <h1>
            Sustainability Intelligence
          </h1>

          <p>
            Ringkasan kolektif perilaku konsumsi mahasiswa
            berdasarkan data pada framework Bijak-M.
          </p>
        </div>


        <div className="admin-status">

          <span className="admin-status-dot"></span>

          <span>
            Prototype data
          </span>

        </div>

      </section>



      {/* =================================================
          PROTOTYPE NOTICE
      ================================================= */}

      <div className="admin-prototype-notice">

        <AlertCircle size={17} />

        <div>
          <strong>Prototype / simulated data</strong>

          <span>
            Nilai pada dashboard ini merupakan data simulasi
            untuk demonstrasi sistem, bukan hasil pengukuran
            aktual mahasiswa.
          </span>
        </div>

      </div>



      {/* =================================================
          OVERVIEW CARDS
      ================================================= */}

      <section className="admin-overview-grid">

        {overviewData.map((item) => {

          const Icon = item.icon;

          return (
            <div
              className="admin-overview-card"
              key={item.label}
            >

              <div className="admin-overview-top">

                <div className="admin-overview-icon">
                  <Icon size={19} strokeWidth={1.8} />
                </div>

                <span className="admin-overview-label">
                  {item.label}
                </span>

              </div>


              <div className="admin-overview-value">
                {item.value}
              </div>


              <div className="admin-overview-bottom">

                <span>
                  {item.description}
                </span>

                <span className="admin-trend">

                  <ArrowUpRight size={14} />

                  {item.trend}

                </span>

              </div>

            </div>
          );

        })}

      </section>



      {/* =================================================
          LAYER 4
          COLLECTIVE INTELLIGENCE
      ================================================= */}

      <div className="admin-section-heading">

        <div>

          <span>
            LAYER 04
          </span>

          <h2>
            Collective Intelligence
          </h2>

        </div>

        <p>
          Agregasi pola konsumsi dan perubahan perilaku
          mahasiswa pada tingkat fakultas dan kampus.
        </p>

      </div>



      {/* =================================================
          FACULTY PATTERN + CONSUMPTION PATTERN
      ================================================= */}

      <section className="admin-main-grid">


        {/* FACULTY PATTERN */}

        <div className="admin-panel admin-faculty-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-kicker">
                FACULTY PATTERN
              </span>

              <h3>
                Sustainability performance
              </h3>

            </div>

            <Building2 size={19} />

          </div>


          <div className="admin-table">

            <div className="admin-table-head">

              <span>
                Faculty
              </span>

              <span>
                Students
              </span>

              <span>
                Activities
              </span>

              <span>
                Score
              </span>

            </div>


            {facultyPattern.map((item) => (

              <div
                className="admin-table-row"
                key={item.faculty}
              >

                <div className="admin-faculty-name">
                  {item.faculty}
                </div>

                <span>
                  {item.students}
                </span>

                <span>
                  {item.activities.toLocaleString()}
                </span>

                <strong>
                  {item.score}
                </strong>

              </div>

            ))}

          </div>

        </div>



        {/* CAMPUS PATTERN */}

        <div className="admin-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-kicker">
                CAMPUS PATTERN
              </span>

              <h3>
                Consumption pattern
              </h3>

            </div>

            <BarChart3 size={19} />

          </div>


          <div className="admin-consumption-list">

            {consumptionPattern.map((item) => (

              <div
                className="admin-consumption-item"
                key={item.category}
              >

                <div className="admin-consumption-label">

                  <span>
                    {item.category}
                  </span>

                  <strong>
                    {item.value}%
                  </strong>

                </div>


                <div className="admin-progress-track">

                  <div
                    className="admin-progress-fill"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* =================================================
          BEHAVIORAL TREND
      ================================================= */}

      <section className="admin-panel admin-trend-panel">

        <div className="admin-panel-header">

          <div>

            <span className="admin-panel-kicker">
              BEHAVIORAL TREND
            </span>

            <h3>
              Awareness → behavior change
            </h3>

          </div>

          <TrendingUp size={19} />

        </div>


        <div className="admin-chart">

          {behavioralTrend.map((item) => (

            <div
              className="admin-chart-column"
              key={item.month}
            >

              <div className="admin-chart-values">

                <span>
                  {item.awareness}
                </span>

                <span>
                  {item.behavior}
                </span>

              </div>


              <div className="admin-chart-bars">

                <div
                  className="admin-chart-bar admin-chart-awareness"
                  style={{
                    height: `${item.awareness}%`,
                  }}
                />

                <div
                  className="admin-chart-bar admin-chart-behavior"
                  style={{
                    height: `${item.behavior}%`,
                  }}
                />

              </div>


              <span className="admin-chart-label">
                {item.month}
              </span>

            </div>

          ))}

        </div>


        <div className="admin-chart-legend">

          <span>
            <i className="admin-legend-awareness"></i>
            Awareness
          </span>

          <span>
            <i className="admin-legend-behavior"></i>
            Behavior Change
          </span>

        </div>

      </section>



      {/* =================================================
          HIGH IMPACT ACTIVITIES
          + SUSTAINABILITY PERFORMANCE
      ================================================= */}

      <section className="admin-bottom-grid">


        {/* HIGH IMPACT */}

        <div className="admin-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-kicker">
                HIGH-IMPACT ACTIVITIES
              </span>

              <h3>
                Aktivitas dengan kontribusi terbesar
              </h3>

            </div>

            <Target size={19} />

          </div>


          <div className="admin-impact-list">

            {highImpactActivities.map((item) => (

              <div
                className="admin-impact-row"
                key={item.rank}
              >

                <div className="admin-impact-rank">
                  {item.rank}
                </div>


                <div className="admin-impact-info">

                  <strong>
                    {item.activity}
                  </strong>

                  <span>
                    {item.category} · {item.records.toLocaleString()} records
                  </span>

                </div>


                <div className="admin-impact-value">
                  {item.contribution}
                </div>

              </div>

            ))}

          </div>

        </div>



        {/* SUSTAINABILITY PERFORMANCE */}

        <div className="admin-panel">

          <div className="admin-panel-header">

            <div>

              <span className="admin-panel-kicker">
                SUSTAINABILITY PERFORMANCE
              </span>

              <h3>
                Institutional indicators
              </h3>

            </div>

            <Leaf size={19} />

          </div>


          <div className="admin-performance-list">

            {performanceData.map((item) => (

              <div
                className="admin-performance-row"
                key={item.label}
              >

                <div className="admin-performance-label">

                  <span>
                    {item.label}
                  </span>

                  <strong>
                    {item.value}%
                  </strong>

                </div>


                <div className="admin-progress-track">

                  <div
                    className="admin-progress-fill"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>



      {/* =================================================
          LAYER 5 PREVIEW
      ================================================= */}

      <section className="admin-decision-preview">

        <div>

          <span>
            LAYER 05
          </span>

          <h2>
            Decision Support
          </h2>

          <p>
            Collective intelligence digunakan sebagai dasar
            untuk menentukan prioritas intervensi dan
            rekomendasi keberlanjutan.
          </p>

        </div>


        <div className="admin-decision-priorities">

          <div className="admin-priority priority-high">
            <strong>High</strong>
            <span>Intervensi prioritas</span>
          </div>

          <div className="admin-priority priority-medium">
            <strong>Medium</strong>
            <span>Penguatan perilaku</span>
          </div>

          <div className="admin-priority priority-supporting">
            <strong>Supporting</strong>
            <span>Dukungan tambahan</span>
          </div>

        </div>

      </section>


    </div>
  );
}