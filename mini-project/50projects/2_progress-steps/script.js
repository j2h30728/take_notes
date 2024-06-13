const previousButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
const displayCurrentStep = document.getElementById("current-step");

let currentIndex = 1;

const updateProgress = () => {
  circles.forEach((circle, index) => {
    if (index < currentIndex) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const actives = document.querySelectorAll(".active");
  progress.style.width = `${((actives.length - 1) / (circles.length - 1)) * 100}%`;
  displayCurrentStep.textContent = currentIndex;
};

const controlProgressButtonStatus = () => {
  if (currentIndex === 1) {
    previousButton.disabled = true;
  } else if (currentIndex === circles.length) {
    nextButton.disabled = true;
  } else {
    previousButton.disabled = false;
    nextButton.disabled = false;
  }
};

previousButton.addEventListener("click", () => {
  currentIndex--;
  if (currentIndex < 1) {
    currentIndex = 1;
  }
  updateProgress();
  controlProgressButtonStatus();
});

nextButton.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex > circles.length) {
    currentIndex = circles.length;
  }
  updateProgress();
  controlProgressButtonStatus();
});
