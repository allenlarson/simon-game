const buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

let checkAnswer = currentLevel => {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }
};

const startOver = () => {
  let audio = new Audio('./sounds/wrong.mp3');
  $('#level-title').text('Game Over, Press Any Key to Restart');
  $('body').addClass('game-over');
  audio.play();
  setTimeout(function () {
    $('body').removeClass('game-over');
  }, 200);
  level = 0;
  gamePattern = [];
  started = false;
};

$(document).on('keydown', function (e) {
  nextSequence();
  started = true;

  if (!started) {
    $('#level-title').text(`Level ${level}`);
    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);

  level++;
  $('#level-title').text(`Level ${level}`);
}

$('.btn').on('click', function () {
  let userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  $(this).fadeOut(100).fadeIn(100);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  let audio = new Audio(`./sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass('pressed');

  setTimeout(function () {
    $(`#${currentColor}`).removeClass('pressed');
  }, 100);
}
