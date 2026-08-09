# Canis LP Desentupidora — Marketing para Desentupidoras

Landing page de alta conversão da **Canis Marketing** focada na captação de clientes para empresas e donos de desentupidoras (Google Ads, Google Maps / Perfil da Empresa, Meta Ads e páginas de rápida conversão emergencial).

---

## 🎨 Identidade Visual & Design System

- **Conceito Visual**: Estética industrial/operacional de alta performance baseada em **Dark Glassmorphism**.
- **Cores Principais**:
  - **Azul Operacional / Navy**: `#0d2635` / `#061924` (fundo principal e estrutura de autoridade)
  - **Laranja Industrial**: `#f36b2b` / `#ff7e3e` (CTAs de conversão de alta visibilidade)
  - **Verde Sinal de Chamado**: `#2ecc5f` / `#4ade80` (indicadores de resposta rápida e status em tempo real)
- **Tipografia**: Self-hosted `Archivo` (títulos e badges de impacto) + `Inter` (corpo e leitura otimizada).
- **Selo Google Partner Oficial**: Agência certificada Google Partner com componente dedicado e link para validação oficial.

---

## 🚀 Tecologias (Stack)

- **Core**: React 18 + TypeScript + Vite
- **Estilização**: Tailwind CSS + Vanilla CSS Tokens + shadcn/ui
- **Ícones**: Lucide React
- **Analytics & Tracking**: Google Tag Manager (`GTM-5R3B9PKC`) injetado via `vite.config.ts` com disparos customizados no `dataLayer` (`formulario_iniciado`, `lead-enviado`, `lead-desentupidora-enviado`, `whatsapp_aberto`, etc.)

---

## 🛠️ Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento (http://localhost:8080)
npm run dev

# 3. Validar linting
npm run lint

# 4. Gerar build de produção (pasta dist/)
npm run build
```

---

## 🔄 Fluxo de Integracão de Leads (Webhook + CRM + WhatsApp)

O formulário de captação de leads (`src/components/LeadForm.tsx`) envia os dados via `POST` assíncrono para o webhook n8n:

```http
POST https://n8nwebhook.server2.wolframe.app/webhook/desentupidora-canis
Content-Type: application/json

{
  "name": "Nome do Cliente",
  "whatsapp": "16999999999",
  "cidade": "Cidade / UF",
  "anuncia": "google | meta | ambos | nao"
}
```

### Arquitetura do Workflow n8n (`LP's-dev-canis`):
1. **Webhook Receiver**: Capta a requisição do formulário da LP.
2. **Mapeamento de Lead**: Higieniza telefone, cidade e status de anúncio.
3. **CRM Baserow**: Cria registro na tabela **CRM** (tableId 4).
4. **Notificação em Tempo Real**: Notifica o grupo operacional da Canis no WhatsApp e envia alerta pessoal para a equipe comercial.
5. **Redirecionamento WhatsApp**: O lead é redirecionado para o WhatsApp oficial da Canis (`5516976158102`) com a mensagem pré-formatada com suas informações.

---

## 🌐 Deploy & Produção

- **Hospedagem**: Vercel (Projeto: `canis-lp-desentupidora-2026-producao`)
- **Domínio Oficial**: `marketingdesentupidora.canis.marketing`
- **Deploy Automático**: Vinculado à branch `main` via integração oficial do Git na Vercel.
- **Configuração (`vercel.json`)**: Inclui headers de segurança (CSP, HSTS, X-Content-Type-Options) e rewrites para Single Page Application.
