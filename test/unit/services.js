const sinon = require('sinon');

const { expect } = require('chai');
const ProductModel = require('../../models/productsModel/products');
const ProductService = require('../../services/productsService/products');
const SaleService = require('../../services/salesService/sales.js');
const SaleModel = require('../../models/salesModel/sales.js');

describe('cria um produto no banco de dados', () => {
  describe('o produto já existe', () => {
    describe('a resposta', () => {
      const name = 'margarina';
      const quantity = 100;
      before(async () => {
        sinon.stub(ProductModel, 'findByName').resolves([{ id: 5, name: 'margarina', quantity: 10 }]);
      });
      after(async () => {
        ProductModel.findByName.restore();
      });
      it('é um objeto', async () => {
        const response = await ProductService.createProduct(name, quantity);
        expect(response).to.be.an('object');
      });
      it('possui a propriedade error', async () => {
        const response = await ProductService.createProduct(name, quantity);
        expect(response).to.have.property('error');
      });
      it('a propriedade error é um objeto que possui a propriedade message com a frase "product already exists"', async () => {
        const { error: { message } } = await ProductService.createProduct(name, quantity);
        expect(message).to.equals('Product already exists');
      });
    });
  });
  // describe('o produto não existe', () => {
  //   describe('a resposta', () => {
  //     const name = 'margarina';
  //     const quantity = 100;
  //     before(async () => {
  //       sinon.stub(ProductModel, 'findByName').resolves(null);
  //     });
  //     after(async () => {
  //       ProductModel.findByName.restore();
  //     });
  //     it('é um objeto', async () => {
  //       const response = await ProductService.createProduct(name, quantity);
  //       expect(response).to.be.an('object');
  //     });
  //     it('possui a propriedade message', async () => {
  //       const response = await ProductService.createProduct(name, quantity);
  //       expect(response).to.have.property('id');
  //       expect(response).to.have.property('name');
  //       expect(response).to.have.property('quantity');
  //     });
  //     // it('possui a propriedade message possui a frase "product already exists"', async () => {
  //     //   const { message } = await ProductService.createProduct(name, quantity);
  //     //   expect(message).to.equals('Product already exists');
  //     // });
  //   });
  // });
});
describe('consulta por todos os produtos no banco de dados', () => {
  describe('o banco possui produtos registrados', () => {
    before(async () => {
      sinon.stub(ProductModel, 'findAll').resolves([
        { id: 1, name: 'cerveja', quantity: 100 },
        { id: 2, name: 'espeto de carne', quantity: 100 }
      ]);
    });
    after(async () => {
      ProductModel.findAll.restore();
    });
    it('a resposta é um array', async () => {
      const response = await ProductService.findAllProducts();
      expect(response).to.be.an('array');
    });
    it('o array tem 2 itens', async () => {
      const response = await ProductService.findAllProducts();
      expect(response.length).to.equals(2);
    });
  });
  describe('o banco não possui produtos registrados', () => {
    before(async () => {
      sinon.stub(ProductModel, 'findAll').resolves(null);
    });
    after(async () => {
      ProductModel.findAll.restore();
    });
    it('a resposta é um array', async () => {
      const response = await ProductService.findAllProducts();
      expect(response).to.be.an('object');
    });
    it('o objeto error contém a propriedade message', async () => {
      const response = await ProductService.findAllProducts();
      expect(response.error).to.have.property('message');
    });
  });
});
describe('consulta por um produto no banco de dados através do id', () => {
  describe('o produto existe', () => {
    const id = 1;
    before(async () => {
      sinon.stub(ProductModel, 'findById').resolves([
        { id: 1, name: 'cerveja', quantity: 100 },
      ]);
    });
    after(async () => {
      ProductModel.findById.restore();
    });
    it('a resposta é um objeto', async () => {
      const response = await ProductService.findProductById(id);
      expect(response).to.be.an('object');
    });
    it('o objeto tem as propriedades id, name, quantity', async () => {
      const response = await ProductService.findProductById(id);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });
});
describe('o produto não existe', () => {
  const id = 1;
  before(async () => {
    sinon.stub(ProductModel, 'findById').resolves(null);
  });
  after(async () => {
    ProductModel.findById.restore();
  });
  it('a resposta é um objeto', async () => {
    const response = await ProductService.findProductById(id);
    expect(response).to.be.an('object');
  });
  it('o objeto error possui propriedade "message"  com valor "Product not found"', async () => {
    const response = await ProductService.findProductById(id);
    expect(response.error).to.have.property('message');
    expect(response.error.message).to.equals('Product not found');
  });
});
describe('atualiza um produto localizando o no banco de dados pelo respectivo nome', () => {
  describe('o produto existe', () => {
    const name = 'espeto de carne';
    const quantity = 100;
    const product = { name, quantity };
    before(async () => {
      sinon.stub(ProductModel, 'update').resolves(
        {
          id: 1,
          name: "espeto de carne",
          quantity: "200"
        }
      );
    });
    after(async () => {
      ProductModel.update.restore();
    });
    it('a resposta é um objeto', async () => {
      const response = await ProductService.updateProductByName(product);
      expect(response).to.be.an('object');
    });
    it('o objeto tem as propriedades id, name, quantity', async () => {
      const response = await ProductService.updateProductByName(product);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });
});
describe('o produto não existe', () => {
  const name = 'espeto de carne';
  const quantity = 100;
  const product = { name, quantity };
  before(async () => {
    sinon.stub(ProductModel, 'update').resolves(null);
  });
  after(async () => {
    ProductModel.update.restore();
  });
  it('a resposta é um objeto', async () => {
    const response = await ProductService.updateProductByName(product);
    expect(response).to.be.an('object');
  });
  it('o objeto error possui propriedade "message"  com valor "Product not found"', async () => {
    const response = await ProductService.updateProductByName(product);
    expect(response.error).to.have.property('message');
    expect(response.error.message).to.equals('Product not found');
  });
});
describe('remove um produto localizando o no banco de dados pelo respectivo id', () => {
  const name = 'espeto de carne';
  const quantity = 100;
  describe('o produto existe', () => {
    const id = 1;
    const product = { name, quantity };
    before(async () => {
      sinon.stub(ProductModel, 'remove').resolves(
        {
          id: 1,
          name: "espeto de carne",
          quantity: "200"
        }
      );
    });
    after(async () => {
      ProductModel.remove.restore();
    });
    it('a resposta é um objeto', async () => {
      const response = await ProductService.removeAProductById(id);
      expect(response).to.be.an('object');
    });
    it('o objeto tem as propriedades id, name, quantity ', async () => {
      const response = await ProductService.removeAProductById(id);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });
  describe('o produto não existe', () => {
    const id = 100
    before(async () => {
      sinon.stub(ProductModel, 'remove').resolves(null);
    });
    after(async () => {
      ProductModel.remove.restore();
    });
    it('a resposta é um objeto', async () => {
      const response = await ProductService.removeAProductById(id);
      expect(response).to.be.an('object');
    });
    it('o objeto possui propriedade "error" cuja propriedade "message" possui valor "Product not found"', async () => {
      const response = await ProductService.removeAProductById(id);
      expect(response).to.have.property('error');
      expect(response.error.message).to.equals('Product not found');
    });
  });
});
describe('faz uma busca por todas as vendas no banco de dados', () => {
  describe('exitem vendas cadastradas', () => {
    const sales = [
      {
        saleId: 1,
        date: "2022-01-29T03:00:00.000Z",
        product_id: 1,
        quantity: 10
      },
      {
        saleId: 1,
        date: "2022-01-29T03:00:00.000Z",
        product_id: 2,
        quantity: 20
      }
    ];
    before(async () => {
      sinon.stub(SaleModel, 'findAll').resolves(sales);
    });
    after(async () => {
      SaleModel.findAll.restore();
    });
    it('restorna um array com todas as vendas', async () => {
      const response = await SaleService.listAll();
      expect(response).to.an('array');
    });
    it('o array tem tamanho 2', async () => {
      const response = await SaleService.listAll();
      expect(response.length).to.equals(2);
    });
    it('cada índice do objeto possui as propriedades saleId, date, product_id, quantity', async () => {
      const response = await SaleService.listAll();
      response.forEach((el) => {
        expect(el).to.have.property('saleId');
        expect(el).to.have.property('date');
        expect(el).to.have.property('product_id');
        expect(el).to.have.property('quantity');
      });
    });
  });
});
describe('faz uma busca por uma venda específica no banco de dados', () => {
  describe('exite a venda cadastrada', () => {
    const id = 1;
    const sales = [
      {
        saleId: 1,
        date: "2022-01-29T03:00:00.000Z",
        product_id: 1,
        quantity: 10
      },
      {
        saleId: 1,
        date: "2022-01-29T03:00:00.000Z",
        product_id: 2,
        quantity: 20
      }
    ];
    before(async () => {
      sinon.stub(SaleModel, 'findById').resolves(sales);
    });
    after(async () => {
      SaleModel.findById.restore();
    })
    it('retorna um array com todas as vendas', async () => {
      const response = await SaleService.listById(id);
      expect(response).to.an('array');
    });
    it('o array tem tamanho 2', async () => {
      const response = await SaleService.listById(id);
      expect(response.length).to.equals(2);
    });
    it('cada índice do objeto possui as propriedades saleId, date, product_id, quantity', async () => {
      const response = await SaleService.listById(id);
      response.forEach((el) => {
        expect(el).to.have.property('saleId');
        expect(el).to.have.property('date');
        expect(el).to.have.property('product_id');
        expect(el).to.have.property('quantity');
      });
    });
  });
  describe('não existe a venda cadastrada', () => {
    const id = 10;
    before(async () => {
      sinon.stub(SaleModel, 'findById').resolves(null);
    });
    after(async () => {
      SaleModel.findById.restore();
    });
    it('retorna um objeto', async () => {
      const response = await SaleService.listById(id);
      expect(response).to.be.an('object');
    });
    it('o objeto prossui a propriedade error', async () => {
      const response = await SaleService.listById(id);
      expect(response).to.have.property('error');
    });
    it('a propriedade message possui a mensagem "Sale not found" ', async () => {
      const { error: { message } } = await SaleService.listById(id);
      expect(message).to.equals('Sale not found');
    });
  });
});
describe('faz um update de um produto específico de uma venda', () => {
  // describe('exite a venda cadastrada', () => {
  //   const sale = [
  //     {
  //       product_id: 1,
  //       quantity: 50
  //     }
  //   ];
  //   const id = 1;
  //   before(async () => {
  //     sinon.stub(SaleModel, 'findById').resolves(sale);
  //   });
  //   after(async () => {
  //     SaleModel.findById.restore();
  //   });
  //   it('retorna true', async () => {
  //     const response = await SaleService.updateSaleById(id, sale);
  //     expect(response).to.be.true;
  //   });
  // })
  describe('não existe a venda cadastrada', () => {
    const sale = [
      {
        product_id: 1,
        quantity: 50
      }
    ];
    const id = 10;
    before(async () => {
      sinon.stub(SaleModel, 'findById').resolves(null);
    });
    after(async () => {
      SaleModel.findById.restore();
    });
    it('retorna um objeto', async () => {
      const response = await SaleService.updateSaleById(id, sale);
      expect(response).to.be.an('object');
    });
    it('o objeto prossui a propriedade error', async () => {
      const response = await SaleService.updateSaleById(id, sale);
      expect(response).to.have.property('error');
    });
    it('a propriedade error possui a mensagem "Sale not found" ', async () => {
      const { error: { message } } = await SaleService.updateSaleById(id, sale);
      expect(message).to.equals('Sale not found');
    });
  })
})
describe('faz um delete de uma venda específica de uma venda específica', () => {
  describe('existe a venda cadastrada', () => {
    const id = 1;
    const product = [{
      id: 1,
      name: "danone",
      quantity: 100
    }];
    before(async () => {
      sinon.stub(SaleModel, 'remove').resolves(product);
    });
    after(async () => {
      SaleModel.remove.restore();
    });
    it('retorna um array', async () => {
      const response = await SaleService.removeById(id);
      expect(response).to.be.an('array');
    });
    it('o array tem tamanho 1', async () => {
      const response = await SaleService.removeById(id);
      expect(response.length).to.equals(1);
    });

    it('o objeto tem as propriedades id, name, quantity', async () => {
      const [response] = await SaleService.removeById(id);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });
  describe('não existe a venda cadastrada', () => {
    const id = 100;
    before(async () => {
      sinon.stub(SaleModel, 'remove').resolves(null);
    });
    after(async () => {
      SaleModel.remove.restore();
    });
    it('retorna um objeto', async () => {
      const response = await SaleService.removeById(id);
      expect(response).to.be.an('object');
    });
    it('o objeto prossui a propriedade error', async () => {
      const response = await SaleService.removeById(id);
      expect(response).to.have.property('error');
    });
    it('a propriedade error possui a mensagem "Sale not found" ', async () => {
      const { error: { message } } = await SaleService.removeById(id);
      expect(message).to.equals('Sale not found');
    });
  });
});
