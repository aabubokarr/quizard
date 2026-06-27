import { body } from 'express-validator';

class AuthValidator {
    static register() {
        return [
            body('name').notEmpty().withMessage('Name is required'),
            body('email').isEmail().withMessage('Valid email is required'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        ];
    }

    static login() {
        return [
            body('email').isEmail().withMessage('Valid email is required'),
            body('password').notEmpty().withMessage('Password is required'),
        ];
    }

    static refreshToken() {
        return [
            body('token').notEmpty().withMessage('Token is required'),
        ];
    }
}

export default AuthValidator;