import React, { useState } from "react";

/*
  ============================================================
  ECODAS - BEHAVIOR CHANGE
  ============================================================

  Layer Behavior Change berdasarkan 5 indikator penelitian:

  1. Prompt & Reminder
     Mean = 4.21
     -> Daily reminder

  2. Information & Action Guidance
     Mean = 4.18
     -> Recommended action

  3. Goal Setting & Self Monitoring
     Mean = 4.16
     -> Personal target + progress monitoring

  4. Recognition & Challenge
     Mean = 4.15
     -> Challenge + badge + points

  5. Social Engagement
     Mean = 4.08
     -> Community + leaderboard

  UI dikelompokkan menjadi 3 tab:

  - Hari Ini
  - Progress
  - Challenge
*/

/* ============================================================
   ICON SYSTEM
============================================================ */

const Icon = ({ name, size = 20, strokeWidth = 1.8 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "bell":
      return (
        <svg {...common}>
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M10 21h4" />
        </svg>
      );

    case "leaf":
      return (
        <svg {...common}>
          <path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-6 10-16Z" />
          <path d="M5 20c2-4 5-7 10-9" />
        </svg>
      );

    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" />
        </svg>
      );

    case "award":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="5" />
          <path d="M8.5 12.5 7 21l5-2.5 5 2.5-1.5-8.5" />
        </svg>
      );

    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );

    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );

    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      );

    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      );

    case "close":
      return (
        <svg {...common}>
          <path d="m6 6 12 12" />
          <path d="m18 6-12 12" />
        </svg>
      );

    case "trend":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-9" />
          <path d="M15 6h6v6" />
        </svg>
      );

    case "star":
      return (
        <svg {...common}>
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );

    default:
      return null;
  }
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

const Behavior = () => {
  /* ==========================================================
     MAIN TAB
  ========================================================== */

  const [activeTab, setActiveTab] = useState("today");

  /* ==========================================================
     PROMPT & REMINDER
  ========================================================== */

  const [reminderDone, setReminderDone] = useState(false);

  const [reminderVisible, setReminderVisible] = useState(true);

  /* ==========================================================
     GOAL SETTING & SELF MONITORING
  ========================================================== */

  const [goal, setGoal] = useState({
    title: "Kurangi Kemasan Sekali Pakai",
    current: 3,
    target: 5,
    unit: "kali",
  });

  const [showGoalForm, setShowGoalForm] = useState(false);

  const [newGoalTitle, setNewGoalTitle] = useState("");

  const [newGoalTarget, setNewGoalTarget] = useState("");

  /* ==========================================================
     RECOGNITION & CHALLENGE
  ========================================================== */

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "7 Hari Tanpa Kantong Plastik",
      description:
        "Bawa tas belanja sendiri setiap kali ke kantin atau minimarket kampus.",
      participants: 128,
      points: 50,
      joined: false,
      progress: 0,
    },
    {
      id: 2,
      title: "Tumbler Challenge",
      description:
        "Gunakan tumbler pribadi selama 5 hari kerja berturut-turut.",
      participants: 94,
      points: 40,
      joined: true,
      progress: 60,
    },
    {
      id: 3,
      title: "Hemat Energi",
      description:
        "Matikan lampu dan perangkat listrik ketika ruangan tidak digunakan.",
      participants: 61,
      points: 35,
      joined: false,
      progress: 0,
    },
  ]);

  /* ==========================================================
     RECOGNITION
  ========================================================== */

  const [badges] = useState([
    {
      id: 1,
      title: "Eco Starter",
      description: "Memulai perjalanan konsumsi bijak",
      unlocked: true,
    },
    {
      id: 2,
      title: "Reusable",
      description: "Konsisten menggunakan barang pakai ulang",
      unlocked: true,
    },
    {
      id: 3,
      title: "Green Habit",
      description: "Membangun kebiasaan berkelanjutan",
      unlocked: false,
    },
  ]);

  /* ==========================================================
     SOCIAL ENGAGEMENT
  ========================================================== */

  const [community] = useState([
    {
      rank: 1,
      name: "Anisa R.",
      points: 320,
    },
    {
      rank: 2,
      name: "Bagas P.",
      points: 275,
    },
    {
      rank: 3,
      name: "Kamu",
      points: 240,
      isUser: true,
    },
    {
      rank: 4,
      name: "Dewi S.",
      points: 210,
    },
  ]);

  /* ==========================================================
     INFORMATION & ACTION GUIDANCE
  ========================================================== */

  const recommendations = [
    {
      number: "01",
      title: "Bawa tumbler",
      description: "Gunakan tumbler pribadi ketika membeli minuman di kampus.",
    },
    {
      number: "02",
      title: "Gunakan tas belanja ulang pakai",
      description:
        "Siapkan tas belanja di dalam tas kuliah agar mudah digunakan.",
    },
    {
      number: "03",
      title: "Pilih kemasan lebih sederhana",
      description:
        "Pertimbangkan produk dengan penggunaan kemasan yang lebih minimal.",
    },
  ];

  /* ==========================================================
     GOAL PROGRESS
  ========================================================== */

  const goalProgress = Math.min(
    Math.round((goal.current / goal.target) * 100),
    100,
  );

  /* ==========================================================
     HANDLERS
  ========================================================== */

  const handleIncrementGoal = () => {
    setGoal((prev) => ({
      ...prev,
      current: Math.min(prev.current + 1, prev.target),
    }));
  };

  const handleSetNewGoal = (event) => {
    event.preventDefault();

    if (!newGoalTitle || !newGoalTarget) {
      return;
    }

    const targetValue = Number(newGoalTarget);

    if (targetValue <= 0) {
      return;
    }

    setGoal({
      title: newGoalTitle,
      current: 0,
      target: targetValue,
      unit: "kali",
    });

    setNewGoalTitle("");
    setNewGoalTarget("");
    setShowGoalForm(false);
  };

  const handleJoinChallenge = (id) => {
    setChallenges((previous) =>
      previous.map((challenge) => {
        if (challenge.id !== id) {
          return challenge;
        }

        const joining = !challenge.joined;

        return {
          ...challenge,
          joined: joining,
          participants: joining
            ? challenge.participants + 1
            : challenge.participants - 1,
          progress: joining ? Math.max(challenge.progress, 10) : 0,
        };
      }),
    );
  };

  /* ==========================================================
     TODAY TAB
     Prompt & Reminder
     Information & Action Guidance
  ========================================================== */

  const renderToday = () => (
    <>
      {/* DAILY REMINDER */}

      {reminderVisible && (
        <section style={styles.reminderCard}>
          <div style={styles.reminderIconBox}>
            <Icon name="bell" size={21} />
          </div>

          <div style={styles.reminderContent}>
            <h2 style={styles.reminderTitle}>Pengingat hari ini</h2>

            <p style={styles.reminderText}>
              Bawa tumbler sebelum berangkat ke kampus untuk mengurangi
              penggunaan kemasan sekali pakai.
            </p>
          </div>

          <button
            style={styles.closeButton}
            onClick={() => setReminderVisible(false)}
            aria-label="Tutup pengingat"
          >
            <Icon name="close" size={17} />
          </button>
        </section>
      )}

      {/* TODAY HERO */}

      <section style={styles.todayHero}>
        <div style={styles.heroLeft}>
          <div style={styles.heroIcon}>
            <Icon name="leaf" size={28} />
          </div>

          <div>
            <span style={styles.overline}>TODAY'S ACTION</span>

            <h1 style={styles.heroTitle}>Satu tindakan untuk hari ini.</h1>

            <p style={styles.heroDescription}>
              Perubahan perilaku dimulai dari tindakan sederhana yang dapat
              dilakukan secara konsisten.
            </p>
          </div>
        </div>

        <div style={styles.heroStatus}>
          {reminderDone ? (
            <>
              <div style={styles.statusCircleDone}>
                <Icon name="check" size={23} />
              </div>

              <span style={styles.statusText}>Selesai</span>
            </>
          ) : (
            <>
              <div style={styles.statusCircle}>
                <Icon name="clock" size={22} />
              </div>

              <span style={styles.statusText}>Belum selesai</span>
            </>
          )}
        </div>
      </section>

      {/* ACTION CARD */}

      <section style={styles.actionCard}>
        <div style={styles.actionTop}>
          <div>
            <span style={styles.smallLabel}>RECOMMENDED ACTION</span>

            <h2 style={styles.actionTitle}>
              Bawa tumbler saat membeli minuman.
            </h2>

            <p style={styles.actionDescription}>
              Simpan tumbler di dalam tas kuliah agar selalu siap digunakan.
            </p>
          </div>

          <div style={styles.actionPoint}>
            +10
            <span>poin</span>
          </div>
        </div>

        <button
          style={reminderDone ? styles.doneButton : styles.primaryButton}
          onClick={() => setReminderDone(!reminderDone)}
        >
          {reminderDone ? (
            <>
              <Icon name="check" size={16} />
              Tindakan selesai
            </>
          ) : (
            <>
              Saya sudah melakukannya
              <Icon name="arrow" size={16} />
            </>
          )}
        </button>
      </section>

      {/* INFORMATION & ACTION GUIDANCE */}

      <section style={styles.section}>
        <div style={styles.sectionHeading}>
          <div>
            <span style={styles.overline}>INFORMATION & ACTION GUIDANCE</span>

            <h2 style={styles.sectionTitle}>Rekomendasi untukmu</h2>
          </div>

          <button style={styles.textButton}>
            Lihat semua
            <Icon name="arrow" size={14} />
          </button>
        </div>

        <div style={styles.recommendationGrid}>
          {recommendations.map((item) => (
            <div key={item.number} style={styles.recommendationCard}>
              <span style={styles.recommendationNumber}>{item.number}</span>

              <div style={styles.recommendationIcon}>
                <Icon name="leaf" size={18} />
              </div>

              <h3 style={styles.recommendationTitle}>{item.title}</h3>

              <p style={styles.recommendationText}>{item.description}</p>

              <button style={styles.learnButton}>
                Lihat panduan
                <Icon name="arrow" size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  /* ==========================================================
     PROGRESS TAB
     Goal Setting & Self Monitoring
  ========================================================== */

  const renderProgress = () => (
    <>
      {/* PROGRESS HEADER */}

      <section style={styles.progressHero}>
        <div>
          <span style={styles.overline}>GOAL SETTING & SELF MONITORING</span>

          <h1 style={styles.progressHeroTitle}>Pantau perubahanmu.</h1>

          <p style={styles.progressHeroText}>
            Tetapkan target pribadi dan lihat perkembangan perilaku konsumsi
            berkelanjutan dari waktu ke waktu.
          </p>
        </div>

        <div style={styles.progressVisual}>
          <div style={styles.progressNumber}>{goalProgress}%</div>

          <span style={styles.progressCaption}>progress minggu ini</span>
        </div>
      </section>

      {/* TARGET CARD */}

      <section style={styles.targetCard}>
        <div style={styles.targetHeader}>
          <div style={styles.targetIcon}>
            <Icon name="target" size={21} />
          </div>

          <div style={{ flex: 1 }}>
            <span style={styles.overline}>PERSONAL TARGET</span>

            <h2 style={styles.targetTitle}>{goal.title}</h2>
          </div>

          <button
            style={styles.outlineButton}
            onClick={() => setShowGoalForm(!showGoalForm)}
          >
            {showGoalForm ? "Batal" : "Ganti target"}
          </button>
        </div>

        {showGoalForm ? (
          <form onSubmit={handleSetNewGoal} style={styles.goalForm}>
            <input
              type="text"
              value={newGoalTitle}
              onChange={(event) => setNewGoalTitle(event.target.value)}
              placeholder="Nama target"
              style={styles.input}
            />

            <input
              type="number"
              min="1"
              value={newGoalTarget}
              onChange={(event) => setNewGoalTarget(event.target.value)}
              placeholder="Jumlah target"
              style={styles.input}
            />

            <button type="submit" style={styles.primaryButton}>
              Simpan target
            </button>
          </form>
        ) : (
          <>
            <div style={styles.progressTrack}>
              <div
                style={{
                  ...styles.progressFill,
                  width: `${goalProgress}%`,
                }}
              />
            </div>

            <div style={styles.progressInfo}>
              <div>
                <strong style={styles.progressCurrent}>{goal.current}</strong>

                <span style={styles.progressTarget}>
                  / {goal.target} {goal.unit}
                </span>
              </div>

              <span style={styles.progressPercentage}>{goalProgress}%</span>
            </div>

            <div style={styles.targetActionRow}>
              <div>
                <span style={styles.targetSmallLabel}>STATUS</span>

                <p style={styles.targetStatus}>
                  {goalProgress >= 100
                    ? "Target tercapai"
                    : "Teruskan kebiasaanmu"}
                </p>
              </div>

              <button
                style={styles.primaryButton}
                onClick={handleIncrementGoal}
                disabled={goal.current >= goal.target}
              >
                {goal.current >= goal.target ? (
                  <>
                    <Icon name="check" size={15} />
                    Target tercapai
                  </>
                ) : (
                  <>
                    <Icon name="plus" size={15} />
                    Tandai 1 aktivitas
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </section>

      {/* WEEKLY MONITORING */}

      <section style={styles.section}>
        <div style={styles.sectionHeading}>
          <div>
            <span style={styles.overline}>SELF MONITORING</span>

            <h2 style={styles.sectionTitle}>Perkembangan minggu ini</h2>
          </div>

          <div style={styles.weekLabel}>
            <Icon name="calendar" size={14} />
            Minggu ini
          </div>
        </div>

        <div style={styles.weekGrid}>
          {[
            { day: "Sen", value: true },
            { day: "Sel", value: true },
            { day: "Rab", value: true },
            { day: "Kam", value: false },
            { day: "Jum", value: false },
            { day: "Sab", value: false },
            { day: "Min", value: false },
          ].map((item) => (
            <div key={item.day} style={styles.dayItem}>
              <span style={styles.dayLabel}>{item.day}</span>

              <div style={item.value ? styles.dayDone : styles.dayEmpty}>
                {item.value && <Icon name="check" size={15} />}
              </div>
            </div>
          ))}
        </div>

        <div style={styles.monitoringNote}>
          <Icon name="trend" size={17} />

          <span>
            Konsistensi aktivitasmu menjadi bagian dari pemantauan perubahan
            perilaku.
          </span>
        </div>
      </section>
    </>
  );

  /* ==========================================================
     CHALLENGE TAB
     Recognition & Challenge
     Social Engagement
  ========================================================== */

  const renderChallenge = () => (
    <>
      {/* CHALLENGE HERO */}

      <section style={styles.challengeHero}>
        <div style={styles.challengeHeroIcon}>
          <Icon name="award" size={30} />
        </div>

        <div style={{ flex: 1 }}>
          <span style={styles.overline}>RECOGNITION & CHALLENGE</span>

          <h1 style={styles.challengeHeroTitle}>Tantang dirimu.</h1>

          <p style={styles.challengeHeroText}>
            Ikuti tantangan dan dapatkan penghargaan dari kebiasaan baik yang
            kamu bangun.
          </p>
        </div>

        <div style={styles.pointSummary}>
          <strong>240</strong>

          <span>total poin</span>
        </div>
      </section>

      {/* BADGES */}

      <section style={styles.section}>
        <div style={styles.sectionHeading}>
          <div>
            <span style={styles.overline}>RECOGNITION</span>

            <h2 style={styles.sectionTitle}>Pencapaianmu</h2>
          </div>

          <span style={styles.badgeCount}>2 / 3 unlocked</span>
        </div>

        <div style={styles.badgeGrid}>
          {badges.map((badge) => (
            <div
              key={badge.id}
              style={badge.unlocked ? styles.badgeCard : styles.badgeCardLocked}
            >
              <div
                style={
                  badge.unlocked ? styles.badgeIcon : styles.badgeIconLocked
                }
              >
                <Icon name="star" size={21} />
              </div>

              <div>
                <h3 style={styles.badgeTitle}>{badge.title}</h3>

                <p style={styles.badgeText}>{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHALLENGE LIST */}

      <section style={styles.section}>
        <div style={styles.sectionHeading}>
          <div>
            <span style={styles.overline}>ACTIVE CHALLENGES</span>

            <h2 style={styles.sectionTitle}>Pilih tantangan</h2>
          </div>
        </div>

        <div style={styles.challengeList}>
          {challenges.map((challenge) => (
            <div key={challenge.id} style={styles.challengeCard}>
              <div style={styles.challengeNumber}>0{challenge.id}</div>

              <div style={styles.challengeMain}>
                <div style={styles.challengeTitleRow}>
                  <h3 style={styles.challengeTitle}>{challenge.title}</h3>

                  <span style={styles.pointsBadge}>
                    +{challenge.points} pts
                  </span>
                </div>

                <p style={styles.challengeDescription}>
                  {challenge.description}
                </p>

                <div style={styles.challengeMeta}>
                  <span>{challenge.participants} mahasiswa</span>

                  {challenge.joined && (
                    <>
                      <span>•</span>
                      <span style={styles.joinedText}>Sedang diikuti</span>
                    </>
                  )}
                </div>

                {challenge.joined && (
                  <div style={styles.challengeProgressWrap}>
                    <div style={styles.challengeProgressTrack}>
                      <div
                        style={{
                          ...styles.challengeProgressFill,
                          width: `${challenge.progress}%`,
                        }}
                      />
                    </div>

                    <span>{challenge.progress}%</span>
                  </div>
                )}
              </div>

              <button
                style={
                  challenge.joined ? styles.joinedButton : styles.primaryButton
                }
                onClick={() => handleJoinChallenge(challenge.id)}
              >
                {challenge.joined ? (
                  <>
                    <Icon name="check" size={15} />
                    Diikuti
                  </>
                ) : (
                  "Ikuti challenge"
                )}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL ENGAGEMENT */}

      <section style={styles.communitySection}>
        <div style={styles.communityHeader}>
          <div style={styles.communityIcon}>
            <Icon name="users" size={21} />
          </div>

          <div>
            <span style={styles.overline}>SOCIAL ENGAGEMENT</span>

            <h2 style={styles.sectionTitle}>Komunitas kampus</h2>
          </div>
        </div>

        <p style={styles.communityDescription}>
          Lihat perkembangan poin dan aktivitas mahasiswa dalam challenge
          konsumsi bijak.
        </p>

        <div style={styles.leaderboard}>
          {community.map((person) => (
            <div
              key={person.rank}
              style={
                person.isUser ? styles.leaderboardUser : styles.leaderboardRow
              }
            >
              <span style={styles.rankNumber}>
                {String(person.rank).padStart(2, "0")}
              </span>

              <span style={styles.memberName}>
                {person.name}

                {person.isUser && <span style={styles.youBadge}>Kamu</span>}
              </span>

              <span style={styles.memberPoints}>{person.points} pts</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div style={styles.page}>
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header style={styles.header}>
        <div>
          <div style={styles.breadcrumb}>Home / Behavior Change</div>

          <h1 style={styles.pageTitle}>Behavior Change</h1>

          <p style={styles.pageSubtitle}>
            Bangun kebiasaan konsumsi berkelanjutan melalui tindakan kecil yang
            konsisten.
          </p>
        </div>

        <div style={styles.headerIcon}>
          <Icon name="leaf" size={24} />
        </div>
      </header>

      {/* ======================================================
          TAB NAVIGATION
      ====================================================== */}

      <main style={styles.container}>
        <nav style={styles.tabs}>
          <button
            onClick={() => setActiveTab("today")}
            style={{
              ...styles.tab,
              ...(activeTab === "today" ? styles.activeTab : {}),
            }}
          >
            <span>Hari Ini</span>

            {activeTab === "today" && <span style={styles.activeDot} />}
          </button>

          <button
            onClick={() => setActiveTab("progress")}
            style={{
              ...styles.tab,
              ...(activeTab === "progress" ? styles.activeTab : {}),
            }}
          >
            <span>Progress</span>

            {activeTab === "progress" && <span style={styles.activeDot} />}
          </button>

          <button
            onClick={() => setActiveTab("challenge")}
            style={{
              ...styles.tab,
              ...(activeTab === "challenge" ? styles.activeTab : {}),
            }}
          >
            <span>Challenge</span>

            {activeTab === "challenge" && <span style={styles.activeDot} />}
          </button>
        </nav>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div style={styles.content}>
          {activeTab === "today" && renderToday()}

          {activeTab === "progress" && renderProgress()}

          {activeTab === "challenge" && renderChallenge()}
        </div>
      </main>
    </div>
  );
};

/* ============================================================
   STYLES
============================================================ */

const styles = {
  /* ==========================================================
     GLOBAL
  ========================================================== */

  page: {
    minHeight: "100vh",
    backgroundColor: "#f7f8f6",
    color: "#202622",
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },

  /* ==========================================================
     HEADER
  ========================================================== */

  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e3e7e4",
    padding: "25px 42px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  breadcrumb: {
    fontSize: "11px",
    color: "#8a938c",
    marginBottom: "9px",
  },

  pageTitle: {
    margin: 0,
    fontSize: "26px",
    lineHeight: 1.2,
    fontWeight: 650,
    letterSpacing: "-0.5px",
    color: "#202622",
  },

  pageSubtitle: {
    margin: "7px 0 0",
    fontSize: "13px",
    color: "#737c76",
    lineHeight: 1.5,
  },

  headerIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "12px",
    backgroundColor: "#edf4ee",
    color: "#3f7650",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  /* ==========================================================
     MAIN CONTAINER
  ========================================================== */

  container: {
    width: "100%",
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "22px 42px 45px",
    boxSizing: "border-box",
  },

  /* ==========================================================
     TABS
  ========================================================== */

  tabs: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
    borderBottom: "1px solid #dfe5e1",
    marginBottom: "22px",
  },

  tab: {
    position: "relative",
    border: "none",
    background: "transparent",
    padding: "11px 2px 13px",
    color: "#858e88",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
  },

  activeTab: {
    color: "#3f7650",
  },

  activeDot: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "-1px",
    height: "2px",
    backgroundColor: "#3f7650",
    borderRadius: "4px",
  },

  /* ==========================================================
     GENERAL
  ========================================================== */

  content: {
    display: "flex",
    flexDirection: "column",
    gap: "22px",
  },

  overline: {
    display: "block",
    fontSize: "9px",
    fontWeight: 750,
    letterSpacing: "0.9px",
    color: "#7b857e",
    marginBottom: "6px",
  },

  section: {
    width: "100%",
  },

  sectionHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "14px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 650,
    color: "#252c28",
    letterSpacing: "-0.2px",
  },

  textButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    border: "none",
    background: "transparent",
    color: "#3f7650",
    fontSize: "11px",
    fontWeight: 650,
    cursor: "pointer",
  },

  /* ==========================================================
     REMINDER
  ========================================================== */

  reminderCard: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e7e1",
    borderRadius: "10px",
    padding: "15px 18px",
  },

  reminderIconBox: {
    width: "40px",
    height: "40px",
    flexShrink: 0,
    borderRadius: "8px",
    backgroundColor: "#edf4ee",
    color: "#3f7650",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  reminderContent: {
    flex: 1,
  },

  reminderTitle: {
    margin: 0,
    fontSize: "14px",
    fontWeight: 650,
    color: "#303833",
  },

  reminderText: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#737c76",
    lineHeight: 1.5,
  },

  closeButton: {
    width: "30px",
    height: "30px",
    border: "none",
    background: "transparent",
    color: "#9aa29d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  /* ==========================================================
     TODAY HERO
  ========================================================== */

  todayHero: {
    backgroundColor: "#3f7650",
    borderRadius: "12px",
    padding: "28px 30px",
    color: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "145px",
    boxSizing: "border-box",
  },

  heroLeft: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    maxWidth: "720px",
  },

  heroIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "12px",
    backgroundColor: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  heroTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 620,
    letterSpacing: "-0.3px",
  },

  heroDescription: {
    margin: "7px 0 0",
    fontSize: "12px",
    lineHeight: 1.55,
    color: "rgba(255,255,255,0.78)",
  },

  heroStatus: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "7px",
    minWidth: "100px",
  },

  statusCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statusCircleDone: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "#ffffff",
    color: "#3f7650",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  statusText: {
    fontSize: "10px",
    color: "rgba(255,255,255,0.82)",
  },

  /* ==========================================================
     ACTION CARD
  ========================================================== */

  actionCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1e6e3",
    borderRadius: "10px",
    padding: "24px 26px",
  },

  actionTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "25px",
    marginBottom: "20px",
  },

  smallLabel: {
    display: "block",
    fontSize: "9px",
    letterSpacing: "0.8px",
    fontWeight: 750,
    color: "#87918a",
    marginBottom: "6px",
  },

  actionTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 650,
    color: "#28302b",
  },

  actionDescription: {
    margin: "6px 0 0",
    fontSize: "12px",
    lineHeight: 1.55,
    color: "#778079",
  },

  actionPoint: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#3f7650",
    whiteSpace: "nowrap",
    textAlign: "right",
  },

  actionPoint: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#3f7650",
    whiteSpace: "nowrap",
    textAlign: "right",
  },

  /* ==========================================================
     BUTTONS
  ========================================================== */

  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    border: "none",
    backgroundColor: "#3f7650",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 650,
    cursor: "pointer",
  },

  doneButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "7px",
    border: "1px solid #d7e4da",
    backgroundColor: "#f1f6f2",
    color: "#3f7650",
    padding: "10px 16px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 650,
    cursor: "pointer",
  },

  outlineButton: {
    border: "1px solid #d7ddd9",
    backgroundColor: "#ffffff",
    color: "#3f7650",
    padding: "8px 13px",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: 650,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  /* ==========================================================
     RECOMMENDATIONS
  ========================================================== */

  recommendationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "13px",
  },

  recommendationCard: {
    position: "relative",
    backgroundColor: "#ffffff",
    border: "1px solid #e1e6e3",
    borderRadius: "9px",
    padding: "19px",
    minHeight: "185px",
    boxSizing: "border-box",
    overflow: "hidden",
  },

  recommendationNumber: {
    position: "absolute",
    right: "16px",
    top: "14px",
    fontSize: "10px",
    color: "#b0b7b2",
    fontWeight: 650,
  },

  recommendationIcon: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    backgroundColor: "#edf4ee",
    color: "#3f7650",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px",
  },

  recommendationTitle: {
    margin: 0,
    fontSize: "13px",
    fontWeight: 650,
    color: "#303833",
  },

  recommendationText: {
    margin: "6px 0 13px",
    fontSize: "11px",
    lineHeight: 1.55,
    color: "#7b847e",
  },

  learnButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    border: "none",
    background: "transparent",
    padding: 0,
    color: "#3f7650",
    fontSize: "10px",
    fontWeight: 650,
    cursor: "pointer",
  },

  /* ==========================================================
     PROGRESS HERO
  ========================================================== */

  progressHero: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1e6e3",
    borderRadius: "12px",
    padding: "29px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  progressHeroTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 650,
    color: "#252c28",
  },

  progressHeroText: {
    maxWidth: "600px",
    margin: "7px 0 0",
    fontSize: "12px",
    lineHeight: 1.6,
    color: "#747e77",
  },

  progressVisual: {
    minWidth: "135px",
    textAlign: "right",
  },

  progressNumber: {
    fontSize: "34px",
    fontWeight: 700,
    color: "#3f7650",
    lineHeight: 1,
  },

  progressCaption: {
    display: "block",
    marginTop: "6px",
    fontSize: "10px",
    color: "#8a938d",
  },

  /* ==========================================================
     TARGET
  ========================================================== */

  targetCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1e6e3",
    borderRadius: "10px",
    padding: "25px 27px",
  },

  targetHeader: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    marginBottom: "24px",
  },

  targetIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "8px",
    backgroundColor: "#edf4ee",
    color: "#3f7650",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  targetTitle: {
    margin: 0,
    fontSize: "16px",
    fontWeight: 650,
    color: "#303833",
  },

  progressTrack: {
    width: "100%",
    height: "10px",
    borderRadius: "20px",
    backgroundColor: "#e9edea",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: "20px",
    backgroundColor: "#4f8059",
    transition: "width 0.3s ease",
  },

  progressInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "12px",
  },

  progressCurrent: {
    fontSize: "23px",
    color: "#303833",
  },

  progressTarget: {
    fontSize: "12px",
    color: "#8b948e",
    marginLeft: "4px",
  },

  progressPercentage: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#3f7650",
  },

  targetActionRow: {
    marginTop: "25px",
    paddingTop: "19px",
    borderTop: "1px solid #edf0ee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  targetSmallLabel: {
    display: "block",
    fontSize: "9px",
    letterSpacing: "0.8px",
    color: "#9aa29d",
    fontWeight: 700,
  },

  targetStatus: {
    margin: "4px 0 0",
    fontSize: "12px",
    color: "#4d5751",
  },

  goalForm: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    border: "1px solid #d9dfdb",
    borderRadius: "6px",
    outline: "none",
    fontSize: "12px",
    color: "#303833",
  },

  /* ==========================================================
     WEEKLY MONITORING
  ========================================================== */

  weekLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "10px",
    color: "#818a84",
  },

  weekGrid: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1e6e3",
    borderRadius: "10px",
    padding: "21px 25px",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "10px",
  },

  dayItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "9px",
  },

  dayLabel: {
    fontSize: "10px",
    color: "#818a84",
  },

  dayDone: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    backgroundColor: "#3f7650",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  dayEmpty: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    border: "1px solid #dce2de",
    backgroundColor: "#fafbfa",
    boxSizing: "border-box",
  },

  monitoringNote: {
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "11px",
    color: "#7d8780",
  },

  /* ==========================================================
     CHALLENGE HERO
  ========================================================== */

  challengeHero: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1e6e3",
    borderRadius: "12px",
    padding: "28px 30px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  challengeHeroIcon: {
    width: "55px",
    height: "55px",
    borderRadius: "11px",
    backgroundColor: "#edf4ee",
    color: "#3f7650",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  challengeHeroTitle: {
    margin: 0,
    fontSize: "23px",
    fontWeight: 650,
    color: "#252c28",
  },

  challengeHeroText: {
    margin: "6px 0 0",
    fontSize: "12px",
    color: "#768078",
    lineHeight: 1.55,
  },

  pointSummary: {
    marginLeft: "auto",
    textAlign: "right",
    minWidth: "100px",
  },

  pointSummaryStrong: {
    fontSize: "28px",
    color: "#3f7650",
  },

  /* ==========================================================
     BADGES
  ========================================================== */

  badgeCount: {
    fontSize: "10px",
    color: "#8b948e",
  },

  badgeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "13px",
  },

  badgeCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#ffffff",
    border: "1px solid #dfe8e1",
    borderRadius: "9px",
  },

  badgeCardLocked: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    backgroundColor: "#fafbfa",
    border: "1px dashed #dfe3e0",
    borderRadius: "9px",
    opacity: 0.65,
  },

  badgeIcon: {
    width: "39px",
    height: "39px",
    flexShrink: 0,
    borderRadius: "50%",
    backgroundColor: "#edf4ee",
    color: "#3f7650",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeIconLocked: {
    width: "39px",
    height: "39px",
    flexShrink: 0,
    borderRadius: "50%",
    backgroundColor: "#eef0ee",
    color: "#9aa29d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  badgeTitle: {
    margin: 0,
    fontSize: "12px",
    fontWeight: 650,
    color: "#303833",
  },

  badgeText: {
    margin: "4px 0 0",
    fontSize: "10px",
    lineHeight: 1.4,
    color: "#7c857f",
  },

  /* ==========================================================
     CHALLENGE LIST
  ========================================================== */

  challengeList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  challengeCard: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    backgroundColor: "#ffffff",
    border: "1px solid #e1e6e3",
    borderRadius: "9px",
    padding: "18px 19px",
  },

  challengeNumber: {
    width: "37px",
    flexShrink: 0,
    fontSize: "10px",
    fontWeight: 700,
    color: "#a0a8a2",
  },

  challengeMain: {
    flex: 1,
    minWidth: 0,
  },

  challengeTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },

  challengeTitle: {
    margin: 0,
    fontSize: "13px",
    fontWeight: 650,
    color: "#303833",
  },

  pointsBadge: {
    padding: "4px 7px",
    backgroundColor: "#edf4ee",
    color: "#3f7650",
    borderRadius: "4px",
    fontSize: "9px",
    fontWeight: 700,
    whiteSpace: "nowrap",
  },

  challengeDescription: {
    margin: "5px 0",
    fontSize: "11px",
    lineHeight: 1.5,
    color: "#7b847e",
  },

  challengeMeta: {
    display: "flex",
    gap: "7px",
    alignItems: "center",
    fontSize: "9px",
    color: "#929a94",
  },

  joinedText: {
    color: "#3f7650",
    fontWeight: 650,
  },

  challengeProgressWrap: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    marginTop: "9px",
    maxWidth: "400px",
  },

  challengeProgressTrack: {
    height: "5px",
    flex: 1,
    backgroundColor: "#e9edea",
    borderRadius: "10px",
    overflow: "hidden",
  },

  challengeProgressFill: {
    height: "100%",
    backgroundColor: "#4f8059",
    borderRadius: "10px",
  },

  challengeProgressWrapSpan: {
    fontSize: "9px",
    color: "#7d8780",
  },

  joinedButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    border: "1px solid #d9e3dc",
    backgroundColor: "#f1f5f2",
    color: "#617067",
    padding: "9px 13px",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: 650,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  /* ==========================================================
     COMMUNITY
  ========================================================== */

  communitySection: {
    backgroundColor: "#ffffff",
    border: "1px solid #e1e6e3",
    borderRadius: "10px",
    padding: "23px 25px",
  },

  communityHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  communityIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    backgroundColor: "#edf4ee",
    color: "#3f7650",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  communityDescription: {
    margin: "13px 0 17px",
    fontSize: "11px",
    color: "#7b847e",
  },

  leaderboard: {
    borderTop: "1px solid #edf0ee",
  },

  leaderboardRow: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "13px 5px",
    borderBottom: "1px solid #edf0ee",
  },

  leaderboardUser: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    padding: "13px 9px",
    borderBottom: "1px solid #edf0ee",
    backgroundColor: "#f5f9f6",
    borderRadius: "5px",
  },

  rankNumber: {
    width: "28px",
    fontSize: "10px",
    color: "#8f9892",
    fontWeight: 700,
  },

  memberName: {
    flex: 1,
    fontSize: "12px",
    color: "#343c37",
    fontWeight: 600,
  },

  memberPoints: {
    fontSize: "11px",
    color: "#3f7650",
    fontWeight: 700,
  },

  youBadge: {
    display: "inline-block",
    marginLeft: "7px",
    padding: "3px 6px",
    borderRadius: "4px",
    backgroundColor: "#e6f0e8",
    color: "#3f7650",
    fontSize: "8px",
    fontWeight: 700,
  },
};

export default Behavior;
