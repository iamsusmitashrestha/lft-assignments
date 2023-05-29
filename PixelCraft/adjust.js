const imageHolder = document.querySelector(".image-holder");
const image = document.querySelector("#image");
const fileInput = document.querySelector("#file-input");
const openimage = document.querySelector(".open-image");
const uploadArea = document.querySelector(".upload-area");
const overlay = document.querySelector(".overlay");
const filterOverlay = document.querySelector(".filter-overlay");
const cropOverlay = document.querySelector(".crop-overlay");
const cropCropOverlay = document.querySelector(".crop-crop-overlay");
const sliders = document.querySelectorAll(".filter-slider");
const rotateOptions = document.querySelectorAll(".rotate");
let filterBtns = Array.from(document.querySelectorAll(".filter-button"));
const cropBoundButtons = document.querySelectorAll(".crop-overlay button");

let brightness = "100",
  saturation = "100",
  contrast = "100",
  inversion = "0",
  sepia = "0";

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
  image.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) sepia(${sepia}%)`;
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
    filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) sepia(${sepia}%)`,
  });

  localStorage.setItem("custom-filter", JSON.stringify(filtersArray));
  addFilter(filterName.value, filtersArray[filtersArray.length - 1].filter);

  filterName.value = "";
}

save.addEventListener("click", addCustomFilter);

const saveImage = async () => {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) sepia(${sepia}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    image,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
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

let cropLeft = 0,
  cropRight = 0,
  cropTop = 0,
  cropBottom = 0;

let currentDraggingElement = null;

const onCropClicked = () => {
  cropLeft = 0;
  cropRight = 0;
  cropTop = 0;
  cropBottom = 0;
  setCropBounds();
  cropOverlay.style.display = "block";
};

const setCropBounds = () => {
  cropOverlay.style.top = `${cropTop}px`;
  cropOverlay.style.left = `${cropLeft}px`;
  cropOverlay.style.right = `${cropRight}px`;
  cropOverlay.style.bottom = `${cropBottom}px`;
};

document.querySelector("#crop").addEventListener("click", onCropClicked);

cropBoundButtons.forEach((button) => {
  button.addEventListener("mousedown", (e) => {
    currentDraggingElement = button;
    cropCropOverlay.style.pointerEvents = "all";
  });
});

window.addEventListener("mouseup", (e) => {
  if (currentDraggingElement) {
    currentDraggingElement = null;
    cropCropOverlay.style.pointerEvents = "none";
  }
});

cropCropOverlay.addEventListener("mousemove", (e) => {
  if (!currentDraggingElement) return;

  const rect = cropCropOverlay.getBoundingClientRect();

  if (e.offsetX > 0) {
    if (currentDraggingElement.dataset.bound === "left") {
      cropLeft = e.offsetX;
    }
    if (currentDraggingElement.dataset.bound === "right") {
      cropRight = rect.width - e.offsetX;
    }
  }

  if (e.offsetY > 0) {
    if (currentDraggingElement.dataset.bound === "top") {
      cropTop = e.offsetY;
    }
    if (currentDraggingElement.dataset.bound === "bottom") {
      cropBottom = rect.height - e.offsetY;
    }
  }

  setCropBounds();
});
