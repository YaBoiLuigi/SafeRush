class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 48;
    this.height = 48;
    this.vy = 5;
    this.img = new Image();
    this.img.src = 'SafeFullOfMONEY.png'; // Replace with the path to your image file
  }

  update() {
    // Move the obstacle down
    this.y += this.vy;
  }

  draw(ctx) {
    // Draw the image
    ctx.drawImage(this.img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }
}