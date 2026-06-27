class ExamService {
    constructor(examRepository) {
        this.examRepository = examRepository;
    }

    async createExam(examData) {
        const exam = await this.examRepository.createExam(examData);
        return exam;
    }

    async updateExam(examId, examData) {
        const updatedExam = await this.examRepository.updateExam(examId, examData);
        return updatedExam;
    }

    async deleteExam(examId) {
        await this.examRepository.deleteExam(examId);
        return { message: 'Exam deleted successfully' };
    }

    async publishExam(examId) {
        const publishedExam = await this.examRepository.publishExam(examId);
        return publishedExam;
    }

    async addQuestions(examId, questions) {
        const updatedExam = await this.examRepository.addQuestions(examId, questions);
        return updatedExam;
    }

    async removeQuestions(examId, questionIds) {
        const updatedExam = await this.examRepository.removeQuestions(examId, questionIds);
        return updatedExam;
    }

    async getExams() {
        const exams = await this.examRepository.getExams();
        return exams;
    }

    async getExamById(examId) {
        const exam = await this.examRepository.findExamById(examId);
        return exam;
    }
}

export default ExamService;