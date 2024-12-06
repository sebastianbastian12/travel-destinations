const express = require('express');
const router = express.Router();

router.use('/airlines', require('./airlines.r'));
router.use('/destinations', require('./destinations.r'));

module.exports = router;
