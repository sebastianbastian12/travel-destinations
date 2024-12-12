const router = require('express').Router();

const destinationPlansControllers = require('../controllers/destinationPlans.controllers');
const {
  destinationPlanValidatorId,
  createDestinationPlanValidator,
  validate,
} = require('../validator');

const { isAuthenticated } = require('../authenticate');

router.get('/', destinationPlansControllers.getAllDestinationPlans);

router.get(
  '/:destinationPlanId',
  destinationPlanValidatorId(),
  validate,
  destinationPlansControllers.getSingleDestinationPlan
);

router.post(
  '/',
  isAuthenticated,
  createDestinationPlanValidator(),
  validate,
  destinationPlansControllers.postDestinationPlan
);

router.put(
  '/:destinationPlanId',
  isAuthenticated,
  destinationPlanValidatorId(),
  createDestinationPlanValidator(),
  validate,
  destinationPlansControllers.updateDestinationPlan
);

router.delete(
  '/:destinationPlanId',
  isAuthenticated,
  destinationPlanValidatorId(),
  validate,
  destinationPlansControllers.deleteDestinationPlan
);

module.exports = router;
