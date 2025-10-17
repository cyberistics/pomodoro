let timer;
let timeLeft;
let isPaused = true;
let currentMode = 'focus';

const FOCUS_TIME = 25 * 60; // 25 minutes in seconds
const SHORT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
const LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const shortBreakBtn = document.getElementById('short-break-btn');
const longBreakBtn = document.getElementById('long-break-btn');

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
  if (isPaused) {
    isPaused = false;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        alert(`${currentMode} session finished!`);
        isPaused = true;
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isPaused = true;
}

function resetTimer() {
  // Reset the timer to the current mode's time and stop it.
  setMode(currentMode); 
  pauseTimer(); 
}

function setMode(mode) {
  currentMode = mode;
  pauseTimer(); 
  switch (mode) {
    case 'focus': 
      timeLeft = FOCUS_TIME;
      break;
    case 'short-break': 
      timeLeft = SHORT_BREAK_TIME;
      break;
    case 'long-break':
      timeLeft = LONG_BREAK_TIME;
      break;
  }
  updateDisplay();
}

setMode('focus');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
shortBreakBtn.addEventListener('click', () => setMode('short-break'));
longBreakBtn.addEventListener('click', () => setMode('long-break'));
