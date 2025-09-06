import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../admin_dashboard/Icon.jsx";

export default function AgencyApp() {
  const [view, setView] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-800 text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="bg-slate-900 p-8 rounded-xl border border-slate-600 max-w-md">
          <div className="bg-blue-500/20 p-4 rounded-lg inline-block mb-6">
            <Icon name="Users" size={48} className="text-blue-400" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Agency Dashboard</h1>
          <p className="text-slate-300 mb-6">
            Welcome to the Agency Worker Dashboard. This interface will be developed to manage tourist assignments, checkpoint monitoring, and field operations.
          </p>
          
          <div className="space-y-3 text-left">
            <div className="p-3 bg-slate-700 rounded-lg">
              <h3 className="font-medium text-blue-300">🎯 Planned Features</h3>
              <ul className="text-sm text-slate-400 mt-2 space-y-1">
                <li>• Tourist assignment management</li>
                <li>• Checkpoint status updates</li>
                <li>• Real-time location tracking</li>
                <li>• Emergency response tools</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-600">
            <p className="text-xs text-slate-400">
              Agency Worker Dashboard v1.0 - Coming Soon
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}