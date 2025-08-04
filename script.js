const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const logo = new Image();
logo.src = "assets/logo.png";

const player = {
  x: 50,
  y: 300,
  width: 32,
  height: 32,
  dy: 0,
  jumpPower: -10,
  gravity: 0.5,
  onGround: true
};

const enemy = {
  x: 640,
  y: 328,
  width: 20,
  height: 20,
  speed: 3
};

let score = 0;
const keys = {};

document.addEventListener("keydown", e => keys[e.code] = true);
document.addEventListener("keyup", e => keys[e.code] = false);

canvas.addEventListener("click", () => {
  if (player.onGround) {
    player.dy = player.jumpPower;
    player.onGround = false;
  }
});

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault(); // cegah scroll
  if (player.onGround) {
    player.dy = player.jumpPower;
    player.onGround = false;
  }
}, { passive: false });

function drawPlayer() {
  if (logo.complete) {
    ctx.drawImage(logo, player.x, player.y, player.width, player.height);
  } else {
    ctx.fillStyle = "#000";
    ctx.fillRect(player.x, player.y, player.width, player.height);
  }
}

function drawEnemy() {
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function updatePlayer() {
  if (keys["Space"] && player.onGround) {
    player.dy = player.jumpPower;
    player.onGround = false;
  }

  player.dy += player.gravity;
  player.y += player.dy;

  if (player.y + player.height >= canvas.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
    player.onGround = true;
  }
}

function updateEnemy() {
  enemy.x -= enemy.speed;
  if (enemy.x + enemy.width < 0) {
    enemy.x = 640 + Math.random() * 300;
    score++;
    document.getElementById("score").innerText = "Score: " + score;
  }

  if (
    player.x < enemy.x + enemy.width &&
    player.x + player.width > enemy.x &&
    player.y < enemy.y + enemy.height &&
    player.y + player.height > enemy.y
  ) {
    setTimeout(() => {
      alert("Game Over! Final Score: " + score);
      score = 0;
      document.getElementById("score").innerText = "Score: 0";
      enemy.x = 640;
    }, 50);
  }
}

function claimSpot() {
  const code = document.getElementById("codeInput").value;
  const wallet = document.getElementById("walletInput").value;
  const msg = document.getElementById("message");

  if (code && wallet) {
    msg.innerText = "✅ Code submitted!";
  } else {
    msg.innerText = "⚠️ Please enter code & wallet!";
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updatePlayer();
  updateEnemy();
  drawPlayer();
  drawEnemy();
  requestAnimationFrame(gameLoop);
}

logo.onload = () => {
  gameLoop();
};

document.getElementById("jumpBtn").addEventListener("click", () => {
  if (player.onGround) {
    player.dy = player.jumpPower;
    player.onGround = false;
  }
});
