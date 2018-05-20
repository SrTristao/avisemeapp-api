const authService = require('../../services/auth'),
    error = require('../../services/error');

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao validar as informações de usuário.'});
        
        res.status(200).send(result);
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

module.exports = {
    login
}

