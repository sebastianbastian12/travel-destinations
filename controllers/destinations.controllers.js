const { ObjectId } = require('mongodb');
const mongodb = require('../data/database.destinations');

//#Swagger.tags=['destinations']
const getAllDestinations = async (req, res) => {
  try {
    const destination = await mongodb
      .getDatabase()
      .collection('destinations')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(destination);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving travel destinations' });
  }
};

const getSingleDestination = async (req, res) => {
  //#Swagger.tags=['destinations']
  try {
    const destinationId = ObjectId.createFromHexString(
      req.params.destinationId
    );
    const destination = await mongodb
      .getDatabase()
      .collection('destinations')
      .findOne({ _id: destinationId });

    if (destination) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(destination);
    } else {
      res.status(404).json({ message: 'Travel destination not found' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error retrieving the travel destination' });
  }
};

const postDestination = async (req, res) => {
  //#Swagger.tags=['destinations']
  try {
    const destinationTemplate = {
      City: req.body.City,
      Country: req.body.Country,
    };
    const destination = await mongodb
      .getDatabase()
      .collection('destinations')
      .insertOne(destinationTemplate);
    if (destination.acknowledged) {
      res
        .status(201)
        .json({ message: 'Travel destination created successfully' });
    } else {
      res.status(500).json({
        message: 'Error creating the travel destination',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating the travel destination' });
  }
};

const updateDestination = async (req, res) => {
  //#Swagger.tags=['destinations']
  try {
    const destinationId = ObjectId.createFromHexString(
      req.params.destinationId
    );
    const updateTemplate = {
      City: req.body.City,
      Country: req.body.Country,
    };
    const destination = await mongodb
      .getDatabase()
      .collection('destinations')
      .replaceOne({ _id: destinationId }, updateTemplate);

    if (destination.modifiedCount > 0) {
      res
        .status(200)
        .json({ message: 'Travel destination updated successfully' });
    } else {
      res.status(404).json({
        message: 'Travel destination not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating the travel destination' });
  }
};

const deleteDestination = async (req, res) => {
  //#Swagger.tags=['destinations']
  try {
    const destinationId = ObjectId.createFromHexString(
      req.params.destinationId
    );
    const destination = await mongodb
      .getDatabase()
      .collection('destinations')
      .deleteOne({ _id: destinationId });
    if (destination.deletedCount > 0) {
      res
        .status(200)
        .json({ message: 'Travel destination deleted successfully' });
    } else {
      res.status(404).json({
        message: 'Travel destination not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting the travel destination' });
  }
};

module.exports = {
  getAllDestinations,
  getSingleDestination,
  postDestination,
  updateDestination,
  deleteDestination,
};
