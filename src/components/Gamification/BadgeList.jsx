import './BadgeList.css';

export default function BadgeList({ badges }) {
  return (
    <div className="badge-grid">
      {badges.map((b) => (
        <div key={b.nama} className={`badge-item ${b.didapat ? '' : 'badge-locked'}`}>
          <div className="badge-icon">&#127942;</div>
          <div className="badge-nama">{b.nama}</div>
          <div className="badge-deskripsi">{b.deskripsi}</div>
        </div>
      ))}
    </div>
  );
}
