function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function changeBackground() {
  document.body.style.backgroundColor = getRandomHexColor();
}

let intervalId = null;

startButton.addEventListener('click', startChangingColor);
function startChangingColor() {
  intervalId = setInterval(changeBackground, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
}

stopButton.addEventListener('click', stopChangingColor);
function stopChangingColor() {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
}
