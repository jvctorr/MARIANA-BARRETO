# Mariana Barreto | Arquiteta — Site

Site premium em HTML, CSS e JavaScript puro, mobile-first, com modo claro/escuro, quiz interativo, galeria de projetos, chat IA flutuante e estética arquitetônica sofisticada (glassmorphism, blur, cards translúcidos).

## Como abrir
1. Baixe a pasta `app/`.
2. Abra `index.html` no navegador (ou rode `npx serve .` na pasta).

## Estrutura
```
app/
├─ index.html
├─ style.css
├─ script.js
├─ README.md
└─ assets/
   └─ images/
      ├─ mariana-1.jpg
      ├─ mariana-2.jpg
      ├─ projeto-cozinha.jpg
      ├─ projeto-sala-jantar.jpg
      ├─ projeto-quarto.jpg
      ├─ projeto-bebe.jpg
      └─ projeto-quarto-rose.jpg
```

## Como editar
- **Textos:** abra `index.html` e altere diretamente o conteúdo das seções.
- **Imagens:** substitua os arquivos em `assets/images/` mantendo o mesmo nome, ou troque os caminhos no HTML/JS.
- **Projetos da galeria:** edite o array `projects` no topo de `script.js` (campos: `img`, `title`, `cat`, `tags`, `desc`, `tall`).
- **Quiz:** altere `quizQuestions` e `results` em `script.js`.
- **WhatsApp:** procure por `5521972422377` no HTML e JS e substitua pelo novo número.
- **Instagram:** procure por `marianabarreto.arquitetura` no HTML e substitua.
- **Webhook do Chat IA:** em `script.js`, altere a URL passada para `fetch(...)`. Body enviado: `{ chat_id, human_message }`.

## Tema claro/escuro
Botão no header. A preferência é salva em `localStorage` (`mb-theme`).

## Hospedagem
- **GitHub Pages:** suba a pasta `app/` em um repositório e habilite Pages na branch `main`.
- **Vercel/Netlify:** arraste a pasta `app/` no painel — sem build, é estático puro.

## SEO
Title, description, Open Graph e Twitter Card já configurados em `<head>`.
