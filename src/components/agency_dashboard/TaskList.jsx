import React from "react";
import { motion } from "framer-motion";
import Icon from "../admin_dashboard/Icon.jsx";

export default function TaskList({ tasks, selectedTask, onSelectTask }) {
  // Sort tasks chronologically by time (nearest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    const timeA = new Date(`2024-01-01 ${a.time}`);
    const timeB = new Date(`2024-01-01 ${b.time}`);
    return timeA - timeB;
  });

  const getTaskProgress = (task) => {
    const completed = task.checkpoints.filter(cp => cp.completed).length;
    return Math.round((completed / task.checkpoints.length) * 100);
  };

  return (
    <div className="p-4 lg:p-6 h-full">
      <div className="mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold mb-2">My Tasks</h2>
        <p className="text-slate-300 text-sm">
          {tasks.length} tasks assigned • Sorted by time
        </p>
      </div>

      <div className="space-y-3">
        {sortedTasks.map((task, index) => {
          const progress = getTaskProgress(task);
          const isSelected = selectedTask === task.id;
          
          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onSelectTask(task.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "bg-blue-500/20 border-blue-500/50 shadow-lg shadow-blue-500/20"
                  : "bg-slate-700 border-slate-600 hover:border-slate-500 hover:bg-slate-600"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
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
                      {task.priority}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base mb-1">
                    {task.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Icon name="Clock" size={14} />
                    <span>{task.time}</span>
                  </div>
                </div>
                {isSelected && (
                  <Icon name="ChevronRight" size={16} className="text-blue-400" />
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-medium">{progress}%</span>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{task.checkpoints.filter(cp => cp.completed).length}/{task.checkpoints.length} checkpoints</span>
                  <span>{task.customerIds.length} customers</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {tasks.length === 0 && (
        <div className="text-center text-slate-400 py-12">
          <Icon name="ListChecks" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">No tasks assigned</p>
          <p className="text-sm">Tasks will appear here when assigned by admin</p>
        </div>
      )}
    </div>
  );
}