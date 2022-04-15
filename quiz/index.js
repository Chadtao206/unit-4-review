// var titleEl = document.createElement("h1");
var spanEl = document.querySelector(".timeLeft");
var quizbodyEl = document.querySelector(".quizbody");
// document.body.style.background = "black";
// titleEl.textContent = "Coding Quiz"
// document.body.append(titleEl);
var timeLeft = 60;
var currentQuestionIndex = 0;
var quizQuestions = [
  {
    question: "What is HTML?",
    answers: [
      "I don't know",
      "How to meet ladies",
      "hypertext markup language",
    ],
    correct: "hypertext markup language",
  },
  {
    question: "Which one of these is a programming language?",
    answers: ["HTML", "Javascript", "Wordpress", "Figma"],
    correct: "Javascript",
  },
];

//create a count function
function count() {
  timeLeft--;
  spanEl.textContent = timeLeft;
  //build additional logic here to handle if time runs out
}

//create the timer function

var timer = setInterval(count, 1000);

//function to put the current question and choices on the page
function showQuestion() {
  quizbodyEl.innerHTML = "";
  var q = quizQuestions[currentQuestionIndex];
  var qTitleEl = document.createElement("h1");
  qTitleEl.textContent = q.question; //q.question
  quizbodyEl.append(qTitleEl);

  //loop through the answers array and put them on the page
  var answers = q.answers;
  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i];
    var button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", function (event) {
      var selectedAnswer = event.target.textContent;
      alert("YOU CLICKED ON  " + selectedAnswer);
      if (selectedAnswer === q.correct) {
        //handle correct logic here
        correct();
      } else {
        //handle incorrect logic here
        incorrect();
      }

      //go to next q here
      currentQuestionIndex++;
      showQuestion();
    });
    quizbodyEl.append(button);
    //after a button is created, add a event listener to it to handle clicking
  }
}

function correct() {
  alert("YOU GOT IT!");
}

function incorrect() {
  alert("WRONG!");
}

showQuestion();
