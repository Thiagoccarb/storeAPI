const connection = require('../connections');

const createSaleProduct = async (id, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products 
   (sale_id, product_id, quantity)  VALUES (?, ?, ?);`;
  await connection.execute(
    query, [id, productId, Number(quantity)],
  );
  return true;
};

module.exports = {
  createSaleProduct,
};