import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ value }: { value: string }) => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        data: [20, 25, 15, 30, 10],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#9C27B0",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "40%", // Creates the center circle
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false, 
      },
    },
  };

  return (
    <div className="relative w-35 h-43 flex items-center justify-center">
      <Doughnut data={data} options={options} />
      <div className="absolute text-[15px] text-gray-600 font-semibold">${value}.k</div>
    </div>
  );
};

export default PieChart;
