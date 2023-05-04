const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

const hrsInput = document.querySelector(".hrsInput");
const minInput = document.querySelector(".minInput");
const secInput = document.querySelector(".secInput");

const startBtn = document.querySelector(".start");
const resetBtn = document.querySelector(".reset");
const setBtn = document.querySelector(".set");

let timer = null;
let time = null;
let distance = null;

const setTimer = (e) => {
  e.preventDefault();
  if (
    hrsInput.value > 24 ||
    minInput.value > 60 ||
    secInput.value > 60 ||
    hrsInput.value < 0 ||
    minInput.value < 0 ||
    secInput.value < 0
  ) {
    return;
  }

  if (hrsInput.value === "") {
    return (hrsInput.value = "00");
  } else if (hrsInput.value < 10) {
    hrsInput.value = "0" + hrsInput.value;
  }

  if (minInput.value === "") {
    return (minInput.value = "00");
  } else if (minInput.value < 10) {
    minInput.value = "0" + minInput.value;
  }

  if (secInput.value === "") {
    return (secInput.value = "00");
  } else if (secInput.value < 10) {
    secInput.value = "0" + secInput.value;
  }

  hours.innerHTML = hrsInput.value;
  minutes.innerHTML = minInput.value;
  seconds.innerHTML = secInput.value;

  hrsInput.value = "";
  minInput.value = "";
  secInput.value = "";
};

const startTimer = (e) => {
  let hrs = hours.innerHTML;
  let min = minutes.innerHTML;
  let sec = seconds.innerHTML;

  if (hrs === "00" && min === "00" && sec === "00") {
    return;
  }
  time =
    new Date().getTime() +
    (hrs * 60 * 60 * 1000 + min * 60 * 1000 + sec * 1000);

  timer = setInterval(() => {
    const currentTime = new Date().getTime();
    distance = time - currentTime;
    if (distance < 1000) {
      clearInterval(timer);
    }

    hrs = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    min = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    sec = Math.floor((distance % (1000 * 60)) / 1000);

    if (hrs < 10) {
      hrs = "0" + hrs;
    }

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    hours.innerHTML = hrs;
    minutes.innerHTML = min;
    seconds.innerHTML = sec;
  }, 1000);
};

const resetTimer = (e) => {
  clearInterval(timer);
  hours.innerHTML = "00";
  minutes.innerHTML = "00";
  seconds.innerHTML = "00";
  distance = 0;
};

setBtn.addEventListener("click", setTimer);
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
