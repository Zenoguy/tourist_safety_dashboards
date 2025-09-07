import React, { useState } from "react";
import Icon from "../admin_dashboard/Icon.jsx";
import QRScanner from "../common/QRScanner.jsx"; // <-- your scanner component

export default function CustomerDetails({ customer, onUpdateVerification }) {
  const [scanResult, setScanResult] = useState("");

  if (!customer) {
    return (
      <div className="p-4 lg:p-6 h-full flex items-center justify-center">
        <div className="text-center text-slate-400">
          <Icon name="User" size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg mb-2">Select a customer</p>
          <p className="text-sm">Choose a customer to view details</p>
        </div>
      </div>
    );
  }

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
      onUpdateVerification(customer.id, true);
      alert("✅ Customer verified successfully via QR!");
    }
  };

  const handleManualVerify = () => {
    onUpdateVerification(customer.id, true);
    alert("✅ Customer manually verified!");
  };

  return (
    <div className="p-4 lg:p-6 h-full overflow-y-auto">
      {/* Customer Info */}
      <div className="mb-6">
        <h2 className="text-xl lg:text-2xl font-semibold mb-2">Customer Details</h2>
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
            customer.verified
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
          }`}
        >
          <Icon name={customer.verified ? "CheckCircle" : "Clock"} size={14} />
          {customer.verified ? "Verified" : "Pending Verification"}
        </div>
      </div>

      {/* Customer Info Card */}
      <div className="mb-6 p-4 bg-slate-700 rounded-xl border border-slate-600">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center font-bold text-white text-xl">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{customer.name}</h3>
            <p className="text-sm text-slate-400">Customer ID: {customer.id}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={16} className="text-slate-400" />
            <div>
              <div className="text-sm font-medium">Pickup Time</div>
              <div className="text-sm text-slate-300">{customer.pickupTime}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Icon name="MapPin" size={16} className="text-slate-400" />
            <div>
              <div className="text-sm font-medium">Pickup Location</div>
              <div className="text-sm text-slate-300">{customer.pickupLocation}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Icon name="Phone" size={16} className="text-slate-400" />
            <div>
              <div className="text-sm font-medium">Phone Number</div>
              <div className="text-sm text-slate-300">{customer.phone}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Section */}
      <div className="mb-6 p-4 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Shield" size={18} />
          Verify Pickup
        </h3>

        {customer.verified ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-emerald-400" />
            </div>
            <p className="text-emerald-300 font-medium mb-2">Customer Verified ✅</p>
            <p className="text-xs text-slate-400">
              Verified at: {new Date(customer.verifiedAt).toLocaleString()}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* QR Scanner */}
            <QRScanner onScan={handleScan} />

            {/* Manual Verification */}
            <button
              onClick={handleManualVerify}
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="UserCheck" size={18} />
              Manual Verification
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 space-y-3">
        <button
          onClick={() => window.open(`tel:${customer.phone}`, "_self")}
          className="w-full py-3 px-4 bg-slate-600 hover:bg-slate-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Icon name="Phone" size={18} />
          Call Customer
        </button>

        <button
          onClick={() =>
            window.open(
              `https://maps.google.com/?q=${encodeURIComponent(
                customer.pickupLocation
              )}`,
              "_blank"
            )
          }
          className="w-full py-3 px-4 bg-slate-600 hover:bg-slate-500 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Icon name="MapPin" size={18} />
          View Location
        </button>
      </div>
    </div>
  );
}
