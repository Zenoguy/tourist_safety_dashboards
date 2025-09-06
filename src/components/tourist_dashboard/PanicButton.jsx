import React, { useState } from "react";
import { motion } from "framer-motion";

export default function PanicButton({ onPanic }) {
  const [isPressed, setIsPressed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handlePanicPress = () => {
    if (countdown > 0) return; // Prevent multiple clicks during countdown
    
    setIsPressed(true);
    setCountdown(3);
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onPanic();
          setIsPressed(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelPanic = () => {
    setIsPressed(false);
    setCountdown(0);
  };

  return (
    <>
      {/* Floating Panic Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={handlePanicPress}
          disabled={countdown > 0}
          className={`w-16 h-16 md:w-20 md:h-20 rounded-full shadow-2xl font-bold text-white transition-all duration-200 ${
            isPressed
              ? "bg-orange-600 scale-110"
              : "bg-red-600 hover:bg-red-700 hover:scale-105"
          }`}
          whileTap={{ scale: 0.95 }}
          animate={isPressed ? { 
            boxShadow: [
              "0 0 0 0 rgba(239, 68, 68, 0.7)",
              "0 0 0 20px rgba(239, 68, 68, 0)",
            ]
          } : {}}
          transition={isPressed ? { 
            duration: 1, 
            repeat: Infinity,
            ease: "easeOut"
          } : {}}
        >
          {countdown > 0 ? (
            <span className="text-2xl">{countdown}</span>
          ) : (
            <span className="text-xl">🚨</span>
          )}
        </motion.button>
      </motion.div>

      {/* Panic Confirmation Modal */}
      {isPressed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-red-600 p-6 md:p-8 rounded-2xl text-white text-center max-w-sm w-full border-4 border-red-400"
          >
            <div className="text-6xl mb-4">🚨</div>
            <h2 className="text-2xl font-bold mb-2">EMERGENCY ALERT</h2>
            <p className="mb-4">
              Sending alert to agency and authorities in
            </p>
            <div className="text-6xl font-bold mb-4 text-yellow-300">
              {countdown}
            </div>
            <button
              onClick={cancelPanic}
              className="w-full py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              CANCEL
            </button>
            <p className="text-sm mt-3 opacity-80">
              Only use in real emergencies
            </p>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}