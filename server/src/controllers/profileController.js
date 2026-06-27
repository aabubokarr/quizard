class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }

    async getProfile(req, res) {
        try {
            const userId = req.user.id;
            const profile = await this.profileService.getProfile(userId);
            res.status(200).json({
                success: true,
                message: 'Profile retrieved successfully',
                data: profile
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    async updateProfile(req, res) {
        try {
            const userId = req.user.id;
            const updatedProfile = await this.profileService.updateProfile(userId, req.body);
            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: updatedProfile
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    async changePassword(req, res) {
        try {
            const userId = req.user.id;
            await this.profileService.changePassword(userId, req.body);
            res.status(200).json({
                success: true,
                message: 'Password changed successfully',
                data: null
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }

    async uploadProfileImage(req, res) {
        try {
            const userId = req.user.id;
            const imageUrl = await this.profileService.uploadProfileImage(userId, req.file);
            res.status(200).json({
                success: true,
                message: 'Profile image uploaded successfully',
                data: imageUrl
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
                data: null
            });
        }
    }
}

export default ProfileController;