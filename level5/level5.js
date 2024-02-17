let tries = document.querySelector(".game-container .tries span");
let blockscontainer = document.querySelector(".game-container .game");
let blocks = Array.from(blockscontainer.children);
let nextbutton = document.querySelector(".game-container .next");
let orderRange = Array.from(Array(blocks.length).keys());
let counter = 0;
let num = 5;
let minn = 2;
let secc = 0;
let timerInterval;

tries.innerHTML = num;
countDown(minn, secc);

function countDown(min, sec) {
  timerInterval = setInterval(() => {
    if (sec === 0) {
      if (min === 0) {
        clearInterval(timerInterval);
        alert("Time's up!");
        window.location.reload();
      } else {
        min--;
        sec = 59;
      }
    } else {
      sec--;
    }
    secc = sec; // Update global seconds
    minn = min; // Update global minutes
    updateTimerDisplay(min, sec); // Update timer display
  }, 1000);
}

function updateTimerDisplay(min, sec) {
  let second = sec < 10 ? "0" + sec : sec;
  let minute = min < 10 ? "0" + min : min;
  document.querySelector(
    ".game-container .timer p span:first-of-type"
  ).textContent = minute;
  document.querySelector(
    ".game-container .timer p span:nth-child(2)"
  ).textContent = second;
}

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
  let allFlipped = blocks.filter((flip) =>
    flip.classList.contains("is-flipped")
  );
  if (allFlipped.length === 2) {
    blockscontainer.classList.add("no-clicking");
    setTimeout(() => {
      blockscontainer.classList.remove("no-clicking");
    }, 1000);
    if (allFlipped[0].dataset.technology === allFlipped[1].dataset.technology) {
      allFlipped[0].classList.remove("is-flipped");
      allFlipped[1].classList.remove("is-flipped");
      allFlipped[0].classList.add("has-match");
      allFlipped[1].classList.add("has-match");
      counter++;
      clearInterval(timerInterval); // Clear previous interval
      secc += 5; // Increase seconds on match
      countDown(Math.floor(secc / 60), secc % 60); // Start countdown from updated time
    } else {
      num--;
      if (num >= 0) {
        tries.innerHTML = num;
      } else {
        alert("Game Over");
        window.location.reload();
      }
      setTimeout(() => {
        allFlipped[0].classList.remove("is-flipped");
        allFlipped[1].classList.remove("is-flipped");
      }, 1000);
    }
  }
  if (counter === blocks.length / 2) {
    clearInterval(timerInterval); // Clear previous interval
    nextbutton.style.visibility = "visible";
    nextbutton.addEventListener("click", function () {
      window.location.replace("../level6/level6.html");
    });
  }
}

function shuffle(array) {
  let current = array.length;
  let temp;
  let random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}
