const error = require('./error'),
    mongoose = require('mongoose'),
    Score = require('../controllers/score'),
    validator = require('../validators/score')

const register = async (score) => {
    await validator(score);

    const alreadyExists = await Score.findByNotification(score.id_notification);

    if(alreadyExists) throw new error.ServiceError('score-already-created');

    return await Score.registerScore(score);
}

const getAll = async (id_user) => {
    return await Score.findAll(id_user);
}

const getByNotification = async (id_notification) => {
    return await Score.findByNotification(id_notification);
}

module.exports = {
    register,
    getAll,
    getByNotification
}