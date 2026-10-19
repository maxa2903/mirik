/* Главная страница: слайдер, кейсы с валютой, магазин, герои. */
(function () {
  const { $, esc, price, altPrice, icons, mountHero, drawFace } = window.DW;
  const C = window.DW_CONFIG;
  const SHOP = window.DW_SHOP;
  const HEROES = window.DW_HEROES;

  // ───────── Слайдер: одна 3D-модель меняет скин вместе со слайдом ─────────
  const slides = [...document.querySelectorAll('.slide')];
  const dots = $('#dots');
  const heroName = $('#hero-name');
  let current = 0;
  let timer;
  let sliderHero;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Слайд ${i + 1}`);
    b.addEventListener('click', () => { show(i); restart(); });
    dots.appendChild(b);
  });

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === current));
    [...dots.children].forEach((d, k) => d.classList.toggle('active', k === current));
    const s = slides[current];
    heroName.textContent = HEROES[s.dataset.hero].name;
    if (sliderHero) sliderHero.set(s.dataset.hero, s.dataset.anim, -0.5);
  }
  function restart() { clearInterval(timer); timer = setInterval(() => show(current + 1), 7000); }

  window.addEventListener('load', () => {
    const el = $('#slider-hero');
    el.dataset.skin = slides[0].dataset.hero;
    el.dataset.anim = slides[0].dataset.anim;
    el.dataset.zoom = '0.85';
    el.dataset.rot = '-0.5';
    el.dataset.manual = '1';
    sliderHero = mountHero(el);
  });
  show(0);
  restart();

  // ───────── Кейсы с валютой (ползунок) ─────────
  const moneyCase = SHOP.items.find((i) => i.id === 'case-money');
  const cb = $('#case-buy');
  if (moneyCase && cb) {
    const range = $('[data-cb-range]', cb);
    const chips = $('[data-cb-chips]', cb);
    [1, 5, 10, 25, 50, 100].forEach((n) => {
      const b = document.createElement('button');
      b.className = 'chip';
      b.textContent = `${n} шт.`;
      b.addEventListener('click', () => { range.value = n; upd(); });
      chips.appendChild(b);
    });
    const upd = () => {
      const q = parseInt(range.value, 10);
      cb.querySelectorAll('[data-cb-qty]').forEach((e) => (e.textContent = q));
      const sum = q * moneyCase.price;
      $('[data-cb-sum]', cb).innerHTML = `${price(sum)}${altPrice(sum) ? ' <small>' + altPrice(sum) + '</small>' : ''}`;
      [...chips.children].forEach((c) => c.classList.toggle('active', parseInt(c.textContent, 10) === q));
    };
    range.addEventListener('input', upd);
    $('[data-cb-buy]', cb).addEventListener('click', () => window.DW.openCheckout('case-money', parseInt(range.value, 10)));
    upd();
  }

  // ───────── Недавно купили (только реальные данные из config.js) ─────────
  if (C.recentPurchases && C.recentPurchases.length) {
    const track = $('#ticker-track');
    const html = C.recentPurchases.map((p) => {
      const n = String(p.nick);
      const masked = n.length > 4 ? n.slice(0, 2) + '***' + n.slice(-2) : n;
      return `<span class="ticker-item"><img src="https://mc-heads.net/avatar/${encodeURIComponent(n)}/20" alt=""><b>${esc(masked)}</b> — ${esc(p.item)}</span>`;
    }).join('');
    track.innerHTML = html + html;
    $('#ticker').hidden = false;
  }

  // ───────── Магазин ─────────
  const tabs = $('#tabs');
  const products = $('#products');
  let cat = SHOP.categories[0].id;

  function productIcon(item) {
    const bg = `background: linear-gradient(135deg, ${item.color} 0%, #14161a 140%)`;
    if (item.category === 'ranks') return `<div class="product-icon" style="${bg}"><div class="rank-gem" style="background: linear-gradient(135deg, #fff 0%, ${item.color} 35%, #0b1a6b 100%)"></div></div>`;
    return `<div class="product-icon" style="${bg}">${item.category === 'cases' ? icons.chest : icons.scroll}</div>`;
  }

  function renderTabs() {
    tabs.innerHTML = SHOP.categories.map((c) =>
      `<button class="tab ${c.id === cat ? 'active' : ''}" data-cat="${c.id}"><span class="tab-ico">${icons[c.icon]}</span>${esc(c.title)}</button>`).join('');
  }
  function renderProducts() {
    products.innerHTML = SHOP.items.filter((i) => i.category === cat).map((i) => `
      <article class="product">
        ${productIcon(i)}
        <h4>${esc(i.name)}</h4>
        <div class="price">${price(i.price)}${i.multiple ? '<small>за 1 шт.</small>' : ''}</div>
        <button class="btn btn-primary" data-buy="${i.id}">Купить ${icons.cart}</button>
        <a class="more" href="description.html#${i.id}">Что входит?</a>
      </article>`).join('');
  }
  tabs.addEventListener('click', (e) => {
    const t = e.target.closest('[data-cat]');
    if (!t) return;
    cat = t.dataset.cat;
    renderTabs();
    renderProducts();
  });
  renderTabs();
  renderProducts();

  // ───────── Герои ─────────
  const list = $('#hero-list');
  const ids = Object.keys(HEROES);
  let stage;
  list.innerHTML = ids.map((id, k) => `
    <button class="hero-card ${k === 0 ? 'active' : ''}" data-hero="${id}">
      <canvas class="face" width="48" height="48"></canvas>
      <div><b>${esc(HEROES[id].name)}</b><span>${esc(HEROES[id].role)}</span></div>
    </button>`).join('') + '<p class="hero-desc" id="hero-desc"></p>';
  list.querySelectorAll('.hero-card').forEach((b) => drawFace($('canvas', b), b.dataset.hero));

  const anims = { spiderman: 'idle', ironman: 'idle', hulk: 'walk', thor: 'wave', 'black-panther': 'crouch', venom: 'hit' };
  function pick(id) {
    list.querySelectorAll('.hero-card').forEach((b) => b.classList.toggle('active', b.dataset.hero === id));
    $('#stage-name').textContent = HEROES[id].name;
    $('#stage-role').textContent = HEROES[id].role;
    $('#hero-desc').textContent = HEROES[id].text;
    if (stage) stage.set(id, anims[id], -0.35);
  }
  list.addEventListener('click', (e) => {
    const b = e.target.closest('.hero-card');
    if (b) pick(b.dataset.hero);
  });
  window.addEventListener('load', () => { stage = mountHero($('#stage')); });
  pick(ids[0]);
})();
