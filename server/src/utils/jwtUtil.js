class JWTUtil {
    static generateToken(user) {
        const payload = {
            id: user.id,
            role: user.role,
        };
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

export default JWTUtil;