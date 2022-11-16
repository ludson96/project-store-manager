const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { allSales, payload } = require('./mocks/sales.controller.mock');

describe('Teste de unidade da camada controller Products', function () {
  afterEach(sinon.restore);

  it('Retornando todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getAllSales')
      .resolves({ type: null, message: allSales });

    await salesController.getAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allSales);
  });

  describe('Retornando produto específico', function () {
    it('com id inexistente status 404 e mensagem "Sale not found"', async function () {
      const req = { params: { id: 9999 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getByIdSales')
        .resolves({ type: 'qualqure coisa', message: 'Sale not found' });

      await salesController.getByIdSales(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });

    it('com id válido status 200 e objeto com resultado especifico', async function () {
      const req = { params: { id: 1 } };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(salesService, 'getByIdSales')
        .resolves({ type: null, message: allSales[0] });

      await salesController.getByIdSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales[0]);
    });
  });

  // it('Cadastrar novo produto no Database', async function () {
  //   const req = { body: nameProduct };
  //   const res = {};

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   sinon.stub(productsService, 'insert')
  //     .resolves({ type: null, message: expectedInsert });

  //   await productsController.insert(req, res);

  //   expect(res.status).to.have.been.calledWith(201);
  //   expect(res.json).to.have.been.calledWith(expectedInsert);
  // });
  // describe('Atualizando um produto no banco de dados', function () {
  //   it('retorna status 200 e objeto com resultado', async function () {
  //     const req = { params: payload, body: nameUpdate };
  //     const res = {};

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();

  //     sinon.stub(productsService, 'updateById')
  //       .resolves({ type: null, message: expectedUpdate });

  //     await productsController.updateById(req, res);

  //     expect(res.status).to.have.been.calledWith(200);
  //     expect(res.json).to.have.been.calledWith(expectedUpdate)
  //   });

  //   it('retorna status 404 e mensagem "Product not found"', async function () {
  //     const req = { params: 9999, body: nameUpdate };
  //     const res = {};

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();

  //     sinon.stub(productsService, 'updateById')
  //       .resolves({ type: 'ID_NOT_FOUND', message: 'Product not found' });

  //     await productsController.updateById(req, res);

  //     expect(res.status).to.have.been.calledWith(404);
  //     expect(res.json).to.have.been.calledWith({ message: 'Product not found' })
  //   });
  // });

  // describe('Deletando um produto no DB', function () {
  //   it('Com um id existente', async function () {
  //     const req = { params: payload };
  //     const res = {};

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();

  //     sinon.stub(productsService, 'deleteById')
  //       .resolves({ type: null, message: 'Deletado com sucesso' });

  //     await productsController.deleteById(req, res);

  //     expect(res.status).to.have.been.calledWith(204);
  //     expect(res.json).to.have.been.calledWith({ message: 'Produto deletado com sucesso' })
  //   });

  //   it('Com um id inexistente', async function () {
  //     const req = { params: 99999 };
  //     const res = {};

  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns();

  //     sinon.stub(productsService, 'deleteById')
  //       .resolves({ type: 'ID_NOT_FOUND', message: 'id not found' });

  //     await productsController.deleteById(req, res);

  //     expect(res.status).to.have.been.calledWith(404);
  //     expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  //   });
  // });

  // it('Pesquisando pelo nome do produto', async function () {
  //   const req = { query: 'Martelo' };
  //   const res = {};

  //   res.status = sinon.stub().returns(res);
  //   res.json = sinon.stub().returns();

  //   sinon.stub(productsService, 'search')
  //     .resolves({ type: null, message: allProducts[0] });

  //   await productsController.search(req, res);

  //   expect(res.status).to.have.been.calledWith(200);
  //   expect(res.json).to.have.been.calledWith(allProducts[0])
  // });
});