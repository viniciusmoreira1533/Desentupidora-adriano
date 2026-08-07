import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import canisLogoSm from "@/assets/canis_logo_sm.webp";
import {
  ArrowDownRight,
  Check,
  Clock3,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  PhoneCall,
  Search,
  Target,
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

function DemandMap() {
  return (
    <div className="demand-console" aria-label="Representação visual de buscas urgentes por desentupidora">
      <div className="console-topbar">
        <div className="console-status"><span /> DEMANDA LOCAL AO VIVO</div>
        <div className="console-city"><Navigation size={14} /> SUA REGIÃO</div>
      </div>

      <div className="search-query">
        <Search size={18} />
        <span>desentupidora 24 horas perto de mim</span>
        <kbd>AGORA</kbd>
      </div>

      <div className="map-stage">
        <div className="map-road road-a" />
        <div className="map-road road-b" />
        <div className="map-road road-c" />
        <div className="map-label label-a">CENTRO</div>
        <div className="map-label label-b">ZONA NORTE</div>
        <div className="map-label label-c">SUA BASE</div>
        <div className="map-pin pin-a"><span /></div>
        <div className="map-pin pin-b"><span /></div>
        <div className="map-pin pin-c"><span /></div>
        <div className="map-target"><Target size={30} /></div>

        <div className="incoming-call">
          <div className="call-icon"><PhoneCall size={20} /></div>
          <div>
            <small>NOVO CHAMADO</small>
            <strong>Ligação recebida</strong>
            <span>Origem: Google Ads</span>
          </div>
          <div className="call-live">AO VIVO</div>
        </div>
      </div>

      <div className="console-metrics">
        <div><strong>17</strong><span>buscas urgentes</span></div>
        <div><strong>4,9★</strong><span>confiança local</span></div>
        <div><strong>&lt; 1 min</strong><span>até o contato</span></div>
      </div>
    </div>
  );
}

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const scrollToSection = useCallback((id: string) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: id === "agende" ? "clicou no CTA" : "navegacao_landing_page" });
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

    return () => observer.disconnect();
  }, []);

  return (
    <main className="landing-root">
      <header className="site-header">
        <div className="site-header-inner">
          <button className="brand-lockup" onClick={() => scrollToSection("inicio")} aria-label="Voltar ao início">
            <img src={canisLogoSm} alt="Canis Marketing" width="42" height="42" />
            <span><strong>CANIS</strong><small>MARKETING PARA DESENTUPIDORAS</small></span>
          </button>

          <nav className="desktop-nav" aria-label="Navegação principal">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={activeSection === link.href ? "active" : ""}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <button className="header-cta" onClick={() => scrollToSection("agende")}>Agendar conversa</button>
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
              <button key={link.href} onClick={() => scrollToSection(link.href)}>{link.label}</button>
            ))}
            <button className="mobile-nav-cta" onClick={() => scrollToSection("agende")}>Agendar conversa</button>
          </nav>
        )}
      </header>

      <section id="inicio" className="hero-section">
        <div className="safety-stripe" aria-hidden="true" />
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-kicker"><span>ESPECIALIDADE CANIS</span> MARKETING PARA DESENTUPIDORAS</div>
            <h1>Mais chamados para quem resolve problemas <em>agora.</em></h1>
            <p className="hero-lead">
              Sua desentupidora precisa aparecer quando o cliente pesquisa, transmitir confiança em segundos e facilitar a ligação ou o WhatsApp.
            </p>
            <p className="hero-urgency">
              <Clock3 size={20} /> Quando o cano estoura às 3h da manhã, quem aparece no Google leva o chamado.
            </p>

            <div className="hero-actions">
              <button className="primary-cta" onClick={() => scrollToSection("agende")}>
                Quero mais chamados <ArrowDownRight size={20} />
              </button>
              <a className="text-cta" href="#metodo">Ver como funciona <span>→</span></a>
            </div>

            <div className="hero-proof">
              <div className="proof-partner"><GooglePartnerBadge size="sm" /></div>
              <div className="proof-copy">
                <strong>Agência Google Partner</strong>
                <span>Certificação oficial e experiência real com o segmento</span>
              </div>
            </div>
          </div>

          <DemandMap />
        </div>

        <div className="channel-rail">
          <span>ESTRUTURA COMPLETA</span>
          <strong>Google Maps</strong>
          <i />
          <strong>Google Ads</strong>
          <i />
          <strong>Página de conversão</strong>
          <i />
          <strong>Meta Ads</strong>
        </div>
      </section>

      <section id="problema" className="problem-section">
        <div className="section-shell">
          <div className="editorial-heading">
            <span className="section-index">01 / O MERCADO</span>
            <h2>Seu cliente não está pesquisando.<br /><em>Ele precisa resolver.</em></h2>
          </div>

          <div className="urgency-sequence">
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

          <div className="problem-manifesto">
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
          <div className="method-heading">
            <div>
              <span className="section-index light">02 / A ESTRUTURA</span>
              <h2>Três frentes.<br /><em>Um telefone tocando.</em></h2>
            </div>
            <p>Uma rota simples para capturar demanda local, converter urgência e ampliar volume sem perder controle do custo por oportunidade.</p>
          </div>

          <div className="operation-route">
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

          <div className="method-cta-row">
            <div><MessageCircle size={24} /><span>Pronto para saber como isso funciona na sua cidade?</span></div>
            <button className="primary-cta" onClick={() => scrollToSection("agende")}>Analisar minha região <ArrowDownRight size={20} /></button>
          </div>
        </div>
      </section>

      <section id="avaliacoes" className="proof-section">
        <div className="section-shell">
          <div className="partner-panel">
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

          <Suspense fallback={<div className="reviews-loading">Carregando avaliações...</div>}>
            <GoogleReviewsWidget />
          </Suspense>
        </div>
      </section>

      <section className="fit-section">
        <div className="section-shell">
          <div className="editorial-heading compact">
            <span className="section-index">04 / PARA QUEM É</span>
            <h2>Já anuncia ou vai começar?<br /><em>Temos um próximo passo claro.</em></h2>
          </div>

          <div className="fit-grid">
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
        <div className="section-shell faq-shell">
          <div className="faq-heading">
            <span className="section-index light">05 / DÚVIDAS</span>
            <h2>O que donos de desentupidora querem saber antes de anunciar.</h2>
            <button className="outline-cta" onClick={() => scrollToSection("agende")}>Falar com a Canis</button>
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
        <div className="section-shell contact-grid">
          <div className="contact-copy">
            <span className="section-index light">06 / PRÓXIMO PASSO</span>
            <h2>Sua próxima chamada pode estar procurando uma desentupidora <em>agora.</em></h2>
            <p>Conte onde você atende e como anuncia hoje. Vamos analisar sua região e mostrar qual estrutura faz sentido para sua operação.</p>

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

      <FloatingWhatsApp onClick={() => scrollToSection("agende")} />

      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-brand">
            <img src={canisLogoSm} alt="Canis Marketing" width="38" height="38" />
            <div><strong>CANIS MARKETING</strong><span>Marketing para desentupidoras</span></div>
          </div>
          <p>© {new Date().getFullYear()} Canis Marketing. Todos os direitos reservados.</p>
          <button onClick={() => scrollToSection("inicio")}>Voltar ao topo ↑</button>
        </div>
      </footer>
    </main>
  );
};

export default Index;
