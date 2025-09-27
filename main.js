let countdowns = {};

function startCountdown(card) {
  const timerEl = card.querySelector(".timer");
  const cardId = card.dataset.id;
  let endTime = localStorage.getItem("endTime_" + cardId);

  if (!endTime) {
    endTime = Date.now() + 24 * 60 * 60 * 1000; // 24 часа
    localStorage.setItem("endTime_" + cardId, endTime);
  } else {
    endTime = parseInt(endTime);
  }

  function updateTimer() {
    let diff = endTime - Date.now();

    if (diff <= 0) {
      clearInterval(countdowns[cardId]);
      localStorage.removeItem("endTime_" + cardId);
      timerEl.textContent = "00:00:00";
      return;
    }

    let hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0");
    let minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0");
    let seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0");

    timerEl.textContent = `${hours}:${minutes}:${seconds}`;
  }

  updateTimer();
  clearInterval(countdowns[cardId]);
  countdowns[cardId] = setInterval(updateTimer, 1000);
}

// запускаем таймеры у всех карточек с start_time
document.querySelectorAll(".card").forEach(card => {
  if (card.classList.contains("start_time")) {
    startCountdown(card);
  }
});





