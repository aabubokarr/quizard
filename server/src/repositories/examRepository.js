class ExamRepository {
    constructor(ExamModel) {
        this.ExamModel = ExamModel;
    }

    async findExamById(examId) {
        return await this.ExamModel.findById(examId).populate('questions');
    }

    async createExam(examData) {
        const exam = new this.ExamModel(examData);
        return await exam.save();
    }

    async updateExam(examId, updateData) {
        return await this.ExamModel.findByIdAndUpdate(examId, updateData, { new: true });
    }

    async deleteExam(examId) {
        return await this.ExamModel.findByIdAndDelete(examId);
    }

    async findAllExams() {
        return await this.ExamModel.find().populate('questions');
    }
}

export default ExamRepository;