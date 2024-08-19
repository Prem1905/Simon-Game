// Array of button colors
const buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store the game pattern and user clicked pattern
let gamePattern = [];
let userClickedPattern = [];

// Game state variables
let started = false;
let level = 0;

// Start the game when a key is pressed
$(document).keypress(() => {
  if (!started) {
    startGame();
  }
});

// Handle button click events
$(".btn").click(function() {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  handleUserChoice(userChosenColour);
});

// Function to handle user's choice
function handleUserChoice(colour) {
  playSound(colour);
  animatePress(colour);

  const currentLevel = userClickedPattern.length - 1;
  checkAnswer(currentLevel);
}

// Check if the user's answer is correct
function checkAnswer(currentLevel) {
  if (isCorrectChoice(currentLevel)) {
    if (isSequenceComplete()) {
      // Move to the next sequence after a short delay
      setTimeout(nextSequence, 1000);
    }
  } else {
    // Handle game over scenario
    handleGameOver();
  }
}

// Check if the user's choice matches the game pattern
function isCorrectChoice(currentLevel) {
  return gamePattern[currentLevel] === userClickedPattern[currentLevel];
}

// Check if the user has completed the current sequence
function isSequenceComplete() {
  return userClickedPattern.length === gamePattern.length;
}

// Handle the game over state
function handleGameOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(() => $("body").removeClass("game-over"), 200);
  startOver();
}

// Generate the next sequence in the game
function nextSequence() {
  resetUserPattern();
  incrementLevel();
  
  const randomChosenColour = getRandomColour();
  gamePattern.push(randomChosenColour);

  animateSequence(randomChosenColour);
  playSound(randomChosenColour);
}

// Generate a random color from the buttonColours array
function getRandomColour() {
  const randomIndex = Math.floor(Math.random() * buttonColours.length);
  return buttonColours[randomIndex];
}

// Animate the chosen color in the sequence
function animateSequence(colour) {
  $("#" + colour).fadeIn(100).fadeOut(100).fadeIn(100);
}

// Animate the button press by the user
function animatePress(colour) {
  $("#" + colour).addClass("pressed");
  setTimeout(() => $("#" + colour).removeClass("pressed"), 100);
}

// Play the sound corresponding to the given color
function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Start the game by initializing variables and starting the first sequence
function startGame() {
  level = 0;
  gamePattern = [];
  started = true;
  nextSequence();
}

// Reset the user clicked pattern for the next sequence
function resetUserPattern() {
  userClickedPattern = [];
}

// Increment the level and update the level title
function incrementLevel() {
  level++;
  $("#level-title").text("Level " + level);
}

// Reset the game variables to allow restarting
function startOver() {
  started = false;
  gamePattern = [];
  level = 0;
  $("#level-title").text("Press A Key to Start");
}
