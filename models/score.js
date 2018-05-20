const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id_user: {type: String, required: true},
    id_notification:  {type: String, required: true, unique: true},
    score: {type: Number, required: true},
    createdAt: Date
});

module.exports = mongoose.model('Score', userSchema);