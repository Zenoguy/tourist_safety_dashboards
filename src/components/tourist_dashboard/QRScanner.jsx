import React from "react";
import QRCode from "react-qr-code";
import Icon from "../admin_dashboard/Icon.jsx";

export default function TouristQR({ value = "TOURIST_QR_PLACEHOLDER" }) {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Your Tourist QR Code</h2>
        <p className="text-slate-300">
          Show this QR code at checkpoints or to agency's employees for verification
        </p>
      </div>

      <div className="flex flex-col items-center justify-center bg-slate-700 rounded-xl border border-slate-600 p-6">
        <div className="bg-white p-4 rounded-lg shadow-md">s
          <QRCode value={value} size={200} />
        </div>
        <p className="mt-4 text-slate-400 text-sm">
          This QR code is unique to you. Please keep it safe.
        </p>
      </div>

      {/* Optional: Quick test/example buttons */}
      <div className="mt-6 p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Plus" size={20} />
          Example QR Variants
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => alert("Would update QR to Agency Check-in")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
          >
            Agency Check-in
          </button>
          <button
            onClick={() => alert("Would update QR to Checkpoint")}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors"
          >
            Checkpoint
          </button>
        </div>
      </div>
    </div>
  );
}
