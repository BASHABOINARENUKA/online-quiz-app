class Quiz {
    constructor() {
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.loadQuestions();
    }

    async loadQuestions() {
        try {
            const response = await fetch("http://127.0.0.1:5000/questions");
            this.questions = await response.json();
            this.showQuestion();
        } catch (error) {
            console.error("Error loading questions:", error);
        }
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            document.getElementById("question").innerText = "Quiz Completed!";
            document.getElementById("options").innerHTML = "";
            document.getElementById("next-btn").style.display = "none";
            document.getElementById("score").innerText = `Final Score: ${this.score}/${this.questions.length}`;
            return;
        }

        const questionData = this.questions[this.currentQuestionIndex];
        document.getElementById("question").innerText = questionData.question;
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";

        questionData.options.forEach((option) => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option");
            button.onclick = () => this.checkAnswer(questionData.id, option);
            optionsContainer.appendChild(button);
        });
    }

    async checkAnswer(questionId, userAnswer) {
        try {
            const response = await fetch("http://127.0.0.1:5000/check-answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: questionId, answer: userAnswer })
            });
            const result = await response.json();

            if (result.correct) {
                alert("Correct!");
                this.score++;
            } else {
                alert("Wrong Answer!");
            }

            this.currentQuestionIndex++;
            this.showQuestion();
        } catch (error) {
            console.error("Error checking answer:", error);
        }
    }
}

// Initialize the quiz
const quiz = new Quiz();
document.getElementById("next-btn").addEventListener("click", () => quiz.showQuestion());
