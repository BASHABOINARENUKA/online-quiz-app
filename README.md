# online-quiz-app

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    <style>
        body {
    font-family: Arial, sans-serif;
    text-align: center;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

.quiz-container {
    width: 50%;
    margin: auto;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 10px;
    cursor: pointer;
    border-radius: 5px;
}

button:hover {
    background-color: #0056b3;
}

.option {
    display: block;
    background: #ddd;
    margin: 10px auto;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
}

.option:hover {
    background: #bbb;
}

    </style>
</head>
<body>
    <div class="quiz-container">
        <h1>Quiz App</h1>
        <div id="question-container">
            <p id="question"></p>
            <div id="options"></div>
        </div>
        <button id="next-btn">Next</button>
        <p id="score"></p>
    </div>
    <script>
        class Question {
    constructor(question, options, correctAnswer) {
        this.question = question;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    isCorrect(choice) {
        return this.options[choice] === this.correctAnswer;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentQuestionIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    checkAnswer(choice) {
        if (this.getCurrentQuestion().isCorrect(choice)) {
            this.score++;
            alert("Correct!");
        } else {
            alert("Wrong Answer!");
        }
        this.currentQuestionIndex++;
    }

    isFinished() {
        return this.currentQuestionIndex >= this.questions.length;
    }
}

// Sample Questions
const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4"),
    new Question("What is the capital of France?", ["Berlin", "Madrid", "Paris", "Rome"], "Paris"),
    new Question("What is the largest planet?", ["Earth", "Mars", "Jupiter", "Saturn"], "Jupiter"),
];

const quiz = new Quiz(questions);

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function loadQuestion() {
    if (quiz.isFinished()) {
        questionElement.innerHTML = "Quiz Completed!";
        optionsContainer.innerHTML = "";
        nextButton.style.display = "none";
        scoreElement.innerHTML = `Final Score: ${quiz.score}/${quiz.questions.length}`;
        return;
    }

    const currentQuestion = quiz.getCurrentQuestion();
    questionElement.innerHTML = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option");
        button.onclick = () => {
            quiz.checkAnswer(index);
            loadQuestion();
        };
        optionsContainer.appendChild(button);
    });
}

nextButton.addEventListener("click", loadQuestion);
loadQuestion();

    </script>
</body>
</html>
