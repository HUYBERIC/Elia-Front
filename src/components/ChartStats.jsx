import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const ChartStats = () => {
  const doughnutData = {
    labels: ["Tib", "Rico", "Tony", "Max", "Bart", "Jeff"],
    datasets: [
      {
        data: [8, 10, 12, 6, 14, 4],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#F44336", "#9C27B0", "#FFC107"],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3>Current Shift Hours Comparison</h3>
      <Doughnut data={doughnutData} />
    </div>
  );
};

export default ChartStats;
