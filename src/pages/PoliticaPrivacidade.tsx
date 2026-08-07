export default function PoliticaPrivacidade() {
  return (
    <div className="privacy-page min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border/50 py-4 px-4">
        <div className="container mx-auto max-w-3xl flex items-center justify-between">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Voltar ao início
          </a>
          <span className="text-xs text-muted-foreground">Canis Marketing</span>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-20">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
          Política de Privacidade
        </h1>
        <p className="text-sm text-muted-foreground mb-12">
          Última atualização: junho de 2026
        </p>

        <div className="space-y-10 text-sm md:text-base leading-relaxed text-muted-foreground">

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">1. Quem somos</h2>
            <p>
              A <strong className="text-foreground">Canis Marketing</strong> ("nós", "nosso" ou "empresa") é uma assessoria de marketing digital
              especializada em marketing e anúncios para desentupidoras: Google Maps, Google Ads, Meta Ads e páginas de alta conversão.
              Nosso site institucional é{" "}
              <a href="https://desentupidora.canis.marketing" className="text-primary underline hover:text-primary/80 transition-colors">
                desentupidora.canis.marketing
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">2. Dados que coletamos</h2>
            <p className="mb-3">Ao preencher nosso formulário de contato, coletamos os seguintes dados pessoais:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-foreground">Nome</strong> — para identificação no atendimento</li>
              <li><strong className="text-foreground">Número de WhatsApp</strong> — para contato e envio de propostas</li>
              <li><strong className="text-foreground">Cidade / Estado de atendimento</strong> — para analisar a região e a concorrência</li>
              <li><strong className="text-foreground">Situação dos anúncios atuais</strong> — para direcionar a proposta correta</li>
            </ul>
            <p className="mt-3">
              Também coletamos dados de navegação de forma automática via cookies e ferramentas de analytics
              (Google Analytics, Google Tag Manager), como páginas visitadas, tempo de permanência e
              informações do dispositivo/navegador.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">3. Finalidade do tratamento</h2>
            <p className="mb-3">Utilizamos seus dados pessoais para:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Entrar em contato via WhatsApp para apresentar nossos serviços</li>
              <li>Personalizar a proposta comercial de acordo com seu perfil</li>
              <li>Melhorar a experiência de navegação no nosso site</li>
              <li>Gerar relatórios estatísticos de acesso (dados anonimizados)</li>
              <li>Cumprir obrigações legais e regulatórias</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">4. Base legal</h2>
            <p>
              O tratamento dos seus dados é realizado com base no <strong className="text-foreground">consentimento</strong> (Art. 7º, I da LGPD),
              que é solicitado no momento do preenchimento do formulário. Você pode revogar seu consentimento
              a qualquer momento entrando em contato conosco.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">5. Compartilhamento de dados</h2>
            <p className="mb-3">Seus dados podem ser compartilhados com:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong className="text-foreground">Meta Platforms</strong> — para fins de remarketing e medição de anúncios</li>
              <li><strong className="text-foreground">Google</strong> — para analytics e remarketing</li>
              <li><strong className="text-foreground">n8n (automação)</strong> — para processamento do formulário de contato</li>
            </ul>
            <p className="mt-3">
              Não vendemos, alugamos ou transferimos seus dados pessoais para terceiros para fins comerciais.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">6. Cookies</h2>
            <p>
              Utilizamos cookies e tecnologias semelhantes para melhorar sua experiência de navegação,
              entender como o site é utilizado e personalizar conteúdo. Você pode gerenciar suas preferências
              de cookies nas configurações do seu navegador. Ao continuar navegando, você concorda com o uso
              de cookies conforme descrito nesta política.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">7. Seus direitos (LGPD)</h2>
            <p className="mb-3">
              De acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você tem direito a:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Confirmar a existência do tratamento dos seus dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, desatualizados ou incorretos</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Eliminar dados tratados com base no consentimento</li>
              <li>Obter informação sobre compartilhamento de dados com terceiros</li>
              <li>Revogar o consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">8. Retenção de dados</h2>
            <p>
              Seus dados pessoais serão mantidos pelo tempo necessário para cumprir as finalidades descritas
              nesta política, salvo quando a lei exigir ou permitir um período de retenção maior. Dados
              coletados via formulário são mantidos por até <strong className="text-foreground">12 meses</strong> após o último contato.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">9. Segurança</h2>
            <p>
              Adotamos medidas técnicas e administrativas adequadas para proteger seus dados pessoais contra
              acessos não autorizados, perda, alteração ou qualquer forma de tratamento inadequado. Seus dados
              são transmitidos via conexão segura (HTTPS) e armazenados em servidores com controle de acesso.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">10. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta política periodicamente. A versão mais recente estará sempre disponível
              nesta página, com a data da última atualização. Recomendamos que você revise esta política
              regularmente.
            </p>
          </section>

          <section>
            <h2 className="text-lg md:text-xl font-semibold text-white mb-3">11. Contato</h2>
            <p className="mb-3">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                <strong className="text-foreground">WhatsApp:</strong>{" "}
                <a
                  href="https://api.whatsapp.com/send/?phone=5516976158102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80 transition-colors"
                >
                  (16) 97615-8102
                </a>
              </li>
              <li>
                <strong className="text-foreground">Controlador:</strong> Canis Marketing
              </li>
            </ul>
          </section>

        </div>

        {/* Footer link */}
        <div className="mt-16 pt-8 border-t border-border/30 text-center">
          <a href="/" className="text-primary underline hover:text-primary/80 transition-colors text-sm">
            ← Voltar ao início
          </a>
        </div>
      </main>
    </div>
  );
}
