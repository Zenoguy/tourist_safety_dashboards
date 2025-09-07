import React, { useState } from "react";
import { motion } from "framer-motion";
import TaskList from "./TaskList.jsx";
import TaskDetails from "./TaskDetails.jsx";
import CustomerDetails from "./CustomerDetails.jsx";
import Sidebar from "./Sidebar.jsx";
import { mockAgencyData } from "../../data/agencyData.js";

export default function AgencyApp() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [tasks, setTasks] = useState(mockAgencyData.tasks);
  const [customers, setCustomers] = useState(mockAgencyData.customers);

  // Update task checkpoint completion
  const updateCheckpoint = (taskId, checkpointId, completed) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? {
            ...task,
            checkpoints: task.checkpoints.map(cp => 
              cp.id === checkpointId ? { ...cp, completed } : cp
            )
          }
        : task
    ));
  };

  // Update customer verification status
  const updateCustomerVerification = (customerId, verified) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === customerId 
        ? { ...customer, verified, verifiedAt: verified ? new Date().toISOString() : null }
        : customer
    ));
  };

  // Get customers for selected task
  const getTaskCustomers = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return [];
    return customers.filter(customer => task.customerIds.includes(customer.id));
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white flex">
      <Sidebar />
      
      <main className="flex-1 overflow-hidden">
        <div className="h-screen flex flex-col lg:flex-row">
          {/* Task List Panel */}
          <div className="w-full lg:w-1/3 xl:w-1/4 border-r border-slate-600 overflow-y-auto">
            <TaskList 
              tasks={tasks}
              selectedTask={selectedTask}
              onSelectTask={setSelectedTask}
            />
          </div>

          {/* Task Details Panel */}
          <div className="w-full lg:w-1/3 xl:w-2/4 border-r border-slate-600 overflow-y-auto">
            <TaskDetails 
              task={selectedTask ? tasks.find(t => t.id === selectedTask) : null}
              customers={selectedTask ? getTaskCustomers(selectedTask) : []}
              onSelectCustomer={setSelectedCustomer}
              onUpdateCheckpoint={updateCheckpoint}
            />
          </div>

          {/* Customer Details Panel */}
          <div className="w-full lg:w-1/3 xl:w-1/4 overflow-y-auto">
            <CustomerDetails 
              customer={selectedCustomer ? customers.find(c => c.id === selectedCustomer) : null}
              onUpdateVerification={updateCustomerVerification}
            />
          </div>
        </div>
      </main>
    </div>
  );
}