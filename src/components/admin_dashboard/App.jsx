import React, { useState } from "react";
import { motion } from "framer-motion";

// Update these import paths (add ./ since they're in the same folder now):
import Sidebar from "./Sidebar.jsx";
import Overview from "./Overview.jsx";
import QRCartPanel from "./QRCartPanel.jsx";
import TouristsPanel from "./TouristsPanel.jsx";
import ItinerariesPanel from "./ItinerariesPanel.jsx";
import WorkersPanel from "./WorkersPanel.jsx";
import ItineraryCreator from "./ItineraryCreator.jsx";

/*
  Smart Tourist Admin Dashboard - QR Cart System:
  1. QR Cart - Receive QR codes from external source
  2. Individual tourist approval for solo travelers
  3. Group detection via special ID for group travelers
  4. Automatic group formation when accepting group members
  5. Itinerary creation for accepted tourists
  
  Features:
  - QR Cart with pending tourist requests
  - Solo/Group traveler distinction
  - Accept/Reject functionality
  - Automatic group formation
  - Itinerary management for accepted tourists
*/
// Update the data import path (go up two levels to reach src/data):
import { initialData } from "../../data/initialData.js";

export default function SmartTouristDashboard() {
  const [view, setView] = useState("overview");
  const [data, setData] = useState(initialData);
  const [itineraryForm, setItineraryForm] = useState({ open: false, touristIds: [] });
  const [selectedTourist, setSelectedTourist] = useState(null);

  // Function to handle tourist card click
  const handleTouristClick = (tourist) => {
    if (tourist.itineraryAssigned) {
      setSelectedTourist(tourist.id);
      setView("itineraries");
    }
  };

  // Accept tourist from QR cart
  const acceptTourist = (qrItem) => {
    const tourist = qrItem.touristData;
    
    if (tourist.travelType === "group" && tourist.specialGroupId) {
      // Handle group travelers
      const groupMembers = data.qrCart
        .filter(item => 
          item.touristData.specialGroupId === tourist.specialGroupId && 
          item.status === "pending"
        );
      
      const acceptedGroupMembers = groupMembers.map(member => ({
        ...member.touristData,
        id: member.id,
        acceptedAt: new Date().toISOString(),
        travelType: "group",
        specialGroupId: tourist.specialGroupId
      }));

      // Check if group already exists or create new one
      let updatedGroups;
      const existingGroup = data.groups.find(g => g.specialGroupId === tourist.specialGroupId);
      
      if (existingGroup) {
        updatedGroups = data.groups.map(g => 
          g.specialGroupId === tourist.specialGroupId 
            ? { ...g, members: [...g.members, ...acceptedGroupMembers.map(t => t.id)] }
            : g
        );
      } else {
        const newGroup = {
          id: `group-${Date.now()}`,
          name: `Group ${tourist.specialGroupId}`,
          specialGroupId: tourist.specialGroupId,
          members: acceptedGroupMembers.map(t => t.id),
          createdAt: new Date().toISOString()
        };
        updatedGroups = [...data.groups, newGroup];
      }

      setData(prev => ({
        ...prev,
        qrCart: prev.qrCart.map(item => 
          item.touristData.specialGroupId === tourist.specialGroupId && item.status === "pending"
            ? { ...item, status: "accepted" }
            : item
        ),
        acceptedTourists: [...prev.acceptedTourists, ...acceptedGroupMembers],
        groups: updatedGroups
      }));
    } else {
      // Handle solo travelers
      const acceptedTourist = {
        ...tourist,
        id: qrItem.id,
        acceptedAt: new Date().toISOString()
      };

      setData(prev => ({
        ...prev,
        qrCart: prev.qrCart.map(item => 
          item.id === qrItem.id ? { ...item, status: "accepted" } : item
        ),
        acceptedTourists: [...prev.acceptedTourists, acceptedTourist]
      }));
    }
  };

  // Reject tourist from QR cart
  const rejectTourist = (qrItem) => {
    setData(prev => ({
      ...prev,
      qrCart: prev.qrCart.map(item => 
        item.id === qrItem.id ? { ...item, status: "rejected" } : item
      )
    }));
  };

  // Create itinerary
  const createItinerary = (newItinerary) => {
    setData(prev => ({
      ...prev,
      itineraries: [...prev.itineraries, newItinerary],
      acceptedTourists: prev.acceptedTourists.map(t => 
        itineraryForm.touristIds.includes(t.id) 
          ? { ...t, itineraryAssigned: newItinerary.id }
          : t
      )
    }));

    setItineraryForm({ open: false, touristIds: [] });
    alert("Itinerary created successfully!");
  };

  const renderView = () => {
    switch (view) {
      case "overview":
        return (
          <Overview 
            data={data} 
            setView={setView} 
            setItineraryForm={setItineraryForm} 
          />
        );
      case "qrcart":
        return (
          <QRCartPanel 
            data={data} 
            acceptTourist={acceptTourist} 
            rejectTourist={rejectTourist} 
          />
        );
      case "tourists":
        return (
          <TouristsPanel 
            data={data} 
            handleTouristClick={handleTouristClick} 
            setItineraryForm={setItineraryForm} 
          />
        );
      case "itineraries":
        return (
          <ItinerariesPanel 
            data={data} 
            selectedTourist={selectedTourist} 
            setSelectedTourist={setSelectedTourist} 
          />
        );
      case "workers":
        return <WorkersPanel data={data} />;
      default:
        return (
          <Overview 
            data={data} 
            setView={setView} 
            setItineraryForm={setItineraryForm} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white flex">
      <Sidebar 
        view={view} 
        setView={setView} 
        data={data} 
      />
      
      <main className="flex-1 overflow-auto">
        {renderView()}
      </main>

      {/* Itinerary Creation Modal */}
      <ItineraryCreator
        isOpen={itineraryForm.open}
        touristIds={itineraryForm.touristIds}
        data={data}
        onClose={() => setItineraryForm({ open: false, touristIds: [] })}
        onCreateItinerary={createItinerary}
      />
    </div>
  );
}
