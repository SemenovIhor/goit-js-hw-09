function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");
let timerId = null;

const outClick = document.querySelector("body");
document.querySelector("button[data-stop]").disabled = true;


btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    btnStop.disabled = false;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor()
    document.body.style.backgroundColor = randomColor
  }, 1000);
});

btnStop.addEventListener("click", () => {
    clearInterval(timerId);
    btnStart.disabled = false;
    btnStop.disabled = true;
});