
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0

$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id") ;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

    console.log("Succsess");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function () {
        nextSequence();
      },1000);
    }

  }else {
    console.log("Wrong");
    playSound("wrong");
    $(document.body).addClass("game-over")
    setTimeout(function () {
      $(document.body).removeClass("game-over")
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
     startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
    },100);

}

function nextSequence() {

  userClickedPattern = [];
  level++;

  $("#level-title").text("level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function playSound(name) {
  var audio = new Audio("sounds/"+ name + ".mp3");
  audio.play();
}
