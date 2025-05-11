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
<script>
const canvas = document.getElementById("juego");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let heart = {
    x: canvas.width / 4,
    y: canvas.height / 2,
    radius: 25,
    velocityY: 0,
    gravity: 0.6,
    jumpStrength: -10
};

let letras = [];

function generarLetra() {
    const letra = {
        x: Math.random() * (canvas.width - 40),
        y: -30,
        letra: String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Letras A-Z
        velocidad: 2 + Math.random() * 2
    };
    letras.push(letra);
}

setInterval(generarLetra, 1000);

document.getElementById("btn-saltar").addEventListener("click", () => {
    heart.velocityY = heart.jumpStrength;
});

function actualizar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // gravedad
    heart.velocityY += heart.gravity;
    heart.y += heart.velocityY;

    // evitar que se salga
    if (heart.y + heart.radius > canvas.height) {
        heart.y = canvas.height - heart.radius;
        heart.velocityY = 0;
    }

    // dibujar corazón
    ctx.beginPath();
    ctx.arc(heart.x, heart.y, heart.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();

    // dibujar letras
    for (let i = 0; i < letras.length; i++) {
        const l = letras[i];
        l.y += l.velocidad;

        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText(l.letra, l.x, l.y);
    }

    requestAnimationFrame(actualizar);
}

actualizar();
</script>
