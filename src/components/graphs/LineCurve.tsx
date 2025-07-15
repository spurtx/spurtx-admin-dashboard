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

interface LineCurveProps {
  labels: string[];
  dataPoints: number[];
  gradientStart?: string;
  gradientEnd?: string;
  customYLabels?: number[]; // Allow different Y-axis labels
  showCustomLabels?: boolean; // Toggle custom Y-axis formatting
}

const LineCurve: React.FC<LineCurveProps> = ({
  labels,
  dataPoints,
  gradientStart = "rgba(0, 161, 93, 1)", // Default start color
  gradientEnd = "rgba(193, 100, 7, 1)", // Default end color
  customYLabels = [],
  showCustomLabels = false, // Determines whether to format the Y labels
}) => {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = chartRef.current;
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;

    if (!chartArea) return; // Ensure the chart area exists before applying styles

    // Gradient for the border
    const borderGradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
    borderGradient.addColorStop(0, gradientStart);
    borderGradient.addColorStop(1, gradientEnd);

    // Green fill gradient for the area under the curve
    const fillGradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    fillGradient.addColorStop(0, "rgba(0, 161, 93, 0.5)"); // Green at the top
    fillGradient.addColorStop(1, "rgba(0, 161, 93, 0)"); // Transparent at the bottom

    chart.data.datasets[0].borderColor = borderGradient;
    chart.data.datasets[0].backgroundColor = fillGradient;
    chart.update();
  }, [gradientStart, gradientEnd]);

  const data = {
    labels,
    datasets: [
      {
        data: dataPoints,
        borderWidth: 4,
        fill: true,
        tension: 0.5,
        pointRadius: 0,
        pointHoverRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false, // 🔥 disable datalabels
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: {
          callback: (value) => {
            if (typeof value === 'number') {
              if (showCustomLabels) {
                const formattedValue = customYLabels.includes(value)
                  ? `$${value / 1000}k`
                  : '';
                return formattedValue;
              }
              return value;
            }
            return value; // fallback
          },
        },
      },
    },
  };
  

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default LineCurve;

