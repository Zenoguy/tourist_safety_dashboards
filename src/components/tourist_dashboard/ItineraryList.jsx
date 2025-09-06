import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../admin_dashboard/Icon.jsx";

export default function ItineraryList({ itinerary, onAdd, onToggle, onRemove }) {
  const [newItem, setNewItem] = useState("");
  const [filter, setFilter] = useState("all"); // all, completed, pending

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.trim()) {
      onAdd(newItem.trim());
      setNewItem("");
    }
  };

  const filteredItinerary = itinerary.filter(item => {
    if (filter === "completed") return item.completed;
    if (filter === "pending") return !item.completed;
    return true;
  });

  const completedCount = itinerary.filter(item => item.completed).length;
  const progressPct = itinerary.length > 0 ? Math.round((completedCount / itinerary.length) * 100) : 0;

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">My Itinerary</h2>
        <p className="text-slate-300">
          Track your travel plans and mark completed destinations
        </p>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Trip Progress</h3>
          <div className="text-sm text-slate-300">
            {completedCount} of {itinerary.length} completed
          </div>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-3 mb-2">
          <div 
            className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="text-center text-sm font-medium text-emerald-400">
          {progressPct}% Complete
        </div>
      </div>

      {/* Add New Item */}
      <div className="mb-6 p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Plus" size={20} />
          Add New Destination
        </h3>
        <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter place name or activity..."
            className="flex-1 p-3 rounded-lg bg-slate-600 border border-slate-500 focus:border-emerald-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!newItem.trim()}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            Add Item
          </button>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { key: "all", label: "All Items", count: itinerary.length },
            { key: "pending", label: "Pending", count: itinerary.length - completedCount },
            { key: "completed", label: "Completed", count: completedCount },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab.key
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Itinerary Items */}
      <div className="space-y-3">
        {filteredItinerary.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              item.completed
                ? "bg-emerald-500/10 border-emerald-500/30"
                : "bg-slate-700 border-slate-600 hover:border-slate-500"
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={() => onToggle(item.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  item.completed
                    ? "bg-emerald-500 border-emerald-500 text-white"
                    : "border-slate-400 hover:border-emerald-500"
                }`}
              >
                {item.completed && <Icon name="Check" size={14} />}
              </button>
              
              <div className="flex-1">
                <div className={`font-medium ${
                  item.completed ? "line-through text-slate-400" : ""
                }`}>
                  {item.name}
                </div>
                <div className="text-sm text-slate-400">
                  Added at {item.time}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {item.completed && (
                  <span className="text-emerald-400 text-sm">✅</span>
                )}
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredItinerary.length === 0 && (
        <div className="text-center text-slate-400 py-12">
          <Icon name="MapPin" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">
            {filter === "all" ? "No itinerary items yet" : `No ${filter} items`}
          </p>
          <p className="text-sm">
            {filter === "all" 
              ? "Add places you want to visit to get started!" 
              : `Switch to "All Items" to see your full itinerary`
            }
          </p>
        </div>
      )}

      {/* Quick Add Suggestions */}
      {itinerary.length === 0 && (
        <div className="mt-6 p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
          <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "Victoria Memorial",
              "Howrah Bridge",
              "Indian Museum",
              "Dakshineswar Temple",
              "Park Street",
              "Science City"
            ].map((place) => (
              <button
                key={place}
                onClick={() => onAdd(place)}
                className="p-2 bg-slate-600 hover:bg-slate-500 rounded-lg text-sm transition-colors text-left"
              >
                + {place}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}