/* Лента игр: сама плавно едет, а ещё её можно листать рукой —
   мышкой (зажать и тянуть), пальцем на телефоне (свайп влево/вправо), тачпадом или Shift+колесом.
   После отпускания лента ещё немного едет по инерции и снова запускается сама. */
const track = document.getElementById('track');
const strip = track.parentElement;          /* .game-ps */
track.innerHTML += track.innerHTML;         /* дублируем ленту для бесконечной прокрутки */

let x = 0;
const SPEED = 0.3;          /* скорость автопрокрутки */
let auto = true;
let dragging = false;
let lastX = 0;
let inertia = 0;
let resumeTimer = null;
let halfWidth = 0;

/* Ширина половины ленты считается один раз, а не на каждый кадр (иначе будут лаги) */
function measure() { halfWidth = track.scrollWidth / 2; }
measure();
window.addEventListener('load', measure);
window.addEventListener('resize', measure);

function pauseAuto() {
  auto = false;
  clearTimeout(resumeTimer);
}
function resumeAutoLater() {
  clearTimeout(resumeTimer);
  resumeTimer = setTimeout(function () { auto = true; }, 1500);
}

function frame() {
  if (!dragging) {
    if (Math.abs(inertia) > 0.15) {
      x += inertia;
      inertia *= 0.94;
    } else {
      inertia = 0;
      if (auto) x -= SPEED;
    }
  }

  /* бесконечный круг: держим x в диапазоне (-halfWidth, 0] */
  if (halfWidth) {
    x = x % halfWidth;
    if (x > 0) x -= halfWidth;
  }

  track.style.transform = 'translate3d(' + x + 'px, 0, 0)';
  requestAnimationFrame(frame);
}
frame();

/* ===== ПЕРЕТАСКИВАНИЕ (мышь и палец) ===== */
strip.addEventListener('pointerdown', function (e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return;
  dragging = true;
  inertia = 0;
  lastX = e.clientX;
  pauseAuto();
  strip.classList.add('dragging');
  try { strip.setPointerCapture(e.pointerId); } catch (err) {}
});

strip.addEventListener('pointermove', function (e) {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  lastX = e.clientX;
  x += dx;
  inertia = dx;
});

function endDrag() {
  if (!dragging) return;
  dragging = false;
  strip.classList.remove('dragging');
  resumeAutoLater();
}
strip.addEventListener('pointerup', endDrag);
strip.addEventListener('pointercancel', endDrag);
strip.addEventListener('lostpointercapture', endDrag);

/* картинки не должны «утаскиваться» браузером как файлы */
strip.addEventListener('dragstart', function (e) { e.preventDefault(); });

/* ===== ГОРИЗОНТАЛЬНОЕ КОЛЕСО / ТАЧПАД =====
   Обычная вертикальная прокрутка колесом идёт по странице как обычно. */
strip.addEventListener('wheel', function (e) {
  if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
  e.preventDefault();
  pauseAuto();
  x -= e.deltaX * 0.8;
  resumeAutoLater();
}, { passive: false });
