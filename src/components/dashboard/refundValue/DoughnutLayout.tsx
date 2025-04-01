import DonutChart from "../../graphs/DonutChart";

interface DoughnutLayoutProps {
  productName: string;
  value: number;
  priceValue: string;
  backgroundColor: string[];
}

const DoughnutLayout = ({
  productName,
  value,
  priceValue,
  backgroundColor,
}: DoughnutLayoutProps) => {
  return (
    <div className="space-y-[15px]">
      <h2 className="text-center bg-gradient-to-r text-transparent text-sm from-[#00A15D] to-[#C16407] bg-clip-text">
        {productName}
      </h2>
      <div className="lg:w-12 xl:w-15 h-17">
        <DonutChart value={value} backgroundColor={backgroundColor} />
      </div>
      <p className="text-center text-[11px] font-semibold mt-1">
        ${priceValue}k
      </p>
    </div>
  );
};

export default DoughnutLayout;
