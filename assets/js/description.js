/* Страница «Описание привилегий» — строится из data.js */
(function () {
  const { $, esc, price } = window.DW;
  const items = window.DW_SHOP.items;
  $('#anchors').innerHTML = items.map((i) => `<a href="#${i.id}">${esc(i.name)}</a>`).join('');
  $('#desc-grid').innerHTML = items.map((i) => `
    <article class="desc-card" id="${i.id}">
      <h3>${esc(i.name)}</h3>
      <ul class="perks">${i.perks.map(([t, cmd]) => `<li><span>${esc(t)}</span>${cmd ? `<span class="cmd">${esc(cmd)}</span>` : ''}</li>`).join('')}</ul>
      ${i.category === 'ranks' && i.id !== 'hero' ? '<p class="meta">Включает возможности всех предыдущих уровней.</p>' : ''}
      ${i.duration ? `<p class="meta">Срок действия: ${esc(i.duration)}</p>` : ''}
      <button class="btn btn-primary" data-buy="${i.id}">Купить за ${price(i.price)}${i.multiple ? ' / шт.' : ''}</button>
    </article>`).join('');
  if (location.hash) { const t = document.querySelector(location.hash); if (t) t.scrollIntoView(); }
})();
