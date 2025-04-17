
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type ReusableBarChartProps = {
  labels: string[];
  data: number[];
  barColor?: string;
  label?: string;
};

const StatusBar: React.FC<ReusableBarChartProps> = ({
  labels,
  data,
  barColor = "#3182CE", // default blue
  label = "Data",
}) => {
  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: barColor,
        borderRadius: 6,
        barPercentage: 0.6,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          // ✅ `as any` to avoid drawBorder TS error
          drawBorder: false,
        } as any,
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: true,
        } as any,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StatusBar;
