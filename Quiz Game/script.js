// DOM Elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [{
        question: "what is the capital of Iran",
        answers: [
            { text: "Hanoi", Correct: false },
            { text: "Jakarta", Correct: false },
            { text: "Tehran", Correct: true },
            { text: "Riyadh", Correct: false },
        ],
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Mars", Correct: true },
            { text: "Venus", Correct: false },
            { text: "sun", Correct: false },
            { text: "Jupiter", Correct: false },
        ],
    },
    {
        question: "What gets wetter the more it dries?",
        answers: [
            { text: "A cloud", Correct: false },
            { text: "Water", Correct: false },
            { text: "A sponge", Correct: false },
            { text: "A towel", Correct: true },
        ],
    },
    {
        question: "If you have a plate with six apples and you take away four, how many do you have?",
        answers: [
            { text: "two", Correct: false },
            { text: "four", Correct: true },
            { text: "six", Correct: false },
            { text: "none", Correct: false },
        ],
    },
    {
        question: "How many months have 28 days?",
        answers: [
            { text: "Two (February in leap years)", Correct: false },
            { text: "One (February)", Correct: false },
            { text: "All 12 months", Correct: true },
            { text: "none", Correct: false },
        ],
    }
];


// QUIZ STATE VARS

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
    //reset vars
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = score;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion()
}

function showQuestion() {
    // reset state
    answersDisabled = false

    const currentQuestion = quizQuestions[currentQuestionIndex]


    currentQuestion.textContent = currentQuestionIndex + 1

    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100
    progressBar.style.width = progressPercent + "%";


    questionText.textContent = currentQuestion.question

    // todo : explain this in sec
    answersContainer.innerHTML = "";
    currentQuestionSpan.textContent = currentQuestionIndex + 1

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.textContent = answers.text;
        button.classList.add("answer-btn");;

        // what is dataset? it's a property of the button element that allows you to store custom data
        button.dataset.Correct = answers.Correct;

        button.addEventListener("click", selectAnswer);

        answersContainer.appendChild(button);

    });
}

function selectAnswer(event) {
    //optimization check
    if (answersDisabled) return

    answersDisabled = true

    const selectedButton = event.target;
    const iscorrect = selectedButton.dataset.Correct === "true"

    // todo : explain this in sec
    Array.from(answersContainer.children).forEach((button) => {
        if (button.dataset.Correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });
    if (iscorrect) {
        score++;
        scoreSpan.textContent = score
    }

    setTimeout(() => {
        currentQuestionIndex++;
        //check if there are more question or the quiz is over
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion()
        } else {
            showResult()
        }
    }, 2000)
}

function showResult() {
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100

    if (percentage === 100) {
        resultMessage.textContent = "Awoseme, You're like Gilbert";
    } else if (percentage >= 80) {
        resultMessage.textContent = "cyaze, you know your stuff!";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Good effort! keep learning";
    } else if (percentage >= 50) {
        resultMessage.textContent = "Not bad! try again to improve";
    } else if (percentage >= 40) {
        resultMessage.textContent = "really!!!";
    } else if (percentage >= 20) {
        resultMessage.textContent = "Hhhhh rekaye !!";
    } else {
        resultMessage.textContent = "Ariko nkawe *";
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active")

    startQuiz()

}