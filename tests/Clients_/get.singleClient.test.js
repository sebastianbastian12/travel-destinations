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

describe('GET /clients/:clientId', () => {
  test('should return a specific client by id record', async () => {
    let clientId = '67570540f762391e6375f23a';
    const res = await request(app).get(`/clients/${clientId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', clientId);
    expect(res.body).toHaveProperty('Age');
    expect(res.body).toHaveProperty('Country');
    expect(res.body).toHaveProperty('FullName');
    expect(res.body).toHaveProperty('Id');
  });
});
