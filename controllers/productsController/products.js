const rescue = require('express-rescue');
const Service = require('../../services/productsService/products');

const REQUIRED_NAME = '"name" is required';
const INVALID_NAME = '"name" length must be at least 5 characters long';
const REQUIRED_QUANTITY = '"quantity" is required';
const INVALID_QUANTITY = '"quantity" must be a number larger than or equal to 1';
const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;
const CONFLICT = 409;
const CREATED = 201;
const OK = 200;
const NOT_FOUND = 404;

const validateQuantity = (quantity) => {
  if (quantity === '' || quantity === undefined) {
    return { error: REQUIRED_QUANTITY, code: BAD_REQUEST };
  }
  const value = parseInt(quantity, 10);
  if (value <= 0 || Number.isNaN(value)) {
    return { error: INVALID_QUANTITY, code: UNPROCESSABLE_ENTITY };
  }
  return true;
};

const validateName = (name) => {
  if (!name || name === ''
    || typeof name === 'number') return { error: REQUIRED_NAME, code: BAD_REQUEST };
  if (name.length <= 4) return { error: INVALID_NAME, code: UNPROCESSABLE_ENTITY };
  return true;
};

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const nameValidation = validateName(name);
  if (nameValidation.error) {
    return res.status(nameValidation.code).json({
      message: nameValidation.error,
    });
  }
  const quantityValidation = validateQuantity(quantity);
  if (quantityValidation.error) {
    return res.status(quantityValidation.code).json({
      message: quantityValidation.error,
    });
  }
  const newProduct = await Service.createProduct(name, quantity);
  if (newProduct.error) return res.status(CONFLICT).json(newProduct.error);
  return res.status(CREATED).json(newProduct);
});

const listAll = rescue(async (req, res) => {
  const getProducts = await Service.findAllProducts();
  if (getProducts.error) {
    return res.status(NOT_FOUND).json(getProducts.error);
  }
  return res.status(OK).json(getProducts);
});

const listById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await Service.findProductById(id);
  if (product.error) {
    return res.status(NOT_FOUND).json(product.error);
  }
  return res.status(OK).json(product);
});

const update = rescue(async (req, res) => {
  const { body: { name, quantity }, params: { id } } = req;
  const isValidName = validateName(name);
  if (isValidName.error) {
    return res.status(isValidName.code).json({
      message: isValidName.error,
    });
  }
  const isValidQuantity = validateQuantity(quantity);
  if (isValidQuantity.error) {
    return res.status(isValidQuantity.code).json({
      message: isValidQuantity.error,
    });
  }
  const updatedProduct = { id, name, quantity };
  const updated = await Service.updateProductByName(updatedProduct);
  if (updated.error) return res.status(NOT_FOUND).json(updated.error);
  return res.status(OK).json(updated);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;
  const removed = await Service.removeAProductById(id);
  if (removed.error) return res.status(NOT_FOUND).json(removed.error);
  return res.status(OK).json(removed[0]);
});

module.exports = {
  create,
  listAll,
  listById,
  update,
  remove,
};
