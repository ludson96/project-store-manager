const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { allSales, payload, expectedUpdate, update, retorno, correctId, newSale, retornoNewSale, expectById, productIdSaleWrong } = require('./mocks/sales.service.mock');

describe('Teste de unidade da camdada service Sales', function () {
  afterEach(sinon.restore);

  it('Listando todos os produtos do DB', async function () {
    sinon.stub(salesModel, 'getAllSales').resolves(allSales);

    const result = await salesService.getAllSales();

    expect(result.message).to.deep.equal(allSales);
  });

  it('Retornando um produto específico', async function () {
    sinon.stub(salesModel, 'getByIdSales').resolves([[allSales[0]]]);

    const result = await salesService.getByIdSales(payload);

    expect(result.message).to.deep.equal([[allSales[0]]]);
  });

  it('Mensagem de erro ao inserir id invalido', async function () {
    sinon.stub(salesModel, 'getByIdSales').resolves([]);

    const result = await salesService.getByIdSales(4);

    expect(result.type).to.equal('Mensagem Service erro');
  });


  describe('Atualizando uma venda no DB', function () {
    it('Com um id valido, retorna objeto com resultado', async function () {
      sinon.stub(salesModel, 'getByIdPostSales')
        .onFirstCall()
        .resolves([allSales[0]])
        .onSecondCall()
        .resolves(expectedUpdate);

      const result = await salesService.updateByIdSales(update, payload);

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal(retorno)
    });

    it('com um id invalido, retorna erro "Sale not found"', async function () {
      sinon.stub(salesModel, 'getByIdPostSales').resolves([])

      const result = await salesService.updateByIdSales(update, payload);

      expect(result.type).to.deep.equal('ID_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    })

    it('com um productId inexistente, retorna erro "Product not found"', async function () {

      const result = await salesService.updateByIdSales(productIdSaleWrong);

      expect(result.type).to.deep.equal('DRIVER_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    })
  });

  describe('Deletando um sale no DB', function () {
    it('Com um id existente', async function () {
      sinon.stub(salesModel, 'getByIdSales').resolves([allSales[0]]);
      sinon.stub(salesModel, 'deleteByIdSales').resolves();

      const result = await salesService.deleteByIdSales(1);

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal('Deletado com sucesso');
    });

    it('Com um id inexistente, retorna erro "id not found"', async function () {
      sinon.stub(salesModel, 'getByIdSales').resolves([]);
      sinon.stub(salesModel, 'deleteByIdSales').resolves();

      const result = await salesService.deleteByIdSales();

      expect(result.type).to.deep.equal('ID_NOT_FOUND');
      expect(result.message).to.deep.equal('id not found');
    });
  });

  describe('Adicionando um sale no DB', function () {
    it('com um id existente, retorna o objeto desejado', async function () {
      sinon.stub(salesModel, 'insert').resolves(correctId);
      sinon.stub(salesModel, 'getByIdPostSales').resolves(expectById);

      const result = await salesService.insert(newSale);

      expect(result.type).to.deep.equal(null);
      expect(result.message).to.deep.equal(retornoNewSale);
    });

    it('com um productId inexistente, retorna erro "Product not found"', async function () {

      const result = await salesService.insert(productIdSaleWrong);

      expect(result.type).to.deep.equal('DRIVER_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    })
  });
})