import React, { useState } from "react";
import {
  Check,
  Circle,
  Minus,
  CheckSquare,
  Square,
  Target,
} from "lucide-react";

export default function Behavior() {
  // State untuk Kebiasaan Saya
  const [habits, setHabits] = useState([
    { id: 1, name: "Bawa tumbler", target: 5, current: 4, unit: "hari/minggu" },
    { id: 2, name: "Jalan kaki", target: 3, current: 3, unit: "hari/minggu" },
  ]);

  // State untuk Aksi Hari Ini
  const [actions, setActions] = useState([
    { id: 1, name: "Bawa tumbler", done: false },
    { id: 2, name: "Jalan kaki", done: false },
    { id: 3, name: "Kurangi plastik", done: false },
  ]);

  // Data Konsistensi Minggu Ini
  const weeklyConsistency = [
    { day: "Sen", status: "dot" }, // ●
    { day: "Sel", status: "dot" }, // ●
    { day: "Rab", status: "check" }, // ✓
    { day: "Kam", status: "check" }, // ✓
    { day: "Jum", status: "dot" }, // ●
    { day: "Sab", status: "check" }, // ✓
    { day: "Min", status: "empty" }, // -
  ];

  const toggleAction = (id) => {
    setActions(
      actions.map((action) =>
        action.id === id ? { ...action, done: !action.done } : action,
      ),
    );
  };

  const markHabitToday = (id) => {
    setHabits(
      habits.map((habit) =>
        // Maksimal progress adalah 5 hari (sebagai contoh visual)
        habit.id === id && habit.current < 5
          ? { ...habit, current: habit.current + 1 }
          : habit,
      ),
    );
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-6 md:p-8 text-slate-700 font-sans">
      {/* HEADER PAGE */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Behavior</h1>
        <p className="text-sm text-slate-500 mt-1">
          Bangun kebiasaan kecil yang bisa kamu lakukan secara konsisten.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* KIRI: KEBIASAAN SAYA */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6 pb-4 border-b border-slate-100">
              Kebiasaan Saya
            </h2>

            <div className="space-y-8">
              {habits.map((habit) => (
                <div key={habit.id} className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-base font-bold text-slate-800">
                        {habit.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Target {habit.target} {habit.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Visual Progress Bar (10 kotak) */}
                    <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden flex">
                      <div
                        className="h-full bg-[#007A5e] transition-all duration-300"
                        style={{ width: `${(habit.current / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 w-16 text-right">
                      {habit.current}/5 hari
                    </span>
                  </div>

                  <button
                    onClick={() => markHabitToday(habit.id)}
                    className="text-xs font-semibold text-[#007A5e] hover:text-[#005c47] bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Target className="w-3.5 h-3.5" />
                    Tandai hari ini
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* KANAN: AKSI HARI INI & KONSISTENSI */}
        <div className="lg:col-span-5 space-y-6">
          {/* AKSI HARI INI */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pb-4 border-b border-slate-100">
              Aksi Hari Ini
            </h2>
            <div className="space-y-3">
              {actions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => toggleAction(action.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                    action.done
                      ? "bg-slate-50 border-slate-200 opacity-60"
                      : "bg-white border-slate-200 hover:border-[#007A5e] hover:shadow-sm"
                  }`}
                >
                  {action.done ? (
                    <CheckSquare className="w-5 h-5 text-[#007A5e]" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-300" />
                  )}
                  <span
                    className={`text-sm font-medium ${action.done ? "text-slate-400 line-through" : "text-slate-700"}`}
                  >
                    {action.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* KONSISTENSI MINGGU INI */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pb-4 border-b border-slate-100">
              Konsistensi Minggu Ini
            </h2>

            <div className="flex justify-between items-center px-2">
              {weeklyConsistency.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    {item.day}
                  </span>
                  <div className="h-6 flex items-center justify-center">
                    {item.status === "check" && (
                      <Check className="w-5 h-5 text-[#007A5e]" />
                    )}
                    {item.status === "dot" && (
                      <Circle className="w-3 h-3 fill-slate-800 text-slate-800" />
                    )}
                    {item.status === "empty" && (
                      <Minus className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <p className="text-sm font-semibold text-slate-800">
                5 hari aktif{" "}
                <span className="font-normal text-slate-500">minggu ini</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
