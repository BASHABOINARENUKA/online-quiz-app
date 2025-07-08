from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Allow frontend access

class QuizDatabase:
    def __init__(self, db_name="quiz.db"):
        self.conn = sqlite3.connect(db_name, check_same_thread=False)
        self.cursor = self.conn.cursor()
        self.create_table()

    def create_table(self):
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question TEXT,
                options TEXT,
                correct_answer TEXT
            )
        """)
        self.conn.commit()

    def insert_question(self, question, options, correct_answer):
        self.cursor.execute("INSERT INTO questions (question, options, correct_answer) VALUES (?, ?, ?)",
                            (question, ",".join(options), correct_answer))
        self.conn.commit()

    def get_questions(self):
        self.cursor.execute("SELECT * FROM questions")
        rows = self.cursor.fetchall()
        questions = [
            {"id": row[0], "question": row[1], "options": row[2].split(","), "correct_answer": row[3]}
            for row in rows
        ]
        return questions

quiz_db = QuizDatabase()

if not quiz_db.get_questions():
    quiz_db.insert_question("What is 2 + 2?", ["3", "4", "5", "6"], "4")
    quiz_db.insert_question("What is the capital of France?", ["Berlin", "Madrid", "Paris", "Rome"], "Paris")
    quiz_db.insert_question("What is the largest planet?", ["Earth", "Mars", "Jupiter", "Saturn"], "Jupiter")


@app.route("/questions", methods=["GET"])
def get_questions():
    return jsonify(quiz_db.get_questions())

@app.route("/check-answer", methods=["POST"])
def check_answer():
    data = request.json
    question_id = data.get("id")
    user_answer = data.get("answer")

    questions = quiz_db.get_questions()
    for q in questions:
        if q["id"] == question_id:
            return jsonify({"correct": q["correct_answer"] == user_answer})

    return jsonify({"error": "Question not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
