import './Charts.css';

// chart garis sederhana pakai svg murni, data = array angka, labels = array teks
export default function LineChart({ data, labels, height = 220 }) {
  const max = Math.max(...data) * 1.1 || 1;
  const w = 560;
  const h = height;
  const padX = 34;
  const padY = 26;
  const stepX = (w - padX * 2) / (data.length - 1 || 1);

  const points = data.map((v, i) => ({
    x: padX + i * stepX,
    y: h - padY - (v / max) * (h - padY * 2),
  }));

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="chart-svg" role="img">
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={padX}
          x2={w - padX}
          y1={h - padY - t * (h - padY * 2)}
          y2={h - padY - t * (h - padY * 2)}
          stroke="#e2e8f0"
        />
      ))}
      <path d={path} fill="none" stroke="#059669" strokeWidth="2.5" />
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="#fff" stroke="#059669" strokeWidth="2" />
          <text x={p.x} y={h - 8} textAnchor="middle" fontSize="11" fill="#64748b">
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
