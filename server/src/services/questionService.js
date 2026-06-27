class QuestionService {
    constructor(questionRepository, questionFactory) {
        this.questionRepository = questionRepository;
        this.questionFactory = questionFactory;
    }

    async createQuestion(data) {
        const questionStrategy = this.questionFactory.createQuestionStrategy(data.type);
        const question = questionStrategy.create(data);
        return await this.questionRepository.createQuestion(question);
    }

    async updateQuestion(id, data) {
        const question = await this.questionRepository.findQuestionById(id);
        if (!question) {
            throw new Error('Question not found');
        }
        const questionStrategy = this.questionFactory.createQuestionStrategy(data.type);
        const updatedQuestion = questionStrategy.update(question, data);
        return await this.questionRepository.updateQuestion(id, updatedQuestion);
    }

    async deleteQuestion(id) {
        const question = await this.questionRepository.findQuestionById(id);
        if (!question) {
            throw new Error('Question not found');
        }
        return await this.questionRepository.deleteQuestion(id);
    }

    async getQuestions() {
        return await this.questionRepository.getAllQuestions();
    }
}

export default QuestionService;