const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProducts } = require

describe('Testando o endpoint GET', function () {
  afterEach(sinon.restore);

  it('Recuperando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productsModel.findAll();

    expect(result).to.deep.equal(allProducts)
  
  })
})