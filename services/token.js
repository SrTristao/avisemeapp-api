const jwt = require('jsonwebtoken'),
    config = require('../config');

const generateToken = async (data) => {
    return await jwt.sign(data.toJSON(), config.SALT_KEY, {expiresIn: '1d'});
}

const decodeToken = async (req, res, next) => {
    try {    
        const token = req.get('Authorization') || `bearer ${req.query.t || req.body.authToken}`;  
        if (!token) return next();

        req.user = await verify(token.split(' ')[1]);
        
        next();
    } catch (err) {
        next();
    }
}

const verify = (token) => {    
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.SALT_KEY, (err, decoded) => {      
            if (err || !decoded) {
                return reject(resolveVerifyError(err));
            }      
            resolve(decoded._doc);
        });
    });
}

function resolveVerifyError(err) {
    if (!err) {
        return new Error('token-type-not-match');
    }

    switch (err.name) {
    case 'TokenExpiredError':
        return new Error('token-expired');
    default:
        return new Error('token-invalid');
    }
}

module.exports = {
    verify,
    decodeToken,
    generateToken
}