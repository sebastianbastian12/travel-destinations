const router = require('express').Router();

const clientsControllers = require('../controllers/clients.controllers');
const {
  clientValidatorId,
  createClientValidator,
  validate,
} = require('../validator');

const { isAuthenticated } = require('../authenticate');

router.get('/', clientsControllers.getAllClients);

router.get(
  '/:clientId',
  clientValidatorId(),
  validate,
  clientsControllers.getSingleClient
);

router.post(
  '/',
  isAuthenticated,
  createClientValidator(),
  validate,
  clientsControllers.postClient
);

router.put(
  '/:clientId',
  isAuthenticated,
  clientValidatorId(),
  createClientValidator(),
  validate,
  clientsControllers.updateClient
);

router.delete(
  '/:clientId',
  isAuthenticated,
  clientValidatorId(),
  validate,
  clientsControllers.deleteClient
);

module.exports = router;
