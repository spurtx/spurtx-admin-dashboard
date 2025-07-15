import ProductTable from './ProductTable';
import GradientButton from '../../ui/GradientButton';
import { IoSearchOutline } from "react-icons/io5";
import { MdSort } from "react-icons/md";

const ProductUsers = () => {
  return (
    <div className="w-full bg-white p-3 border border-gray-300 rounded-md mt-3">
        <div className="my-4">
        <GradientButton
            selectOptions={["Sync!", "Score!", "Spur!", "Spark!", "Spot!"]}
            initialSelected="Score!"
            className="w-25"
          />
        </div>
        <div className="flex justify-between mb-4">
            <div className='flex items-center gap-3 border border-gray-400 rounded-[5px] w-[350px] py-1 px-4'>
            <IoSearchOutline className="text-gray-400 mt-1"/>
                <input placeholder="search" className="text-gray-600 outline-none focus:ring-0 focus:outline-none bg-transparent w-full"/>
            </div>
            <button className="flex gap-2 border items-center px-3 border-gray-300 text-gray-400 rounded-[3px]"><MdSort className=""/>Sort Table</button>
        </div>
        <ProductTable />
    </div>
  )
}

export default ProductUsers;