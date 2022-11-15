const { expect } = require('chai');
const sinon = require('sinon');
const {productsModel} = require('../../../src/models');
const {productsService} = require('../../../src/services');

const { allProducts, expected, payload } = require('./mocks/products.service.mock');

describe('Verificando service Products', function () {
  afterEach(sinon.restore);

  it('Retornando todos os produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(allProducts)

    const result = await productsService.findAll();

    expect(result.message).to.deep.equal(expected)
  })

  it('Retornando um produto específico', async function () {
    sinon.stub(productsModel, 'findById').resolves([[allProducts[0]]]);

    const result = await productsService.findById(payload);

    expect(result.message).to.deep.equal([[allProducts[0]]]);
  })

  it('Mensagem de erro ao inserir id invalido', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);

    const result = await productsService.findById(4);

    expect(result.type).to.equal('Mensagem Service erro')
  })
})