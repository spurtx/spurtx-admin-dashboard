import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Title, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // 👈

ChartJS.register(ArcElement, Legend, Title, Tooltip, ChartDataLabels); // 👈

interface DonutChartProps {
  value: number;
  backgroundColor: Array<string>;
  cutout?: string;
  radius?: number;
}

const DonutChart = ({
  value,
  backgroundColor,
  cutout,
  radius,
}: DonutChartProps) => {
  const data = {
    labels: [],
    datasets: [
      {
        data: [value, 100 - value],
        backgroundColor: backgroundColor,
        borderWidth: 0,
        cutout: cutout ? cutout : "70%",
        borderRadius: radius ? radius : 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false, // 👈 correct placement
      },
    },
  };

  const textCenter = {
    id: "textCenter",
    beforeDatasetsDraw(chart: any, _args: any, _pluginOptions: any) {
      const { ctx, data } = chart;

      ctx.save();
      ctx.font = "11px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        `${data.datasets[0].data[0]}%`,
        chart.getDatasetMeta(0).data[0].x,
        chart.getDatasetMeta(0).data[0].y
      );
      ctx.restore();
    },
  };

  return <Doughnut data={data} options={options} plugins={[textCenter]} />;
};

export default DonutChart;
