import React from "react";
import Logo from "../components/logo";
import { BiQuestionMark } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import Dots from "../components/logo/Dots";

const Navbar: React.FC = () => {
  return (
    <div className="w-full flex justify-between items-center bg-white px-5 py-4">
      <div className="flex gap-4 items-center">
        <Dots />
        <Logo />
        <p>
          <span className="font-semibold">Welcome,</span><span className="text-gray-400 text-[12px]">Admin</span>
        </p>
      </div>

      <div className="flex gap-4 items-center">
        <div>
          <BiQuestionMark />
        </div>
        <div>
          <IoSettingsOutline />
        </div>
        <div className="h-7 w-7 rounded-full bg-green-500"></div>
      </div>
    </div>
  );
};

export default Navbar;
