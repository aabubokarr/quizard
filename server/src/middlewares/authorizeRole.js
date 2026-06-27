class AuthorizeRole {
    constructor(...roles) {
        this.roles = roles;
    }

    authorize(req, res, next) {
        const userRole = req.user.role; // Assuming user role is set in req.user by authenticateJWT middleware

        if (!this.roles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden: You do not have the required permissions.',
                data: null
            });
        }

        next();
    }
}

export default (roles) => {
    const authorizeRoleInstance = new AuthorizeRole(...roles);
    return (req, res, next) => authorizeRoleInstance.authorize(req, res, next);
};