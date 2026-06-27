import express from 'express';
import { AuthController } from '../controllers/authController';
import { authValidator } from '../validators/authValidator';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const router = express.Router();
const authController = new AuthController();

router.post('/register', authValidator.register, authController.register);
router.post('/login', authValidator.login, authController.login);
router.post('/logout', authenticateJWT, authController.logout);
router.post('/refresh-token', authenticateJWT, authController.refreshToken);

export default router;