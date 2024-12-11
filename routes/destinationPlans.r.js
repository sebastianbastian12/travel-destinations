const router = require('express').Router();

const destinationPlansControllers = require('../controllers/destinationPlans.controllers');
const {
  destinationValidatorId,
  createDestinationPlanValidator,
  validate,
} = require('../validator');

router.get('/', destinationPlansControllers.getAllDestinationPlans);

router.get(
  '/:destinationPlanId',
  destinationValidatorId(),
  validate,
  destinationPlansControllers.getSingleDestinationPlan
);

router.post(
  '/',
  createDestinationPlanValidator(),
  validate,
  destinationPlansControllers.postDestinationPlan
);

router.put(
  '/:destinationPlanId',
  destinationValidatorId(),
  createDestinationPlanValidator(),
  validate,
  destinationPlansControllers.updateDestinationPlan
);

router.delete(
  '/:destinationPlanId',
  destinationValidatorId(),
  validate,
  destinationPlansControllers.deleteDestinationPlan
);

module.exports = router;
