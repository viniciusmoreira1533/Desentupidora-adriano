import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import canisLogoSm from "@/assets/canis_logo_sm.webp";
import contactOperationImage from "@/assets/imagens/operacao-chamada.webp";
import localSearchImage from "@/assets/imagens/busca-local.webp";
import {
  ArrowDownRight,
  Check,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  PhoneCall,
  Search,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import GooglePartnerBadge from "@/components/GooglePartnerBadge";
import LeadForm from "@/components/LeadForm";
import { pushDataLayerEvent } from "@/lib/analytics";

const GoogleReviewsWidget = lazy(() => import("@/components/GoogleReviewsWidget"));

const navLinks = [
  { label: "O problema", href: "problema" },
  { label: "Como funciona", href: "metodo" },
  { label: "Resultados", href: "avaliacoes" },
  { label: "Dúvidas", href: "faq" },
];

const phases = [
  {
    number: "01",
    icon: MapPin,
    label: "SER ENCONTRADO",
    title: "Google Maps e Perfil da Empresa dominante",
    text: "Organizamos seu Perfil da Empresa para aumentar a presença nas buscas locais e transformar reputação em confiança.",
    items: [
      "Posicionamento na região atendida",
      "Serviços, áreas e fotos organizados",
      "Estratégia de avaliações reais",
      "Reputação acompanhada de perto",
    ],
  },
  {
    number: "02",
    icon: Search,
    label: "CAPTURAR A URGÊNCIA",
    title: "Google Ads + página que transforma busca em contato",
    text: "Anunciamos para pesquisas com intenção real e levamos o cliente para uma página rápida, clara e pronta para ligação ou WhatsApp.",
    items: [
      "Termos sem intenção eliminados",
      "Regiões e horários mais rentáveis",
      "WhatsApp e ligação em destaque",
      "Custo por chamado rastreado",
    ],
  },
  {
    number: "03",
    icon: TrendingUp,
    label: "AMPLIAR O VOLUME",
    title: "Meta Ads como camada complementar",
    text: "Com a operação principal funcionando, usamos Facebook e Instagram para ampliar presença e gerar oportunidades extras.",
    items: [
      "Campanhas dentro do raio atendido",
      "Serviços e ofertas em destaque",
      "Mais volume somando ao Google",
    ],
  },
];

const faqs = [
  {
    q: "A Canis realmente trabalha com desentupidoras?",
    a: "Sim. A Canis é agência Google Partner e já trabalha com o mercado de desentupimento. Conhecemos as particularidades de campanhas para serviços emergenciais, onde localização, intenção de busca, velocidade de atendimento e custo por chamado fazem toda a diferença.",
  },
  {
    q: "Google Ads funciona para desentupidora?",
    a: "É um dos principais canais de aquisição do nicho porque permite aparecer exatamente quando a pessoa pesquisa pelo serviço. O resultado depende da concorrência local, da estrutura da campanha e do atendimento. É isso que avaliamos na conversa inicial.",
  },
  {
    q: "Vocês cuidam do Google Meu Negócio?",
    a: "Sim. Otimizamos o Perfil da Empresa no Google, antigo Google Meu Negócio, para aumentar a presença nas pesquisas locais e no Google Maps, incluindo serviços, áreas atendidas e estratégia de avaliações.",
  },
  {
    q: "Vocês criam a página para anunciar?",
    a: "Sim. Desenvolvemos uma landing page para campanhas de desentupidora, priorizando celular, velocidade, WhatsApp, ligação direta, regiões atendidas e elementos de confiança.",
  },
  {
    q: "Já tenho Google Ads. Vocês podem assumir minha conta?",
    a: "Sim. Primeiro analisamos termos, regiões, rastreamento e histórico. Depois definimos o que pode ser mantido, corrigido ou reconstruído para melhorar o custo por chamado.",
  },
  {
    q: "Quanto preciso investir em anúncios?",
    a: "Varia conforme cidade, raio de atendimento, concorrência e serviços anunciados. Na conversa inicial analisamos sua região e indicamos uma faixa coerente com a operação.",
  },
];

function HeroCampaignVisual() {
  return (
    <figure className="hero-campaign-visual" aria-labelledby="hero-visual-caption">
      <img
        src={localSearchImage}
        alt="Profissional de desentupimento usando o celular ao lado do veículo e equipamentos de atendimento"
        width="2000"
        height="1500"
        loading="eager"
      />
      <div className="hero-image-wash" aria-hidden="true" />

      <div className="visual-search-card">
        <div className="visual-search-query">
          <Search size={18} aria-hidden="true" />
          <span>desentupidora 24h perto de mim</span>
        </div>
        <div className="visual-search-result">
          <div className="visual-result-pin"><MapPin size={20} aria-hidden="true" /></div>
          <div>
            <small>ANÚNCIO LOCAL</small>
            <strong>Sua empresa no momento certo</strong>
            <span>Atendimento 24h na sua região</span>
          </div>
        </div>
      </div>

      <div className="visual-conversion-path" aria-hidden="true">
        <span />
      </div>

      <div className="visual-call-card">
        <div className="visual-call-icon"><PhoneCall size={20} aria-hidden="true" /></div>
        <div>
          <small>NOVO CONTATO VIA GOOGLE</small>
          <strong>Cliente solicitando atendimento</strong>
          <span>Busca transformada em oportunidade</span>
        </div>
        <i aria-hidden="true" />
      </div>

      <figcaption id="hero-visual-caption">
        <span>Busca com intenção</span><i aria-hidden="true" /><span>Chamado recebido</span>
      </figcaption>
    </figure>
  );
}

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [reviewsReady, setReviewsReady] = useState(false);
  const reviewsTriggerRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((id: string, source = "navegacao") => {
    if (id === "agende") {
      pushDataLayerEvent("clicou no CTA", {
        destino: "formulario_desentupidora",
        origem: source,
      });
    } else {
      pushDataLayerEvent("navegacao_landing_page", {
        destino: id,
        origem: source,
      });
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries.find((entry) => entry.isIntersecting);
        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px" },
    );

    ["inicio", "problema", "metodo", "avaliacoes", "faq"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    document.documentElement.classList.add("reveal-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px" },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

    return () => {
      observer.disconnect();
      revealObserver.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  useEffect(() => {
    const trigger = reviewsTriggerRef.current;
    if (!trigger || reviewsReady) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReviewsReady(true);
        observer.disconnect();
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(trigger);
    return () => observer.disconnect();
  }, [reviewsReady]);

  return (
    <main className="landing-root">
      <header className="site-header">
        <div className="site-header-inner">
          <button className="brand-lockup" onClick={() => scrollToSection("inicio", "logo_header")} aria-label="CANIS — Voltar ao início">
            <img src={canisLogoSm} alt="Canis Marketing" width="42" height="42" />
            <span><strong>CANIS</strong><small>MARKETING PARA DESENTUPIDORAS</small></span>
          </button>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href, "menu_desktop")}
                className={activeSection === link.href ? "active" : ""}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <button className="header-cta" onClick={() => scrollToSection("agende", "header")}>Agendar conversa</button>
            <button
              className="menu-button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label="Abrir menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Navegação mobile">
            {navLinks.map((link) => (
              <button key={link.href} onClick={() => scrollToSection(link.href, "menu_mobile")}>{link.label}</button>
            ))}
            <button className="mobile-nav-cta" onClick={() => scrollToSection("agende", "menu_mobile")}>Agendar conversa</button>
          </nav>
        )}
      </header>

      <section id="inicio" className="hero-section">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span>ESPECIALIDADE CANIS</span> MARKETING PARA DESENTUPIDORAS</div>
            <h1>Mais chamados<br className="hero-title-break" />{" "}para quem resolve<br className="hero-title-break" />{" "}problemas <em>agora.</em></h1>
            <p className="hero-lead">
              Sua desentupidora precisa aparecer quando o cliente pesquisa, transmitir confiança em segundos e facilitar a ligação ou o WhatsApp.
            </p>

            <div className="hero-actions">
              <button className="primary-cta" onClick={() => scrollToSection("agende", "hero")}>
                Quero mais chamados <ArrowDownRight size={20} />
              </button>
              <a
                className="text-cta"
                href="#metodo"
                onClick={() => pushDataLayerEvent("navegacao_landing_page", { destino: "metodo", origem: "hero" })}
              >
                Ver como funciona <span>→</span>
              </a>
            </div>

            <div className="hero-proof">
              <div className="proof-partner"><GooglePartnerBadge size="sm" /></div>
              <div className="proof-copy">
                <strong>Agência Google Partner</strong>
                <span>Certificação oficial e experiência real com o segmento</span>
              </div>
            </div>
          </div>

          <HeroCampaignVisual />
        </div>
      </section>

      <section id="problema" className="problem-section">
        <div className="section-shell">
          <div className="editorial-heading" data-reveal>
            <span className="section-index">01 / O MERCADO</span>
            <h2>Seu cliente não está pesquisando.<br /><em>Ele precisa resolver.</em></h2>
          </div>

          <div className="urgency-sequence" data-reveal>
            <article>
              <span>01</span>
              <div className="sequence-icon"><Zap size={26} /></div>
              <h3>Existe um problema</h3>
              <p>Vaso entupido, retorno de esgoto ou tubulação obstruída. A necessidade já existe.</p>
            </article>
            <article>
              <span>02</span>
              <div className="sequence-icon"><Clock3 size={26} /></div>
              <h3>Existe urgência</h3>
              <p>O cliente não quer comparar durante dias. Quer uma empresa confiável que responda agora.</p>
            </article>
            <article>
              <span>03</span>
              <div className="sequence-icon"><Search size={26} /></div>
              <h3>Existe uma busca</h3>
              <p>Ele abre o Google, procura “desentupidora perto de mim” e escolhe entre quem aparece.</p>
            </article>
          </div>

          <div className="problem-manifesto" data-reveal>
            <div>
              <small>O TRABALHO DA CANIS</small>
              <strong>Colocar sua empresa antes do concorrente e remover qualquer atrito até o contato.</strong>
            </div>
            <div className="manifesto-result">
              <span>Não buscamos</span>
              <s>mais acessos</s>
              <strong>Buscamos mais chamados.</strong>
            </div>
          </div>
        </div>
      </section>

      <section id="metodo" className="method-section">
        <div className="section-shell">
          <div className="method-heading" data-reveal>
            <div>
              <span className="section-index light">02 / A ESTRUTURA</span>
              <h2>Três frentes.<br /><em>Um telefone tocando.</em></h2>
            </div>
            <p>Uma rota simples para capturar demanda local, converter urgência e ampliar volume sem perder controle do custo por oportunidade.</p>
          </div>

          <div className="operation-route" data-reveal>
            <div className="route-line" aria-hidden="true" />
            {phases.map((phase) => (
              <article className="phase-row" key={phase.number}>
                <div className="phase-marker">
                  <span>{phase.number}</span>
                  <phase.icon size={24} />
                </div>
                <div className="phase-copy">
                  <small>{phase.label}</small>
                  <h3>{phase.title}</h3>
                  <p>{phase.text}</p>
                </div>
                <ul>
                  {phase.items.map((item) => (
                    <li key={item}><Check size={18} /> {item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="method-cta-row" data-reveal>
            <div><MessageCircle size={24} /><span>Pronto para saber como isso funciona na sua cidade?</span></div>
            <button className="primary-cta" onClick={() => scrollToSection("agende", "metodo")}>Analisar minha região <ArrowDownRight size={20} /></button>
          </div>
        </div>
      </section>

      <section id="avaliacoes" className="proof-section">
        <div className="section-shell">
          <div className="partner-panel" data-reveal>
            <div className="partner-badge-wrap"><GooglePartnerBadge size="lg" /></div>
            <div className="partner-panel-copy">
              <span className="section-index">03 / CREDIBILIDADE</span>
              <h2>Não confie em promessa.<br /><em>Confie em quem o Google certifica.</em></h2>
              <p>A Canis combina certificação oficial e experiência prática com campanhas para desentupidoras. Abaixo estão avaliações reais de clientes da Canis em diferentes segmentos.</p>
              <a href="https://www.google.com/partners/agency?id=9240380245" target="_blank" rel="noreferrer">
                Ver perfil oficial Google Partner →
              </a>
            </div>
          </div>

          <div ref={reviewsTriggerRef}>
            {reviewsReady ? (
              <Suspense fallback={<div className="reviews-loading">Carregando avaliações...</div>}>
                <GoogleReviewsWidget />
              </Suspense>
            ) : (
              <div className="reviews-loading">Avaliações reais da Canis</div>
            )}
          </div>
        </div>
      </section>

      <section className="fit-section">
        <div className="section-shell">
          <div className="editorial-heading compact" data-reveal>
            <span className="section-index">04 / PARA QUEM É</span>
            <h2>Já anuncia ou vai começar?<br /><em>Temos um próximo passo claro.</em></h2>
          </div>

          <div className="fit-grid" data-reveal>
            <article className="fit-card diagnose">
              <div className="fit-card-top"><X size={24} /><span>DIAGNÓSTICO</span></div>
              <h3>Já anuncia e não está satisfeito?</h3>
              <ul>
                <li>Gasta muito e gera poucos chamados</li>
                <li>Atrai termos sem relação com o serviço</li>
                <li>Não sabe o custo real por oportunidade</li>
              </ul>
              <p>Analisamos a estrutura atual e mostramos o que pode ser mantido, corrigido ou reconstruído.</p>
            </article>

            <article className="fit-card launch">
              <div className="fit-card-top"><Check size={24} /><span>ESTRUTURAÇÃO</span></div>
              <h3>Nunca anunciou?</h3>
              <ul>
                <li>Montamos perfil, campanhas e página</li>
                <li>Explicamos sem jargão ou relatório confuso</li>
                <li>Você continua focado no atendimento</li>
              </ul>
              <p>Nós cuidamos da captação para você continuar fazendo o que sua empresa sabe: atender os chamados.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <div className="section-shell faq-shell" data-reveal>
          <div className="faq-heading">
            <span className="section-index light">05 / DÚVIDAS</span>
            <h2>O que donos de desentupidora querem saber antes de anunciar.</h2>
            <button className="outline-cta" onClick={() => scrollToSection("agende", "faq")}>Falar com a Canis</button>
          </div>

          <Accordion type="single" collapsible className="faq-list">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="agende" className="contact-section">
        <div className="section-shell contact-grid" data-reveal>
          <div className="contact-copy">
            <span className="section-index light">06 / PRÓXIMO PASSO</span>
            <h2>Sua próxima chamada pode estar procurando uma desentupidora <em>agora.</em></h2>
            <p>Conte onde você atende e como anuncia hoje. Vamos analisar sua região e mostrar qual estrutura faz sentido para sua operação.</p>

            <figure className="contact-operation-visual">
              <img
                src={contactOperationImage}
                alt="Equipe de desentupimento recebendo uma chamada enquanto o atendimento de campo se prepara"
                width="2000"
                height="1500"
                loading="lazy"
              />
              <figcaption>
                <small>OPERAÇÃO EM MOVIMENTO</small>
                <strong>Seu time atende. A Canis trabalha para o próximo chamado chegar.</strong>
              </figcaption>
            </figure>

            <div className="contact-promise">
              <div><Clock3 size={20} /><span><strong>Menos de 1 minuto</strong> para preencher</span></div>
              <div><MapPin size={20} /><span><strong>Análise local</strong> da sua região</span></div>
              <div><PhoneCall size={20} /><span><strong>Conversa objetiva</strong> com um especialista</span></div>
            </div>
          </div>

          <div className="contact-form-card">
            <div className="form-card-head">
              <span>ANÁLISE GRATUITA</span>
              <strong>Agende uma conversa</strong>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      <FloatingWhatsApp onClick={() => scrollToSection("agende", "whatsapp_flutuante")} />

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <img src={canisLogoSm} alt="Canis Marketing" width="38" height="38" />
            <div><strong>CANIS MARKETING</strong><span>Marketing para desentupidoras</span></div>
          </div>
          <p>© {new Date().getFullYear()} Canis Marketing. Todos os direitos reservados.</p>
          <button onClick={() => scrollToSection("inicio", "rodape")}>Voltar ao topo ↑</button>
        </div>
      </footer>
    </main>
  );
};

export default Index;
