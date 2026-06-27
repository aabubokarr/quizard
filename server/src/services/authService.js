class AuthService {
    constructor(userRepository, jwtUtil, bcryptUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.bcryptUtil = bcryptUtil;
    }

    async register(userData) {
        const hashedPassword = await this.bcryptUtil.hashPassword(userData.password);
        const newUser = { ...userData, password: hashedPassword };
        return await this.userRepository.createUser(newUser);
    }

    async login(email, password) {
        const user = await this.userRepository.findUserByEmail(email);
        if (!user || !(await this.bcryptUtil.comparePassword(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = this.jwtUtil.generateToken(user);
        return { user, token };
    }

    async logout(userId) {
        // Implement logout logic if needed (e.g., token blacklist)
        return { message: 'User logged out successfully' };
    }

    async refreshToken(token) {
        const userData = this.jwtUtil.verifyToken(token);
        const user = await this.userRepository.findUserById(userData.id);
        if (!user) {
            throw new Error('User not found');
        }
        const newToken = this.jwtUtil.generateToken(user);
        return { user, token: newToken };
    }
}

export default AuthService;