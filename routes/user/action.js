const userService = require('../../services/user'),
    error = require('../../services/error');

const register = async (req, res, next) => {
    try {
        const result = await userService.register(req.body);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao salvar usuário'});
        
        res.status(200).send({message: 'Usuário registrado com sucesso.'});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const update = async (req, res, next) => {
    try {
        const result = await userService.update(req.body);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao atualizar usuário'});
        
        res.status(200).send({message: 'Usuário atualizado com sucesso.'});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const getInformation = async (req, res, next) => {
    try {
        const result = await userService.getInformation (req.params.email);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao tentar recuperar informações do usuário'});
        
        res.status(200).send({result});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const deleteUser = async(req, res, next) => {
    try {
        const result = await userService.deleteUser(req.params.id);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao deletar usuário'});
        
        res.status(200).send({message: 'Usuário deletado com sucesso.'});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const changePassword = async(req, res, next) => {
    try {
        const result = await userService.changePassword(req.body);
        if(!result)
            res.status(401).send({message: 'Ocorreu um erro ao tentar mudar a senha do usuário.'});

        res.status(200).send({result, message: 'Senha atualizada com sucesso.'});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

module.exports = {
    register,
    update,
    getInformation,
    deleteUser,
    changePassword
}

