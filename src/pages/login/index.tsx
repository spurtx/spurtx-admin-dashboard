

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bg from "../../assets/images/svg/bg.svg";
import Logo from "../../components/logo";
import { PiEyeSlash, PiEyeLight } from "react-icons/pi";
import { useAuth } from "../../hooks/auth/useAuth"

// yup schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const { signInAsync, signInIsLoading } = useAuth(); 
  const [showPassword, setShowPassword] = useState(false);
  

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
  try {
    const encodedData = {
      email: data.email,
      password: encodeURIComponent(data.password), // URL encode
    };
    console.log("Encoded payload:", encodedData); 
    await signInAsync(encodedData);
  } catch (err) {
    if (err instanceof Error) {
      console.error("Login failed:", err.message);
    } else if (typeof err === "object" && err !== null && "response" in err) {
      
      const e = err as { response?: { data?: any } };
      console.error("Login failed:", e.response?.data);
    } else {
      console.error("Login failed:", err);
    }
  }
};


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

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 items-start">
            <label className="text-[#666666] text-[12px]">Email address</label>
            <input
              type="email"
              {...register("email")}
              className={`w-full h-10 border rounded-md focus:outline-none bg-[#F5F5F5] !pl-4 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col items-start gap-2">
            <label className="text-[#666666] text-[12px]">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`w-full h-10 border rounded-md focus:outline-none bg-[#F5F5F5] !pl-4 pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
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
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full !bg-gradient-to-r from-primary to-secondary !text-white py-3 rounded-md mt-1 font-semibold cursor-pointer disabled:opacity-60"
            disabled={signInIsLoading}
          >
            {signInIsLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

