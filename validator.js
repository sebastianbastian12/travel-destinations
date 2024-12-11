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

//Destination Plans validators
const destinationPlanValidatorId = () => {
  return [
    param('destinationPlanId')
      .isMongoId()
      .withMessage('Invalid destination plan id'),
  ];
};

const createDestinationPlanValidator = () => {
  return [
    body('Hotel')
      .exists({ checkFalsy: true })
      .withMessage('Hotel is a require field')
      .isString()
      .withMessage('Hotel must be a string value'),

    body('CityGuide')
      .exists({ checkFalsy: true })
      .withMessage('CityGuide is a require field')
      .isString()
      .withMessage('CityGuide must be a string value'),

    body('Bufete')
      .exists({ checkFalsy: true })
      .withMessage('Bufete is a require field')
      .isString()
      .withMessage('Bufete must be a string value'),

    body('SeaTravel')
      .exists({ checkFalsy: true })
      .withMessage('SeaTravel is a require field')
      .isString()
      .withMessage('SeaTravel must be a string value'),

    body('Spa')
      .exists({ checkFalsy: true })
      .withMessage('Spa is a require field')
      .isString()
      .withMessage('Spa must be a string value'),

    body('PlayGround')
      .exists({ checkFalsy: true })
      .withMessage('PlayGround is a require field')
      .isString()
      .withMessage('PlayGround must be a string value'),

    body('BoatTrip')
      .exists({ checkFalsy: true })
      .withMessage('BoatTrip is a require field')
      .isString()
      .withMessage('BoatTrip must be a string value'),
  ];
};

//Client validators
const clientValidatorId = () => {
  return [param('clientId').isMongoId().withMessage('Invalid client id')];
};

const createClientValidator = () => {
  return [
    body('Age')
      .exists({ checkFalsy: true })
      .withMessage('Age is a require field')
      .isString()
      .withMessage('Age must be a string value'),

    body('Country')
      .exists({ checkFalsy: true })
      .withMessage('Country is a require field')
      .isString()
      .withMessage('Country must be a string value'),

    body('FullName')
      .exists({ checkFalsy: true })
      .withMessage('FullName is a require field')
      .isString()
      .withMessage('FullName must be a string value'),

    body('Id')
      .exists({ checkFalsy: true })
      .withMessage('Id is a require field')
      .isString()
      .withMessage('Id must be a string value'),
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
  destinationPlanValidatorId,
  createDestinationPlanValidator,
  clientValidatorId,
  createClientValidator,
  validate,
};
