let blockscontainer = document.querySelector(".game-container");
let blocks = Array.from(blockscontainer.children);
let orderRange = Array.from(Array(blocks.length).keys());

shuffle(orderRange);

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
    } else {
      setTimeout(() => {
        allFliped[0].classList.remove("is-flipped");
        allFliped[1].classList.remove("is-flipped");
      }, 1000);
    }
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
