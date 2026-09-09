import "./ProgressBar.css";

export default function ProgressBar({ value, max = 100, label }) {
  const percent = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className="progress-wrapper">
      {label && <span className="progress-label">{label}</span>}
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <span className="progress-value">{percent}%</span>
    </div>
  );
}
