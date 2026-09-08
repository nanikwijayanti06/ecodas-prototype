import React, { useMemo, useState } from "react";
import "./Tracker.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Tracker = () => {
  const [activityType, setActivityType] = useState("food");
  const [amount, setAmount] = useState("");
  const [editId, setEditId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [logs, setLogs] = useState([
    {
      id: 1,
      type: "food",
      name: "Kemasan Sekali Pakai",
      amount: 2,
      unit: "unit",
      carbon: 0.16,
      date: "Hari ini",
    },
    {
      id: 2,
      type: "transport",
      name: "Transportasi Motor",
      amount: 5,
      unit: "km",
      carbon: 0.6,
      date: "Hari ini",
    },
  ]);

  const weeklyTrend = [
    { day: "Sen", carbon: 0.8 },
    { day: "Sel", carbon: 0.8 },
    { day: "Rab", carbon: 0.8 },
    { day: "Kam", carbon: 0.65 },
    { day: "Jum", carbon: 0.8 },
    { day: "Sab", carbon: 0.4 },
  ];

  const campusAverage = 1.35;

  const totalCarbon = useMemo(() => {
    return logs.reduce((sum, log) => sum + Number(log.carbon), 0);
  }, [logs]);

  const comparisonDiff = totalCarbon - campusAverage;

  const topCategory = useMemo(() => {
    if (!logs.length) return null;

    const totals = logs.reduce((acc, log) => {
      acc[log.type] = (acc[log.type] || 0) + log.carbon;
      return acc;
    }, {});

    return Object.keys(totals).reduce((a, b) =>
      totals[a] > totals[b] ? a : b,
    );
  }, [logs]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage("");

    if (!amount || Number(amount) <= 0) {
      setErrorMessage("Masukkan jumlah yang lebih dari 0.");
      return;
    }

    let activityName = "";
    let unit = "";
    let carbon = 0;

    if (activityType === "food") {
      activityName = "Kemasan Sekali Pakai";
      unit = "unit";
      carbon = Number(amount) * 0.08;
    }

    if (activityType === "transport") {
      activityName = "Transportasi Pribadi";
      unit = "km";
      carbon = Number(amount) * 0.12;
    }

    if (activityType === "energy") {
      activityName = "Penggunaan Listrik / AC";
      unit = "jam";
      carbon = Number(amount) * 0.45;
    }

    if (editId !== null) {
      setLogs((currentLogs) =>
        currentLogs.map((log) =>
          log.id === editId
            ? {
                ...log,
                type: activityType,
                name: activityName,
                amount: Number(amount),
                unit,
                carbon,
              }
            : log,
        ),
      );

      setEditId(null);
    } else {
      const newLog = {
        id: Date.now(),
        type: activityType,
        name: activityName,
        amount: Number(amount),
        unit,
        carbon,
        date: "Baru saja",
      };

      setLogs((currentLogs) => [newLog, ...currentLogs]);
    }

    setAmount("");
    setActivityType("food");
  };

  const handleEdit = (log) => {
    setEditId(log.id);
    setActivityType(log.type);
    setAmount(log.amount);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Hapus aktivitas ini dari riwayat?");

    if (!confirmDelete) return;

    setLogs((currentLogs) => currentLogs.filter((log) => log.id !== id));
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setAmount("");
    setActivityType("food");
    setErrorMessage("");
  };

  const getCategoryLabel = (type) => {
    if (type === "food") return "Makanan & Kemasan";
    if (type === "transport") return "Transportasi";
    if (type === "energy") return "Energi";

    return "-";
  };

  const getRecommendation = () => {
    if (!topCategory) {
      return "Belum ada aktivitas yang tercatat.";
    }

    if (topCategory === "food") {
      return "Coba gunakan tumbler atau wadah makan yang dapat digunakan kembali.";
    }

    if (topCategory === "transport") {
      return "Pertimbangkan berjalan kaki, bersepeda, atau berbagi kendaraan untuk perjalanan tertentu.";
    }

    return "Matikan lampu dan AC ketika ruangan sudah tidak digunakan.";
  };

  return (
    <main className="tracker-page">
      {/* HEADER */}
      <div className="tracker-header">
        <div>
          <h1>Eco-Tracker</h1>
          <p>Catat aktivitas harian dan lihat perkiraan jejak karbonmu.</p>
        </div>
      </div>

      {/* BAGIAN ATAS */}
      <section className="tracker-top">
        {/* FORM */}
        <div className="tracker-panel input-panel">
          <div className="panel-title">
            <div>
              <h2>{editId !== null ? "Edit Aktivitas" : "Catat Aktivitas"}</h2>

              <p>Masukkan aktivitas konsumsi yang kamu lakukan hari ini.</p>
            </div>
          </div>

          {errorMessage && <div className="tracker-error">{errorMessage}</div>}

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Jenis aktivitas</label>

              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
              >
                <option value="food">Makanan & Kemasan Sekali Pakai</option>

                <option value="transport">
                  Transportasi Kendaraan Pribadi
                </option>

                <option value="energy">Penggunaan Listrik / AC</option>
              </select>
            </div>

            <div className="field">
              <label>
                {activityType === "food" && "Jumlah kemasan"}
                {activityType === "transport" && "Jarak perjalanan"}
                {activityType === "energy" && "Durasi penggunaan"}
              </label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                />

                <span>
                  {activityType === "food" && "unit"}
                  {activityType === "transport" && "km"}
                  {activityType === "energy" && "jam"}
                </span>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editId !== null ? "Simpan Perubahan" : "Catat Aktivitas"}
              </button>

              {editId !== null && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancelEdit}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RINGKASAN */}
        <div className="tracker-panel summary-panel">
          <div className="summary-heading">
            <div>
              <span className="small-label">TOTAL HARI INI</span>

              <h2>
                {totalCarbon.toFixed(2)}
                <small> kg CO₂e</small>
              </h2>
            </div>

            <div className="carbon-circle">CO₂</div>
          </div>

          <div className="summary-line"></div>

          <div className="comparison">
            <div>
              <span>Rata-rata mahasiswa</span>
              <strong>{campusAverage.toFixed(2)} kg</strong>
            </div>

            <div
              className={
                comparisonDiff <= 0
                  ? "comparison-status good"
                  : "comparison-status high"
              }
            >
              {comparisonDiff <= 0
                ? `${Math.abs(comparisonDiff).toFixed(2)} kg di bawah rata-rata`
                : `${comparisonDiff.toFixed(2)} kg di atas rata-rata`}
            </div>
          </div>

          <div className="recommendation">
            <div className="recommendation-title">Saran untukmu</div>

            <p>{getRecommendation()}</p>
          </div>
        </div>
      </section>

      {/* GRAFIK */}
      <section className="tracker-panel chart-panel">
        <div className="panel-heading-row">
          <div>
            <h2>Perkembangan Emisi</h2>
            <p>Perkiraan emisi selama beberapa hari terakhir.</p>
          </div>

          <span className="chart-unit">kg CO₂e</span>
        </div>

        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyTrend}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="day"
                tick={{
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip formatter={(value) => [`${value} kg CO₂e`, "Emisi"]} />

              <Bar
                dataKey="carbon"
                fill="#176b3a"
                radius={[3, 3, 0, 0]}
                barSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* RIWAYAT */}
      <section className="tracker-panel history-panel">
        <div className="panel-heading-row">
          <div>
            <h2>Riwayat Aktivitas</h2>
            <p>Aktivitas yang sudah kamu catat.</p>
          </div>

          <span className="history-count">{logs.length} aktivitas</span>
        </div>

        {logs.length === 0 ? (
          <div className="empty-history">Belum ada aktivitas yang dicatat.</div>
        ) : (
          <div className="activity-table">
            <div className="table-head">
              <span>Aktivitas</span>
              <span>Jumlah</span>
              <span>Emisi</span>
              <span>Aksi</span>
            </div>

            {logs.map((log) => (
              <div className="table-row" key={log.id}>
                <div className="activity-name">
                  <div className={`activity-mark ${log.type}`}></div>

                  <div>
                    <strong>{log.name}</strong>

                    <small>
                      {getCategoryLabel(log.type)}
                      {" · "}
                      {log.date}
                    </small>
                  </div>
                </div>

                <div className="activity-amount">
                  {log.amount} <small>{log.unit}</small>
                </div>

                <div className="activity-carbon">
                  <strong>{log.carbon.toFixed(2)}</strong>

                  <small>kg CO₂e</small>
                </div>

                <div className="activity-actions">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEdit(log)}
                    title="Edit aktivitas"
                  >
                    <span>✎</span>
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(log.id)}
                    title="Hapus aktivitas"
                  >
                    <span>×</span>
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="tracker-note">
        Perhitungan emisi pada prototipe merupakan estimasi berdasarkan
        aktivitas yang dicatat pengguna.
      </div>
    </main>
  );
};

export default Tracker;
