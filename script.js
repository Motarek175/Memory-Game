let blockscontainer = document.querySelector(".game-container .game");
let blocks = Array.from(blockscontainer.children);
let nextbutton = document.querySelector(".game-container .next");
let orderRange = Array.from(Array(blocks.length).keys());
let counter = 0;

shuffle(orderRange);
nextbutton.style.visibility = "hidden";
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flip(block);
  });
});

function flip(selectedblock) {
  selectedblock.classList.add("is-flipped");
  let allFliped = blocks.filter((flip) =>
    flip.classList.contains("is-flipped")
  );
  if (allFliped.length === 2) {
    // stop clicking
    blockscontainer.classList.add("no-clicking");
    setTimeout(() => {
      blockscontainer.classList.remove("no-clicking");
    }, 1000);
    // checkMatching
    if (allFliped[0].dataset.technology === allFliped[1].dataset.technology) {
      allFliped[0].classList.remove("is-flipped");
      allFliped[1].classList.remove("is-flipped");
      allFliped[0].classList.add("has-match");
      allFliped[1].classList.add("has-match");
      counter++;
    } else {
      setTimeout(() => {
        allFliped[0].classList.remove("is-flipped");
        allFliped[1].classList.remove("is-flipped");
      }, 1000);
    }
  }
  if (counter === blocks.length / 2) {
    nextbutton.style.cssText = "visibility: visible";
    nextbutton.addEventListener("click", function () {
      window.location.replace("level2/level2.html");
    });
  }
}

// shuffle
function shuffle(array) {
  var current = array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
