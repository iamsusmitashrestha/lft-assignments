const frames = document.querySelectorAll(".collage-maker .frame");

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

frames.forEach((frame) => {
  frame.addEventListener("dragover", (e) => {
    e.preventDefault();
    console.log("drag");
  });
});
