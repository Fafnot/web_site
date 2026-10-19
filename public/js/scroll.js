const btn = document.querySelector(".button");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {  
      btn.style.display = "block"; // показываем кнопку
    } else {
      btn.style.display = "none";  // скрываем кнопку
    }
});





