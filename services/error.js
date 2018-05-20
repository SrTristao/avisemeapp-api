const errorHandler = (err, res, next) => {
    switch (err.message) {    
        case 'user-already-created'  :
        return res.status(401).send({message: 'Usuário já registrado.'})
        case 'object-invalid':
        return res.status(401).send({message: 'Usuário inválido.'})
        case 'invalid-object-id':
        return res.status(401).send({ message: 'Parametro inválido.'});
        case 'parameter-not-expected':
        return res.status(401).send({ message: 'Parametro não experado.'})
        case 'user-not-found':
        return res.status(404).send({ message: 'Usuário não encontrado.' });
        case 'user-inactive':
        return res.status(403).send({ message: 'Usuário inativo.' });
        case 'invalid-password':
        return res.status(400).send({ message: 'Senha inválida.' });
        case 'vehicle-already-created':
        return res.status(400).send({message: 'Veiculo já registrado.'});
        case 'vehicle-not-found':
        return res.status(400).send({message: 'Veiculo não encontrado.'});
        case 'score-already-created':
        return res.status(400).send({message: 'Pontuação já registrada.'});
        case 'notification-not-found':
        return res.status(400).send({message: 'Notificação não encontrada'});
        default:
        next(err);
    }
}

class ServiceError extends Error {
    constructor(type, data = {}) {
        super(type);
        this.data = data;
    }
}

module.exports = {
    errorHandler,
    ServiceError
}