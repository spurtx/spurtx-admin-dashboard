
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
  barColor = "#3182CE", 
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
      datalabels: {
        display: false, // Disables data labels
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false, // Correct way to remove axis border
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true, //Removes horizontal grid lines
        },
        border: {
          display: false, //Correct way to remove axis border
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default StatusBar;
