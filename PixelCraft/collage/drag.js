const frames = document.querySelectorAll(".collage-img-holder");
const imgHolders = document.querySelectorAll(".img-holder");

let currentDraggingElement = null;

let mouseDownListener = (e) => {
  e.preventDefault();
  if (e.target.nodeName === "IMG") {
    currentDraggingElement = e.target;
  } else {
    currentDraggingElement = null;
  }
};

window.addEventListener("mousedown", mouseDownListener);

window.addEventListener("mouseup", () => {
  currentDraggingElement = null;
});

window.addEventListener("mousemove", (e) => {
  if (currentDraggingElement) {
    currentDraggingElement.style.objectPosition =
      50 - e.offsetX + "% " + (50 - e.offsetY) + "%";
  }
});

imgHolders.forEach((holder) => {
  holder.addEventListener("dragover", (e) => {
    e.preventDefault();
    holder.classList.add("hovered");
    console.log("drag");
  });
});
