const request = require('supertest');
const app = require('../../app');
const db = require('../../data/database.destinationPlans');

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    db.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

describe('GET /destinationPlans/:destinationPlanId', () => {
  test('should return a specific destination plan by id record', async () => {
    let destinationPlanId = '6756fdfaf762391e6375f236';
    const res = await request(app).get(
      `/destinationPlans/${destinationPlanId}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', destinationPlanId);
    expect(res.body).toHaveProperty('Hotel');
    expect(res.body).toHaveProperty('CityGuide');
    expect(res.body).toHaveProperty('Bufete');
    expect(res.body).toHaveProperty('SeaTravel');
    expect(res.body).toHaveProperty('Spa');
    expect(res.body).toHaveProperty('PlayGround');
    expect(res.body).toHaveProperty('BoatTrip');
  });
});
