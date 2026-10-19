/* Страница документов: загружает Markdown из папки docs/ */
(function () {
  const DOCS = {
    rules: ['rules.md', 'Правила сервера'],
    agreement: ['agreement.md', 'Пользовательское соглашение'],
    privacy: ['privacy.md', 'Политика конфиденциальности'],
    cookie: ['cookie.md', 'Политика cookie']
  };
  const key = new URLSearchParams(location.search).get('d');
  const id = DOCS[key] ? key : 'rules';
  // «Правила» — отдельный пункт меню в шапке
  const navRules = document.querySelector('.nav a[href="doc.html?d=rules"]');
  if (navRules) navRules.classList.toggle('active', id === 'rules');
  document.querySelectorAll('#doc-nav a').forEach((a) => a.classList.toggle('active', a.dataset.d === id));
  document.title = `${DOCS[id][1]} — DutyWorld`;
  const out = document.getElementById('doc');
  fetch(`docs/${DOCS[id][0]}`)
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then((md) => { out.innerHTML = marked.parse(md); })
    .catch(() => {
      out.innerHTML = '<p>Не удалось загрузить документ. Если вы открыли сайт как файл с компьютера, запустите его через локальный веб-сервер (см. README).</p>';
    });
})();
