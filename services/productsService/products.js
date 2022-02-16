const Model = require('../../models/productsModel/products');

const createProduct = async (name, quantity) => {
  const existing = await Model.findByName(name);
  if (existing) return { error: { message: 'Product already exists' } };
  const newProduct = await Model.createProduct(name, quantity);
  return newProduct;
};

const findAllProducts = async () => {
  const products = await Model.findAll();
  if (!products) return { error: { message: 'No products registered yet' } };
  return products;
};

const findProductById = async (id) => {
  const existing = await Model.findById(id);
  if (!existing) return { error: { message: 'Product not found' } };
  return existing[0];
};

const updateProductByName = async (product) => {
  const { name, quantity, id } = product;
  const updated = await Model.update(name, quantity, id);
  if (!updated) return { error: { message: 'Product not found' } };
  return updated;
};

const removeAProductById = async (id) => {
  const removed = await Model.remove(id);
  if (!removed) return { error: { message: 'Product not found' } };
  return removed;
};

const updateProductQuantity = async (sale) => {
  await sale.forEach(async ({ product_id, quantity }) => {
    const data = await Model.findById(product_id);
    const [{ name, quantity: total, id }] = data;
    const value = parseInt(quantity, 10);
    const newTotal = total - value;
    await Model.update(name, newTotal, id);
  });
};

const updateProductQuantityOnDeleting = async (sale) => {
  sale.forEach(async ({ product_id, quantity }) => {
    const data = await Model.findById(product_id);
    const [{ name, quantity: total, id }] = data;
    const newTotal = total + parseInt(quantity, 10);
    await Model.update(name, newTotal, id);
  });
};

module.exports = {
  createProduct,
  findProductById,
  findAllProducts,
  updateProductByName,
  removeAProductById,
  updateProductQuantity,
  updateProductQuantityOnDeleting,
};