import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  ChartOptions,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

interface LineCurveOneProps {
  labels: string[]; // X-axis labels
  dataPoints: number[]; // Corresponding Y-axis values
  gradientStart?: string;
  gradientEnd?: string;
}

const LineCurveRef: React.FC<LineCurveOneProps> = ({
  labels,
  dataPoints,
  gradientStart = "rgba(0, 161, 93, 1)", // Default start color
  gradientEnd = "rgba(193, 100, 7, 1)", // Default end color
}) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, chart.width, 0);
      gradient.addColorStop(0, gradientStart);
      gradient.addColorStop(1, gradientEnd);

      chart.data.datasets[0].borderColor = gradient;
      chart.update();
    }
  }, [gradientStart, gradientEnd]);

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        borderWidth: 4,
        fill: false,
        tension: 0.4, // Curved line
        pointRadius: 0, // Small visible points on the curve
        pointHoverRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
            drawOnChartArea: false, // Remove grid lines
          },
          border: {
            display: false, // Hide the axis border
          },
          
        ticks: {
          autoSkip: true,
          maxTicksLimit: 3, // Show only three main labels
          callback: (index: any) => {
            const monthLabels = ["Jul", "Aug", "Sep"];
            return index % 2 === 0 ? monthLabels[index / 2] : ""; // Only show full month names
          },
        },
      },
      y: {
        display: false, // Hide Y-axis
      },
    },
    plugins: {
      tooltip: {
        enabled: true, // Show hover tooltips
      },
      datalabels: {
        display: false, 
      },
    },
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default LineCurveRef;
