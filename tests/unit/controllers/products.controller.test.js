const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProducts, expected, nameProduct, expectedInsert } = require('./mocks/products.controller.mock');

describe('Teste de unidade da camada controller Products', function () {
  afterEach(sinon.restore);

  it('Retornando todos os produtos', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findAll')
      .resolves({ type: null, message: allProducts });
    
    await productsController.findAll(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(expected);
  });

  describe('Retornando produto específico', function () {
    it('com id inexistente status 404 e mensagem "Product not found"', async function () {
      const req = { params: { id: 9999 } };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'findById')
        .resolves({ type: 'qualqure coisa', message: 'Product not found' });

      await productsController.findById(req, res);
      
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  
    it('com id válido status 200 e objeto com resultado especifico', async function () {
      const req = { params: { id: 1 } };
      const res = {};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(productsService, 'findById')
      .resolves({ type: null, message: allProducts[0] });
      
      await productsController.findById(req, res);
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });
  });

  it('Cadastrar novo produto no Database', async function () {
    const req = { body: nameProduct };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'insert')
      .resolves({ type: null, message: expectedInsert });
    
    await productsController.insert(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(expectedInsert);
  });
});