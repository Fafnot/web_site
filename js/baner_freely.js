const words = document.getElementById('words');

words.innerHTML += words.innerHTML;

let x = 0;
const speed = 0.3;

function animate() {
  x -= speed;

  if (Math.abs(x) >= words.scrollWidth / 2) {
    x = 0;
  }

  words.style.transform = `translateX(${x}px)`;
  requestAnimationFrame(animate);
}

animate();

