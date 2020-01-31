const $cards = document.querySelectorAll(".card");
const $cardBtn = document.querySelectorAll(".card__btn");

for (let i = 0; i < $cardBtn.length; i++) {
  const element = $cardBtn[i];
  element.addEventListener("click", () => {
    $cards[i].classList.toggle("opened");
  });
}

const $liquidsTexts = document.querySelectorAll(".liquids__content__text");

const $liquidsIcons = document.querySelectorAll(
  ".liquids__content__type__icon"
);

for (let i = 0; i < $liquidsIcons.length; i++) {
  const element = $liquidsIcons[i];
  element.addEventListener("click", () => {
    $liquidsTexts.forEach(el => {
      el.classList.remove("visible-block-opacity");
    });
    $liquidsTexts[i].classList.toggle("visible-block-opacity");
  });
}
