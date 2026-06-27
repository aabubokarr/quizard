import express from 'express';
import { ProfileController } from '../controllers/profileController';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { authorizeRole } from '../middlewares/authorizeRole';
import { profileValidator } from '../validators/profileValidator';

const router = express.Router();
const profileController = new ProfileController();

// Get user profile
router.get('/profile', authenticateJWT, profileController.getProfile.bind(profileController));

// Update user profile
router.put('/profile', authenticateJWT, profileValidator, profileController.updateProfile.bind(profileController));

// Change password
router.put('/profile/change-password', authenticateJWT, profileController.changePassword.bind(profileController));

// Upload profile image
router.put('/profile/upload-image', authenticateJWT, profileController.uploadProfileImage.bind(profileController));

export default router;