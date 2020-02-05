const $body = document.querySelector("body");
const $sizeInputs = document.querySelectorAll(".form__size__input");
const $sizeContain = document.querySelector(".from__size__inputs");
const $colInputs = document.querySelectorAll(".form__color__input");
const $colContain = document.querySelector(".form__color__inputs");
const $inkInputs = document.querySelectorAll(".form__ink__input");
const $inkContain = document.querySelectorAll(".form__ink__inputs");
const $btnJacket = document.querySelector("#btnJacket");
const $form1 = document.querySelector("#form1");
const $form2 = document.querySelector("#form2");
const $whiteJacket = document.querySelector(".section-custom__image--white");
const $blackJacket = document.querySelector(".section-custom__image--black");
const $svgBasic = document.querySelector(".custom__svg--basic");
const $svgFluo = document.querySelector(".custom__svg--fluo");
const $steper = document.querySelectorAll(".steper p");
const $recap = document.querySelector("#recap");
const $colorRecap = document.querySelector("#circle__color");
const $sizeRecap = document.querySelector("#circle__size");
const $inkRecap = document.querySelector("#inkRecap");
const $inkImage = document.querySelector("#inkImage");
const $btnAddBasket = document.querySelector("#btn-add-to-basket");
let hydroinksrc = require("../assets/ink-input-hydro.png");
let basicinksrc = require("../assets/ink-input-basic.png");
let fluoinksrc = require("../assets/ink-input-fluo.png");

var step = 0;

// ORDER
const order = {
  color: false,
  size: false,
  ink: false
};

// SIZE EVENT LISTENERS
for (let i = 0; i < $sizeInputs.length; i++) {
  let $circle = $sizeInputs[i];
  $circle.addEventListener("click", () => {
    $sizeInputs.forEach(element => {
      element.classList.remove("active");
    });
    // UPDATE DOM
    $circle.classList.toggle("active");
    // UPDATE ORDER
    switch (i) {
      case 0:
        order.size = "XS";
        break;
      case 1:
        order.size = "S";
        break;
      case 2:
        order.size = "M";
        break;
      case 3:
        order.size = "L";
        break;
      case 4:
        order.size = "XL";
        break;
      default:
        break;
    }
    if (checkIfStepReady(1)) {
      // ALL REQUIRED INPUTS ARE SELECTED AND STORED

      displayEl($btnJacket);
    }
  });
}

// COLORS EVENT LISTENERS
for (let i = 0; i < $colInputs.length; i++) {
  let $circle = $colInputs[i];
  $circle.addEventListener("click", () => {
    $colInputs.forEach(element => {
      element.classList.remove("active");
    });
    // UPDATE DOM
    $circle.classList.toggle("active");
    // UPDATE ORDER
    switch (i) {
      case 0:
        order.color = "white";
        $whiteJacket.classList.add("zoom-in");
        $blackJacket.classList.add("fade-out");
        $blackJacket.classList.remove("zoom-in");
        $whiteJacket.classList.remove("fade-out");
        $blackJacket.classList.remove("translate-black");
        $whiteJacket.classList.add("translate-white");
        break;
      case 1:
        order.color = "black";
        $whiteJacket.classList.remove("zoom-in");
        $whiteJacket.classList.add("fade-out");
        $blackJacket.classList.remove("fade-out");
        $blackJacket.classList.add("zoom-in");
        $blackJacket.classList.add("translate-black");
        $whiteJacket.classList.remove("translate-white");

        break;
      default:
        break;
    }
    if (checkIfStepReady(1)) {
      // ALL REQUIRED INPUTS ARE SELECTED AND STORED

      displayEl($btnJacket);
    }
  });
}

// INKS EVENT LISTENERS
for (let i = 0; i < $inkInputs.length; i++) {
  let $ink = $inkInputs[i];
  $ink.addEventListener("click", () => {
    $inkInputs.forEach(element => {
      element.classList.remove("active");
    });
    // UPDATE DOM
    $ink.classList.toggle("active");
    // UPDATE ORDER
    switch (i) {
      case 0:
        order.ink = "Basique";
        $svgBasic.classList.remove("fade-out-svg");
        $svgFluo.classList.add("fade-out-svg");
        stopRain();
        $body.classList.remove("dark-mode");
        break;
      case 1:
        order.ink = "Hydroréactif";
        $svgBasic.classList.remove("fade-out-svg");
        $svgFluo.classList.add("fade-out-svg");
        createRain();
        $body.classList.remove("dark-mode");
        break;
      case 2:
        order.ink = "Fluorescent";
        $svgFluo.classList.remove("fade-out-svg");
        $svgBasic.classList.add("fade-out-svg");
        stopRain();
        $body.classList.add("dark-mode");
        break;
      default:
        break;
    }
    if (checkIfStepReady(2)) {
      // AN INPUT IS SELECTED AND STORED
      displayEl($btnJacket);
    }
  });
}

function checkIfStepReady(step) {
  // TO CHECK IS REQUIRED INPUT ARE SELECTED TO JUMP TO THE NEXT STEP
  if (step === 1) {
    if (order.size && order.color) return true;
    else return false;
  }
  if (step === 2) {
    if (order.ink) {
      return true;
    } else {
      return false;
    }
  }
}

function displayEl(el) {
  console.log(order);
  el.style.visibility = "visible";
}

$btnJacket.addEventListener("click", () => {
  // SUBMIT BUTTON (JUMP TO 2ND STEP)
  $form1.style.display = "none";
  $form2.classList.toggle("visible");
  $btnJacket.style.visibility = "hidden";
  $steper[step].classList.remove("visible-step");
  checkStep();
  $steper[step].classList.add("visible-step");

  if (order.size && order.color && order.ink) {
    // STEP 1 AND 2 ARE VALIDATED (JUMP TO RECAP)
    let { size } = order;
    let { color } = order;
    let { ink } = order;
    $colorRecap.style.backgroundColor = color;
    $sizeRecap.innerHTML = `${size}`;
    $inkRecap.innerHTML = `${ink}` + "<span>marqueur inclus</span>";
    if (order.ink === "Basique") {
      $inkImage.src = basicinksrc;
    } else if (order.ink === "Hydroréactif") {
      $inkImage.src = hydroinksrc;
    } else {
      $inkImage.src = fluoinksrc;
    }

    $body.classList.remove("dark-mode");
    $recap.classList.add("visible");
    stopRain();
    $svgBasic.style.display = "none";
    $svgFluo.style.display = "none";
  }
});

// FUNCTION TO GENERATE DROPS
function createRain() {
  for (i = 1; i < nbDrop; i++) {
    let dropLeft = randRange(0, 1600);
    let dropTop = randRange(-600, 600);
    $(".rain").append('<div class="drop" id="drop' + i + '"></div>');
    console.log(document.querySelector(".drop"));
    $("#drop" + i).css("left", dropLeft);
    $("#drop" + i).css("top", dropTop);
  }
}

var nbDrop = 10;

// FUNCTION TO GENERATE RANDOM NUMBER RANGE
function randRange(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

// KILL THE RAIN
function stopRain() {
  const $drops = document.querySelectorAll(".drop");

  for (let i = 0; i < $drops.length; i++) {
    const drop = $drops[i];
    drop.remove();
  }
}

function checkStep() {
  if (order.color === false && order.size === false) {
    step = 0;
  }
  if (order.color && order.size) {
    step = 1;
  }
  if (order.color && order.size && order.ink) {
    step = 2;
  }
}

$steper[0].classList.add("visible-step");

$btnAddBasket.addEventListener("click", () => {
  window.sessionStorage.setItem("ordered", "true");
});
