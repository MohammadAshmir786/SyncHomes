import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import ErrorBox from "../components/ErrorBox";

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    document.title = "Admin Login | SyncHomes";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", "SyncHomes Admin Portal - Login");
    }
  }, []);

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    setServerError("");

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000/api"
        }/admin/login`,
        data,
        { withCredentials: true } // Send/receive cookies
      );

      if (response.data.success) {
        // Login successful, redirect to dashboard
        navigate("/admin/dashboard");
      }
    } catch (error: unknown) {
      const errorMsg = (error as any)?.response?.data?.error || "Login failed";
      setServerError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              SyncHomes
            </h1>
            <p className="text-gray-600 text-sm">Admin Portal</p>
          </div>

          {/* Error Message */}
          {serverError && (
            <ErrorBox
              title="Login failed"
              message={serverError}
              className="mb-4"
            />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.email
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50 focus:border-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors focus:outline-none ${
                  errors.password
                    ? "border-red-300 bg-red-50"
                    : "border-gray-200 bg-gray-50 focus:border-blue-500"
                }`}
              />
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full py-3 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <Link
                to="/admin/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-xs">
              © 2025 SyncHomes. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
