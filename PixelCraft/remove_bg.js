const removeBtn = document.querySelector("#remove-btn");

const removeBackground = () => {
  // Copy the current image into a new canvas
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // remove background from the new canvas

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //color array pixels
  const pixels = imageData.data;

  // Assuming that first pixel is the background color
  const backgroundRed = pixels[0];
  const backgroundGreen = pixels[1];
  const backgroundBlue = pixels[2];
  const tolerance = 60;

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

  // replace the image tag with new image with removed background
  image.src = canvas.toDataURL();
};

removeBtn.addEventListener("click", () => {
  removeBackground();
});
