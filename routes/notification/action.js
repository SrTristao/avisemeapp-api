const notificationService = require('../../services/notification'),
    error = require('../../services/error');

const send = async (req, res, next) => {
    try {
        const result = await notificationService.send(req.params.id_user);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao tentar recuperar as notificações enviadas.'});
        
        res.status(200).send({message: 'Notificações enviadas recuperadas com sucesso.', result});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const receive = async (req, res, next) => {
    try {
        const result = await notificationService.receive(req.params.id_user);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao tentar recuperar as notificações recebidas.'});
        
        res.status(200).send({message: 'Notificações recebidas recuperadas com sucesso.', result});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

const register = async (req, res, next) => {
    try {
        const result = await notificationService.register(req.body);
        if (!result)
            res.status(401).send({message: 'Ocorreu um erro ao registras a notificaçao.'});
        
        res.status(200).send({message: 'Notificação registrada com sucesso.', result});
    } catch(err) {
        error.errorHandler(err, res, next);
    }
}

module.exports = {
    receive,
    send,
    register
}

