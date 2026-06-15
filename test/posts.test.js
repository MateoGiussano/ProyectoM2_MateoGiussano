const { loadEnvFile } = require('node:process');
loadEnvFile('.env');

const request = require('supertest');
const server = require('../src/server');

describe('Posts endpoints', () => {

  test('GET /posts - devuelve lista de posts', async () => {
    const res = await request(server).get('/posts');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /posts/:id - devuelve un post', async () => {
    const res = await request(server).get('/posts/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
  });

  test('GET /posts/:id - devuelve 404 si no existe', async () => {
    const res = await request(server).get('/posts/9999');
    expect(res.status).toBe(404);
  });

  test('POST /posts - crea un post', async () => {
    const res = await request(server).post('/posts').send({
      title: 'Post de prueba',
      content: 'Contenido de prueba',
      author_id: 1,
      published: false
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', 'Post de prueba');
  });

  test('POST /posts - devuelve 400 si falta title', async () => {
    const res = await request(server).post('/posts').send({
      content: 'Contenido de prueba',
      author_id: 1
    });
    expect(res.status).toBe(400);
  });

});