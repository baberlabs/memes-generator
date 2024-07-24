const buttonUploadImage = document.querySelector(".button-upload-image");
const buttonImageURL = document.querySelector(".button-get-url");
const inputImageURL = document.querySelector("#input-url-image");
const buttonRandomImage = document.querySelector(".button-get-random-image");
const imageContainer = document.querySelector(".image-container");
const inputTopText = document.querySelector("#input-top-text");
const inputBottomText = document.querySelector("#input-bottom-text");
const topText = document.querySelector(".top-text");
const bottomText = document.querySelector(".bottom-text");
const buttonRandomText = document.querySelector(".button-random-text");
const buttonSave = document.querySelector(".button-save");
const buttonShare = document.querySelector(".button-share");

buttonUploadImage.addEventListener("click", uploadImage);
buttonImageURL.addEventListener("click", getImageURL);
buttonRandomImage.addEventListener("click", getRandomImage);
inputTopText.addEventListener("input", writeTopText);
inputBottomText.addEventListener("input", writeBottomText);
buttonRandomText.addEventListener("click", generateRandomText);
buttonSave.addEventListener("click", saveImage);
buttonShare.addEventListener("click", shareImage);

function setImage(url) {
  const image = new Image();
  image.addEventListener("load", () => {
    const aspectRatio = image.height / image.width;
    imageContainer.style.height = 400 * aspectRatio + "px";
    imageContainer.style.backgroundImage = `url(${url})`;
  });
  image.src = url;
  buttonSave.disabled = false;
  buttonShare.disabled = false;
}

function uploadImage(e) {
  e.preventDefault();
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  input.click();
  input.addEventListener("change", (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => setImage(e.target.result));
      reader.readAsDataURL(imageFile);
    }
  });
}

function getImageURL(e) {
  e.preventDefault();
  setImage(inputImageURL.value);
}

function getRandomImage(e) {
  e.preventDefault();
  const url = "https://api.imgflip.com/get_memes";
  fetch(url)
    .then((response) => response.json())
    .then(({ data: { memes } }) => {
      const randomIndex = Math.round(Math.random() * memes.length);
      setImage(memes[randomIndex].url);
    });
}

function writeTopText(e) {
  topText.innerText = e.target.value;
}

function writeBottomText(e) {
  bottomText.innerText = e.target.value;
}

function generateRandomText(e) {
  e.preventDefault();
  fetch("./memes.json")
    .then((response) => response.json())
    .then(({ memes }) => {
      const randomIndex = Math.round(Math.random() * memes.length);
      topText.innerText = memes[randomIndex - 1].topText;
      bottomText.innerText = memes[randomIndex - 1].bottomText;
    });
}

function saveImage(e) {
  e.preventDefault();
  html2canvas(imageContainer, {
    useCORS: true,
    backgroundColor: null,
  }).then((canvas) => {
    const dataURL = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.download = `meme-${getFullDate()}`;
    a.href = dataURL;
    a.click();
  });
}

function getFullDate() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
}

function shareImage(e) {
  e.preventDefault();
}
