import React from "react";
import Icon from "../admin_dashboard/Icon.jsx";

export default function Dashboard({ userInfo, currentAgency, itinerary, setView }) {
  const completedItems = itinerary.filter(item => item.completed).length;
  const progressPct = itinerary.length > 0 ? Math.round((completedItems / itinerary.length) * 100) : 0;

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          Welcome, {userInfo.name || "Traveler"}! 👋
        </h2>
        <p className="text-slate-300">
          Your travel companion for a safe and memorable journey
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="p-3 md:p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <h3 className="text-xs md:text-sm text-emerald-300">Trip Progress</h3>
          <div className="text-lg md:text-2xl font-bold text-emerald-400">{progressPct}%</div>
        </div>
        <div className="p-3 md:p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <h3 className="text-xs md:text-sm text-blue-300">Checkpoints</h3>
          <div className="text-lg md:text-2xl font-bold text-blue-400">{completedItems}/{itinerary.length}</div>
        </div>
        <div className="p-3 md:p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <h3 className="text-xs md:text-sm text-purple-300">Agency Status</h3>
          <div className="text-lg md:text-2xl font-bold text-purple-400">
            {currentAgency.status === "active" ? "✓" : "⚠"}
          </div>
        </div>
        <div className="p-3 md:p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <h3 className="text-xs md:text-sm text-orange-300">Safety Score</h3>
          <div className="text-lg md:text-2xl font-bold text-orange-400">95</div>
        </div>
      </div>

      {/* Current Agency */}
      <div className="mb-6 p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg md:text-xl font-semibold mb-3 flex items-center gap-2">
          <Icon name="Users" size={20} />
          Current Agency
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="font-medium text-lg">{currentAgency.name}</div>
            <div className="text-sm text-slate-300 space-y-1">
              <div>📞 {currentAgency.contact}</div>
              <div>✉️ {currentAgency.email}</div>
            </div>
          </div>
          <div className="flex items-center justify-start md:justify-end">
            <div className={`px-3 py-1 rounded-full text-sm ${
              currentAgency.status === "active" 
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
            }`}>
              {currentAgency.status === "active" ? "🟢 Active" : "🟡 Inactive"}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setView("scanner")}
            className="p-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex flex-col items-center gap-2"
          >
            <Icon name="ScanLine" size={24} />
            <span className="text-sm font-medium">Scan QR</span>
          </button>
          <button
            onClick={() => setView("itinerary")}
            className="p-4 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors flex flex-col items-center gap-2"
          >
            <Icon name="MapPin" size={24} />
            <span className="text-sm font-medium">My Trip</span>
          </button>
          <button
            onClick={() => setView("contact")}
            className="p-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors flex flex-col items-center gap-2"
          >
            <Icon name="Settings" size={24} />
            <span className="text-sm font-medium">Get Help</span>
          </button>
          <button
            onClick={() => setView("profile")}
            className="p-4 bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors flex flex-col items-center gap-2"
          >
            <Icon name="User" size={24} />
            <span className="text-sm font-medium">Profile</span>
          </button>
        </div>
      </div>

      {/* Recent Itinerary Preview */}
      <div className="p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold">Today's Itinerary</h3>
          <button
            onClick={() => setView("itinerary")}
            className="text-emerald-400 hover:text-emerald-300 text-sm"
          >
            View All →
          </button>
        </div>
        <div className="space-y-3">
          {itinerary.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-slate-600 rounded-lg">
              <div className={`w-4 h-4 rounded-full ${
                item.completed ? "bg-emerald-500" : "bg-slate-400"
              }`} />
              <div className="flex-1">
                <div className={`font-medium ${item.completed ? "line-through text-slate-400" : ""}`}>
                  {item.name}
                </div>
                <div className="text-xs text-slate-400">{item.time}</div>
              </div>
              <div className="text-xs">
                {item.completed ? "✅" : "⏳"}
              </div>
            </div>
          ))}
        </div>
        {itinerary.length === 0 && (
          <div className="text-center text-slate-400 py-6">
            <Icon name="MapPin" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No itinerary items yet</p>
            <p className="text-sm">Add places you want to visit!</p>
          </div>
        )}
      </div>
    </div>
  );
}