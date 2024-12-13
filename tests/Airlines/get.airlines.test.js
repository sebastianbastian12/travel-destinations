const request = require('supertest');
const app = require('../../app');
const db = require('../../data/database.airlines');

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    db.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

describe('GET /airlines', () => {
  test('should return a airlines list', async () => {
    const res = await request(app).get('/airlines');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((destination) => {
      expect(destination).toHaveProperty('_id');
      expect(destination).toHaveProperty('Airline');
      expect(destination).toHaveProperty('Country');
    });
  });
});
