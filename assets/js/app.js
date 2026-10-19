/*
 * Общий код всех страниц: шапка, подвал, онлайн сервера,
 * 3D-скины героев и окно покупки.
 */
(function () {
  const C = window.DW_CONFIG;
  const SHOP = window.DW_SHOP;

  // ───────── Иконки ─────────
  const I = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 10.2a2 2 0 0 0 2 1.6h7.4a2 2 0 0 0 2-1.5L21 8H6.2"/><circle cx="10" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10" cy="8" r="4"/><path d="M2 21a8 8 0 0 1 16 0M19 8v6M16 11h6"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    crown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5L3 8z"/></svg>',
    chest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="9" width="18" height="11" rx="2"/><path d="M3 13h18M5 9V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v2"/><rect x="10.5" y="11.5" width="3" height="4" rx="1"/></svg>',
    scroll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M7 3h11a2 2 0 0 1 2 2v12H9v2a2 2 0 1 1-4 0V5a2 2 0 0 1 2-2z"/><path d="M9 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-2H9M10 8h6M10 12h6"/></svg>',
    coin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="7" rx="8" ry="3.5"/><path d="M4 7v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5V7M4 12v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v-5"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.7 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.3 5.3A17 17 0 0 0 15 4l-.5 1a15 15 0 0 0-5 0L9 4a17 17 0 0 0-4.3 1.3C2 9.4 1.3 13.4 1.6 17.3A17 17 0 0 0 6.8 20l1.1-1.7c-.6-.2-1.2-.5-1.7-.8l.4-.3a12 12 0 0 0 10.8 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.7a17 17 0 0 0 5.2-2.7c.4-4.5-.7-8.5-3.1-12zM8.7 15c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1zm6.6 0c-1 0-1.9-1-1.9-2.1s.8-2.1 1.9-2.1 1.9 1 1.9 2.1-.8 2.1-1.9 2.1z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 3.6 2.9 10.8c-1.3.5-1.2 1.2-.2 1.5l4.7 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.3-1.5zM9.6 13.4l8.6-5.4c.4-.3.8-.1.5.2l-7.1 6.4-.3 3.1-1.7-4.3z"/></svg>'
  };
  window.DW_ICONS = I;

  // ───────── Утилиты ─────────
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = (n) => n.toLocaleString('ru-RU');
  const price = (n) => `${fmt(n)} ${C.currency}`;
  const altPrice = (n) => (C.altCurrency.enabled && C.altCurrency.rate > 0)
    ? `≈ ${fmt(Math.round(n * C.altCurrency.rate))} ${C.altCurrency.label}` : '';

  function toast(text) {
    let t = $('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = text;
    t.classList.add('show');
    clearTimeout(t._h);
    t._h = setTimeout(() => t.classList.remove('show'), 2200);
  }

  async function copy(text, msg = 'Скопировано') {
    try { await navigator.clipboard.writeText(text); }
    catch (e) {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (_) { /* ничего */ }
      ta.remove();
    }
    toast(msg);
  }

  window.DW = { $, esc, fmt, price, altPrice, toast, copy, icons: I };

  // ───────── Шапка ─────────
  const page = document.body.dataset.page || '';
  const NAV = [
    ['home', 'index.html', 'Главная'],
    ['description', 'description.html', 'Описание привилегий'],
    ['rules', 'doc.html?d=rules', 'Правила'],
    ['play', 'play.html', 'Как зайти?'],
    ['support', 'support.html', 'Поддержка']
  ];

  function renderHeader() {
    const el = $('#header');
    if (!el) return;
    el.className = 'header';
    el.innerHTML = `
      <div class="container header-inner">
        <a class="brand" href="index.html"><img src="assets/img/logo-192.png" alt="">${esc(C.projectName)}</a>
        <nav class="nav">${NAV.map(([id, href, t]) => `<a href="${href}" class="${id === page ? 'active' : ''}">${t}</a>`).join('')}</nav>
        <div class="online" title="Онлайн сервера ${esc(C.serverIp)}">
          <div class="online-row"><span>Онлайн</span><b data-online>…</b></div>
          <div class="online-bar"><i data-online-bar></i></div>
        </div>
        <a class="btn btn-primary btn-shop" href="index.html#shop"><span>Магазин</span>${I.cart}</a>
        <button class="burger" aria-label="Меню">${I.menu}</button>
      </div>`;
    $('.burger', el).addEventListener('click', () => el.classList.toggle('menu-open'));
  }

  // ───────── Подвал ─────────
  function renderFooter() {
    const el = $('#footer');
    if (!el) return;
    el.className = 'footer';
    const year = new Date().getFullYear();
    el.innerHTML = `
      <div class="container">
        <div class="footer-top">
          <div class="footer-copy">
            <b>© ${esc(C.projectName)}, ${year}. Все права защищены.</b>
            <p>${esc(C.projectName)} не связан с Mojang AB и Microsoft. Minecraft — товарный знак Mojang AB. Все средства идут на развитие проекта.</p>
          </div>
          <div class="footer-links">
            <a href="index.html">Главная</a>
            <a href="play.html">Как зайти?</a>
            <a href="play.html#security">Защита аккаунта</a>
            <a href="staff.html">Набор в состав</a>
            <a href="description.html">Описание привилегий</a>
            <a href="payments.html">Способы оплаты</a>
            <a href="doc.html?d=rules">Правила</a>
            <a href="support.html">Поддержка</a>
            <a href="support.html#check">Проверка на читы</a>
          </div>
        </div>
        <div class="footer-mark">${esc(C.projectName)}</div>
        <div class="footer-char" data-skin="venom" data-anim="idle" data-zoom="0.75" data-rot="0.5"></div>
        <div class="footer-bottom">
          <div class="footer-legal">
            <p>Оператор проекта: ${esc(C.operator)}</p>
            <p>Сервер: ${esc(C.serverIp)}</p>
            <p>Связь: <a href="${C.links.telegram}" target="_blank" rel="noopener">${esc(C.links.telegramName)}</a> · <a href="${C.links.discord}" target="_blank" rel="noopener">Discord</a></p>
            <div class="footer-docs">
              <a href="doc.html?d=agreement">Пользовательское соглашение</a>
              <a href="doc.html?d=privacy">Политика конфиденциальности</a>
              <a href="doc.html?d=cookie">Политика cookie</a>
              <a href="doc.html?d=rules">Правила сервера</a>
            </div>
          </div>
          <div class="socials">
            <a href="${C.links.telegram}" target="_blank" rel="noopener" aria-label="Telegram">${I.telegram}</a>
            <a href="${C.links.discord}" target="_blank" rel="noopener" aria-label="Discord">${I.discord}</a>
          </div>
        </div>
      </div>`;

    const help = document.createElement('div');
    help.className = 'help';
    help.innerHTML = `<span>Нужна помощь?</span><a href="${C.links.telegram}" target="_blank" rel="noopener" aria-label="Поддержка в Telegram">${I.chat}</a>`;
    document.body.appendChild(help);
  }

  // ───────── Онлайн сервера (api.mcsrvstat.us) ─────────
  async function loadOnline() {
    const out = document.querySelectorAll('[data-online]');
    const bars = document.querySelectorAll('[data-online-bar]');
    if (!out.length) return;
    try {
      const r = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(C.serverIp)}`);
      const d = await r.json();
      // Когда сервер Aternos спит, отвечает заглушка: online=true, но версия «● Offline»
      const asleep = /offline/i.test(String(d.version || '')) ||
        ((d.motd && d.motd.clean) || []).some((l) => /server is offline/i.test(l));
      if (d.online && !asleep && d.players && d.players.max > 0) {
        const { online, max } = d.players;
        out.forEach((e) => (e.textContent = `${online} / ${max}`));
        bars.forEach((b) => (b.style.width = `${Math.max(4, Math.round((online / max) * 100))}%`));
      } else {
        out.forEach((e) => (e.textContent = 'выключен'));
      }
    } catch (e) {
      out.forEach((el) => (el.textContent = '—'));
    }
  }

  // ───────── 3D-скины героев (skinview3d) ─────────
  const HEROES = {
    spiderman: { name: 'Человек-паук', role: 'Главный герой DutyWorld', text: 'Дружелюбный сосед, который первым встречает новичков на спавне и помогает освоиться.' },
    ironman: { name: 'Железный человек', role: 'Инженер и торговец', text: 'Отвечает за магазин и технологии сервера. Знает цену каждой привилегии.' },
    hulk: { name: 'Халк', role: 'Сила и выносливость', text: 'Защитник спавна. Покажет новичкам, как зайти на сервер и не потеряться.' },
    thor: { name: 'Тор', role: 'Командир состава', text: 'Собирает команду модераторов и следит за порядком на сервере.' },
    'black-panther': { name: 'Чёрная пантера', role: 'Страж безопасности', text: 'Расскажет, как защитить аккаунт, ник и постройки от взлома.' },
    venom: { name: 'Веном', role: 'Тёмная сторона', text: 'Охотится на читеров и нарушителей правил. Лучше с ним не встречаться.' }
  };
  window.DW_HEROES = HEROES;
  const skinUrl = (id) => `assets/skins/${id}.png`;

  function makeAnimation(name) {
    const s = window.skinview3d;
    switch (name) {
      case 'walk': return new s.WalkingAnimation();
      case 'run': return new s.RunningAnimation();
      case 'wave': return new s.WaveAnimation();
      case 'fly': return new s.FlyingAnimation();
      case 'crouch': return new s.CrouchAnimation();
      case 'hit': return new s.HitAnimation();
      default: return new s.IdleAnimation();
    }
  }

  /** Создаёт 3D-модель героя в элементе. Параметры берутся из data-атрибутов. */
  function mountHero(el, opts = {}) {
    if (!window.skinview3d || !el) return null;
    const o = {
      skin: el.dataset.skin || 'spiderman',
      anim: el.dataset.anim || 'idle',
      zoom: parseFloat(el.dataset.zoom || '0.9'),
      rot: parseFloat(el.dataset.rot || '-0.45'),
      drag: el.dataset.drag === '1',
      ...opts
    };
    const canvas = document.createElement('canvas');
    el.appendChild(canvas);
    const w = el.clientWidth || 300;
    const h = el.clientHeight || 400;
    let viewer;
    try {
      viewer = new skinview3d.SkinViewer({ canvas, width: w, height: h, skin: skinUrl(o.skin) });
    } catch (e) {
      canvas.remove();
      return null; // WebGL недоступен — просто без 3D
    }
    viewer.fov = 40;
    viewer.zoom = o.zoom;
    viewer.playerObject.rotation.y = o.rot;
    viewer.animation = makeAnimation(o.anim);
    viewer.controls.enableZoom = false;
    viewer.controls.enablePan = false;
    viewer.controls.enableRotate = o.drag;
    new ResizeObserver(() => {
      if (el.clientWidth && el.clientHeight) viewer.setSize(el.clientWidth, el.clientHeight);
    }).observe(el);
    // Не рисуем, когда модель не видна на экране
    new IntersectionObserver(([en]) => { viewer.renderPaused = !en.isIntersecting; }).observe(el);
    return {
      viewer,
      set(skin, anim, rot) {
        viewer.loadSkin(skinUrl(skin));
        if (anim) viewer.animation = makeAnimation(anim);
        if (typeof rot === 'number') viewer.playerObject.rotation.y = rot;
      }
    };
  }
  window.DW.mountHero = mountHero;

  /** Рисует лицо скина (8×8) на canvas — для маленьких аватарок. */
  function drawFace(canvas, skin) {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 8, 8, 8, 8, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 40, 8, 8, 8, 0, 0, canvas.width, canvas.height);
    };
    img.src = skinUrl(skin);
  }
  window.DW.drawFace = drawFace;

  // ───────── Окно покупки ─────────
  const NICK_RE = /^[A-Za-z0-9_]{3,16}$/;
  let modal;

  function ensureModal() {
    if (modal) return modal;
    modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = '<div class="modal-box" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Закрыть">×</button><div class="modal-body"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal || e.target.closest('.modal-close')) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    return modal;
  }
  function closeModal() { if (modal) modal.classList.remove('open'); }

  function openCheckout(itemId, qty = 1) {
    const item = SHOP.items.find((i) => i.id === itemId);
    if (!item) return;
    ensureModal();
    const body = $('.modal-body', modal);
    const unit = item.multiple ? 'шт.' : '';
    body.innerHTML = `
      <h3>${esc(item.name)}</h3>
      <p class="muted">${item.category === 'ranks' ? 'Привилегия' : item.category === 'cases' ? 'Кейс' : 'Услуга'} · ${price(item.price)}${unit ? ' за 1 ' + unit : ''}${item.duration ? ' · ' + esc(item.duration) : ''}</p>
      <div class="field" data-f="nick">
        <label for="dw-nick">Ваш ник на сервере</label>
        <input id="dw-nick" type="text" maxlength="16" autocomplete="off" placeholder="Например, Mirik">
        <span class="error">Ник: 3–16 символов, только латиница, цифры и «_»</span>
      </div>
      ${item.multiple ? `
      <div class="field" data-f="qty">
        <label for="dw-qty">Количество</label>
        <input id="dw-qty" type="number" min="1" max="100" value="${qty}">
        <span class="error">От 1 до 100</span>
      </div>` : ''}
      <div class="total"><span>К оплате</span><b data-total></b></div>
      <label class="check"><input type="checkbox" id="dw-agree">
        <span>Я ознакомлен(а) с <a href="doc.html?d=agreement" target="_blank">Пользовательским соглашением</a> и <a href="doc.html?d=rules" target="_blank">Правилами сервера</a> и понимаю, что донат — это игровые возможности, а не физический товар.</span></label>
      <button class="btn btn-primary" data-next disabled>Перейти к оплате ${I.cart}</button>`;

    const nickF = $('[data-f=nick]', body);
    const qtyF = $('[data-f=qty]', body);
    const agree = $('#dw-agree', body);
    const next = $('[data-next]', body);
    const getQty = () => (qtyF ? parseInt($('input', qtyF).value, 10) || 0 : 1);
    const update = () => {
      const q = getQty();
      const sum = item.price * Math.max(q, 0);
      $('[data-total]', body).innerHTML = `${price(sum)} <small class="link-muted">${altPrice(sum)}</small>`;
      next.disabled = !agree.checked;
    };
    body.addEventListener('input', update);
    update();

    next.addEventListener('click', () => {
      const nick = $('input', nickF).value.trim();
      const q = getQty();
      const okNick = NICK_RE.test(nick);
      const okQty = q >= 1 && q <= 100;
      nickF.classList.toggle('invalid', !okNick);
      if (qtyF) qtyF.classList.toggle('invalid', !okQty);
      if (okNick && okQty) showPayment(item, nick, q);
    });

    modal.classList.add('open');
    setTimeout(() => $('#dw-nick', body).focus(), 50);
  }

  function showPayment(item, nick, qty) {
    const body = $('.modal-body', modal);
    const sum = item.price * qty;
    const code = 'DW-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    const p = C.payment;
    const what = item.multiple ? `${item.name} × ${qty}` : item.name;
    const orderText = `Заказ ${code}\nНик: ${nick}\nТовар: ${what}\nСумма: ${price(sum)}`;

    if (!p.cardNumber) {
      body.innerHTML = `
        <h3>Оплата временно недоступна</h3>
        <p class="muted">Приём платежей ещё настраивается. Напишите администрации — вам подскажут, как приобрести «${esc(what)}».</p>
        <div class="req">
          <div class="req-row"><span>Код заказа</span><b>${code}</b></div>
          <div class="req-row"><span>Ник</span><b>${esc(nick)}</b></div>
          <div class="req-row"><span>Сумма</span><b>${price(sum)}</b></div>
        </div>
        <button class="btn btn-primary" data-copy-order>Скопировать заказ ${I.copy}</button>
        <a class="btn btn-ghost" href="${C.links.telegram}" target="_blank" rel="noopener">Написать в Telegram ${I.telegram}</a>`;
    } else {
      body.innerHTML = `
        <h3>Оплата переводом на карту</h3>
        <p class="muted">${esc(what)} для игрока <b>${esc(nick)}</b></p>
        <ol class="steps-mini">
          <li>Переведите <b>${price(sum)}</b> на карту ниже.</li>
          <li>Сохраните скриншот или чек перевода.</li>
          <li>Отправьте чек и код заказа <b>${code}</b> в Telegram или Discord.</li>
        </ol>
        <div class="req">
          <div class="req-row"><span>Номер карты</span><b>${esc(p.cardNumber)}</b><button class="copy" data-copy="${esc(p.cardNumber.replace(/\s/g, ''))}">Копировать</button></div>
          ${p.cardHolder ? `<div class="req-row"><span>Получатель</span><b>${esc(p.cardHolder)}</b></div>` : ''}
          ${p.bankName ? `<div class="req-row"><span>Банк / карта</span><b>${esc(p.bankName)}</b></div>` : ''}
          <div class="req-row"><span>Сумма</span><b>${price(sum)} ${altPrice(sum) ? '<br><small class="link-muted">' + altPrice(sum) + '</small>' : ''}</b></div>
          <div class="req-row"><span>Код заказа</span><b>${code}</b><button class="copy" data-copy="${code}">Копировать</button></div>
        </div>
        <p class="muted">${esc(p.note)}</p>
        <button class="btn btn-primary" data-copy-order>Скопировать данные заказа ${I.copy}</button>
        <a class="btn btn-ghost" href="${C.links.telegram}" target="_blank" rel="noopener">Отправить чек в Telegram ${I.telegram}</a>
        <a class="btn btn-ghost" href="${C.links.discord}" target="_blank" rel="noopener">Отправить чек в Discord ${I.discord}</a>`;
    }
    body.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => copy(b.dataset.copy)));
    $('[data-copy-order]', body).addEventListener('click', () => copy(orderText, 'Данные заказа скопированы'));
  }
  window.DW.openCheckout = openCheckout;

  // Кнопки «Купить» на любой странице: <button data-buy="hero">
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-buy]');
    if (b) { e.preventDefault(); openCheckout(b.dataset.buy, parseInt(b.dataset.qty || '1', 10)); }
    const c = e.target.closest('[data-copy-ip]');
    if (c) copy(C.serverIp, 'IP сервера скопирован');
  });

  // ───────── Запуск ─────────
  renderHeader();
  renderFooter();
  document.querySelectorAll('[data-ip]').forEach((e) => (e.textContent = C.serverIp));
  document.querySelectorAll('[data-versions]').forEach((e) => (e.textContent = C.versions));
  loadOnline();
  // 3D-модели монтируем после загрузки страницы
  window.addEventListener('load', () => {
    document.querySelectorAll('[data-skin]:not([data-manual])').forEach((el) => mountHero(el));
  });
})();
