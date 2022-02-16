const sinon = require('sinon');

const { expect } = require('chai');
const connection = require('../../models/connections');
const ProductModel = require('../../models/productsModel/products');
const SaleModel = require('../../models/salesModel/sales');
const SaleService = require('../../services/salesService/sales');
const SaleProductModel = require('../../models/salesProductsModel/salesProducts.js');


describe('cria um produto no banco de dados', () => {
  describe('o corpo da requisição é válido', () => {
    describe('a resposta', () => {
      const name = 'guarana';
      const quantity = 100;
      before(async () => {
        const execute = [{ id: '1', name: 'guarana', quantity: 100 }];
        sinon.stub(connection, 'execute').resolves(execute);
      });
      after(async () => {
        connection.execute.restore();
      })
      it('é um objeto', async () => {
        const response = await ProductModel.createProduct(name, quantity);
        expect(response).to.be.an('object');
      });
      it('possui as propriedades id, name, quantity', async () => {
        const response = await ProductModel.createProduct({ name, quantity });
        expect(response).to.have.property('id');
        expect(response).to.have.property('name');
        expect(response).to.have.property('quantity');
      });
    });
  });
});

describe('consulta pelo nome de um produto no banco de dados', () => {
  describe('o não produto existe', () => {
    const name = 'margarina';
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('a resposta é um array', async () => {
      const response = await ProductModel.findByName(name);
      expect(response).to.be.null;
    });
  });
  describe('o produto existe', () => {
    const name = 'margarina';
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{ id: 3, name: 'margarina', quantity: 100 }]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('a resposta é um array', async () => {
      const response = await ProductModel.findByName(name);
      expect(response).to.be.an('array');
    });
    it('o array tem um item e com as propriedades id, name e quantity', async () => {
      const [response] = await ProductModel.findByName(name);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });
});
describe('consulta por todos os produtos no banco de dados', () => {
  describe('o banco possui produtos registrados', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[
        { id: 1, name: 'cerveja', quantity: 100 },
        { id: 2, name: 'espeto de carne', quantity: 100 }
      ]]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('a resposta é um array', async () => {
      const response = await ProductModel.findAll();
      expect(response).to.be.an('array');
    });
    it('o array tem 2 itens', async () => {
      const response = await ProductModel.findAll();
      expect(response).to.have.length(2);
    });
  });
  describe('o não banco possui produtos registrados', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('a resposta é null', async () => {
      const response = await ProductModel.findAll();
      expect(response).to.be.null;
    });
  });
});
describe('consulta por um produto no banco de dados através do id', () => {
  describe('o produto existe', () => {
    const id = 1;
    before(() => {
      sinon.stub(connection, 'execute').resolves([[
        { id: 1, name: 'cerveja', quantity: 100 },
      ]]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('a resposta é um array', async () => {
      const response = await ProductModel.findById(id);
      expect(response).to.be.an('array');
    });
    it('o array tem 1 item', async () => {
      const response = await ProductModel.findById(id);
      expect(response.length).to.equals(1);
    });
  });
  describe('o produto não existe', () => {
    const id = 1;
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('a resposta é um array', async () => {
      const response = await ProductModel.findById(id);
      expect(response).to.be.null;
    });
  });
});
describe('atualiza um produto localizando o no banco de dados pelo respectivo nome', () => {
  describe('o produto existe', () => {
    const name = 'espeto de carne';
    const quantity = 100;
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[
        {
          id: 1,
          name: "espeto de carne",
          quantity: "100"
        }
      ]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('a resposta é um objeto', async () => {
      const response = await ProductModel.update(name, quantity);
      expect(response).to.be.an('object');
    });
    it('o objeto tem as propriedades id, nae, quantity', async () => {
      const response = await ProductModel.update(name, quantity);
      expect(response).to.have.property('id');
      expect(response).to.have.property('name');
      expect(response).to.have.property('quantity');
    });
  });
  describe('o produto não existe', () => {
    const name = 'espeto de carne';
    const quantity = 100;
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('a resposta é null', async () => {
      const response = await ProductModel.update(name, quantity);
      expect(response).to.be.null;
    });
  });
});
describe('remove um produto localizando o no banco de dados pelo respectivo id', () => {
  describe('o produto existe', () => {
    const id = 1;
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[{
        id: 1,
        name: "espeto de carne",
        quantity: "200"
      }]]);

    });
    after(async () => {
      connection.execute.restore();
    });
    it('a resposta é um array', async () => {
      const response = await ProductModel.remove(id);
      expect(response).to.be.an('array');
    });
    it('o array tem tamanho 1', async () => {
      const response = await ProductModel.remove(id);
      expect(response.length).to.equals(1);
    });
  });
  describe('o produto não existe', () => {
    const id = 100;
    before(async () => {
      sinon.stub(connection, 'execute').resolves([[]]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('a resposta é null', async () => {
      const response = await ProductModel.remove(id);
      expect(response).to.be.null;
    });
  });
});
describe('cria uma venda no banco de dados', () => {
  describe('o corpo da requisição é válido', () => {
    describe('a resposta', () => {
      const sales = [
        {
          product_id: 1,
          quantity: 100

        },
        {
          product_id: 2,
          quantity: 100
        }
      ];
      const id = 1
      const name = 'guarana';
      const quantity = 100;
      before(async () => {
        sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      });
      after(async () => {
        connection.execute.restore();
      })
      it('é um objeto', async () => {
        const response = await SaleModel.createSale(sales);
        expect(response).to.be.an('object');
      });
      it('possui a propriedade id', async () => {
        const response = await SaleModel.createSale(sales);
        expect(response).to.have.property('id');
      });
      it('possui a propriedade id é igual a 1', async () => {
        const { id } = await SaleModel.createSale(sales);
        expect(id).to.equals(id);
      });
    });
  });
  // 
  // describe('o corpo da requisição é válido', () => {
  //   describe('a resposta', () => {
  //     const sales = [
  //       {
  //         product_id: 1,
  //         quantity: 100

  //       },
  //       {
  //         product_id: 2,
  //         quantity: 100
  //       }
  //     ];
  //     const id = 1
  //     const name = 'guarana';
  //     const quantity = 100;
  //     before(async () => {
  //       sinon.stub(SaleModel, 'createSale').resolves([{insertId: 1}]);
  //     });
  //     after(async () => {
  //       SaleModel.createSale.restore();
  //     })
  //     it.only('a função createSalesProduct foi chamada', async () => {
  //       await SaleModel.createSale(sales);
  //       expect(SaleProductModel.createSalesProduct).to.have.been.calledTwice;
  //     });
  //     it('possui a propriedade id', async () => {
  //       const response = await SaleModel.createSale(sales);
  //       expect(response).to.have.property('id');
  //     });
  //     it('possui a propriedade id é igual a 1', async () => {
  //       const { id } = await SaleModel.createSale(sales);
  //       expect(id).to.equals(id);
  //     });
  //   });
  // });
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
      sinon.stub(connection, 'execute').resolves([sales]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('restorna um array com todas as vendas', async () => {
      const response = await SaleModel.findAll();
      expect(response).to.an('array');
    });
    it('o array tem tamanho 2', async () => {
      const response = await SaleModel.findAll();
      expect(response.length).to.equals(2);
    });
    it('cada índice do objeto possui as propriedades saleId, date, product_id, quantity', async () => {
      const response = await SaleModel.findAll();
      response.forEach((el) => {
        expect(el).to.have.property('saleId');
        expect(el).to.have.property('date');
        expect(el).to.have.property('product_id');
        expect(el).to.have.property('quantity');
      });
    });
  });
});
describe('faz uma busca por uma a venda específica no banco de dados', () => {
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
      sinon.stub(connection, 'execute').resolves([sales]);
    });
    after(async () => {
      connection.execute.restore();
    })
    it('restorna um array com todas as vendas', async () => {
      const response = await SaleModel.findById(id);
      expect(response).to.an('array');
    });
    it('o array tem tamanho 2', async () => {
      const response = await SaleModel.findById(id);
      expect(response.length).to.equals(2);
    });
    it('cada índice do objeto possui as propriedades saleId, date, product_id, quantity', async () => {
      const response = await SaleModel.findById(id);
      response.forEach((el) => {
        expect(el).to.have.property('saleId');
        expect(el).to.have.property('date');
        expect(el).to.have.property('product_id');
        expect(el).to.have.property('quantity');
      });
    });
  });
});
describe('não exite a venda cadastrada', () => {
  const id = 10;
  before(async () => {
    sinon.stub(connection, 'execute').resolves([[]]);
  });
  after(async () => {
    connection.execute.restore();
  });
  it('retorna null', async () => {
    const response = await SaleModel.findById(id);
    expect(response).to.be.null;
  });
});
//update
describe('faz um update de um produto específico de uma venda', () => {
  describe('exite a venda cadastrada', () => {
    const id = 1;
    const productId = 1;
    const quantity = 500;
    before(async () => {
      sinon.stub(connection, 'execute').resolves([{}]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('retorna true', async () => {
      const response = await SaleModel.update(id, productId, quantity);
      expect(response).to.be.true;
    });
  })
})
// describe('faz um delete de uma venda específica de uma venda específica', () => {
//   describe.only('existe a venda cadastrada', () => {
//     const id = 1;
//     const product = {
//       id: 1,
//       name: "danone",
//       quantity: 100
//     }
//     before(async () => {
//       sinon.stub(SaleModel, 'findById').resolves(product);
//     });
//     after(async () => {
//       SaleModel.findById.restore();
//     });
//     it('retorna um objeto', async () => {
//       const response = await SaleModel.remove(id);
//       expect(response).to.be.an('object');
//     });
//     it('o objeto tem as propriedades id, name, quantity', async () => {
//       const response = await SaleModel.remove(id);
//       expect(response).to.have.property('id');
//       expect(response).to.have.property('name');
//       expect(response).to.have.property('quantity');

//     });
//   })
  // describe('não existe a venda cadastrada', () => {
  //   const id = 100;
  //   before(async () => {
  //     sinon.stub(SaleModel, 'findById').resolves(null);
  //   });
  //   after(async () => {
  //     SaleModel.findById.restore();
  //   });
  //   it('retorna null', async () => {
  //     const response = await SaleModel.remove(id);
  //     expect(response).to.be.null;
  //   });
  // });
