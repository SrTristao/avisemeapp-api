const joi = require('joi');

const schema = joi.object().keys({
    name: joi.string().required(),
    email:  joi.string().required(),
    address: joi.string().required(),
    neighborhood: joi.string().required(),
    postalCode: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    password: joi.string().required(),
    dateofbirth: joi.string().required(),
    
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