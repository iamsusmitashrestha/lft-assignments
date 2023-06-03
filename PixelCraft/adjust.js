const imageHolder = document.querySelector(".image-holder");
const image = document.querySelector("#image");

const fileInput = document.querySelector("#file-input");
const openimage = document.querySelector(".open-image");
const uploadArea = document.querySelector(".upload-area");

const sliders = document.querySelectorAll(".filter-slider");
const rotateOptions = document.querySelectorAll(".rotate");

const overlay = document.querySelector(".overlay");
const filterOverlay = document.querySelector(".filter-overlay");
let filterBtns = Array.from(document.querySelectorAll(".filter-button"));

let brightness = "100",
  saturation = "100",
  contrast = "100",
  inversion = "0",
  sepia = "0",
  blur = "0",
  hueRotate = "0";

let filter = "";

let rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;

let vignette = 0;

const loadImage = () => {
  //Get user selected image
  let file = fileInput.files[0];
  //Return if user has not selected image
  if (!file) return;
  image.src = URL.createObjectURL(file);

  uploadArea.style.display = "none";
  imageHolder.style.display = "block";
};

fileInput.addEventListener("change", loadImage);

rotateOptions.forEach((option) => {
  option.addEventListener("click", () => {
    switch (option.id) {
      case "left":
        rotate -= 90;
        break;
      case "right":
        rotate += 90;
        break;
      case "horizontal":
        flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        break;
      case "vertical":
        flipVertical = flipVertical === 1 ? -1 : 1;
        break;

      default:
        break;
    }

    applyFilter();
  });
});

const applyFilter = () => {
  image.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  overlay.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  image.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) sepia(${sepia}%) blur(${blur}px) hue-rotate(${hueRotate}deg)`;
  overlay.style.backgroundImage = `radial-gradient(circle,rgba(0,0,0,0) 25%,rgba(0,0,0,${vignette}) 100%)`;
  filterOverlay.style.backdropFilter = filter;
};

//Input sliders
sliders.forEach((slider) => {
  slider.addEventListener("input", () => {
    switch (slider.id) {
      case "brightness":
        brightness = slider.value;
        break;
      case "saturation":
        saturation = slider.value;
        break;
      case "contrast":
        contrast = slider.value;
        break;
      case "inversion":
        inversion = slider.value;
        break;
      case "sepia":
        sepia = slider.value;
        break;
      case "blur":
        blur = slider.value;
        break;
      case "hue-rotate":
        hueRotate = slider.value;
        break;
      case "vignette":
        vignette = slider.value;
        break;

      default:
        break;
    }

    applyFilter();
  });
});

const setUpClickListenerOnFilterBtn = (btn) => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    applyFilter();
  });
};

//Predefined Filters
filterBtns.forEach((btn) => {
  setUpClickListenerOnFilterBtn(btn);
});

//Custom Filters
const save = document.querySelector(".save");
const filterName = document.querySelector("#filter-name");
const filterBtn = document.querySelector(".container");

let filtersArray = JSON.parse(localStorage.getItem("custom-filter") ?? []);

filtersArray.forEach((filterItem) =>
  addFilter(filterItem.name, filterItem.filter)
);

function addFilter(name, filter) {
  const customFilterBtn = document.createElement("button");
  const filterNameDiv = document.createElement("div");
  const img = document.createElement("img");
  img.classList.add("filter-preview");
  customFilterBtn.classList.add("filter-button");
  filterBtn.appendChild(customFilterBtn);
  customFilterBtn.appendChild(filterNameDiv);
  customFilterBtn.appendChild(img);
  filterNameDiv.textContent = name;
  img.style.filter = filter;
  applyFilter();
  customFilterBtn.dataset.filter = filter;
  setUpClickListenerOnFilterBtn(customFilterBtn);
}

function addCustomFilter() {
  filtersArray.push({
    name: filterName.value,
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) sepia(${sepia}%) blur(${blur}px) hue-rotate(${hueRotate}deg)`,
  });

  localStorage.setItem("custom-filter", JSON.stringify(filtersArray));
  addFilter(filterName.value, filtersArray[filtersArray.length - 1].filter);

  filterName.value = "";
  modal.style.display = "none";
}

save.addEventListener("click", addCustomFilter);

const saveImage = async () => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) sepia(${sepia}%) blur(${blur}px) hue-rotate(${hueRotate}deg)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);

  const rect = image.getBoundingClientRect();
  const leftCropPercent = cropLeft / rect.width;
  const rightCropPercent = cropRight / rect.width;
  const topCropPercent = cropTop / rect.height;
  const bottomCropPercent = cropBottom / rect.height;

  ctx.drawImage(
    image,
    leftCropPercent * canvas.width,
    topCropPercent * canvas.height,
    canvas.width * (1 - (leftCropPercent + rightCropPercent)),
    (1 - (topCropPercent + bottomCropPercent)) * canvas.height,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width * (1 - (leftCropPercent + rightCropPercent)),
    (1 - (topCropPercent + bottomCropPercent)) * canvas.height
  );

  if (filter) {
    var img = new Image();

    //Promise is resolved only after image load
    await new Promise((resolve) => {
      img.onload = () => {
        resolve();
      };

      img.src = canvas.toDataURL();
    });

    ctx.clearRect(
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    ctx.filter = filter;
    if (rotate !== 0) {
      ctx.rotate((rotate * Math.PI) / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(
      img,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
  }

  if (vignette > 0) {
    const largerSide =
      canvas.width > canvas.height ? canvas.width : canvas.height;

    // Add the color stops
    const gradient = ctx.createRadialGradient(
      0,
      0,
      (largerSide / 2) * 0.25,
      0,
      0,
      largerSide / 2
    );
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, `rgba(0,0,0,${vignette})`);

    // Set the fill style and draw a rectangle
    ctx.fillStyle = gradient;
    ctx.fillRect(
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );
  }

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

document.querySelector("#download").addEventListener("click", () => {
  saveImage();
});
