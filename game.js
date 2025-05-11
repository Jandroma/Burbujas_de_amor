const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let heart = { x: canvas.width / 2, y: canvas.height - 80, dy: 0, size: 30 };
let bullets = [];

document.getElementById("btnUp").addEventListener("touchstart", () => {
  heart.dy = -4;
});
document.getElementById("btnUp").addEventListener("touchend", () => {
  heart.dy = 0;
});
document.getElementById("btnShoot").addEventListener("click", () => {
  bullets.push({ x: heart.x, y: heart.y, size: 8 });
});

function drawHeart() {
  ctx.beginPath();
  ctx.arc(heart.x, heart.y, heart.size, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
}

function drawBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= 5;
    ctx.beginPath();
    ctx.arc(bullets[i].x, bullets[i].y, bullets[i].size, 0, Math.PI * 2);
    ctx.fillStyle = "pink";
    ctx.fill();

    if (bullets[i].y < 0) bullets.splice(i, 1);
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  heart.y += heart.dy;
  if (heart.y < 0) heart.y = 0;
  if (heart.y > canvas.height - heart.size) heart.y = canvas.height - heart.size;

  drawHeart();
  drawBullets();

  requestAnimationFrame(update);
}

update();
