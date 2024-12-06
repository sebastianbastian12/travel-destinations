const router = require('express').Router();

const airlinesControllers = require('../controllers/airlines.controllers');
const {
  airlineValidatorId,
  createAirlineValidator,
  validate,
} = require('../validator');

router.get('/', airlinesControllers.getAllAirlines);

router.get(
  '/:airlineId',
  airlineValidatorId(),
  validate,
  airlinesControllers.getSingleAirline
);

router.post(
  '/',
  createAirlineValidator(),
  validate,
  airlinesControllers.postAirline
);

router.put(
  '/:airlineId',
  airlineValidatorId(),
  createAirlineValidator(),
  validate,
  airlinesControllers.updateAirline
);

router.delete(
  '/:airlineId',
  airlineValidatorId(),
  validate,
  airlinesControllers.deleteAirline
);

module.exports = router;
