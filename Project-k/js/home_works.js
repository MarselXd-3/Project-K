const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
};

const gmailInput = document.getElementById("gmail_input");
const gmailResult = document.getElementById("gmail_result");

document.getElementById("gmail_button").addEventListener("click", () => {
  const email = gmailInput.value.trim();
  if (validateEmail(email)) {
    gmailResult.textContent = "Valid Gmail";
  } else {
    gmailResult.textContent = "Invalid Gmail";
  }
});

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');
const blockSize = childBlock.offsetWidth;
const parentWidth = parentBlock.offsetWidth;
const parentHeight = parentBlock.offsetHeight;

let x = 0;
let y = 0;
let dx = 1;
let dy = 0;

const move = () => {
    if (x >= parentWidth - blockSize || x < 0 || y >= parentHeight - blockSize || y < 0) {
        const temp = dx;
        dx = dy;
        dy = -temp;
    }
    x += dx;
    y += dy;
    childBlock.style.left = `${x}px`;
    childBlock.style.top = `${y}px`;
    requestAnimationFrame(move);
};

move();




let timerElement = document.getElementById('seconds');
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let timerId;
let seconds = 0;

function startTimer() {
    timerId = setTimeout(function tick() {
        seconds++;
        timerElement.textContent = seconds;
        timerId = setTimeout(tick, 1000);
    }, 1000);
}

function stopTimer() {
    clearTimeout(timerId);
}

function resetTimer() {
    clearTimeout(timerId);
    seconds = 0;
    timerElement.textContent = seconds;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

