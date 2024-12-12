const express = require('express');
const router = express.Router();
const passport = require('passport');

//Calling all the routes
router.use('/airlines', require('./airlines.r'));
router.use('/destinations', require('./destinations.r'));
router.use('/destinationPlans', require('./destinationPlans.r'));
router.use('/clients', require('./clients.r'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;
