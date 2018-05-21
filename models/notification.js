const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    user_receive: {type:String, required: true},
    user_send: {type: String, required: true},
    message: {type: String, required: true},
    lat_user_send: {type: String, required: true},
    lon_user_send: {type: String, required: true},
    board: {type: String, required: true},
    createdAt: Date
});

module.exports = mongoose.model('Notification', notificationSchema);