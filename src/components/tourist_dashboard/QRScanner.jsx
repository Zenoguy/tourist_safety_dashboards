import React, { useState, useRef, useEffect } from "react";
import Icon from "../admin_dashboard/Icon.jsx";

export default function QRScanner({ onScan }) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const [manualInput, setManualInput] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScanning = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } // Use back camera on mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError("Camera access denied or not available. Please use manual input.");
      console.error("Camera error:", err);
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onScan(manualInput.trim());
      setManualInput("");
    }
  };

  // Mock QR detection (in real app, use qr-scanner library)
  const simulateQRDetection = () => {
    const mockQRData = `TOURIST_QR_${Date.now()}`;
    onScan(mockQRData);
    stopScanning();
  };

  useEffect(() => {
    return () => {
      stopScanning(); // Cleanup on unmount
    };
  }, []);

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">QR Code Scanner</h2>
        <p className="text-slate-300">
          Scan QR codes from agencies, checkpoints, or tourist spots
        </p>
      </div>

      {/* Camera Scanner */}
      <div className="mb-6 p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="ScanLine" size={20} />
          Camera Scanner
        </h3>
        
        {!isScanning ? (
          <div className="text-center">
            <div className="w-48 h-48 mx-auto mb-4 bg-slate-600 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-500">
              <Icon name="ScanLine" size={48} className="text-slate-400" />
            </div>
            <button
              onClick={startScanning}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors"
            >
              Start Camera Scanner
            </button>
            {error && (
              <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <div className="relative w-full max-w-sm mx-auto mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-black rounded-xl object-cover"
              />
              <div className="absolute inset-0 border-2 border-emerald-500 rounded-xl pointer-events-none">
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-500"></div>
                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-500"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-500"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-500"></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={simulateQRDetection}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm"
              >
                Simulate QR Detection
              </button>
              <button
                onClick={stopScanning}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
              >
                Stop Scanner
              </button>
            </div>
            <p className="text-slate-400 text-sm mt-2">
              Point your camera at a QR code to scan
            </p>
          </div>
        )}
      </div>

      {/* Manual Input */}
      <div className="p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Plus" size={20} />
          Manual Input
        </h3>
        <form onSubmit={handleManualSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Enter QR Code Data
            </label>
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Paste or type QR code data here..."
              className="w-full p-3 rounded-lg bg-slate-600 border border-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={!manualInput.trim()}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            Process QR Data
          </button>
        </form>
      </div>

      {/* Quick QR Examples */}
      <div className="mt-6 p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg font-semibold mb-4">Quick Test QR Codes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onScan("AGENCY_CHECKIN_HERITAGE_TOURS")}
            className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-left transition-colors"
          >
            <div className="font-medium">Agency Check-in</div>
            <div className="text-xs text-blue-200">Heritage Tours Kolkata</div>
          </button>
          <button
            onClick={() => onScan("CHECKPOINT_VICTORIA_MEMORIAL")}
            className="p-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-left transition-colors"
          >
            <div className="font-medium">Checkpoint</div>
            <div className="text-xs text-purple-200">Victoria Memorial</div>
          </button>
        </div>
      </div>
    </div>
  );
}