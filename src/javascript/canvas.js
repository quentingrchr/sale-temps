const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const cursor = document.getElementById("cursor");
window.addEventListener("mousemove", function(e) {
  var x = e.clientX;
  var y = e.clientY;
  cursor.style.left = x + "px";
  cursor.style.top = y + "px";
});

// Recup buttons

const buttonRed = document.querySelector(".canvas__button__red");
const buttonBlue = document.querySelector(".canvas__button__blue");
const buttonYellow = document.querySelector(".canvas__button__yellow");
const buttonErase = document.querySelector(".canvas__erase");

// Buttons event Listener
let color = "#F82155";
buttonRed.addEventListener("click", () => {
  color = "#F82155";
  console.log(cursor);
});
buttonBlue.addEventListener("click", () => {
  color = "#0075FF";
  cursor.style.borderColor = "blue";
});
buttonYellow.addEventListener("click", () => {
  color = "#FFC700";
});

buttonErase.addEventListener("click", () => {
  c.clearRect(0, 0, canvas.width, canvas.height);
});
// Some Variables
let painting = false;

// Functions

function startPosition() {
  painting = true;
}

function finishedPosition() {
  painting = false;
  c.beginPath();
}
function draw(e) {
  if (!painting) return;
  if (e.clientX - 50 < 60 || e.clientX - 50 > 154) return;
  if (e.clientY < 120 || e.clientY > 250) return;

  c.lineWidth = 1;
  c.lineCap = "round";
  c.shadowColor = "#DC8F8F";
  c.shadowBlur = 15;
  c.strokeStyle = color;
  c.lineTo(e.clientX - 60, e.clientY - 10);
  c.stroke();
}

// Event Listeners

canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mousemove", draw);
