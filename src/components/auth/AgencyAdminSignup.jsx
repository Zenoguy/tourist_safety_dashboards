import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../admin_dashboard/Icon.jsx";

const indianMetroCities = [
  "Delhi",
  "Mumbai", 
  "Bengaluru",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Kochi"
];

export default function AgencyAdminSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    agencyName: "",
    agencyId: "",
    headOfficeLocation: "",
    email: "",
    phoneNumber: "",
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
    const requiredFields = ["agencyName", "agencyId", "headOfficeLocation", "email", "phoneNumber", "password", "confirmPassword"];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
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

    // Validate phone number format
    if (!/^\+?[\d\s-()]+$/.test(formData.phoneNumber)) {
      setError("Please enter a valid phone number");
      setIsLoading(false);
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      await mockAgencySignup(formData);
      
      // Redirect to admin dashboard after successful signup
      navigate("/admin_dashboard");
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function - replace with actual API call
  const mockAgencySignup = async (agencyData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation
        if (agencyData.agencyName && agencyData.email && agencyData.password) {
          resolve({ success: true, agency: agencyData });
        } else {
          reject(new Error("Agency registration failed"));
        }
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-slate-900 p-6 md:p-8 rounded-xl border border-slate-600">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="bg-emerald-500/20 p-3 rounded-lg inline-block mb-4">
              <Icon name="Building" size={32} className="text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Register Your Agency</h1>
            <p className="text-slate-300">Create your agency admin account</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Agency Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Agency Name</label>
                <input
                  type="text"
                  value={formData.agencyName}
                  onChange={(e) => handleInputChange("agencyName", e.target.value)}
                  placeholder="Enter your agency name"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Agency ID */}
              <div>
                <label className="block text-sm font-medium mb-2">Agency ID (Business Registration)</label>
                <input
                  type="text"
                  value={formData.agencyId}
                  onChange={(e) => handleInputChange("agencyId", e.target.value)}
                  placeholder="Business registration number"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Head Office Location */}
              <div>
                <label className="block text-sm font-medium mb-2">Head Office Location</label>
                <select
                  value={formData.headOfficeLocation}
                  onChange={(e) => handleInputChange("headOfficeLocation", e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select city</option>
                  {indianMetroCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

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

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="+91-9876543210"
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
                  Creating agency account...
                </>
              ) : (
                <>
                  <Icon name="Building" size={18} />
                  Register Agency
                </>
              )}
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
              By registering your agency, you agree to our{" "}
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