export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Store Manager API',
    version: '2.0.0',
    description:
      'Production-ready RESTful API for Store Management (Products & Sales) built with Node.js, Express, TypeScript, Prisma ORM, and SQLite/MySQL.',
    contact: {
      name: 'Ludson',
      url: 'https://github.com/Ludson96',
    },
  },
  servers: [
    {
      url: '/',
      description: 'Current Server (Dynamic / Automatic Host)',
    },
  ],
  tags: [
    { name: 'Health', description: 'System health and diagnostics' },
    { name: 'Products', description: 'Product catalog management' },
    { name: 'Sales', description: 'Sales and order processing' },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Check API and Database Health',
        responses: {
          '200': {
            description: 'API and database are operational',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'healthy' },
                    timestamp: { type: 'string', example: '2026-09-12T14:40:00.000Z' },
                    uptime: { type: 'number', example: 12.45 },
                    database: { type: 'string', example: 'connected' },
                    environment: { type: 'string', example: 'development' },
                  },
                },
              },
            },
          },
          '503': {
            description: 'Database or critical service unavailable',
          },
        },
      },
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'List all products',
        responses: {
          '200': {
            description: 'List of all registered products',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Product' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new product',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateProductInput' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Product created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          '400': { description: '"name" is required' },
          '422': { description: '"name" length must be at least 5 characters long' },
        },
      },
    },
    '/products/search': {
      get: {
        tags: ['Products'],
        summary: 'Search products by name',
        parameters: [
          {
            name: 'q',
            in: 'query',
            description: 'Name term to filter products',
            schema: { type: 'string' },
          },
        ],
        responses: {
          '200': {
            description: 'Matching products',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Product' },
                },
              },
            },
          },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Get product by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          '200': {
            description: 'Product found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          '404': { description: 'Product not found' },
        },
      },
      put: {
        tags: ['Products'],
        summary: 'Update product by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateProductInput' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Product updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Product' },
              },
            },
          },
          '400': { description: '"name" is required' },
          '404': { description: 'Product not found' },
          '422': { description: '"name" length must be at least 5 characters long' },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete product by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          '204': { description: 'Product deleted successfully' },
          '404': { description: 'Product not found' },
        },
      },
    },
    '/sales': {
      get: {
        tags: ['Sales'],
        summary: 'List all sales and sold items',
        responses: {
          '200': {
            description: 'List of sales with date and item details',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SaleSummary' },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Sales'],
        summary: 'Register a new sale with one or multiple products (Atomic Transaction)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/SaleItemInput' },
                example: [
                  { productId: 1, quantity: 2 },
                  { productId: 2, quantity: 5 },
                ],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Sale registered successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SaleCreatedResponse' },
              },
            },
          },
          '400': { description: 'Missing required field ("productId" or "quantity")' },
          '404': { description: 'One or more products not found' },
          '422': { description: '"quantity" must be greater than or equal to 1' },
        },
      },
    },
    '/sales/{id}': {
      get: {
        tags: ['Sales'],
        summary: 'Get sale details by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          '200': {
            description: 'Sale found',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/SaleDetail' },
                },
              },
            },
          },
          '404': { description: 'Sale not found' },
        },
      },
      put: {
        tags: ['Sales'],
        summary: 'Update sale items by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: { $ref: '#/components/schemas/SaleItemInput' },
                example: [{ productId: 1, quantity: 10 }],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Sale updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/SaleUpdatedResponse' },
              },
            },
          },
          '400': { description: 'Missing required field' },
          '404': { description: 'Sale or product not found' },
          '422': { description: '"quantity" must be greater than or equal to 1' },
        },
      },
      delete: {
        tags: ['Sales'],
        summary: 'Delete sale by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {
          '204': { description: 'Sale deleted successfully' },
          '404': { description: 'Sale not found' },
        },
      },
    },
  },
  components: {
    schemas: {
      Product: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'Martelo de Thor' },
        },
      },
      CreateProductInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', example: 'Martelo de Thor' },
        },
      },
      SaleItemInput: {
        type: 'object',
        required: ['productId', 'quantity'],
        properties: {
          productId: { type: 'integer', example: 1 },
          quantity: { type: 'integer', example: 5 },
        },
      },
      SaleSummary: {
        type: 'object',
        properties: {
          saleId: { type: 'integer', example: 1 },
          date: { type: 'string', format: 'date-time', example: '2026-09-12T14:40:00.000Z' },
          productId: { type: 'integer', example: 1 },
          quantity: { type: 'integer', example: 5 },
        },
      },
      SaleDetail: {
        type: 'object',
        properties: {
          date: { type: 'string', format: 'date-time', example: '2026-09-12T14:40:00.000Z' },
          productId: { type: 'integer', example: 1 },
          quantity: { type: 'integer', example: 5 },
        },
      },
      SaleCreatedResponse: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 3 },
          itemsSold: {
            type: 'array',
            items: { $ref: '#/components/schemas/SaleItemInput' },
          },
        },
      },
      SaleUpdatedResponse: {
        type: 'object',
        properties: {
          saleId: { type: 'integer', example: 1 },
          itemsUpdated: {
            type: 'array',
            items: { $ref: '#/components/schemas/SaleItemInput' },
          },
        },
      },
    },
  },
};
