class QuestionRepository {
    constructor(QuestionModel) {
        this.QuestionModel = QuestionModel;
    }

    async findQuestionById(id) {
        return await this.QuestionModel.findById(id);
    }

    async createQuestion(questionData) {
        const question = new this.QuestionModel(questionData);
        return await question.save();
    }

    async updateQuestion(id, questionData) {
        return await this.QuestionModel.findByIdAndUpdate(id, questionData, { new: true });
    }

    async deleteQuestion(id) {
        return await this.QuestionModel.findByIdAndDelete(id);
    }

    async findAllQuestions() {
        return await this.QuestionModel.find();
    }
}

export default QuestionRepository;