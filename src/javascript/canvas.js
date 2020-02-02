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

// Load images
let vesteFront = new Image();
let vesteBack = new Image();

vesteFront.src = urlFront;
vesteBack.src = urlBack;

// Some Variables
let painting = false;

let color = "red";
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

// Event listeners
buttonRed.addEventListener("click", () => {
  color = "#F82155";
});
buttonBlue.addEventListener("click", () => {
  color = "#0075FF";
});
buttonYellow.addEventListener("click", () => {
  color = "#FFC700";
});

// Functions

function startPosition() {
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

  cdraw.lineWidth = 1;
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

  cdraw.lineWidth = 1;
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
