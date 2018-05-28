const User = require('../models/user'),
    bcrypt = require('../services/bcrypt');

const findByEmail = async (email) => {
    return await User.findOne({email: { $regex: email, $options: 'i' }});
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
    return await User.findByIdAndUpdate({_id: userUpdate._id}, {
        name: userUpdate.name,
        dateofbirth: userUpdate.dateofbirth,
        address: userUpdate.address,
        postalCode: userUpdate.postalCode,
        complement: userUpdate.complement,
        neighborhood: userUpdate.neighborhood,
        city: userUpdate.city,
        state: userUpdate.state
    });
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