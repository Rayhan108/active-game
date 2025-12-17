import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";


export default function ForgetPass() {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = (data) => {
    console.log("[v0] Form submitted:", data)
    // Handle login logic here
    navigate('/otp')
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#2A2A2A] rounded-3xl p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-5xl font-bold mb-3">Forgot Password</h1>
          <p className="text-white text-sm">Please enter your Email to reset your password.</p>
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

     

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#4A8AFF] text-white font-semibold text-lg py-4 rounded-xl hover:bg-[#3A7AEF] transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-8"
          >
       Send Code
          </button>
        </form>
      </div>
    </div>
  )
}
