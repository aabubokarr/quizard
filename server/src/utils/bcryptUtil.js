export const hashPassword = async (password) => {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (password, hashedPassword) => {
    const bcrypt = require('bcrypt');
    return await bcrypt.compare(password, hashedPassword);
};