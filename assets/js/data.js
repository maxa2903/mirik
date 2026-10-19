/*
 * Товары магазина DutyWorld. Цены — из прайса Мирика.
 *
 * ⚠ Списки возможностей (perks) — ПРИМЕР по образцу похожих серверов.
 *   Перед публикацией замените их на то, что реально выдаётся на сервере,
 *   и укажите срок действия (duration), если он ограничен.
 *
 * command — команда выдачи для консоли сервера ({nick} заменяется на ник).
 *   Сейчас выдача ручная; поле пригодится для автоматической выдачи.
 */
window.DW_SHOP = {
  categories: [
    { id: 'ranks', title: 'Привилегии', icon: 'crown' },
    { id: 'cases', title: 'Кейсы', icon: 'chest' },
    { id: 'services', title: 'Услуги', icon: 'scroll' }
  ],

  items: [
    // ───────────── Привилегии (каждая включает возможности предыдущих) ─────────────
    {
      id: 'hero', category: 'ranks', name: 'HERO', price: 39, color: '#6fd6ff',
      duration: null, command: 'lp user {nick} parent add hero',
      perks: [
        ['Уникальный кит', '/kit hero'],
        ['Виртуальный верстак', '/craft'],
        ['Узнать крафт', '/recipe'],
        ['Узнать координаты', '/getpos'],
        ['Количество приватов: 2'],
        ['Префикс [HERO] в чате и табе']
      ]
    },
    {
      id: 'titan', category: 'ranks', name: 'TITAN', price: 89, color: '#4fd3f7',
      duration: null, command: 'lp user {nick} parent add titan',
      perks: [
        ['Уникальный кит', '/kit titan'],
        ['Надеть блок на голову', '/hat'],
        ['Восполнить голод', '/feed'],
        ['Количество приватов: 4'],
        ['Префикс [TITAN] в чате и табе']
      ]
    },
    {
      id: 'avenger', category: 'ranks', name: 'AVENGER', price: 129, color: '#3aa8f5',
      duration: null, command: 'lp user {nick} parent add avenger',
      perks: [
        ['Уникальный кит', '/kit avenger'],
        ['Открыть эндер-сундук', '/enderchest'],
        ['Потушить себя от огня', '/ext'],
        ['Игнорировать игрока', '/ignore'],
        ['Количество приватов: 8'],
        ['Домов для /sethome: 6'],
        ['Префикс [AVENGER] в чате и табе']
      ]
    },
    {
      id: 'overlord', category: 'ranks', name: 'OVERLORD', price: 289, color: '#2f86f0',
      duration: null, command: 'lp user {nick} parent add overlord',
      perks: [
        ['Уникальный кит', '/kit overlord'],
        ['Починить предмет', '/repair'],
        ['Найти игроков рядом', '/near'],
        ['Установить личное время', '/ptime'],
        ['Количество приватов: 16'],
        ['Домов для /sethome: 12'],
        ['Префикс [OVERLORD] в чате и табе']
      ]
    },
    {
      id: 'magister', category: 'ranks', name: 'MAGISTER', price: 589, color: '#2563eb',
      duration: null, command: 'lp user {nick} parent add magister',
      perks: [
        ['Уникальный кит', '/kit magister'],
        ['Сменить ник в игре', '/nick'],
        ['Починить все предметы', '/repair all'],
        ['Пополнить здоровье', '/heal'],
        ['Отключить телепортацию к себе', '/tptoggle'],
        ['Количество приватов: 48'],
        ['Домов для /sethome: 32'],
        ['Префикс [MAGISTER] в чате и табе']
      ]
    },
    {
      id: 'imperator', category: 'ranks', name: 'IMPERATOR', price: 999, color: '#1a4beb',
      duration: null, command: 'lp user {nick} parent add imperator',
      perks: [
        ['Уникальный кит', '/kit imperator'],
        ['Писать объявления', '/broadcast'],
        ['Узнать настоящий ник игрока', '/realname'],
        ['Ударить молнией', '/lightning'],
        ['Количество приватов: 96'],
        ['Домов для /sethome: 48'],
        ['Префикс [IMPERATOR] в чате и табе']
      ]
    },
    {
      id: 'dragon', category: 'ranks', name: 'DRAGON', price: 1899, color: '#1638c9',
      duration: null, command: 'lp user {nick} parent add dragon',
      perks: [
        ['Уникальный кит', '/kit dragon'],
        ['Включить режим полёта', '/fly'],
        ['Установить погоду', '/sun /rain'],
        ['Установить время суток', '/day /night'],
        ['Заход даже на заполненный сервер'],
        ['Количество приватов: 999+'],
        ['Префикс [DRAGON] в чате и табе']
      ]
    },
    {
      id: 'knight', category: 'ranks', name: 'KNIGHT', price: 2199, color: '#0f2a9e',
      duration: null, command: 'lp user {nick} parent add knight',
      perks: [
        ['Уникальный кит', '/kit knight'],
        ['Доступ к префиксам', '/prefix'],
        ['Дополнительный мега-набор', '/kit pluspro'],
        ['Домов для /sethome: 999+'],
        ['Префикс [KNIGHT] в чате и табе']
      ]
    },

    // ───────────── Кейсы (можно купить несколько штук) ─────────────
    {
      id: 'case-donate', category: 'cases', name: 'Кейс с донатом', price: 49, color: '#1a4beb',
      multiple: true, command: 'crates key give {nick} donate {qty}',
      perks: [
        ['Кейс удачи: из него может выпасть одна из привилегий сервера.'],
        ['Чем больше кейсов — тем больше шансов на топовую привилегию.'],
        ['Открыть кейс можно сразу после выдачи.']
      ]
    },
    {
      id: 'case-money', category: 'cases', name: 'Кейс с валютой', price: 25, color: '#4fd3f7',
      multiple: true, command: 'crates key give {nick} money {qty}',
      perks: [
        ['Кейс удачи: из него выпадает случайное количество игровой валюты.'],
        ['Открыть кейс можно сразу после выдачи.']
      ]
    },
    {
      id: 'case-spyron', category: 'cases', name: 'Кейс Спайрона', price: 79, color: '#2f86f0',
      multiple: true, command: 'crates key give {nick} spyron {qty}',
      perks: [
        ['Особый кейс Спайрона с редкими наградами.'],
        ['Открыть кейс можно сразу после выдачи.']
      ]
    },

    // ───────────── Услуги ─────────────
    {
      id: 'unban', category: 'services', name: 'Разбан', price: 99, color: '#23262c',
      command: 'unban {nick}',
      perks: [
        ['Снимает блокировку входа на сервер, выданную за нарушение правил.'],
        ['Действует для текущего активного бана вашего аккаунта.']
      ]
    },
    {
      id: 'unmute', category: 'services', name: 'Размут', price: 49, color: '#3b4048',
      command: 'unmute {nick}',
      perks: [
        ['Снимает запрет на использование чата, выданный за нарушение правил.'],
        ['Действует для текущего активного мута вашего аккаунта.']
      ]
    }
  ]
};
