const playground = document.querySelector(".playground");
const startBtn = document.querySelector(".btn-start");
const model = document.querySelector(".model");
const welcomeBox = document.querySelector(".start-game");
const gameOverBox = document.querySelector(".game-over");
const restartBtn = document.querySelector(".model .btn-restart");
const highScore = document.querySelector("#high-score");
const score = document.querySelector("#score");
const time = document.querySelector("#time");

const blockHeight = 30;
const blockWidth = 30;

let highScoreValue = 0;
let scoreValue = 0;
let timeValue = `00:00`;

// Playground ki width/height se kitni rows aur columns aa sakte hai wo nikal rahe hai
const cols = Math.floor(playground.clientWidth / blockWidth);
const rows = Math.floor(playground.clientHeight / blockHeight);

let IntervalId = null;
let timeIntervalId = null;
let snakeSpeed = 400;

// Food object
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};

// Snake initial positions
// Snake ek array hai jisme har element ek block ka coordinate hota hai.
let snake = [
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 1, y: 4 },
];

let direction = "right";

// Create blocks
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    const block = document.createElement("div");
    block.classList.add("block");
    playground.appendChild(block);
  }
}

// Clear all blocks before rendering
function clearBlocks() {
  playground
    .querySelectorAll(".fill")
    .forEach((b) => b.classList.remove("fill"));
  playground
    .querySelectorAll(".food")
    .forEach((b) => b.classList.remove("food"));
}

function render() {
  clearBlocks();

  // Render food
  const foodIndex = food.x * cols + food.y;
  playground.children[foodIndex].classList.add("food");

  // Render snake
  // Har segment ke liye uske corresponding block ko fill karna
  snake.forEach((seg) => {
    const index = seg.x * cols + seg.y;
    playground.children[index].classList.add("fill");
  });
}

function moveSnake() {
  let head = { ...snake[0] }; // Current head position
  // Update head position based on direction

  //Direction ke hisab se head ki position update karna
  if (direction === "left") head.y--;
  if (direction === "right") head.y++;
  if (direction === "up") head.x--;
  if (direction === "down") head.x++;

  // Collision check
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    clearInterval(IntervalId);
    model.style.display = "flex";
    welcomeBox.style.display = "none";
    gameOverBox.style.display = "flex";
    return;
  }

  snake.unshift(head); // New head add karna

  // Food eaten?
  if (head.x === food.x && head.y === food.y) {
    // SCORE INCREASE ONLY WHEN FOOD IS EATEN
    scoreValue++;
    score.textContent = scoreValue;

    // SPEED INCREASE
    snakeSpeed = Math.max(80, snakeSpeed - 20);
    restartMovement();

    // update high score
    if (scoreValue > highScoreValue) {
      highScoreValue = scoreValue;
      highScore.textContent = highScoreValue;
    }

    // Generate new food position
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    // Self collision check
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        clearInterval(IntervalId);
        model.style.display = "flex";
        welcomeBox.style.display = "none";
        gameOverBox.style.display = "flex";
        return;
      }
    }
  } else {
    snake.pop(); // normal movement
  }

  render();
}

// restartMovement()
// Ye function snake ki movement ko restart karta hai naye speed ke saath
function restartMovement() {
    clearInterval(IntervalId);
    IntervalId = setInterval(moveSnake, snakeSpeed);
}

//  startGame()
//  Ye function game start karta hai
//  Important: Purana interval hamesha clear karta hai.
function startGame() {
  clearInterval(IntervalId);
  IntervalId = setInterval(moveSnake, 400);
}

//  restartGame()
//  Game ko completely new state me reset karta hai.
function restartGame() {
  model.style.display = "none";

  // reset score
  scoreValue = 0;
  score.textContent = 0;
  timeValue = `00:00`;
  time.textContent = timeValue;

  // reset snake and food position
  snake = [
    { x: 1, y: 2 },
    { x: 1, y: 3 },
    { x: 1, y: 4 },
  ];

  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };

  direction = "right";

  startTimer();

  startGame();
}

startBtn.addEventListener("click", () => {
  welcomeBox.style.display = "none"; // Hide welcome
  gameOverBox.style.display = "none"; // Hide game over
  model.style.display = "none"; // Hide overlay
  startGame();

  timeIntervalId = setInterval(() => {
    let currentSeconds = parseInt(timeValue.split(":")[1]);
    let currentMinutes = parseInt(timeValue.split(":")[0]);
    currentSeconds++;
    if (currentSeconds === 60) {
      currentMinutes++;
      currentSeconds = 0;
    }
    let formattedSeconds =
      currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    let formattedMinutes =
      currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    timeValue = `${formattedMinutes}:${formattedSeconds}`;
    time.textContent = timeValue;
  }, 1000);
});

restartBtn.addEventListener("click", restartGame);

// Controls
addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
});
