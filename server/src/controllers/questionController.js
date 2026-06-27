class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }

    async createQuestion(req, res) {
        try {
            const questionData = req.body;
            const question = await this.questionService.createQuestion(questionData);
            res.status(201).json({
                success: true,
                message: 'Question created successfully',
                data: question
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    async updateQuestion(req, res) {
        try {
            const { id } = req.params;
            const questionData = req.body;
            const updatedQuestion = await this.questionService.updateQuestion(id, questionData);
            res.status(200).json({
                success: true,
                message: 'Question updated successfully',
                data: updatedQuestion
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    async deleteQuestion(req, res) {
        try {
            const { id } = req.params;
            await this.questionService.deleteQuestion(id);
            res.status(200).json({
                success: true,
                message: 'Question deleted successfully',
                data: null
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    async getQuestions(req, res) {
        try {
            const questions = await this.questionService.getQuestions();
            res.status(200).json({
                success: true,
                message: 'Questions retrieved successfully',
                data: questions
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }
}

export default QuestionController;