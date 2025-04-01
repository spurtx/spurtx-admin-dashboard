import React, { useState } from "react";
import bg from "../../assets/images/svg/bg.svg";
import Logo from "../../components/logo";
import { PiEyeSlash, PiEyeLight } from "react-icons/pi";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="flex flex-col items-center">
          <Logo />
          <h2 className="text-2xl font-semibold text-[14px]">
            SpurtX! Admin Login
          </h2>
          <p className="text-gray-500 mt-2 text-xs">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form className="mt-6 space-y-5">
          <div className="flex flex-col gap-2 items-start">
            <label className="text-[#666666] text-[12px]">Email address</label>
            <input
              type="email"
              className="w-full h-10 border-gray-300 rounded-md focus:outline-none bg-[#F5F5F5] pl-4"
            />
          </div>
          <div className="flex flex-col items-start gap-2">
            <label className="text-[#666666] text-[12px]">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full h-10 rounded-md focus:outline-none bg-[#F5F5F5] pl-4 pr-10"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <PiEyeLight size={18} />
                ) : (
                  <PiEyeSlash size={18} />
                )}
              </div>
            </div>
          </div>
          <button className="w-full bg-gradient-to-r from-[#00A15D] to-[#C16407] text-white py-3 rounded-md mt-1 font-semibold">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
