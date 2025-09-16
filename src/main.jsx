import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/landing/LandingPage.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import AgencyAdminSignup from "./components/auth/AgencyAdminSignup.jsx";
import AdminApp from "./components/admin_dashboard/App.jsx";
import TouristApp from "./components/tourist_dashboard/TouristApp.jsx";
import AgencyApp from "./components/agency_dashboard/AgencyApp.jsx";
import "./index.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route shows landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/agency-admin-signup" element={<AgencyAdminSignup />} />
        
        {/* Dashboard routes */}
        <Route path="/admin_dashboard" element={<AdminApp />} />
        <Route path="/tourist_dashboard" element={<TouristApp />} />
        <Route path="/agency_dashboard" element={<AgencyApp />} />
        
        {/* Catch all route - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
