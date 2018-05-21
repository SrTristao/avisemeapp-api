const vehicleService = require('../../services/vehicle'),
    error = require('../../services/error');

const register = async (req, res, next) => {
    try {
        const result = await vehicleService.register(req.body);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao salvar o veículo'});
        
        res.status(200).send({message: 'Veículo registrado com sucesso.', result});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await vehicleService.update(req.body);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao atualizar o veículo'});
        
        res.status(200).send({message: 'Veículo atualizado com sucesso.'});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await vehicleService.getAll(req.params.id_user);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao tentar buscar os veículos.'});
        
        res.status(200).send({result});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const deleteVehicle = async(req, res, next) => {
    try {
        const result = await vehicleService.deleteVehicle(req.params.id);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao deletar o véiculo.'});
        
        res.status(200).send({message: 'Veículo deletado com sucesso.'});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const get = async(req, res, next) => {
    try {
        const result = await vehicleService.get(req.params.board, req.params.user_id);
        if (result)
            res.status(401).send({message: 'Veículo pertence ao usuário.', hasVehicle: false});
        
        res.status(200).send({hasVehicle: true});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

module.exports = {
    register,
    update,
    getAll,
    deleteVehicle,
    get
}

