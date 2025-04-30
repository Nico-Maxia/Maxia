const request = require('supertest');
const app = require('../server');

describe('Tests du serveur API', () => {
  test('Route racine renvoie un message de bienvenue', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toBe('API Dashboard Admin Maxia');
  });

  // Note: Ce test nécessite une base de données PostgreSQL configurée
  // Pour des tests isolés, il serait préférable d'utiliser un mock
  test('Route de test de la base de données', async () => {
    const response = await request(app).get('/api/test-db');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status');
    expect(response.body.status).toBe('success');
  });
}); 