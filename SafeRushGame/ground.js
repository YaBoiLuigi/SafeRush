class Ground {
  constructor() {
    this.height = 50;
    this.backgroundImgs = [
      "DineroCity.png",
      "DineroCity2.png",
      "DineroCity3.png",
      "DineroCity4.png"
    ].map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
    this.groundImgs = [
      "Dinero-or-money-ground.png",
      "Dinero-or-money-ground-2.png",
      "Dinero-or-money-ground-3.png",
      "Dinero-or-money-ground-4.png"
    ].map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });
    this.currentBackgroundImg = this.backgroundImgs[0];
    this.currentGroundImg = this.groundImgs[0];
  }

  draw(ctx, score) {
    // Draw the background image based on the score
    if (score >= 150 && score < 250) {
      this.currentBackgroundImg = this.backgroundImgs[1];
    } else if (score >= 250 && score < 350) {
      this.currentBackgroundImg = this.backgroundImgs[2];
    } else if (score >= 350) {
      this.currentBackgroundImg = this.backgroundImgs[3];
    }
  
    ctx.drawImage(this.currentBackgroundImg, 0, 0, canvas.width, canvas.height);
  
    // Draw the ground image based on the score
    if (score >= 150 && score < 250) {
      this.currentGroundImg = this.groundImgs[1];
    } else if (score >= 250 && score < 350) {
      this.currentGroundImg = this.groundImgs[2];
    } else if (score >= 350) {
      this.currentGroundImg = this.groundImgs[3];
    }
  
    const groundPattern = ctx.createPattern(this.currentGroundImg, "repeat");
    ctx.fillStyle = groundPattern;
  
    // Adjust the pattern's position based on the canvas dimensions
    const patternX = 0;
    const patternY = canvas.height - this.height;
    ctx.translate(patternX, patternY);
    ctx.fillRect(0, 0, canvas.width, this.height);
    ctx.translate(-patternX, -patternY);
  }

  update() {
    // No updates needed for the ground
  }
}