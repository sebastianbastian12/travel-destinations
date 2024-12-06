const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Travel Destination || API',
    description: 'API interface documentation for Travel Destination Site',
    version: '1.0.0',
  },
  host: 'localhost:3012',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointfiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointfiles, doc);
