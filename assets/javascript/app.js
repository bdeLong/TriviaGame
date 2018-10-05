$(document).ready(function () {
  // initialize variables and functions for game
  $("#timer-holder").hide();
  $(".question-answer").hide();
  $(".right-wrong").hide();
  var timerID;
  var questionIndex;
  var userGuess;
  var answersRight;
  // an array of objects that hold all of the questions and answers
  var questions = [{
    question: "Who is the regional manager of the Dunder Mifflin Scranton branch?",
    answers: ["Dwight Schrute", "Michael Scott", "Pam Beesly", "Meredith Palmer",],
    correctAnswer: "Michael Scott",
  },
  {
    question: "Who does Michael impersonate that leads to the branch having a Diversity Day?",
    answers: ["Eddie Murphy", "Nicki Minaj", "Robin Williams", "Chris Rock"],
    correctAnswer: "Chris Rock",
  },

  {
    question: "Who's the only character that shares their name with the exact name of the actor?",
    answers: ["Jim Halpert", "Pam Beesly", "Meredith Palmer", "Creed Bratton"],
    correctAnswer: "Creed Bratton",
  },

  {
    question: "What is Roy, from the warehouse,'s last name?",
    answers: ["Anderson", "Phillips", "Grotti", "Martinez"],
    correctAnswer: "Anderson",
  },

  {
    question: "What movie does the office watch on Movie Monday?",
    answers: ["Speed", "Varsity Blues", "The Mask", "A League of Their Own"],
    correctAnswer: "Varsity Blues",
  },

  {
    question: "What is \"Dinkin Flicka\"?",
    answers: ["A game people play in the office when bored", "Dunder Mifflin's biggest client", "A made up \"Black People\" saying Darrell teaches Michael", "A tasty Scranton delicacy"],
    correctAnswer: "A made up \"Black People\" saying Darrell teaches Michael",
  },

  {
    question: "What does Michael try to order at Hooters, much to the waitress' disgust?",
    answers: ["Milk", "A lap dance", "Chicken breast, hold the chicken", "A Big Mac"],
    correctAnswer: "Chicken breast, hold the chicken",
  },

  {
    question: "What is the name of the security guard at the Scranton branch?",
    answers: ["Hank", "Lou", "Chief", "Garth"],
    correctAnswer: "Hank",
  },

  {
    question: "Instead of hiring a stripper, who does Jim hire for Phyllis' bachelorette party?",
    answers: ["Spongebob Squarepants", "Spider-Man", "Benjamin Franklin", "A singing dog"],
    correctAnswer: "Benjamin Franklin",
  },

  {
    question: "What type of property does Dwight own, where he operates a Bed and Breakfast?",
    answers: ["Scranton's tallest building", "A parking lot with a one bedroom shack", "The basement of the office building", "A 16-acre beet farm with farmhouse"],
    correctAnswer: "A 16-acre beet farm with farmhouse",
  }
  ];
  // function that starts the game and hides/shows appropriate elements and sets the question
  function startGame() {
    questionIndex = 0;
    answersRight = 0;
    $("#timer").text(timer)
    $(".question-answer").show();
    $("#timer-holder").show();
    $("#start-button").hide();
    setQuestion();
  };
  // function that starts the timer and activates the time-out lose gif
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
        $("#right-wrong-message").html("TIME'S UP!<br>The Correct Answer is:<br>" + questions[questionIndex].correctAnswer);
        $(".right-wrong").show();
        questionIndex++;
        setTimeout(setQuestion, 7000);
      };
    }, 1000);
  }
  // function that sets up the next question.  Shows/hides appropriate elements.  If last question has been answered, it triggers the results screen and posts a specific gif based on how well the user did.
  function setQuestion() {
    if (questionIndex < questions.length) {
      $(".question-answer").show();
      $("#question").text(questions[questionIndex].question);
      $("#answer1").text(questions[questionIndex].answers[0]);
      $("#answer2").text(questions[questionIndex].answers[1]);
      $("#answer3").text(questions[questionIndex].answers[2]);
      $("#answer4").text(questions[questionIndex].answers[3]);
      startTimer();
      $(".right-wrong").hide();
    }
    else {
      $("#start-button").show();
      $("#right-wrong-message").text("You got " + answersRight + "/" + questions.length + " questions correct!");
      if (answersRight === 0) {
        $("#right-wrong-image").attr("src", "assets/images/I_am_dead.gif");
      }
      else if (answersRight > 0 && answersRight < 3) {
        $("#right-wrong-image").attr("src", "assets/images/stanley_im_done.gif");
      }
      else if (answersRight >= 3 && answersRight < 5) {
        $("#right-wrong-image").attr("src", "assets/images/creed_gif.gif");
      }
      else if (answersRight >= 5 && answersRight < 7) {
        $("#right-wrong-image").attr("src", "assets/images/dwight_clapping.gif");
      }
      else if (answersRight >= 7 && answersRight < 10) {
        $("#right-wrong-image").attr("src", "assets/images/yes_yes_yesyes.gif");
      }
      else if (answersRight === 10) {
        $("#right-wrong-image").attr("src", "assets/images/andy_nailed_it.gif");
      }
      $("#timer-holder").hide();
    }
  };
  // function that checks if user guess matches the correct answer of the question. Displays either a right answer gif or a wrong answer gif.
  function checkAnswer() {
    if (userGuess === questions[questionIndex].correctAnswer) {
      $("#right-wrong-image").attr("src", "assets/images/Win_Gif.gif");
      $("#right-wrong-message").text("Raise the roof for that right answer!");
      $(".question-answer").hide();
      $("#timer-holder").hide();
      $(".right-wrong").show();
      answersRight++;
      questionIndex++;
      setTimeout(setQuestion, 5000);
    }
    else {
      $("#right-wrong-image").attr("src", "assets/images/Loss_Gif.gif");
      $("#right-wrong-message").html("Well you really biffed it on that one...<br>The correct answer is:<br>" + questions[questionIndex].correctAnswer);
      $(".question-answer").hide();
      $("#timer-holder").hide();
      $(".right-wrong").show();
      questionIndex++;
      setTimeout(setQuestion, 6500);
    }
  }
  // function that starts game upon clicking start game button
  $("#start-button").on("click", function () {
    startGame();
  });
  // function that logs user guess upon clicking an answer button.  Runs check answer function.
  $(".answer-button").on("click", function () {
    clearInterval(timerID);
    userGuess = $(this).text();
    checkAnswer();
  });

});







