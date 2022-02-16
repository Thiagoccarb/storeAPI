const connection = require('../connections');

const createProduct = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity)  VALUES (?, ?);';
  const [data] = await connection.execute(
    query, [name, quantity],
  );
  return {
    id: data.insertId,
    name,
    quantity,
  };
};

const findByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
  const [data] = await connection.execute(
    query, [name],
  );
  if (!data.length) return null;
  return data;
};

const findAll = async () => {
  const query = 'SELECT * FROM StoreManager.products;';
  const [data] = await connection.execute(
    query,
  );
  if (!data.length) return null;
  return data;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [data] = await connection.execute(
    query, [id],
  );
  if (!data.length) return null;
  return data;
};

const update = async (name, quantity, ID) => {
  const product = await findById(ID);
  if (!product) return null;
  const [{ id }] = product;
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;';
  await connection.execute(
    query, [name, quantity, parseInt(id, 10)],
  );
  return {
    id,
    name,
    quantity,
  };
};

const remove = async (id) => {
  const product = await findById(id);
  if (!product) return null;
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';
  await connection.execute(
    query, [id],
  );
  return product;
};

module.exports = {
  createProduct,
  findByName,
  findById,
  findAll,
  update,
  remove,
};