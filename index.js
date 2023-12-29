var gamePattern = [];
var userClickedPattern = [];

var level=0;
var started = false;


// Listen for keypress event on desktop
$(document).on("keypress", function (event) {
    if (!started) {
        $("#heading").text("Level " + level);
        nextSequence();
        started = true;
        $("p").addClass("hidden");
    }
});

// Listen for tap/click event on mobile
$(document).on("click", function (event) {
    if (!started) {
        $("#heading").text("Level " + level);
        nextSequence();
        started = true;
        $("p").addClass("hidden");
    }
});

$(".btn").on("click",function(){

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playAnimation(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(()=>{nextSequence();}, 1000);
        }
      }
    else{
        playAnimation("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
            $("#heading").text("Game Over,Press Any Key to Restart");
            $("p").removeClass("hidden");
            startOver();
        });
    }
}


function nextSequence() {
    userClickedPattern = [];
    const btnColors = ["green","red","yellow","blue"]

    $("#heading").text("Level "+ ++level);

    let randomNumber = Math.floor(Math.random()*4);
    let randomChosenColour = btnColors[randomNumber];
    gamePattern.push(randomChosenColour);

    playAnimation(randomChosenColour);
}

function playAnimation(name){
    $("#"+name).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(()=>{$("#"+ currentColour).removeClass("pressed");},50);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
  }