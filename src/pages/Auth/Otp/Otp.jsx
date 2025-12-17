import React, { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";

// Constants
const OTP_LENGTH = 5;
const RESEND_TIMER_SECONDS = 30;

export default function OtpVerification() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email from navigation state or use default
  const email = location.state?.email || "user@example.com";

  // State Management
  const [timer, setTimer] = useState(RESEND_TIMER_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [otpValues, setOtpValues] = useState(Array(OTP_LENGTH).fill(""));

  // Refs for input focus control
  const inputRefs = useRef([]);

  const {
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  // Timer Countdown Effect
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Auto-focus first input on mount
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Update form value when OTP changes
  const updateFormValue = useCallback(
    (newOtp) => {
      const combinedOtp = newOtp.join("");
      setValue("otp", combinedOtp);
      if (combinedOtp.length === OTP_LENGTH) {
        clearErrors("otp");
      }
    },
    [setValue, clearErrors]
  );

  // Handle input changes
  const handleChange = (index, value) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otpValues];
    newOtp[index] = value.slice(-1);
    setOtpValues(newOtp);
    updateFormValue(newOtp);

    // Auto-focus next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (index, e) => {
    switch (e.key) {
      case "Backspace":
        if (!otpValues[index] && index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowLeft":
        if (index > 0) {
          e.preventDefault();
          inputRefs.current[index - 1]?.focus();
        }
        break;
      case "ArrowRight":
        if (index < OTP_LENGTH - 1) {
          e.preventDefault();
          inputRefs.current[index + 1]?.focus();
        }
        break;
      case "Enter":
        e.preventDefault();
        if (otpValues.join("").length === OTP_LENGTH) {
          handleSubmit(onSubmit)();
        }
        break;
      default:
        break;
    }
  };

  // Handle paste functionality
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (pastedData.length > 0) {
      const newOtp = Array(OTP_LENGTH).fill("");
      pastedData.split("").forEach((char, index) => {
        if (index < OTP_LENGTH) {
          newOtp[index] = char;
        }
      });
      setOtpValues(newOtp);
      updateFormValue(newOtp);

      const focusIndex = Math.min(pastedData.length, OTP_LENGTH - 1);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  // Reset OTP inputs
  const resetOtpInputs = useCallback(() => {
    setOtpValues(Array(OTP_LENGTH).fill(""));
    setValue("otp", "");
    clearErrors("otp");
    inputRefs.current[0]?.focus();
  }, [setValue, clearErrors]);

  // Handle resend OTP
  const handleResend = async () => {
    setIsResending(true);

    try {
      // Simulate API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTimer(RESEND_TIMER_SECONDS);
      setCanResend(false);
      resetOtpInputs();

      // Show success feedback (you can add a toast notification here)
      console.log("OTP resent successfully");
    } catch (error) {
      console.error("Failed to resend OTP:", error);
      setError("otp", {
        type: "manual",
        message: "Failed to resend OTP. Please try again.",
      });
    } finally {
      setIsResending(false);
    }
  };

  // Form submission handler
  const onSubmit = async (data) => {
    if (data.otp.length < OTP_LENGTH) {
      setError("otp", {
        type: "manual",
        message: `Please enter a valid ${OTP_LENGTH}-digit code`,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API verification - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("OTP Verified:", data.otp);
      navigate("/resetPass", { state: { email, verified: true } });
    } catch (error) {
      console.error("Verification failed:", error);
      setError("otp", {
        type: "manual",
        message: "Invalid OTP. Please try again.",
      });
      resetOtpInputs();
    } finally {
      setIsLoading(false);
    }
  };

  // Format timer display
  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0
      ? `${mins}:${secs.toString().padStart(2, "0")}`
      : `${secs}s`;
  };

  // Mask email for privacy
  const maskEmail = (email) => {
    const [username, domain] = email.split("@");
    if (!domain) return email;
    const maskedUsername =
      username.length <= 3
        ? `${username[0]}***`
        : `${username.slice(0, 3)}***`;
    return `${maskedUsername}@${domain}`;
  };

  // Check if OTP is complete
  const isOtpComplete = otpValues.join("").length === OTP_LENGTH;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-[#1A1A1A] border border-gray-800 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
            aria-label="Go back"
          >
            <svg
              className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Header Section */}
          <div className="text-center mb-8">
            {/* Email Icon */}
            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            <h1 className="text-white text-3xl md:text-4xl font-bold mb-3 tracking-tight">
              Verify OTP
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Enter the {OTP_LENGTH}-digit code sent to
              <br />
              <span className="text-white font-medium mt-1 inline-block">
                {maskEmail(email)}
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP Input Group */}
            <div
              className="flex justify-center gap-2 sm:gap-3"
              role="group"
              aria-label="OTP verification code"
            >
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  onFocus={(e) => e.target.select()}
                  disabled={isLoading}
                  aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
                  aria-invalid={!!errors.otp}
                  className={`
                    w-12 h-14 sm:w-14 sm:h-16 
                    bg-[#2A2A2A] text-white text-xl sm:text-2xl font-bold text-center 
                    rounded-xl border-2 transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-blue-500/30
                    disabled:opacity-50 disabled:cursor-not-allowed
                    placeholder:text-gray-600
                    ${
                      errors.otp
                        ? "border-red-500/70 focus:border-red-500"
                        : value
                        ? "border-blue-500/70 bg-blue-500/5"
                        : "border-gray-700 hover:border-gray-600 focus:border-blue-500"
                    }
                  `}
                />
              ))}
            </div>

            {/* Error Message */}
            {errors.otp && (
              <div
                className="flex items-center justify-center gap-2 text-red-400 animate-shake"
                role="alert"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm font-medium">{errors.otp.message}</p>
              </div>
            )}

            {/* Timer / Resend Section */}
            <div className="text-center py-2">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-500/10"
                >
                  {isResending ? (
                    <>
                      <LoadingSpinner className="w-4 h-4" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      <span>Resend Code</span>
                    </>
                  )}
                </button>
              ) : (
                <p className="text-gray-500 text-sm">
                  Resend code in{" "}
                  <span className="text-white font-semibold tabular-nums bg-gray-800 px-2 py-0.5 rounded">
                    {formatTimer(timer)}
                  </span>
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || !isOtpComplete}
              className={`
                w-full font-semibold text-lg py-4 rounded-xl 
                transition-all duration-200 
                flex items-center justify-center gap-2
                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-[#1A1A1A]
                ${
                  isLoading || !isOtpComplete
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] shadow-lg shadow-blue-500/25"
                }
              `}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner className="w-5 h-5" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify Code</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

     
        </div>

        {/* Security Footer */}
        <div className="flex items-center justify-center gap-2 mt-6 text-gray-600">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs">Protected by end-to-end encryption</p>
        </div>
      </div>
    </div>
  );
}

// Loading Spinner Component
function LoadingSpinner({ className = "w-5 h-5" }) {
  return (
    <svg className={`animate-spin ${className}`} fill="none" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}