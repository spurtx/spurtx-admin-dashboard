// installed chartjs-plugin-datalabels -- for reference

import  { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  ChartOptions,
  ChartData,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, ChartDataLabels);

const GeoBarChart = () => {
  const chartRef = useRef<any>(null);

  const labels = ["Nig", "Gha", "Mal", "Cam", "Civ", "Tog", "Alg"];
  const values = [23400, 15000, 30000, 22000, 10000, 23400, 22000];

  // Add gradient to each bar dynamically
  const getGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    gradient.addColorStop(0, "#00A15D");
    gradient.addColorStop(1, "#C16407");
    return gradient;
  };

  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return "#00A15D"; // fallback
          return getGradient(ctx, chartArea);
        },
        borderRadius: 10,
        barThickness: 10,
        categoryPercentage: 0.1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "#000",
        formatter: (value: number) => value.toLocaleString(),
        font: {
          weight: "normal",
          size: 12,
        },
      },
    },
    scales: {
        x: {
          ticks: { display: false },
          grid: { display: false },
          border: { display: false }, //hide bottom axis border
        },
        y: {
          ticks: {
            color: "#000",
            font: { size: 12 },
          },
          grid: { display: false },
          border: { display: false }, // ide left axis border
        },
      }
  };

  return (
    <div style={{ width: "100%", maxWidth: "700px" , }}>
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default GeoBarChart;
