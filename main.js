// ====== НАСТРОЙКИ ======
// Если открываешь сайт НЕ с ps.gdh.kz (например file:///...), то window.location.origin будет не тот.
// Поэтому ставим абсолютный адрес (самый надежный вариант).
const API_BASE = "https://ps.gdh.kz/rent.php";

let activeIntervals = {};

// ====== ЗАГРУЗКА ТАЙМЕРОВ ======
async function loadRents() {
  try {
    // Запрос к серверу: получаем список аренд и время сервера (раньше этой строки не было,
    // из-за чего переменная json не существовала и таймеры не показывались)
    const response = await fetch(`${API_BASE}?_=${Date.now()}`, { cache: "no-store" });
    const json = await response.json();

    const data = json.rents || {};
    const serverTimeMs = (json.server_time || Math.floor(Date.now() / 1000)) * 1000;

    document.querySelectorAll(".time").forEach(card => {
      const id = card.dataset.id;
      const timerEl = card.querySelector(".timer");
      const item = data[id];

      if (!timerEl) return;

      // Если нет данных или stop_time — свободно
      if (!item || !item.stop_time) {
        timerEl.textContent = "Свободно";
        if (activeIntervals[id]) {
          clearInterval(activeIntervals[id]);
          delete activeIntervals[id];
        }
        return;
      }

      const endTimeMs = item.stop_time * 1000;

      // Сдвиг по времени сервера
      const offsetMs = serverTimeMs - Date.now();
      const nowMs = Date.now() + offsetMs;

      // Если уже истекло — свободно
      if (nowMs >= endTimeMs) {
        timerEl.textContent = "Свободно";
        if (activeIntervals[id]) {
          clearInterval(activeIntervals[id]);
          delete activeIntervals[id];
        }
        return;
      }

      // Перезапускаем таймер
      if (activeIntervals[id]) {
        clearInterval(activeIntervals[id]);
        delete activeIntervals[id];
      }
 
      activeIntervals[id] = startCountdown(card, endTimeMs, offsetMs);
    });

  } catch (err) {
    console.error("Ошибка loadRents:", err);
  }
}

// ====== ОБРАТНЫЙ ОТСЧЕТ ======
function startCountdown(card, endTimeMs, serverOffsetMs = 0) {
  const timerEl = card.querySelector(".timer");
  const id = card.dataset.id;
  let intervalId;

  function update() {
    const now = Date.now() + serverOffsetMs;
    const diff = endTimeMs - now;

    if (diff <= 0) {
      timerEl.textContent = "Свободно";
      clearInterval(intervalId);
      delete activeIntervals[id];
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");

    timerEl.textContent = `${h}:${m}:${s}`;
  }

  update();
  intervalId = setInterval(update, 1000);
  return intervalId;
}

// ====== КНОПКИ START/STOP (ЕСЛИ ОНИ ЕСТЬ) ======
document.querySelectorAll(".time").forEach(card => {
  const id = card.dataset.id;
  const startBtn = card.querySelector(".start-btn");
  const stopBtn = card.querySelector(".stop-btn");

  if (startBtn) {
    startBtn.addEventListener("click", async () => {
      const duration = 24 * 60 * 60; // 24 часа

      await fetch(
        `${API_BASE}?id=${id}&action=start&duration=${duration}&_=${Date.now()}`,
        { cache: "no-store" }
      );

      loadRents();
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener("click", async () => {
      await fetch(
        `${API_BASE}?id=${id}&action=stop&_=${Date.now()}`,
        { cache: "no-store" }
      );

      loadRents();
    });
  }
});

// ====== АВТООБНОВЛЕНИЕ ======
loadRents();
setInterval(loadRents, 5000);
