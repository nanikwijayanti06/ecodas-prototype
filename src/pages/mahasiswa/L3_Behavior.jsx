import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Edit3,
  ImagePlus,
  Leaf,
  MoreHorizontal,
  Plus,
  Target,
  Trash2,
  Trophy,
  Upload,
  Users,
  X,
} from "lucide-react";
import "./mahasiswa.css";

/* =========================================================
   BEHAVIOR CHANGE
   Layer 3 ECODAS
   ========================================================= */

const STORAGE_ACTIONS = "ecodas_behavior_actions";
const STORAGE_GOALS = "ecodas_behavior_goals";

/* ---------------------------------------------------------
   Prototype carbon factors
   NOTE:
   These are demonstration values only.
   Replace with validated calculation rules later.
   --------------------------------------------------------- */

const carbonByActivity = {
  "Membawa tumbler": 0.18,
  "Menggunakan reusable bag": 0.12,
  "Menghindari botol plastik sekali pakai": 0.2,
  "Menggunakan transportasi umum": 0.65,
  "Berjalan kaki ke kampus": 0.72,
  "Bersepeda ke kampus": 0.7,
  "Mengurangi penggunaan AC": 0.35,
  "Mematikan perangkat setelah digunakan": 0.16,
  "Memilih makanan tanpa kemasan sekali pakai": 0.22,
};

const activityOptions = [
  {
    label: "Membawa tumbler",
    category: "Plastik & Kemasan",
    carbon: 0.18,
  },
  {
    label: "Menggunakan reusable bag",
    category: "Plastik & Kemasan",
    carbon: 0.12,
  },
  {
    label: "Menghindari botol plastik sekali pakai",
    category: "Plastik & Kemasan",
    carbon: 0.2,
  },
  {
    label: "Menggunakan transportasi umum",
    category: "Transportasi",
    carbon: 0.65,
  },
  {
    label: "Berjalan kaki ke kampus",
    category: "Transportasi",
    carbon: 0.72,
  },
  {
    label: "Bersepeda ke kampus",
    category: "Transportasi",
    carbon: 0.7,
  },
  {
    label: "Mengurangi penggunaan AC",
    category: "Energi",
    carbon: 0.35,
  },
  {
    label: "Mematikan perangkat setelah digunakan",
    category: "Energi",
    carbon: 0.16,
  },
  {
    label: "Memilih makanan tanpa kemasan sekali pakai",
    category: "Makanan",
    carbon: 0.22,
  },
];

const categoryOptions = [
  "Plastik & Kemasan",
  "Transportasi",
  "Energi",
  "Makanan",
];

const challenge = {
  title: "5-Day Low Waste",
  description:
    "Lakukan minimal satu tindakan konsumsi berkelanjutan setiap hari selama lima hari.",
  target: 5,
};

/* ---------------------------------------------------------
   Helpers
   --------------------------------------------------------- */

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDayName(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return date.toLocaleDateString("id-ID", {
    weekday: "short",
  });
}

function getLastSevenDays() {
  const result = [];

  for (let i = 6; i >= 0; i -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);

    result.push(date.toISOString().slice(0, 10));
  }

  return result;
}

function createId(prefix = "id") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/* ---------------------------------------------------------
   Initial demo data
   --------------------------------------------------------- */

const initialActions = [
  {
    id: "action_1",
    activity: "Membawa tumbler",
    category: "Plastik & Kemasan",
    date: getToday(),
    carbon: 0.18,
    note: "Membawa tumbler sendiri saat ke kampus.",
    proof: "",
    completed: true,
  },
  {
    id: "action_2",
    activity: "Berjalan kaki ke kampus",
    category: "Transportasi",
    date: getToday(),
    carbon: 0.72,
    note: "Berjalan kaki untuk perjalanan pendek.",
    proof: "",
    completed: false,
  },
  {
    id: "action_3",
    activity: "Mematikan perangkat setelah digunakan",
    category: "Energi",
    date: getToday(),
    carbon: 0.16,
    note: "",
    proof: "",
    completed: false,
  },
];

const initialGoals = [
  {
    id: "goal_1",
    title: "Membawa reusable bottle",
    category: "Plastik & Kemasan",
    description: "Mengurangi penggunaan botol minum sekali pakai.",
    target: 5,
    reminder: "08:00",
    active: true,
  },
  {
    id: "goal_2",
    title: "Mengurangi perjalanan bermotor",
    category: "Transportasi",
    description: "Memilih berjalan kaki, bersepeda, atau transportasi umum.",
    target: 4,
    reminder: "07:30",
    active: true,
  },
];

/* =========================================================
   COMPONENT
   ========================================================= */

export default function L3_Behavior() {
  const [actions, setActions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ACTIONS);
      return saved ? JSON.parse(saved) : initialActions;
    } catch {
      return initialActions;
    }
  });

  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_GOALS);
      return saved ? JSON.parse(saved) : initialGoals;
    } catch {
      return initialGoals;
    }
  });

  const [actionModal, setActionModal] = useState(false);
  const [goalModal, setGoalModal] = useState(false);
  const [editAction, setEditAction] = useState(null);
  const [editGoal, setEditGoal] = useState(null);

  const [selectedAction, setSelectedAction] = useState(null);
  const [menuAction, setMenuAction] = useState(null);
  const [menuGoal, setMenuGoal] = useState(null);

  const [reminderDone, setReminderDone] = useState(false);
  const [challengeJoined, setChallengeJoined] = useState(false);

  /* -------------------------------------------------------
     Persist
     ------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem(STORAGE_ACTIONS, JSON.stringify(actions));
  }, [actions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_GOALS, JSON.stringify(goals));
  }, [goals]);

  /* -------------------------------------------------------
     Form state
     ------------------------------------------------------- */

  const emptyAction = {
    activity: "",
    category: "",
    date: getToday(),
    note: "",
    proof: "",
  };

  const emptyGoal = {
    title: "",
    category: "",
    description: "",
    target: 5,
    reminder: "08:00",
  };

  const [actionForm, setActionForm] = useState(emptyAction);
  const [goalForm, setGoalForm] = useState(emptyGoal);

  /* -------------------------------------------------------
     Calculations
     ------------------------------------------------------- */

  const today = getToday();
  const lastSevenDays = getLastSevenDays();

  const completedActions = useMemo(
    () => actions.filter((action) => action.completed),
    [actions],
  );

  const totalCarbon = useMemo(
    () =>
      completedActions.reduce(
        (sum, action) => sum + Number(action.carbon || 0),
        0,
      ),
    [completedActions],
  );

  const todayActions = useMemo(
    () => actions.filter((action) => action.date === today),
    [actions, today],
  );

  const weeklyActions = useMemo(
    () => actions.filter((action) => lastSevenDays.includes(action.date)),
    [actions, lastSevenDays],
  );

  const weeklyCompleted = weeklyActions.filter(
    (action) => action.completed,
  ).length;

  const activeGoals = goals.filter((goal) => goal.active);

  const weeklyCompletion =
    activeGoals.length > 0
      ? Math.min(
          100,
          Math.round(
            (weeklyCompleted / Math.max(activeGoals.length * 5, 1)) * 100,
          ),
        )
      : 0;

  const challengeProgress = Math.min(
    challenge.target,
    new Set(
      completedActions
        .filter((action) => action.date)
        .map((action) => action.date),
    ).size,
  );

  /* -------------------------------------------------------
     Weekly chart
     ------------------------------------------------------- */

  const chartData = lastSevenDays.map((date) => {
    const count = actions.filter(
      (action) => action.date === date && action.completed,
    ).length;

    return {
      date,
      day: getDayName(date),
      count,
    };
  });

  const maxChart = Math.max(...chartData.map((item) => item.count), 1);

  /* -------------------------------------------------------
     Goal progress
     ------------------------------------------------------- */

  function getGoalProgress(goal) {
    const title = goal.title.toLowerCase();

    const matchedActions = actions.filter((action) => {
      const actionName = action.activity.toLowerCase();

      if (goal.category === "Plastik & Kemasan") {
        return (
          action.category === goal.category &&
          (actionName.includes("tumbler") ||
            actionName.includes("reusable") ||
            actionName.includes("plastik"))
        );
      }

      if (goal.category === "Transportasi") {
        return (
          action.category === goal.category &&
          (actionName.includes("jalan") ||
            actionName.includes("sepeda") ||
            actionName.includes("transportasi"))
        );
      }

      return (
        action.category === goal.category &&
        actionName.includes(title.split(" ")[0])
      );
    });

    return matchedActions.filter(
      (action) => action.completed && lastSevenDays.includes(action.date),
    ).length;
  }

  /* -------------------------------------------------------
     Action CRUD
     ------------------------------------------------------- */

  function openCreateAction() {
    setEditAction(null);
    setActionForm(emptyAction);
    setActionModal(true);
  }

  function openEditAction(action) {
    setEditAction(action);
    setActionForm({
      activity: action.activity,
      category: action.category,
      date: action.date,
      note: action.note || "",
      proof: action.proof || "",
    });
    setActionModal(true);
    setMenuAction(null);
  }

  function deleteAction(id) {
    const confirmed = window.confirm(
      "Hapus tindakan ini? Data bukti dan progres tindakan juga akan dihapus.",
    );

    if (!confirmed) return;

    setActions((current) => current.filter((action) => action.id !== id));

    if (selectedAction?.id === id) {
      setSelectedAction(null);
    }

    setMenuAction(null);
  }

  function toggleAction(id) {
    setActions((current) =>
      current.map((action) =>
        action.id === id
          ? {
              ...action,
              completed: !action.completed,
            }
          : action,
      ),
    );
  }

  function handleActionSubmit(event) {
    event.preventDefault();

    if (!actionForm.activity || !actionForm.category) {
      alert("Lengkapi aktivitas dan kategori terlebih dahulu.");
      return;
    }

    const carbon = carbonByActivity[actionForm.activity] || 0;

    if (editAction) {
      setActions((current) =>
        current.map((action) =>
          action.id === editAction.id
            ? {
                ...action,
                ...actionForm,
                carbon,
              }
            : action,
        ),
      );
    } else {
      const newAction = {
        id: createId("action"),
        ...actionForm,
        carbon,
        completed: false,
      };

      setActions((current) => [newAction, ...current]);
    }

    setActionModal(false);
    setEditAction(null);
    setActionForm(emptyAction);
  }

  /* -------------------------------------------------------
     Goal CRUD
     ------------------------------------------------------- */

  function openCreateGoal() {
    setEditGoal(null);
    setGoalForm(emptyGoal);
    setGoalModal(true);
  }

  function openEditGoal(goal) {
    setEditGoal(goal);
    setGoalForm({
      title: goal.title,
      category: goal.category,
      description: goal.description,
      target: goal.target,
      reminder: goal.reminder,
    });
    setGoalModal(true);
    setMenuGoal(null);
  }

  function deleteGoal(id) {
    const confirmed = window.confirm("Hapus goal ini?");

    if (!confirmed) return;

    setGoals((current) => current.filter((goal) => goal.id !== id));

    setMenuGoal(null);
  }

  function toggleGoalActive(id) {
    setGoals((current) =>
      current.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              active: !goal.active,
            }
          : goal,
      ),
    );

    setMenuGoal(null);
  }

  function handleGoalSubmit(event) {
    event.preventDefault();

    if (!goalForm.title || !goalForm.category) {
      alert("Lengkapi nama goal dan kategori.");
      return;
    }

    if (editGoal) {
      setGoals((current) =>
        current.map((goal) =>
          goal.id === editGoal.id
            ? {
                ...goal,
                ...goalForm,
                target: Number(goalForm.target),
              }
            : goal,
        ),
      );
    } else {
      const newGoal = {
        id: createId("goal"),
        ...goalForm,
        target: Number(goalForm.target),
        active: true,
      };

      setGoals((current) => [newGoal, ...current]);
    }

    setGoalModal(false);
    setEditGoal(null);
    setGoalForm(emptyGoal);
  }

  /* -------------------------------------------------------
     Proof upload
     ------------------------------------------------------- */

  function handleProofUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Bukti tindakan harus berupa gambar.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 3 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setActionForm((current) => ({
        ...current,
        proof: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  }

  /* -------------------------------------------------------
     Activity option selection
     ------------------------------------------------------- */

  function handleActivityChange(value) {
    const selected = activityOptions.find((item) => item.label === value);

    setActionForm((current) => ({
      ...current,
      activity: value,
      category: selected?.category || current.category,
    }));
  }

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <main className="l3-page">
      {/* =================================================
          HEADER
          ================================================= */}

      <section className="l3-header">
        <div>
          <div className="l3-eyebrow"></div>

          <h1>Turn intention into action.</h1>

          <p>
            Bangun kebiasaan konsumsi berkelanjutan melalui target, tindakan,
            bukti, dan pemantauan progres.
          </p>
        </div>

        <button
          type="button"
          className="l3-primary-button"
          onClick={openCreateGoal}
        >
          <Plus size={18} />
          Create goal
        </button>
      </section>

      {/* =================================================
          TOP ACTION AREA
          ================================================= */}

      <section className="l3-top-grid">
        <div className="l3-today-panel">
          <div className="l3-panel-heading">
            <div>
              <span className="l3-small-label">TODAY'S ACTION</span>

              <h2>
                {todayActions.filter((action) => action.completed).length}{" "}
                completed
              </h2>
            </div>

            <button
              type="button"
              className="l3-outline-button"
              onClick={openCreateAction}
            >
              <Plus size={16} />
              Add action
            </button>
          </div>

          <div className="l3-action-list">
            {todayActions.length === 0 ? (
              <div className="l3-empty-state">
                <Leaf size={22} />
                <p>Belum ada tindakan hari ini.</p>
                <button type="button" onClick={openCreateAction}>
                  Tambahkan tindakan
                </button>
              </div>
            ) : (
              todayActions.map((action) => (
                <div
                  className={`l3-action-row ${
                    action.completed ? "is-completed" : ""
                  }`}
                  key={action.id}
                >
                  <button
                    type="button"
                    className={`l3-check ${action.completed ? "checked" : ""}`}
                    onClick={() => toggleAction(action.id)}
                    aria-label={
                      action.completed ? "Mark incomplete" : "Mark complete"
                    }
                  >
                    {action.completed && <Check size={15} />}
                  </button>

                  <div
                    className="l3-action-main"
                    onClick={() => setSelectedAction(action)}
                  >
                    <strong>{action.activity}</strong>

                    <span>{action.category}</span>
                  </div>

                  <div className="l3-action-impact">
                    <span>↓ {Number(action.carbon).toFixed(2)}</span>
                    <small>kg CO₂e</small>
                  </div>

                  <button
                    type="button"
                    className="l3-more-button"
                    onClick={() =>
                      setMenuAction(menuAction === action.id ? null : action.id)
                    }
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {menuAction === action.id && (
                    <div className="l3-context-menu">
                      <button
                        type="button"
                        onClick={() => openEditAction(action)}
                      >
                        <Edit3 size={15} />
                        Edit
                      </button>

                      <button
                        type="button"
                        className="danger"
                        onClick={() => deleteAction(action.id)}
                      >
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* WEEKLY PROGRESS */}

        <div className="l3-progress-panel">
          <div className="l3-small-label">THIS WEEK</div>

          <div className="l3-progress-number">{weeklyCompletion}%</div>

          <div className="l3-progress-track">
            <span
              style={{
                width: `${weeklyCompletion}%`,
              }}
            />
          </div>

          <div className="l3-progress-meta">
            <span>{weeklyCompleted} completed actions</span>

            <span>{activeGoals.length} active goals</span>
          </div>

          <div className="l3-impact-summary">
            <Leaf size={18} />

            <div>
              <strong>{totalCarbon.toFixed(2)} kg CO₂e</strong>

              <span>estimated reduction recorded</span>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          MY GOALS
          ================================================= */}

      <section className="l3-section">
        <div className="l3-section-heading">
          <div>
            <span className="l3-small-label">
              GOAL SETTING & SELF-MONITORING
            </span>

            <h2>My behavior goals</h2>
          </div>

          <button
            type="button"
            className="l3-text-button"
            onClick={openCreateGoal}
          >
            <Plus size={16} />
            New goal
          </button>
        </div>

        <div className="l3-goal-list">
          {goals.length === 0 ? (
            <div className="l3-large-empty">
              <Target size={28} />

              <h3>Belum ada behavior goal</h3>

              <p>
                Buat target sederhana yang ingin kamu ubah menjadi kebiasaan.
              </p>

              <button
                type="button"
                className="l3-primary-button"
                onClick={openCreateGoal}
              >
                <Plus size={17} />
                Create your first goal
              </button>
            </div>
          ) : (
            goals.map((goal, index) => {
              const progress = getGoalProgress(goal);
              const percentage = Math.min(
                100,
                Math.round((progress / Math.max(Number(goal.target), 1)) * 100),
              );

              return (
                <article
                  className={`l3-goal-row ${goal.active ? "" : "is-paused"}`}
                  key={goal.id}
                >
                  <div className="l3-goal-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="l3-goal-content">
                    <div className="l3-goal-title-row">
                      <div>
                        <h3>{goal.title}</h3>

                        <p>{goal.description || "Behavior goal"}</p>
                      </div>

                      <span
                        className={`l3-status ${
                          goal.active ? "active" : "paused"
                        }`}
                      >
                        {goal.active ? "Active" : "Paused"}
                      </span>
                    </div>

                    <div className="l3-week-days">
                      {lastSevenDays.map((date) => {
                        const done = actions.some(
                          (action) =>
                            action.completed &&
                            action.date === date &&
                            action.category === goal.category,
                        );

                        return (
                          <div key={date} className={done ? "done" : ""}>
                            <span>{getDayName(date).slice(0, 2)}</span>

                            <i>{done && <Check size={12} />}</i>
                          </div>
                        );
                      })}
                    </div>

                    <div className="l3-goal-progress">
                      <div className="l3-goal-progress-track">
                        <span
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>

                      <span>
                        {progress} / {goal.target} days
                      </span>
                    </div>
                  </div>

                  <div className="l3-goal-side">
                    <div className="l3-reminder-mini">
                      <Bell size={14} />
                      {goal.reminder}
                    </div>

                    <button
                      type="button"
                      className="l3-more-button"
                      onClick={() =>
                        setMenuGoal(menuGoal === goal.id ? null : goal.id)
                      }
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {menuGoal === goal.id && (
                      <div className="l3-context-menu goal-menu">
                        <button
                          type="button"
                          onClick={() => openEditGoal(goal)}
                        >
                          <Edit3 size={15} />
                          Edit goal
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleGoalActive(goal.id)}
                        >
                          <Target size={15} />
                          {goal.active ? "Pause goal" : "Activate goal"}
                        </button>

                        <button
                          type="button"
                          className="danger"
                          onClick={() => deleteGoal(goal.id)}
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      {/* =================================================
          WEEKLY ACTIVITY CHART
          ================================================= */}

      <section className="l3-section">
        <div className="l3-section-heading">
          <div>
            <span className="l3-small-label">SELF-MONITORING</span>

            <h2>Action pattern</h2>
          </div>

          <span className="l3-muted-label">Last 7 days</span>
        </div>

        <div className="l3-chart-panel">
          <div className="l3-chart-info">
            <div>
              <strong>{weeklyCompleted}</strong>

              <span>completed actions</span>
            </div>

            <div>
              <strong>{totalCarbon.toFixed(2)}</strong>

              <span>kg CO₂e estimated</span>
            </div>
          </div>

          <div className="l3-chart">
            {chartData.map((item) => (
              <div className="l3-chart-column" key={item.date}>
                <div className="l3-chart-value">
                  {item.count > 0 ? item.count : ""}
                </div>

                <div className="l3-chart-bar-wrap">
                  <div
                    className={`l3-chart-bar ${
                      item.date === today ? "today" : ""
                    }`}
                    style={{
                      height: `${(item.count / maxChart) * 100}%`,
                    }}
                  />
                </div>

                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================
          ACTION GUIDE + REMINDER
          ================================================= */}

      <section className="l3-guide-grid">
        <div className="l3-guide-card">
          <div className="l3-guide-icon">
            <ArrowRight size={19} />
          </div>

          <div>
            <span className="l3-small-label">
              INFORMATION & ACTION GUIDANCE
            </span>

            <h2>Reduce single-use packaging</h2>

            <p>
              Ubah niat menjadi langkah sederhana yang bisa dilakukan dalam
              aktivitas sehari-hari.
            </p>

            <div className="l3-guide-steps">
              <div>
                <strong>01</strong>
                <span>Bawa wadah atau tumbler sendiri.</span>
              </div>

              <div>
                <strong>02</strong>
                <span>Pilih opsi isi ulang jika tersedia.</span>
              </div>

              <div>
                <strong>03</strong>
                <span>Catat tindakan setelah dilakukan.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="l3-reminder-card">
          <div className="l3-reminder-top">
            <div className="l3-yellow-icon">
              <Bell size={19} />
            </div>

            <span className="l3-small-label">PROMPT & REMINDER</span>
          </div>

          {!reminderDone ? (
            <>
              <strong>Bring your tumbler</strong>

              <p>Jangan lupa membawa tumbler sebelum berangkat.</p>

              <div className="l3-reminder-actions">
                <button type="button" onClick={() => setReminderDone(true)}>
                  Done
                </button>

                <button
                  type="button"
                  className="secondary"
                  onClick={() => alert("Reminder ditunda 30 menit.")}
                >
                  Snooze
                </button>
              </div>
            </>
          ) : (
            <div className="l3-reminder-complete">
              <Check size={18} />
              <span>Reminder completed for today.</span>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          CHALLENGE
          ================================================= */}

      <section className="l3-challenge">
        <div className="l3-challenge-mark">
          <Trophy size={22} />
        </div>

        <div className="l3-challenge-content">
          <span className="l3-small-label">RECOGNITION & CHALLENGE</span>

          <h2>{challenge.title}</h2>

          <p>{challenge.description}</p>

          <div className="l3-challenge-dots">
            {[1, 2, 3, 4, 5].map((number) => (
              <span
                key={number}
                className={number <= challengeProgress ? "done" : ""}
              >
                {number <= challengeProgress && <Check size={13} />}
              </span>
            ))}
          </div>
        </div>

        <div className="l3-challenge-side">
          <strong>
            {challengeProgress} / {challenge.target}
          </strong>

          {!challengeJoined ? (
            <button type="button" onClick={() => setChallengeJoined(true)}>
              Join challenge
            </button>
          ) : (
            <span className="l3-joined">
              <Check size={14} />
              Joined
            </span>
          )}
        </div>
      </section>

      {/* =================================================
          SOCIAL ENGAGEMENT
          ================================================= */}

      <section className="l3-social">
        <div className="l3-social-icon">
          <Users size={20} />
        </div>

        <div>
          <span className="l3-small-label">SOCIAL ENGAGEMENT</span>

          <h2>Campus low-waste action</h2>

          <p>
            42 mahasiswa sedang berpartisipasi dalam tindakan konsumsi
            berkelanjutan minggu ini.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Kamu telah bergabung dalam Campus Action.")}
        >
          Join action
          <ArrowRight size={16} />
        </button>
      </section>

      {/* =================================================
          SELECTED ACTION DETAIL
          ================================================= */}

      {selectedAction && (
        <div
          className="l3-detail-overlay"
          onClick={() => setSelectedAction(null)}
        >
          <div
            className="l3-detail-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="l3-modal-close"
              onClick={() => setSelectedAction(null)}
            >
              <X size={18} />
            </button>

            <span className="l3-small-label">ACTION DETAIL</span>

            <h2>{selectedAction.activity}</h2>

            <div className="l3-detail-meta">
              <span>
                <CalendarDays size={15} />
                {formatDate(selectedAction.date)}
              </span>

              <span>
                <Leaf size={15} />
                {selectedAction.category}
              </span>
            </div>

            {selectedAction.proof ? (
              <img
                src={selectedAction.proof}
                alt="Bukti tindakan"
                className="l3-proof-large"
              />
            ) : (
              <div className="l3-no-proof">
                <ImagePlus size={24} />
                <span>Belum ada bukti foto.</span>
              </div>
            )}

            <div className="l3-detail-impact">
              <span>Estimated carbon reduction</span>

              <strong>
                ↓ {Number(selectedAction.carbon).toFixed(2)} kg CO₂e
              </strong>
            </div>

            {selectedAction.note && (
              <div className="l3-note-box">
                <span>Note</span>
                <p>{selectedAction.note}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================
          CREATE / EDIT ACTION MODAL
          ================================================= */}

      {actionModal && (
        <div
          className="l3-modal-backdrop"
          onClick={() => setActionModal(false)}
        >
          <div
            className="l3-form-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="l3-modal-header">
              <div>
                <span className="l3-small-label">
                  {editAction ? "EDIT ACTION" : "INSERT BEHAVIOR ACTION"}
                </span>

                <h2>
                  {editAction
                    ? "Edit your action"
                    : "Record a sustainable action"}
                </h2>
              </div>

              <button
                type="button"
                className="l3-modal-close"
                onClick={() => setActionModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleActionSubmit} className="l3-form">
              <label>
                What did you do?
                <select
                  value={actionForm.activity}
                  onChange={(event) => handleActivityChange(event.target.value)}
                >
                  <option value="">Select an activity</option>

                  {activityOptions.map((item) => (
                    <option key={item.label} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="l3-form-two">
                <label>
                  Category
                  <select
                    value={actionForm.category}
                    onChange={(event) =>
                      setActionForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                  >
                    <option value="">Select category</option>

                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Date
                  <input
                    type="date"
                    value={actionForm.date}
                    onChange={(event) =>
                      setActionForm((current) => ({
                        ...current,
                        date: event.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="l3-carbon-preview">
                <Leaf size={18} />

                <div>
                  <span>Estimated impact</span>

                  <strong>
                    ↓ {(carbonByActivity[actionForm.activity] || 0).toFixed(2)}{" "}
                    kg CO₂e
                  </strong>
                </div>
              </div>

              {/* PROOF */}

              <div className="l3-proof-field">
                <div className="l3-proof-label">
                  <span>Proof of action</span>

                  <small>Optional · JPG/PNG · max 3 MB</small>
                </div>

                <label className="l3-upload-box">
                  {actionForm.proof ? (
                    <img src={actionForm.proof} alt="Preview bukti" />
                  ) : (
                    <>
                      <Upload size={23} />
                      <strong>Upload photo</strong>
                      <span>Add visual evidence of your action</span>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProofUpload}
                  />
                </label>

                {actionForm.proof && (
                  <button
                    type="button"
                    className="l3-remove-proof"
                    onClick={() =>
                      setActionForm((current) => ({
                        ...current,
                        proof: "",
                      }))
                    }
                  >
                    Remove photo
                  </button>
                )}
              </div>

              <label>
                Note
                <textarea
                  value={actionForm.note}
                  onChange={(event) =>
                    setActionForm((current) => ({
                      ...current,
                      note: event.target.value,
                    }))
                  }
                  placeholder="Ceritakan singkat tindakan yang dilakukan..."
                  rows={3}
                />
              </label>

              <div className="l3-form-actions">
                <button
                  type="button"
                  className="l3-cancel-button"
                  onClick={() => setActionModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="l3-primary-button">
                  <Check size={17} />
                  {editAction ? "Save changes" : "Insert action"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================
          CREATE / EDIT GOAL MODAL
          ================================================= */}

      {goalModal && (
        <div className="l3-modal-backdrop" onClick={() => setGoalModal(false)}>
          <div
            className="l3-form-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="l3-modal-header">
              <div>
                <span className="l3-small-label">
                  {editGoal ? "EDIT GOAL" : "CREATE BEHAVIOR GOAL"}
                </span>

                <h2>{editGoal ? "Edit your goal" : "Set a behavior goal"}</h2>
              </div>

              <button
                type="button"
                className="l3-modal-close"
                onClick={() => setGoalModal(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleGoalSubmit} className="l3-form">
              <label>
                Goal name
                <input
                  type="text"
                  value={goalForm.title}
                  onChange={(event) =>
                    setGoalForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="Contoh: Membawa tumbler"
                />
              </label>

              <label>
                Category
                <select
                  value={goalForm.category}
                  onChange={(event) =>
                    setGoalForm((current) => ({
                      ...current,
                      category: event.target.value,
                    }))
                  }
                >
                  <option value="">Select category</option>

                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                What do you want to change?
                <textarea
                  value={goalForm.description}
                  onChange={(event) =>
                    setGoalForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  placeholder="Contoh: Mengurangi penggunaan botol plastik sekali pakai."
                  rows={3}
                />
              </label>

              <div className="l3-form-two">
                <label>
                  Target days / week
                  <input
                    type="number"
                    min="1"
                    max="7"
                    value={goalForm.target}
                    onChange={(event) =>
                      setGoalForm((current) => ({
                        ...current,
                        target: event.target.value,
                      }))
                    }
                  />
                </label>

                <label>
                  Reminder
                  <input
                    type="time"
                    value={goalForm.reminder}
                    onChange={(event) =>
                      setGoalForm((current) => ({
                        ...current,
                        reminder: event.target.value,
                      }))
                    }
                  />
                </label>
              </div>

              <div className="l3-form-tip">
                <CircleHelp size={17} />

                <span>
                  Buat target yang sederhana dan realistis agar mudah dipantau
                  setiap minggu.
                </span>
              </div>

              <div className="l3-form-actions">
                <button
                  type="button"
                  className="l3-cancel-button"
                  onClick={() => setGoalModal(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="l3-primary-button">
                  <Target size={17} />
                  {editGoal ? "Save changes" : "Create goal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
