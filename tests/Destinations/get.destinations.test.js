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

describe('GET /destinations', () => {
  test('should return a destinations list', async () => {
    const res = await request(app).get('/destinations');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((destination) => {
      expect(destination).toHaveProperty('_id');
      expect(destination).toHaveProperty('City');
      expect(destination).toHaveProperty('Country');
    });
  });
});
