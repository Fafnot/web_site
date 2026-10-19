document.addEventListener('DOMContentLoaded', function() {
  const targetSection = document.querySelector('.center-grid');
  const orderBtn = document.getElementById('orderBtn');

  if (!targetSection || !orderBtn) return;

  let ticking = false;

  function check() {
    ticking = false;
    const sectionTop = targetSection.getBoundingClientRect().top;
    orderBtn.classList.toggle('show', sectionTop <= 100);
  }

  /* Проверка не чаще одного раза за кадр + пассивный слушатель — скролл не тормозит */
  window.addEventListener('scroll', function() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(check);
    }
  }, { passive: true });

  check();
});
