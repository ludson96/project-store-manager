const { expect } = require('chai');
const sinon = require('sinon');
const {productsModel} = require('../../../src/models');
const {productsService} = require('../../../src/services');

const { allProducts, expected, payload, correctId, nameProduct, expectedInsert } = require('./mocks/products.service.mock');

describe('Teste de unidade da camdada service Products', function () {
  afterEach(sinon.restore);

  it('Listando todos os produtos do DB', async function () {
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

  it('Adicionando um novo produto ao Database', async function () {
    sinon.stub(productsModel, 'insert').resolves(correctId);
    sinon.stub(productsModel, 'findById').resolves(expectedInsert)

    const result = await productsService.insert(nameProduct);

    expect(result.type).to.deep.equal(null);
    expect(result.message).to.deep.equal(expectedInsert)
  })
})