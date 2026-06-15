const { loadEnvFile } = require('node:process');
loadEnvFile('.env');

const request = require('supertest');
const server = require('../src/server');

describe('Authors endpoints', () => {

  test('GET /authors - devuelve lista de authors', async () => {
    const res = await request(server).get('/authors');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /authors/:id - devuelve un author', async () => {
    const res = await request(server).get('/authors/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  test('GET /authors/:id - devuelve 404 si no existe', async () => {
    const res = await request(server).get('/authors/9999');
    expect(res.status).toBe(404);
  });

  test('POST /authors - crea un author', async () => {
  const email = `test${Date.now()}@example.com`;
  const res = await request(server).post('/authors').send({
    name: 'Test User',
    email: email,
    bio: 'Bio de prueba'
  });
  expect(res.status).toBe(201);
  expect(res.body).toHaveProperty('name', 'Test User');
});

  test('POST /authors - devuelve 400 si falta name', async () => {
    const res = await request(server).post('/authors').send({
      email: 'test2@example.com'
    });
    expect(res.status).toBe(400);
  });

});