const $sizeInputs = document.querySelectorAll(".form__size__input");
const $sizeContain = document.querySelector(".from__size__inputs");
const $colInputs = document.querySelectorAll(".form__color__input");
const $colContain = document.querySelector(".form__color__inputs");
const $inkInputs = document.querySelectorAll(".form__ink__input");
const $inkContain = document.querySelectorAll(".form__ink__inputs");
const $btnJacket = document.querySelector("#btnJacket");
const $form1 = document.querySelector("#form1");
const $form2 = document.querySelector("#form2");

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
        break;
      case 1:
        order.color = "black";
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
        break;
      case 1:
        order.ink = "hydro";
        break;
      case 1:
        order.ink = "fluo";
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
