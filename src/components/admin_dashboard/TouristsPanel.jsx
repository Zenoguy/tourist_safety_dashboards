import React from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import Icon from "./Icon.jsx";

export default function TouristsPanel({ data, handleTouristClick, setItineraryForm }) {
  const { acceptedTourists, groups } = data;
  
  // Group tourists by their group or solo status
  const groupedTourists = acceptedTourists.reduce((acc, tourist) => {
    if (tourist.travelType === "group" && tourist.specialGroupId) {
      const group = groups.find(g => g.specialGroupId === tourist.specialGroupId);
      const groupKey = group ? group.name : `Group ${tourist.specialGroupId}`;
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(tourist);
    } else {
      if (!acc.solo) acc.solo = [];
      acc.solo.push(tourist);
    }
    return acc;
  }, {});

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Accepted Tourists</h2>
      
      {Object.entries(groupedTourists).map(([groupKey, tourists]) => (
        <div key={groupKey} className="mb-6">
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            {groupKey === "solo" ? (
              <>
                <Icon name="User" size={20} />
                Solo Travelers ({tourists.length})
              </>
            ) : (
              <>
                <Icon name="Users" size={20} />
                {groupKey} ({tourists.length} members)
              </>
            )}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tourists.map((tourist) => (
              <motion.div 
                key={tourist.id} 
                initial={{ opacity: 0, y: 8 }} 
                animate={{ opacity: 1, y: 0 }} 
                onClick={() => handleTouristClick(tourist)}
                className={`p-4 rounded-xl border border-slate-600 transition-all duration-200 ${
                  groupKey === "solo" ? 'bg-blue-500/10' : 'bg-purple-500/10'
                } ${
                  tourist.itineraryAssigned 
                    ? 'cursor-pointer hover:bg-slate-600 hover:border-emerald-500/50 hover:scale-[1.02]' 
                    : 'cursor-default'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-semibold text-lg flex items-center gap-2">
                      {tourist.name}
                      {tourist.itineraryAssigned && (
                        <span className="text-emerald-400 text-sm">👆 Click to view itinerary</span>
                      )}
                    </div>
                    <div className="text-sm text-slate-300">Age: {tourist.age}</div>
                    <div className="text-sm text-slate-300">Passport: {tourist.passport}</div>
                    
                    {tourist.specialGroupId && (
                      <div className="mt-2 p-2 bg-purple-500/20 rounded-lg">
                        <div className="text-xs text-purple-300 font-medium">GROUP ID</div>
                        <div className="text-xs text-purple-200">{tourist.specialGroupId}</div>
                      </div>
                    )}
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg">
                    <QRCode 
                      value={JSON.stringify({
                        id: tourist.id,
                        name: tourist.name,
                        passport: tourist.passport,
                        itinerary: tourist.itineraryAssigned
                      })} 
                      size={60}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div><span className="text-slate-400">Phone:</span> {tourist.phone}</div>
                  <div><span className="text-slate-400">Email:</span> {tourist.email}</div>
                  <div><span className="text-slate-400">Emergency:</span> {tourist.emergencyContact}</div>
                  <div><span className="text-slate-400">Accepted:</span> {new Date(tourist.acceptedAt).toLocaleString()}</div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-slate-600">
                  {tourist.itineraryAssigned ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-emerald-500/20 text-emerald-300 rounded text-xs">
                          Itinerary Assigned
                        </span>
                        <span className="text-xs text-slate-400">{tourist.itineraryAssigned}</span>
                      </div>
                      <Icon name="Eye" size={16} className="text-emerald-400" />
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        setItineraryForm({ 
                          open: true, 
                          touristIds: tourist.travelType === "group" 
                            ? acceptedTourists.filter(t => t.specialGroupId === tourist.specialGroupId).map(t => t.id)
                            : [tourist.id]
                        });
                      }}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-sm"
                    >
                      Create Itinerary
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {acceptedTourists.length === 0 && (
        <div className="text-center text-slate-400 py-12">
          <Icon name="User" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No accepted tourists yet.</p>
          <p className="text-sm">Accept tourists from the QR Cart to see them here.</p>
        </div>
      )}
    </div>
  );
}
