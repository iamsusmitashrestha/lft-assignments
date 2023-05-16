const SLIDE_INTERVAL = 3000;

const images = document.querySelectorAll("img");

const buildIndicators = (active = 0) => {
  let html = "";

  images.forEach((_, index) => {
    html += `<button onclick="goToPage(${index})" class='indicator${
      index === active ? " active" : ""
    }'></button>`;
  });

  document.querySelector(".indicators").innerHTML = html;
};

buildIndicators();

let counter = 0;

const resetInterval = () => {
  if (interval) {
    clearInterval(interval);
    interval = setInterval(autoSlide, SLIDE_INTERVAL);
  }
};

const goToPage = (index) => {
  resetInterval();
  counter = index;
  slideImage();
};

const goNext = () => {
  resetInterval();

  if (counter === images.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImage();
};

const goPrevious = () => {
  resetInterval();

  if (counter === 0) {
    counter = images.length - 1;
  } else {
    counter--;
  }
  slideImage();
};

let interval;

const autoSlide = () => {
  if (!Array.from(images).some((image) => image.matches(":hover"))) {
    goNext();
  }
};

interval = setInterval(autoSlide, SLIDE_INTERVAL);

const slideImage = () => {
  buildIndicators(counter);
  images.forEach((image, index) => {
    image.style.transform = `translateX(-${counter * 100}%)`;
  });
};
