/* Mariana Barreto — site JS */
(() => {
  const $ = (s, p=document) => p.querySelector(s);
  const $$ = (s, p=document) => [...p.querySelectorAll(s)];

  // ---------- Year ----------
  $('#year').textContent = new Date().getFullYear();

  // ---------- Theme ----------
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('mb-theme');
  if (savedTheme) root.dataset.theme = savedTheme;
  $('#themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('mb-theme', next);
  });

  // ---------- Header scroll ----------
  const header = $('#siteHeader');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // ---------- Mobile menu ----------
  const navMobile = $('#navMobile');
  $('#menuToggle').addEventListener('click', () => navMobile.classList.toggle('open'));
  $$('#navMobile a').forEach(a => a.addEventListener('click', () => navMobile.classList.remove('open')));

  // ---------- Reveal on scroll ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => io.observe(el));

  // ---------- Gallery ----------
  const projects = [
    { img: 'assets/images/projeto-cozinha.jpg', title: 'Cozinha integrada com identidade', cat: 'interiores', tags:['residencial','ambientes'], desc:'Composição de marcenaria, mármore e iluminação pensada para o dia a dia.', tall:true },
    { img: 'assets/images/projeto-sala-jantar.jpg', title: 'Sala de jantar acolhedora e sofisticada', cat: 'interiores', tags:['residencial','ambientes'], desc:'Madeira clara, iluminação cênica e composição contemporânea.' },
    { img: 'assets/images/projeto-quarto.jpg', title: 'Quarto infantil em tons naturais', cat: 'ambientes', tags:['residencial'], desc:'Ambiente leve, claro e funcional, pensado para acompanhar o crescimento.' },
    { img: 'assets/images/projeto-bebe.jpg', title: 'Quarto de bebê — verde aconchegante', cat: 'ambientes', tags:['residencial','reformas'], desc:'Marcenaria sob medida, iluminação indireta e composição calma.' },
    { img: 'assets/images/projeto-quarto-rose.jpg', title: 'Quarto contemporâneo com home office', cat: 'reformas', tags:['residencial','interiores'], desc:'Integração de mobiliário, espelho e cores em palha + rosé.', tall:true },
    { img: 'assets/images/mariana-2.jpg', title: 'Living com personalidade', cat: 'interiores', tags:['residencial','consultoria'], desc:'Mistura de texturas, almofadas e parede em azul sereno.' },
    { img: 'assets/images/projeto-cozinha.jpg', title: 'Reforma planejada de cozinha', cat: 'reformas', tags:['residencial'], desc:'Reorganização de layout, materiais e revestimentos.' },
    { img: 'assets/images/projeto-sala-jantar.jpg', title: 'Sala comercial integrada', cat: 'comercial', tags:['consultoria'], desc:'Solução elegante para uso profissional com clima acolhedor.' },
    { img: 'assets/images/projeto-bebe.jpg', title: 'Consultoria à distância', cat: 'consultoria', tags:['ambientes'], desc:'Direção visual e funcional entregue de forma remota.' },
  ];

  const gallery = $('#gallery');
  const render = (filter='all') => {
    gallery.innerHTML = '';
    projects
      .filter(p => filter==='all' || p.cat===filter || (p.tags||[]).includes(filter))
      .forEach((p,i) => {
        const el = document.createElement('article');
        el.className = 'card-project-item reveal' + (p.tall ? ' tall' : '');
        el.innerHTML = `
          <img src="${p.img}" alt="${p.title}" loading="lazy" />
          <div class="overlay glass">
            <small>${p.cat}</small>
            <strong>${p.title}</strong>
            <p>${p.desc}</p>
          </div>`;
        el.addEventListener('click', () => openModal(p));
        gallery.appendChild(el);
        requestAnimationFrame(() => el.classList.add('in'));
      });
  };
  render();

  $$('#projectFilters .chip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#projectFilters .chip-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });

  // Modal
  const modal = $('#modal');
  const openModal = (p) => {
    $('#modalImg').src = p.img; $('#modalImg').alt = p.title;
    $('#modalCat').textContent = p.cat;
    $('#modalTitle').textContent = p.title;
    $('#modalDesc').textContent = p.desc;
    $('#modalWa').href = `https://wa.me/5521972422377?text=${encodeURIComponent('Olá, Mariana! Vi o projeto "'+p.title+'" no site e gostaria de algo nesse estilo.')}`;
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false');
  };
  const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); };
  $('#modalClose').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // ---------- Quiz ----------
  const quizQuestions = [
    { q:'O que você quer transformar?', opts:['Casa','Apartamento','Sala comercial','Loja','Escritório','Ambiente específico','Ainda não sei'] },
    { q:'Qual é o objetivo principal?', opts:['Reformar','Melhorar funcionalidade','Valorizar o imóvel','Ambiente mais bonito','Projeto exclusivo','Organizar melhor o espaço','Projeto à distância'] },
    { q:'Qual estilo mais combina com você?', opts:['Moderno','Aconchegante','Minimalista','Sofisticado','Natural','Funcional','Contemporâneo'] },
    { q:'Quais materiais/elementos você prefere?', opts:['Madeira','Tons claros','Iluminação quente','Mármore','Cores neutras','Plantas','Vidro e linhas retas','Texturas naturais'] },
    { q:'Qual seu maior problema hoje?', opts:['Falta de espaço','Ambiente sem personalidade','Pouca funcionalidade','Reforma parada','Dúvida do que combina','Falta de planejamento','Não sei por onde começar','Preciso de direção'] },
  ];
  const results = [
    { title:'Sofisticação Natural com Toque Aconchegante', desc:'Seu projeto combina com materiais naturais, tons equilibrados, iluminação acolhedora e soluções que valorizam o conforto.' },
    { title:'Minimalismo Funcional', desc:'Seu espaço pede clareza, organização visual e soluções inteligentes para aproveitar melhor cada metro.' },
    { title:'Elegância Contemporânea', desc:'Seu estilo combina com linhas modernas, materiais sofisticados e uma atmosfera marcante sem excesso.' },
    { title:'Funcionalidade Inteligente', desc:'Seu desafio é transformar o espaço em algo prático, bem planejado e adaptado à rotina.' },
    { title:'Design Personalizado e Exclusivo', desc:'Seu perfil combina com um projeto pensado nos detalhes, com identidade própria e soluções criadas para sua forma de viver.' },
  ];

  let qIndex = 0; const answers = [];
  const qContent = $('#quizContent'); const qBar = $('#quizProgress');
  const renderQuiz = () => {
    qBar.style.width = ((qIndex)/quizQuestions.length*100)+'%';
    if (qIndex >= quizQuestions.length) return showResult();
    const item = quizQuestions[qIndex];
    qContent.innerHTML = `
      <span class="eyebrow">Pergunta ${qIndex+1} de ${quizQuestions.length}</span>
      <h3>${item.q}</h3>
      <div class="quiz-options">
        ${item.opts.map((o,i)=>`<button class="quiz-opt" data-i="${i}">${o}</button>`).join('')}
      </div>`;
    $$('.quiz-opt', qContent).forEach(b => b.addEventListener('click', () => {
      answers.push(+b.dataset.i); qIndex++; renderQuiz();
    }));
  };
  const showResult = () => {
    qBar.style.width = '100%';
    const idx = (answers.reduce((a,b)=>a+b,0)) % results.length;
    const r = results[idx];
    const waMsg = encodeURIComponent(`Olá, Mariana Barreto. Fiz o quiz no site e meu resultado foi: ${r.title}. Quero conversar sobre um projeto nesse estilo.`);
    qContent.innerHTML = `
      <div class="quiz-result">
        <span class="eyebrow">Seu estilo combina com</span>
        <h3>${r.title}</h3>
        <p class="muted">${r.desc}</p>
        <div class="quiz-actions">
          <a class="btn btn-primary pill" href="https://wa.me/5521972422377?text=${waMsg}" target="_blank" rel="noopener">Quero conversar sobre meu projeto nesse estilo</a>
          <button class="btn btn-ghost pill" id="quizRestart">Refazer quiz</button>
        </div>
      </div>`;
    $('#quizRestart').addEventListener('click', () => { qIndex=0; answers.length=0; renderQuiz(); });
  };
  renderQuiz();

  // ---------- Chat IA ----------
  const chatPanel = $('#chatPanel');
  const chatMessages = $('#chatMessages');
  const chatForm = $('#chatForm');
  const chatInput = $('#chatInput');

  let chatId = localStorage.getItem('mb-chat-id');
  if (!chatId) {
    chatId = 'mb_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('mb-chat-id', chatId);
  }

  const addMsg = (text, who='bot') => {
    const el = document.createElement('div');
    el.className = 'msg ' + who;
    el.textContent = text;
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return el;
  };
  const addTyping = () => {
    const el = document.createElement('div');
    el.className = 'msg bot typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return el;
  };

  let initialized = false;
  const openChat = () => {
    chatPanel.classList.add('open');
    chatPanel.setAttribute('aria-hidden','false');
    if (!initialized) {
      addMsg('Oi, seja bem-vindo(a). Você está pensando em reformar, transformar um ambiente ou entender possibilidades para o seu projeto?', 'bot');
      initialized = true;
    }
    setTimeout(() => chatInput.focus(), 200);
  };
  $('#chatToggle').addEventListener('click', () => chatPanel.classList.contains('open') ? chatPanel.classList.remove('open') : openChat());
  $('#chatClose').addEventListener('click', () => chatPanel.classList.remove('open'));

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    chatInput.value = '';
    const typing = addTyping();
    try {
      const res = await fetch('https://memoken.com/webhook/artificial-inteligence/completion', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ chat_id: chatId, human_message: text })
      });
      const data = await res.json().catch(() => ({}));
      typing.remove();
      const reply = data.response || data.message || data.output || data.text || data.answer || (typeof data === 'string' ? data : null) || 'Recebi sua mensagem. Em breve respondo com mais detalhes.';
      addMsg(reply, 'bot');
    } catch (err) {
      typing.remove();
      addMsg('Não consegui responder agora, mas você pode falar diretamente com Mariana Barreto pelo WhatsApp.', 'bot');
    }
  });
})();
