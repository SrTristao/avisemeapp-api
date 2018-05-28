const bcrypt = require('./bcrypt'),
    error = require('./error'),
    mongoose = require('mongoose'),
    User = require('../controllers/user'),
    validator = require('../validators/user'),
    token = require('../services/token');

const register = async (user) => {
    await validator(user);
    user.email = user.email.toUpperCase();
    const alreadyExists = await User.findByEmail(user.email);

    if(alreadyExists) throw new error.ServiceError('user-already-created');

    return await User.registerUser(user);
}

const update = async (user) => {
    await validator(user);

    const alreadyExists = await User.findById(user._id);

    if (!alreadyExists) throw new error.ServiceError('user-not-found');

    return await User.updateUser(user);
}

const getInformation = async (email) => {
    if(!email) throw new error.ServiceError('invalid-object-id');

    return await User.findByEmail(email);
}

const changePassword = async (user) => {
    if (!user.email || !user.password || !user.newPassword) throw new error.ServiceError('object-invalid');
    
    const userFound = await User.findByEmail(user.email);

    if(!userFound) throw new error.ServiceError('user-not-found');

    await bcrypt.compare(userFound.password, user.password);

    await User.changePassword(user);

    userFound.password = await bcrypt.hash(user.newPassword);

    return await token.generateToken(userFound);
}

const deleteUser = async(id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new error.ServiceError('invalid-object-id');

    return await User.deleteUser(id);
}

module.exports = {
    register,
    update,
    getInformation,
    deleteUser,
    changePassword
}