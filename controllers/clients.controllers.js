const { ObjectId } = require('mongodb');
const mongodb = require('../data/database.clients');

const getAllClients = async (req, res) => {
  //#Swagger.tags=['clients']
  try {
    const client = await mongodb
      .getDatabase()
      .collection('clients')
      .find()
      .toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(client);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the clients' });
  }
};

const getSingleClient = async (req, res) => {
  //#Swagger.tags=['clients']
  try {
    const clientId = ObjectId.createFromHexString(req.params.clientId);
    const client = await mongodb
      .getDatabase()
      .collection('clients')
      .findOne({ _id: clientId });

    if (client) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(client);
    } else {
      res.status(404).json({ message: 'Client not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving the client' });
  }
};

const postClient = async (req, res) => {
  //#Swagger.tags=['clients']
  try {
    const clientTemplate = {
      Age: req.body.Age,
      Country: req.body.Country,
      fullName: req.body.fullName,
      Id: req.body.Id,
    };
    const client = await mongodb
      .getDatabase()
      .collection('clients')
      .insertOne(clientTemplate);
    if (client.acknowledged) {
      res.status(201).json({ message: 'Client created successfully' });
    } else {
      res.status(500).json({
        message: 'Error creating the client',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating the client' });
  }
};

const updateClient = async (req, res) => {
  //#Swagger.tags=['clients']
  try {
    const clientId = ObjectId.createFromHexString(req.params.clientId);
    const updateClientTemplate = {
      Age: req.body.Age,
      Country: req.body.Country,
      fullName: req.body.fullName,
      Id: req.body.Id,
    };
    const client = await mongodb
      .getDatabase()
      .collection('clients')
      .replaceOne({ _id: clientId }, updateClientTemplate);

    if (client.modifiedCount > 0) {
      res.status(200).json({ message: 'Client updated successfully' });
    } else {
      res.status(404).json({
        message: 'Client not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating the client' });
  }
};

const deleteClient = async (req, res) => {
  //#Swagger.tags=['clients']
  try {
    const clientId = ObjectId.createFromHexString(req.params.clientId);
    const client = await mongodb
      .getDatabase()
      .collection('clients')
      .deleteOne({ _id: clientId });
    if (client.deletedCount > 0) {
      res.status(200).json({ message: 'Client deleted successfully' });
    } else {
      res.status(404).json({
        message: 'Client not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting the client' });
  }
};

module.exports = {
  getAllClients,
  getSingleClient,
  postClient,
  updateClient,
  deleteClient,
};
