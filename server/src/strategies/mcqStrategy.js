class MCQStrategy {
    constructor() {
        this.type = 'MCQ';
    }

    grade(answer, correctAnswers) {
        return answer.every((ans, index) => ans === correctAnswers[index]) ? 1 : 0;
    }

    formatQuestion(question) {
        return {
            id: question._id,
            question: question.questionText,
            options: question.options,
            correctAnswers: question.correctAnswers,
        };
    }
}

export default MCQStrategy;