const request = require('supertest');
const app = require('../../app');
const db = require('../../data/database.destinationPlans');

beforeAll(async () => {
  try {
    await new Promise((resolve, reject) => {
      db.initDb((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Destinations database initialized');
  } catch (error) {
    console.log('Error during execution');
  }
});

describe('GET /destinationPlans', () => {
  test('should return a destination plans list', async () => {
    const res = await request(app).get('/destinationPlans');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((destination) => {
      expect(destination).toHaveProperty('_id');
      expect(destination).toHaveProperty('Hotel');
      expect(destination).toHaveProperty('CityGuide');
      expect(destination).toHaveProperty('Bufete');
      expect(destination).toHaveProperty('SeaTravel');
      expect(destination).toHaveProperty('Spa');
      expect(destination).toHaveProperty('PlayGround');
      expect(destination).toHaveProperty('BoatTrip');
    });
  });
});
