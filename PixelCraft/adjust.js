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
const filterBtns = document.querySelectorAll(".filter-button");
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

const applyFilter = () => {
  image.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
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

//Predefined Filters
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    applyFilter();
  });
});

//Custom Filters
const save = document.querySelector(".save");
save.addEventListener("click", () => {
  console.log("filterName");
  let filterName = document.querySelector("#filter-name").value;
  // const items = (() => {
  //   const fieldValue = localStorage.getItem("custom-filter");
  //   return fieldValue === null ? [] : JSON.parse(fieldValue);
  // })();

  // items.push({
  //   name: filterName,
  //   brightness: brightness,
  //   contrast: contrast,
  //   saturation: saturation,
  //   inversion: inversion,
  //   sepia: sepia,
  // });
  // localStorage.setItem("custom-filter", JSON.stringify(items));
  // console.log(items);
});

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
