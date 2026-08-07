import { useState } from "react";
import { Loader2, User, Phone, MapPin, ChevronDown, Check } from "lucide-react";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

const WEBHOOK_URL = "https://n8nwebhook.server2.wolframe.app/webhook/desentupidora-canis";
const WHATSAPP_NUMBER = "5516976158102";

const AD_STATUS_OPTIONS = [
  { value: "google", label: "Sim, no Google Ads" },
  { value: "meta", label: "Sim, na Meta / Instagram" },
  { value: "ambos", label: "Sim, nos dois" },
  { value: "nao", label: "Ainda não anuncio" },
];

function pushEvent(event: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event });
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 11)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  return value;
}

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [adStatus, setAdStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const rawPhone = phone.replace(/\D/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Por favor, informe seu nome.");
    if (rawPhone.length < 10) return setError("Informe um número de WhatsApp válido.");
    if (!city.trim()) return setError("Informe a cidade/estado onde sua desentupidora atende.");
    if (!adStatus) return setError("Selecione se você já anuncia atualmente.");

    setLoading(true);

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          whatsapp: rawPhone,
          cidade: city.trim(),
          anuncia: adStatus,
        }),
      });
    } catch {
      // no-cors may throw — continue to redirect anyway
    }

    pushEvent("lead-desentupidora-enviado");

    const statusLabel = AD_STATUS_OPTIONS.find((o) => o.value === adStatus)?.label ?? adStatus;
    const msg = encodeURIComponent(
      `Oi, sou o ${name.trim()}, da desentupidora em ${city.trim()}. Quero agendar uma conversa sobre marketing para minha empresa. ${statusLabel}.`
    );
    window.open(`https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${msg}`, "_blank", "noopener");

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {/* Name */}
      <div className="relative">
        <label htmlFor="lead-name" className="sr-only">Seu nome</label>
        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" aria-hidden="true" />
        <input
          id="lead-name"
          type="text"
          placeholder="Seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white/5 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all"
          disabled={loading}
          autoComplete="name"
        />
      </div>

      {/* WhatsApp */}
      <div className="relative">
        <label htmlFor="lead-phone" className="sr-only">WhatsApp (DDD + número)</label>
        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" aria-hidden="true" />
        <input
          id="lead-phone"
          type="tel"
          placeholder="WhatsApp (DDD + número)"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          className="w-full bg-white/5 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all"
          disabled={loading}
          autoComplete="tel"
        />
      </div>

      {/* Cidade / Estado */}
      <div className="relative">
        <label htmlFor="lead-city" className="sr-only">Cidade / Estado onde atende</label>
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" aria-hidden="true" />
        <input
          id="lead-city"
          type="text"
          placeholder="Cidade / Estado onde atende"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full bg-white/5 border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:bg-white/8 transition-all"
          disabled={loading}
          autoComplete="address-level2"
        />
      </div>

      {/* Você já anuncia atualmente? */}
      <fieldset className="space-y-3 pt-1 border-none p-0 m-0">
        <legend className="text-sm text-white/80 ml-1">Você já anuncia atualmente?</legend>
        <div className="space-y-2">
          {AD_STATUS_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                adStatus === opt.value
                  ? "border-primary bg-primary/10"
                  : "border-border/50 bg-white/5 hover:bg-white/10"
              }`}
            >
              <input
                type="radio"
                name="ad-status"
                value={opt.value}
                checked={adStatus === opt.value}
                onChange={(e) => setAdStatus(e.target.value)}
                className="w-4 h-4 accent-primary flex-shrink-0 cursor-pointer"
                disabled={loading}
              />
              <span className="text-sm text-white flex-1">{opt.label}</span>
              {adStatus === opt.value && <Check className="w-4 h-4 text-primary" aria-hidden="true" />}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Error */}
      {error && (
        <p className="text-red-400 text-xs text-center animate-in fade-in duration-200" role="alert">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-shimmer glow-primary rounded-xl py-4 text-primary-foreground font-bold text-base flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:pointer-events-none"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Enviando...
          </>
        ) : (
          <>
            <WhatsAppIcon className="w-5 h-5" aria-hidden="true" />
            Agendar minha conversa gratuita
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        Leva menos de 1 minuto. 🔒 Seus dados estão seguros. Ao enviar, você concorda com nossa{" "}
        <a href="/politica-de-privacidade" className="underline hover:text-primary transition-colors">
          política de privacidade
        </a>.
      </p>
    </form>
  );
}
