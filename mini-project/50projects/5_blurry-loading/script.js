const loadText = document.querySelector(".loading-text");
const bg = document.querySelector(".bg");

let load = 0;
let intervalId = null;

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

const blurring = () => {
  load++;
  if (load > 99) {
    clearInterval(intervalId);
  }

  loadText.innerText = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
};

timerId = setInterval(blurring, 30);
