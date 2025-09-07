import React from "react";
import { motion } from "framer-motion";
import Icon from "../admin_dashboard/Icon.jsx";

export default function TaskDetails({ task, customers, onSelectCustomer, onUpdateCheckpoint }) {
  if (!task) {
    return (
      <div className="p-4 lg:p-6 h-full flex items-center justify-center">
        <div className="text-center text-slate-400">
          <Icon name="MousePointer" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">Select a task</p>
          <p className="text-sm">Choose a task from the left panel to view details</p>
        </div>
      </div>
    );
  }

  const completedCheckpoints = task.checkpoints.filter(cp => cp.completed).length;
  const progress = Math.round((completedCheckpoints / task.checkpoints.length) * 100);

  return (
    <div className="p-4 lg:p-6 h-full overflow-y-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono bg-slate-600 px-2 py-1 rounded">
            #{task.taskNumber}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            task.priority === "high" 
              ? "bg-red-500/20 text-red-300"
              : task.priority === "medium"
                ? "bg-yellow-500/20 text-yellow-300"
                : "bg-green-500/20 text-green-300"
          }`}>
            {task.priority} priority
          </span>
        </div>
        <h2 className="text-xl lg:text-2xl font-semibold mb-2">{task.name}</h2>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-1">
            <Icon name="Clock" size={14} />
            <span>{task.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="MapPin" size={14} />
            <span>{task.location}</span>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 bg-slate-700 rounded-xl border border-slate-600">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Task Progress</h3>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-slate-600 rounded-full h-3 mb-2">
          <div 
            className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-slate-400">
          {completedCheckpoints} of {task.checkpoints.length} checkpoints completed
        </div>
      </div>

      {/* Checkpoints */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="MapPin" size={18} />
          Itinerary Checkpoints
        </h3>
        <div className="space-y-3">
          {task.checkpoints.map((checkpoint, index) => (
            <motion.div
              key={checkpoint.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                checkpoint.completed
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "bg-slate-700 border-slate-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onUpdateCheckpoint(task.id, checkpoint.id, !checkpoint.completed)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    checkpoint.completed
                      ? "bg-emerald-500 border-emerald-500 text-white"
                      : "border-slate-400 hover:border-emerald-500"
                  }`}
                >
                  {checkpoint.completed && <Icon name="Check" size={14} />}
                </button>
                
                <div className="flex-1">
                  <div className={`font-medium ${
                    checkpoint.completed ? "line-through text-slate-400" : ""
                  }`}>
                    {checkpoint.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {checkpoint.description}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
                    <span>📍 {checkpoint.location}</span>
                    <span>⏱️ {checkpoint.estimatedTime}</span>
                  </div>
                </div>

                {checkpoint.completed && (
                  <div className="text-emerald-400">
                    <Icon name="CheckCircle" size={20} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Customer List */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Users" size={18} />
          Customers ({customers.length})
        </h3>
        <div className="space-y-3">
          {customers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectCustomer(customer.id)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                customer.verified
                  ? "bg-emerald-500/10 border-emerald-500/30"
                  : "bg-slate-700 border-slate-600 hover:border-slate-500 hover:bg-slate-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-xs text-slate-400">
                      📞 {customer.phone}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {customer.verified ? (
                    <div className="flex items-center gap-1 text-emerald-400">
                      <Icon name="CheckCircle" size={16} />
                      <span className="text-xs">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-orange-400">
                      <Icon name="Clock" size={16} />
                      <span className="text-xs">Pending</span>
                    </div>
                  )}
                  <Icon name="ChevronRight" size={16} className="text-slate-400" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {customers.length === 0 && (
          <div className="text-center text-slate-400 py-8">
            <Icon name="Users" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No customers assigned to this task</p>
          </div>
        )}
      </div>
    </div>
  );
}