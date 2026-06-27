import express from 'express';
import ExamController from '../controllers/examController.js';
import { authenticateJWT } from '../middlewares/authenticateJWT.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';
import { examValidator } from '../validators/examValidator.js';

const router = express.Router();
const examController = new ExamController();

// Teacher routes
router.post('/create', authenticateJWT, authorizeRole('Teacher'), examValidator.createExam, examController.createExam);
router.put('/update/:id', authenticateJWT, authorizeRole('Teacher'), examValidator.updateExam, examController.updateExam);
router.delete('/delete/:id', authenticateJWT, authorizeRole('Teacher'), examController.deleteExam);
router.post('/publish/:id', authenticateJWT, authorizeRole('Teacher'), examController.publishExam);
router.post('/add-questions/:id', authenticateJWT, authorizeRole('Teacher'), examValidator.addQuestions, examController.addQuestions);
router.post('/remove-questions/:id', authenticateJWT, authorizeRole('Teacher'), examValidator.removeQuestions, examController.removeQuestions);

// Student routes
router.get('/available', authenticateJWT, examController.getExams);
router.post('/take/:id', authenticateJWT, examController.takeExam);
router.post('/submit/:id', authenticateJWT, examController.submitExam);
router.get('/results/:id', authenticateJWT, examController.getResults);

export default router;