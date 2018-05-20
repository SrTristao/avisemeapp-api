const scoreService = require('../../services/score'),
    error = require('../../services/error');

const register = async (req, res, next) => {
    try {
        const result = await scoreService.register(req.body);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao salvar a Pontuação.'});
        
        res.status(200).send({message: 'Pontuação registrada com sucesso.'});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const getAll = async (req, res, next) => {
    try {
        const result = await scoreService.getAll(req.params.id_user);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao tentar buscar as pontuações.'});
        
        res.status(200).send({result, message: 'Pontuações recuperadas com sucesso.'});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

module.exports = {
    register,
    getAll
}