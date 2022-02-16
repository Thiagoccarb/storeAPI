const SalesModel = require('../../models/salesModel/sales');
const ProductModel = require('../../models/productsModel/products');
const SaleProductModel = require('../../models/salesProductsModel/salesProducts');
const ProductService = require('../productsService/products');

const getProductsBySale = async (sale) => {
  const products = sale
    .map(({ product_id }) => ProductModel.findById(product_id));
  return Promise.all(products);
};

const validateProductId = async (array) => {
  const products = await ProductModel.findAll();
  const ids = products.map((el) => el.id);
  const validateId = array
    .every((el) => ids.includes(parseInt(el.product_id, 10)));
  if (!validateId) return { error: { message: 'Invalid product_id' } };
  return true;
};

const validateSale = async (sale) => {
  let validate = true;
  const products = await getProductsBySale(sale);
  products.forEach((el, i) => {
    const [{ quantity: currentQuantity }] = el;
    const quantity = parseInt(sale[i].quantity, 10);
    const newQuantity = currentQuantity - quantity;
    if (newQuantity <= 0) {
      validate = false;
    }
  });
  if (!validate) return { error: { message: 'Such amount is not permitted to sell' } };
  return validate;
};

const createSale = async (sale) => {
  const newSale = await SalesModel.createSale();
  await ProductService.updateProductQuantity(sale);
  await Promise.all(
    sale.map(({ product_id, quantity }) =>
      SaleProductModel.createSaleProduct(newSale.id, product_id, quantity)),
  );
  return newSale.id;
};

const listAll = async () => {
  const sales = await SalesModel.findAll();
  if (!sales.length) return { error: { message: 'No sales registered yet' } };
  return sales;
};

const listById = async (id) => {
  const sale = await SalesModel.findById(id);
  if (!sale) return { error: { message: 'Sale not found' } };
  return sale;
};

const updateSaleById = async (id, newSale) => {
  const oldSale = await SalesModel.findById(id);
  if (!oldSale) return { error: { message: 'Sale not found' } };
  const [{ product_id: productId, quantity: newSaleQuantity }] = newSale;
  await SalesModel.update(id, productId, newSaleQuantity);
  return true;
};

const removeById = async (id) => {
  const removedSale = await SalesModel.remove(id);
  if (!removedSale) return { error: { message: 'Sale not found' } };
  await ProductService.updateProductQuantityOnDeleting(removedSale);
  return removedSale;
};

module.exports = {
  createSale,
  listAll,
  listById,
  updateSaleById,
  removeById,
  validateProductId,
  validateSale,
};