var quizContainer = document.querySelector("main");
var startbtn = document.getElementById("start-btn");
var i = 0;
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

function checkAnswer() {
  console.log("correct!");
  i++
  nextQuestion();
}

function renderQuiz() {
  var questionSection = document.createElement("section");
  questionSection.innerHTML = `<h1>${quiz[i].question}</h1>
          <ul>
              <li>${quiz[i].answers[0]}</li>
              <li>${quiz[i].answers[1]}</li>
              <li>${quiz[i].answers[2]}</li>
              <li>${quiz[i].answers[3]}</li>
          </ul>
  `;

  quizContainer.appendChild(questionSection);

  var answerElements = document.querySelectorAll("li");
  for (let x = 0; x < answerElements.length; x++) {
    answerElements[x].addEventListener("click", checkAnswer);
  }
}

function startQuiz() {
  document.getElementById("quiz-start-screen").style.display = "none";
  renderQuiz();
}

function nextQuestion() {
    renderQuiz()
}

startbtn.addEventListener("click", startQuiz);
