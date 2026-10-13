/* SwitchedGames showcase. Individual games and Benny's Hub retain their existing URLs. */
(() => {
  'use strict';
  const data = JSON.parse(document.getElementById('game-data').textContent);
  const byId = new Map(data.map(game => [game.id, game]));
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const store = {
    get(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
  };
  const savedFavorites = store.get('switchedgames-favorites', []);
  const savedRecent = store.get('switchedgames-recent', []);
  let favorites = new Set((Array.isArray(savedFavorites) ? savedFavorites : []).filter(id => byId.has(id)));
  let recent = (Array.isArray(savedRecent) ? savedRecent : []).filter(id => byId.has(id));
  let collection = 'all';
  const grid = $('#game-grid');
  const cards = new Map($$('.game-card').map(card => [card.dataset.gameId, card]));
  const search = $('#game-search');
  const category = $('#category-filter');
  const multiplayer = $('#multiplayer-filter');
  const editor = $('#editor-filter');
  const concept = $('#concept-filter');
  const sort = $('#sort-filter');
  const categories = {
    sports: 'Sports', strategy: 'Strategy & Board', arcade: 'Arcade & Action',
    puzzle: 'Puzzle, Word & Memory', simulation: 'Simulation', 'cause-effect': 'Cause & Effect', casino: 'Casino'
  };
  function announce(message) { $('#action-status').textContent = message; }
  function updateFavorites() {
    $('#favorite-count').textContent = favorites.size;
    $$('.favorite-button').forEach(button => {
      const game = byId.get(button.dataset.favorite);
      const isFavorite = favorites.has(game.id);
      button.setAttribute('aria-pressed', String(isFavorite));
      button.setAttribute('aria-label', (isFavorite ? 'Remove ' : 'Save ') + game.title + (isFavorite ? ' from favorites' : ' to favorites'));
      button.title = isFavorite ? 'Remove from favorites' : 'Save to favorites';
    });
  }
  function filterGames() {
    const query = search.value.trim().toLocaleLowerCase();
    let matches = data.filter(game =>
      (!query || (game.title + ' ' + game.description + ' ' + game.categories.map(key => categories[key]).join(' ')).toLocaleLowerCase().includes(query)) &&
      (category.value === 'all' || game.categories.includes(category.value)) &&
      (!multiplayer.checked || game.multiplayer) &&
      (!editor.checked || game.editor) &&
      (!concept.checked || game.concept) &&
      (collection !== 'favorites' || favorites.has(game.id)) &&
      (collection !== 'recent' || recent.includes(game.id))
    );
    if (sort.value === 'az') matches.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort.value === 'za') matches.sort((a, b) => b.title.localeCompare(a.title));
    else if (collection === 'recent') matches.sort((a, b) => recent.indexOf(a.id) - recent.indexOf(b.id));
    const visible = new Set(matches.map(game => game.id));
    cards.forEach((card, id) => { card.hidden = !visible.has(id); });
    matches.forEach(game => grid.append(cards.get(game.id)));
    $('#game-count').textContent = matches.length + (matches.length === 1 ? ' game' : ' games') + (collection === 'all' ? ' to explore' : '');
    const labels = [];
    if (query) labels.push('Search: “' + search.value.trim() + '”');
    if (category.value !== 'all') labels.push(categories[category.value]);
    if (multiplayer.checked) labels.push('Multiplayer');
    if (editor.checked) labels.push('Game editors');
    if (concept.checked) labels.push('New concepts');
    $('#filter-summary').hidden = !labels.length;
    $('#filter-text').textContent = labels.join(' · ');
    $('#empty-state').hidden = matches.length > 0;
    grid.hidden = matches.length === 0;
    if (!matches.length) {
      const personalEmpty = !labels.length && collection !== 'all';
      $('#empty-title').textContent = personalEmpty ? (collection === 'favorites' ? 'Your favorites start here.' : 'Your next adventure is waiting.') : 'No games found';
      $('#empty-copy').textContent = personalEmpty ?
        (collection === 'favorites' ? 'Select the star on a game to save it here on this device.' : 'Open a game and it will appear here for a quick return.') :
        'Try a different search or clear your filters to explore more games.';
    }
    $('#library-title').textContent = collection === 'favorites' ? 'Your favorites.' : collection === 'recent' ? 'Recently played.' : 'Find your next favorite.';
    $$('[data-collection]').forEach(button => {
      const active = button.dataset.collection === collection;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $$('[data-category-select]').forEach(button => {
      const active = button.dataset.categorySelect === category.value;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    updateFavorites();
  }
  function resetFilters(resetCollection = false) {
    search.value = '';
    category.value = 'all';
    multiplayer.checked = editor.checked = concept.checked = false;
    sort.value = 'featured';
    if (resetCollection) collection = 'all';
    filterGames();
  }
  function closeMenu() {
    $('#sidebar').classList.remove('is-open');
    $('#menu-button').setAttribute('aria-expanded', 'false');
    $('#menu-button').setAttribute('aria-label', 'Open navigation');
  }
  function showLibrary() { closeMenu(); $('#games').scrollIntoView({block: 'start'}); }
  search.addEventListener('input', filterGames);
  [category, multiplayer, editor, concept, sort].forEach(input => input.addEventListener('change', filterGames));
  $('#clear-filters').addEventListener('click', () => resetFilters());
  $('#empty-reset').addEventListener('click', () => resetFilters(true));
  $$('[data-collection]').forEach(button => button.addEventListener('click', () => {
    collection = button.dataset.collection;
    resetFilters();
    showLibrary();
  }));
  $$('[data-category-select]').forEach(button => button.addEventListener('click', () => {
    collection = 'all';
    category.value = button.dataset.categorySelect;
    filterGames();
    showLibrary();
  }));
  $$('.favorite-button').forEach(button => button.addEventListener('click', () => {
    const id = button.dataset.favorite;
    const hadFavorite = favorites.has(id);
    if (hadFavorite) favorites.delete(id); else favorites.add(id);
    const persisted = store.set('switchedgames-favorites', [...favorites]);
    filterGames();
    announce(byId.get(id).title + (hadFavorite ? ' removed from favorites.' : ' saved to favorites.') + (!persisted ? ' Available for this visit only; browser storage is unavailable.' : ''));
  }));
  function markPlayed(id) {
    recent = [id, ...recent.filter(item => item !== id)].slice(0, 30);
    store.set('switchedgames-recent', recent);
    if (collection === 'recent') filterGames();
  }
  $$('[data-play]').forEach(link => link.addEventListener('click', () => markPlayed(link.dataset.play)));
  const dialog = $('#game-dialog');
  $$('.detail-button').forEach(button => button.addEventListener('click', () => {
    const game = byId.get(button.dataset.details);
    $('#dialog-image').src = game.image;
    $('#dialog-image').alt = game.title;
    $('#dialog-title').textContent = game.title;
    $('#dialog-category').textContent = game.categories.map(key => categories[key]).join(' / ') + (game.concept ? ' · New concept' : '');
    $('#dialog-description').textContent = game.description;
    $('#dialog-note').textContent = game.note;
    $('#dialog-note').hidden = !game.note;
    $('#dialog-credit').innerHTML = game.credit;
    $('#dialog-credit').hidden = !game.credit;
    $('#dialog-play').href = game.url;
    $('#dialog-play').dataset.gameId = game.id;
    dialog.showModal();
  }));
  $('#dialog-play').addEventListener('click', () => markPlayed($('#dialog-play').dataset.gameId));
  $('#dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
  });
  $$('.game-art img, #dialog-image').forEach(img => img.addEventListener('error', () => {
    if (img.dataset.fallback) return;
    img.dataset.fallback = 'true';
    img.src = 'images/branding/switchedgames-logo.svg';
    img.style.objectFit = 'contain';
    img.style.padding = '24px';
  }));
  const tabs = $$('.hero-tabs [role=tab]');
  function selectSlide(index, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(index === i));
      tab.tabIndex = index === i ? 0 : -1;
      $('#slide-' + i).hidden = index !== i;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectSlide(index));
    tab.addEventListener('keydown', event => {
      let next = index;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      selectSlide(next, true);
    });
  });
  const video = $('#hero-video');
  const videoToggle = $('#video-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let wantsVideo = !reducedMotion.matches && !navigator.connection?.saveData;
  function updateVideoButton() {
    videoToggle.setAttribute('aria-label', video.paused ? 'Play background video' : 'Pause background video');
    videoToggle.setAttribute('aria-pressed', String(!video.paused));
    videoToggle.querySelector('use').setAttribute('href', video.paused ? '#i-play' : '#i-pause');
  }
  async function startVideo() {
    if (!wantsVideo || document.hidden) return;
    try { await video.play(); } catch { /* The poster remains usable when playback is blocked. */ }
    updateVideoButton();
  }
  video.addEventListener('play', updateVideoButton);
  video.addEventListener('pause', updateVideoButton);
  videoToggle.addEventListener('click', () => {
    wantsVideo = video.paused;
    if (wantsVideo) startVideo(); else video.pause();
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) video.pause(); else startVideo(); });
  reducedMotion.addEventListener('change', event => { if (event.matches) { wantsVideo = false; video.pause(); } });
  $('#menu-button').addEventListener('click', () => {
    const open = $('#sidebar').classList.toggle('is-open');
    $('#menu-button').setAttribute('aria-expanded', String(open));
    $('#menu-button').setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('#sidebar, #menu-button')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey &&
        !event.target.closest('input,textarea,select,[contenteditable=true]') && !document.querySelector('dialog[open]')) {
      event.preventDefault();
      search.focus();
    }
  });
  function openHash(hash, scroll) {
    if (!hash || hash === '#') return;
    let target;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
    if (!target) return;
    const drawer = target.closest('details');
    if (drawer) drawer.open = true;
    if (scroll) requestAnimationFrame(() => target.scrollIntoView({block:'start'}));
  }
  $$('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
    openHash(link.getAttribute('href'), true);
    closeMenu();
  }));
  window.addEventListener('hashchange', () => openHash(location.hash, true));
  openHash(location.hash, true);
  let donationLoaded = false;
  $('#donate').addEventListener('toggle', () => {
    if (!$('#donate').open || donationLoaded) return;
    donationLoaded = true;
    const widget = document.createElement('script');
    widget.src = 'https://widgets.givebutter.com/latest.umd.cjs?acct=JlNZTQzhAyoKDVPC&p=other';
    widget.async = true;
    document.head.append(widget);
  });
  // Keep the click cues and cleanup aligned with the CSS impact/landing keyframes.
  const introTiming = { durationMs: 3000, dockDurationMs: 800, impact: 0.28, landings: [0.68, 0.72] };
  let audioContext;
  function introSound(interactive) {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      audioContext ||= new Audio();
      if (interactive && audioContext.state === 'suspended') audioContext.resume().then(scheduleClicks).catch(() => {});
      else if (audioContext.state === 'running') scheduleClicks();
    } catch { /* Audio is an optional enhancement. */ }
  }
  function scheduleClicks() {
    const context = audioContext;
    const start = context.currentTime;
    [introTiming.impact, ...introTiming.landings].forEach((fraction, index) => {
      const delay = introTiming.durationMs / 1000 * fraction;
      const length = Math.floor(context.sampleRate * 0.045);
      const buffer = context.createBuffer(1, length, context.sampleRate);
      const channel = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) channel[i] = (Math.random() * 2 - 1) * Math.exp(-i / (length / 7));
      const source = context.createBufferSource();
      source.buffer = buffer;
      const filter = context.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = index ? 2200 : 1400;
      filter.Q.value = .7;
      const gain = context.createGain();
      gain.gain.value = .28;
      source.connect(filter).connect(gain).connect(context.destination);
      source.start(start + delay);
      const tone = context.createOscillator();
      const envelope = context.createGain();
      tone.type = 'triangle';
      tone.frequency.setValueAtTime(index ? 620 : 420, start + delay);
      tone.frequency.exponentialRampToValueAtTime(90, start + delay + .035);
      envelope.gain.setValueAtTime(.075, start + delay);
      envelope.gain.exponentialRampToValueAtTime(.001, start + delay + .05);
      tone.connect(envelope).connect(context.destination);
      tone.start(start + delay);
      tone.stop(start + delay + .06);
    });
  }
  let activeIntro;
  function playIntro(interactive = false) {
    activeIntro?.finish();
    if (reducedMotion.matches) {
      announce('The animation is skipped because reduced motion is enabled.');
      return Promise.resolve();
    }
    const intro = $('#brand-intro');
    const flight = intro.querySelector('.intro-flight');
    const logo = document.querySelector('.site-header .brand img');
    const originalVisibility = logo.style.visibility;
    const run = { done: false };
    intro.style.setProperty('--intro-duration', introTiming.durationMs + 'ms');
    intro.classList.remove('is-docking');
    flight.style.transition = '';
    flight.style.transform = '';
    intro.hidden = true;
    void intro.offsetWidth;
    intro.hidden = false;
    introSound(interactive);
    return new Promise(resolve => {
      run.finish = () => {
        if (run.done) return;
        run.done = true;
        clearTimeout(run.timer);
        intro.hidden = true;
        run.animation?.cancel();
        intro.classList.remove('is-docking');
        logo.style.visibility = originalVisibility;
        flight.style.transition = '';
        flight.style.transform = '';
        if (activeIntro === run) activeIntro = null;
        resolve();
      };
      activeIntro = run;
      run.timer = setTimeout(() => {
        // Measure at takeoff so resizing or scrolling during the intro cannot leave a stale target.
        const from = flight.getBoundingClientRect();
        const target = logo.getBoundingClientRect();
        if (!from.width || !target.width) { run.finish(); return; }
        // Match the 1000×632 logo, centered by object-fit: contain inside the header image.
        const svgScale = Math.min(target.width / 1000, target.height / 632);
        const x = target.left + (target.width - 1000 * svgScale) / 2 - from.left;
        const y = target.top + (target.height - 632 * svgScale) / 2 - from.top;
        const scale = 1000 * svgScale / from.width;
        const destination = 'translate(' + x + 'px,' + y + 'px) scale(' + scale + ')';
        logo.style.visibility = 'hidden';
        intro.classList.add('is-docking');
        if (typeof flight.animate === 'function') {
          run.animation = flight.animate([
            { transform: 'translate(0px,0px) scale(1)' },
            { transform: destination }
          ], { duration: introTiming.dockDurationMs, easing: 'cubic-bezier(.5,0,.2,1)', fill: 'forwards' });
          // Keep the emblem fully visible until the flight actually completes.
          run.animation.finished.then(run.finish, run.finish);
        } else {
          flight.style.transition = 'transform ' + introTiming.dockDurationMs + 'ms cubic-bezier(.5,0,.2,1)';
          void flight.offsetWidth;
          flight.style.transform = destination;
          run.timer = setTimeout(run.finish, introTiming.dockDurationMs + 50);
        }
      }, introTiming.durationMs);
    });
  }
  $('#replay-intro').addEventListener('click', () => playIntro(true));
  function loadStatement() {
    const statement = document.createElement('script');
    statement.src = 'crypto-statement/modal.js';
    statement.dataset.theme = 'switched';
    statement.dataset.autoOpen = 'session';
    document.body.append(statement);
  }
  async function boot() {
    filterGames();
    let seen = false;
    try { seen = sessionStorage.getItem('switchedgames-intro-seen') === '1'; sessionStorage.setItem('switchedgames-intro-seen', '1'); } catch {}
    if (!seen && !location.hash && !document.hidden) await playIntro();
    startVideo();
    loadStatement();
    // Keep production analytics; local previews do not send page views.
    if (location.hostname === 'switchedgames.org' || location.hostname === 'www.switchedgames.org') {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', 'G-FGVD6RB4H1');
      const analytics = document.createElement('script');
      analytics.src = 'https://www.googletagmanager.com/gtag/js?id=G-FGVD6RB4H1';
      analytics.async = true;
      document.head.append(analytics);
    }
  }
  boot();
})();
