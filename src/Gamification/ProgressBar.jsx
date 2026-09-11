import React from "react";
import "../components/Charts/Charts.css";

export default function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
}) {
  const numericValue = Number(value) || 0;
  const numericMax = Number(max) || 100;

  const percentage = Math.min(
    Math.max((numericValue / numericMax) * 100, 0),
    100,
  );

  return (
    <div className="progress-bar-component">
      {(label || showValue) && (
        <div className="progress-bar-header">
          {label && <span className="progress-bar-label">{label}</span>}

          {showValue && (
            <span className="progress-bar-value">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}

      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}
