const express = require('express'),
        action = require('./action');

const router = express.Router();

router.post('/', action.login);

module.exports = router;