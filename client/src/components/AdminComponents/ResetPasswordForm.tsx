import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API } from "../Constants";
import ErrorBox from "../ErrorBox";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const isForgotPassword = location.pathname.includes("forgot-password");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = (): boolean => {
    if (!form.oldPassword.trim()) {
      setError("Current password is required");
      return false;
    }

    if (!form.newPassword.trim()) {
      setError("New password is required");
      return false;
    }

    if (!form.confirmPassword.trim()) {
      setError("Password confirmation is required");
      return false;
    }

    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (form.oldPassword === form.newPassword) {
      setError("New password must be different from current password");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${API}/admin/reset-password`,
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        },
        { withCredentials: true }
      );

      setSuccess(response.data.message || "Password reset successfully!");

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        if (isForgotPassword) {
          navigate("/admin/login");
        } else {
          navigate("/admin/dashboard");
        }
      }, 2000);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to reset password. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
    setSuccess("");

    if (isForgotPassword) {
      navigate("/admin/login");
    } else {
      navigate(-1);
    }
  };
  // Full page version
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Reset Password
            </h1>
            <p className="text-gray-600 text-sm">
              {isForgotPassword
                ? "Create a new password for your admin account"
                : "Update your password to keep your account secure"}
            </p>
          </div>

          {/* Error */}
          {error && <ErrorBox title="Error" message={error} className="mb-4" />}

          {/* Success */}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm font-semibold">{success}</p>
              <p className="text-green-600 text-xs mt-1">Redirecting...</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.old ? "text" : "password"}
                  name="oldPassword"
                  value={form.oldPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({ ...prev, old: !prev.old }))
                  }
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword.old ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                  }
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword.new ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  disabled={loading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 disabled:bg-gray-100 transition-colors"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword.confirm ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Password Strength Indicator */}
            {form.newPassword && (
              <div className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <p className="font-semibold mb-2 text-gray-700">
                  Password requirements:
                </p>
                <ul className="space-y-1">
                  <li
                    className={
                      form.newPassword.length >= 6
                        ? "text-green-600 font-medium"
                        : "text-red-600"
                    }
                  >
                    {form.newPassword.length >= 6 ? "✓" : "✗"} At least 6
                    characters
                  </li>
                  <li
                    className={
                      form.newPassword !== form.oldPassword
                        ? "text-green-600 font-medium"
                        : "text-red-600"
                    }
                  >
                    {form.newPassword !== form.oldPassword ? "✓" : "✗"}{" "}
                    Different from current password
                  </li>
                  <li
                    className={
                      form.newPassword === form.confirmPassword &&
                      form.confirmPassword
                        ? "text-green-600 font-medium"
                        : "text-red-600"
                    }
                  >
                    {form.newPassword === form.confirmPassword &&
                    form.confirmPassword
                      ? "✓"
                      : "✗"}{" "}
                    Passwords match
                  </li>
                </ul>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>

            {/* Back to Login */}
            <button
              type="button"
              onClick={handleCancel}
              className="w-full py-2 text-gray-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isForgotPassword ? "Back to Login" : "Cancel"}
            </button>
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
