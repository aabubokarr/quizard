class QuestionFactory {
    static createQuestionStrategy(type) {
        switch (type) {
            case 'MCQ':
                const { MCQStrategy } = require('../strategies/mcqStrategy');
                return new MCQStrategy();
            case 'FillBlank':
                const { FillBlankStrategy } = require('../strategies/fillBlankStrategy');
                return new FillBlankStrategy();
            case 'TrueFalse':
                const { TrueFalseStrategy } = require('../strategies/trueFalseStrategy');
                return new TrueFalseStrategy();
            default:
                throw new Error('Invalid question type');
        }
    }
}

module.exports = QuestionFactory;