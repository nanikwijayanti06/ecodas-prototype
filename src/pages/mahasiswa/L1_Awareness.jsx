import React, { useMemo, useState } from "react";

import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  Search,
  X,
} from "lucide-react";

import {
  awarenessAreas,
  awarenessScenarios,
  greenwashingContent,
} from "./awarenessData";

export default function AwarenessPage() {
  /*
    ============================================================
    STATE
    ============================================================
  */

  const [search, setSearch] = useState("");

  const [selectedArea, setSelectedArea] = useState(null);

  const [completedAreas, setCompletedAreas] = useState([]);

  const [scenarioOpen, setScenarioOpen] = useState(false);

  const [scenarioIndex, setScenarioIndex] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [answerChecked, setAnswerChecked] = useState(false);

  const [greenwashingOpen, setGreenwashingOpen] = useState(false);

  /*
    ============================================================
    SEARCH
    ============================================================
  */

  const filteredAreas = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return awarenessAreas;
    }

    return awarenessAreas.filter((area) => {
      const searchableText = [
        area.title,
        area.description,
        ...area.topics.map((topic) => topic.title),
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [search]);

  /*
    ============================================================
    PROGRESS
    ============================================================
  */

  const toggleCompleted = (id) => {
    setCompletedAreas((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      return [...previous, id];
    });
  };

  /*
    ============================================================
    SCENARIO
    ============================================================
  */

  const currentScenario = awarenessScenarios[scenarioIndex];

  const startScenario = () => {
    setScenarioIndex(0);
    setSelectedAnswer(null);
    setAnswerChecked(false);
    setScenarioOpen(true);
  };

  const closeScenario = () => {
    setScenarioOpen(false);
    setSelectedAnswer(null);
    setAnswerChecked(false);
  };

  const selectAnswer = (index) => {
    if (answerChecked) return;

    setSelectedAnswer(index);
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;

    setAnswerChecked(true);
  };

  const nextScenario = () => {
    if (scenarioIndex < awarenessScenarios.length - 1) {
      setScenarioIndex((previous) => previous + 1);
      setSelectedAnswer(null);
      setAnswerChecked(false);
      return;
    }

    closeScenario();
  };

  /*
    ============================================================
    RENDER
    ============================================================
  */

  return (
    <main className="min-h-screen bg-[#F8FAF7] text-[#17231C]">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <header className="border-b border-[#DDE4DE] bg-[#FBFCFA]">
        <div className="mx-auto max-w-[1280px] px-6 py-10 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-[44px]">
                Understand before
                <br />
                you consume.
              </h1>

              <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[#69766E] sm:text-[15px]">
                Bangun pemahaman mengenai hubungan antara pilihan konsumsi,
                lingkungan, sumber daya, dan dampak produk dalam kehidupan
                sehari-hari.
              </p>
            </div>

            {/* PROGRESS */}

            <div className="w-full border-l border-[#D5DED7] pl-5 lg:max-w-[220px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A978F]">
                Learning progress
              </p>

              <div className="mt-3 flex items-end gap-2">
                <span className="text-3xl font-semibold tracking-[-0.04em]">
                  {completedAreas.length}
                </span>

                <span className="pb-1 text-sm text-[#7A877F]">
                  / {awarenessAreas.length} areas
                </span>
              </div>

              <div className="mt-3 h-1 w-full bg-[#E2E9E3]">
                <div
                  className="h-1 bg-[#244E36] transition-all"
                  style={{
                    width: `${
                      (completedAreas.length / awarenessAreas.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* SEARCH */}

          <div className="mt-9 max-w-[620px]">
            <div className="flex items-center border-b border-[#AEBAB1] pb-3">
              <Search
                size={17}
                strokeWidth={1.5}
                className="mr-3 text-[#718078]"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Cari materi..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[#9AA59E]"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="ml-3 text-[#718078] hover:text-[#17231C]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <div className="mx-auto max-w-[1280px] px-6 sm:px-8 lg:px-12">
        {/* ====================================================
            LEARNING AREAS
        ==================================================== */}

        <section className="py-12">
          <div className="mb-6 flex items-baseline justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#849188]">
                Explore
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                Learning areas
              </h2>
            </div>

            <p className="hidden text-xs text-[#89958D] sm:block">
              {filteredAreas.length} areas
            </p>
          </div>

          {/* LIST */}

          <div className="border-t border-[#D7E0D9]">
            {filteredAreas.map((area) => {
              const Icon = area.icon;

              const completed = completedAreas.includes(area.id);

              return (
                <div
                  key={area.id}
                  className="group border-b border-[#D7E0D9] bg-[#FBFCFA] transition hover:bg-[#F1F5F1]"
                >
                  <div className="flex min-h-[150px] items-center gap-4 px-4 py-5 sm:gap-6 sm:px-5">
                    {/* CHECK */}

                    <button
                      onClick={() => toggleCompleted(area.id)}
                      aria-label={
                        completed ? "Tandai belum selesai" : "Tandai selesai"
                      }
                      className={`
                        flex h-6 w-6 shrink-0 items-center justify-center
                        border transition
                        ${
                          completed
                            ? "border-[#244E36] bg-[#244E36] text-white"
                            : "border-[#AAB7AE] bg-white text-transparent hover:border-[#244E36]"
                        }
                      `}
                    >
                      <Check size={13} strokeWidth={2} />
                    </button>

                    {/* IMAGE */}

                    <div className="hidden h-[100px] w-[140px] shrink-0 overflow-hidden bg-[#E8EEE9] sm:block">
                      <img
                        src={area.image}
                        alt=""
                        className="h-full w-full object-cover"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    {/* NUMBER */}

                    <div className="hidden w-7 shrink-0 text-[11px] font-medium text-[#9AA59E] md:block">
                      {area.id}
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-[17px] font-semibold tracking-[-0.025em]">
                          {area.title}
                        </h3>

                        <span
                          className={`
                            text-[9px] font-semibold uppercase tracking-[0.12em]
                            ${
                              area.priority.includes("tinggi")
                                ? "text-[#356A4D]"
                                : "text-[#89958D]"
                            }
                          `}
                        >
                          {area.priority}
                        </span>
                      </div>

                      <p className="mt-2 max-w-2xl text-[13px] leading-6 text-[#6B786F]">
                        {area.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                        {area.topics.slice(0, 4).map((topic) => (
                          <span
                            key={topic.title}
                            className="text-[11px] text-[#87938B]"
                          >
                            {topic.title}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ACTION */}

                    <button
                      onClick={() => setSelectedArea(area)}
                      className="flex shrink-0 items-center gap-2 px-2 text-sm font-medium text-[#315A42] transition hover:text-[#183A29]"
                    >
                      <span className="hidden sm:inline">Explore</span>

                      <ChevronRight size={17} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* EMPTY */}

            {filteredAreas.length === 0 && (
              <div className="border-b border-[#D7E0D9] py-16 text-center">
                <Search
                  size={20}
                  strokeWidth={1.4}
                  className="mx-auto text-[#9AA59E]"
                />

                <p className="mt-3 text-sm font-medium">
                  Materi tidak ditemukan
                </p>

                <p className="mt-1 text-xs text-[#8B978F]">
                  Coba gunakan kata pencarian lain.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ====================================================
            INTERACTIVE LEARNING
        ==================================================== */}

        <section className="border-t border-[#D7E0D9] py-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3B684E]">
                Interactive learning
              </p>

              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.035em]">
                Test your understanding
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B786F]">
                Coba beberapa situasi sederhana yang dekat dengan aktivitas
                konsumsi mahasiswa.
              </p>
            </div>

            <div className="border-l border-[#D7E0D9] pl-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A978F]">
                05 scenarios
              </p>

              <p className="mt-2 text-sm leading-6 text-[#69766E]">
                Pilih jawaban dan baca penjelasan untuk memahami alasannya.
              </p>

              <button
                onClick={startScenario}
                className="mt-5 inline-flex items-center gap-2 bg-[#244E36] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#183A29]"
              >
                Mulai skenario
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>

        {/* ====================================================
            GREENWASHING
        ==================================================== */}

        <section className="border-t border-[#D7E0D9] py-12">
          <div className="border-l-2 border-[#3B684E] bg-[#F0F4F0]">
            <button
              onClick={() => setGreenwashingOpen((previous) => !previous)}
              className="flex w-full items-start justify-between gap-6 px-5 py-6 text-left sm:px-7"
            >
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#3B684E]">
                  {greenwashingContent.label}
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em]">
                  {greenwashingContent.title}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68756D]">
                  {greenwashingContent.description}
                </p>
              </div>

              <span className="mt-1 flex shrink-0 items-center gap-2 text-sm font-medium text-[#244E36]">
                <span className="hidden sm:inline">
                  {greenwashingOpen ? "Tutup" : "Pelajari"}
                </span>

                {greenwashingOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </span>
            </button>

            {greenwashingOpen && (
              <div className="border-t border-[#D6E0D7] px-5 py-7 sm:px-7">
                <p className="max-w-3xl text-sm leading-7 text-[#65736A]">
                  {greenwashingContent.introduction}
                </p>

                <div className="mt-7 divide-y divide-[#D8E1D9] border-y border-[#D8E1D9]">
                  {greenwashingContent.points.map((point, index) => (
                    <div key={point.title} className="flex gap-5 py-5">
                      <span className="pt-1 text-[10px] font-medium text-[#96A29A]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3 className="text-sm font-semibold">{point.title}</h3>

                        <p className="mt-1 text-sm leading-6 text-[#69766E]">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#849188]">
                    Quick check
                  </p>

                  <div className="mt-3 space-y-2">
                    {greenwashingContent.checklist.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border border-[#AEBBB1] bg-white">
                          <Check
                            size={12}
                            strokeWidth={1.8}
                            className="text-[#356A4D]"
                          />
                        </span>

                        <p className="text-sm leading-6 text-[#68756D]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ====================================================
            BOTTOM
        ==================================================== */}

        <footer className="border-t border-[#D7E0D9] py-8">
          <div className="flex flex-col gap-2 text-xs text-[#8A968E] sm:flex-row sm:items-center sm:justify-between">
            <span>ECODAS · Layer 01 Awareness</span>

            <span>Understand · Reflect · Learn</span>
          </div>
        </footer>
      </div>

      {/* ======================================================
          AREA DETAIL MODAL
      ====================================================== */}

      {selectedArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#122019]/45 p-4">
          <div className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden border border-[#D6E0D8] bg-[#FBFCFA] shadow-[0_20px_60px_rgba(20,50,35,0.16)]">
            {/* HEADER */}

            <div className="flex items-start justify-between border-b border-[#DDE5DE] px-6 py-5 sm:px-8">
              <div className="pr-5">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-medium text-[#98A39C]">
                    {selectedArea.id}
                  </span>

                  <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#397451]">
                    {selectedArea.priority}
                  </span>
                </div>

                <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em]">
                  {selectedArea.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedArea(null)}
                className="text-[#839087] hover:text-[#193024]"
              >
                <X size={18} />
              </button>
            </div>

            {/* CONTENT */}

            <div className="overflow-y-auto">
              {/* HERO IMAGE */}

              <div className="h-44 w-full bg-[#E7EEE8] sm:h-52">
                <img
                  src={selectedArea.image}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <div className="px-6 py-7 sm:px-8">
                <p className="max-w-2xl text-sm leading-7 text-[#627168]">
                  {selectedArea.description}
                </p>

                {/* MATERIAL */}

                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#829188]">
                    Materi
                  </p>

                  <div className="border-t border-[#DDE5DE]">
                    {selectedArea.topics.map((topic, index) => (
                      <div
                        key={topic.title}
                        className="flex gap-4 border-b border-[#DDE5DE] py-5"
                      >
                        <span className="pt-1 text-[10px] font-medium text-[#A0ACA4]">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* SMALL IMAGE */}

                        <div className="hidden h-16 w-20 shrink-0 overflow-hidden bg-[#E8EEE9] sm:block">
                          <img
                            src={topic.image}
                            alt=""
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-[#193024]">
                            {topic.title}
                          </h3>

                          <p className="mt-1.5 text-sm leading-6 text-[#68776E]">
                            {topic.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* PRODUCT JOURNEY */}

                {selectedArea.lifecycle && (
                  <div className="mt-8">
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#829188]">
                      Product journey
                    </p>

                    <div className="border-t border-[#DDE5DE]">
                      {selectedArea.lifecycle.map((step, index) => (
                        <div
                          key={step}
                          className="flex items-center gap-4 border-b border-[#DDE5DE] py-4"
                        >
                          <span className="text-[10px] font-medium text-[#A0ACA4]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="text-sm font-medium text-[#31453A]">
                            {step}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* FOOTER */}

            <div className="flex justify-end border-t border-[#DDE5DE] bg-[#F5F7F4] px-6 py-4 sm:px-8">
              <button
                onClick={() => setSelectedArea(null)}
                className="bg-[#244E36] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#183A29]"
              >
                Tutup materi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================
          SCENARIO MODAL
      ====================================================== */}

      {scenarioOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#122019]/45 p-4">
          <div className="w-full max-w-2xl overflow-hidden border border-[#D6E0D8] bg-[#FBFCFA] shadow-[0_20px_60px_rgba(20,50,35,0.18)]">
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#DDE5DE] px-6 py-5 sm:px-8">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#397451]">
                  Interactive learning
                </p>

                <p className="mt-1 text-xs text-[#89958D]">
                  Skenario {scenarioIndex + 1} dari {awarenessScenarios.length}
                </p>
              </div>

              <button
                onClick={closeScenario}
                className="text-[#839087] hover:text-[#193024]"
              >
                <X size={18} />
              </button>
            </div>

            {/* QUESTION */}

            <div className="px-6 py-7 sm:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#829188]">
                {currentScenario.category}
              </p>

              <h2 className="mt-3 text-xl font-semibold leading-7 tracking-[-0.02em]">
                {currentScenario.question}
              </h2>

              {/* OPTIONS */}

              <div className="mt-6 border-t border-[#DDE5DE]">
                {currentScenario.options.map((option, index) => {
                  const selected = selectedAnswer === index;

                  const correct = index === currentScenario.answer;

                  let style = "border-[#DDE5DE] bg-[#FBFCFA]";

                  if (answerChecked) {
                    if (correct) {
                      style = "border-[#5C966F] bg-[#EFF5F0]";
                    } else if (selected) {
                      style = "border-[#C98585] bg-[#FAF0F0]";
                    }
                  } else if (selected) {
                    style = "border-[#244E36] bg-[#F0F4F0]";
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => selectAnswer(index)}
                      disabled={answerChecked}
                      className={`flex w-full items-start gap-4 border-b p-4 text-left transition ${style}`}
                    >
                      <span
                        className={`
                            flex h-6 w-6 shrink-0
                            items-center justify-center
                            border text-[10px] font-medium
                            ${
                              selected
                                ? "border-[#244E36] bg-[#244E36] text-white"
                                : "border-[#B8C4BC] text-[#627168]"
                            }
                          `}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>

                      <span className="text-sm leading-6 text-[#46564D]">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* EXPLANATION */}

              {answerChecked && (
                <div className="mt-6 border-l-2 border-[#4D8D65] bg-[#F0F5F1] px-4 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#397451]">
                    {selectedAnswer === currentScenario.answer
                      ? "Pilihan tepat"
                      : "Penjelasan"}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#627168]">
                    {currentScenario.explanation}
                  </p>
                </div>
              )}

              {/* ACTION */}

              <div className="mt-7 flex justify-end">
                {!answerChecked ? (
                  <button
                    onClick={checkAnswer}
                    disabled={selectedAnswer === null}
                    className={`
                      inline-flex items-center gap-2 px-5 py-2.5
                      text-sm font-medium
                      ${
                        selectedAnswer === null
                          ? "cursor-not-allowed bg-[#E5EBE6] text-[#9AA69E]"
                          : "bg-[#244E36] text-white hover:bg-[#183A29]"
                      }
                    `}
                  >
                    Periksa jawaban
                    <ArrowRight size={15} />
                  </button>
                ) : (
                  <button
                    onClick={nextScenario}
                    className="inline-flex items-center gap-2 bg-[#244E36] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#183A29]"
                  >
                    {scenarioIndex === awarenessScenarios.length - 1
                      ? "Selesai"
                      : "Berikutnya"}

                    <ArrowRight size={15} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
