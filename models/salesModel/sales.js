const connection = require('../connections');

const createSale = async () => {
  const date = (new Date()).toISOString().split('T')[0];
  const query = 'INSERT INTO StoreManager.sales (date)  VALUES (?);';
  const [createdSale] = await connection.execute(
    query, [date],
  );
  return {
    id: createdSale.insertId,
  };
};

const findAll = async () => {
  const query = `
   SELECT 
 s.id AS saleId, 
 s.date,
 sp.product_id,
 sp.quantity
 FROM sales s
 INNER JOIN 
 sales_products sp
 ON
 s.id = sp.sale_id;`;
  const [data] = await connection.execute(
    query,
  );
  if (!data) return null;
  return data;
};

const findById = async (id) => {
  const query = `
   SELECT 
 s.date,
 sp.product_id,
 sp.quantity
 FROM sales s
 INNER JOIN 
 sales_products sp
 ON
 s.id = sp.sale_id
 WHERE s.id = ?;`;
  const [data] = await connection.execute(
    query, [id],
  );
  if (!data.length) return null;
  return data;
};

const update = async (id, productId, quantity) => {
  const query = `UPDATE StoreManager.sales_products 
 SET quantity = ? WHERE sale_id = ? AND product_id = ?;`;
  await connection.execute(
    query, [quantity, id, productId],
  );
  return true;
};

const remove = async (id) => {
  const product = await findById(id);
  if (!product) return null;
  const query = 'DELETE FROM StoreManager.sales WHERE id = ?;';
  await connection.execute(
    query, [id],
  );
  return product;
};

module.exports = {
  createSale,
  findById,
  findAll,
  update,
  remove,
};