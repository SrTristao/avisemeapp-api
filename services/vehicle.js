const error = require('./error'),
    mongoose = require('mongoose'),
    Vehicle = require('../controllers/vehicle'),
    validator = require('../validators/vehicle')

const register = async (vehicle) => {
    await validator(vehicle);

    const alreadyExists = await Vehicle.findByBoard(vehicle.board);

    if(alreadyExists) throw new error.ServiceError('vehicle-already-created');

    return await Vehicle.registerVehicle(vehicle);
}

const update = async (vehicle) => {
    await validator(vehicle);

    const alreadyExists = await Vehicle.findById(vehicle._id);

    if (!alreadyExists) throw new error.ServiceError('vehicle-not-found');

    return await Vehicle.updateVehicle(vehicle);
}

const getAll = async (id_user) => {
    return await Vehicle.findAll(id_user);
}

const deleteVehicle = async(id) => {
    if(!mongoose.Types.ObjectId.isValid(id)) throw new error.ServiceError('invalid-object-id');

    return await Vehicle.deleteVehicle(id);
}

module.exports = {
    register,
    update,
    getAll,
    deleteVehicle
}