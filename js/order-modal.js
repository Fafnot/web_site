/* Окно «Куда написать?» — открывается по любой кнопке с атрибутом data-order
   (главная кнопка, плавающая «Заказать PS», кнопка в окне с играми).
   Ссылки на мессенджеры меняются прямо здесь или в index.html (id omWhatsapp / omInstagram). */
(function () {
  const modal = document.getElementById('orderModal');
  if (!modal) return;
  const wa = document.getElementById('omWhatsapp');
  const ig = document.getElementById('omInstagram');
  const WA_BASE = 'https://wa.me/77072374681';
  const DEFAULT_TEXT = 'Здравствуйте! Хочу арендовать PlayStation.';
  let lastFocus = null;

  function open(text) {
    wa.href = WA_BASE + '?text=' + encodeURIComponent(text || DEFAULT_TEXT);
    lastFocus = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('om-open');
    wa.focus();
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove('om-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* любой клик по кнопке «Заказать» (в том числе по ссылке внутри неё) */
  document.addEventListener('click', function (e) {
    const t = e.target.closest('[data-order]');
    if (!t) return;
    e.preventDefault();
    open(t.dataset.orderText);
  });

  modal.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-om-close')) close();
  });

  /* после выбора мессенджера окно закрывается */
  [wa, ig].forEach(function (a) {
    a.addEventListener('click', function () {
      setTimeout(function () {
        close();
        document.dispatchEvent(new Event('order:chosen'));
      }, 150);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();
