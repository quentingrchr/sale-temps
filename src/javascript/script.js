const $cards = document.querySelectorAll(".card");
const $cardBtn = document.querySelectorAll(".card__btn");
const $body = document.querySelector("body");
const $liquidsSection = document.querySelector(".liquids");
const $liquidsTexts = document.querySelectorAll(".liquids__content__text");
const $liquidsTypes = document.querySelectorAll(".liquids__content__type");
const $liquidsImgsBoxs = document.querySelectorAll(".liquids__content__box");
const $iconMenu = document.querySelector("#icon-menu");
const $menu = document.querySelector("#menu");

const $iconBasic = document.getElementById("icon__basic");
const $iconHydro = document.getElementById("icon__hydro");
const $iconFluo = document.getElementById("icon__fluo");

const $iconBasicArea = document.getElementById("icon__basic__area");
const $iconHydroArea = document.getElementById("icon__hydro__area");
const $iconFluoArea = document.getElementById("icon__fluo__area");

const $arrowTop = document.querySelector(".arrowTop");

$arrowTop.addEventListener("click", () => {
  console.log("button work");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

console.log($body.clientHeight);

$iconBasicArea.addEventListener("click", () => {
  $iconBasic.style.border = "2px solid #F82155";
  $iconHydro.style.border = "2px solid #2D2D2D";
  $iconFluo.style.border = "2px solid #2D2D2D";
});
$iconHydroArea.addEventListener("click", () => {
  $iconFluo.style.border = "2px solid #2D2D2D";
  $iconHydro.style.border = "2px solid #0075FF";
  $iconBasic.style.border = "2px solid #2D2D2D";
});
$iconFluoArea.addEventListener("click", () => {
  $iconFluo.style.border = "2px solid #FFC700";
  $iconHydro.style.border = "2px solid #2D2D2D";
  $iconBasic.style.border = "2px solid #2D2D2D";
});

for (let i = 0; i < $cardBtn.length; i++) {
  const element = $cardBtn[i];
  element.addEventListener("click", () => {
    $cards[i].classList.toggle("opened");
  });
}

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
    stopRain();

    if (i == 0) {
      //BASIC
    }
    if (i === 1) {
      // HYDRO
      $liquidsSection.classList.add("rain");
      createRain();
    }
    if (i === 2) {
      // FLUO
      $body.classList.add("dark-mode");
    }
  });
}

$iconMenu.addEventListener("click", () => {
  // MENU BURGER GROWING
  $menu.classList.toggle("menu-is-opened");
});

// WAYPOINTS

var span = document.querySelector(".hero-left__uptitle__rotate");

function addClassRotateDown() {
  span.classList.toggle("rotate-down");
}

var count = 0;
var keywords = ["IMPERMEABLE", "PERSONNALISABLE"];

setInterval(
  function() {
    span.innerHTML = keywords[count];
    count++;
    if (count === keywords.length) {
      count = 0;
    }
  },
  2000,
  addClassRotateDown()
);

var nbDrop = 10;

// FUNCTION TO GENERATE RANDOM NUMBER RANGE
function randRange(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

// FUNCTION TO GENERATE DROPS
function createRain() {
  for (i = 1; i < nbDrop; i++) {
    let dropLeft = randRange(0, 1600);
    let dropTop = randRange(1000, 1400);
    $(".rain").append('<div class="drop" id="drop' + i + '"></div>');
    console.log(document.querySelector(".drop"));
    $("#drop" + i).css("left", dropLeft);
    $("#drop" + i).css("top", dropTop);
  }
}

// KILL THE RAIN
function stopRain() {
  const $drops = document.querySelectorAll(".drop");

  for (let i = 0; i < $drops.length; i++) {
    const drop = $drops[i];
    drop.remove();
  }
}
