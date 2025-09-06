import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import QRScanner from "./QRScanner.jsx";
import UserInfoForm from "./UserInfoForm.jsx";
import ItineraryList from "./ItineraryList.jsx";
import ContactHelp from "./ContactHelp.jsx";
import PanicButton from "./PanicButton.jsx";

export default function TouristApp() {
  const [view, setView] = useState("dashboard");
  const [userInfo, setUserInfo] = useState({
    name: "",
    contactNumber: "",
    aadharNumber: "",
    passportNumber: "",
    permanentAddress: "",
    age: "",
    sex: "",
    whatsappContact: "",
  });
  const [currentAgency, setCurrentAgency] = useState({
    name: "Heritage Tours Kolkata",
    contact: "+91-9876543210",
    email: "support@heritagetours.com",
    status: "active"
  });
  const [itinerary, setItinerary] = useState([
    { id: 1, name: "Victoria Memorial", completed: false, time: "10:00 AM" },
    { id: 2, name: "Howrah Bridge", completed: true, time: "2:00 PM" },
    { id: 3, name: "Indian Museum", completed: false, time: "4:00 PM" },
  ]);

  const handleQRScan = (data) => {
    console.log("QR Scanned:", data);
    // Mock API call to register with agency or checkpoint
    alert(`QR Code scanned successfully!\nData: ${data}`);
  };

  const handlePanicAlert = () => {
    // Mock emergency alert to admin/agencies
    console.log("PANIC ALERT TRIGGERED!");
    alert("🚨 Emergency alert sent to agency and authorities!\nHelp is on the way.");
  };

  const addItineraryItem = (item) => {
    const newItem = {
      id: Date.now(),
      name: item,
      completed: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setItinerary(prev => [...prev, newItem]);
  };

  const toggleItineraryItem = (id) => {
    setItinerary(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const removeItineraryItem = (id) => {
    setItinerary(prev => prev.filter(item => item.id !== id));
  };

  const renderView = () => {
    switch (view) {
      case "dashboard":
        return (
          <Dashboard 
            userInfo={userInfo}
            currentAgency={currentAgency}
            itinerary={itinerary}
            setView={setView}
          />
        );
      case "scanner":
        return <QRScanner onScan={handleQRScan} />;
      case "profile":
        return (
          <UserInfoForm 
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onSave={() => setView("dashboard")}
          />
        );
      case "itinerary":
        return (
          <ItineraryList 
            itinerary={itinerary}
            onAdd={addItineraryItem}
            onToggle={toggleItineraryItem}
            onRemove={removeItineraryItem}
          />
        );
      case "contact":
        return <ContactHelp currentAgency={currentAgency} />;
      default:
        return (
          <Dashboard 
            userInfo={userInfo}
            currentAgency={currentAgency}
            itinerary={itinerary}
            setView={setView}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white flex">
      <Sidebar view={view} setView={setView} userInfo={userInfo} />
      
      <main className="flex-1 overflow-auto md:ml-0 min-h-screen">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="pb-20 md:pb-6"
        >
          {renderView()}
        </motion.div>
      </main>

      {/* Floating Panic Button - Always Visible */}
      <PanicButton onPanic={handlePanicAlert} />
    </div>
  );
}