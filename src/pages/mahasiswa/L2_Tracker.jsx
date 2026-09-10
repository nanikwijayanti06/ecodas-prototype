import React, { useState } from 'react';
import { 
  Plus, Search, Edit3, Trash2, X, Upload, 
  ChevronLeft, ChevronRight, Calendar, Leaf, 
  CheckCircle2, Bookmark, Sparkles, FileText
} from 'lucide-react';

// Data Awal Riwayat Aktivitas
const INITIAL_ACTIVITIES = [
  { id: 1, date: '08 Sep 2026', title: 'Bawa Tumbler Air Minum', category: 'Plastik', amount: '1 botol', impact: '-0.5 kg CO₂', status: 'Terverifikasi' },
  { id: 2, date: '08 Sep 2026', title: 'Jalan Kaki ke Fakultas', category: 'Mobilitas', amount: '1.2 km', impact: '-0.8 kg CO₂', status: 'Terverifikasi' },
  { id: 3, date: '08 Sep 2026', title: 'Pemilahan Sampah Kantin', category: 'Konsumsi', amount: '1 porsi', impact: '-0.3 kg CO₂', status: 'Proses' },
  { id: 4, date: '07 Sep 2026', title: 'Submit Tugas via LMS Digital', category: 'Paperless', amount: '5 lembar', impact: '-0.2 kg CO₂', status: 'Terverifikasi' },
  { id: 5, date: '06 Sep 2026', title: 'Matikan AC & Lampu Kelas', category: 'Energi', amount: '2 jam', impact: '-0.6 kg CO₂', status: 'Terverifikasi' },
];

export default function Tracker() {
  // State CRUD & Filter
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [activeTab, setActiveTab] = useState('Hari ini');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // State Modal (Layout terinspirasi VEED)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Plastik',
    amount: '',
    impact: '-0.5 kg CO₂',
    status: 'Terverifikasi',
    date: '08 Sep 2026',
    fileProof: null
  });

  // Filter Data
  const filteredActivities = activities.filter(act => {
    const matchSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        act.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'Hari ini') return matchSearch && act.date === '08 Sep 2026';
    return matchSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage) || 1;
  const paginatedData = filteredActivities.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Modal Handler
  const handleOpenModal = (item = null, presetCategory = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        category: presetCategory || 'Plastik',
        amount: '1 Porsi / Kali',
        impact: '-0.4 kg CO₂',
        status: 'Terverifikasi',
        date: '08 Sep 2026',
        fileProof: null
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingId) {
      setActivities(activities.map(a => a.id === editingId ? { ...a, ...formData } : a));
    } else {
      setActivities([{ id: Date.now(), ...formData }, ...activities]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm('Hapus aktivitas ini dari riwayat?')) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-6 md:p-8 space-y-6 text-slate-700 font-sans">
      
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tracker</h1>
          <p className="text-xs text-slate-500 mt-0.5">Catat aktivitas konsumsi harianmu dan lihat dampaknya terhadap lingkungan.</p>
        </div>

        <div className="flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Hari ini • 08 Sep 2026</span>
        </div>
      </div>

      {/* ROW 1: CATAT AKTIVITAS & DAMPAK HARI INI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* KIRI: CATAT AKTIVITAS HARIAN */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#007A5e] uppercase tracking-wider">CATAT AKTIVITAS</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">Catat Aktivitas Harian</h2>
            <p className="text-xs text-slate-500 mt-0.5">Catat aktivitasmu untuk melihat perkiraan reduksi emisi dan timbulan sampah.</p>

            {/* KATEGORI CEPAT */}
            <div className="mt-4">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">KATEGORI CEPAT:</p>
              <div className="flex flex-wrap gap-2">
                {['Plastik', 'Mobilitas', 'Konsumsi', 'Paperless', 'Energi'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleOpenModal(null, cat)}
                    className="text-xs font-semibold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-[#007A5e] px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald-200 transition-colors"
                  >
                    + {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="w-full bg-[#007A5e] hover:bg-[#00634c] text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>+ Catat Aktivitas</span>
          </button>
        </div>

        {/* KANAN: DAMPAK HARI INI */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Dampak Hari Ini</h3>
                <p className="text-xs text-slate-400 mt-0.5">Estimasi kumulatif berdasarkan aktivitas tercatat hari ini</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">Terverifikasi</span>
            </div>

            {/* METRIK 3 KOLOM */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">CO₂ TERHINDAR</p>
                <p className="text-lg font-extrabold text-slate-900 mt-1">1.8 <span className="text-xs font-semibold">kg</span></p>
                <p className="text-[10px] text-slate-400 mt-1">Estimasi emisi/reduksi</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">SAMPAH TERHINDAR</p>
                <p className="text-lg font-extrabold text-slate-900 mt-1">0.4 <span className="text-xs font-semibold">kg</span></p>
                <p className="text-[10px] text-slate-400 mt-1">Timbulan terhindar & terkelola</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase">AKTIVITAS</p>
                <p className="text-lg font-extrabold text-[#007A5e] mt-1">4 <span className="text-xs font-semibold">item</span></p>
                <p className="text-[10px] text-slate-400 mt-1">Tercatat hari ini</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-400 pt-2 border-t border-slate-100">
            <span>Standar emisi GHG Protocol University Hub</span>
            <span className="font-semibold text-emerald-700">+24% efisiensi vs kemarin</span>
          </div>
        </div>

      </div>

      {/* ROW 2: RIWAYAT AKTIVITAS (TABEL CRUD) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* HEADER TABEL */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Riwayat Aktivitas</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Daftar konsumsi dan aktivitas lingkungan yang telah dimasukkan.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Tab Filter */}
            <div className="flex bg-slate-100 p-1 rounded-lg text-xs font-semibold text-slate-500">
              {['Semua', 'Hari ini', 'Minggu ini'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === tab ? 'bg-white text-slate-800 shadow-xs' : 'hover:text-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari aktivitas / kategori..." 
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#007A5e] w-48"
              />
            </div>
          </div>
        </div>

        {/* TABEL DATA */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-5">TANGGAL</th>
                <th className="py-3.5 px-5">AKTIVITAS</th>
                <th className="py-3.5 px-5">KATEGORI</th>
                <th className="py-3.5 px-5">JUMLAH</th>
                <th className="py-3.5 px-5">DAMPAK</th>
                <th className="py-3.5 px-5">STATUS</th>
                <th className="py-3.5 px-5 text-center">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-mono text-slate-400 text-[11px]">{item.date}</td>
                    <td className="py-3.5 px-5 font-semibold text-slate-800">{item.title}</td>
                    <td className="py-3.5 px-5 text-slate-600">{item.category}</td>
                    <td className="py-3.5 px-5">{item.amount}</td>
                    <td className="py-3.5 px-5 font-bold text-slate-800">{item.impact}</td>
                    
                    {/* STATUS: LATAR BELAKANG POLOS BG PUTIH (TANPA KOTAKAN) */}
                    <td className="py-3.5 px-5 font-bold">
                      <span className={
                        item.status === 'Terverifikasi' ? 'text-emerald-700' : 'text-amber-700'
                      }>
                        {item.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => handleOpenModal(item)}
                          className="p-1 text-slate-400 hover:text-[#007A5e] transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-400">
                    Belum ada riwayat aktivitas yang tercatat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER & PAGINATION */}
        <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Menampilkan <span className="font-semibold text-slate-800">{paginatedData.length}</span> data riwayat
          </div>

          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg font-semibold text-xs ${
                  currentPage === page ? 'bg-[#007A5e] text-white' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* ROW 3: PERKEMBANGAN MINGGU INI & REKOMENDASI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* BAR CHART: PERKEMBANGAN MINGGU INI */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Perkembangan Minggu Ini</h3>
                <p className="text-xs text-slate-400 mt-0.5">Volume aktivitas harian dan konsistensi pengurangan emisi.</p>
              </div>
              <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md font-medium">
                Periode: 02 Sep - 08 Sep 2026
              </span>
            </div>

            {/* VISUAL BARS */}
            <div className="h-40 flex items-end justify-between gap-3 pt-6 px-4">
              {[
                { day: 'Sen', akt: 3, height: '60%' },
                { day: 'Sel', akt: 2, height: '40%' },
                { day: 'Rab', akt: 4, height: '85%' },
                { day: 'Kam', akt: 2, height: '40%' },
                { day: 'Jum', akt: 3, height: '60%' },
                { day: 'Sab', akt: 1, height: '25%' },
                { day: 'Min', akt: 3, height: '60%' },
              ].map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <span className="text-[10px] text-slate-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.akt} akt
                  </span>
                  <div className="w-full bg-slate-100 h-full rounded-t-lg flex items-end justify-center p-0.5">
                    <div 
                      className="w-full bg-[#007A5e] group-hover:bg-[#00634c] rounded-t transition-all" 
                      style={{ height: item.height }}
                    ></div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 mt-1">{item.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-100 font-medium">
            <span className="text-slate-500">Aktivitas tercatat: <strong className="text-slate-800">18</strong></span>
            <span className="text-slate-500">Net CO₂: <strong className="text-emerald-700">-3.2 kg</strong></span>
            <span className="text-slate-500">Sampah tereduksi: <strong className="text-emerald-700">1.4 kg</strong></span>
          </div>
        </div>

        {/* KANAN: REKOMENDASI */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-bold text-slate-900">Rekomendasi</h3>
              </div>
              <Bookmark className="w-4 h-4 text-slate-300" />
            </div>

            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100 space-y-1">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">FOKUS PERBAIKAN KAMPUS</span>
              <p className="text-xs text-slate-700 leading-relaxed">
                Penggunaan plastik sekali pakai masih menjadi aktivitas yang paling sering tercatat minggu ini. Coba gunakan tumbler dan tas belanja ulang pakai untuk mengurangi timbulan plastik harianmu.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-1">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Bawa wadah bekal sendiri di kantin fakultas</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Manfaatkan water refill station di koridor utama</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors">
            Mulai Aksi Ramah Plastik →
          </button>
        </div>

      </div>

      {/* MODAL POPUP (TAMPILAN BERSIH BERSIFAT VEED-STYLE) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-150">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {editingId ? 'Edit Catatan Aktivitas' : 'Catat Aktivitas Lingkungan Baru'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Pilih kategori atau unggah bukti pendukung aksi konsumsimu</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* VEED STYLE UPLOAD ZONE */}
              <div className="border-2 border-dashed border-slate-200 hover:border-[#007A5e] rounded-xl p-5 text-center bg-slate-50/50 transition-colors cursor-pointer group">
                <div className="w-10 h-10 bg-white shadow-xs rounded-full flex items-center justify-center mx-auto mb-2 border border-slate-200 group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5 text-[#007A5e]" />
                </div>
                <p className="text-xs font-semibold text-slate-700">Unggah Bukti Aksi (Foto / Resi / Dokumen)</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Klik untuk memilih file atau tarik file ke area ini</p>
              </div>

              {/* Input Fields Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Aktivitas / Konsumsi</label>
                  <input 
                    type="text"
                    required
                    placeholder="Misal: Membawa Tumbler Sendiri"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#007A5e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori Aktivitas</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none cursor-pointer"
                  >
                    <option value="Plastik">Plastik</option>
                    <option value="Mobilitas">Mobilitas</option>
                    <option value="Konsumsi">Konsumsi</option>
                    <option value="Paperless">Paperless</option>
                    <option value="Energi">Energi</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jumlah / Durasi</label>
                  <input 
                    type="text"
                    placeholder="Misal: 1 botol / 2 km"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#007A5e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Estimasi Reduksi CO₂</label>
                  <input 
                    type="text"
                    value={formData.impact}
                    onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                    className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-1 focus:ring-[#007A5e]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2 text-xs">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 rounded-xl bg-[#007A5e] hover:bg-[#00634c] text-white font-semibold shadow-xs"
                >
                  Simpan Aktivitas
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}