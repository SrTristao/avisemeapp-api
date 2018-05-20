const bcrypt = require('./bcrypt'),
    error = require('./error'),
    mongoose = require('mongoose'),
    User = require('../controllers/user'),
    validator = require('../validators/user'),
    token = require('../services/token');

const login = async (user) => {
    const userFound = await User.findByEmail(user.email);

    await bcrypt.compare(userFound.password, user.password);

    return await token.generateToken(userFound);
}

module.exports = {
    login
}