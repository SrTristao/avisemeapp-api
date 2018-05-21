const express = require('express'),
    user = require('./routes/user/routes'),
    vehicle = require('./routes/vehicle/routes'),
    score = require('./routes/score/routes'),
    auth = require('./routes/auth/routes'),
    notification = require('./routes/notification/routes');;

const router = express.Router();

router.use('/user', user);
router.use('/vehicle', vehicle);
router.use('/score', score);
router.use('/auth', auth);
router.use('/notification', notification);

module.exports = router;

