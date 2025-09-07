import React from "react";
import Icon from "../admin_dashboard/Icon.jsx";

export default function ContactHelp({ currentAgency }) {
  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleEmail = (email) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const handleWhatsApp = (number) => {
    const cleanNumber = number.replace(/[^\d]/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const emergencyContacts = [
    { name: "Police", number: "100", icon: "Settings", color: "red" },
    { name: "Ambulance", number: "108", icon: "Settings", color: "red" },
    { name: "Fire Brigade", number: "101", icon: "Settings", color: "red" },
    { name: "Tourist Helpline", number: "1363", icon: "Settings", color: "blue" },
  ];

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Contact & Help</h2>
        <p className="text-slate-300">
          Get assistance from your agency or emergency services
        </p>
      </div>

      {/* Current Agency Contact */}
      <div className="mb-6 p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Users" size={20} />
          Your Travel Agency
        </h3>
        <div className="space-y-4">
          <div>
            <div className="font-medium text-lg">{currentAgency.name}</div>
            <div className="text-sm text-slate-400">Your assigned travel partner</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleCall(currentAgency.contact)}
              className="flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <Icon name="Phone" size={18} />
              <span className="font-medium">Call Now</span>
            </button>
            <button
              onClick={() => handleWhatsApp(currentAgency.contact)}
              className="flex items-center justify-center gap-2 p-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <Icon name="MessageCircle" size={18} />
              <span className="font-medium">WhatsApp</span>
            </button>
            <button
              onClick={() => handleEmail(currentAgency.email)}
              className="flex items-center justify-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Icon name="Mail" size={18} />
              <span className="font-medium">Email</span>
            </button>
          </div>

          <div className="text-sm text-slate-400 space-y-1">
            <div>📞 {currentAgency.contact}</div>
            <div>✉️ {currentAgency.email}</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-emerald-300">Available 24/7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mb-6 p-4 md:p-6 bg-red-500/10 border border-red-500/20 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-red-300">
          <Icon name="AlertTriangle" size={20} />
          Emergency Contacts
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {emergencyContacts.map((contact) => (
            <button
              key={contact.name}
              onClick={() => handleCall(contact.number)}
              className={`p-3 rounded-lg transition-colors text-center ${
                contact.color === "red"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Icon name={contact.icon} size={20} className="mx-auto mb-1" />
              <div className="font-medium text-sm">{contact.name}</div>
              <div className="text-xs opacity-80">{contact.number}</div>
            </button>
          ))}
        </div>
        <p className="text-red-300 text-sm mt-3 text-center">
          ⚠️ Use emergency numbers only in case of actual emergencies
        </p>
      </div>

      {/* FAQ Section */}
      <div className="p-4 md:p-6 bg-slate-700 rounded-xl border border-slate-600">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="HelpCircle" size={20} />
          Frequently Asked Questions
        </h3>
        <div className="space-y-4">
          {[
            {
              question: "How do I scan QR codes at checkpoints?",
              answer: "Use the QR Scanner from the main menu. Point your camera at the QR code or enter the code manually."
            },
            {
              question: "What should I do if I get lost?",
              answer: "Use the red panic button for immediate help, or contact your agency directly using the contact options above."
            },
            {
              question: "How do I update my travel itinerary?",
              answer: "Go to 'My Itinerary' from the menu to add, remove, or mark destinations as completed."
            },
            {
              question: "Can I change my personal information?",
              answer: "Yes, go to 'My Profile' to update your contact details, address, and other information."
            }
          ].map((faq, index) => (
            <details key={index} className="group">
              <summary className="cursor-pointer p-3 bg-slate-600 rounded-lg hover:bg-slate-500 transition-colors">
                <span className="font-medium">{faq.question}</span>
              </summary>
              <div className="mt-2 p-3 text-sm text-slate-300 bg-slate-600/50 rounded-lg">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* App Info */}
      <div className="mt-6 p-4 bg-slate-700/50 rounded-xl border border-slate-600">
        <div className="text-center text-sm text-slate-400">
          <div className="mb-2">SmartTourist App v1.0</div>
          <div>For technical support: support@smarttourist.com</div>
        </div>
      </div>
    </div>
  );
}