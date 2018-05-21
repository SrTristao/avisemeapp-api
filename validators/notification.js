const joi = require('joi');

const schema = joi.object().keys({
    user_receive: joi.string().required(),
    user_send: joi.string().required(),
    message: joi.string().required(),
    lat_user_send: joi.string().required(),
    lon_user_send: joi.string().required(),
    board: joi.string().required()
});

const validate = async (model) => {
    return validateAsPromise(model, schema);
}

function validateAsPromise(model, schema) {
    return new Promise((resolve, reject) => {
        joi.validate(model, schema, { abortEarly: false, stripUnknown: { objects: true, arrays: false } }, (err, value) => {
        if (err) reject({message: 'object-invalid'});
        resolve(value);
        });
    });
}

module.exports = validate;