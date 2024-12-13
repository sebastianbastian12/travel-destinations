const request = require('supertest');
const app = require('../../app');
const db = require('../../data/database.destinations');

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    db.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

describe('GET /destinations/:destinationId', () => {
  test('should return a specific destination by id record', async () => {
    let destinationId = '674f23153c6480afea7a9508';
    const res = await request(app).get(`/destinations/${destinationId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', destinationId);
    expect(res.body).toHaveProperty('City');
    expect(res.body).toHaveProperty('Country');
  });
});
