const body = document.querySelector("body");

// img 개수
const IMG_NUMBER = 6;

// img 표시할 함수
function paintImage(imgNumber) {
  // const img = document.createElement("img");
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
}

// img 랜덤 생성할 함수
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
