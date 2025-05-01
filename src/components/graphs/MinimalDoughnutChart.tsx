import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; 
import { Doughnut } from "react-chartjs-2";


ChartJS.register(ArcElement, ChartDataLabels); 


ChartJS.register(ArcElement);

type MinimalDoughnutChartProps = {
  data: number[];         
  colors?: string[];      
};

const MinimalDoughnutChart: React.FC<MinimalDoughnutChartProps> = ({
  data,
  colors = ["#3182CE", "#E2E8F0"],
}) => {
  const chartData: ChartData<"doughnut"> = {
    labels: [], 
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
    cutout: "70%", 
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        display: false, 
      },
    },
  };
  

  return <Doughnut data={chartData} options={options} />;
};

export default MinimalDoughnutChart;
