const bcrypt = require('./bcrypt'),
    error = require('./error'),
    mongoose = require('mongoose'),
    User = require('../controllers/user'),
    validator = require('../validators/user'),
    token = require('../services/token'),
    nodemailer = require('nodemailer');

const login = async (user) => {
    const userFound = await User.findByEmail(user.email);

    if(!userFound) throw new error.ServiceError('user-not-found');

    await bcrypt.compare(userFound.password, user.password);

    return await token.generateToken(userFound);
}

const resetPassword = async (email) => {
    const userFound = await User.findByEmail(email.email);

    if(!userFound) throw new error.ServiceError('user-not-found');

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'avisemeapp@gmail.com',
            pass: 'avisemeapp123'
        }
    });

    const newPassword = 'aviseme1233421';

    User.changePassword({email:email.email, newPassword});

    const mailOptions = {
        from: 'avisemeapp@gmail.com',
        to: email.email,
        subject: 'senha resetada - AvisemeAPP',
        text: `A sua nova senha é: ${newPassword}`
    };

    return await transporter.sendMail(mailOptions);
}

module.exports = {
    login,
    resetPassword
}