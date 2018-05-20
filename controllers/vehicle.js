const Vehicle = require('../models/vehicle'),
    bcrypt = require('../services/bcrypt');

const findByBoard = async (board) => {
    return await Vehicle.findOne({board});
}

const findAll = async(id_user) => {
    return await Vehicle.find({id_user})
}
const findById = async (id) => {
    return await Vehicle.findById(id);
}

const registerVehicle = async (vehicleRegister) => {
    vehicleRegister.createdAt = new Date();
    const newVehicle = new Vehicle(vehicleRegister);
    return await newVehicle.save();
}

const deleteVehicle = async (id) => {
    return await Vehicle.findByIdAndRemove(id);
}

const updateVehicle = async (vehicleUpdate) => {
    return await Vehicle.findByIdAndUpdate({_id: vehicleUpdate._id}, vehicleUpdate);
}


module.exports = {
    findByBoard,
    findById,
    registerVehicle,
    deleteVehicle,
    updateVehicle,
    findAll
}