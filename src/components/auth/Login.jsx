import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../admin_dashboard/Icon.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    idNumber: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    { value: "admin", label: "Admin", route: "/admin_dashboard" },
    { value: "tourist", label: "Tourist", route: "/tourist_dashboard" },
    { value: "agency_worker", label: "Agency Worker", route: "/agency_dashboard" }
  ];

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setFormData({ email: "", password: "", idNumber: "" });
    setError("");
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validation
    if (!selectedRole) {
      setError("Please select a role");
      setIsLoading(false);
      return;
    }

    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    if ((selectedRole === "admin" || selectedRole === "agency_worker") && !formData.idNumber) {
      setError("ID Number is required for this role");
      setIsLoading(false);
      return;
    }

    try {
      // TODO: Replace with actual API call
      await mockLogin(formData, selectedRole);
      
      const selectedRoleData = roles.find(r => r.value === selectedRole);
      navigate(selectedRoleData.route);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock login function - replace with actual API call
  const mockLogin = async (credentials, role) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Mock validation with role-specific credentials
        const isValidEmail = credentials.email === "test@example.com";
        const isValidPassword = credentials.password === "password";
        
        let isValidRole = true;
        if (role === "admin" && credentials.idNumber !== "ADMIN001") {
          isValidRole = false;
        }
        if (role === "agency_worker" && credentials.idNumber !== "WORKER001") {
          isValidRole = false;
        }
        
        if (isValidEmail && isValidPassword && isValidRole) {
          resolve({ success: true, role });
        } else {
          reject(new Error("Invalid credentials or ID number"));
        }
      }, 1000);
    });
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Google OAuth login - Backend integration needed");
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
            <h1 className="text-2xl font-bold mb-2">SmartTourist</h1>
            <p className="text-slate-300">Sign in to your account</p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Select Role</label>
            <div className="grid grid-cols-1 gap-2">
              {roles.map((role) => (
                <button
                  key={role.value}
                  onClick={() => handleRoleChange(role.value)}
                  className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                    selectedRole === role.value
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                      : "bg-slate-700 border-slate-600 hover:border-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedRole === role.value
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-slate-400"
                    }`} />
                    <span className="font-medium">{role.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          {selectedRole && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
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
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* ID Number for Admin/Agency Worker */}
              {(selectedRole === "admin" || selectedRole === "agency_worker") && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {selectedRole === "admin" ? "Admin ID" : "Worker ID"}
                  </label>
                  <input
                    type="text"
                    value={formData.idNumber}
                    onChange={(e) => handleInputChange("idNumber", e.target.value)}
                    placeholder={`Enter your ${selectedRole === "admin" ? "admin" : "worker"} ID`}
                    className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Icon name="User" size={18} />
                    Sign In
                  </>
                )}
              </button>

              {/* Google OAuth for Tourist */}
              {selectedRole === "tourist" && (
                <>
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
                    onClick={handleGoogleLogin}
                    className="w-full py-3 bg-white text-slate-900 hover:bg-gray-100 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="text-lg">🔍</span>
                    Continue with Google
                  </button>

                  <div className="text-center mt-4">
                    <span className="text-slate-400 text-sm">Don't have an account? </span>
                    <button
                      type="button"
                      onClick={() => navigate("/signup")}
                      className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                    >
                      Sign up
                    </button>
                  </div>
                </>
              )}
            </motion.form>
          )}

          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-slate-700/50 rounded-lg">
            <div className="text-xs text-slate-400 text-center space-y-1">
              <p>Demo Credentials:</p>
              <p>Email: test@example.com | Password: password</p>
              {selectedRole === "admin" && <p>Admin ID: ADMIN001</p>}
              {selectedRole === "agency_worker" && <p>Worker ID: WORKER001</p>}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}