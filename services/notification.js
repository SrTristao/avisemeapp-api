const error = require('./error'),
    mongoose = require('mongoose'),
    Notification = require('../controllers/notification'),
    Vehicle = require('../controllers/vehicle'),
    validator = require('../validators/notification')

const register = async (notification) => {
    const vehicle = await Vehicle.findByBoard(notification.board);

    if(!vehicle) throw new error.ServiceError('vehicle-not-found');

    notification.user_receive = vehicle.id_user;

    return await Notification.registerNotification(notification);
}

const receive = async (id_user) => {
    return await Notification.findByReceive(id_user);
}

const send = async (id_user) => {
    return await Notification.findBySend(id_user);
}

module.exports = {
    send,
    receive,
    register
}