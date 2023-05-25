class Score {
  constructor() {
    this.value = 0;
    this.image = new Image();
    this.image.src = 'DineroMoney.png';
  }

  draw(ctx) {
    ctx.fillStyle = '#003b1e'; // Set the desired color for the score text
    ctx.font = '25px PixelFont';
    const imageWidth = 30; // Set the desired width of the image
    const imageHeight = 30; // Set the desired height of the image
    const imageX = canvas.width * 0.02; // X-coordinate of the image
    const imageY = 10; // Adjust the desired y-coordinate of the image
    ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, imageX, imageY, imageWidth, imageHeight);
    ctx.fillText(`$${this.value}`, canvas.width * 0.05, 30);
  }

  increment() {
    if (this.value < 450) {
      this.value++;
    }
  }
}