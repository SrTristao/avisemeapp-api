const express = require('express'),
        action = require('./action');

const router = express.Router();

router.get('/:id_user', action.getAll)
        .post('/', action.register)
        .put('/', action.update)
        .delete('/:id', action.deleteVehicle)

module.exports = router;