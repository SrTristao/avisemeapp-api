const User = require('../models/user'),
    bcrypt = require('../services/bcrypt');

const findByEmail = async (email) => {
    return await User.findOne({email});
}

const findById = async (id) => {
    return await User.findById(id);
}

const registerUser = async (userRegister) => {
    userRegister.createdAt = new Date();
    userRegister.password = await bcrypt.hash(userRegister.password);
    const newUser = new User(userRegister);
    return await newUser.save();
}

const deleteUser = async (id) => {
    return await User.findByIdAndRemove(id);
}

const updateUser = async (userUpdate) => {
    return await User.findByIdAndUpdate({_id: userUpdate._id}, userUpdate);
}

const changePassword = async (user) => {
    return await User.findOne({email: user.email}, async(err, doc) => {
        doc.password = await bcrypt.hash(user.newPassword);
        doc.save();
    })
}

module.exports = {
    findByEmail,
    findById,
    registerUser,
    deleteUser,
    updateUser,
    changePassword
}