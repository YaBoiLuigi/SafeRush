const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const player = new Player(canvas.width / 2, canvas.height - 50);
const ground = new Ground();
let obstacles = [];
let items = [];
const keysDown = {};
let score = new Score();
const maxScore = 450;
let gameMusic = new Audio('New-Day=Moe-Money.mp3');
let newMusic = new Audio('Getting-Richer.mp3');
let richMusic = new Audio('I-Need-Those-Shoes.mp3');
let richerMusic = new Audio('So-Much-Moe-Money.mp3');
let musicChanged = false;
let richMusicPlayed = false;
let richerMusicPlayed = false;
let collisionSound = new Audio('SafeHit.mp3');
let gameOver = false;

function gameLoop() {
  if (gameOver) {
    return;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update(keysDown);
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#1e5799');
  gradient.addColorStop(1, '#7db9e8');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ground.draw(ctx, score.value);
  score.draw(ctx);
  player.draw(ctx);
  items.forEach(item => { item.update(player); item.draw(ctx); });
  const maxItemProbability = 0.05;
  const minItemProbability = 0.01;
  const itemProbability = Math.min(score.value / maxScore * maxItemProbability + minItemProbability, maxItemProbability);
  if (Math.random() < itemProbability) { items.push(new Item(Math.random() * canvas.width, Math.random() * (canvas.height - 100), score)); }
  items = items.filter(item => !item.isCollected && item.y < canvas.height);
  obstacles.forEach(obstacle => { obstacle.update(); obstacle.draw(ctx); });
  player.applyGravity();
  const maxObstacleProbability = 0.15;
  const minObstacleProbability = 0.01;
  const obstacleProbability = Math.min(score.value / maxScore * maxObstacleProbability + minObstacleProbability, maxObstacleProbability);
  if (Math.random() < obstacleProbability) { obstacles.push(new Obstacle(Math.random() * canvas.width, -50)); }
  obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
  obstacles.forEach(obstacle => {
    if (player.collidesWith(obstacle)) {
      console.log('Game over!');
      collisionSound.currentTime = 0;
      collisionSound.play();
      gameOver = true;
      showGameOver();
    }
  });
  if (score.value >= 150 && !musicChanged) {
    gameMusic.pause();
    newMusic.currentTime = 0;
    newMusic.play();
    newMusic.loop = true;
    musicChanged = true;
  }
  if (score.value >= 250 && !richMusicPlayed) {
    newMusic.pause();
    richMusic.currentTime = 0;
    richMusic.play();
    richMusic.loop = true;
    richMusicPlayed = true;
  }
  if (score.value >= 350 && !richerMusicPlayed) {
    richMusic.pause();
    richerMusic.currentTime = 0;
    richerMusic.play();
    richerMusic.loop = true;
    richerMusicPlayed = true;
  }
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', event => { keysDown[event.key] = true; });
document.addEventListener('keyup', event => { keysDown[event.key] = false; });
document.addEventListener('itemCollected', event => { score.increment(); });
function startGame() {
  canvas.removeEventListener("click", startGame); 
  gameLoop(); 
  gameMusic.loop = true;
  gameMusic.play();
}
showIntro();