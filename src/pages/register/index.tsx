import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import bg from "../../assets/images/svg/bg.svg";
import Logo from "../../components/logo";
import { PiEyeSlash, PiEyeLight } from "react-icons/pi";
import { useAuth } from "../../hooks/auth/useAuth";

// yup schema for registration
const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase, one lowercase, one number and one special character"
    )
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ], "Passwords must match")
    .required("Confirm password is required"),
});


const Register: React.FC = () => {
  const {  registerAdminAsync, registerAdminIsLoading } = useAuth(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      await registerAdminAsync({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      // Errors are already handled by the useAuth hook via toast
      console.error("Registration error:", error);
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
            SpurtX! Admin Registration
          </h2>
          <p className="text-gray-500 mt-2 text-xs">
            Create a new admin account
          </p>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 items-start w-full">
              <label className="text-[#666666] text-[12px]">First Name</label>
              <input
                type="text"
                {...register("firstName")}
                className={`w-full h-10 border rounded-md focus:outline-none bg-[#F5F5F5] !pl-4 ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 items-start w-full">
              <label className="text-[#666666] text-[12px]">Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                className={`w-full h-10 border rounded-md focus:outline-none bg-[#F5F5F5] !pl-4 ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName.message}</p>
              )}
            </div>
          </div>

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

          <div className="flex flex-col items-start gap-2">
            <label className="text-[#666666] text-[12px]">
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className={`w-full h-10 border rounded-md focus:outline-none bg-[#F5F5F5] !pl-4 pr-10 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <PiEyeLight size={18} />
                ) : (
                  <PiEyeSlash size={18} />
                )}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full !bg-gradient-to-r from-primary to-secondary !text-white py-3 rounded-md mt-1 font-semibold cursor-pointer disabled:opacity-60"
            disabled={registerAdminIsLoading}
          >
            {registerAdminIsLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;