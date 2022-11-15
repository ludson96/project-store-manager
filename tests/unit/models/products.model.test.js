const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProducts, payload } = require('./mocks/products.model.mock')

describe('Verificando camada model de Products', function () {
  afterEach(sinon.restore);

  it('Recuperando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productsModel.findAll();

    expect(result).to.deep.equal(allProducts)
  
  })

  it('Recuperando um produto especifico', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    
    const result = await productsModel.findById(payload);
    
    expect(result).to.deep.equal(allProducts[0])
  })
})