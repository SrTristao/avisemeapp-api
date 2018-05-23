const express = require('express'),
action = require('./action');

const router = express.Router();
router.get('/notification/:id_notification', action.getByNotification);
router.get('/:id_user', action.getAll)
.post('/', action.register)

module.exports = router;