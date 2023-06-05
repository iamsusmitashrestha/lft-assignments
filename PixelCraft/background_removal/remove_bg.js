const imageInput = document.getElementById("image-input");
const uploadArea = document.querySelector(".upload-area");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

imageInput.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
  console.log("click");
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const image = new Image();
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      uploadArea.style.display = "none";

      ctx.drawImage(image, 0, 0, image.width, image.height);
      removeBackground();
    };
    image.src = event.target.result;
  };

  reader.readAsDataURL(file);
}

function removeBackground() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //color array pixels
  const pixels = imageData.data;

  const backgroundRed = pixels[0]; // Customize based on your background color
  const backgroundGreen = pixels[1]; // Customize based on your background color
  const backgroundBlue = pixels[2]; // Customize based on your background color
  const tolerance = 60; // Adjust the tolerance based on your background color variation

  console.log([backgroundRed, backgroundGreen, backgroundBlue].join(", "));

  for (let i = 0; i < pixels.length; i += 4) {
    const red = pixels[i];
    const green = pixels[i + 1];
    const blue = pixels[i + 2];

    const distance = Math.sqrt(
      (red - backgroundRed) ** 2 +
        (green - backgroundGreen) ** 2 +
        (blue - backgroundBlue) ** 2
    );

    if (distance <= tolerance) {
      pixels[i + 3] = 0; // Set alpha value to 0 (transparent)
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
