const Notification = require('../models/notification');

const findBySend = async(id_user) => {
    return await Notification.find({user_send:id_user});
}
const findByReceive = async (id_user) => {
    return await Notification.find({user_receive: id_user});
}

const registerNotification = async (notificationRegister) => {
    notificationRegister.createdAt = new Date();
    const newNotification = new Notification(notificationRegister);
    return await newNotification.save();
}

module.exports = {
    registerNotification,
    findBySend,
    findByReceive
}