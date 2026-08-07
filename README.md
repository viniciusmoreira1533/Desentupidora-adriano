# Canis LP Desentupidora

Landing page de conversão da Canis Marketing para **marketing e anúncios para desentupidoras** (Google Maps, Google Ads, página de alta conversão e Meta Ads).

## Stack

- Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui
- GTM `GTM-5R3B9PKC` (injetado no `vite.config.ts`)
- Identidade visual própria do nicho: linguagem industrial/emergencial, azul operacional, laranja de alta visibilidade e verde reservado para sinais de resultado. Tipografia Archivo + Inter.

## Rodar local

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # build de produção (dist/)
npm run lint
npm run test
```

## Fluxo de leads

O formulário "Agende uma conversa" envia um POST para o webhook n8n:

```
POST https://n8nwebhook.server2.wolframe.app/webhook/desentupidora-canis
{ "name": "...", "whatsapp": "...", "cidade": "...", "anuncia": "google|meta|ambos|nao" }
```

O fluxo vive no workflow n8n **LP's-dev-canis** (`Webhook - desentupidora → Mapear lead - desentupidora → Criar lead CRM - desentupidora → AVISA GRUPO WHATSAPP → AVISA WHATSAPP PESSOAL`), cria o lead na tabela **CRM** do Baserow (tableId 4) e notifica o grupo + WhatsApp pessoal.

Após o envio, o lead é redirecionado para o WhatsApp da Canis (`5516976158102`) com a mensagem preenchida e um evento `lead-desentupidora-enviado` é disparado no dataLayer.

## Deploy

- Vercel (projeto: `canis-lp-desentupidora-2026-producao`)
- Domínio definitivo: `marketingdesentupidora.canis.marketing`
- `vercel.json` já inclui headers de segurança e rewrites para SPA
