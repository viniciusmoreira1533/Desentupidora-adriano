import { useEffect, useState, useCallback, lazy, Suspense } from "react";
import canisLogoSm from "@/assets/canis_logo_sm.webp";
import { Menu, Search, MapPin, Phone, MessageSquare, Check, X, TrendingUp, Clock, Zap } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { handleSpotlight } from "@/lib/spotlight";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import LeadForm from "@/components/LeadForm";
import GooglePartnerBadge from "@/components/GooglePartnerBadge";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const GoogleReviewsWidget = lazy(() => import("@/components/GoogleReviewsWidget"));

const scrollToForm = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "clicou no CTA" });
  document.getElementById("agende")?.scrollIntoView({ behavior: "smooth" });
};

const navLinks = [
  { label: "Início", href: "inicio" },
  { label: "Método", href: "metodo" },
  { label: "Avaliações", href: "avaliacoes" },
  { label: "FAQ", href: "faq" },
];

/* ─── DATA ─── */

const pains = [
  "Quando alguém tem um vaso entupido ou retorno de esgoto, não pesquisa por semanas para decidir — abre o Google e liga para o primeiro resultado que transmite confiança.",
  "Se sua desentupidora não aparece no topo, o chamado vai para o concorrente — mesmo que ele atenda pior.",
  "Agências genéricas tratam desentupidora como \"negócio local comum\": entregam cliques de curiosos, não chamados de emergência.",
];

const phases = [
  {
    icon: MapPin,
    num: "01",
    title: "Google Maps e Perfil da Empresa dominante",
    subtitle: "Seja encontrado quando alguém procura desentupidora perto dele",
    desc: "Otimizamos seu Perfil da Empresa no Google (antigo Google Meu Negócio) para as buscas locais e o mapa da sua cidade.",
    items: [
      "Posicionamento no mapa da sua região",
      "Serviços, áreas atendidas e fotos",
      "Estratégia de avaliações reais positivas",
      "Acompanhamento da reputação do perfil",
    ],
    highlight: "Entre duas desentupidoras próximas, avaliações, presença e confiança decidem o cliente.",
  },
  {
    icon: Search,
    num: "02",
    title: "Google Ads cirúrgico + página de alta conversão",
    subtitle: "Apareça no momento em que alguém precisa contratar",
    desc: "Criamos campanhas para quem pesquisa \"desentupidora perto de mim\", \"desentupidora 24 horas\", \"desentupir vaso urgente\" — e filtramos o que só gasta orçamento.",
    items: [
      "Termos sem intenção, regiões erradas e horários fracos eliminados",
      "Página de vendas rápida no celular, com WhatsApp e ligação em destaque",
      "Custo por chamado monitorado e otimizado semana a semana",
      "Rastreamento de conversões de ponta a ponta",
    ],
    highlight: "A pessoa pesquisou. Encontrou você. Entendeu que você resolve. O contato precisa ser inevitável.",
  },
  {
    icon: TrendingUp,
    num: "03",
    title: "Meta Ads para ampliar (camada complementar)",
    subtitle: "Não precisamos esperar todas as pessoas procurarem sua empresa",
    desc: "Com a estrutura principal funcionando, ativamos Facebook e Instagram para gerar oportunidades extras na sua região de atendimento.",
    items: [
      "Campanhas direcionadas ao seu raio de atendimento",
      "Serviços e ofertas em destaque para quem ainda não te conhece",
      "Mais volume de chamadas somando ao Google",
    ],
    highlight: "Google captura a demanda que existe. Meta cria novas. Os dois trabalham juntos.",
  },
];

const faqs = [
  {
    q: "A Canis realmente trabalha com desentupidoras?",
    a: "Sim. A Canis é agência Google Partner e já trabalha com o mercado de desentupimento, conhecendo as particularidades de campanhas para serviços emergenciais — onde localização, intenção de busca, velocidade de atendimento e custo por chamado fazem toda a diferença.",
  },
  {
    q: "Google Ads funciona para desentupidora?",
    a: "É um dos principais canais de aquisição do nicho, porque você aparece exatamente quando a pessoa pesquisa por um serviço de desentupimento. O resultado depende da concorrência da região, da estrutura da campanha e do atendimento — é isso que analisamos na conversa inicial, sem compromisso.",
  },
  {
    q: "Vocês cuidam do Google Meu Negócio?",
    a: "Sim. Otimizamos o Perfil da Empresa no Google (antigo Google Meu Negócio) para aumentar sua presença nas pesquisas locais e no Google Maps, incluindo serviços, áreas atendidas e estratégia de avaliações.",
  },
  {
    q: "Vocês criam a página para anunciar?",
    a: "Sim. Desenvolvemos landing pages de alta conversão pensadas para campanhas de desentupidora: carregamento rápido no celular, botão de WhatsApp e ligação direta em destaque, avaliações e atendimento 24h em evidência.",
  },
  {
    q: "Já tenho Google Ads. Vocês podem assumir minha conta?",
    a: "Sim. Primeiro analisamos a estrutura atual — termos, regiões, rastreamento — e identificamos o que pode ser mantido, corrigido ou reconstruído para melhorar seu custo por chamado.",
  },
  {
    q: "Quanto preciso investir em anúncios?",
    a: "Varia conforme cidade, raio de atendimento, concorrência e serviços anunciados. Na conversa inicial analisamos sua região e definimos uma faixa de investimento coerente com sua operação.",
  },
];

/* ─── REVEAL SECTION WRAPPER ─── */
function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ─── SCROLL PROGRESS BAR ─── */
function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (scrollProgress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-[3px] bg-primary transition-[width] duration-150 ease-out"
      style={{
        width: `${scrollProgress}%`,
        boxShadow: "0 0 8px hsl(var(--primary) / 0.6)",
      }}
    />
  );
}

/* ─── MAIN PAGE ─── */
const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      { rootMargin: "-100px 0px -40% 0px", threshold: [0, 0.25, 0.5] }
    );

    ["faq", "avaliacoes", "metodo", "inicio"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ScrollProgressBar />
      {/* ─── HEADER ─── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <img src={canisLogoSm} alt="Logo Canis Marketing - Agência de Tráfego Pago" className="h-10" width="40" height="40" />

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm transition-colors ${
                  activeSection === link.href
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToForm}
              className="btn-shimmer text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <WhatsAppIcon className="w-4 h-4" />
              QUERO MAIS CHAMADOS
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Menu de navegação"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden glass-card border-t border-border/50 px-4 py-4 flex flex-col gap-3 animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm text-left py-2 px-3 rounded-lg transition-colors ${
                  activeSection === link.href
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section id="inicio" className="relative pt-28 pb-24 md:pt-36 md:pb-28 px-4 overflow-hidden">
        <div className="absolute inset-0 tech-grid" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsla(130,55%,40%,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsla(250,40%,55%,0.1)_0%,_transparent_50%)]" />

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <p className="hero-enter hero-enter-1 tag-glow text-xs md:text-sm font-medium mb-6 px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-[hsl(130,65%,68%)]">
              🏅 Google Partner — especialistas em anúncios para desentupidoras
            </p>

            <h1 className="hero-enter hero-enter-2 text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold leading-tight mb-6 text-white max-w-3xl">
              Quando o cano estoura às 3h da manhã, quem aparece no Google{" "}
              <span className="text-gradient-primary">leva o chamado.</span>
            </h1>

            <p className="hero-enter hero-enter-3 text-base md:text-lg max-w-2xl mb-8 leading-relaxed text-primary-foreground">
              Sua desentupidora some do Google quando o cliente mais precisa? A Canis estrutura seu
              Google Maps, roda Google Ads otimizados para chamada e WhatsApp e turbina com Meta Ads —
              para seu telefone tocar todo dia.
            </p>

            <div className="hero-enter hero-enter-4 mb-6 w-full sm:w-auto">
              <button
                onClick={scrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-shimmer glow-primary rounded-xl px-8 py-4 text-primary-foreground font-bold text-base md:text-lg"
              >
                <WhatsAppIcon className="w-6 h-6" />
                QUERO MAIS CHAMADOS PARA MINHA DESENTUPIDORA ↓
              </button>
            </div>

            <div className="hero-enter hero-enter-5 flex items-center gap-2 md:gap-3 flex-wrap justify-center mb-8 text-xs md:text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Google Maps</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Google Ads</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Página de Alta Conversão</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-primary" /> Meta Ads</span>
            </div>

            <GooglePartnerBadge size="md" withCaption className="hero-enter hero-enter-6 mb-10" />

            <div className="hero-enter hero-enter-7 w-full max-w-xl overflow-hidden">
              <p className="text-xs md:text-sm text-muted-foreground mb-4 tracking-widest uppercase">
                Gestão oficial nas principais plataformas
              </p>
              <div className="marquee-track relative" style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}>
                <div className="animate-marquee flex items-center gap-12 md:gap-16 w-max">
                  {[0, 1].map((set) => (
                    <div key={set} className="flex items-center gap-12 md:gap-16 shrink-0">
                      <svg className="h-8 md:h-10 text-primary/30" viewBox="0 0 24 24" fill="currentColor" aria-label="Google Ads"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
                      <svg className="h-8 md:h-10 text-primary/30" viewBox="0 0 24 24" fill="currentColor" aria-label="Meta"><path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 008.44-9.9c0-5.53-4.5-10.02-10-10.02z"/></svg>
                      <svg className="h-8 md:h-10 text-primary/30" viewBox="0 0 24 24" fill="currentColor" aria-label="LinkedIn"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── DOR ─── */}
      <section className="section-alt py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <RevealSection>
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-white">
              Marketing para desentupidora é diferente de marketing para{" "}
              <span className="text-gradient-primary">empresa comum.</span>
            </h2>
          </RevealSection>
          <div className="space-y-5 mt-10 stagger-children">
            {pains.map((p, i) => (
              <RevealSection key={i}>
                <div className="glass-card rounded-xl p-6 flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{p}</p>
                </div>
              </RevealSection>
            ))}
          </div>
          <RevealSection>
            <p className="text-center text-lg md:text-xl font-bold mt-10 text-white">
              Não queremos gerar acessos ao seu site.{" "}
              <span className="text-gradient-primary">Queremos gerar chamados.</span>
            </p>
          </RevealSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── MÉTODO 3 FASES ─── */}
      <section id="metodo" className="py-16 md:py-24 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsla(250,40%,55%,0.06)_0%,_transparent_50%)]" />
        <div className="container mx-auto max-w-5xl relative z-10">
          <RevealSection>
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-white">
              A estrutura que montamos: <span className="text-gradient-primary">3 frentes, 1 objetivo</span> — seu telefone tocando.
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Do perfil no Google até a última otimização de campanha, cada etapa é desenhada para transformar urgência em contato.
            </p>
          </RevealSection>

          <div className="space-y-8">
            {phases.map((phase, i) => (
              <RevealSection key={i}>
                <div
                  className="glass-card rounded-2xl p-8 md:p-10 spotlight-card relative overflow-hidden"
                  onMouseMove={handleSpotlight}
                >
                  <span className="counter-overlay">{phase.num}</span>
                  <div className="relative z-10 grid md:grid-cols-[1fr_1fr] gap-8">
                    <div>
                      <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-5 relative pulse-ring">
                        <phase.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">{phase.title}</h3>
                      <p className="text-xs text-primary font-medium mb-3">{phase.subtitle}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{phase.desc}</p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <ul className="space-y-3 mb-5">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-sm font-semibold text-primary/90 border-l-2 border-primary/40 pl-4">
                        {phase.highlight}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection className="text-center mt-12">
            <button onClick={scrollToForm} className="btn-shimmer glow-primary rounded-xl px-8 py-4 text-primary-foreground font-bold text-base md:text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mx-auto">
              <WhatsAppIcon className="w-6 h-6" />
              Montar minha estrutura de chamados →
            </button>
          </RevealSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── PROVA SOCIAL + AVALIAÇÕES GMB ─── */}
      <section id="avaliacoes" className="section-alt py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <RevealSection>
            <div className="flex flex-col items-center mb-10">
              <GooglePartnerBadge size="lg" className="mb-4" />
              <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-white">
                Não confie em promessas. Confie em quem{" "}
                <span className="text-gradient-primary">o Google certifica.</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto">
                A Canis já gerencia campanhas para desentupidoras e conhece o nicho: ligação perdida é serviço perdido,
                palavra-chave errada come orçamento. Acompanhamos o que importa — investimento, oportunidades geradas
                e custo por chamado.
              </p>
            </div>
          </RevealSection>
          <RevealSection>
            <Suspense fallback={<div className="h-[400px] flex items-center justify-center">Carregando avaliações...</div>}>
              <GoogleReviewsWidget />
            </Suspense>
          </RevealSection>
          <RevealSection className="text-center mt-12">
            <button onClick={scrollToForm} className="btn-shimmer glow-primary rounded-xl px-8 py-4 text-primary-foreground font-bold text-base md:text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mx-auto">
              <WhatsAppIcon className="w-6 h-6" />
              Quero resultados assim para minha desentupidora →
            </button>
          </RevealSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── SEGMENTAÇÃO ─── */}
      <section className="py-16 md:py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl">
          <RevealSection>
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-12 text-white">
              Já anuncia e não está satisfeito? Ou nunca anunciou?{" "}
              <span className="text-gradient-primary">Os dois caminhos passam por aqui.</span>
            </h2>
          </RevealSection>
          <div className="grid md:grid-cols-2 gap-6 stagger-children">
            <RevealSection>
              <div className="glass-card-red rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-lg bg-red-500/15 flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-bold mb-4">Já anuncia e não está satisfeito?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-muted-foreground">Gasta muito e gera poucos chamados</span></li>
                  <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-muted-foreground">Custo por contato alto demais</span></li>
                  <li className="flex items-start gap-3"><X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" /><span className="text-sm text-muted-foreground">Sem rastreamento de conversões</span></li>
                </ul>
                <p className="text-sm mt-5 text-muted-foreground leading-relaxed">
                  Não significa que o Google Ads não funciona para sua região.{" "}
                  <strong className="text-foreground">Analisamos sua conta e mostramos onde está o problema.</strong>
                </p>
              </div>
            </RevealSection>
            <RevealSection>
              <div className="glass-card rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-lg bg-primary/15 flex items-center justify-center mb-5">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-4">Nunca anunciou?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /><span className="text-sm text-muted-foreground">Estruturamos tudo do zero: perfil, campanhas e página</span></li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /><span className="text-sm text-muted-foreground">Explicamos tudo de forma simples, sem jargão</span></li>
                  <li className="flex items-start gap-3"><Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" /><span className="text-sm text-muted-foreground">Você continua fazendo o que sabe: atender os chamados</span></li>
                </ul>
                <p className="text-sm mt-5 text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Nós trabalhamos para os chamados chegarem.</strong>
                </p>
              </div>
            </RevealSection>
          </div>
          <RevealSection className="text-center mt-12">
            <button onClick={scrollToForm} className="btn-shimmer glow-primary rounded-xl px-8 py-4 text-primary-foreground font-bold text-base md:text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mx-auto">
              <MessageSquare className="w-6 h-6" />
              Quero uma análise →
            </button>
          </RevealSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── FAQ ─── */}
      <section id="faq" className="section-alt py-16 md:py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <RevealSection>
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-4 text-white">
              Perguntas frequentes de quem <span className="text-gradient-primary">quer mais chamados.</span>
            </h2>
          </RevealSection>
          <RevealSection>
            <Accordion type="single" collapsible className="space-y-3 mt-10">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="glass-card rounded-xl px-6 border-none">
                  <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </RevealSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ─── FORMULÁRIO ─── */}
      <section id="agende" className="py-16 md:py-32 px-4 relative">
        <div className="absolute inset-0 tech-grid-dense opacity-40" />
        <div className="container mx-auto max-w-3xl relative z-10">
          <RevealSection>
            <div className="glass-card p-8 md:p-12 rounded-3xl border border-primary/20" style={{ boxShadow: "0 0 80px hsla(130, 55%, 40%, 0.15)" }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-white">
                  Sua próxima chamada pode estar procurando uma desentupidora <span className="text-gradient-primary">agora.</span>
                </h2>
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  A questão é qual empresa ela vai encontrar primeiro. Agende uma conversa gratuita:
                  analisamos sua região, entendemos sua operação e mostramos qual estrutura faz sentido para a sua captação.
                </p>
              </div>
              <LeadForm />
            </div>
          </RevealSection>
        </div>
      </section>

      <FloatingWhatsApp onClick={scrollToForm} />

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border/50 py-8 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center gap-3 md:items-start">
            <img src={canisLogoSm} alt="Logo Canis Marketing - Agência de Tráfego Pago" className="h-8 opacity-60" width="32" height="32" loading="lazy" />
            <GooglePartnerBadge size="sm" />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Canis Marketing. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
