import request from 'supertest';
import app from '../src/app';

describe('Products Endpoints (Integration)', () => {
  it('GET /products should return all products with 200 OK', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('GET /products/:id should return 200 and product data when found', async () => {
    const response = await request(app).get('/products/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      name: 'Martelo de Thor',
    });
  });

  it('GET /products/:id should return 404 when product is not found', async () => {
    const response = await request(app).get('/products/9999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Product not found');
  });

  it('POST /products should create a new product and return 201', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'Capa da Invisibilidade' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('Capa da Invisibilidade');
  });

  it('POST /products should return 400 when name is missing', async () => {
    const response = await request(app).post('/products').send({});

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"name" is required');
  });

  it('POST /products should return 422 when name has less than 5 chars', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'Thor' });

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('"name" length must be at least 5 characters long');
  });

  it('GET /products/search?q=... should filter products', async () => {
    const response = await request(app).get('/products/search?q=Thor');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0].name).toContain('Thor');
  });
});
