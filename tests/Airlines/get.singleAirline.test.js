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

describe('GET /destinations/:airlineId', () => {
  test('should return a specific airline by id record', async () => {
    let airlineId = '674f27643c6480afea7a950f';
    const res = await request(app).get(`/airlines/${airlineId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', airlineId);
    expect(res.body).toHaveProperty('Airline');
    expect(res.body).toHaveProperty('Country');
  });
});
