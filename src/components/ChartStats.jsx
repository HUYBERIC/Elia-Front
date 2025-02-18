import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const ChartStats = () => {
  const doughnutData = {
    labels: ["Bart", "Rico", "Jousè", "Clothaire", "Selçuk", "Claude"],
    datasets: [
      {
        data: [8, 10, 12, 6, 14, 4], // Mock duty hours
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#F44336", "#9C27B0", "#FFC107"],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Duty Hours Comparison</h3>
      <Doughnut data={doughnutData} />
    </div>
  );
};

export default ChartStats;
