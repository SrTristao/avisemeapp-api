const Score = require('../models/score');

const findByNotification = async (id_notification) => {
    return await Score.findOne({id_notification});
}

const findAll = async(id_user) => {
    return await Score.find({id_user});
}
const findById = async (id) => {
    return await Score.findById(id);
}

const registerScore = async (scoreRegister) => {
    scoreRegister.createdAt = new Date();
    const newScore = new Score(scoreRegister);
    return await newScore.save();
}

module.exports = {
    findByNotification,
    findById,
    registerScore,
    findAll
}