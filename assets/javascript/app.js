// initialize variables and functions for game

$("#timer-holder").hide();
$(".question-answer").hide();
$("#right-wrong").hide();
var timerID;
var questionIndex;
var userGuess;
var answersRight = 0;
var questions = [{
  question: "Test question 1",
  answers: ["testq1 1", "testq1 2", "testq1 3", "testq1 4"],
  correctAnswer: "testq1 2",
},
{
  question: "Test question 2",
  answers: ["testq2 1", "testq2 2", "testq2 3", "testq2 4"],
  correctAnswer: "testq2 4",

}
];

function startGame() {
  questionIndex = 0;
  $("#timer").text(timer)
  $(".question-answer").show();
  $("#timer-holder").show();
  $("#start-button").hide();
  setQuestion();
};

function startTimer() {
  $("#timer-holder").show();
  var timer = 15;
  $("#timer").text(timer);
  timerID = setInterval(function () {
    timer--;
    $("#timer").text(timer);
    if (timer === 0) {
      clearInterval(timerID);
      $(".question-answer").hide();
      $("#right-wrong-image").attr("src", "assets/images/Time_Out_Gif.gif");
      $("#right-wrong-message").html("TIME'S UP!<br>The Correct Answer is: " + questions[questionIndex].correctAnswer);
      $("#right-wrong").show();
      questionIndex++;
      setTimeout(setQuestion, 7000);
    };
  }, 1000);
}

function setQuestion() {
  if (questionIndex < 2) {
    $(".question-answer").show();
    $("#question").text(questions[questionIndex].question);
    $("#answer1").text(questions[questionIndex].answers[0]);
    $("#answer2").text(questions[questionIndex].answers[1]);
    $("#answer3").text(questions[questionIndex].answers[2]);
    $("#answer4").text(questions[questionIndex].answers[3]);
    startTimer();
    $("#right-wrong").hide();
  }
  else {
    $("#start-button").show();
    $("#right-wrong-message").text("You got " + answersRight + "/" + questions.length + " questions correct!");
    if (answersRight < 2) {
      $("#right-wrong-image").attr("src", "assets/images/Loss_Gif.gif");
    }
    else {
      $("#right-wrong-image").attr("src", "assets/images/Win_Gif.gif");
    }
    $("#timer-holder").hide();
  }
};

$("#start-button").on("click", function () {
  startGame();
});

$(".answer-button").on("click", function () {
  clearInterval(timerID);
  userGuess = $(this).text();
  checkAnswer();
});

function checkAnswer() {
  if (userGuess === questions[questionIndex].correctAnswer) {
    $("#right-wrong-image").attr("src", "assets/images/Win_Gif.gif");
    $("#right-wrong-message").text("CORRECT!");
    $(".question-answer").hide();
    $("#timer-holder").hide();
    $("#right-wrong").show();
    answersRight++;
    questionIndex++;
    setTimeout(setQuestion, 7000);
  }
  else {
    $("#right-wrong-image").attr("src", "assets/images/Loss_Gif.gif");
    $("#right-wrong-message").html("WRONG!<br>The Correct Answer is: " + questions[questionIndex].correctAnswer);
    $(".question-answer").hide();
    $("#timer-holder").hide();
    $("#right-wrong").show();
    questionIndex++;
    setTimeout(setQuestion, 7000);
  }
}






