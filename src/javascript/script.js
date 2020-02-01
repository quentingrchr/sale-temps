require("jsdom").env("", function(err, window) {
  if (err) {
    console.error(err);
    return;
  }

  var $ = require("jquery")(window);
});

const $cards = document.querySelectorAll(".card");
const $cardBtn = document.querySelectorAll(".card__btn");
const $body = document.querySelector("body");
const $liquidsSection = document.querySelector(".liquids");
const $liquidsTexts = document.querySelectorAll(".liquids__content__text");
const $liquidsTypes = document.querySelectorAll(".liquids__content__type");
const $liquidsImgsBoxs = document.querySelectorAll(".liquids__content__box");

const $iconMenu = document.querySelector("#icon-menu");
const $menu = document.querySelector("#menu");
const $exemple = document.querySelector("#exemple");
console.log($liquidsSection);

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
    $exemple.classList.remove("exemple--basic");
    $exemple.classList.remove("exemple--hydro");
    $exemple.classList.remove("exemple--fluo");

    $liquidsSection.classList.remove("rain");
    $body.classList.remove("dark-mode");
    $liquidsImgsBoxs[i].classList.add("visible");
    $liquidsType.classList.add("visible");
    $liquidsTexts[i].classList.toggle("visible");

    if (i == 0) {
      //BASIC
      $exemple.classList.toggle("exemple--basic");
    }
    if (i === 1) {
      // HYDRO
      $liquidsSection.classList.add("rain");
      $exemple.classList.toggle("exemple--hydro");
      createRain();
    }
    if (i === 2) {
      // FLUO
      $body.classList.add("dark-mode");
      $exemple.classList.toggle("exemple--fluo");

    }
  });
}

var span = document.querySelector(".hero-left__uptitle__rotate");

function addClassDown() {
  span.classList.toggle("down");
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
  5000,
  addClassDown()
);
$iconMenu.addEventListener("click", () => {
  // MENU BURGER GROWING
  $menu.classList.toggle("menu-is-opened");
});

var wpLiquids = new Waypoint({
  element: $liquidsSection,
  handler: function(direction) {
    console.log("Scrolled to waypoint!");
    $exemple.classList.toggle("opacity-1");
  },

  offset: "60%"
});

// RAIN ANIMATION
// number of drops created.
var nbDrop = 858;

// function to generate a random number range.
function randRange(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

// function to generate drops
function createRain() {
  for (i = 1; i < nbDrop; i++) {
    var dropLeft = randRange(0, 1600);
    var dropTop = randRange(-1000, 1400);

    $(".rain").append('<div class="drop" id="drop' + i + '"></div>');
    $("#drop" + i).css("left", dropLeft);
    $("#drop" + i).css("top", dropTop);
  }
}
// Make it rain
