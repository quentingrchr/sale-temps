const $sizCircles = document.querySelectorAll(".size__circle");
const $sizContain = document.querySelector(".size__circles");
const $colCircles = document.querySelectorAll(".color__circle");
const $colContain = document.querySelector(".color__circles");
const $btnJacket = document.querySelector("#btnJacket");
const order = {
  color: false,
  size: false,
  ink: false
};

for (let i = 0; i < $sizCircles.length; i++) {
  let $circle = $sizCircles[i];
  $circle.addEventListener("click", () => {
    $sizCircles.forEach(element => {
      element.classList.remove("active");
    });
    // UPDATE DOM
    $circle.classList.toggle("active");
    // UPDATE ORDER
    switch (i) {
      case 0:
        order.size = "xs";
        break;
      case 1:
        order.size = "s";
        break;
      case 2:
        order.size = "m";
        break;
      case 3:
        order.size = "l";
        break;
      case 4:
        order.size = "xl";
        break;
      default:
        break;
    }
    if (checkIfStepReady(1)) {
      // CHECK IF IT SHOULD DISPLAY SUBMIT BUTTON OR NOT
      displayEl($btnJacket);
    }
  });
}

for (let i = 0; i < $colCircles.length; i++) {
  let $circle = $colCircles[i];
  $circle.addEventListener("click", () => {
    $colCircles.forEach(element => {
      element.classList.remove("active");
    });
    // UPDATE DOM
    $circle.classList.toggle("active");
    // UPDATE ORDER
    switch (i) {
      case 0:
        order.color = "white";
        break;
      case 1:
        order.color = "black";
        break;
      default:
        break;
    }
    if (checkIfStepReady(1)) {
      displayEl($btnJacket);
    }
  });
}

function checkIfStepReady(step) {
  if (step === 1) {
    if (order.size && order.color) return true;
    else return false;
  }
  if (step === 2) {
    if (order.ink) return true;
    else return false;
  }
}

function displayEl(el) {
  console.log(order);
  el.style.visibility = "visible";
}

$btnJacket.addEventListener("click", () => {
  let { size } = order;
  let { color } = order;
  alert("Color : " + color + " and Size : " + size);
});
