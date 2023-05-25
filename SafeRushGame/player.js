class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 43;
    this.height = 81;
    this.speed = 5;
    this.velocity = 0;
    this.isRunning = false;
    this.image = new Image();
    this.image.src = 'MoeMoney1.png';
    this.isMoving = false;
    this.animationFrames = [new Image(), new Image(), new Image(), new Image()];
    this.currentFrameIndex = 0;
    this.frameCount = 0;
    this.animationFrames[0].src = 'MoeMoney1.png';
    this.animationFrames[1].src = 'MoeMoney2.png';
    this.animationFrames[2].src = 'MoeMoney3.png';
    this.animationFrames[3].src = 'MoeMoney4.png';
    this.direction = 'right'; // Default direction is right
  }

  draw(ctx) {
  let image = this.animationFrames[this.currentFrameIndex];
  if (!this.isMoving) {
    image = this.image;
  }
  // Flip the image horizontally if facing left
  if (this.direction === 'left') {
    ctx.save();
    ctx.scale(-1, 1);
    ctx.drawImage(image, -this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
    ctx.restore();
  } else {
    ctx.drawImage(image, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}

  update(keysDown) {
    if (keysDown['a'] || keysDown['ArrowLeft']) {
      this.moveLeft();
      this.isMoving = true;
      this.direction = 'left';
    } else if (keysDown['d'] || keysDown['ArrowRight']) {
      this.moveRight();
      this.isMoving = true;
      this.direction = 'right';
    } else {
      this.isMoving = false;
    }

    if (keysDown['w'] || keysDown['ArrowUp']) {
      this.isRunning = true;
      this.speed = 9;
    } else {
      this.isRunning = false;
      this.speed = 5;
    }

    if (this.isMoving) {
      this.frameCount++;
      if (this.frameCount >= (this.isRunning ? 5 : 10)) {
        this.currentFrameIndex = (this.currentFrameIndex + 1) % 4;
        this.frameCount = 0;
      }
    }

    this.applyGravity();
  }

  moveLeft() {
    if (this.x - this.width / 2 > 0) {
      this.x -= this.speed;
    } else {
      this.x = canvas.width - this.width / 2;
    }
  }

  moveRight() {
    if (this.x + this.width / 2 < canvas.width) {
      this.x += this.speed;
    } else {
      this.x = this.width / 2;
    }
  }

  applyGravity() {
    this.velocity += 0.5;
    this.y += this.velocity;
    if (this.y + this.height / 2 > canvas.height - ground.height) {
      this.velocity = 0;
      this.y = canvas.height - ground.height - this.height / 2;
    }
  }

  collidesWith(obstacle) {
    const playerLeft = this.x - this.width / 2;
    const playerRight = this.x + this.width / 2;
    const playerTop = this.y - this.height / 2;
    const playerBottom = this.y + this.height / 2;
    const obstacleLeft = obstacle.x - obstacle.width / 2;
    const obstacleRight = obstacle.x + obstacle.width / 2;
    const obstacleTop = obstacle.y - obstacle.height / 2;
    const obstacleBottom = obstacle.y + obstacle.height / 2;
  
    if (
      playerBottom < obstacleTop ||
      playerTop > obstacleBottom ||
      playerRight < obstacleLeft ||
      playerLeft > obstacleRight
    ) {
      return false;
    }
  
    return true;
  }
}