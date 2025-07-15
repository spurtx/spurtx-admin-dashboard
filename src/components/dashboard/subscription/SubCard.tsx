const SubCard = ({
  totalCost,
  productName,
}: {
  totalCost: string;
  productName: string;
}) => {
  return (
    <div className="bg-gradient-to-r from-[#00A15D] to-[#C16407] w-full rounded-md p-[1.5px]">
      <div className="bg-[#EEFFF8] rounded-md py-1 pl-2">
        <p className="bg-gradient-to-r text-transparent from-[#00A15D] to-[#C16407] bg-clip-text font-semibold">
          ${totalCost}.00
        </p>
        <p className="bg-gradient-to-r text-transparent from-[#00A15D] to-[#C16407] bg-clip-text">
          {productName}
        </p>
      </div>
    </div>
  );
};

export default SubCard;
