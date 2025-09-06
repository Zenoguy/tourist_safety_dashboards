import React from "react";
import Icon from "./Icon.jsx";

export default function WorkersPanel({ data }) {
  const { workers } = data;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Agency Workers</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workers.map((worker) => (
          <div key={worker.id} className="p-4 rounded-xl bg-slate-700 border border-slate-600">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white">
                {worker.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{worker.name}</div>
                <div className="text-xs text-slate-300">{worker.specialization}</div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div><span className="text-slate-400">Phone:</span> {worker.phone}</div>
              <div><span className="text-slate-400">ID:</span> {worker.id}</div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-emerald-300">Available</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {workers.length === 0 && (
        <div className="text-center text-slate-400 py-12">
          <p>No workers available.</p>
          <p className="text-sm">Add workers to assign them to checkpoints.</p>
        </div>
      )}
    </div>
  );
}
