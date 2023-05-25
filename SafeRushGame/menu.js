function showMenu() {
  const menuMusic = new Audio('I-Need-Moe-Money.mp3');
  menuMusic.loop = true;
  menuMusic.play();

  const numObjects = 50;
  const objects = [];
  for (let i = 0; i < numObjects; i++) {
    const object = {
      img: new Image(),
      x: Math.random() * canvas.width,
      y: -50 - Math.random() * 200,
      speed: 1 + Math.random() * 4,
    };
    object.img.src = "DineroMoney.png";
    objects.push(object);
  }

  const font = new FontFace('PixelFont', 'url(VT323-Regular.ttf)');
  font.load().then(() => {
    const img = new Image();
    img.onload = () => {
      const imgAspectRatio = img.width / img.height;
      const imgHeight = canvas.height + 10;
      const imgWidth = imgAspectRatio * imgHeight;
      const imgX = canvas.width - imgWidth - 20;
      const imgY = canvas.height / 2 - imgHeight / 2;
      const startButtonX = canvas.width / 2 - 420;
      const startButtonY = canvas.height / 2;
      const startButtonWidth = 200;
      const startButtonHeight = 50;
      const startImg = new Image();
      startImg.src = "StartButtonMenu.png";
      let isHovering = false;

      const gameTitleImg = new Image();
      gameTitleImg.src = "SafeRushLogo.png";
      gameTitleImg.width = 380;
      gameTitleImg.height = 220;

      const bgImg1 = new Image();
      const bgImg2 = new Image();
      bgImg1.src = "GreenBGMoeMoneyPixel.png";
      bgImg2.src = "GreenBGMoeMoneyPixel2.png";

      let bgPosY1 = 0;
      let bgPosY2 = -canvas.height;
      const scrollSpeed = 4;

      function updateBackground() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        bgPosY1 += scrollSpeed;
        bgPosY2 += scrollSpeed;
        if (bgPosY1 >= canvas.height) {
          bgPosY1 = -canvas.height + scrollSpeed;
        }
        if (bgPosY2 >= canvas.height) {
          bgPosY2 = -canvas.height + scrollSpeed;
        }

        ctx.drawImage(bgImg1, 0, bgPosY1, canvas.width, canvas.height);
        ctx.drawImage(bgImg2, 0, bgPosY2, canvas.width, canvas.height);

        for (let i = 0; i < numObjects; i++) {
          const object = objects[i];
          object.y += object.speed;
          if (object.y > canvas.height) {
            object.y = -50 - Math.random() * 200;
            object.x = Math.random() * canvas.width;
            object.speed = 1 + Math.random() * 3;
          }
          ctx.drawImage(object.img, object.x, object.y);
        }

        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
        ctx.drawImage(startImg, startButtonX, startButtonY, startButtonWidth, startButtonHeight);
        ctx.drawImage(gameTitleImg, canvas.width / 2 - gameTitleImg.width / 2 - 320, canvas.height / 2 - 200, gameTitleImg.width, gameTitleImg.height);

        requestAnimationFrame(updateBackground);
      }

      updateBackground();

      startImg.onload = () => {
        startImg.width = 200;
        startImg.height = 50;
        canvas.addEventListener("click", startGameOnClick);
        canvas.addEventListener("mousemove", onHover);
      };

      canvas.addEventListener("mousemove", onHover);

      function onHover(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        isHovering = x > startButtonX && x < startButtonX + startButtonWidth && y > startButtonY && y < startButtonY + startButtonHeight;
        startImg.src = isHovering ? "StartButtonMenuHover.png" : "StartButtonMenu.png";
      }
    };
    img.src = "MoeMoney-Transparent-GreenOutline.png";
  });

  function startGameOnClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const startButtonX = canvas.width / 2 - 420;
    const startButtonY = canvas.height / 2;
    const startButtonWidth = 200;
    const startButtonHeight = 50;
    if (x > startButtonX && x < startButtonX + startButtonWidth && y > startButtonY && y < startButtonY + startButtonHeight) {
      menuMusic.pause();
      menuMusic.currentTime = 0;
      canvas.removeEventListener("click", startGameOnClick);
      startGame();
    }
  }
}