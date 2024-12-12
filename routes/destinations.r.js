const router = require('express').Router();

const destinationControllers = require('../controllers/destinations.controllers');
const {
  destinationValidatorId,
  createDestinationValidator,
  validate,
} = require('../validator');

const { isAuthenticated } = require('../authenticate');

router.get('/', destinationControllers.getAllDestinations);

router.get(
  '/:destinationId',
  destinationValidatorId(),
  validate,
  destinationControllers.getSingleDestination
);

router.post(
  '/',
  isAuthenticated,
  createDestinationValidator(),
  validate,
  destinationControllers.postDestination
);

router.put(
  '/:destinationId',
  isAuthenticated,
  destinationValidatorId(),
  createDestinationValidator(),
  validate,
  destinationControllers.updateDestination
);

router.delete(
  '/:destinationId',
  isAuthenticated,
  destinationValidatorId(),
  validate,
  destinationControllers.deleteDestination
);

module.exports = router;
