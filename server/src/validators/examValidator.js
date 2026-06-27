import { body } from 'express-validator';

class ExamValidator {
    static createExam() {
        return [
            body('title').notEmpty().withMessage('Title is required'),
            body('duration').isInt({ gt: 0 }).withMessage('Duration must be a positive integer'),
            body('startTime').isISO8601().withMessage('Start time must be a valid date'),
            body('endTime').isISO8601().withMessage('End time must be a valid date'),
            body('totalMarks').isInt({ gt: 0 }).withMessage('Total marks must be a positive integer'),
            body('questions').isArray().withMessage('Questions must be an array'),
        ];
    }

    static updateExam() {
        return [
            body('title').optional().notEmpty().withMessage('Title cannot be empty'),
            body('duration').optional().isInt({ gt: 0 }).withMessage('Duration must be a positive integer'),
            body('startTime').optional().isISO8601().withMessage('Start time must be a valid date'),
            body('endTime').optional().isISO8601().withMessage('End time must be a valid date'),
            body('totalMarks').optional().isInt({ gt: 0 }).withMessage('Total marks must be a positive integer'),
            body('questions').optional().isArray().withMessage('Questions must be an array'),
        ];
    }

    static deleteExam() {
        return [
            body('examId').notEmpty().withMessage('Exam ID is required'),
        ];
    }
}

export default ExamValidator;