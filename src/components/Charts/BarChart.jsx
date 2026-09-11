import React from "react";
import "./Charts.css";

export default function BarChart({
  data = [],
  title = "Bar Chart",
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

      <div className="bar-chart-container">
        {data.length === 0 ? (
          <div className="chart-empty">Belum ada data.</div>
        ) : (
          data.map((item, index) => {
            const value = Number(item[valueKey]) || 0;

            const height =
              value === 0 ? 3 : Math.max((value / maxValue) * 100, 8);

            return (
              <div
                className="bar-chart-item"
                key={`${item[labelKey]}-${index}`}
              >
                <span className="bar-chart-value">{value}</span>

                <div className="bar-chart-track">
                  <div
                    className="bar-chart-bar"
                    style={{
                      height: `${height}%`,
                    }}
                  />
                </div>

                <span className="bar-chart-label">{item[labelKey]}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
