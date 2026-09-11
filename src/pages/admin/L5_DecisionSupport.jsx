import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  ClipboardCheck,
  Database,
  Edit3,
  Filter,
  Lightbulb,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
  Trash2,
} from "lucide-react";

const STORAGE_KEY = "ecodas_decision_support";

const DEFAULT_DECISIONS = [
  {
    id: 1,
    priority: "High",
    title: "Peningkatan penggunaan transportasi berkelanjutan",
    source: "Behavioral Trend",
    insight:
      "Penggunaan transportasi umum masih relatif rendah dibandingkan aktivitas perjalanan mahasiswa.",
    impact: "High",
    urgency: "High",
    recommendation:
      "Mendorong penggunaan transportasi umum melalui informasi rute, reminder perjalanan, dan kampanye mobilitas berkelanjutan.",
    actionPlan: [
      "Identifikasi pola perjalanan mahasiswa",
      "Tampilkan alternatif transportasi umum",
      "Berikan reminder sebelum aktivitas kampus",
      "Monitor perubahan perilaku",
    ],
    status: "Direkomendasikan",
    owner: "Campus Sustainability",
    period: "Bulanan",
  },
  {
    id: 2,
    priority: "High",
    title: "Pengurangan plastik sekali pakai",
    source: "Faculty Pattern",
    insight:
      "Aktivitas konsumsi dengan kemasan sekali pakai masih menjadi salah satu aktivitas yang sering muncul.",
    impact: "High",
    urgency: "Medium",
    recommendation:
      "Memperkuat penggunaan tumbler, reusable container, dan fasilitas refill di lingkungan kampus.",
    actionPlan: [
      "Identifikasi titik penggunaan plastik",
      "Perkuat fasilitas refill",
      "Kampanye reusable container",
      "Evaluasi perubahan aktivitas",
    ],
    status: "Direkomendasikan",
    owner: "Campus Sustainability",
    period: "Bulanan",
  },
  {
    id: 3,
    priority: "Medium",
    title: "Penguatan konsumsi digital",
    source: "Campus Pattern",
    insight:
      "Aktivitas paperless sudah mulai diterapkan, tetapi belum merata pada seluruh kelompok mahasiswa.",
    impact: "Medium",
    urgency: "Medium",
    recommendation:
      "Memperluas kebiasaan paperless melalui pengumpulan tugas digital dan pengurangan pencetakan.",
    actionPlan: [
      "Identifikasi aktivitas yang masih membutuhkan cetak",
      "Dorong pengumpulan digital",
      "Berikan informasi dampak penggunaan kertas",
      "Monitor implementasi",
    ],
    status: "Dalam Pemantauan",
    owner: "Academic Unit",
    period: "Semester",
  },
  {
    id: 4,
    priority: "Medium",
    title: "Peningkatan awareness terhadap greenwashing",
    source: "Awareness Level",
    insight:
      "Mahasiswa membutuhkan kemampuan lebih baik dalam membedakan klaim lingkungan dengan informasi produk yang kredibel.",
    impact: "Medium",
    urgency: "High",
    recommendation:
      "Menambahkan materi literasi kritis mengenai greenwashing pada modul awareness.",
    actionPlan: [
      "Tambahkan modul greenwashing",
      "Berikan contoh klaim produk",
      "Latih evaluasi informasi",
      "Hubungkan dengan keputusan konsumsi",
    ],
    status: "Direkomendasikan",
    owner: "Bijak-M",
    period: "Semester",
  },
  {
    id: 5,
    priority: "Supporting",
    title: "Penguatan aktivitas konsumsi berkelanjutan",
    source: "Sustainability Performance",
    insight:
      "Beberapa kebiasaan positif sudah muncul dan dapat diperkuat melalui feedback serta recognition.",
    impact: "Low",
    urgency: "Medium",
    recommendation:
      "Mempertahankan perilaku positif melalui feedback berkala dan pengakuan terhadap pencapaian.",
    actionPlan: [
      "Monitor kebiasaan positif",
      "Berikan feedback berkala",
      "Tampilkan pencapaian",
      "Pertahankan engagement",
    ],
    status: "Supporting",
    owner: "Bijak-M",
    period: "Mingguan",
  },
];

const SOURCE_OPTIONS = [
  "Semua",
  "Faculty Pattern",
  "Campus Pattern",
  "Behavioral Trend",
  "Awareness Level",
  "Sustainability Performance",
];

const PRIORITY_OPTIONS = ["Semua", "High", "Medium", "Supporting"];

const STATUS_OPTIONS = [
  "Direkomendasikan",
  "Dalam Pemantauan",
  "Supporting",
  "Selesai",
];

function loadDecisions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error("Gagal membaca Decision Support:", error);
  }

  return DEFAULT_DECISIONS;
}

function saveDecisions(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Gagal menyimpan Decision Support:", error);
  }
}

function PriorityBadge({ priority }) {
  let className = "bg-slate-50 text-slate-600 border-slate-200";

  if (priority === "High") {
    className = "bg-red-50 text-red-700 border-red-200";
  } else if (priority === "Medium") {
    className = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (priority === "Supporting") {
    className = "bg-blue-50 text-blue-700 border-blue-200";
  }

  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold " +
        className
      }
    >
      {priority}
    </span>
  );
}

function StatusBadge({ status }) {
  let className = "bg-slate-50 text-slate-600 border-slate-200";

  if (status === "Direkomendasikan") {
    className = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (status === "Dalam Pemantauan") {
    className = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (status === "Supporting") {
    className = "bg-violet-50 text-violet-700 border-violet-200";
  } else if (status === "Selesai") {
    className = "bg-slate-100 text-slate-700 border-slate-200";
  }

  return (
    <span
      className={
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium " +
        className
      }
    >
      {status}
    </span>
  );
}

function KpiCard({
  label,
  value,
  description,
  icon: Icon,
  iconClass,
  valueClass,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
            {label}
          </p>

          <p className={"mt-2 text-3xl font-bold tracking-tight " + valueClass}>
            {value}
          </p>

          <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
        </div>

        <div
          className={
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl " +
            iconClass
          }
        >
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

function FlowStep({ number, title, description, icon: Icon, active }) {
  return (
    <div
      className={
        "flex items-center gap-3 rounded-xl border p-4 " +
        (active
          ? "border-emerald-200 bg-emerald-50/70"
          : "border-slate-200 bg-white")
      }
    >
      <div
        className={
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg " +
          (active ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500")
        }
      >
        <Icon size={17} />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold tracking-widest text-slate-400">
            0{number}
          </span>

          <p className="truncate text-sm font-semibold text-slate-800">
            {title}
          </p>
        </div>

        <p className="mt-0.5 text-xs leading-4 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function DetailBlock({ label, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <div className="text-sm leading-6 text-slate-700">{children}</div>
    </div>
  );
}

function FormField({ label, required, description, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-slate-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}

      {description && (
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      )}
    </div>
  );
}

function MatrixCell({ impact, urgency, label, active, onClick }) {
  let className = "bg-slate-50 text-slate-600 border-slate-200";

  if (label === "Immediate") {
    className = "bg-red-50 text-red-700 border-red-200";
  } else if (label === "High Priority") {
    className = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (label === "Priority") {
    className = "bg-orange-50 text-orange-700 border-orange-200";
  } else if (label === "Plan") {
    className = "bg-blue-50 text-blue-700 border-blue-200";
  } else if (label === "Supporting") {
    className = "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={
        "min-h-[82px] rounded-xl border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-sm " +
        className +
        (active ? " ring-2 ring-emerald-600 ring-offset-2" : "")
      }
    >
      <span className="block text-xs font-bold">{label}</span>

      <span className="mt-1 block text-[10px] leading-4 opacity-70">
        {impact} impact
        <br />
        {urgency} urgency
      </span>
    </button>
  );
}

function L5_DecisionSupport() {
  const [decisions, setDecisions] = useState(loadDecisions);

  const [activeTab, setActiveTab] = useState("all");

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("Semua");

  const [sourceFilter, setSourceFilter] = useState("Semua");

  const [sortDirection, setSortDirection] = useState("desc");

  const [selectedDecision, setSelectedDecision] = useState(null);

  const [editingDecision, setEditingDecision] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [selectedMatrix, setSelectedMatrix] = useState(null);

  const filteredDecisions = useMemo(() => {
    let result = [...decisions];

    if (activeTab !== "all") {
      result = result.filter(
        (item) => item.priority.toLowerCase() === activeTab.toLowerCase(),
      );
    }

    if (priorityFilter !== "Semua") {
      result = result.filter((item) => item.priority === priorityFilter);
    }

    if (sourceFilter !== "Semua") {
      result = result.filter((item) => item.source === sourceFilter);
    }

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((item) =>
        [
          item.title,
          item.source,
          item.insight,
          item.recommendation,
          item.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      );
    }

    const priorityWeight = {
      High: 3,
      Medium: 2,
      Supporting: 1,
    };

    result.sort((a, b) => {
      const difference =
        priorityWeight[a.priority] - priorityWeight[b.priority];

      if (sortDirection === "desc") {
        return -difference;
      }

      return difference;
    });

    return result;
  }, [
    decisions,
    activeTab,
    search,
    priorityFilter,
    sourceFilter,
    sortDirection,
  ]);

  const stats = useMemo(() => {
    return {
      total: decisions.length,

      high: decisions.filter((item) => item.priority === "High").length,

      medium: decisions.filter((item) => item.priority === "Medium").length,

      supporting: decisions.filter((item) => item.priority === "Supporting")
        .length,

      recommended: decisions.filter(
        (item) => item.status === "Direkomendasikan",
      ).length,
    };
  }, [decisions]);

  function updateDecisions(next) {
    setDecisions(next);
    saveDecisions(next);
  }

  function handleDelete(id) {
    const target = decisions.find((item) => item.id === id);

    if (!target) {
      return;
    }

    const confirmed = window.confirm('Hapus keputusan "' + target.title + '"?');

    if (!confirmed) {
      return;
    }

    const next = decisions.filter((item) => item.id !== id);

    updateDecisions(next);

    setSelectedDecision(null);
  }

  function handleReset() {
    const confirmed = window.confirm(
      "Reset data Decision Support ke data prototype awal?",
    );

    if (!confirmed) {
      return;
    }

    updateDecisions(DEFAULT_DECISIONS);

    setSelectedDecision(null);
    setEditingDecision(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const title = String(formData.get("title") || "").trim();

    const priority = String(formData.get("priority") || "Medium");

    const source = String(formData.get("source") || "Faculty Pattern");

    const impact = String(formData.get("impact") || "Medium");

    const urgency = String(formData.get("urgency") || "Medium");

    const insight = String(formData.get("insight") || "").trim();

    const recommendation = String(formData.get("recommendation") || "").trim();

    const owner = String(formData.get("owner") || "").trim();

    const period = String(formData.get("period") || "Bulanan");

    const status = String(formData.get("status") || "Direkomendasikan");

    const actionPlanText = String(formData.get("actionPlan") || "");

    const actionPlan = actionPlanText
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (!title || !insight || !recommendation) {
      window.alert("Judul, insight, dan recommendation wajib diisi.");

      return;
    }

    const newData = {
      title,
      priority,
      source,
      impact,
      urgency,
      insight,
      recommendation,
      owner,
      period,
      status,
      actionPlan,
    };

    if (editingDecision) {
      const next = decisions.map((item) => {
        if (item.id === editingDecision.id) {
          return {
            ...item,
            ...newData,
          };
        }

        return item;
      });

      updateDecisions(next);
    } else {
      const newDecision = {
        id: Date.now(),
        ...newData,
      };

      updateDecisions([newDecision, ...decisions]);
    }

    setShowForm(false);
    setEditingDecision(null);
  }

  function openCreate() {
    setEditingDecision(null);
    setShowForm(true);
  }

  function openEdit(item) {
    setSelectedDecision(null);
    setEditingDecision(item);
    setShowForm(true);
  }

  const matrixData = [
    {
      impact: "High",
      urgency: "Low",
      label: "Plan",
    },
    {
      impact: "High",
      urgency: "Medium",
      label: "High Priority",
    },
    {
      impact: "High",
      urgency: "High",
      label: "Immediate",
    },
    {
      impact: "Medium",
      urgency: "Low",
      label: "Monitor",
    },
    {
      impact: "Medium",
      urgency: "Medium",
      label: "Plan",
    },
    {
      impact: "Medium",
      urgency: "High",
      label: "Priority",
    },
    {
      impact: "Low",
      urgency: "Low",
      label: "Low",
    },
    {
      impact: "Low",
      urgency: "Medium",
      label: "Supporting",
    },
    {
      impact: "Low",
      urgency: "High",
      label: "Monitor",
    },
  ];

  return (
    <div className="min-h-full bg-slate-50 text-slate-800">
      {/* HEADER */}
      <section className="mb-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold tracking-[0.14em] text-emerald-700">
                LAYER 05
              </span>

              <ChevronRight size={13} className="text-slate-300" />

              <span className="text-xs font-medium text-slate-400">
                Decision Support
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-emerald-900">
              Decision Support
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Mengubah pola konsumsi dan sustainability performance dari
              Collective Intelligence menjadi prioritas keputusan, rekomendasi,
              dan action plan.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              type="button"
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Plus size={17} />
              Tambah Keputusan
            </button>
          </div>
        </div>
      </section>

      {/* NOTICE */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5">
        <CircleAlert size={18} className="mt-0.5 shrink-0 text-amber-600" />

        <div>
          <p className="text-sm font-semibold text-amber-800">
            Prototype / simulated data
          </p>

          <p className="mt-0.5 text-xs leading-5 text-amber-700">
            Data pada halaman ini digunakan untuk simulasi fungsi Decision
            Support. Data penelitian seharusnya berasal dari Collective
            Intelligence berdasarkan aktivitas mahasiswa yang telah tervalidasi.
          </p>
        </div>
      </div>

      {/* FLOW */}
      <section className="mb-7">
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            Decision flow
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Alur transformasi data menjadi keputusan yang dapat ditindaklanjuti.
          </p>
        </div>

        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
          <FlowStep
            number="1"
            title="Collective Intelligence"
            description="Pola kolektif dari L4"
            icon={Database}
          />

          <FlowStep
            number="2"
            title="Priority Analysis"
            description="Impact dan urgency"
            icon={BarChart3}
            active
          />

          <FlowStep
            number="3"
            title="Recommendation"
            description="Arah keputusan"
            icon={Lightbulb}
            active
          />

          <FlowStep
            number="4"
            title="Action Plan"
            description="Langkah implementasi"
            icon={Target}
            active
          />
        </div>
      </section>

      {/* KPI */}
      <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          label="Decision Items"
          value={stats.total}
          description="Total keputusan terpetakan"
          icon={ClipboardCheck}
          iconClass="bg-emerald-50 text-emerald-600"
          valueClass="text-emerald-900"
        />

        <KpiCard
          label="High Priority"
          value={stats.high}
          description="Perlu perhatian utama"
          icon={Zap}
          iconClass="bg-red-50 text-red-600"
          valueClass="text-red-700"
        />

        <KpiCard
          label="Medium Priority"
          value={stats.medium}
          description="Perlu penguatan bertahap"
          icon={TrendingUp}
          iconClass="bg-amber-50 text-amber-600"
          valueClass="text-amber-700"
        />

        <KpiCard
          label="Recommended"
          value={stats.recommended}
          description="Siap ditindaklanjuti"
          icon={CheckCircle2}
          iconClass="bg-blue-50 text-blue-600"
          valueClass="text-blue-700"
        />
      </section>

      {/* DECISION TABLE */}
      <section className="mb-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* FILTER */}
        <div className="border-b border-slate-200 p-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={
                  "rounded-lg px-3 py-2 text-xs font-semibold transition " +
                  (activeTab === "all"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-500")
                }
              >
                Semua
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("high")}
                className={
                  "rounded-lg px-3 py-2 text-xs font-semibold transition " +
                  (activeTab === "high"
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-slate-500")
                }
              >
                High
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("medium")}
                className={
                  "rounded-lg px-3 py-2 text-xs font-semibold transition " +
                  (activeTab === "medium"
                    ? "bg-white text-amber-600 shadow-sm"
                    : "text-slate-500")
                }
              >
                Medium
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("supporting")}
                className={
                  "rounded-lg px-3 py-2 text-xs font-semibold transition " +
                  (activeTab === "supporting"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500")
                }
              >
                Supporting
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari keputusan..."
                  className="h-10 w-[220px] rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              <div className="relative">
                <Filter
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={sourceFilter}
                  onChange={(event) => setSourceFilter(event.target.value)}
                  className="h-10 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs font-medium text-slate-600 outline-none focus:border-emerald-400"
                >
                  {SOURCE_OPTIONS.map((source) => (
                    <option key={source} value={source}>
                      {source}
                    </option>
                  ))}
                </select>
              </div>

              <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 outline-none focus:border-emerald-400"
              >
                {PRIORITY_OPTIONS.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() =>
                  setSortDirection((current) =>
                    current === "desc" ? "asc" : "desc",
                  )
                }
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                {sortDirection === "desc" ? (
                  <ArrowDown size={14} />
                ) : (
                  <ArrowUp size={14} />
                )}
                Priority
              </button>
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Decision Priorities
            </h2>

            <p className="mt-0.5 text-xs text-slate-400">
              Prioritas keputusan berdasarkan insight Collective Intelligence
            </p>
          </div>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500">
            {filteredDecisions.length} items
          </span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="min-w-[1050px] w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Decision
                </th>

                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Source
                </th>

                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Priority
                </th>

                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Impact
                </th>

                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Urgency
                </th>

                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredDecisions.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50/70"
                >
                  <td className="max-w-[360px] px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedDecision(item)}
                      className="text-left"
                    >
                      <p className="text-sm font-semibold text-slate-800 hover:text-emerald-700">
                        {item.title}
                      </p>

                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                        {item.recommendation}
                      </p>
                    </button>
                  </td>

                  <td className="px-4 py-4">
                    <span className="text-xs font-medium text-slate-600">
                      {item.source}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <PriorityBadge priority={item.priority} />
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={
                        "text-xs font-semibold " +
                        (item.impact === "High"
                          ? "text-red-600"
                          : item.impact === "Medium"
                            ? "text-amber-600"
                            : "text-slate-500")
                      }
                    >
                      {item.impact}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={
                        "text-xs font-semibold " +
                        (item.urgency === "High"
                          ? "text-red-600"
                          : item.urgency === "Medium"
                            ? "text-amber-600"
                            : "text-slate-500")
                      }
                    >
                      {item.urgency}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => setSelectedDecision(item)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                        title="Detail"
                      >
                        <ChevronRight size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                        title="Edit"
                      >
                        <Edit3 size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                        title="Hapus"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDecisions.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-5 py-16 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                      <Search size={20} />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-slate-700">
                      Tidak ada keputusan ditemukan
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Coba ubah kata kunci atau filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* LOWER CONTENT */}
      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        {/* MATRIX */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                Priority Matrix
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-800">
                Impact × Urgency
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Matriks menentukan tingkat prioritas dari insight Layer 4.
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <BarChart3 size={19} />
            </div>
          </div>

          <div className="grid grid-cols-[72px_repeat(3,1fr)] gap-2">
            <div />

            <div className="pb-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Low
            </div>

            <div className="pb-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Medium
            </div>

            <div className="pb-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
              High
            </div>

            {["High", "Medium", "Low"].map((impact) => (
              <React.Fragment key={impact}>
                <div className="flex items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {impact}
                  <br />
                  impact
                </div>

                {["Low", "Medium", "High"].map((urgency) => {
                  const cell = matrixData.find(
                    (item) =>
                      item.impact === impact && item.urgency === urgency,
                  );

                  return (
                    <MatrixCell
                      key={impact + "-" + urgency}
                      impact={impact}
                      urgency={urgency}
                      label={cell.label}
                      active={selectedMatrix === cell.label}
                      onClick={setSelectedMatrix}
                    />
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-100 pt-4">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
              Immediate
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              High Priority
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              Plan
            </div>

            <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Supporting
            </div>
          </div>

          {selectedMatrix && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-xs font-semibold text-emerald-800">
                Selected priority: {selectedMatrix}
              </p>

              <p className="mt-1 text-xs leading-5 text-emerald-700">
                Kategori ini dapat digunakan untuk menentukan urutan intervensi.
              </p>
            </div>
          )}
        </section>

        {/* RECOMMENDED ACTION */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                Action Plan
              </p>

              <h2 className="mt-1 text-lg font-bold text-slate-800">
                Recommended Actions
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Tindakan yang diturunkan dari keputusan prioritas.
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Target size={19} />
            </div>
          </div>

          <div className="space-y-3">
            {decisions.slice(0, 4).map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => setSelectedDecision(item)}
                className="group flex w-full items-start gap-3 rounded-xl border border-slate-200 p-3.5 text-left transition hover:border-emerald-200 hover:bg-emerald-50/40"
              >
                <div
                  className={
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold " +
                    (index === 0
                      ? "bg-red-50 text-red-600"
                      : index === 1
                        ? "bg-amber-50 text-amber-600"
                        : index === 2
                          ? "bg-blue-50 text-blue-600"
                          : "bg-violet-50 text-violet-600")
                  }
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-emerald-700">
                      {item.title}
                    </p>

                    <PriorityBadge priority={item.priority} />
                  </div>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {item.recommendation}
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  className="mt-1 shrink-0 text-slate-300"
                />
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* DETAIL MODAL */}
      {selectedDecision && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedDecision(null);
            }
          }}
        >
          <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div className="pr-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <PriorityBadge priority={selectedDecision.priority} />

                  <StatusBadge status={selectedDecision.status} />
                </div>

                <h2 className="text-xl font-bold leading-7 text-slate-800">
                  {selectedDecision.title}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                  Source: {selectedDecision.source}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDecision(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[calc(90vh-150px)] overflow-y-auto p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailBlock label="Collective Insight">
                  {selectedDecision.insight}
                </DetailBlock>

                <DetailBlock label="Recommendation">
                  {selectedDecision.recommendation}
                </DetailBlock>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-4">
                <DetailBlock label="Priority">
                  <PriorityBadge priority={selectedDecision.priority} />
                </DetailBlock>

                <DetailBlock label="Impact">
                  <span className="font-semibold text-slate-700">
                    {selectedDecision.impact}
                  </span>
                </DetailBlock>

                <DetailBlock label="Urgency">
                  <span className="font-semibold text-slate-700">
                    {selectedDecision.urgency}
                  </span>
                </DetailBlock>

                <DetailBlock label="Period">
                  {selectedDecision.period}
                </DetailBlock>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="mb-3 flex items-center gap-2">
                  <Target size={16} className="text-emerald-600" />

                  <h3 className="text-sm font-bold text-slate-800">
                    Action Plan
                  </h3>
                </div>

                <div className="space-y-2">
                  {selectedDecision.actionPlan?.map((action, index) => (
                    <div
                      key={action + index}
                      className="flex items-start gap-2.5"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
                        {index + 1}
                      </span>

                      <p className="text-sm leading-5 text-slate-600">
                        {action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <DetailBlock label="Owner">
                  <div className="flex items-center gap-2">
                    <Users size={15} className="text-slate-400" />

                    {selectedDecision.owner}
                  </div>
                </DetailBlock>

                <DetailBlock label="Status">
                  <StatusBadge status={selectedDecision.status} />
                </DetailBlock>
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={() => openEdit(selectedDecision)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
              >
                <Edit3 size={15} />
                Edit
              </button>

              <button
                type="button"
                onClick={() => handleDelete(selectedDecision.id)}
                className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100"
              >
                <Trash2 size={15} />
                Hapus
              </button>

              <button
                type="button"
                onClick={() => setSelectedDecision(null)}
                className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-[2px]">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-600">
                  {editingDecision ? "Edit Decision" : "New Decision"}
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-800">
                  {editingDecision
                    ? "Edit Decision Support"
                    : "Tambah Decision Support"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingDecision(null);
                }}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[calc(92vh-150px)] space-y-5 overflow-y-auto p-6">
                <FormField label="Judul Keputusan" required>
                  <input
                    name="title"
                    defaultValue={editingDecision?.title || ""}
                    placeholder="Contoh: Pengurangan plastik sekali pakai"
                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </FormField>

                <div className="grid gap-4 md:grid-cols-3">
                  <FormField label="Priority" required>
                    <select
                      name="priority"
                      defaultValue={editingDecision?.priority || "Medium"}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-emerald-400"
                    >
                      <option value="High">High</option>

                      <option value="Medium">Medium</option>

                      <option value="Supporting">Supporting</option>
                    </select>
                  </FormField>

                  <FormField label="Impact" required>
                    <select
                      name="impact"
                      defaultValue={editingDecision?.impact || "Medium"}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-emerald-400"
                    >
                      <option value="High">High</option>

                      <option value="Medium">Medium</option>

                      <option value="Low">Low</option>
                    </select>
                  </FormField>

                  <FormField label="Urgency" required>
                    <select
                      name="urgency"
                      defaultValue={editingDecision?.urgency || "Medium"}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-emerald-400"
                    >
                      <option value="High">High</option>

                      <option value="Medium">Medium</option>

                      <option value="Low">Low</option>
                    </select>
                  </FormField>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Insight Source" required>
                    <select
                      name="source"
                      defaultValue={
                        editingDecision?.source || "Faculty Pattern"
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-emerald-400"
                    >
                      {SOURCE_OPTIONS.filter((item) => item !== "Semua").map(
                        (item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ),
                      )}
                    </select>
                  </FormField>

                  <FormField label="Status" required>
                    <select
                      name="status"
                      defaultValue={
                        editingDecision?.status || "Direkomendasikan"
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-emerald-400"
                    >
                      {STATUS_OPTIONS.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </FormField>
                </div>

                <FormField
                  label="Collective Insight"
                  required
                  description="Temuan yang berasal dari Layer 4."
                >
                  <textarea
                    name="insight"
                    rows={4}
                    defaultValue={editingDecision?.insight || ""}
                    placeholder="Jelaskan pola yang menjadi dasar keputusan..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-5 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </FormField>

                <FormField
                  label="Recommendation"
                  required
                  description="Arah tindakan yang dihasilkan dari insight."
                >
                  <textarea
                    name="recommendation"
                    rows={4}
                    defaultValue={editingDecision?.recommendation || ""}
                    placeholder="Tuliskan rekomendasi keputusan..."
                    className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-5 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </FormField>

                <FormField
                  label="Action Plan"
                  description="Satu tindakan per baris."
                >
                  <textarea
                    name="actionPlan"
                    rows={5}
                    defaultValue={editingDecision?.actionPlan?.join("\n") || ""}
                    placeholder={
                      "Identifikasi masalah\nTentukan intervensi\nImplementasikan aksi\nMonitor perubahan"
                    }
                    className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-3 text-sm leading-5 outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </FormField>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Owner">
                    <input
                      name="owner"
                      defaultValue={
                        editingDecision?.owner || "Campus Sustainability"
                      }
                      placeholder="Unit penanggung jawab"
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-emerald-400"
                    />
                  </FormField>

                  <FormField label="Period">
                    <select
                      name="period"
                      defaultValue={editingDecision?.period || "Bulanan"}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-emerald-400"
                    >
                      <option value="Mingguan">Mingguan</option>

                      <option value="Bulanan">Bulanan</option>

                      <option value="Semester">Semester</option>

                      <option value="Tahunan">Tahunan</option>
                    </select>
                  </FormField>
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingDecision(null);
                  }}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  <ShieldCheck size={16} />

                  {editingDecision ? "Simpan Perubahan" : "Simpan Keputusan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default L5_DecisionSupport;
