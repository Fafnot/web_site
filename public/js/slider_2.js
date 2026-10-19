// Второй слайдер
const images2 = ["img/about/slider/resident 2.avif", "img/about/slider/fall_guys.webp",
    "img/about/slider/efotball.jpg", "img/about/slider/paladins.jpg"
];
let index2 = 0;
const slide2 = document.getElementById("slide2");

setInterval(() => {
  slide2.style.opacity = 0;
  setTimeout(() => {
    index2 = (index2 + 1) % images2.length;
    slide2.src = images2[index2];
    slide2.style.opacity = 1;
  }, 1000);
}, 3000);






