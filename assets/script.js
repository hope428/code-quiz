var quizContainer = document.querySelector("main");
var startbtn = document.getElementById("start-btn");
var questionSection = document.createElement("section");
var highScoresContainer = document.getElementById("scores-section");
var highScoresList = document.createElement("ul");
var timer = 90;
var scoreForm = document.getElementById("scoreForm");
var currentQuestion = 0;
var imgSrc = 'https://archives.bulbagarden.net/media/upload/c/c4/Spr_1g_003.png'

var highScores = JSON.parse(localStorage.getItem('allHighScores')) ?? []
var quiz = [
  {
    question: "How many original (gen 1) pokemon were there?",
    answers: ["250", "89", "151", "150"],
    correctAnswer: "151",
  },
  {
    question: "What type is bulbasaur",
    answers: ["Grass", "Bug", "Grass/Bug", "Grass/Poison"],
    correctAnswer: "Grass/Poison",
  },
  {
    question: "What is the evolve form of Doduo",
    answers: ["Dodrio", "Dotrio", "Farfetch'd", "Fearow"],
    correctAnswer: "Dodrio",
  },
  {
    question: `What pokemon is this <img src=${imgSrc}>`,
    answers:["Bulbasaur", "Torterra", "Venusaur", "Blastoise"],
    correctAnswer: "Venusaur"
  },
  {
    question: "What ball is the most effective?",
    answers:["Great ball", "Ultra ball", "Premier ball", "Master ball"],
    correctAnswer: "Master ball"
  }
];

//creates score form after game is over
function createForm() {
  scoreForm.innerHTML = `
<p>Your score is ${timer}</p>
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
  var playerInfo ={ 
    initials: document.getElementById("initials").value,
    highScore: timer
  }
  highScores.push(playerInfo)
  localStorage.setItem('allHighScores', JSON.stringify(highScores))
  window.location.assign("./scores.html")
}

//creates quiz element and adds it to page in place of previous element
function renderQuiz() {
  if (currentQuestion < quiz.length) {
    questionSection.innerHTML = `<h1>${quiz[currentQuestion].question}</h1>
          <ol class="answer-list">
              <li>${quiz[currentQuestion].answers[2]}</li>
              <li>${quiz[currentQuestion].answers[0]}</li>
              <li>${quiz[currentQuestion].answers[3]}</li>
              <li>${quiz[currentQuestion].answers[1]}</li>
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
}

//clears intro and begins quiz
function startQuiz() {
  document.getElementById("quiz-start-screen").style.display = "none";
  renderQuiz();
}

//creates list of scores
if (highScoresContainer) {
  for (let i = 0; i < highScores.length; i++) {
    var scoreListItem = document.createElement("li");
    scoreListItem.innerText = `Initials: ${highScores[i].initials} \n Score: ${highScores[i].highScore}`;
    highScoresList.appendChild(scoreListItem);
  }
  highScoresContainer.appendChild(highScoresList);
}

startbtn.addEventListener("click", startQuiz);
