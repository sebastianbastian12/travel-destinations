const request = require('supertest');
const app = require('../../app');
const db = require('../../data/database.clients');

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    db.initDb((err) => {
      if (err) reject(err);
      else resolve();
    });
  });
});

describe('GET /clients', () => {
  test('should return a clients list', async () => {
    const res = await request(app).get('/clients');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    res.body.forEach((destination) => {
      expect(destination).toHaveProperty('_id');
      expect(destination).toHaveProperty('Age');
      expect(destination).toHaveProperty('Country');
      expect(destination).toHaveProperty('FullName');
      expect(destination).toHaveProperty('Id');
    });
  });
});
