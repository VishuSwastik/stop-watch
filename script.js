const display = document.getElementById("display");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let startTime = 0;
let accumulatedTime = 0;
let timer;

function beginTimer() {
    startTime = Date.now() - accumulatedTime;

    timer = setInterval(() => {
        accumulatedTime = Date.now() - startTime;
        display.textContent = formatElapsedTime(accumulatedTime);
    }, 10);

    startButton.disabled = true;
    stopButton.disabled = false;
}

function formatElapsedTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, length = 2) {
    return String(number).padStart(length, '0');
}

function stopTimer() {
    clearInterval(timer);
    startButton.disabled = false;
    stopButton.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    accumulatedTime = 0;
    display.textContent = "00:00:00.00";
    startButton.disabled = false;
    stopButton.disabled = true;
}

startButton.addEventListener("click", beginTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);