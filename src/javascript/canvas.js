const body = document.querySelector("body");
const basicInk = document.querySelector(".canvas__basic__container");
const hydroInk = document.querySelector(".canvas__hydro__container");
const fluoInk = document.querySelector(".canvas__fluo__container");
const canvasAcces = document.querySelector(".canvas__acces");
const canvasClose = document.querySelector(".canvas__close");
const canvasBody = document.querySelector(".canvas__body");

let showing;

const showingCanvas = () => {
  if (!showing) return;
  body.style.overflow = "hidden";
  const canvas = document.getElementById("canvas__left");
  const c = canvas.getContext("2d");

  canvas.width = window.innerWidth / 2;
  canvas.height = window.innerHeight;

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

  let shadowColor = "none";
  let blurWidth = 0;
  let size = "5px";

  let vesteFrontWidth = 400;
  let vesteFrontHeigth = 600;

  let gap = 20;
  let vesteFrontX = gap;
  let vesteFrontY = gap;

  let limitFrontX = 120;
  let limitFrontY = 230;
  let limitFrontSizeX = 200;
  let limitFrontSizeY = 350;
  let erasing = false;

  // Event listeners
  buttonRed.addEventListener("click", () => {
    erasing = false;
    color = "#F82155";
    shadowColor = color;
    cursor.style.background = "#F82155";
    buttonRed.style.border = "2px solid black";
    buttonBlue.style.border = "none";
    buttonYellow.style.border = "none";
  });
  buttonBlue.addEventListener("click", () => {
    erasing = false;
    color = "#0075FF";
    shadowColor = color;
    cursor.style.background = "#0075FF";
    buttonRed.style.border = "none";
    buttonBlue.style.border = "2px solid black";
    buttonYellow.style.border = "none";
  });
  buttonYellow.addEventListener("click", () => {
    erasing = false;
    color = "#FFC700";
    shadowColor = color;
    cursor.style.background = "#FFC700";
    buttonRed.style.border = "none";
    buttonBlue.style.border = "none";
    buttonYellow.style.border = "2px solid black";
  });

  basicInk.addEventListener("click", () => {
    shadowColor = "none";
    blurWidth = 0;
    body.classList.remove("dark-mode");
  });
  hydroInk.addEventListener("click", () => {
    body.classList.remove("dark-mode");
  });
  fluoInk.addEventListener("click", () => {
    shadowColor = "#F82155";
    inkWidth = 2;
    blurWidth = inkWidth;
    inkWidth = 0;
    body.classList.add("dark-mode");
  });

  // Functions

  function startPosition() {
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
    cdraw.shadowColor = shadowColor;
    cdraw.shadowBlur = blurWidth;
    cdraw.lineWidth = inkWidth;
    cdraw.lineCap = "round";
    cdraw.strokeStyle = color;
    cdraw.lineTo(e.clientX, e.clientY);
    cdraw.stroke();
  };

  canvasdraw.addEventListener("mousedown", startPosition);
  canvasdraw.addEventListener("mouseup", finishedPosition);
  canvasdraw.addEventListener("mousemove", drawing);

  // Responsivness of canvasImage
  let storagewidth = canvas.width; // 1366

  function resizeCanvas() {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
    canvasdraw.width = window.innerWidth;
    canvasdraw.height = window.innerHeight;
  }

  // Event Listeners
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("resize", () => {
    if (showing) {
      showing = false;
      body.style.overflow = "auto";
      canvasBody.classList.remove("canvas-is-open");
      canvasBody.classList.add("canvas-is-closed");
      if ((canvasBody.style.display = "none")) {
        body.style.overflow = "auto";
      }
    }
  });

  function draw() {
    c.drawImage(
      vesteFront,
      vesteFrontX,
      vesteFrontY,
      vesteFrontWidth,
      vesteFrontHeigth
    );

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
};

// CANVAS SLIDES IN

console.log(canvasBody);
canvasBody.addEventListener("click", function(event) {
  event.stopPropagation();
  console.log("canvas");
});

window.onload = function() {
  showing = false;
  bodyslide = true;
  canvasBody.classList.remove("canvas__body--slide");
};

canvasAcces.addEventListener("click", event => {
  event.stopPropagation();
  showing = true;
  bodyslide = false;
  canvasBody.style.display = "flex";

  showingCanvas();

  canvasBody.classList.remove("canvas-is-closed");
  canvasBody.classList.add("canvas-is-open");
});
canvasClose.addEventListener("click", () => {
  showing = false;
  body.style.overflow = "auto";
  // canvasBody.classList.remove("canvas__body--slide");
  canvasBody.classList.remove("canvas-is-open");
  canvasBody.classList.add("canvas-is-closed");
});
body.addEventListener("click", () => {
  showing = false;
  body.style.overflow = "auto";
  canvasBody.classList.remove("canvas-is-open");
  canvasBody.classList.add("canvas-is-closed");
});
