import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  X,
  Users,
  CheckCircle2,
  Clock3,
  TrendingUp,
  GraduationCap,
  RotateCcw,
} from "lucide-react";

import "./Students.css";


// =====================================================
// STORAGE
// =====================================================

const STORAGE_KEY = "ecodas_students";


// =====================================================
// DATA AWAL / PROTOTYPE
// =====================================================

const DEFAULT_STUDENTS = [
  {
    id: 1,
    name: "Nanik Wijayanti",
    nim: "23051430009",
    faculty: "Fakultas Teknik",
    studyProgram: "Teknik Industri",
    email: "nanik@student.uny.ac.id",
    awareness: 82,
    activities: 12,
    validated: 9,
    behavior: 76,
    status: "Aktif",
    joined: "2026-08-01",
  },
  {
    id: 2,
    name: "Aulia Rahma",
    nim: "23052410012",
    faculty: "Fakultas Ekonomi",
    studyProgram: "Manajemen",
    email: "aulia@student.uny.ac.id",
    awareness: 78,
    activities: 10,
    validated: 8,
    behavior: 71,
    status: "Aktif",
    joined: "2026-08-03",
  },
  {
    id: 3,
    name: "Dimas Pratama",
    nim: "23051820021",
    faculty: "Fakultas Ilmu Keolahragaan",
    studyProgram: "Ilmu Keolahragaan",
    email: "dimas@student.uny.ac.id",
    awareness: 74,
    activities: 8,
    validated: 6,
    behavior: 68,
    status: "Aktif",
    joined: "2026-08-05",
  },
  {
    id: 4,
    name: "Salsa Amalia",
    nim: "23052730018",
    faculty: "Fakultas Bahasa, Seni, dan Budaya",
    studyProgram: "Pendidikan Bahasa Inggris",
    email: "salsa@student.uny.ac.id",
    awareness: 88,
    activities: 15,
    validated: 13,
    behavior: 84,
    status: "Aktif",
    joined: "2026-08-07",
  },
  {
    id: 5,
    name: "Raka Aditya",
    nim: "23051940011",
    faculty: "Fakultas MIPA",
    studyProgram: "Pendidikan Matematika",
    email: "raka@student.uny.ac.id",
    awareness: 69,
    activities: 7,
    validated: 5,
    behavior: 64,
    status: "Aktif",
    joined: "2026-08-09",
  },
  {
    id: 6,
    name: "Ayu Lestari",
    nim: "23052650016",
    faculty: "Fakultas Ilmu Sosial dan Politik",
    studyProgram: "Administrasi Publik",
    email: "ayu@student.uny.ac.id",
    awareness: 81,
    activities: 11,
    validated: 9,
    behavior: 79,
    status: "Aktif",
    joined: "2026-08-10",
  },
];


// =====================================================
// FACULTY OPTIONS
// =====================================================

const FACULTIES = [
  "Semua Fakultas",
  "Fakultas Teknik",
  "Fakultas Ekonomi",
  "Fakultas Ilmu Keolahragaan",
  "Fakultas Bahasa, Seni, dan Budaya",
  "Fakultas MIPA",
  "Fakultas Ilmu Sosial dan Politik",
];


// =====================================================
// HELPERS
// =====================================================

function loadStudents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return DEFAULT_STUDENTS;
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed)
      ? parsed
      : DEFAULT_STUDENTS;
  } catch {
    return DEFAULT_STUDENTS;
  }
}


function saveStudents(data) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );
}


function getInitials(name) {
  if (!name) return "?";

  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
}


function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


// =====================================================
// EMPTY FORM
// =====================================================

const EMPTY_FORM = {
  name: "",
  nim: "",
  faculty: "",
  studyProgram: "",
  email: "",
  awareness: 0,
  activities: 0,
  validated: 0,
  behavior: 0,
  status: "Aktif",
};


// =====================================================
// COMPONENT
// =====================================================

export default function Students() {

  const [students, setStudents] = useState(loadStudents);

  const [search, setSearch] = useState("");

  const [facultyFilter, setFacultyFilter] =
    useState("Semua Fakultas");

  const [statusFilter, setStatusFilter] =
    useState("Semua");

  const [selectedStudent, setSelectedStudent] =
    useState(null);

  const [modalMode, setModalMode] =
    useState(null);

  const [form, setForm] =
    useState(EMPTY_FORM);


  // ===================================================
  // FILTER DATA
  // ===================================================

  const filteredStudents = useMemo(() => {

    const keyword = search
      .trim()
      .toLowerCase();

    return students.filter((student) => {

      const matchesSearch =
        !keyword ||
        student.name.toLowerCase().includes(keyword) ||
        student.nim.toLowerCase().includes(keyword) ||
        student.email.toLowerCase().includes(keyword) ||
        student.studyProgram.toLowerCase().includes(keyword);

      const matchesFaculty =
        facultyFilter === "Semua Fakultas" ||
        student.faculty === facultyFilter;

      const matchesStatus =
        statusFilter === "Semua" ||
        student.status === statusFilter;

      return (
        matchesSearch &&
        matchesFaculty &&
        matchesStatus
      );
    });

  }, [
    students,
    search,
    facultyFilter,
    statusFilter,
  ]);


  // ===================================================
  // STATISTICS
  // ===================================================

  const statistics = useMemo(() => {

    const total = students.length;

    const active = students.filter(
      (student) =>
        student.status === "Aktif"
    ).length;

    const totalActivities =
      students.reduce(
        (sum, student) =>
          sum + Number(student.activities || 0),
        0
      );

    const totalValidated =
      students.reduce(
        (sum, student) =>
          sum + Number(student.validated || 0),
        0
      );

    const averageAwareness =
      total > 0
        ? Math.round(
            students.reduce(
              (sum, student) =>
                sum + Number(student.awareness || 0),
              0
            ) / total
          )
        : 0;

    return {
      total,
      active,
      totalActivities,
      totalValidated,
      averageAwareness,
    };

  }, [students]);


  // ===================================================
  // OPEN ADD
  // ===================================================

  const handleAdd = () => {

    setForm(EMPTY_FORM);

    setModalMode("add");

    setSelectedStudent(null);
  };


  // ===================================================
  // OPEN EDIT
  // ===================================================

  const handleEdit = (student) => {

    setForm({
      ...student,
    });

    setSelectedStudent(student);

    setModalMode("edit");
  };


  // ===================================================
  // OPEN DETAIL
  // ===================================================

  const handleView = (student) => {

    setSelectedStudent(student);

    setModalMode("detail");
  };


  // ===================================================
  // DELETE
  // ===================================================

  const handleDelete = (student) => {

    const confirmed = window.confirm(
      `Hapus data mahasiswa ${student.name}?`
    );

    if (!confirmed) {
      return;
    }

    const updated = students.filter(
      (item) => item.id !== student.id
    );

    setStudents(updated);

    saveStudents(updated);
  };


  // ===================================================
  // RESET
  // ===================================================

  const handleReset = () => {

    const confirmed = window.confirm(
      "Reset data mahasiswa ke data prototype awal?"
    );

    if (!confirmed) {
      return;
    }

    setStudents(DEFAULT_STUDENTS);

    saveStudents(DEFAULT_STUDENTS);
  };


  // ===================================================
  // FORM CHANGE
  // ===================================================

  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // ===================================================
  // SAVE
  // ===================================================

  const handleSubmit = (event) => {

    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.nim.trim() ||
      !form.faculty ||
      !form.studyProgram.trim()
    ) {

      window.alert(
        "Nama, NIM, fakultas, dan program studi wajib diisi."
      );

      return;
    }


    // ================================================
    // EDIT
    // ================================================

    if (modalMode === "edit") {

      const updated = students.map(
        (student) => {

          if (
            student.id !== selectedStudent.id
          ) {
            return student;
          }

          return {
            ...student,
            ...form,
            awareness:
              Number(form.awareness || 0),
            activities:
              Number(form.activities || 0),
            validated:
              Number(form.validated || 0),
            behavior:
              Number(form.behavior || 0),
          };
        }
      );

      setStudents(updated);

      saveStudents(updated);

      setModalMode(null);

      setSelectedStudent(null);

      return;
    }


    // ================================================
    // ADD
    // ================================================

    const newStudent = {

      id:
        Date.now(),

      ...form,

      awareness:
        Number(form.awareness || 0),

      activities:
        Number(form.activities || 0),

      validated:
        Number(form.validated || 0),

      behavior:
        Number(form.behavior || 0),

      joined:
        new Date()
          .toISOString()
          .slice(0, 10),
    };


    const updated = [
      newStudent,
      ...students,
    ];

    setStudents(updated);

    saveStudents(updated);

    setModalMode(null);

    setSelectedStudent(null);
  };


  // ===================================================
  // CLOSE MODAL
  // ===================================================

  const closeModal = () => {

    setModalMode(null);

    setSelectedStudent(null);

    setForm(EMPTY_FORM);
  };


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="students-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="students-header">

        <div>

          <div className="students-eyebrow">
            ADMINISTRATION
          </div>

          <h1>
            Student Data
          </h1>

          <p>
            Kelola dan pantau data mahasiswa
            yang berpartisipasi dalam ECODAS.
          </p>

        </div>


        <div className="students-header-actions">

          <button
            type="button"
            className="students-button students-button-secondary"
            onClick={handleReset}
          >
            <RotateCcw size={16} />
            Reset Data
          </button>


          <button
            type="button"
            className="students-button students-button-primary"
            onClick={handleAdd}
          >
            <Plus size={17} />
            Tambah Mahasiswa
          </button>

        </div>

      </header>


      {/* =================================================
          PROTOTYPE NOTICE
      ================================================= */}

      <div className="students-notice">

        <div className="students-notice-icon">
          <GraduationCap size={18} />
        </div>

        <div>
          <strong>
            Student data prototype
          </strong>

          <p>
            Data pada halaman ini merupakan
            data simulasi untuk pengembangan
            prototype ECODAS.
          </p>
        </div>

      </div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="students-stat-grid">

        <div className="students-stat-card">

          <div className="students-stat-icon">
            <Users size={19} />
          </div>

          <div>
            <span>
              Total Mahasiswa
            </span>

            <strong>
              {statistics.total}
            </strong>
          </div>

        </div>


        <div className="students-stat-card">

          <div className="students-stat-icon">
            <CheckCircle2 size={19} />
          </div>

          <div>
            <span>
              Mahasiswa Aktif
            </span>

            <strong>
              {statistics.active}
            </strong>
          </div>

        </div>


        <div className="students-stat-card">

          <div className="students-stat-icon">
            <Clock3 size={19} />
          </div>

          <div>
            <span>
              Activity Records
            </span>

            <strong>
              {statistics.totalActivities}
            </strong>
          </div>

        </div>


        <div className="students-stat-card">

          <div className="students-stat-icon">
            <TrendingUp size={19} />
          </div>

          <div>
            <span>
              Rata-rata Awareness
            </span>

            <strong>
              {statistics.averageAwareness}%
            </strong>
          </div>

        </div>

      </section>


      {/* =================================================
          CONTROL PANEL
      ================================================= */}

      <section className="students-control">

        <div className="students-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Cari nama, NIM, email, atau program studi..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

        </div>


        <select
          className="students-select"
          value={facultyFilter}
          onChange={(event) =>
            setFacultyFilter(event.target.value)
          }
        >

          {FACULTIES.map(
            (faculty) => (
              <option
                key={faculty}
                value={faculty}
              >
                {faculty}
              </option>
            )
          )}

        </select>


        <select
          className="students-select"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
        >

          <option value="Semua">
            Semua Status
          </option>

          <option value="Aktif">
            Aktif
          </option>

          <option value="Nonaktif">
            Nonaktif
          </option>

        </select>

      </section>


      {/* =================================================
          TABLE
      ================================================= */}

      <section className="students-section">

        <div className="students-section-heading">

          <div>

            <span className="students-section-kicker">
              STUDENT DIRECTORY
            </span>

            <h2>
              Daftar Mahasiswa
            </h2>

          </div>

          <span className="students-result-count">
            {filteredStudents.length} mahasiswa
          </span>

        </div>


        <div className="students-table-wrapper">

          <table className="students-table">

            <thead>

              <tr>

                <th>
                  MAHASISWA
                </th>

                <th>
                  FAKULTAS / PRODI
                </th>

                <th>
                  AWARENESS
                </th>

                <th>
                  AKTIVITAS
                </th>

                <th>
                  BEHAVIOR
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  AKSI
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredStudents.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="students-empty"
                  >

                    <Users size={28} />

                    <strong>
                      Data mahasiswa tidak ditemukan
                    </strong>

                    <span>
                      Coba ubah kata kunci atau filter.
                    </span>

                  </td>

                </tr>

              ) : (

                filteredStudents.map(
                  (student) => (

                    <tr key={student.id}>

                      {/* =================================
                          STUDENT
                      ================================= */}

                      <td>

                        <div className="students-person">

                          <div className="students-avatar">
                            {getInitials(
                              student.name
                            )}
                          </div>

                          <div>

                            <strong>
                              {student.name}
                            </strong>

                            <span>
                              {student.nim}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* =================================
                          FACULTY
                      ================================= */}

                      <td>

                        <div className="students-academic">

                          <strong>
                            {student.faculty}
                          </strong>

                          <span>
                            {student.studyProgram}
                          </span>

                        </div>

                      </td>


                      {/* =================================
                          AWARENESS
                      ================================= */}

                      <td>

                        <div className="students-metric">

                          <strong>
                            {student.awareness}%
                          </strong>

                          <div className="students-progress">
                            <span
                              style={{
                                width: `${Math.min(
                                  student.awareness,
                                  100
                                )}%`,
                              }}
                            />
                          </div>

                        </div>

                      </td>


                      {/* =================================
                          ACTIVITIES
                      ================================= */}

                      <td>

                        <div className="students-activity-count">

                          <strong>
                            {student.activities}
                          </strong>

                          <span>
                            {student.validated} tervalidasi
                          </span>

                        </div>

                      </td>


                      {/* =================================
                          BEHAVIOR
                      ================================= */}

                      <td>

                        <span className="students-score">
                          {student.behavior}%
                        </span>

                      </td>


                      {/* =================================
                          STATUS
                      ================================= */}

                      <td>

                        <span
                          className={`students-status ${
                            student.status === "Aktif"
                              ? "students-status-active"
                              : "students-status-inactive"
                          }`}
                        >
                          {student.status}
                        </span>

                      </td>


                      {/* =================================
                          ACTION
                      ================================= */}

                      <td>

                        <div className="students-row-actions">

                          <button
                            type="button"
                            title="Lihat detail"
                            onClick={() =>
                              handleView(student)
                            }
                          >
                            <Eye size={16} />
                          </button>


                          <button
                            type="button"
                            title="Edit"
                            onClick={() =>
                              handleEdit(student)
                            }
                          >
                            <Pencil size={16} />
                          </button>


                          <button
                            type="button"
                            title="Hapus"
                            className="students-delete-action"
                            onClick={() =>
                              handleDelete(student)
                            }
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </section>


      {/* =================================================
          DETAIL MODAL
      ================================================= */}

      {modalMode === "detail" &&
        selectedStudent && (

          <div
            className="students-modal-backdrop"
            onMouseDown={closeModal}
          >

            <div
              className="students-modal students-detail-modal"
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >

              <div className="students-modal-header">

                <div>

                  <span className="students-section-kicker">
                    STUDENT PROFILE
                  </span>

                  <h2>
                    Detail Mahasiswa
                  </h2>

                </div>

                <button
                  type="button"
                  className="students-modal-close"
                  onClick={closeModal}
                >
                  <X size={19} />
                </button>

              </div>


              <div className="students-detail-profile">

                <div className="students-detail-avatar">
                  {getInitials(
                    selectedStudent.name
                  )}
                </div>

                <div>

                  <h3>
                    {selectedStudent.name}
                  </h3>

                  <p>
                    {selectedStudent.nim}
                  </p>

                  <span
                    className={`students-status ${
                      selectedStudent.status === "Aktif"
                        ? "students-status-active"
                        : "students-status-inactive"
                    }`}
                  >
                    {selectedStudent.status}
                  </span>

                </div>

              </div>


              <div className="students-detail-grid">

                <div>
                  <span>
                    Fakultas
                  </span>

                  <strong>
                    {selectedStudent.faculty}
                  </strong>
                </div>


                <div>
                  <span>
                    Program Studi
                  </span>

                  <strong>
                    {selectedStudent.studyProgram}
                  </strong>
                </div>


                <div>
                  <span>
                    Email
                  </span>

                  <strong>
                    {selectedStudent.email}
                  </strong>
                </div>


                <div>
                  <span>
                    Bergabung
                  </span>

                  <strong>
                    {formatDate(
                      selectedStudent.joined
                    )}
                  </strong>
                </div>

              </div>


              <div className="students-detail-metrics">

                <div>

                  <span>
                    Awareness
                  </span>

                  <strong>
                    {selectedStudent.awareness}%
                  </strong>

                </div>


                <div>

                  <span>
                    Activity Records
                  </span>

                  <strong>
                    {selectedStudent.activities}
                  </strong>

                </div>


                <div>

                  <span>
                    Tervalidasi
                  </span>

                  <strong>
                    {selectedStudent.validated}
                  </strong>

                </div>


                <div>

                  <span>
                    Behavior
                  </span>

                  <strong>
                    {selectedStudent.behavior}%
                  </strong>

                </div>

              </div>


              <div className="students-modal-footer">

                <button
                  type="button"
                  className="students-button students-button-secondary"
                  onClick={closeModal}
                >
                  Tutup
                </button>

                <button
                  type="button"
                  className="students-button students-button-primary"
                  onClick={() =>
                    handleEdit(selectedStudent)
                  }
                >
                  <Pencil size={16} />
                  Edit Data
                </button>

              </div>

            </div>

          </div>

        )}


      {/* =================================================
          ADD / EDIT MODAL
      ================================================= */}

      {(modalMode === "add" ||
        modalMode === "edit") && (

        <div
          className="students-modal-backdrop"
          onMouseDown={closeModal}
        >

          <div
            className="students-modal students-form-modal"
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >

            <div className="students-modal-header">

              <div>

                <span className="students-section-kicker">
                  {modalMode === "add"
                    ? "NEW STUDENT"
                    : "EDIT STUDENT"}
                </span>

                <h2>
                  {modalMode === "add"
                    ? "Tambah Mahasiswa"
                    : "Edit Data Mahasiswa"}
                </h2>

              </div>

              <button
                type="button"
                className="students-modal-close"
                onClick={closeModal}
              >
                <X size={19} />
              </button>

            </div>


            <form
              className="students-form"
              onSubmit={handleSubmit}
            >

              <div className="students-form-grid">

                {/* NAME */}

                <div className="students-form-group">

                  <label>
                    Nama Lengkap
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nama mahasiswa"
                  />

                </div>


                {/* NIM */}

                <div className="students-form-group">

                  <label>
                    NIM
                  </label>

                  <input
                    name="nim"
                    value={form.nim}
                    onChange={handleChange}
                    placeholder="Nomor induk mahasiswa"
                  />

                </div>


                {/* FACULTY */}

                <div className="students-form-group">

                  <label>
                    Fakultas
                  </label>

                  <select
                    name="faculty"
                    value={form.faculty}
                    onChange={handleChange}
                  >

                    <option value="">
                      Pilih fakultas
                    </option>

                    {FACULTIES
                      .filter(
                        (faculty) =>
                          faculty !==
                          "Semua Fakultas"
                      )
                      .map(
                        (faculty) => (
                          <option
                            key={faculty}
                            value={faculty}
                          >
                            {faculty}
                          </option>
                        )
                      )}

                  </select>

                </div>


                {/* STUDY PROGRAM */}

                <div className="students-form-group">

                  <label>
                    Program Studi
                  </label>

                  <input
                    name="studyProgram"
                    value={form.studyProgram}
                    onChange={handleChange}
                    placeholder="Program studi"
                  />

                </div>


                {/* EMAIL */}

                <div className="students-form-group students-form-full">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="email@student.uny.ac.id"
                  />

                </div>


                {/* AWARENESS */}

                <div className="students-form-group">

                  <label>
                    Awareness (%)
                  </label>

                  <input
                    type="number"
                    name="awareness"
                    min="0"
                    max="100"
                    value={form.awareness}
                    onChange={handleChange}
                  />

                </div>


                {/* ACTIVITIES */}

                <div className="students-form-group">

                  <label>
                    Activity Records
                  </label>

                  <input
                    type="number"
                    name="activities"
                    min="0"
                    value={form.activities}
                    onChange={handleChange}
                  />

                </div>


                {/* VALIDATED */}

                <div className="students-form-group">

                  <label>
                    Tervalidasi
                  </label>

                  <input
                    type="number"
                    name="validated"
                    min="0"
                    value={form.validated}
                    onChange={handleChange}
                  />

                </div>


                {/* BEHAVIOR */}

                <div className="students-form-group">

                  <label>
                    Behavior (%)
                  </label>

                  <input
                    type="number"
                    name="behavior"
                    min="0"
                    max="100"
                    value={form.behavior}
                    onChange={handleChange}
                  />

                </div>


                {/* STATUS */}

                <div className="students-form-group">

                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >

                    <option value="Aktif">
                      Aktif
                    </option>

                    <option value="Nonaktif">
                      Nonaktif
                    </option>

                  </select>

                </div>

              </div>


              <div className="students-modal-footer">

                <button
                  type="button"
                  className="students-button students-button-secondary"
                  onClick={closeModal}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="students-button students-button-primary"
                >
                  {modalMode === "add"
                    ? "Simpan Mahasiswa"
                    : "Simpan Perubahan"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}