import request from 'supertest';
import app from '../src/app';

describe('Sales Endpoints (Integration)', () => {
  it('GET /sales should return all sales with 200 OK', async () => {
    const response = await request(app).get('/sales');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
    expect(response.body[0]).toHaveProperty('saleId');
    expect(response.body[0]).toHaveProperty('productId');
    expect(response.body[0]).toHaveProperty('quantity');
  });

  it('GET /sales/:id should return 200 and sale items when found', async () => {
    const response = await request(app).get('/sales/1');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('productId');
  });

  it('GET /sales/:id should return 404 when sale does not exist', async () => {
    const response = await request(app).get('/sales/9999');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Sale not found');
  });

  it('POST /sales should create sale with multiple products atomically', async () => {
    const response = await request(app)
      .post('/sales')
      .send([
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 4 },
      ]);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.itemsSold).toHaveLength(2);
  });

  it('POST /sales should return 404 when one of the products does not exist', async () => {
    const response = await request(app)
      .post('/sales')
      .send([
        { productId: 1, quantity: 2 },
        { productId: 99999, quantity: 1 },
      ]);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });

  it('POST /sales should return 422 when quantity is 0 or negative', async () => {
    const response = await request(app)
      .post('/sales')
      .send([{ productId: 1, quantity: 0 }]);

    expect(response.status).toBe(422);
    expect(response.body.message).toBe('"quantity" must be greater than or equal to 1');
  });
});
