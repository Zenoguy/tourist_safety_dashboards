import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "./Icon";

export default function ItineraryCreator({ 
  isOpen, 
  touristIds, 
  data, 
  onClose, 
  onCreateItinerary 
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    checkpoints: [{ name: "", description: "", assignedWorker: "", estimatedTime: "" }]
  });

  const addCheckpoint = () => {
    setFormData(prev => ({
      ...prev,
      checkpoints: [...prev.checkpoints, { name: "", description: "", assignedWorker: "", estimatedTime: "" }]
    }));
  };

  const updateCheckpoint = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      checkpoints: prev.checkpoints.map((cp, i) => 
        i === index ? { ...cp, [field]: value } : cp
      )
    }));
  };

  const handleCreateItinerary = () => {
    const newItinerary = {
      id: `itin-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      duration: formData.duration,
      createdAt: new Date().toISOString(),
      assignedTourists: touristIds,
      checkpoints: formData.checkpoints.map((cp, index) => ({
        id: `cp-${Date.now()}-${index}`,
        name: cp.name,
        description: cp.description,
        assignedWorker: cp.assignedWorker,
        estimatedTime: cp.estimatedTime,
        touristStatus: Object.fromEntries(
          touristIds.map(tid => [tid, { checked: false, checkedAt: null }])
        )
      }))
    };

    onCreateItinerary(newItinerary);
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      duration: "",
      checkpoints: [{ name: "", description: "", assignedWorker: "", estimatedTime: "" }]
    });
  };

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto"
    >
      <div className="bg-slate-800 p-6 rounded-xl w-full max-w-2xl m-4 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Create Tour Itinerary</h3>
        
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Itinerary Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              placeholder="e.g., Kolkata Heritage Tour"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              rows="3"
              placeholder="Brief description of the tour..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full p-2 rounded bg-slate-700 border border-slate-600"
              placeholder="e.g., Full Day, Half Day, 3 Hours"
            />
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Checkpoints</h4>
          {formData.checkpoints.map((checkpoint, index) => (
            <div key={index} className="p-4 bg-slate-700 rounded-lg mb-3">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Checkpoint Name</label>
                  <input
                    type="text"
                    value={checkpoint.name}
                    onChange={(e) => updateCheckpoint(index, 'name', e.target.value)}
                    className="w-full p-2 rounded bg-slate-600 border border-slate-500"
                    placeholder="e.g., Victoria Memorial"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estimated Time</label>
                  <input
                    type="text"
                    value={checkpoint.estimatedTime}
                    onChange={(e) => updateCheckpoint(index, 'estimatedTime', e.target.value)}
                    className="w-full p-2 rounded bg-slate-600 border border-slate-500"
                    placeholder="e.g., 60 minutes"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={checkpoint.description}
                  onChange={(e) => updateCheckpoint(index, 'description', e.target.value)}
                  className="w-full p-2 rounded bg-slate-600 border border-slate-500"
                  placeholder="Brief description..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Assign Worker</label>
                <select
                  value={checkpoint.assignedWorker}
                  onChange={(e) => updateCheckpoint(index, 'assignedWorker', e.target.value)}
                  className="w-full p-2 rounded bg-slate-600 border border-slate-500"
                >
                  <option value="">Select Worker</option>
                  {data.workers.map(worker => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name} - {worker.specialization}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
          
          <button
            onClick={addCheckpoint}
            className="w-full p-2 border-2 border-dashed border-slate-600 rounded-lg hover:border-slate-500"
          >
            <Icon name="Plus" className="inline mr-2" />
            Add Checkpoint
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCreateItinerary}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded"
            disabled={!formData.name || formData.checkpoints.length === 0}
          >
            Create Itinerary
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
}
