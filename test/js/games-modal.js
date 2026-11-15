/* Окно со списком игр при нажатии на приставку.
   Список игр для каждой приставки редактируется ниже в CONSOLES.
   Картинки берутся из img/body/game/thumb (имя файла без .webp), если картинки нет — оставьте null. */
(function () {
  const G = {
    'UFC 4':                       'ufc_4',
    'Tekken 7':                    'tekken-7-pc-game-steam-cover',
    'FC 26':                       'FC26',
    'Mortal Kombat XL':            'mortal-kombat-xl-xl-pc-game-steam-cover (1)',
    'Mortal Kombat 11':            'mk11',
    'Naruto Storm 4':              'naruto',
    'Street Fighter 6':            'street fighter 6',
    'Ghost of Tsushima':           'ghost-of-tsushima-director-s-cut-pc-steam-cover',
    "Don't Starve Together":       "don't_starve_together",
    'Resident Evil 6':             'Resident-Evil-6',
    'Resident Evil Revelations 2': 'ResidentEvilRevelations2',
    'It Takes Two':                'it-takes-two',
    'Unravel Two':                 'unravel two',
    'Crash Team Racing':           'Crash-Team-Racing',
    'Cuphead':                     'cuphead',
    'A Way Out':                   'a_way_out',
    'Minecraft':                   'minecraft',
    'Spider-Man':                  'Spider-Man',
    'Spider-Man: Miles Morales':   'Spider-Man-Miles-Morales',
    'UFC 5':                       'UFC5',
    'Mortal Kombat 1':             'mortal-kombat-1'
  };

  /* Один и тот же список для PS4 №1, №2 и №4 */
  const PS4_GAMES = ['UFC 4','Tekken 7','FC 26','Mortal Kombat XL','Mortal Kombat 11','Naruto Storm 4','Street Fighter 6',
    'Ghost of Tsushima',"Don't Starve Together",'Resident Evil 6','Resident Evil Revelations 2','It Takes Two',
    'Unravel Two','Crash Team Racing','Cuphead','A Way Out','Minecraft','Spider-Man: Miles Morales'];

  const CONSOLES = {
    1: { title: 'PlayStation 4 · №1', img: 'img/body/card/playstation_4_slim-removebg-preview.png', games: PS4_GAMES },
    2: { title: 'PlayStation 4 · №2', img: 'img/body/card/playstation_4_slim-removebg-preview.png', games: PS4_GAMES },
    3: { title: 'PlayStation 5',      img: 'img/body/card/ps5-600x600.png',
         games: ['Spider-Man','FC 26','UFC 4','Mortal Kombat 11','UFC 5','Mortal Kombat 1'] },
    4: { title: 'PlayStation 4 · №4', img: 'img/body/card/4_tn3-removebg-preview.png', games: PS4_GAMES }
  };

  const modal  = document.getElementById('gamesModal');
  if (!modal) return;
  const elTitle = document.getElementById('gmTitle');
  const elImg   = document.getElementById('gmImg');
  const elStat  = document.getElementById('gmStatus');
  const elCount = document.getElementById('gmCount');
  const elList  = document.getElementById('gmList');
  let lastFocus = null;

  function plural(n) {
    const m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return 'игра';
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'игры';
    return 'игр';
  }

  function open(card) {
    const data = CONSOLES[card.dataset.console];
    if (!data) return;

    elTitle.textContent = data.title;
    const ord = document.getElementById('gmOrder');
    if (ord) ord.dataset.orderText = 'Здравствуйте! Хочу арендовать ' + data.title + '.';
    elImg.src = data.img;

    /* статус: либо «занята всегда» (data-busy), либо читаем текущее значение таймера (сам таймер не трогаем) */
    if (card.dataset.busy === 'always') {
      elStat.textContent = '● Занята';
      elStat.className = 'gm-status busy';
    } else {
      const t = card.querySelector('.timer');
      const status = t ? t.textContent.trim() : '';
      elStat.textContent = status ? (status === 'Свободно' ? '● Свободна сейчас' : '● Занята, освободится через ' + status) : '';
      elStat.className = 'gm-status' + (status === 'Свободно' ? ' free' : ' busy');
    }

    elCount.textContent = data.games.length + ' ' + plural(data.games.length) + ' на этой приставке';

    elList.textContent = '';
    data.games.forEach(function (name) {
      const item = document.createElement('div');
      item.className = 'gm-game';
      const file = G[name];
      if (file) {
        const im = document.createElement('img');
        im.src = 'img/body/game/thumb/' + encodeURIComponent(file) + '.webp';
        im.alt = '';
        im.loading = 'lazy';
        item.appendChild(im);
      } else {
        const ph = document.createElement('div');
        ph.className = 'gm-ph';
        ph.textContent = '🎮';
        item.appendChild(ph);
      }
      const span = document.createElement('span');
      span.textContent = name;
      item.appendChild(span);
      elList.appendChild(item);
    });

    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('gm-open');
    modal.querySelector('.gm-close').focus();
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove('gm-open');
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('.card[data-console]').forEach(function (card) {
    card.addEventListener('click', function () { open(card); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(card); }
    });
  });

  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close')) close();
  });
  document.addEventListener('order:chosen', function () { if (!modal.hidden) close(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden && document.getElementById('orderModal').hidden) close();
  });
})();
