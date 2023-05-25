function showGameOver() {
  const gameOverScreen = document.createElement('div');
  gameOverScreen.classList.add('gameover-screen');

  const gameoverText = document.createElement('div');
  gameoverText.classList.add('gameover-text');
  gameoverText.textContent = 'No Moe Money...';
  gameoverText.addEventListener('animationend', () => {
    gameOverScreen.removeChild(gameoverText);

    const scoreText = document.createElement('div');
    scoreText.classList.add('score-text');
    scoreText.textContent = 'Your balance was $' + score.value;
    gameOverScreen.appendChild(scoreText);

    const image = document.createElement('img');
    image.classList.add('fade-in-image');
    image.src = 'SkellyTONMoeMoney.png';
    gameOverScreen.appendChild(image);

    const restartText = document.createElement('div');
    restartText.classList.add('restart-text');
    restartText.textContent = 'Click anywhere to restart';
    gameOverScreen.appendChild(restartText);

    document.addEventListener('click', handleRestart);
  });

  gameOverScreen.appendChild(gameoverText);

  const gameOverMusic = new Audio('No-Moe-Money.mp3');
  gameOverMusic.loop = true;
  gameOverMusic.play();

  gameMusic.pause();
  newMusic.pause();
  richMusic.pause();
  richerMusic.pause();

  document.body.appendChild(gameOverScreen);

  const numObjects = 50;
  for (let i = 0; i < numObjects; i++) {
    const fallingObject = document.createElement('div');
    fallingObject.classList.add('falling-object');
    fallingObject.style.left = `${Math.random() * 100}%`;
    fallingObject.style.animationDelay = `${Math.random() * 10}s`;
    fallingObject.style.animationDuration = `${Math.random() * 5 + 3}s`; // Randomize the duration
    gameOverScreen.appendChild(fallingObject);
  }

  function handleRestart() {
    document.removeEventListener('click', handleRestart);
    location.reload();
  }
}