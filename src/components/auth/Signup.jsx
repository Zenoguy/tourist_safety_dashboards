import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../admin_dashboard/Icon.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      await mockSignup(formData);
      
      // Redirect to tourist dashboard after successful signup
      navigate("/tourist_dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function - replace with actual API call
  const mockSignup = async (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (userData.email && userData.password) {
          resolve({ success: true, user: userData });
        } else {
          reject(new Error("Signup failed"));
        }
      }, 1000);
    });
  };

  const handleGoogleSignup = () => {
    // TODO: Implement Google OAuth
    console.log("Google OAuth signup - Backend integration needed");
    alert("Google OAuth integration will be implemented with backend");
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-600">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-emerald-500/20 p-3 rounded-lg inline-block mb-4">
              <Icon name="MapPin" size={32} className="text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Join SmartTourist</h1>
            <p className="text-slate-300">Create your tourist account</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Create a password (min. 6 characters)"
                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
                required
                minLength={6}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <Icon name="User" size={18} />
                  Create Account
                </>
              )}
            </button>

            {/* Google OAuth */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-slate-400">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-3 bg-white text-slate-900 hover:bg-gray-100 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-lg">🔍</span>
              Sign up with Google
            </button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-slate-400 text-sm">Already have an account? </span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              By creating an account, you agree to our{" "}
              <span className="text-emerald-400 cursor-pointer hover:text-emerald-300">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-emerald-400 cursor-pointer hover:text-emerald-300">
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}