const joi = require('joi');

const schema = joi.object().keys({
    id_notification: joi.string().required(),
    id_user: joi.string().required(),
    score: joi.number().required()
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