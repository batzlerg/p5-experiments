const MAX_WRONG_GUESSES = 6;

let gameState = {};
let words = [];

let randomIndex = 0;
let randomWord = null;

function preload() {
  words = loadJSONC("words.jsonc", function(data) {
    words = data;
    randomIndex = floor(random(words.length));
    randomWord = words[randomIndex];
    initializeGameState(gameState);
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
    drawHangman(gameState.wrongGuesses);
    drawWordState(gameState.wordState);
    drawGuessedLetters(gameState);
    checkGameOver(gameState);
    pop();
  } else {
    push();
    background(220);
    textAlign(CENTER);
    textSize(32);
    text("Loading" + ellipses, width/2, height/2);
    pop();
    
    if (frameCount % 30 === 0) { // change ellipses every 30 frames
      if (ellipses === "...") {
        ellipses = "..";
      } else if (ellipses === "..") {
        ellipses = ".";
      } else {
        ellipses = "...";
      }
    }
  }
}

function drawGallows() {
  push();
  stroke(0);
  strokeWeight(8);
  line(100, 100, 100, height - 50);
  line(100, 100, 300, 100);
  line(300, 100, 300, 150);
  pop();
}

function drawHangman(wrongGuesses) {
  push();
  stroke(0);
  strokeWeight(4);
  // Head
  if (wrongGuesses >= 1) ellipse(300, 200, 80, 80);
  // Body
  if (wrongGuesses >= 2) line(300, 240, 300, 400);
  // Left arm
  if (wrongGuesses >= 3) line(300, 280, 240, 350);
  // Right arm
  if (wrongGuesses >= 4) line(300, 280, 360, 350);
  // Left leg
  if (wrongGuesses >= 5) line(300, 400, 240, 480);
  // Right leg
  if (wrongGuesses >= 6) line(300, 400, 360, 480);
  pop();
}

function drawWordState(wordState){
  push();
  textSize(48);
  textAlign(RIGHT, BOTTOM);
  fill(0);
  const wordStateString = wordState.join(" ");
  text(wordStateString, width - 20, height - 20);
  pop();
}

function drawGuessedLetters(){
  push();
  textSize(24);
  textAlign(LEFT, TOP);
  fill(0);
  text("Guessed letters:", 20, 20);
  const guessedLettersString = gameState.guessedLetters.join(" ");
  text(guessedLettersString, 20, 50);
  pop();
}

function checkGameOver(){
  push();
  if (gameState.wordState === gameState.word) {
    gameState.isGameOver = true;
    fill(0);
    textSize(48);
    textAlign(CENTER, CENTER);
    const message = "You win!";
    const w = textWidth(message) + 20;
    const h = 80;
    rectMode(CENTER);
    fill(255);
    rect(width / 2, height / 2 - 40, w, h);
    fill(0);
    text(message, width / 2, height / 2 - 40);
    textSize(24);
    text("Click to play again", width / 2, height / 2 + 20);
  } else if (gameState.wrongGuesses >= MAX_WRONG_GUESSES) {
    gameState.isGameOver = true;
    fill(0);
    textSize(48);
    textAlign(CENTER, CENTER);
    const message = "Game over";
    const w = textWidth(message) + 20;
    const h = 120;
    rectMode(CENTER);
    fill(255);
    rect(width / 2, height / 2 - 40, w, h);
    fill(0);
    text(message, width / 2, height / 2 - 60);
    textSize(24);
    text(`The word was "${gameState.word}". Click to play again`, width / 2, height / 2 + 20);
  }
  pop();
}

function mouseClicked() {
  if (gameState.isGameOver) {
    initializeGameState(gameState);
  }
}

function initializeGameState(){
  gameState.word = getRandomWord();
  gameState.wordState = gameState.word.split("").map(() => "_");
  gameState.wrongGuesses = 0;
  gameState.guessedLetters = [];
  gameState.isGameOver = false;
}

function keyPressed() {
  const letter = key.toUpperCase();
  if (!gameState.isGameOver && isValidGuess(letter)) {
    if (gameState.word.includes(letter)) {
      updateWordState(gameState, letter);
    } else {
      gameState.wrongGuesses++;
    }
    gameState.guessedLetters.push(letter);
  }
}

function updateWordState(state, letter) {
  for (let i = 0; i < gameState.word.length; i++) {
    if (gameState.word[i] === letter) {
      gameState.wordState[i] = letter;
    }
  }
}

function isValidGuess(letter) {
  const validLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return (
    validLetters.includes(letter) &&
    !gameState.guessedLetters.includes(letter)
  );
}

function getRandomWord() {
  const randomIndex = Math.floor(random(0, words.length + 1));
  return words[randomIndex];
}