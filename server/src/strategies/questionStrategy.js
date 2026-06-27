class QuestionStrategy {
    createQuestion(data) {
        throw new Error("Method 'createQuestion()' must be implemented.");
    }

    gradeQuestion(answer, correctAnswer) {
        throw new Error("Method 'gradeQuestion()' must be implemented.");
    }
}

export default QuestionStrategy;