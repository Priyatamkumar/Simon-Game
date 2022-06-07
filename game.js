//variable;
var gamePattern=[];
var  buttonColours =["red","blue","green","yellow"];
var userClickedPattern=[];
var level=0;
var started=false;

//  starting of game

$(document).on("keypress",function(event)
{
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

})

//playing sound 
function playSound(name)
{
    var audio = new Audio(name);
    audio.play();
}

//call next sequence

function nextSequence()
{
    userClickedPattern=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    level++;
    $("#level-title").text("level  "+level);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound("sounds/"+randomChosenColor+".mp3");

}

// chossen ans by player

$(".btn").on("click",function(event)
{
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound("sounds/"+userChosenColour+".mp3");
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

// button animtiom

function animatePress(ChosenColour)
{
    var activeButtonNow= $("#"+ ChosenColour);
    activeButtonNow.addClass("pressed");
    setTimeout(function(){
        activeButtonNow.removeClass("pressed");
    },100);
}

//check pattern

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function () {
                nextSequence();
                },1000);
        }
    }
    else
    {
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").html("<strong>your score is "+level*(level-1)/2 +"<br><br> Game Over, Press Any Key to Restart");
        startover();
    }
}

function startover()
{
    level=0;
    started=false;
    gamePattern=[];
}
