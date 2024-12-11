const express = require('express');
const router = express.Router();

router.use('/airlines', require('./airlines.r'));
router.use('/destinations', require('./destinations.r'));
router.use('/destinationPlans', require('./destinationPlans.r'));
router.use('/clients', require('./clients.r'));

module.exports = router;
