const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email:  {type: String, required: true, unique: true},
    address: {type: String, required: true},
    complement: String,
    neighborhood: {type: String, required: true},
    postalCode: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: Date,
    dateofbirth: {type: String, require: true}
});

module.exports = mongoose.model('User', userSchema);