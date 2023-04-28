const textSizes = {
  MEDIUM: 32,
  LARGE: 64,
}
const MAX_WRONG_GUESSES = 6;
let gameState = {
  guessedLetters: [],
  wrongGuesses: [],
  gameOver: false,
  word: "",
  wordState: []
};

let words = [];
let currentWord = null;

function preload() {
  words = loadJSONC("words.jsonc", function (data) {
    words = data;
    const currentWordIndex = floor(random(words.length));
    currentWord = words[currentWordIndex];
    console.log(`WORD IS "${currentWord}"`);
    initializeGameState();
  });
}

function setup() {
  createCanvas(600, 600);
}

let ellipses = "...";

function draw() {
  if (words.length > 0) {
    push();
    background(220);
    drawGallows();
    drawHangman();
    drawWordState();
    drawGuessedLetters();
    drawGameOver();
    pop();
  } else {
    push();
    background(220);
    textAlign(CENTER);
    textSize(textSizes.MEDIUM);
    text("Loading" + ellipses, width / 2, height / 2);
    pop();

    if (frameCount % 30 === 0) { // change ellipses every 30 frames
      ellipses = (ellipses === "...") ? ".." : (ellipses === "..") ? "." : "...";
    }
  }
}

function drawGallows() {
  push();
  stroke(0);
  strokeWeight(8);
  line(125, 100, 125, height - 50);
  line(125, 100, 300, 100);
  line(300, 100, 300, 150);
  line(50, height - 50, 300, height - 50); // add a horizontal line
  pop();
}

function drawHangman() {
  push();
  stroke(0);
  strokeWeight(4);
  const numWrongGuesses = gameState.wrongGuesses.length

  if (numWrongGuesses >= 1) {
    // Head
    ellipse(300, 200, 80, 80);
  }
  if (numWrongGuesses >= 2) {
    // Body
    line(300, 240, 300, 400);
  }
  if (numWrongGuesses >= 3) {
    // Left arm
    line(300, 280, 240, 350);
  }
  if (numWrongGuesses >= 4) {
    // Right arm
    line(300, 280, 360, 350);
  }
  if (numWrongGuesses >= 5) {
    // Left leg
    line(300, 400, 240, 480);
  }
  if (numWrongGuesses >= 6) {
    // Right leg
    line(300, 400, 360, 480);
  }
  pop();
}

function drawWordState() {
  push();
  textSize(48);
  textAlign(RIGHT, BOTTOM);
  fill(0);
  const wordStateString = gameState.wordState.join(" ");
  text(wordStateString, width - 20, height - 20);
  pop();
}

function drawGuessedLetters() {
  let x = 25;
  let y = 50;
  let letter;
  for (let i = 0; i < gameState.guessedLetters.length; i++) {
    letter = gameState.guessedLetters[i];
    if (gameState.word.includes(letter)) {
      fill(0);
    } else {
      stroke(150);
      fill(255);
    }
    textSize(textSizes.MEDIUM);
    text(letter, x, y);
    x += 40;
  }
}

function keyPressed() {
  if (gameState.gameOver || keyIsPressed && (keyIsPressed.CONTROL || keyIsPressed.ALT || keyIsPressed.SHIFT)) {
    return;
  }
  
  if (keyCode >= 65 && keyCode <= 90) { // A-Z
    const pressedLetter = String.fromCharCode(keyCode);
    const alreadyGuessed = gameState.guessedLetters.includes(pressedLetter);
    if (alreadyGuessed) {
      // // TODO: Glow the letter
      // const alreadyGuessedLetter = select(`.${pressedLetter}`);
      // alreadyGuessedLetter.class("glow");
      // return false;
    } else {
      updateGuessedLetter(pressedLetter)
      updateWordState(pressedLetter);
    }
  }
}

function updateGuessedLetter(letter) {
  gameState.guessedLetters.push(letter);
}

function updateWordState(letter) {
  let isLetterFound = false;
  for (let i = 0; i < gameState.word.length; i++) {
    if (gameState.word[i] === letter) {
      gameState.wordState[i] = letter;
      isLetterFound = true;
    }
  }
  if (!isLetterFound) {
    gameState.wrongGuesses.push(letter);
  }
}

function drawGameOver() {
  const isLose = gameState.wrongGuesses.length >= MAX_WRONG_GUESSES;
  const isWin = !gameState.wordState.includes("_");
  const isEndState = isLose || isWin;

  if (isEndState) {
    gameState.gameOver = true;
    const gameOverText =
      isWin ? 'You Win!' :
      isLose ? 'Game Over' :
      'Something Went Wrong';

    push();
    textAlign(CENTER);
    textSize(textSizes.LARGE);
    fill(isLose ? 255 : 0, isWin ? 167 : 0, 0);
    text(
      gameOverText,
      width / 2,
      height / 2
    );
    pop();
  }
}

function initializeGameState() {
  gameState.word = currentWord.toUpperCase();
  gameState.wordState = Array(gameState.word.length).fill("_");
}

function resetGameState() {

  initializeGameState();
}

function _setRandomWord() {
  const currentWordIndex = floor(random(words.length));
  currentWord = words[currentWordIndex];
}