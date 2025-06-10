import { useMutation } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useApiClient } from "../useApiClient";
import authService from "../../services/auth/auth";
// import { Service } from "../../types/api"; // assuming your service types are defined here

export const useAuth = () => {
  const api = useApiClient();
  const Service = authService({ api });
  const toast = useToast();
  const navigate = useNavigate();

  const showToast = (
    title: string,
    description: string,
    status: "success" | "error"
  ) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  // --- Sign In ---
  const signInMutation = useMutation({
    mutationFn: Service.signin,
    onSuccess: (data) => {
      const token = data.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard");
        showToast("Signed in", "You have successfully logged in.", "success");
      }
    },
    onError: (error: Error) => {
      showToast("Sign in failed", error.message, "error");
    },
  });

  // --- Register Admin ---
  const registerAdminMutation = useMutation({
    mutationFn: Service.registerAdmin,
    onSuccess: () => {
      showToast("Admin Registered", "You can now log in.", "success");
      navigate("/login");
    },
    onError: (error: Error) => {
      showToast("Registration failed", error.message, "error");
    },
  });

  // --- Verify Email ---
  const verifyEmailMutation = useMutation({
    mutationFn: Service.verifyEmail,
    onSuccess: () => {
      showToast("Email Verified", "Welcome!", "success");
      navigate("/dashboard");
    },
    onError: (error: Error) => {
      showToast("Verification failed", error.message, "error");
    },
  });

  // --- Update Password ---
  const updatePasswordMutation = useMutation({
    mutationFn: Service.updatePassword,
    onSuccess: () => {
      showToast("Password Updated", "Your password was changed.", "success");
    },
    onError: (error: Error) => {
      showToast("Update failed", error.message, "error");
    },
  });

  // --- Reset Password ---
  const resetPasswordMutation = useMutation({
    mutationFn: Service.resetPassword,
    onSuccess: () => {
      showToast("Password Reset", "You may now log in.", "success");
      navigate("/login");
    },
    onError: (error: Error) => {
      showToast("Reset failed", error.message, "error");
    },
  });

  // --- Forgot Password ---
  const forgotPasswordMutation = useMutation({
    mutationFn: Service.forgotPassword,
    onSuccess: () => {
      showToast(
        "Reset Link Sent",
        "Check your email for the reset link.",
        "success"
      );
    },
    onError: (error: Error) => {
      showToast("Request failed", error.message, "error");
    },
  });

  // --- Verification Code ---
  const verificationCodeMutation = useMutation({
    mutationFn: Service.verificationCode,
    onSuccess: () => {
      showToast("Code Sent", "Check your inbox.", "success");
    },
    onError: (error: Error) => {
      showToast("Failed to send code", error.message, "error");
    },
  });

  // --- Logout (not a mutation) ---
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    showToast("Logged out", "You have been signed out.", "success");
  };

  return {
    // Mutations
    signIn: signInMutation.mutate,
    signInAsync: signInMutation.mutateAsync,
    signInIsLoading: signInMutation.isPending,

    registerAdmin: registerAdminMutation.mutate,
    registerAdminAsync: registerAdminMutation.mutateAsync,
    registerAdminIsLoading: registerAdminMutation.isPending,

    verifyEmail: verifyEmailMutation.mutate,
    verifyEmailAsync: verifyEmailMutation.mutateAsync,
    verifyEmailIsLoading: verifyEmailMutation.isPending,

    updatePassword: updatePasswordMutation.mutate,
    updatePasswordAsync: updatePasswordMutation.mutateAsync,
    updatePasswordIsLoading: updatePasswordMutation.isPending,

    resetPassword: resetPasswordMutation.mutate,
    resetPasswordAsync: resetPasswordMutation.mutateAsync,
    resetPasswordIsLoading: resetPasswordMutation.isPending,

    forgotPassword: forgotPasswordMutation.mutate,
    forgotPasswordAsync: forgotPasswordMutation.mutateAsync,
    forgotPasswordIsLoading: forgotPasswordMutation.isPending,

    verificationCode: verificationCodeMutation.mutate,
    verificationCodeAsync: verificationCodeMutation.mutateAsync,
    verificationCodeIsLoading: verificationCodeMutation.isPending,

    // Other
    logout,
  };
};
