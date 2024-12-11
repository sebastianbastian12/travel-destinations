const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUi = require('swagger-ui-express');

const PORT = process.env.PORT || 3012;
const mongodbDestinations = require('./data/database.destinations');
const mongodbAirlines = require('./data/database.airlines');
const mongodbDestinationPlans = require('./data/database.destinationPlans');
const mongodbClients = require('./data/database.clients');

const swaggerMainFile = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerMainFile));

/*app.use(
  cors({
    origin: 'http://localhost:3012',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);*/

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Travel Destinations || API');
});

app.use('/', require('./routes/index'));

const initializeDatabases = async () => {
  try {
    await new Promise((resolve, reject) => {
      mongodbDestinations.initDb((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Destinations database initialized');

    await new Promise((resolve, reject) => {
      mongodbAirlines.initDb((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Airlines database initialized');

    await new Promise((resolve, reject) => {
      mongodbDestinationPlans.initDb((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Destination plans database initialized');

    await new Promise((resolve, reject) => {
      mongodbClients.initDb((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Clients database initialized');
  } catch (error) {
    console.error('Error initializing databases', error);
    process.exit(1);
  }
};

initializeDatabases().then(() => {
  app.listen(PORT, () => {
    console.log(`Web server working on port || ${PORT}`);
  });
});
