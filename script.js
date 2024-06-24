// Variables for buttons
const playBtn = document.querySelector(".startStopBtn");
const lapBtn = document.querySelector(".lapBtn");
const resetBtn = document.querySelector(".resetBtn");

// Variables for time values
let seconds = 0;
let minutes = 0;
let hours = 0;

// Variables for leading zeros
let leadingSeconds = 0;
let leadingMinutes = 0;
let leadingHours = 0;

// Variables for set intervals and status
let timerInterval = null;
let timerStatus = "stopped";

// Variables for lap time
const laps = document.querySelector(".laps");
const clearLapsBtn = document.querySelector(".lap-clear-btn");
let lapItem = 0;

// Variables for animation
const bg = document.querySelector(".circle");

// Toggle button function
const toggleBtn = () => {
    lapBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
}

// StopWatch function
function stopWatch() {
    seconds++;
    if (seconds / 100 === 1) {
        seconds = 0;
        minutes++;

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }
    }

    leadingSeconds = seconds < 10 ? "0" + seconds.toString() : seconds;
    leadingMinutes = minutes < 10 ? "0" + minutes.toString() : minutes;
    leadingHours = hours < 10 ? "0" + hours.toString() : hours;

    document.getElementById('timer').innerText = `${leadingHours}:${leadingMinutes}:${leadingSeconds}`;
}

// Event Listeners of buttons

// Play Pause Button
playBtn.addEventListener("click", function () {
    if (timerStatus === "stopped") {
        bg.classList.add("animation-bg");
        timerInterval = window.setInterval(stopWatch, 10);
        document.getElementById("play").innerHTML = '<i class="fa-solid fa-pause"></i>';
        timerStatus = "started";
    } else {
        bg.classList.remove("animation-bg");
        window.clearInterval(timerInterval);
        document.getElementById("play").innerHTML = '<i class="fa-solid fa-play"></i>';
        timerStatus = "stopped";
    }
    toggleBtn();
});

// Reset Button
resetBtn.addEventListener("click", function () {
    window.clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById("timer").innerHTML = "00:00:00";
    document.getElementById("play").innerHTML = '<i class="fa-solid fa-play"></i>';
    timerStatus = "stopped";
    clearLapsBtn.classList.add("hidden");
    bg.classList.remove("animation-bg");
    laps.innerHTML = '';
    laps.append(clearLapsBtn);
    lapItem = 0;
    toggleLapHeading();
});

// Lap Button
lapBtn.addEventListener("click", function () {
    if (lapItem === 0) {
        const lapHeading = document.createElement("h2");
        lapHeading.classList.add("lap-heading");
        lapHeading.innerText = "Lap Timings";
        laps.before(lapHeading);
    }
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timeStamp.setAttribute("class", "time-stamp");
    lapItem++;
    number.innerText = `#${lapItem}`;
    timeStamp.innerText = `${leadingHours}:${leadingMinutes}:${leadingSeconds}`;
    li.append(number, timeStamp);
    laps.append(li);
    clearLapsBtn.classList.remove("hidden");
});

// Lap Clear All Button
clearLapsBtn.addEventListener("click", function () {
    laps.innerHTML = '';
    laps.append(clearLapsBtn);
    lapItem = 0;
    clearLapsBtn.classList.add("hidden");
    toggleLapHeading();
});

// Function to toggle lap heading visibility
function toggleLapHeading() {
    const lapHeading = document.querySelector(".lap-heading");
    if (lapItem === 0 && lapHeading) {
        lapHeading.remove();
    }
}
