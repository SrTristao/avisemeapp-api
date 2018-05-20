const express = require('express'),
    user = require('./routes/user/routes'),
    vehicle = require('./routes/vehicle/routes'),
    score = require('./routes/score/routes');

const router = express.Router();

router.use('/user', user);
router.use('/vehicle', vehicle);
router.use('/score', score);

module.exports = router;

