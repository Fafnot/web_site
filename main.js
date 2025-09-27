function updateClock() {
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    let timeString = `${hours}:${minutes}:${seconds}`;

    // обновляем все элементы с классом .clock
    document.querySelectorAll('.clock').forEach(el => {
      el.textContent = timeString;
    });
  }

setInterval(updateClock, 1000);
updateClock(); // сразу запустить





