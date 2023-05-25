function showIntro() {
  const introText = document.createElement('p');
  introText.innerText = 'A HipFlashTrash Exclusive Game';
  introText.style.color = 'white';
  introText.style.position = 'absolute';
  introText.style.top = '20%';
  introText.style.left = '50%';
  introText.style.transform = 'translate(-50%, -50%)';
  introText.style.fontFamily = 'PixelFont';
  introText.style.fontSize = '24px';
  introText.style.opacity = 0;
  introText.style.transition = 'opacity 1s ease-in-out';
  document.body.appendChild(introText);

  const continueImage = new Image();
  continueImage.src = 'HipFlashTrashPixel.png';
  continueImage.style.opacity = 0;
  continueImage.style.transition = 'opacity 1s ease-in-out';
  continueImage.style.position = 'absolute';
  continueImage.style.top = '50%';
  continueImage.style.left = '50%';
  continueImage.style.transform = 'translate(-50%, -50%)';
  document.body.appendChild(continueImage);

  const continueText = document.createElement('p');
  continueText.innerText = 'Click anywhere to continue';
  continueText.style.color = 'white';
  continueText.style.position = 'absolute';
  continueText.style.top = '70%';
  continueText.style.left = '50%';
  continueText.style.transform = 'translate(-50%, -50%)';
  continueText.style.fontFamily = 'PixelFont';
  continueText.style.fontSize = '16px';
  continueText.style.opacity = 0;
  continueText.style.transition = 'opacity 1s ease-in-out';
  document.body.appendChild(continueText);

  let isBlinking = false;
  const blinkInterval = setInterval(() => {
    continueText.style.opacity = isBlinking ? 1 : 0;
    isBlinking = !isBlinking;
  }, 1000);

  setTimeout(() => {
    introText.style.opacity = 1;
    continueImage.style.opacity = 1;
    continueText.style.opacity = 1;
  }, 100);

  canvas.addEventListener('click', handleClick);

function handleClick() {
clearInterval(blinkInterval);
document.body.removeChild(introText);
document.body.removeChild(continueImage);
document.body.removeChild(continueText);
canvas.removeEventListener('click', handleClick);
showMenu();
}
}