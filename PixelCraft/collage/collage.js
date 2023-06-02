const layouts = document.querySelectorAll(".layout");
const collageMaker = document.querySelector(".collage-maker");

layouts.forEach((layout, index) => {
  layout.addEventListener("click", () => {
    const collage = document.createElement("div");
    collage.innerHTML = layout.innerHTML;
    collage.classList.add(...layout.classList);
    collage.style.height = "400px";
    collage.style.width = "700px";

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
      collageImgHolder.appendChild(image);
      collageImgHolderWrapper.appendChild(addBtn);
      collageImgHolderWrapper.appendChild(collageImgHolder);
      addBtn.display = "none";
      frame.dataset.index = index;
      frame.appendChild(collageImgHolderWrapper);
      // frame.appendChild(collageImgHolder);
      frame.style.display = "flex";
      frame.style.justifyContent = "center";
      frame.style.alignItems = "center";
      frame.style.textAlign = "center";
      frame.style.overflow = "hidden";
      collageImgHolder.style.maxHeight = "100%";
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
