let startTime, updatedTime, difference, tInterval, savedTime, lapTime;
let running = false;
const display = document.querySelector('.display');
const lapList = document.querySelector('.lap-times');

document.querySelector('.start').addEventListener('click', start);
document.querySelector('.pause').addEventListener('click', pause);
document.querySelector('.reset').addEventListener('click', reset);
document.querySelector('.lap').addEventListener('click', lap);

function start() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1);
    running = true;
  }
}

function pause() {
  if (running) {
    clearInterval(tInterval);
    savedTime = difference;
    running = false;
  }
}

function reset() {
  clearInterval(tInterval);
  running = false;
  savedTime = 0;
  difference = 0;
  lapTime = 0;
  display.innerHTML = '00:00:00';
  lapList.innerHTML = '';
}

function lap() {
  if (running) {
    lapTime = difference;
    const lapElement = document.createElement('li');
    lapElement.textContent = formatTime(lapTime);
    lapList.appendChild(lapElement);
  }
}

function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime) {
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference = updatedTime - startTime;
  }
  display.innerHTML = formatTime(difference);
}

function formatTime(time) {
  let hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((time % (1000 * 60)) / 1000);
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  return `${hours}:${minutes}:${seconds}`;
}
