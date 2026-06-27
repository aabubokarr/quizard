import { body } from 'express-validator';

class ProfileValidator {
    static validateGetProfile() {
        return [];
    }

    static validateUpdateProfile() {
        return [
            body('name').optional().isString().withMessage('Name must be a string'),
            body('email').optional().isEmail().withMessage('Email must be a valid email address'),
            body('institution').optional().isString().withMessage('Institution must be a string'),
        ];
    }

    static validateChangePassword() {
        return [
            body('currentPassword').isString().withMessage('Current password is required'),
            body('newPassword').isString().isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
        ];
    }

    static validateUploadProfileImage() {
        return [];
    }
}

export default ProfileValidator;