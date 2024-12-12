const router = require('express').Router();

const airlinesControllers = require('../controllers/airlines.controllers');
const {
  airlineValidatorId,
  createAirlineValidator,
  validate,
} = require('../validator');

const { isAuthenticated } = require('../authenticate');

router.get('/', airlinesControllers.getAllAirlines);

router.get(
  '/:airlineId',
  airlineValidatorId(),
  validate,
  airlinesControllers.getSingleAirline
);

router.post(
  '/',
  isAuthenticated,
  createAirlineValidator(),
  validate,
  airlinesControllers.postAirline
);

router.put(
  '/:airlineId',
  isAuthenticated,
  airlineValidatorId(),
  createAirlineValidator(),
  validate,
  airlinesControllers.updateAirline
);

router.delete(
  '/:airlineId',
  isAuthenticated,
  airlineValidatorId(),
  validate,
  airlinesControllers.deleteAirline
);

module.exports = router;
