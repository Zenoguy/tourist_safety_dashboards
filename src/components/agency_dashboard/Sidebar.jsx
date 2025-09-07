import React from "react";
import Icon from "../admin_dashboard/Icon.jsx";

export default function Sidebar() {
  return (
    <aside className="w-16 lg:w-64 bg-slate-900 text-white h-screen p-3 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-500/20 p-2 rounded-lg border border-blue-500/30">
          <Icon name="Users" size={20} className="text-blue-400" />
        </div>
        <div className="hidden lg:block">
          <h1 className="font-bold text-lg">SmartTourist</h1>
          <p className="text-xs text-slate-300">Agency Worker</p>
        </div>
      </div>

      {/* Worker Status */}
      <div className="hidden lg:block p-3 bg-slate-800 rounded-lg border border-slate-600">
        <div className="text-sm font-medium">Rajesh Kumar</div>
        <div className="text-xs text-slate-400">Worker ID: WORKER001</div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
          <span className="text-xs text-emerald-300">On Duty</span>
        </div>
      </div>

      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          <li className="p-2 lg:p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
            <div className="flex items-center gap-3">
              <Icon name="ListChecks" size={18} />
              <span className="hidden lg:inline font-medium">My Tasks</span>
            </div>
          </li>
          <li className="p-2 lg:p-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Icon name="MapPin" size={18} />
              <span className="hidden lg:inline">Locations</span>
            </div>
          </li>
          <li className="p-2 lg:p-3 rounded-lg cursor-pointer hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <Icon name="Settings" size={18} />
              <span className="hidden lg:inline">Settings</span>
            </div>
          </li>
        </ul>
      </nav>

      <div className="text-xs text-slate-400 text-center lg:text-left">
        Worker v1.0
      </div>
    </aside>
  );
}