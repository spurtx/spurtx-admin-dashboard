import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

interface BarChartProps {
  data: number[]; // Expecting an array of numbers
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        label: 'Sales',
        data: data,
        backgroundColor: '#00A15D',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        type: 'linear', // Explicitly setting the scale type
        ticks: {
          callback: function (value: any) {
            return [100000, 200000, 300000, 400000].includes(Number(value))
              ? `${Number(value) / 1000}k`
              : '';
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
