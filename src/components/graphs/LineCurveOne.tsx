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
  labels: string[];
  dataPoints: number[];
  gradientStart?: string;
  gradientEnd?: string;
}

const LineCurveOne: React.FC<LineCurveOneProps> = ({
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
        display: false, 
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: {
          callback: (value: string | number) => `$${Number(value) / 1000}k`, 
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

export default LineCurveOne;