const error = require('./error'),
    bcrypt = require('bcrypt-nodejs');

const hash = async (password) => {
  return await new Promise((resolve, reject) => {

    bcrypt.genSalt(11, (err, salt) => {
      if (err) return reject(err);

      bcrypt.hash(password, salt, null, async (err, hash) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });

  });
}

const compare = async (hash, password) => {
  return await new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err || !isMatch) return reject(new error.ServiceError('invalid-password'));
      resolve();
    });

  });
} 

module.exports = {
  hash,
  compare
}