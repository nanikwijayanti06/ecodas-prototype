import React from "react";
import "./Charts.css";

export default function LineChart({
  data = [],
  title = "Line Chart",
  valueKey = "value",
  labelKey = "label",
}) {
  const values = data.map((item) => Number(item[valueKey]) || 0);

  const maxValue = Math.max(...values, 1);

  return (
    <div className="chart-component">
      {title && (
        <div className="chart-component-header">
          <h3>{title}</h3>
        </div>
      )}

      <div className="line-chart-container">
        {data.length === 0 ? (
          <div className="chart-empty">Belum ada data.</div>
        ) : (
          <>
            <div className="line-chart-grid">
              <div className="grid-line" />
              <div className="grid-line" />
              <div className="grid-line" />
              <div className="grid-line" />
            </div>

            <div className="line-chart-points">
              {data.map((item, index) => {
                const value = Number(item[valueKey]) || 0;

                const bottom = value === 0 ? 0 : (value / maxValue) * 100;

                return (
                  <div
                    className="line-chart-point-wrapper"
                    key={`${item[labelKey]}-${index}`}
                  >
                    <div
                      className="line-chart-point"
                      style={{
                        bottom: `${bottom}%`,
                      }}
                      title={`${item[labelKey]}: ${value}`}
                    />

                    <span className="line-chart-label">{item[labelKey]}</span>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
