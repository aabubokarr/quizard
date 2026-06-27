class FillBlankStrategy {
    gradeAnswer(correctAnswer, userAnswer) {
        return correctAnswer.trim().toLowerCase() === userAnswer.trim().toLowerCase();
    }

    getQuestionType() {
        return 'Fill in the Blank';
    }
}

export default FillBlankStrategy;