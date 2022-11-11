var quizContainer = document.querySelector("main");
var startbtn = document.getElementById("start-btn");
var questionSection = document.createElement("section");
var timer = 90;
var scoreForm = document.getElementById("scoreForm");
var currentQuestion = 0;

var quiz = [
  {
    question: "What color is the sun?",
    answers: ["blue", "pink", "purple", "yellow"],
    correctAnswer: "yellow",
  },
  {
    question: "What is my fave food",
    answers: ["Sushi", "Pizza", "Bread", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    question: "What animal is sheldon?",
    answers: ["dog", "cat", "turtle", "hedgehog"],
    correctAnswer: "dog",
  },
];

//creates score form after game is over
function createForm() {
  scoreForm.innerHTML = `
<p>Your score is ${timer}</p>
<label>Enter your initials:</label>
<input type="text"></input>
<button type="submit">submit</button>
`;
}

//checks chosen answer
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;

  if (quiz[currentQuestion].correctAnswer === selectedAnswer) {
    console.log("correct!");
    currentQuestion++;
  } else {
    console.log("incorrect");
    timer -= 15;
    console.log(timer);
  }
  renderQuiz();
}

function storeHighScores(){
  console.log('you submitted the form')
}

//creates quiz element and adds it to page in place of previous element
function renderQuiz() {
  if (currentQuestion < quiz.length) {
    questionSection.innerHTML = `<h1>${quiz[currentQuestion].question}</h1>
          <ul>
              <li>${quiz[currentQuestion].answers[2]}</li>
              <li>${quiz[currentQuestion].answers[0]}</li>
              <li>${quiz[currentQuestion].answers[3]}</li>
              <li>${quiz[currentQuestion].answers[1]}</li>
          </ul>
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

startbtn.addEventListener("click", startQuiz);
