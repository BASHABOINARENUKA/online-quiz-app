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

