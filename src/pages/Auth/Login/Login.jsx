import { useForm } from "react-hook-form"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // Watch the rememberMe checkbox value
  const rememberMe = watch("rememberMe")

  const onSubmit = (data) => {
    console.log("[v0] Form submitted:", data)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#2A2A2A] rounded-3xl p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-5xl font-bold mb-3">Welcome Back !</h1>
          <p className="text-white text-sm">Please enter your email and password to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-white text-sm font-medium mb-3">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="rayhan@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full bg-[#3A3A3A] text-white placeholder-gray-500 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#4A8AFF] transition-all"
            />
            {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-white text-sm font-medium mb-3">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="**********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full bg-[#3A3A3A] text-white placeholder-gray-500 rounded-xl px-5 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#4A8AFF] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-2">{errors.password.message}</p>}
          </div>

          {/* Remember Me and Forgot Password - FIXED */}
          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer group">
              {/* Hidden Checkbox Input */}
              <input 
                type="checkbox" 
                {...register("rememberMe")} 
                className="sr-only" 
              />
              
              {/* Custom Checkbox Visual */}
              <div
                className={`
                  w-5 h-5 rounded border-2 transition-all duration-200 
                  flex items-center justify-center flex-shrink-0
                  ${rememberMe 
                    ? "bg-[#4A8AFF] border-[#4A8AFF]" 
                    : "bg-transparent border-[#4A8AFF] group-hover:border-[#6BA1FF]"
                  }
                `}
              >
                {/* Checkmark Icon - Only visible when checked */}
                <svg
                  className={`
                    w-3 h-3 text-white transition-all duration-200
                    ${rememberMe ? "opacity-100 scale-100" : "opacity-0 scale-50"}
                  `}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              
              <span className="ml-3 text-[#4A8AFF] text-sm font-medium select-none group-hover:text-[#6BA1FF] transition-colors">
                Remember Me
              </span>
            </label>

            <Link 
              to="/forgetPass" 
              className="text-[#EF4444] text-sm font-medium hover:text-[#DC2626] transition-colors"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#4A8AFF] text-white font-semibold text-lg py-4 rounded-xl hover:bg-[#3A7AEF] transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-8"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}