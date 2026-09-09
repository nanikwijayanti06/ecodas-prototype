import './Charts.css';

// bar horizontal: data = [{ nama, nilai }]
export default function BarChart({ data, suffix = '%' }) {
  return (
    <div className="barchart">
      {data.map((d) => (
        <div key={d.nama} className="barchart-row">
          <span className="barchart-label">{d.nama}</span>
          <div className="barchart-track">
            <div className="barchart-fill" style={{ width: `${d.nilai}%` }} />
          </div>
          <span className="barchart-value">
            {d.nilai}
            {suffix}
          </span>
        </div>
      ))}
    </div>
  );
}
