const imageURLInput = document.querySelector("#image-url-input");
const getImageButton = document.querySelector("#get-image-button");
const imageContainer = document.querySelector("#image-container");
const topTextInput = document.querySelector("#top-text-input");
const bottomTextInput = document.querySelector("#bottom-text-input");

getImageButton.addEventListener("click", (e) => {
  e.preventDefault();
  const url = imageURLInput.value;
  const image = document.createElement("img");
  // image.src = url;
  image.src =
    "https://www.shutterstock.com/image-vector/computer-cat-animal-meme-pixel-260nw-2415076223.jpg";
  imageContainer.innerHTML = "";
  imageContainer.appendChild(image);
});

topTextInput.addEventListener("input", (e) => {
  createElement("top-text-p", 0, undefined, e);
});

bottomTextInput.addEventListener("input", (e) => {
  createElement("bottom-text-p", undefined, 0, e);
});

function createElement(className, top, bottom, e) {
  const existingElement = document.querySelector(`.${className}`) || undefined;

  if (existingElement) {
    imageContainer.removeChild(existingElement);
  }

  const text = e.target.value;
  const element = document.createElement("p");

  element.style.position = "absolute";
  element.style.zIndex = 10;
  element.innerText = text;
  element.classList.add(className);

  if (top !== undefined) {
    element.style.top = top;
  }

  if (bottom !== undefined) {
    element.style.bottom = bottom;
  }

  imageContainer.appendChild(element);
}
