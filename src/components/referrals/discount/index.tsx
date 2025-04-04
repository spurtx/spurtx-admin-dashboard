import { MdKeyboardArrowDown } from "react-icons/md";
import DiscountTable from "./DiscountTable";

const Discount = () => {
  return (
    <div className="w-full bg-white p-3 border border-gray-300 rounded-md mt-3">
        <div className="flex justify-between items-center bg-white rounded-[2px] px-3 py-2 border border-gray-300 my-2">
            <p className="text-[#999999] text-[11px]">Add to referrer list</p>
            <p className="text-[#000000] text-[12px]">Referral Discount</p>
            <div className="flex gap-3 items-center">
            <MdKeyboardArrowDown className="text-[20px]"/>
            <button className="bg-[#DCDCDC] text-[#6E6E6E] py-1 px-2 rounded-[2px] text-[14px]">Submit</button>
            </div>
        </div>
        <DiscountTable />

    </div>
  )
}

export default Discount;