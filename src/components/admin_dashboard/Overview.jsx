import React from "react";

export default function Overview({ data, setView, setItineraryForm }) {
  const { qrCart, acceptedTourists, groups, itineraries, workers } = data;
  const pendingQRs = qrCart.filter(item => item.status === "pending");
  const unassignedTourists = acceptedTourists.filter(t => !t.itineraryAssigned);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20">
          <h3 className="text-sm text-orange-300">Pending QRs</h3>
          <div className="text-2xl font-bold text-orange-400">{pendingQRs.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <h3 className="text-sm text-emerald-300">Accepted Tourists</h3>
          <div className="text-2xl font-bold text-emerald-400">{acceptedTourists.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <h3 className="text-sm text-purple-300">Active Groups</h3>
          <div className="text-2xl font-bold text-purple-400">{groups.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <h3 className="text-sm text-blue-300">Itineraries</h3>
          <div className="text-2xl font-bold text-blue-400">{itineraries.length}</div>
        </div>
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
          <h3 className="text-sm text-cyan-300">Available Workers</h3>
          <div className="text-2xl font-bold text-cyan-400">{workers.length}</div>
        </div>
      </div>

      {/* Pending QR Requests Alert */}
      {pendingQRs.length > 0 && (
        <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <h3 className="text-lg font-medium mb-2 text-orange-300">⚠️ Pending QR Requests</h3>
          <div className="space-y-2">
            {pendingQRs.slice(0, 3).map(qrItem => (
              <div key={qrItem.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <div className="font-semibold">{qrItem.touristData.name}</div>
                  <div className="text-xs text-slate-300">
                    {qrItem.touristData.travelType === "group" ? 
                      `Group: ${qrItem.touristData.specialGroupId}` : 
                      "Solo Travel"
                    } • Received: {new Date(qrItem.receivedAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => setView("qrcart")}
                  className="px-3 py-1 bg-orange-600 hover:bg-orange-700 rounded text-sm"
                >
                  Review
                </button>
              </div>
            ))}
            {pendingQRs.length > 3 && (
              <div className="text-center text-slate-400 text-sm">
                +{pendingQRs.length - 3} more pending requests
              </div>
            )}
          </div>
        </div>
      )}

      {/* Unassigned Tourists Alert */}
      {unassignedTourists.length > 0 && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <h3 className="text-lg font-medium mb-2 text-emerald-300">✅ Accepted Tourists Pending Itinerary</h3>
          <div className="space-y-2">
            {unassignedTourists.map(tourist => (
              <div key={tourist.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                <div>
                  <div className="font-semibold">{tourist.name}</div>
                  <div className="text-xs text-slate-300">
                    {tourist.travelType === "group" ? `Group Travel` : "Solo Travel"} • 
                    Accepted: {new Date(tourist.acceptedAt).toLocaleDateString()}
                  </div>
                </div>
                <button
                  onClick={() => setItineraryForm({ 
                    open: true, 
                    touristIds: [tourist.id]
                  })}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 rounded text-sm"
                >
                  Create Itinerary
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Groups Summary */}
      {groups.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-medium mb-2">Active Groups</h3>
          <div className="space-y-3">
            {groups.map((group) => (
              <div key={group.id} className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold">{group.name}</div>
                    <div className="text-xs text-slate-300">
                      Special ID: {group.specialGroupId} • {group.members.length} members
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-purple-300">
                      Created: {new Date(group.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Active Itineraries Progress */}
      {itineraries.length > 0 && (
        <section className="mt-6">
          <h3 className="text-lg font-medium mb-2">Active Itineraries Progress</h3>
          <div className="space-y-3">
            {itineraries.map((itin) => {
              const totalCheckpoints = itin.checkpoints.length;
              const completedForAllTourists = itin.checkpoints.reduce((acc, cp) => {
                const allTouristsChecked = itin.assignedTourists.every(tid => cp.touristStatus[tid]?.checked);
                return acc + (allTouristsChecked ? 1 : 0);
              }, 0);
              const progressPct = totalCheckpoints > 0 ? Math.round((completedForAllTourists / totalCheckpoints) * 100) : 0;

              return (
                <div key={itin.id} className="p-4 rounded-lg bg-white/3 border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-semibold">{itin.name}</div>
                      <div className="text-xs text-slate-300">
                        {itin.assignedTourists.length} tourists • {totalCheckpoints} checkpoints
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{progressPct}% Complete</div>
                      <div className="text-xs text-slate-300">{completedForAllTourists}/{totalCheckpoints} checkpoints</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
