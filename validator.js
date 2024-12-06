const { body, param, validationResult } = require('express-validator');

//Destinations validators
const destinationValidatorId = () => {
  return [
    param('destinationId').isMongoId().withMessage('Invalid destination id'),
  ];
};

const createDestinationValidator = () => {
  return [
    body('City')
      .exists({ checkFalsy: true })
      .withMessage('City is a require field')
      .isString()
      .withMessage('City must be a string value'),

    body('Country')
      .exists({ checkFalsy: true })
      .withMessage('Country is a require field')
      .isString()
      .withMessage('Country must be a string value'),
  ];
};

//Airlines validators
const airlineValidatorId = () => {
  return [param('airlineId').isMongoId().withMessage('Invalid airline id')];
};

const createAirlineValidator = () => {
  return [
    body('Airline')
      .exists({ checkFalsy: true })
      .withMessage('Airline is a require field')
      .isString()
      .withMessage('Airline must be a string value'),

    body('Country')
      .exists({ checkFalsy: true })
      .withMessage('Country is a require field')
      .isString()
      .withMessage('Country must be a string value'),
  ];
};

//Validate function
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  destinationValidatorId,
  createDestinationValidator,
  airlineValidatorId,
  createAirlineValidator,
  validate,
};
