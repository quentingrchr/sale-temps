const canvas = document.getElementById("canvas__left");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth / 2;
canvas.height = window.innerHeight;

const canvasRight = document.getElementById("canvas__right");
const cRight = canvasRight.getContext("2d");

canvasRight.width = window.innerWidth / 2;
canvasRight.height = window.innerHeight;
const canvasdraw = document.getElementById("canvas__draw");
const cdraw = canvasdraw.getContext("2d");

canvasdraw.width = window.innerWidth;
canvasdraw.height = window.innerHeight;

const buttonRed = document.querySelector(".button__red");
const buttonBlue = document.querySelector(".button__blue");
const buttonYellow = document.querySelector(".button__yellow");

let urlFront = require("../assets/veste-front-canvas.png");
let urlBack = require("../assets/veste-back-canvas.png");

const cursor = document.getElementById("cursor");

const sizeSmall = document.querySelector(".size__small");
const sizeMedium = document.querySelector(".size__medium");
const sizeBig = document.querySelector(".size__big");

// END OF LOADING DOM ELEMENT

// Load images
let vesteFront = new Image();
let vesteBack = new Image();

vesteFront.src = urlFront;
vesteBack.src = urlBack;

// Some Variables
let painting = false;

let color = "red";
let inkWidth = 1;
let eraseWidth = 5;

let size = "5px";

let vesteFrontWidth = 400;
let vesteFrontHeigth = 400;

let vesteBackWidth = 400;
let vesteBackHeigth = 400;
let gap = 20;
let vesteFrontX = gap;
let vesteFrontY = gap;
let vesteBackX = canvasRight.width - vesteBack.width;
let vesteBackY = gap;

let limitFrontX = 120;
let limitFrontY = 140;
let limitFrontSizeX = 200;
let limitFrontSizeY = 250;

let limitBackX = 305;
let limitBackY = 140;
let limitBackSizeX = 200;
let limitBackSizeY = 250;
let erasing = false;
// Event listeners
buttonRed.addEventListener("click", () => {
  erasing = false;
  color = "#F82155";
  cursor.style.background = "#F82155";
  buttonRed.style.border = "2px solid black";
  buttonBlue.style.border = "none";
  buttonYellow.style.border = "none";
});
buttonBlue.addEventListener("click", () => {
  erasing = false;
  color = "#0075FF";
  cursor.style.background = "#0075FF";
  buttonRed.style.border = "none";
  buttonBlue.style.border = "2px solid black";
  buttonYellow.style.border = "none";
});
buttonYellow.addEventListener("click", () => {
  erasing = false;
  color = "#FFC700";
  cursor.style.background = "#FFC700";
  buttonRed.style.border = "none";
  buttonBlue.style.border = "none";
  buttonYellow.style.border = "2px solid black";
});

// Functions

function startPosition() {
  console.log(erasing);

  if (erasing) return;
  painting = true;
}

function finishedPosition() {
  painting = false;
  cdraw.beginPath();
}

const drawing = e => {
  if (!painting) return;

  if (e.clientX < limitFrontX || e.clientX > limitFrontX + limitFrontSizeX) {
    return;
  }
  if (e.clientY < limitFrontY || e.clientY > limitFrontY + limitFrontSizeY) {
    return;
  }

  cdraw.lineWidth = inkWidth;
  cdraw.lineCap = "round";
  cdraw.strokeStyle = color;
  cdraw.lineTo(e.clientX, e.clientY);
  cdraw.stroke();
};

canvasdraw.addEventListener("mousedown", startPosition);
canvasdraw.addEventListener("mouseup", finishedPosition);
canvasdraw.addEventListener("mousemove", drawing);

const drawingRight = e => {
  if (!painting) return;
  if (
    e.clientX < limitBackX + canvasRight.width ||
    e.clientX > limitBackX + limitBackSizeX + canvasRight.width
  ) {
    return;
  }
  if (e.clientY < limitBackY || e.clientY > limitBackY + limitBackSizeY) {
    return;
  }

  cdraw.lineWidth = inkWidth;
  cdraw.lineCap = "round";
  cdraw.strokeStyle = color;
  cdraw.lineTo(e.clientX, e.clientY);
  cdraw.stroke();
};
canvasdraw.addEventListener("mousedown", startPosition);
canvasdraw.addEventListener("mouseup", finishedPosition);
canvasdraw.addEventListener("mousemove", drawingRight);

// Responsivness of canvasImage
let storagewidth = canvas.width; // 1366

function resizeCanvas() {
  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight;
  canvasdraw.width = window.innerWidth;
  canvasdraw.height = window.innerHeight;
  canvasRight.width = window.innerWidth / 2;
  canvasRight.height = window.innerHeight;
}

// Event Listeners
window.addEventListener("resize", resizeCanvas);
function draw() {
  c.drawImage(
    vesteFront,
    vesteFrontX,
    vesteFrontY,
    vesteFrontWidth,
    vesteFrontHeigth
  );
  cRight.drawImage(
    vesteBack,
    vesteBackX,
    vesteBackY,
    vesteBackWidth,
    vesteBackHeigth
  );
  cRight.setLineDash([4]);
  cRight.strokeRect(limitBackX, limitBackY, limitBackSizeX, limitBackSizeY);

  c.setLineDash([6]);
  c.strokeRect(limitFrontX, limitFrontY, limitFrontSizeX, limitFrontSizeY);

  requestAnimationFrame(draw);
}
draw();

// WIDTH BUTTONS

sizeSmall.addEventListener("click", () => {
  eraseWidth = 5;
  inkWidth = 1;
  size = "5px";
  cursor.style.width = size;
  cursor.style.height = size;
});
sizeMedium.addEventListener("click", () => {
  eraseWidth = 10;
  inkWidth = 5;
  size = "10px";
  cursor.style.width = size;
  cursor.style.height = size;
});
sizeBig.addEventListener("click", () => {
  eraseWidth = 15;
  inkWidth = 10;
  size = "15px";
  cursor.style.width = size;
  cursor.style.height = size;
});
// CURSOR STYLE

console.log(cursor);

window.addEventListener("mousemove", function(e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
});

// Eraser

const eraser = document.querySelector(".eraser");

eraser.addEventListener("click", () => {
  erasing = true;
  cursor.style.background = "white";
});
// ERASING FONCTION CALLED DELETING
function deleting(e) {
  if (!erasing) return;
  cdraw.clearRect(e.clientX, e.clientY, eraseWidth, eraseWidth);
}

canvasdraw.addEventListener("mousemove", deleting);

// GOUTTES DROPLETS

const $body = document.querySelector("body");
const $liquidsTexts = document.querySelectorAll(".liquids__content__text");
const $liquidsTypes = document.querySelectorAll(".liquids__content__type");

for (let i = 0; i < $liquidsTypes.length; i++) {
  const $liquidsType = $liquidsTypes[i];
  $liquidsType.addEventListener("click", () => {
    $liquidsTexts.forEach(el => {
      el.classList.remove("visible");
    });
    $liquidsTypes.forEach(el => {
      el.classList.remove("visible");
    });
    $liquidsImgsBoxs.forEach(el => {
      el.classList.remove("visible");
    });

    $body.classList.remove("dark-mode");
    $liquidsImgsBoxs[i].classList.add("visible");
    $liquidsType.classList.add("visible");
    $liquidsTexts[i].classList.toggle("visible");

    if (i === 2) {
      $body.classList.add("dark-mode");
    }
  });
}
