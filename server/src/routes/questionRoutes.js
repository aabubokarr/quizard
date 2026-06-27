import express from 'express';
import QuestionController from '../controllers/questionController.js';
import { validateQuestion } from '../validators/questionValidator.js';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = express.Router();
const questionController = new QuestionController();

// Routes for managing questions
router.post('/', authenticateJWT, authorizeRole('Teacher'), validateQuestion, questionController.createQuestion);
router.put('/:id', authenticateJWT, authorizeRole('Teacher'), validateQuestion, questionController.updateQuestion);
router.delete('/:id', authenticateJWT, authorizeRole('Teacher'), questionController.deleteQuestion);
router.get('/', authenticateJWT, questionController.getQuestions);

export default router;