import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

interface Props {
  onClick: () => void;
}

export default function FloatingWhatsApp({ onClick }: Props) {
  const [formVisible, setFormVisible] = useState(false);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => {
    const formSection = document.getElementById("agende");
    const heroSection = document.getElementById("inicio");
    if (!formSection || !heroSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === "agende") setFormVisible(entry.isIntersecting);
          if (entry.target.id === "inicio") setHeroVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.08 },
    );

    observer.observe(formSection);
    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`floating-whatsapp-wrap fixed bottom-6 right-6 z-[150] flex flex-col items-end gap-3 ${formVisible || heroVisible ? "floating-whatsapp-hidden" : ""}`}>
      {/* Preview message bubble */}
      <div
        className="floating-whatsapp-preview bg-[#1a1a1a] border border-primary/30 text-white text-xs rounded-2xl rounded-br-sm px-4 py-2.5 shadow-lg max-w-[200px] text-right animate-in slide-in-from-bottom-2 duration-500"
        style={{ animationDelay: "3s", opacity: 0, animationFillMode: "forwards" }}
      >
        <p className="font-medium">Agende uma conversa! 👋</p>
        <p className="text-muted-foreground mt-0.5">Resposta em minutos</p>
      </div>

      {/* Floating button */}
      <button
        id="floating-whatsapp-btn"
        onClick={onClick}
        aria-label="Falar com a Canis no WhatsApp"
        className="group relative w-14 h-14 rounded-full bg-primary shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
        style={{
          boxShadow: "0 0 0 0 hsla(130, 55%, 50%, 0.7)",
          animation: "bubble-breathe 2s ease-in-out infinite",
        }}
      >
        <WhatsAppIcon className="w-8 h-8 text-primary-foreground fill-current" />
      </button>
    </div>
  );
}
