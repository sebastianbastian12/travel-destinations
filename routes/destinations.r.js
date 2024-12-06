const router = require('express').Router();

const destinationControllers = require('../controllers/destinations.controllers');
const {
  destinationValidatorId,
  createDestinationValidator,
  validate,
} = require('../validator');

router.get('/', destinationControllers.getAllDestinations);

router.get(
  '/:destinationId',
  destinationValidatorId(),
  validate,
  destinationControllers.getSingleDestination
);

router.post(
  '/',
  createDestinationValidator(),
  validate,
  destinationControllers.postDestination
);

router.put(
  '/:destinationId',
  destinationValidatorId(),
  createDestinationValidator(),
  validate,
  destinationControllers.updateDestination
);

router.delete(
  '/:destinationId',
  destinationValidatorId(),
  validate,
  destinationControllers.deleteDestination
);

module.exports = router;
