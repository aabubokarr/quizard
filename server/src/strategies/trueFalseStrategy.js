class TrueFalseStrategy {
    grade(answer, correctAnswer) {
        return answer.toLowerCase() === correctAnswer.toLowerCase() ? 1 : 0;
    }

    getQuestionType() {
        return 'True/False';
    }
}

export default TrueFalseStrategy;