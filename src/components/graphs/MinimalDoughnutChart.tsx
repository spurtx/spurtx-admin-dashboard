import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Register only what's needed
ChartJS.register(ArcElement);

type MinimalDoughnutChartProps = {
  data: number[];         // e.g. [70, 30]
  colors?: string[];      // e.g. ['#3182CE', '#E2E8F0']
};

const MinimalDoughnutChart: React.FC<MinimalDoughnutChartProps> = ({
  data,
  colors = ["#3182CE", "#E2E8F0"], // default blue + gray
}) => {
  const chartData: ChartData<"doughnut"> = {
    labels: [], // no labels
    datasets: [
      {
        data,
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 0, 
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    cutout: "70%", // Thickness of the ring
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default MinimalDoughnutChart;
