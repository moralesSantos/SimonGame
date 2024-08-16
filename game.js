// console.log("Test")
var userClickedPattern = []; 
var buttonColor = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var started = false;
var level = 0;

$(document).on("keyup", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(gamePattern);
    $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
        $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over")
    }, 2000)

    $("#level-title").text("Game Over, Press and Key To Restart");
    startOver(); 

  }
}

function startOver(){
    started = false;
    level = 0;
    gamePattern = []
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
