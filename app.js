(() => {
  const cfg = window.SVB_GAME_CONFIG;
  const app = document.querySelector('#app');
  const state = { index: 0, selected: new Set(), answered: false, discoveries: 0 };
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  function captureUtm() {
    const current = new URLSearchParams(location.search);
    const saved = JSON.parse(sessionStorage.getItem('svb_utm') || '{}');
    utmKeys.forEach(key => { if (current.has(key)) saved[key] = current.get(key); });
    sessionStorage.setItem('svb_utm', JSON.stringify(saved));
    return saved;
  }

  const utm = captureUtm();
  function track(event, detail = {}) {
    const payload = { event, ...detail, ...utm };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent('svb:analytics', { detail: payload }));
  }

  function screen(html, className = '') {
    app.innerHTML = `<section class="screen ${className} active">${html}</section>`;
    if (!reducedMotion) requestAnimationFrame(() => app.querySelector('.screen')?.classList.add('entered'));
    window.scrollTo(0, 0);
  }

  function logo() {
    return `<img class="svb-logo" src="assets/logo-svb.png" alt="Sociedade Vegetariana Brasileira" width="879" height="900">`;
  }

  function renderIntro() {
    screen(`
      ${logo()}
      <div class="intro-copy">
        <p class="eyebrow">QUEM É QUEM?</p>
        <h1>Você conhece mesmo <em>os animais?</em></h1>
        <p class="subtitle">${cfg.texts.introSubtitle}</p>
      </div>
      <div class="animal-stage" aria-hidden="true"><img class="animal-hero" src="assets/animal-quiz-hero.png" alt="" width="1536" height="1024"></div>
      <button class="primary" type="button" data-action="start">${cfg.texts.start} <span aria-hidden="true">→</span></button>
    `, 'intro');
    app.querySelector('[data-action="start"]').addEventListener('click', () => { track('game_start'); renderQuestion(0); });
  }

  function animalButton(animal) {
    return `<button class="animal-choice" type="button" data-animal="${animal.id}" aria-pressed="false"><span class="choice-emoji" aria-hidden="true">${animal.emoji}</span><span>${animal.name}</span><span class="check" aria-hidden="true">✓</span></button>`;
  }

  function renderQuestion(index) {
    state.index = index;
    state.selected.clear();
    state.answered = false;
    const q = cfg.questions[index];
    const number = index + 1;
    screen(`
      <header class="game-header"><span class="mini-mark">SVB</span><div class="progress-copy"><strong>${number} de ${cfg.questions.length}</strong><span>Quem é quem?</span></div></header>
      <div class="progress" role="progressbar" aria-label="Progresso" aria-valuemin="1" aria-valuemax="${cfg.questions.length}" aria-valuenow="${number}"><i style="width:${number / cfg.questions.length * 100}%"></i></div>
      <div class="question-wrap"><p class="round-label">PERGUNTA ${String(number).padStart(2, '0')}</p><h2>${q.prompt}</h2><p class="instruction">${q.instruction}</p><div class="choices">${cfg.animals.map(animalButton).join('')}</div></div>
      <button class="primary confirm" type="button" data-action="confirm" disabled>${cfg.texts.confirm}</button>
    `, 'game');
    const multi = q.correct.length > 1;
    app.querySelectorAll('.animal-choice').forEach(btn => btn.addEventListener('click', () => {
      const id = btn.dataset.animal;
      if (!multi) { state.selected = new Set([id]); submitAnswer(); return; }
      state.selected.has(id) ? state.selected.delete(id) : state.selected.add(id);
      btn.setAttribute('aria-pressed', String(state.selected.has(id)));
      app.querySelector('[data-action="confirm"]').disabled = state.selected.size === 0;
    }));
    const confirm = app.querySelector('[data-action="confirm"]');
    if (!multi) confirm.hidden = true;
    confirm.addEventListener('click', submitAnswer);
  }

  function sameAnswer(a, b) { return a.length === b.length && a.every(x => b.includes(x)); }

  function submitAnswer() {
    if (state.answered || state.selected.size === 0) return;
    state.answered = true;
    const q = cfg.questions[state.index];
    const selected = [...state.selected];
    const exact = sameAnswer(selected.sort(), [...q.correct].sort());
    if (exact) state.discoveries++;
    track('question_answered', { question_id: q.id, question_number: state.index + 1, selected_answers: selected.join(','), matched_reference_answer: exact });
    const correctAnimals = cfg.animals.filter(a => q.correct.includes(a.id));
    screen(`
      <div class="feedback-top"><span class="round-chip">${state.index + 1} de ${cfg.questions.length}</span><span class="feedback-kicker">${exact ? 'VOCÊ PERCEBEU!' : 'OLHA SÓ…'}</span></div>
      <div class="feedback-animals" aria-label="${correctAnimals.map(a => a.name).join(', ')}">${correctAnimals.map(a => `<span aria-hidden="true">${a.emoji}</span>`).join('')}</div>
      <div class="feedback-copy"><h2>${q.reveal}</h2><p>${q.explanation}</p><details><summary>Fontes para revisão científica</summary><ul>${q.sources.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join('')}</ul></details></div>
      <button class="primary" type="button" data-action="next">${state.index === cfg.questions.length - 1 ? 'VER O QUE ISSO REVELA' : cfg.texts.next} <span aria-hidden="true">→</span></button>
    `, `feedback ${exact ? 'matched' : 'surprise'}`);
    app.querySelector('[data-action="next"]').addEventListener('click', () => { state.index === cfg.questions.length - 1 ? renderBridge() : renderQuestion(state.index + 1); });
  }

  function renderBridge() {
    const lines = ['Eles brincam.', 'Eles aprendem.', 'Eles criam vínculos.', 'Eles têm preferências.', 'Eles sentem.'];
    screen(`
      <div class="bridge-inner"><img src="assets/animal-quiz-hero.png" alt="Ilustração de um cachorro, um porco, uma vaca e uma galinha lado a lado" width="1536" height="1024"><div class="bridge-lines">${lines.map((line, i) => `<p style="--delay:${i}">${line}</p>`).join('')}</div><p class="bridge-thought">Talvez eles tenham mais em comum do que você imaginava.</p></div>
      <button class="primary bridge-next" type="button">CONTINUAR <span aria-hidden="true">→</span></button>
    `, 'bridge');
    const button = app.querySelector('.bridge-next');
    if (!reducedMotion) { button.disabled = true; setTimeout(() => { button.disabled = false; }, 3400); }
    button.addEventListener('click', renderReveal);
  }

  function renderReveal() {
    screen(`
      <div class="reveal-mark" aria-hidden="true">♥</div>
      <div class="reveal-copy"><p>SE VOCÊ</p><h2>AMA UM,</h2><p>POR QUE COME</p><h2>O OUTRO?</h2></div>
      <div class="reveal-row" aria-hidden="true"><span>🐶</span><span>🐷</span><span>🐮</span><span>🐔</span></div>
      <button class="light-button" type="button">SEGUIR <span aria-hidden="true">→</span></button>
    `, 'reveal');
    app.querySelector('button').addEventListener('click', renderFinal);
  }

  function finalUrl() {
    const url = new URL(cfg.finalLink);
    Object.entries(utm).forEach(([key, value]) => { if (value) url.searchParams.set(key, value); });
    return url.href;
  }

  function renderFinal() {
    track('game_complete', { matched_reference_answers: state.discoveries, total_questions: cfg.questions.length });
    screen(`
      ${logo()}
      <div class="final-art"><img src="assets/animal-quiz-hero.png" alt="Cachorro, porco, vaca e galinha juntos" width="1536" height="1024"></div>
      <div class="final-copy"><h2>Um novo olhar<br>pode ser o começo.</h2><p>${cfg.texts.finalBody}</p></div>
      <div class="final-actions"><a class="primary cta" href="${finalUrl()}" data-action="cta">${cfg.texts.finalCta}</a><button class="secondary" type="button" data-action="share">${cfg.texts.share} <span aria-hidden="true">↗</span></button><button class="text-button" type="button" data-action="replay">↻ ${cfg.texts.replay}</button><p class="copy-status" role="status" aria-live="polite"></p></div>
    `, 'final');
    app.querySelector('[data-action="cta"]').addEventListener('click', () => track('cta_start_vegan'));
    app.querySelector('[data-action="replay"]').addEventListener('click', () => { track('replay'); state.discoveries = 0; renderIntro(); });
    app.querySelector('[data-action="share"]').addEventListener('click', shareGame);
  }

  async function shareGame() {
    const data = { title: cfg.campaign, text: cfg.shareText, url: location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else { await navigator.clipboard.writeText(`${data.text} ${data.url}`); app.querySelector('.copy-status').textContent = 'Link copiado! Agora é só compartilhar.'; }
      track('share', { method: navigator.share ? 'web_share' : 'copy_link' });
    } catch (error) {
      if (error.name !== 'AbortError') app.querySelector('.copy-status').textContent = 'Não foi possível compartilhar agora.';
    }
  }

  function registerWebMcp() {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const animalIds = new Set(cfg.animals.map(animal => animal.id));
    const register = tool => {
      try { Promise.resolve(context.registerTool(tool)).catch(() => {}); } catch (_) {}
    };

    register({
      name: 'start_quiz',
      title: 'Começar o desafio',
      description: 'Inicia o quiz Quem é Quem? e mostra a primeira pergunta.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute() {
        track('game_start', { input_method: 'webmcp' });
        renderQuestion(0);
        return { status: 'started', question_number: 1, total_questions: cfg.questions.length };
      }
    });

    register({
      name: 'answer_current_question',
      title: 'Responder à pergunta atual',
      description: 'Seleciona uma ou mais espécies para a pergunta visível e exibe a explicação.',
      inputSchema: {
        type: 'object',
        properties: { animal_ids: { type: 'array', items: { type: 'string', enum: [...animalIds] }, minItems: 1, uniqueItems: true } },
        required: ['animal_ids'],
        additionalProperties: false
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        if (!document.querySelector('.game')) throw new Error('Nenhuma pergunta está aberta.');
        if (!input || !Array.isArray(input.animal_ids) || input.animal_ids.length === 0 || input.animal_ids.some(id => !animalIds.has(id))) throw new Error('Informe uma ou mais espécies válidas.');
        state.selected = new Set(input.animal_ids);
        const id = cfg.questions[state.index].id;
        submitAnswer();
        return { status: 'answered', question_id: id, selected_answers: input.animal_ids };
      }
    });

    register({
      name: 'continue_quiz',
      title: 'Continuar o desafio',
      description: 'Avança da explicação atual para a próxima pergunta ou para a conclusão.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute() {
        const current = document.querySelector('.screen');
        if (current?.classList.contains('feedback')) state.index === cfg.questions.length - 1 ? renderBridge() : renderQuestion(state.index + 1);
        else if (current?.classList.contains('bridge')) renderReveal();
        else if (current?.classList.contains('reveal')) renderFinal();
        else throw new Error('Não há uma etapa pronta para avançar.');
        return { status: 'advanced', screen: document.querySelector('.screen')?.classList[1] || 'unknown' };
      }
    });
  }

  registerWebMcp();
  track('landing_view', { referrer: document.referrer || 'direct' });
  renderIntro();
})();
