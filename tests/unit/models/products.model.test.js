const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allProducts, payload, correctId, nameProduct, expectedUpdate, nameUpdate } = require('./mocks/products.model.mock');

describe('Teste de unidade da camada model Products', function () {
  afterEach(sinon.restore);

  it('Listando todos os produtos do DB', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    
    const result = await productsModel.findAll();
    
    expect(result).to.deep.equal(allProducts);
  });

  it('Listando produto específico, pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);
    
    const result = await productsModel.findById(payload);
    
    expect(result).to.deep.equal(allProducts[0]);
  });

  it('Adicionando novo produto no DB', async function () {
    sinon.stub(connection, 'execute').resolves([correctId]);

    const result = await productsModel.insert(nameProduct);

    expect(result).to.deep.equal(4);
  });
  
  it('Atualizando um produto no DB', async function () {
    sinon.stub(connection, 'execute').resolves(expectedUpdate);

    const result = await productsModel.updateById(nameUpdate, payload);

    expect(result).to.deep.equal(expectedUpdate);
  });

  it('Deletando um produto no DB', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await productsModel.deleteById(payload);

    expect(result).to.deep.equal();
  })

});