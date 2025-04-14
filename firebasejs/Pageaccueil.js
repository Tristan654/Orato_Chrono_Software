const arrow_right = document.querySelector(".arrow_next"),
  arrow_left = document.querySelector(".arrow_prev"),
  img = document.querySelector("#main_container img"),
  container_img_middle = document.querySelector("#container_img_middle");

let tab_img = [];
let taille_tableau = 7;

for (let i = 1; i <= taille_tableau; i++) {
  tab_img.push(`<img src="assets/Photo_IngénieurENSEA${i}.jpg" />`);
}

let arrow_value = 1;
arrow_right.addEventListener("click", () => {
  if (arrow_value != taille_tableau) {
    arrow_value++;
  } else {
    arrow_value = 1;
  }
  img.remove();
  container_img_middle.innerHTML = tab_img[arrow_value - 1];
  console.log(arrow_value);
  console.log(container_img_middle);
});

arrow_left.addEventListener("click", () => {
  if (arrow_value != 0) {
    arrow_value--;
  } else {
    arrow_value = taille_tableau;
  }
  img.remove();
  container_img_middle.innerHTML = tab_img[arrow_value - 1];
  console.log(arrow_value);
  console.log(container_img_middle);
});
