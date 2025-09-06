import React from "react";
import Icon from "./Icon.jsx";

export default function ItinerariesPanel({ data, selectedTourist, setSelectedTourist }) {
  const { itineraries, acceptedTourists, workers } = data;

  const getTouristById = (id) => acceptedTourists.find(t => t.id === id);
  const getWorkerById = (id) => workers.find(w => w.id === id);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Tour Itineraries</h2>
        {selectedTourist && (
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30">
            <Icon name="Eye" size={16} />
            <span className="text-sm">
              Viewing itinerary for: <strong>{getTouristById(selectedTourist)?.name}</strong>
            </span>
            <button 
              onClick={() => setSelectedTourist(null)}
              className="ml-2 text-emerald-400 hover:text-emerald-300"
            >
              ✕
            </button>
          </div>
        )}
      </div>
      
      <div className="space-y-6">
        {itineraries.map((itinerary) => (
          <div key={itinerary.id} className="p-6 rounded-xl bg-slate-700 border border-slate-600">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">{itinerary.name}</h3>
                <p className="text-slate-300">{itinerary.description}</p>
                <div className="text-sm text-slate-400 mt-1">
                  Duration: {itinerary.duration} • Created: {new Date(itinerary.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Checkpoints */}
              <div>
                <h4 className="text-lg font-medium mb-3">Checkpoints Progress</h4>
                <div className="space-y-3">
                  {itinerary.checkpoints.map((checkpoint, index) => {
                    const worker = getWorkerById(checkpoint.assignedWorker);
                    const completedTourists = itinerary.assignedTourists.filter(
                      tid => checkpoint.touristStatus[tid]?.checked
                    ).length;
                    const totalTourists = itinerary.assignedTourists.length;
                    
                    return (
                      <div key={checkpoint.id} className="p-4 bg-slate-600 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              completedTourists === totalTourists 
                                ? "bg-emerald-500 text-white" 
                                : completedTourists > 0 
                                  ? "bg-yellow-500 text-black"
                                  : "bg-slate-500 text-white"
                            }`}>
                              {completedTourists === totalTourists ? "✓" : index + 1}
                            </div>
                            <div>
                              <div className="font-medium">{checkpoint.name}</div>
                              <div className="text-xs text-slate-300">{checkpoint.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm">{completedTourists}/{totalTourists}</div>
                            <div className="text-xs text-slate-400">tourists</div>
                          </div>
                        </div>
                        
                        <div className="mt-3 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Assigned Worker:</span>
                            <span>{worker ? worker.name : "Unassigned"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Estimated Time:</span>
                            <span>{checkpoint.estimatedTime}</span>
                          </div>
                          <div className="w-full bg-slate-500 rounded-full h-2">
                            <div 
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(completedTourists / totalTourists) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tourist Status */}
              <div>
                <h4 className="text-lg font-medium mb-3">Tourist Progress</h4>
                <div className="space-y-3">
                  {itinerary.assignedTourists.map(touristId => {
                    const tourist = getTouristById(touristId);
                    if (!tourist) return null;

                    const completedCheckpoints = itinerary.checkpoints.filter(
                      cp => cp.touristStatus[touristId]?.checked
                    ).length;
                    const totalCheckpoints = itinerary.checkpoints.length;
                    const progressPct = Math.round((completedCheckpoints / totalCheckpoints) * 100);

                    return (
                      <div 
                        key={touristId} 
                        className={`p-4 rounded-lg transition-all duration-300 ${
                          selectedTourist === touristId 
                            ? 'bg-emerald-600/20 border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/20' 
                            : 'bg-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {selectedTourist === touristId && (
                              <span className="text-emerald-400 animate-pulse">👁️</span>
                            )}
                            <div>
                              <div className="font-medium">{tourist.name}</div>
                              <div className="text-xs text-slate-300">
                                {tourist.travelType === "group" ? `Group: ${tourist.groupId}` : "Solo Travel"}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{progressPct}%</div>
                            <div className="text-xs text-slate-400">{completedCheckpoints}/{totalCheckpoints}</div>
                          </div>
                        </div>
                        
                        <div className="w-full bg-slate-500 rounded-full h-2 mb-3">
                          <div 
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>

                        <div className="space-y-1">
                          {itinerary.checkpoints.map((cp) => {
                            const status = cp.touristStatus[touristId];
                            return (
                              <div key={cp.id} className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                  <span className={`w-4 h-4 rounded-full ${
                                    status?.checked ? "bg-emerald-500" : "bg-slate-500"
                                  }`} />
                                  {cp.name}
                                </span>
                                <span className="text-xs text-slate-400">
                                  {status?.checkedAt ? new Date(status.checkedAt).toLocaleTimeString() : "Pending"}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {itineraries.length === 0 && (
          <div className="text-center text-slate-400 py-12">
            <Icon name="QrCode" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No itineraries created yet.</p>
            <p className="text-sm">Scan tourist QR codes and create itineraries for them.</p>
          </div>
        )}
      </div>
    </div>
  );
}
