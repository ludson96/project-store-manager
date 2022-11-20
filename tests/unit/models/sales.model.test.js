const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { allSales, payload, expectedUpdate, update, insertNewSale, newIdSale } = require('./mocks/sales.model.mock');

describe('Teste de unidade da camada model sales', function () {
  afterEach(sinon.restore);

  it('Listando todos os produtos do DB', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await salesModel.getAllSales();

    expect(result).to.deep.equal(allSales);
  });

  it('Listando produto específico, pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([allSales[0]]);

    const result = await salesModel.getByIdSales(payload);

    expect(result).to.deep.equal(allSales[0]);
  });

  it('Adicionando novo produto no DB', async function () {
    sinon.stub(connection, 'execute').resolves([newIdSale])
  

    const result = await salesModel.insert(insertNewSale);
    console.log('Eu sou o result do teste: ', result );

    expect(result).to.deep.equal(newIdSale);
  });

  it('Atualizando um produto no DB', async function () {
    sinon.stub(connection, 'execute').resolves([expectedUpdate]);

    await salesModel.updateByIdSales(update, payload);
    const result = await salesModel.getByIdSales(payload);

    expect(result).to.deep.equal(expectedUpdate);
  });

  it('Deletando um produto no DB', async function () {
    sinon.stub(connection, 'execute').resolves();

    const result = await salesModel.deleteByIdSales(payload);

    expect(result).to.deep.equal();
  })
});