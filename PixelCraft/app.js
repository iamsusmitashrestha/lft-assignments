const fileInput = document.querySelector(".file-input");
const openImage = document.querySelector(".upload");

const loadImage = () => {
  //Get user selected image
  let file = fileInput.files[0];
  //Return if user has not selected image
  if (!file) return;

  console.log(file);
};

fileInput.addEventListener("change", loadImage);
upload.addEventListener("click", () => fileInput.click());
