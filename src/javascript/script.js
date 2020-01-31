const $cards = document.querySelectorAll(".card");
const $cardBtn = document.querySelectorAll(".card__btn");
const $body = document.querySelector("body");
const $liquidsTexts = document.querySelectorAll(".liquids__content__text");
const $liquidsTypes = document.querySelectorAll(".liquids__content__type");
const $liquidsImgsBoxs = document.querySelectorAll(".liquids__content__box");

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

    if (i === 2) $body.classList.add("dark-mode");
  });
}
