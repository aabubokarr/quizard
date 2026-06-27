class ExamController {
    constructor(examService) {
        this.examService = examService;
    }

    async createExam(req, res) {
        try {
            const examData = req.body;
            const exam = await this.examService.createExam(examData);
            res.status(201).json({ success: true, message: 'Exam created successfully', data: exam });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updateExam(req, res) {
        try {
            const { examId } = req.params;
            const examData = req.body;
            const updatedExam = await this.examService.updateExam(examId, examData);
            res.status(200).json({ success: true, message: 'Exam updated successfully', data: updatedExam });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteExam(req, res) {
        try {
            const { examId } = req.params;
            await this.examService.deleteExam(examId);
            res.status(200).json({ success: true, message: 'Exam deleted successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async publishExam(req, res) {
        try {
            const { examId } = req.params;
            const publishedExam = await this.examService.publishExam(examId);
            res.status(200).json({ success: true, message: 'Exam published successfully', data: publishedExam });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async addQuestions(req, res) {
        try {
            const { examId } = req.params;
            const questions = req.body.questions;
            const updatedExam = await this.examService.addQuestions(examId, questions);
            res.status(200).json({ success: true, message: 'Questions added successfully', data: updatedExam });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async removeQuestions(req, res) {
        try {
            const { examId } = req.params;
            const questions = req.body.questions;
            const updatedExam = await this.examService.removeQuestions(examId, questions);
            res.status(200).json({ success: true, message: 'Questions removed successfully', data: updatedExam });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getExams(req, res) {
        try {
            const exams = await this.examService.getExams();
            res.status(200).json({ success: true, data: exams });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

export default ExamController;