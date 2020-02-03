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
const $svgBasic = document.querySelector(".svg-basic");
const $svgFluo = document.querySelector(".svg-neon");

console.log($svgBasic);

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
        break;
      case 1:
        order.color = "black";
        $whiteJacket.classList.remove("zoom-in");
        $whiteJacket.classList.add("fade-out");
        $blackJacket.classList.remove("fade-out");
        $blackJacket.classList.add("zoom-in");
        $blackJacket.classList.add("translate-black");
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
        order.ink = "basic";
        $svgBasic.classList.remove("fade-out-svg");
        $svgFluo.classList.add("fade-out-svg");
        stopRain();
        break;
      case 1:
        order.ink = "hydro";
        $svgBasic.classList.remove("fade-out-svg");
        $svgFluo.classList.add("fade-out-svg");
        createRain();
        break;
      case 2:
        order.ink = "fluo";
        $svgFluo.classList.remove("fade-out-svg");
        $svgBasic.classList.add("fade-out-svg");
        stopRain();
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

  if (order.size && order.color && order.ink) {
    // STEP 1 AND 2 ARE VALIDATED (JUMP TO RECAP)
    console.log(true);
    let { size } = order;
    let { color } = order;
    let { ink } = order;
    alert("Color : " + color + " and Size : " + size + " with ink " + ink);
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
