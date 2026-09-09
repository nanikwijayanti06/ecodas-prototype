import { useNavigate } from 'react-router-dom';
import Card from '../../components/UI/Card';
import Button from '../../components/UI/Button';
import { useAuth } from '../../context/AuthContext';
import '../mahasiswa/mahasiswa.css';
import '../../styles/profil.css';

export default function Settings() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <h1 className="page-title">Pengaturan Profil</h1>
      <p className="page-subtitle">Kelola informasi akunmu.</p>

      <Card title="Informasi Akun" className="mt-16">
        <div className="profil-grid">
          <div>
            <p className="stat-label">Nama</p>
            <p className="profil-value">{role === 'admin' ? 'Admin Green Campus' : 'Amar Al Haq'}</p>
          </div>
          <div>
            <p className="stat-label">NIM</p>
            <p className="profil-value">23051430009</p>
          </div>
          <div>
            <p className="stat-label">Email</p>
            <p className="profil-value">amaral.2023@student.uny.ac.id</p>
          </div>
          <div>
            <p className="stat-label">Peran</p>
            <p className="profil-value">{role === 'admin' ? 'Admin' : 'Mahasiswa'}</p>
          </div>
        </div>
      </Card>

      <Card title="Ubah Password" className="mt-16">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Password lama</label>
            <input type="password" placeholder="********" />
          </div>
          <div className="form-group">
            <label>Password baru</label>
            <input type="password" placeholder="********" />
          </div>
          <Button type="submit">Simpan Password</Button>
        </form>
      </Card>

      <Card title="Sesi" className="mt-16">
        <p className="stat-note" style={{ marginBottom: 14 }}>
          Keluar dari akun ECODAS di perangkat ini.
        </p>
        <Button variant="outline" onClick={handleLogout}>Log out</Button>
      </Card>
    </div>
  );
}
