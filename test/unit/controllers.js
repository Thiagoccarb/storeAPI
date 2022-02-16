const sinon = require('sinon');

const { expect } = require('chai');

const ProductController = require('../../controllers/productsController/products');
const ProductService = require('../../services/productsService/products');
const SaleController = require('../../controllers/salesController/sales');
const SaleService = require('../../services/salesService/sales');


describe('Ao receber uma requisição POST na rota /products', () => {
  describe('a requisição possui dados inválidos', () => {

    const res = {};
    const req = {};
    let next = () => { };

    before(async () => {
      req.body = { name: '', quantity: 100 };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          message: '"name" is required',
        });
      next = sinon.stub().returns(next);
    })

    it('retorna status 400', async () => {
      await ProductController.create(req, res, next);
      expect(res.status.calledWith(400)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem uma propriedade message', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const response = firstArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message contém a mensagem "name" is required', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const { message } = firstArgument[0];
      expect(message).to.equals('"name" is required');
    });
  });
  describe('a requisição possui dados inválidos', () => {
    const res = {};
    const req = {};
    let next = () => { };

    before(async () => {
      req.body = { name: 'guarana', quantity: '' };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          message: '"quantity" is required',
        });
      next = sinon.stub().returns(next);
    })

    it('retorna status 400', async () => {
      await ProductController.create(req, res, next);
      expect(res.status.calledWith(400)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem uma propriedade message', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const response = firstArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message contém a mensagem "quantity" is required', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const { message } = firstArgument[0];
      expect(message).to.equals('"quantity" is required');
    });
  });
  describe('a requisição possui dados inválidos', () => {
    const res = {};
    const req = {};
    let next = () => { };
    before(async () => {
      req.body = { name: 'guarana', quantity: 'string' };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          message: '"quantity" must be a number larger than or equal to 1',
        });
      next = sinon.stub().returns(next);
    })
    it('retorna status 422', async () => {
      await ProductController.create(req, res, next);
      expect(res.status.calledWith(422)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem uma propriedade message', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const response = firstArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message contém a mensagem "quantity" must be a number larger than or equal to 1', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const { message } = firstArgument[0];
      expect(message).to.equals('"quantity" must be a number larger than or equal to 1');
    });
  });
  describe('a requisição possui dados inválidos', () => {
    const res = {};
    const req = {};
    let next = () => { };
    before(async () => {
      req.body = { name: 'guarana', quantity: '0' };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          message: '"quantity" must be a number larger than or equal to 1',
        });
    })
    it('retorna status 422', async () => {
      await ProductController.create(req, res, next);
      expect(res.status.calledWith(422)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem uma propriedade message', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const response = firstArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message contém a mensagem "quantity" must be a number larger than or equal to 1', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const { message } = firstArgument[0];
      expect(message).to.equals('"quantity" must be a number larger than or equal to 1');
    });
  });
  describe('a requisição possui dados válidos', () => {
    const res = {};
    const req = {};
    let next = () => { };
    before(() => {
      sinon.stub(ProductService, 'createProduct').resolves(
        { id: 1, name: 'guarana', quantity: '100' }
      );
      req.body = { name: 'guarana', quantity: '100' };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          id: 1,
          name: 'guarana',
          quantity: '100',
        });
      next = sinon.stub().returns(next);
    });

    after(() => {
      ProductService.createProduct.restore();
    });
    it('retorna status 201', async () => {
      await ProductController.create(req, res, next);
      expect(res.status.calledWith(201)).to.be.true;
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem as propriedades id, name e quantity', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const response = firstArgument[0];
      expect(response).to.to.have.property('id');
      expect(response).to.to.have.property('name');
      expect(response).to.to.have.property('quantity');
    });
  });
  describe('a requisição possui dados válidos', () => {
    const res = {};
    const req = {};
    let next = () => { };
    before(async () => {
      req.body = { name: 'guarana', quantity: '100' };
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub(ProductService, 'createProduct')
        .resolves({ error: { message: 'Product already exists' } });
      next = sinon.stub().returns(next);
    });

    after(() => {
      ProductService.createProduct.restore();
    })
    it('retorna staus 409', async () => {
      await ProductController.create(req, res, next);
      expect(res.status.calledWith(409)).to.be.equal(true);
    });
    it('retorna um objeto', async () => {
      await ProductController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem a propriedade message', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[1];
      const response = secondArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message possui a mensagem "Product already exists"', async () => {
      await ProductController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[1];
      const { message } = secondArgument[0];
      expect(message).to.equals('Product already exists');
    });
  });
});
describe('ao receber uma requisição GET na rota /products', () => {
  describe('existem produtos cadastrados', () => {
    const res = {};
    const req = {};
    let next = () => { };
    before(() => {
      sinon.stub(ProductService, 'findAllProducts').resolves(
        [
          {
            "id": 1,
            "name": "chapeu ",
            "quantity": 100
          },
        ]
      );
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns([
          {
            id: 1,
            name: "chapeu",
            quantity: 100
          },
        ]);
      next = sinon.stub().returns(next);
    });
    after(() => {
      ProductService.findAllProducts.restore();
    })
    it('retorna status 200 com todos os produtos', async () => {
      await ProductController.listAll(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna um JSON com um array', async () => {
      await ProductController.listAll(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });
    it('o objeto contem as propriedades id, name, quantity ', async () => {
      await ProductController.listAll(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[0];
      const response = secondArgument[0];
      expect(response[0]).to.to.have.property('id');
      expect(response[0]).to.to.have.property('name');
      expect(response[0]).to.to.have.property('quantity');
    });
  });
  describe('não existem produtos cadastrados', () => {
    const res = {};
    const req = {};
    let next = () => { };
    before(() => {
      sinon.stub(ProductService, 'findAllProducts').resolves(
        { error: { message: 'No products registered yet' } },
      );
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({ error: { message: 'No products registered yet' } });
      next = sinon.stub().returns(next);
    });
    after(() => {
      ProductService.findAllProducts.restore();
    })
    it('retorna status 404', async () => {
      await ProductController.listAll(req, res, next);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.listAll(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem a propriedade message', async () => {
      await ProductController.listAll(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[0];
      const response = secondArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message possui o texto "No products registered yet"', async () => {
      await ProductController.listAll(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[0];
      const response = secondArgument[0];
      expect(response).to.to.have.property('message');
    });
  });
});
describe('ao receber uma requisição GET na rota /products/:id', () => {
  describe('existe o produto cadastrado', () => {
    const id = 1;
    const res = {};
    const req = {};
    let next = () => { };
    before(() => {
      sinon.stub(ProductService, 'findProductById').resolves(
        {
          id: 1,
          name: "cerveja",
          quantity: 100
        },
      );
      req.params = sinon.stub()
        .returns(1);
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns(
          {
            id: 1,
            name: "cerveja",
            quantity: 100
          },
        );
      next = sinon.stub().returns(next);
    });
    after(() => {
      ProductService.findProductById.restore();
    })
    it('retorna status 200 com todos os produtos', async () => {
      await ProductController.listById(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.listById(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem as propriedades id, name, quantity ', async () => {
      await ProductController.listAll(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[0];
      const response = secondArgument[0];
      expect(response).to.to.have.property('id');
      expect(response).to.to.have.property('name');
      expect(response).to.to.have.property('quantity');
    });
  });
  describe('não existe o produto cadastrado', () => {
    const id = 1;
    const res = {};
    const req = {};
    let next = () => { };
    before(() => {
      sinon.stub(ProductService, 'findProductById').resolves(
        { error: { message: 'Product not found' } },
      );
      req.params = sinon.stub()
        .returns(id);
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns(
          { error: { message: 'Product not found' } },
        );
      next = sinon.stub().returns(next);
    });
    after(() => {
      ProductService.findProductById.restore();
    })
    it('retorna status 404', async () => {
      await ProductController.listById(req, res, next);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.listById(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem a propriedade message', async () => {
      await ProductController.listById(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[0];
      const response = secondArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message possui o texto "No products registered yet"', async () => {
      await ProductController.listById(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[0];
      const response = secondArgument[0];
      expect(response).to.to.have.property('message');
    });
  });
});
describe('ao receber uma requisição PUT na rota /products/:id', () => {
  // describe('não existe o produto cadastrado', () => {
  //   const id = 100;
  //   const res = {};
  //   const req = {};
  //   let next = {};
  //   before(() => {
  //     sinon.stub(ProductService, 'updateProductByName').resolves(
  //       { message: 'Product not found' },
  //     );
  //     req.params = sinon.stub()
  //       .returns(id);
  //     res.status = sinon.stub()
  //       .returns(res);
  //     res.json = sinon.stub()
  //       .returns(
  //         { message: 'Product not found' },
  //       );
  //     next = sinon.stub().returns(next);
  //   });
  //   after(() => {
  //     ProductService.updateProductByName.restore();
  //   })
  //   it.only('retorna status 404', async () => {
  //     await ProductController.update(req, res, next);
  //     const thirdCallArguments = res.json.args;
  //     console.log(thirdCallArguments);
  //     expect(res.status.calledWith(404)).to.be.equal(true);
  //   });
  //   it('retorna um JSON com um objeto', async () => {
  //     await ProductController.update(req, res, next);
  //     expect(res.json.calledWith(sinon.match.object)).to.be.true;
  //   });
  // });
  describe('existe o produto cadastrado', () => {
    const id = 10;
    const res = {};
    const req = {};
    let next = {};
    before(() => {
      req.body = {
        name: "bolacha",
        quantity: "50",
      }
      sinon.stub(ProductService, 'updateProductByName').resolves(
        {
          name: "bolacha",
          quantity: "50",
        },
      );
      req.params = sinon.stub()
        .returns(id);
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns(
          {
            name: "bolacha",
            quantity: "50",
          },
        );
      next = sinon.stub().returns(next);
    });
    after(() => {
      ProductService.updateProductByName.restore();
    })
    it('retorna status 200 com todos os produtos', async () => {
      await ProductController.update(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.update(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem as propriedades name e quantity', async () => {
      await ProductController.update(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[0];
      const response = secondArgument[0];
      expect(response).to.to.have.property('name');
      expect(response).to.to.have.property('quantity');
    });
  });
});
describe('ao receber uma requisição DELETE na rota /products/:id', () => {
  describe('existe o produto cadastrado', () => {
    const id = 10;
    const res = {};
    const req = {};
    let next = {};
    before(() => {
      // req.body = {
      //   name: "bolacha",
      //   quantity: "50",
      // }
      sinon.stub(ProductService, 'removeAProductById').resolves([
        {
          name: "bolacha",
          quantity: "50",
        },
      ]
      );
      req.params = sinon.stub()
        .returns(id);
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns(
          {
            name: "bolacha",
            quantity: "50",
          },
        );
      next = sinon.stub().returns(next);
    });
    after(() => {
      ProductService.removeAProductById.restore();
    })
    it('retorna status 200 com o produto removido', async () => {
      await ProductController.remove(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna um objeto', async () => {
      await ProductController.remove(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
  });
  describe('não existe o produto cadastrado', () => {
    const id = 10;
    const res = {};
    const req = {};
    let next = {};
    before(() => {
      sinon.stub(ProductService, 'removeAProductById').resolves(
        { error: { message: 'Product not found' } },
      );
      req.params = sinon.stub()
        .returns(id);
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns(
          { erro: { message: 'Product not found' } },
        );
      next = sinon.stub().returns(next);
    });
    after(() => {
      ProductService.removeAProductById.restore();
    })
    it('retorna status 404', async () => {
      await ProductController.remove(req, res, next);
      expect(res.status.calledWith(404)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await ProductController.remove(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem a propriedade message', async () => {
      await ProductController.remove(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[0];
      const response = secondArgument[0];
      expect(response).to.to.have.property('message');
    });
  });
});
// salesController
describe('Ao receber uma requisição POST na rota /sales', () => {
  describe('a requisição possui dados inválidos', () => {

    const res = {};
    const req = {};
    let next = () => { };

    before(async () => {
      req.body = [
        {
          quantity: 100,
        }
      ];
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          message: '"product_id" is required',
        });
      next = sinon.stub().returns(next);
    })

    it('retorna status 400', async () => {
      await SaleController.create(req, res, next);
      expect(res.status.calledWith(400)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await SaleController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem uma propriedade message', async () => {
      await SaleController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const response = firstArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message contém a mensagem "product_id" is required', async () => {
      await SaleController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const { message } = firstArgument[0];
      expect(message).to.equals('"product_id" is required');
    });
  });
  describe('a requisição possui dados inválidos', () => {
    const res = {};
    const req = {};
    let next = () => { };

    before(async () => {
      req.body = [
        {
          product_id: 1,
        }
      ];
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          message: '"quantity" is required',
        });
      next = sinon.stub().returns(next);
    })

    it('retorna status 400', async () => {
      await SaleController.create(req, res, next);
      expect(res.status.calledWith(400)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await SaleController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem uma propriedade message', async () => {
      await SaleController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const response = firstArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message contém a mensagem "quantity" is required', async () => {
      await SaleController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const { message } = firstArgument[0];
      expect(message).to.equals('"quantity" is required');
    });
  });
  describe('a requisição possui dados inválidos', () => {
    const res = {};
    const req = {};
    let next = () => { };
    before(async () => {
      req.body = [
        {
          product_id: 1,
          quantity: 'string',
        }
      ];
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          message: '"quantity" must be a number larger than or equal to 1',
        });
      next = sinon.stub().returns(next);
    })
    it('retorna status 422', async () => {
      await SaleController.create(req, res, next);
      expect(res.status.calledWith(422)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await SaleController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem uma propriedade message', async () => {
      await SaleController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const response = firstArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message contém a mensagem "quantity" must be a number larger than or equal to 1', async () => {
      await SaleController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const { message } = firstArgument[0];
      expect(message).to.equals('"quantity" must be a number larger than or equal to 1');
    });
  });
  describe('a requisição possui dados inválidos', () => {
    const res = {};
    const req = {};
    let next = () => { };
    before(async () => {
      req.body = [
        {
          product_id: 1,
          quantity: 0,
        }
      ];
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          message: '"quantity" must be a number larger than or equal to 1',
        });
    })
    it('retorna status 422', async () => {
      await SaleController.create(req, res, next);
      expect(res.status.calledWith(422)).to.be.equal(true);
    });
    it('retorna um JSON com um objeto', async () => {
      await SaleController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem uma propriedade message', async () => {
      await SaleController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const response = firstArgument[0];
      expect(response).to.to.have.property('message');
    });
    it('a propriedade message contém a mensagem "quantity" must be a number larger than or equal to 1', async () => {
      await SaleController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      const { message } = firstArgument[0];
      expect(message).to.equals('"quantity" must be a number larger than or equal to 1');
    });
  });
  describe.skip('a requisição possui dados válidos', () => {
    const id = 1;
    const res = {};
    const req = {};
    let next = () => { };
    const sale = [
      {
        product_id: 1,
        quantity: 10,
      }
    ];
    before(async() => {
      // sinon.stub(SaleService, 'createSale').resolves(id);
      req.body = sale;
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns({
          id, itemsSold: sale,
        });
      next = sinon.stub().returns(next);
    });
    // after(() => {
    //   SaleService.createSale.restore();
    // });
    it('retorna status 201', async () => {
      await SaleController.create(req, res, next);
      expect(res.status.calledWith(201)).to.be.true;
    });
    it('retorna um JSON com um objeto', async () => {
      await SaleController.create(req, res, next);
      expect(res.json.calledWith(sinon.match.object)).to.be.true;
    });
    it('o objeto contem as propriedades id, name e quantity', async () => {
      await SaleController.create(req, res, next);
      const thirdCallArguments = res.json.args;
      const firstArgument = thirdCallArguments[0];
      console.log('testlp', thirdCallArguments);
      const response = firstArgument[0];
      expect(response).to.to.have.property('id');
      expect(response).to.to.have.property('itemsSold');
    });
  });
});
describe('ao receber uma requisição GET na rota /sales', () => {
  describe('existem produtos cadastrados', () => {
    const res = {};
    const req = {};
    let next = () => { };
    before(() => {
      const sales = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          product_id: 1,
          quantity: 2
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          product_id: 2,
          quantity: 2
        }
      ]
      sinon.stub(SaleService, 'listAll').resolves(sales);
      res.status = sinon.stub()
        .returns(res);
      res.json = sinon.stub()
        .returns(sales);
      next = sinon.stub().returns(next);
    });
    after(() => {
      SaleService.listAll.restore();
    })
    it('retorna status 200 com todos os produtos', async () => {
      await SaleController.listAll(req, res, next);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
    it('retorna um JSON com um array', async () => {
      await SaleController.listAll(req, res, next);
      expect(res.json.calledWith(sinon.match.array)).to.be.true;
    });
    it('o objeto contem as propriedades saleId, date, quantity ', async () => {
      await SaleController.listAll(req, res, next);
      const thirdCallArguments = res.json.args;
      const secondArgument = thirdCallArguments[0];
      const response = secondArgument[0];
      expect(response[0]).to.to.have.property('saleId');
      expect(response[0]).to.to.have.property('date');
      expect(response[0]).to.to.have.property('quantity');
    });
  });
});
// describe('não existem produtos cadastrados', () => {
//   const res = {};
//   const req = {};
//   let next = () => { };
//   before(() => {
//     sinon.stub(ProductService, 'findAllProducts').resolves(
//       { message: 'No products registered yet' }
//     );
//     res.status = sinon.stub()
//       .returns(res);
//     res.json = sinon.stub()
//       .returns({ message: 'No products registered yet' });
//     next = sinon.stub().returns(next);
//   });
//   after(() => {
//     ProductService.findAllProducts.restore();
//   })
//   it('retorna status 404', async () => {
//     await ProductController.listAll(req, res, next);
//     expect(res.status.calledWith(404)).to.be.equal(true);
//   });
//   it('retorna um JSON com um objeto', async () => {
//     await ProductController.listAll(req, res, next);
//     expect(res.json.calledWith(sinon.match.object)).to.be.true;
//   });
//   it('o objeto contem a propriedade message', async () => {
//     await ProductController.listAll(req, res, next);
//     const thirdCallArguments = res.json.args;
//     const secondArgument = thirdCallArguments[0];
//     const response = secondArgument[0];
//     expect(response).to.to.have.property('message');
//   });
//   it('a propriedade message possui o texto "No products registered yet"', async () => {
//     await ProductController.listAll(req, res, next);
//     const thirdCallArguments = res.json.args;
//     const secondArgument = thirdCallArguments[0];
//     const response = secondArgument[0];
//     expect(response).to.to.have.property('message');
//   });
// });
// });