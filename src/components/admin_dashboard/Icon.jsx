import * as LucideIcons from "lucide-react";

function Icon({ name, size = 18, className = "" }) {
  const Comp = LucideIcons[name];
  const emojiMap = {
    MapPin: "📍",
    ListChecks: "📋",
    User: "👤",
    QrCode: "🔲",
    Users: "👥",
    ScanLine: "📱",
    Plus: "➕",
    Eye: "👁️",
    Settings: "⚙️",
  };

  if (Comp) {
    try {
      return <Comp size={size} className={className} />;
    } catch (e) {
      // fallback to emoji
    }
  }

  return (
    <span style={{ fontSize: size, lineHeight: 1 }} className={className}>
      {emojiMap[name] || "🔘"}
    </span>
  );
}

export default Icon;
