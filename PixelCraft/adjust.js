const imageHolder = document.querySelector(".image-holder");
const image = document.querySelector("#image");
const fileInput = document.querySelector("#file-input");
const openimage = document.querySelector(".open-image");
const uploadArea = document.querySelector(".upload-area");
const overlay = document.querySelector(".overlay");
const sliders = document.querySelectorAll(".filter-slider");
const rotateOptions = document.querySelectorAll(".rotate");

let brightness = "100",
  saturation = "100",
  contrast = "100",
  inversion = "0",
  grayscale = "0";
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
  image.style.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  overlay.style.backgroundImage = `radial-gradient(circle,rgba(0,0,0,0) 25%,rgba(0,0,0,${vignette}) 100%)`;
};

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
      case "grayscale":
        grayscale = slider.value;
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

const saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
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
