const $sizCircles = document.querySelectorAll(".size__circle");
const $colCircles = document.querySelectorAll(".color__circle");

for (let i = 0; i < $sizCircles.length; i++) {
  let $circle = $sizCircles[i];
  $circle.addEventListener("click", () => {
    $sizCircles.forEach(element => {
      element.classList.remove("active");
    });
    $circle.classList.toggle("active");
  });
}

for (let i = 0; i < $colCircles.length; i++) {
  let $circle = $colCircles[i];
  $circle.addEventListener("click", () => {
    $colCircles.forEach(element => {
      element.classList.remove("active");
    });
    $circle.classList.toggle("active");
  });
}
