import request from 'supertest';
import app from '../src/app';

describe('Health & Root Endpoints', () => {
  it('GET /health should return 200 and healthy database status', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
    expect(response.body.database).toBe('connected');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('GET / should redirect browser to /api-docs', async () => {
    const response = await request(app).get('/').set('Accept', 'text/html');

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe('/api-docs');
  });

  it('GET / should return 200 with documentation link when requesting json', async () => {
    const response = await request(app).get('/').set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.documentation).toBe('/api-docs');
    expect(response.body.health).toBe('/health');
  });
});
