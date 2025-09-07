// src/components/common/QRScanner.jsx
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
        video: { facingMode: "environment" }, // back camera on mobile
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
      streamRef.current.getTracks().forEach((track) => track.stop());
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

  // Mock QR detection (replace with real qr-scanner lib later)
  const simulateQRDetection = () => {
    const mockQRData = `TOURIST_QR_${Date.now()}`;
    onScan(mockQRData);
    stopScanning();
  };

  useEffect(() => {
    return () => stopScanning(); // cleanup
  }, []);

  return (
    <div className="p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Icon name="ScanLine" size={20} /> QR Code Scanner
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
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
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

      {/* Manual Input as Fallback */}
      <form onSubmit={handleManualSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          placeholder="Enter code manually"
          className="flex-1 px-3 py-2 rounded-lg bg-slate-800 border border-slate-600 text-sm"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg text-sm font-medium"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
