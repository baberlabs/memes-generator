const imageURLInput = document.querySelector("#image-url-input");
const getImageButton = document.querySelector("#get-image-button");
const imageContainer = document.querySelector("#image-container");
const topTextInput = document.querySelector("#top-text-input");
const bottomTextInput = document.querySelector("#bottom-text-input");
const saveImageButton = document.querySelector("#save-button");
const whatsappButton = document.querySelector("#whatsapp-button");
const randomImageButton = document.querySelector("#random-image-button");

getImageButton.addEventListener("click", (e) => {
  generateImage(e);
});

randomImageButton.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const url = await getRandomMemeURL();
    const text =
      bottomTextArray[Math.round(Math.random() * bottomTextArray.length)];
    await generateImage(e, url, text);
  } catch (err) {
    console.log(err);
  }
});

function generateImage(e, randomUrl, text) {
  e.preventDefault();

  const url = randomUrl || imageURLInput.value;

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = url;
  image.width = 400;
  image.height = 400;
  image.onload = () => {
    currentImage = image;
    randomBottomText = text;
    drawCanvas();
  };
}

topTextInput.addEventListener("input", drawCanvas);
bottomTextInput.addEventListener("input", drawCanvas);

function drawCanvas() {
  if (!currentImage) return;

  const topText = randomBottomText
    ? "ME WHEN MITCH"
    : topTextInput.value.toUpperCase();
  const bottomText = randomBottomText
    ? randomBottomText.toUpperCase()
    : bottomTextInput.value.toUpperCase();

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 450;
  canvas.height = currentImage.height;

  ctx.drawImage(currentImage, 0, 0, 450, currentImage.height);

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
  createImage().then((link) => {
    link.download = "meme.png";
    link.click();
  });
});

whatsappButton.addEventListener("click", (e) => {
  createImage().then((link) => {
    const imageUrl = link.href;
    e.target.setAttribute(
      "href",
      "whatsapp://send?text=" + encodeURIComponent(imageUrl)
    );
  });
});

function createImage() {
  return html2canvas(imageContainer).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");

    return link;
  });
}

async function getRandomMemeURL() {
  const response = await fetch("https://api.memegen.link/templates/");
  const templates = await response.json();
  console.log(templates.length);
  const templateIds = templates.map((template) => template.id);
  const randomTemplateId =
    templateIds[Math.floor(Math.random() * templateIds.length)];
  return `https://api.memegen.link/images/${randomTemplateId}.png`;
}
