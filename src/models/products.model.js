const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    ' SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const findById = async (id) => {
  const [[result]] = await connection.execute(
    `SELECT * FROM StoreManager.products
    WHERE id = ?`,
    [id],
  );
  return camelize(result);
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products(name)
    VALUES (?)`,
    [name],
  );
  return camelize(insertId);
};

const updateById = async (name, id) => connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`,
    [name, id],
);
  
const deleteById = async (id) => connection.execute(
    `DELETE FROM StoreManager.products
  WHERE id = ?`,
    [id],
);

const search = async (q) => {
  const pesquisa = `%${q}%`;
  const [result] = await connection.execute(
    `SELECT * FROM StoreManager.products
  WHERE name like ?`,
    [pesquisa],
  );
  return camelize(result);
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
  search,
};