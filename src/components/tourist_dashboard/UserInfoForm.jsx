import React, { useState } from "react";
import Icon from "../admin_dashboard/Icon.jsx";

export default function UserInfoForm({ userInfo, setUserInfo, onSave }) {
  const [formData, setFormData] = useState(userInfo);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "Contact number is required";
    if (formData.contactNumber && !/^\+?[\d\s-()]+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Invalid contact number format";
    }
    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = "Valid age is required";
    }
    if (!formData.sex) newErrors.sex = "Please select gender";
    
    // Optional but validate format if provided
    if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber.replace(/\s/g, ""))) {
      newErrors.aadharNumber = "Aadhar should be 12 digits";
    }
    if (formData.whatsappContact && !/^\+?[\d\s-()]+$/.test(formData.whatsappContact)) {
      newErrors.whatsappContact = "Invalid WhatsApp number format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUserInfo(formData);
      onSave();
      alert("Profile updated successfully!");
    }
  };

  const formFields = [
    { key: "name", label: "Full Name", type: "text", required: true, placeholder: "Enter your full name" },
    { key: "contactNumber", label: "Contact Number", type: "tel", required: true, placeholder: "+91-9876543210" },
    { key: "aadharNumber", label: "Aadhar Number", type: "text", placeholder: "1234 5678 9012" },
    { key: "passportNumber", label: "Passport Number", type: "text", placeholder: "A1234567" },
    { key: "age", label: "Age", type: "number", required: true, placeholder: "25" },
    { key: "whatsappContact", label: "WhatsApp Contact", type: "tel", placeholder: "+91-9876543210" },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">My Profile</h2>
        <p className="text-slate-300">
          Keep your information updated for a better travel experience
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {formFields.map((field) => (
            <div key={field.key} className={field.key === "permanentAddress" ? "md:col-span-2" : ""}>
              <label className="block text-sm font-medium mb-2">
                {field.label}
                {field.required && <span className="text-red-400 ml-1">*</span>}
              </label>
              <input
                type={field.type}
                value={formData[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className={`w-full p-3 rounded-lg bg-slate-700 border transition-colors focus:outline-none ${
                  errors[field.key] 
                    ? "border-red-500 focus:border-red-400" 
                    : "border-slate-600 focus:border-emerald-500"
                }`}
              />
              {errors[field.key] && (
                <p className="text-red-400 text-sm mt-1">{errors[field.key]}</p>
              )}
            </div>
          ))}

          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Gender <span className="text-red-400 ml-1">*</span>
            </label>
            <select
              value={formData.sex}
              onChange={(e) => handleChange("sex", e.target.value)}
              className={`w-full p-3 rounded-lg bg-slate-700 border transition-colors focus:outline-none ${
                errors.sex 
                  ? "border-red-500 focus:border-red-400" 
                  : "border-slate-600 focus:border-emerald-500"
              }`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {errors.sex && (
              <p className="text-red-400 text-sm mt-1">{errors.sex}</p>
            )}
          </div>

          {/* Permanent Address - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">
              Permanent Address
            </label>
            <textarea
              value={formData.permanentAddress}
              onChange={(e) => handleChange("permanentAddress", e.target.value)}
              placeholder="Enter your permanent address"
              rows="3"
              className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:border-emerald-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-slate-600">
          <button
            type="submit"
            className="flex-1 sm:flex-none px-6 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="User" size={18} />
            Save Profile
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-3 bg-slate-600 hover:bg-slate-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>

        {/* Profile Completion Status */}
        <div className="mt-6 p-4 bg-slate-700 rounded-xl border border-slate-600">
          <h3 className="font-medium mb-2">Profile Completion</h3>
          <div className="space-y-2">
            {[
              { field: "name", label: "Name" },
              { field: "contactNumber", label: "Contact" },
              { field: "age", label: "Age" },
              { field: "sex", label: "Gender" },
              { field: "aadharNumber", label: "Aadhar" },
              { field: "passportNumber", label: "Passport" },
            ].map((item) => (
              <div key={item.field} className="flex items-center gap-2 text-sm">
                <div className={`w-4 h-4 rounded-full ${
                  formData[item.field] ? "bg-emerald-500" : "bg-slate-500"
                }`} />
                <span className={formData[item.field] ? "text-emerald-300" : "text-slate-400"}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}