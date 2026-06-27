class UserRepository {
    constructor(UserModel) {
        this.UserModel = UserModel;
    }

    async findUserById(userId) {
        return await this.UserModel.findById(userId).exec();
    }

    async createUser(userData) {
        const user = new this.UserModel(userData);
        return await user.save();
    }

    async updateUser(userId, updateData) {
        return await this.UserModel.findByIdAndUpdate(userId, updateData, { new: true }).exec();
    }

    async deleteUser(userId) {
        return await this.UserModel.findByIdAndDelete(userId).exec();
    }

    async findUserByEmail(email) {
        return await this.UserModel.findOne({ email }).exec();
    }
}

export default UserRepository;