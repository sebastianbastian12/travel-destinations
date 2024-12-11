const router = require('express').Router();

const destinationPlansControllers = require('../controllers/destinationPlans.controllers');
const {
  destinationPlanValidatorId,
  createDestinationPlanValidator,
  validate,
} = require('../validator');

router.get('/', destinationPlansControllers.getAllDestinationPlans);

router.get(
  '/:destinationPlanId',
  destinationPlanValidatorId(),
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
  destinationPlanValidatorId(),
  createDestinationPlanValidator(),
  validate,
  destinationPlansControllers.updateDestinationPlan
);

router.delete(
  '/:destinationPlanId',
  destinationPlanValidatorId(),
  validate,
  destinationPlansControllers.deleteDestinationPlan
);

module.exports = router;
