const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const { allSales, payload } = require('./mocks/sales.service.mock');

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

  // it('Adicionando um novo produto ao Database', async function () {
  //   sinon.stub(productsModel, 'insert').resolves(correctId);
  //   sinon.stub(productsModel, 'findById').resolves(expectedInsert);

  //   const result = await productsService.insert(nameProduct);

  //   expect(result.type).to.deep.equal(null);
  //   expect(result.message).to.deep.equal(expectedInsert);
  // });

  // describe('Atualizando um produto no DB', function () {
  //   it('Com um id valido, retorna objeto com resultado', async function () {
  //     sinon.stub(productsModel, 'updateById').resolves();
  //     sinon.stub(productsModel, 'findById').resolves(expectedUpdate)

  //     const result = await productsService.updateById(nameUpdate, payload);

  //     expect(result.type).to.deep.equal(null);
  //     expect(result.message).to.deep.equal(expectedUpdate)
  //   });

  //   it('com um id invalido, retorna erro "id not found"', async function () {
  //     sinon.stub(productsModel, 'updateById').resolves();
  //     sinon.stub(productsModel, 'findById').resolves(undefined)

  //     const result = await productsService.updateById(nameUpdate);

  //     expect(result.type).to.deep.equal('ID_NOT_FOUND');
  //     expect(result.message).to.deep.equal('id not found');
  //   })
  // });

  describe('Deletando umproduto no DB', function () {
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
})