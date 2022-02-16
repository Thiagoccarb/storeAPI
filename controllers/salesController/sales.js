const rescue = require('express-rescue');
const salesService = require('../../services/salesService/sales');

const REQUIRED_PRODUCT_ID = '"product_id" is required';
const REQUIRED_QUANTITY = '"quantity" is required';
const INVALID_QUANTITY = '"quantity" must be a number larger than or equal to 1';
const BAD_REQUEST = 400;
const UNPROCESSABLE_ENTITY = 422;
// const CONFLICT = 409;
const CREATED = 201;
const OK = 200;
const NOT_FOUND = 404;

const validateProductId = (array) => {
  const isValidProductId = array.some((el) => !el.product_id);
  if (isValidProductId) return { error: REQUIRED_PRODUCT_ID, code: BAD_REQUEST };
  return true;
};

const validateQuantity = (array) => {
  const existingQuantity = array.some((el) => el.quantity === undefined || el.quantity === '');
  const isValidQuantity = array.some((el) => el.quantity <= 0
    || Number.isNaN(parseInt(el.quantity, 10)));
  if (existingQuantity) return { error: REQUIRED_QUANTITY, code: BAD_REQUEST };
  if (isValidQuantity) return { error: INVALID_QUANTITY, code: UNPROCESSABLE_ENTITY };
  return true;
};

const create = rescue(async (req, res) => {
  const sale = req.body;
  const checkproductIdField = validateProductId(sale);
  if (checkproductIdField.error) {
    const { error, code } = checkproductIdField;
    return res.status(code).json({ message: error });
  }
  const checQuantityFIeld = validateQuantity(sale);
  if (checQuantityFIeld.error) {
    const { error, code } = checQuantityFIeld;
    return res.status(code).json({ message: error });
  }
  const { error } = await salesService.validateProductId(sale);
  if (error) return res.status(UNPROCESSABLE_ENTITY).json(error.message);
  const isValidSale = await salesService.validateSale(sale);
  if (isValidSale.error) return res.status(UNPROCESSABLE_ENTITY).json(isValidSale.error);
  const newSaleId = await salesService.createSale(sale);
  return res.status(CREATED).json({ id: newSaleId, itemsSold: sale });
});

const listAll = rescue(async (_req, res) => {
  const products = await salesService.listAll();
  if (products.error) {
    return res.status(NOT_FOUND).json(products.error);
  }
  return res.status(OK).json(products);
});

const listById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await salesService.listById(id);
  if (product.error) {
    return res.status(NOT_FOUND).json(product.error);
  }
  return res.status(OK).json(product);
});

const updateSale = rescue(async (req, res) => {
  const { params: { id }, body } = req;
  const sales = body;
  const isValidProductId = validateProductId(sales);
  if (isValidProductId.error) {
    const { error, code } = isValidProductId;
    return res.status(code).json({ message: error });
  }
  const isValidQuantity = validateQuantity(sales);
  if (isValidQuantity.error) {
    const { error, code } = isValidQuantity;
    return res.status(code).json({ message: error });
  }
  const updatedSale = await salesService.updateSaleById(id, sales);
  if (updatedSale.error) {
    return res.status(NOT_FOUND).json(updatedSale.error);
  }
  return res.status(OK).json({ saleId: id, itemUpdated: sales });
});

const removeSaleById = rescue(async (req, res) => {
  const { id } = req.params;
  const removedSale = await salesService.removeById(id);
  if (removedSale.error) {
    return res.status(NOT_FOUND).json(removedSale.error);
  }
  return res.status(OK).json(removedSale);
});

module.exports = {
  create,
  listAll,
  listById,
  updateSale,
  removeSaleById,
};
