import React, { useState } from "react";
import Icon from "../admin_dashboard/Icon.jsx";

export default function Sidebar({ view, setView, userInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "ListChecks" },
    { id: "scanner", label: "QR Scanner", icon: "ScanLine" },
    { id: "profile", label: "My Profile", icon: "User" },
    { id: "itinerary", label: "My Itinerary", icon: "MapPin" },
    { id: "contact", label: "Contact Help", icon: "Settings" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-slate-900 p-2 rounded-lg border border-slate-600"
        >
          <Icon name={isOpen ? "X" : "Menu"} size={20} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:relative top-0 left-0 h-screen w-64 bg-slate-900 text-white p-3 flex flex-col gap-6 z-40 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center gap-3 pt-16 md:pt-0">
          <div className="bg-emerald-500/20 p-2 rounded-lg border border-emerald-500/30">
            <Icon name="User" size={20} className="text-emerald-400" />
          </div>
          <div className="hidden md:block">
            <h1 className="font-bold text-lg">SmartTourist</h1>
            <p className="text-xs text-slate-300">Tourist Dashboard</p>
          </div>
        </div>

        {/* User Status */}
        <div className="p-3 bg-slate-800 rounded-lg border border-slate-600">
          <div className="text-sm font-medium">
            {userInfo.name || "Guest User"}
          </div>
          <div className="text-xs text-slate-400">
            {userInfo.contactNumber || "No contact info"}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-xs text-emerald-300">Active</span>
          </div>
        </div>

        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <li 
                key={item.id}
                className={`p-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors ${
                  view === item.id ? "bg-emerald-500/20 border border-emerald-500/30" : ""
                }`} 
                onClick={() => {
                  setView(item.id);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  <Icon name={item.icon} size={18} />
                  <span className="font-medium">{item.label}</span>
                </div>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-xs text-slate-400 mt-auto">
          Tourist v1.0
        </div>
      </aside>
    </>
  );
}