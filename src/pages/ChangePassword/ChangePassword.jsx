import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft, KeyRound } from "lucide-react";
import { message } from "antd";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  // Watch new password to validate confirm password
  const newPassword = watch("newPassword");

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data) => {
    // Simulate API Call
    console.log("Password Change Data:", data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Reset and navigate back (optional)
    reset();
    message.success("Password changed successfully");
    navigate("/profile"); // Assuming your profile route is /profile
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#1A1A1A] rounded-2xl shadow-lg p-8 md:p-12">
        
        {/* Header Section */}
        <div className="mb-8">
          <Link 
            to="/profile" 
            className="inline-flex items-center text-gray-400 hover:text-[#4A8AFF] transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Profile
          </Link>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#2D2D2D] rounded-full border border-[#3D3D3D]">
              <KeyRound className="w-6 h-6 text-[#4A8AFF]" />
            </div>
            <h2 className="text-white text-2xl font-semibold">Change Password</h2>
          </div>
          <p className="text-gray-400 text-sm ml-1">
            Your new password must be different from previous used passwords.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Current Password */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Current Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4A8AFF] transition-colors" />
              <input
                type={showPassword.current ? "text" : "password"}
                placeholder="Enter current password"
                className={`w-full bg-[#2D2D2D] text-gray-300 placeholder-gray-500 pl-12 pr-12 py-4 rounded-xl border ${
                  errors.currentPassword ? "border-red-500" : "border-[#3D3D3D]"
                } focus:border-[#4A8AFF] focus:outline-none transition-all`}
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("current")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.currentPassword && (
              <p className="text-red-500 text-xs mt-2 ml-1">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              New Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4A8AFF] transition-colors" />
              <input
                type={showPassword.new ? "text" : "password"}
                placeholder="Enter new password"
                className={`w-full bg-[#2D2D2D] text-gray-300 placeholder-gray-500 pl-12 pr-12 py-4 rounded-xl border ${
                  errors.newPassword ? "border-red-500" : "border-[#3D3D3D]"
                } focus:border-[#4A8AFF] focus:outline-none transition-all`}
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("new")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword.new ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-2 ml-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-gray-300 text-sm font-medium mb-2 block">
              Confirm New Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#4A8AFF] transition-colors" />
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="Confirm new password"
                className={`w-full bg-[#2D2D2D] text-gray-300 placeholder-gray-500 pl-12 pr-12 py-4 rounded-xl border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#3D3D3D]"
                } focus:border-[#4A8AFF] focus:outline-none transition-all`}
                {...register("confirmPassword", {
                  required: "Please confirm your new password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("confirm")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-2 ml-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#4A8AFF] hover:bg-[#3A7AEF] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform active:scale-[0.98] flex items-center justify-center ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Password...
                </span>
              ) : (
                "Update Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}