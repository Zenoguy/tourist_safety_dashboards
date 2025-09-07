import React from "react";
import Icon from "./Icon.jsx";

export default function Sidebar({ view, setView, data }) {
  const pendingQRCount = data.qrCart.filter(item => item.status === "pending").length;

  return (
    <aside className="w-20 md:w-64 bg-slate-900 text-white h-screen p-3 flex flex-col gap-6 fixed md:relative z-30">
      <div className="flex items-center gap-3">
        <div className="bg-white/10 p-2 rounded-lg"> <Icon name="MapPin" size={20} /> </div>
        <div className="hidden md:block">
          <h1 className="font-bold text-lg">SmartTourist</h1>
          <p className="text-xs text-slate-300">Admin Dashboard</p>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          <li 
            className={`p-2 rounded-lg cursor-pointer hover:bg-white/5 ${view === "overview" ? "bg-white/5" : ""}`} 
            onClick={() => setView("overview")}
          >
            <div className="flex items-center gap-3">
              <Icon name="ListChecks" />
              <span className="hidden md:inline">Overview</span>
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg cursor-pointer hover:bg-white/5 ${view === "qrcart" ? "bg-white/5" : ""}`} 
            onClick={() => setView("qrcart")}
          >
            <div className="flex items-center gap-3">
              <Icon name="QrCode" />
              <span className="hidden md:inline">QR Cart</span>
              {pendingQRCount > 0 && (
                <span className="bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {pendingQRCount}
                </span>
              )}
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg cursor-pointer hover:bg-white/5 ${view === "tourists" ? "bg-white/5" : ""}`} 
            onClick={() => setView("tourists")}
          >
            <div className="flex items-center gap-3">
              <Icon name="User" />
              <span className="hidden md:inline">Tourists</span>
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg cursor-pointer hover:bg-white/5 ${view === "itineraries" ? "bg-white/5" : ""}`} 
            onClick={() => setView("itineraries")}
          >
            <div className="flex items-center gap-3">
              <Icon name="MapPin" />
              <span className="hidden md:inline">Itineraries</span>
            </div>
          </li>
          <li 
            className={`p-2 rounded-lg cursor-pointer hover:bg-white/5 ${view === "workers" ? "bg-white/5" : ""}`} 
            onClick={() => setView("workers")}
          >
            <div className="flex items-center gap-3">
              <Icon name="Users" />
              <span className="hidden md:inline">Workers</span>
            </div>
          </li>
        </ul>
      </nav>

      <div className="text-xs text-slate-400 md:text-sm mt-auto">v2.0 • Admin</div>
    </aside>
  );
}
