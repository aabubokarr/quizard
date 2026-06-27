class AuthController {
    constructor(authService) {
        this.authService = authService;
    }

    async register(req, res) {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: user
            });
        } catch (error) {
            res.status(error.status || 500).json({
                success: false,
                message: error.message || 'Internal Server Error',
                data: null
            });
        }
    }

    async login(req, res) {
        try {
            const { token, user } = await this.authService.login(req.body);
            res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                data: { token, user }
            });
        } catch (error) {
            res.status(error.status || 500).json({
                success: false,
                message: error.message || 'Internal Server Error',
                data: null
            });
        }
    }

    async logout(req, res) {
        try {
            await this.authService.logout(req.user.id);
            res.status(200).json({
                success: true,
                message: 'User logged out successfully',
                data: null
            });
        } catch (error) {
            res.status(error.status || 500).json({
                success: false,
                message: error.message || 'Internal Server Error',
                data: null
            });
        }
    }

    async refreshToken(req, res) {
        try {
            const { token } = await this.authService.refreshToken(req.body);
            res.status(200).json({
                success: true,
                message: 'Token refreshed successfully',
                data: { token }
            });
        } catch (error) {
            res.status(error.status || 500).json({
                success: false,
                message: error.message || 'Internal Server Error',
                data: null
            });
        }
    }
}

export default AuthController;