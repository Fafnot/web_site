// Первый слайдер
const images1 = ["img/about/slider/minecraft.jpg", "img/about/slider/Crossout_artwork.jpg",
    "img/about/slider/rocket league.jfif", "img/about/slider/brawhalla.jpg"
];
let index1 = 0;
const slide1 = document.getElementById("slide1");

setInterval(() => {
  slide1.style.opacity = 0;
  setTimeout(() => {
    index1 = (index1 + 1) % images1.length;
    slide1.src = images1[index1];
    slide1.style.opacity = 1;
  }, 1000);
}, 3000);




