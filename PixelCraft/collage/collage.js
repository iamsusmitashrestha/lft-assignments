const layouts = document.querySelectorAll(".layout");
const collageMaker = document.querySelector(".collage-maker");

layouts.forEach((layout, index) => {
  layout.addEventListener("click", () => {
    buildIndicators(index);

    const collage = document.createElement("div");
    collage.innerHTML = layout.innerHTML;
    collage.classList.add(...layout.classList);
    collage.style.height = "500px";
    collage.style.width = "700px";
    collage.style.margin = "0 auto";

    let frames = collage.querySelectorAll(".frame");

    frames.forEach((frame, index) => {
      let addBtn = document.createElement("label");
      let plus = document.createElement("i");
      let input = document.createElement("input");
      let collageImgHolderWrapper = document.createElement("div");
      let collageImgHolder = document.createElement("div");
      let image = document.createElement("img");
      image.setAttribute("src", "");
      image.style.height = "100%";
      image.style.width = "100%";
      image.style.objectFit = "cover";
      input.type = "file";
      input.name = "selectedCollageImage";
      input.accept = "image/*";
      input.classList.add("collage-file-input");
      input.id = `file-input${index}`;
      plus.setAttribute("data-feather", "plus");
      addBtn.appendChild(input);
      addBtn.appendChild(plus);
      collageImgHolder.classList.add("img-holder");
      collageImgHolder.appendChild(image);
      collageImgHolderWrapper.appendChild(addBtn);
      collageImgHolderWrapper.appendChild(collageImgHolder);
      addBtn.display = "none";
      frame.dataset.index = index;
      frame.appendChild(collageImgHolderWrapper);
      collageImgHolderWrapper.style.display = "flex";
      collageImgHolderWrapper.style.justifyContent = "center";
      collageImgHolderWrapper.style.alignItems = "center";
      frame.style.overflow = "hidden";
      collageImgHolder.style.height = "100%";
      collageImgHolder.style.width = "100%";
      collageImgHolder.style.display = "none";
      collageImgHolderWrapper.style.height = "100%";
      collageImgHolderWrapper.style.width = "100%";
      input.style.display = "none";
    });

    collageMaker.innerHTML = collage.outerHTML;
    feather.replace();

    frames = document.querySelectorAll(".frame");

    frames.forEach((frame) => {
      const imagePicker = frame.querySelector(`input`);

      imagePicker?.addEventListener("change", (e) => {
        // Get user selected image
        let file = e.target.files[0];
        // Return if user has not selected an image
        if (!file) return;
        let frameImage = frame.querySelector("img");
        let frameAddBtn = frame.querySelector("label");
        let frameCollageImgHolder = frameImage.parentElement;
        frameImage.src = URL.createObjectURL(file);
        frameCollageImgHolder.style.display = "block";
        frameAddBtn.style.display = "none";
      });
    });
  });
});

const saveCollage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const layout = document.querySelector(".collage-maker .layout");

  const layoutRect = layout.getBoundingClientRect();

  // Set the canvas dimensions to match the layout dimensions
  canvas.width = layoutRect.width;
  canvas.height = layoutRect.height;

  const frames = layout.querySelectorAll(".frame");

  frames.forEach((frame) => {
    const frameRect = frame.getBoundingClientRect();
    const image = frame.querySelector("img");

    const offsetX = frameRect.left - layoutRect.left;
    const offsetY = frameRect.top - layoutRect.top;

    ctx.drawImage(image, offsetX, offsetY, image.width, image.height);
  });

  const link = document.createElement("a");
  link.download = "collage.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

document.querySelector("#save").addEventListener("click", () => {
  saveCollage();
});

document.querySelector("#save").addEventListener("click", () => {
  saveCollage();
});

const buildIndicators = (index) => {
  const layoutOptions = document.querySelectorAll(".layout-designs button");

  if (document.querySelector(".active") !== null) {
    document.querySelector(".active").classList.remove("active");
  }

  layoutOptions[index].classList.add("active");
};

// ctx.drawImage(image, offsetX, offsetY, image.width, image.height);

// const imageAspectRatio = image.naturalWidth / image.naturalHeight;
// const targetAspectRatio = frameRect.width / frameRect.height;

// let targetWidth = frameRect.width;
// let targetHeight = frameRect.height;

// // Calculate the scaling and cropping values based on the aspect ratios
// if (imageAspectRatio > targetAspectRatio) {
//   targetHeight = frameRect.height;
//   targetWidth = frameRect.height * imageAspectRatio;
//   offsetX += (frameRect.width - targetWidth) / 2;
// } else {
//   targetWidth = frameRect.width;
//   targetHeight = frameRect.width / imageAspectRatio;
//   offsetY += (frameRect.height - targetHeight) / 2;
// }

// ctx.drawImage(
//   image,
//   0,
//   0,
//   image.naturalWidth,
//   image.naturalHeight,
//   offsetX,
//   offsetY,
//   targetWidth,
//   targetHeight
// );
