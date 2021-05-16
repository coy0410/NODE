/* Design by Flávia Mayer - https://dribbble.com/shots/15239982-Video-know-how-for-amateurs-and-pros */

const scene = document.querySelectorAll(".q");
const sc = document.querySelector(".scene");
const box = document.querySelector(".unit");
const light = document.querySelector(".front-block-two");
const c = document.querySelectorAll(".c");

function lightsOn() {
  light.classList.toggle("lights-on");
  c.forEach(shape => {
    if (shape.classList.contains("shape-tri")) {
        shape.classList.toggle("b");
    } else {
     shape.classList.toggle("d");
    }
  });
}

// scene.forEach(s => s.addEventListener("click", lightsOn));
sc.addEventListener("click", lightsOn);