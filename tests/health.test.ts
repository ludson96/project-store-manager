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

  it('GET / should return 200 with documentation link', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body.documentation).toBe('/api-docs');
    expect(response.body.health).toBe('/health');
  });
});
