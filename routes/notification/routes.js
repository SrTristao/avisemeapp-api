const express = require('express'),
        action = require('./action');

const router = express.Router();
router.get('/send/:id_user', action.send);
router.get('/receive/:id_user', action.receive);
router.post('/', action.register);

module.exports = router;