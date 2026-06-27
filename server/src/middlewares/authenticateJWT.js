import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { config } from '../config/env'; // Assuming you have an env config for your JWT secret

const verifyToken = promisify(jwt.verify);

export const authenticateJWT = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.',
            data: null
        });
    }

    try {
        const decoded = await verifyToken(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid token.',
            data: null
        });
    }
};