const { ObjectId } = require('mongodb');
const mongodb = require('../data/database.airlines');

const getAllAirlines = async (req, res) => {
  //#Swagger.tags=['airlines']
  try {
    const airline = await mongodb
      .getDatabase()
      .collection('airlines')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(airline);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the airline' });
  }
};

const getSingleAirline = async (req, res) => {
  //#Swagger.tags=['airlines']
  try {
    const airlineId = ObjectId.createFromHexString(req.params.airlineId);
    const airline = await mongodb
      .getDatabase()
      .collection('airlines')
      .findOne({ _id: airlineId });

    if (airline) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(airline);
    } else {
      res.status(404).json({ message: 'Airline not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the airline' });
  }
};

const postAirline = async (req, res) => {
  //#Swagger.tags=['airlines']
  try {
    const airlineTemplate = {
      Airline: req.body.Airline,
      Country: req.body.Country,
    };
    const airline = await mongodb
      .getDatabase()
      .collection('airlines')
      .insertOne(airlineTemplate);
    if (airline.acknowledged) {
      res.status(201).json({ message: 'Airline created successfully' });
    } else {
      res.status(500).json({
        message: 'Error creating the airline',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating the airline' });
  }
};

const updateAirline = async (req, res) => {
  //#Swagger.tags=['airlines']
  try {
    const airlineId = ObjectId.createFromHexString(req.params.airlineId);
    const updateTemplate = {
      Airline: req.body.Airline,
      Country: req.body.Country,
    };
    const airline = await mongodb
      .getDatabase()
      .collection('airlines')
      .replaceOne({ _id: airlineId }, updateTemplate);

    if (airline.modifiedCount > 0) {
      res.status(200).json({ message: 'Airline updated successfully' });
    } else {
      res.status(404).json({
        message: 'Airline not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating the airline' });
  }
};

const deleteAirline = async (req, res) => {
  //#Swagger.tags=['airlines']
  try {
    const airlineId = ObjectId.createFromHexString(req.params.airlineId);
    const airline = await mongodb
      .getDatabase()
      .collection('airlines')
      .deleteOne({ _id: airlineId });
    if (airline.deletedCount > 0) {
      res.status(200).json({ message: 'Airline deleted successfully' });
    } else {
      res.status(404).json({
        message: 'Airline not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting the airline' });
  }
};

module.exports = {
  getAllAirlines,
  getSingleAirline,
  postAirline,
  updateAirline,
  deleteAirline,
};
