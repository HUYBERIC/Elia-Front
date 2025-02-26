import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const chartData = {
    labels: ["Tib", "Rico", "Tony", "Max", "Bart", "Jeff"],
    datasets: [
      {
        label: "Duty Hours",
        data: [-4, 8, -4, 24, -36, 12],
        backgroundColor: [
          "#4CAF50",
          "#FF9800",
          "#2196F3",
          "#F44336",
          "#9C27B0",
          "#FFC107",
        ],
        borderColor: [
          "#4CAF50",
          "#FF9800",
          "#2196F3",
          "#F44336",
          "#9C27B0",
          "#FFC107",
        ],
        borderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: "2025 User's Balance",
        font: {
          size: 18,
          family: "MontSerrat",
          weight: 600,
          color: "black",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 40,
        ticks: {
          stepSize: 5,
          font: {
            size: 14,
          },
        },
        grid: {
          color: (context) =>
            context.tick.value === 0 ? "#000" : "rgba(0, 0, 0, 0.1)",
          lineWidth: (context) => (context.tick.value === 0 ? 2 : 1),
        },
      },
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div>
      <Bar
        style={{ minHeight: "300px", maxWidth: "100vw" }}
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default BarChart;
