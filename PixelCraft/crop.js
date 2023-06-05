const cropOverlay = document.querySelector(".crop-overlay");
const cropCropOverlay = document.querySelector(".crop-crop-overlay");
const cropBoundButtons = document.querySelectorAll(".crop-overlay button");
const finalizeCrop = document.querySelector("#finalize-crop");

let cropLeft = 0,
  cropRight = 0,
  cropTop = 0,
  cropBottom = 0;

let currentDraggingElement = null;

const onCropClicked = () => {
  const imageWrapper = document.querySelector(".img");

  imageHolder.style.width = "100%";
  imageHolder.style.height = "calc(100vh - 10rem)";
  imageWrapper.style.transform = "unset";
  cropOverlay.style.display = "block";
  finalizeCrop.style.display = "block";
};

const setCropBounds = () => {
  cropOverlay.style.top = `${cropTop}px`;
  cropOverlay.style.left = `${cropLeft}px`;
  cropOverlay.style.right = `${cropRight}px`;
  cropOverlay.style.bottom = `${cropBottom}px`;
};

document.querySelector("#crop").addEventListener("click", onCropClicked);

document.querySelector("#finalize-crop").addEventListener("click", () => {
  const rect = cropCropOverlay.getBoundingClientRect();
  const imageWrapper = document.querySelector(".img");

  imageHolder.style.width = rect.width - cropRight - cropLeft + "px";
  imageHolder.style.height = rect.height - cropBottom - cropTop + "px";
  imageWrapper.style.transform = `translate(-${cropLeft}px,-${cropTop}px)`;
  cropOverlay.style.display = "none";
  finalizeCrop.style.display = "none";
});

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
