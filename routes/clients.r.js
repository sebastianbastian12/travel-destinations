const router = require('express').Router();

const clientsControllers = require('../controllers/clients.controllers');
const {
  clientValidatorId,
  createClientValidator,
  validate,
} = require('../validator');

router.get('/', clientsControllers.getAllClients);

router.get(
  '/:clientId',
  clientValidatorId(),
  validate,
  clientsControllers.getSingleClient
);

router.post(
  '/',
  createClientValidator(),
  validate,
  clientsControllers.postClient
);

router.put(
  '/:clientId',
  clientValidatorId(),
  createClientValidator(),
  validate,
  clientsControllers.updateClient
);

router.delete(
  '/:clientId',
  clientValidatorId(),
  validate,
  clientsControllers.deleteClient
);

module.exports = router;
