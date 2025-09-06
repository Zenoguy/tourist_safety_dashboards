import React from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";
import Icon from "./Icon.jsx";

export default function QRCartPanel({ data, acceptTourist, rejectTourist }) {
  const pendingQRs = data.qrCart.filter(item => item.status === "pending");
  const processedQRs = data.qrCart.filter(item => item.status !== "pending");

  return (
    <div className="space-y-6">
      {/* Pending QR Requests */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3 text-orange-300">
          Pending QR Requests ({pendingQRs.length})
        </h3>
        
        {pendingQRs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingQRs.map((qrItem) => {
              const tourist = qrItem.touristData;
              const isGroupMember = tourist.travelType === "group" && tourist.specialGroupId;
              const groupCount = isGroupMember 
                ? pendingQRs.filter(item => item.touristData.specialGroupId === tourist.specialGroupId).length
                : 0;

              return (
                <motion.div
                  key={qrItem.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border-2 border-dashed transition-all duration-200 ${
                    isGroupMember 
                      ? 'bg-purple-500/10 border-purple-500/50' 
                      : 'bg-blue-500/10 border-blue-500/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-semibold text-lg">{tourist.name}</div>
                      <div className="text-sm text-slate-300">Age: {tourist.age}</div>
                      <div className="text-sm text-slate-300">Passport: {tourist.passport}</div>
                      
                      {isGroupMember && (
                        <div className="mt-2 p-2 bg-purple-500/20 rounded-lg">
                          <div className="text-xs text-purple-300 font-medium">GROUP TRAVELER</div>
                          <div className="text-xs text-purple-200">ID: {tourist.specialGroupId}</div>
                          <div className="text-xs text-purple-200">
                            {groupCount} member(s) with this ID
                          </div>
                        </div>
                      )}
                      
                      {!isGroupMember && (
                        <div className="mt-2 p-2 bg-blue-500/20 rounded-lg">
                          <div className="text-xs text-blue-300 font-medium">SOLO TRAVELER</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="bg-white/10 p-2 rounded-lg">
                      <QRCode 
                        value={JSON.stringify(tourist)} 
                        size={60}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm mb-4">
                    <div><span className="text-slate-400">Phone:</span> {tourist.phone}</div>
                    <div><span className="text-slate-400">Email:</span> {tourist.email}</div>
                    <div><span className="text-slate-400">Emergency:</span> {tourist.emergencyContact}</div>
                    <div><span className="text-slate-400">Received:</span> {new Date(qrItem.receivedAt).toLocaleString()}</div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptTourist(qrItem)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 px-3 py-2 rounded text-sm font-medium"
                    >
                      {isGroupMember ? `Accept Group (${groupCount})` : "Accept"}
                    </button>
                    <button
                      onClick={() => rejectTourist(qrItem)}
                      className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center text-slate-400 py-8">
            <Icon name="QrCode" size={48} className="mx-auto mb-4 opacity-50" />
            <p>No pending QR requests</p>
            <p className="text-sm">QR codes will appear here when received from external dashboard</p>
          </div>
        )}
      </div>

      {/* Processed QR Requests */}
      {processedQRs.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-3 text-slate-300">
            Processed Requests ({processedQRs.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {processedQRs.slice(-6).map((qrItem) => (
              <div 
                key={qrItem.id}
                className={`p-3 rounded-lg border ${
                  qrItem.status === "accepted" 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" 
                    : "bg-red-500/10 border-red-500/30 text-red-300"
                }`}
              >
                <div className="font-medium">{qrItem.touristData.name}</div>
                <div className="text-xs opacity-80">
                  {qrItem.status === "accepted" ? "✅ Accepted" : "❌ Rejected"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
