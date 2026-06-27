class ProfileService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async getProfile(userId) {
        return await this.userRepository.findUserById(userId);
    }

    async updateProfile(userId, profileData) {
        return await this.userRepository.updateUser(userId, profileData);
    }

    async changePassword(userId, newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return await this.userRepository.updateUser(userId, { password: hashedPassword });
    }

    async uploadProfileImage(userId, imagePath) {
        return await this.userRepository.updateUser(userId, { profileImage: imagePath });
    }
}

export default ProfileService;