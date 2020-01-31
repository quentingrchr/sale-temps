const $cards = document.querySelectorAll(".card");
const $cardBtn = document.querySelectorAll(".card__btn");

for (let i = 0; i < $cardBtn.length; i++) {
  const element = $cardBtn[i];
  element.addEventListener("click", () => {
    $cards[i].classList.toggle("opened");
  });
}
