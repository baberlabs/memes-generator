const imageURLInput = document.querySelector("#image-url-input");
const getImageButton = document.querySelector("#get-image-button");
const imageContainer = document.querySelector("#image-container");
const topTextInput = document.querySelector("#top-text-input");
const bottomTextInput = document.querySelector("#bottom-text-input");
const saveImageButton = document.querySelector("#save-button");

getImageButton.addEventListener("click", (e) => {
  e.preventDefault();
  const url =
    "https://www.shutterstock.com/image-vector/computer-cat-animal-meme-pixel-260nw-2415076223.jpg" ||
    imageURLInput.value;
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = url;
  image.onload = () => {
    currentImage = image;
    drawCanvas();
  };
});

topTextInput.addEventListener("input", drawCanvas);
bottomTextInput.addEventListener("input", drawCanvas);

function drawCanvas() {
  if (!currentImage) return;

  const topText = topTextInput.value;
  const bottomText = bottomTextInput.value;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = currentImage.width;
  canvas.height = currentImage.height;

  ctx.drawImage(currentImage, 0, 0);

  ctx.font = "30px Impact";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  if (topText) {
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);
  }

  if (bottomText) {
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  }

  imageContainer.innerHTML = "";
  imageContainer.appendChild(canvas);
}

saveImageButton.addEventListener("click", (e) => {
  e.preventDefault();
  html2canvas(imageContainer).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "meme.png";
    link.click();
  });
});
