const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    name: {type: String, required: true},
    id_user: {type:String, required: true},
    board:  {type: String, required: true, unique: true},
    type: {type: String, required: true},
    brand: {type: String, required: true},
    year: {type: String, required: true},
    model: {type: String, required: true},
    color: {type: String, required: true},
    state: {type: String, required: true},
    createdAt: Date
});

module.exports = mongoose.model('Vehicle', vehicleSchema);