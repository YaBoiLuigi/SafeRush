class Item {
  constructor(x) {
    this.x = x;
    this.y = -30;
    this.width = 30;
    this.height = 30;
    this.img = new Image();
    this.img.src = "DineroMoney.png"; // Replace with the path to your image file
    this.isCollected = false;
    this.velocity = 5;
  }

  draw(ctx) {
    if (!this.isCollected) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }

  update(player) {
    if (!this.isCollected) {
      this.y += this.velocity;
      if (this.collidesWith(player)) {
        this.isCollected = true;
        score.increment();
        const sound = new Audio('DineroSound.mp3'); // Replace with the path to your MP3 file
        sound.play();
      }
    }
  }  

  collidesWith(otherObject) {
    const left = this.x;
    const right = this.x + this.width;
    const top = this.y;
    const bottom = this.y + this.height;
    const otherLeft = otherObject.x - otherObject.width / 2;
    const otherRight = otherObject.x + otherObject.width / 2;
    const otherTop = otherObject.y - otherObject.height / 2;
    const otherBottom = otherObject.y + otherObject.height / 2;
  
    if (bottom < otherTop || top > otherBottom || right < otherLeft || left > otherRight) {
      return false;
    }
  
    return true;
  }
}