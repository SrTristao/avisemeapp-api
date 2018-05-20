const express = require('express'),
        action = require('./action');

const router = express.Router();
router.post('/changePassword', action.changePassword);

router.get('/:email', action.getInformation)
        .post('/', action.register)
        .put('/', action.update);

module.exports = router;