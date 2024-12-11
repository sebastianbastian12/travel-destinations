const { ObjectId } = require('mongodb');
const mongodb = require('../data/database.destinationPlans');

const getAllDestinationPlans = async (req, res) => {
  //#Swagger.tags=['destinationPlans']
  try {
    const destinationPlan = await mongodb
      .getDatabase()
      .collection('destinationPlans')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(destinationPlan);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the destination plan' });
  }
};

const getSingleDestinationPlan = async (req, res) => {
  //#Swagger.tags=['destinationPlans']
  try {
    const destinationId = ObjectId.createFromHexString(
      req.params.destinationId
    );
    const destinationPlan = await mongodb
      .getDatabase()
      .collection('destinationPlans')
      .findOne({ _id: destinationId });

    if (destinationPlan) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(destinationPlan);
    } else {
      res.status(404).json({ message: 'Destination plan not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the destination plan' });
  }
};

const postDestinationPlan = async (req, res) => {
  //#Swagger.tags=['destinationPlans']
  try {
    const destinationPlanTemplate = {
      Hotel: req.body.Hotel,
      CityGuide: req.body.CityGuide,
      Bufete: req.body.Bufete,
      SeaTravel: req.body.SeaTravel,
      Spa: req.body.Spa,
      PlayGround: req.body.PlayGround,
      BoatTrip: req.body.BoatTrip,
    };
    const destinationPlan = await mongodb
      .getDatabase()
      .collection('destinationPlans')
      .insertOne(destinationPlanTemplate);
    if (destinationPlan.acknowledged) {
      res
        .status(201)
        .json({ message: 'Destination plan created successfully' });
    } else {
      res.status(500).json({
        message: 'Error creating the destination plan',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating the destination plan' });
  }
};

const updateDestinationPlan = async (req, res) => {
  //#Swagger.tags=['destinationPlans']
  try {
    const destinationId = ObjectId.createFromHexString(
      req.params.destinationId
    );
    const updateDestinationPlanTemplate = {
      Hotel: req.body.Hotel,
      CityGuide: req.body.CityGuide,
      Bufete: req.body.Bufete,
      SeaTravel: req.body.SeaTravel,
      Spa: req.body.Spa,
      PlayGround: req.body.PlayGround,
      BoatTrip: req.body.BoatTrip,
    };
    const destinationPlan = await mongodb
      .getDatabase()
      .collection('destinationPlans')
      .replaceOne({ _id: destinationId }, updateDestinationPlanTemplate);

    if (destinationPlan.modifiedCount > 0) {
      res
        .status(200)
        .json({ message: 'Destination plan updated successfully' });
    } else {
      res.status(404).json({
        message: 'Destination plan not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating the destination plan' });
  }
};

const deleteDestinationPlan = async (req, res) => {
  //#Swagger.tags=['destinationPlans']
  try {
    const destinationId = ObjectId.createFromHexString(
      req.params.destinationId
    );
    const destinationPlan = await mongodb
      .getDatabase()
      .collection('destinationPlans')
      .deleteOne({ _id: destinationId });
    if (destinationPlan.deletedCount > 0) {
      res
        .status(200)
        .json({ message: 'Destination plan deleted successfully' });
    } else {
      res.status(404).json({
        message: 'Destination plan not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting the destination plan' });
  }
};

module.exports = {
  getAllDestinationPlans,
  getSingleDestinationPlan,
  postDestinationPlan,
  updateDestinationPlan,
  deleteDestinationPlan,
};
