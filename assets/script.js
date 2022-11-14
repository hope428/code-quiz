var quizContainer = document.querySelector("main");
var startbtn = document.getElementById("start-btn");
var scoreForm = document.getElementById("scoreForm");
var timeLeftEl = document.querySelector("span");
var questionSection = document.createElement("section");
var highScoresContainer = document.getElementById("scores-section");
var highScoresList = document.createElement("ul");

var timer = 60;
var currentQuestion = 0;
var imgSrc =
  "https://archives.bulbagarden.net/media/upload/c/c4/Spr_1g_003.png";

//sets initial high scores array to retreive from localstorage, if nothing is there, set an empty array
var highScores = JSON.parse(localStorage.getItem("allHighScores")) ?? [];
var quiz = [
  {
    question: "What country overall consumes the most coffee in the world?",
    answers: ["United States", "Columbia", "Ethiopia", "France"],
    correctAnswer: "United States",
  },
  {
    question: "What country drinks the most coffee per person in the world?",
    answers: ["Finland", "Germany", "Columbia", "United States"],
    correctAnswer: "Finland",
  },
  {
    question: "What brewing method requires the finest ground coffee?",
    answers: ["French Press", "Turkish", "Pour Over", "Moka Pot"],
    correctAnswer: "Turkish",
  },
  {
    question: "A coffee bean comes from a _______",
    answers: ["Legume", "Nut", "Vegetable", "Fruit"],
    correctAnswer: "Fruit",
  },
  {
    question:
      "What brewing method involves using vapor pressure to force boiling water upwards through coffee grounds?",
    answers: ["Espresso", "Siphon", "Pour Over", "Drip"],
    correctAnswer: "Siphon",
  },
  {
    question: "What is a coffee with a shot of espresso called?",
    answers: ["Red Eye", "Flat white", "Americano", "Doppio"],
    correctAnswer: "Red Eye",
  },
  {
    question: "What country produces the most coffee in the world?",
    answers: ["Vietnam", "Indonesia", "Columbia", "Brazil"],
    correctAnswer: "Brazil"
  },
  {
    question: "What is cascara?",
    answers: ["A type of latte", "Dried coffee cherry", "Coffee from the latin American region", "An edm musician"],
    correctAnswer: "Dried coffee cherry"
  }
];

function timesUp() {
  questionSection.innerHTML = `<h1>Time's up!</h1>
  <button><a href="./index.html">Try again!</a></button>`;
}

//set interval for quiz timer
function setTimer() {
  var countdown = setInterval(function () {
    if (timer > 0 && currentQuestion < quiz.length) {
      timer--;
      timeLeftEl.textContent = timer;
    } else if (currentQuestion >= quiz.length) {
      clearInterval(countdown);
    } else {
      clearInterval(countdown);
      timesUp();
    }
  }, 1000);
}

//creates score form after game is over
function createForm() {
  scoreForm.innerHTML = `
  <h1>Finished!</h1>
<p>Your score is: ${timer}</p>
<label>Enter your initials:</label>
<input id="initials" type="text"></input>
<button id="submit-btn">submit</button>
`;

  var submitBtn = document.getElementById("submit-btn");
  submitBtn.addEventListener("click", storeHighScores);
}

//checks chosen answer
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;

  if (quiz[currentQuestion].correctAnswer === selectedAnswer) {
    currentQuestion++;
  } else {
    timer -= 10;
  }
  renderQuiz();
}

function storeHighScores(event) {
  event.preventDefault();
  //when button is clicked, initials input value is stored and current timer.
  //they are pushed to array as an object
  var playerInfo = {
    initials: document.getElementById("initials").value.toUpperCase(),
    highScore: timer,
  };
  highScores.push(playerInfo);
  //sets highScores array to localStorage JSON item
  localStorage.setItem("allHighScores", JSON.stringify(highScores));
  //redirects to scores.html
  window.location.assign("./scores.html");
}

//creates quiz element and adds it to page in place of previous element
function renderQuiz() {
  if (currentQuestion < quiz.length) {
    questionSection.innerHTML = `<h1>${quiz[currentQuestion].question}</h1>
          <ol class="answer-list">
              <li>${quiz[currentQuestion].answers[0]}</li>
              <li>${quiz[currentQuestion].answers[1]}</li>
              <li>${quiz[currentQuestion].answers[2]}</li>
              <li>${quiz[currentQuestion].answers[3]}</li>
          </ol>
  `;

    quizContainer.appendChild(questionSection);

    var answerElements = document.querySelectorAll("li");
    for (let x = 0; x < answerElements.length; x++) {
      answerElements[x].addEventListener("click", checkAnswer);
    }
  } else {
    //calls to create score form, replaces question with form
    createForm();
    questionSection.innerHTML = "";
  }
  //never display negative values in timer
  //if timer is less than 0 display 0
  timeLeftEl.textContent = timer > 0 ? timer : 0;
}

//clears intro and begins quiz
function startQuiz() {
  document.getElementById("quiz-start-screen").style.display = "none";
  renderQuiz();
  setTimer();
}

function clearScores() {
  //clear localstorage
  localStorage.clear();
  //reset highScores array
  highScores = [];
  renderScores();
}

function renderScores() {
  //clear previous list before rendering new list
  highScoresList.innerText = "";
  for (let i = 0; i < highScores.length; i++) {
    var scoreListItem = document.createElement("li");
    scoreListItem.innerText = `Initials: ${highScores[i].initials} \n Score: ${highScores[i].highScore}`;
    highScoresList.appendChild(scoreListItem);
  }
}

//creates list of scores
//if statement sets that this block of code only runs on the scores page
if (highScoresContainer) {
  //create btn to go back
  var returnBtn = document.createElement("a");
  returnBtn.innerHTML = `<a class="orange-btn" href="./index.html">Go back</a>`;
  //create btn to clear list
  var clearListBtn = document.createElement("button");
  clearListBtn.classList.add("orange-btn");
  clearListBtn.textContent = "Clear Scores";

  //render scores to page
  renderScores();

  //append highScoresList to highScoresContainer
  highScoresContainer.appendChild(highScoresList);
  //append buttons to highScoresContainer
  highScoresContainer.appendChild(returnBtn);
  highScoresContainer.appendChild(clearListBtn);
  //addClickListener to button
  clearListBtn.addEventListener("click", clearScores);
}

startbtn.addEventListener("click", startQuiz);
