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
    `INSERT INTO products(name)
    VALUES (?)`,
    [name],
  );
  return camelize(insertId);
};

const updateById = async (name, id) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?`,
    [name, id],
  );
};
  
const deleteById = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.products
  WHERE id = ?`,
    [id],
  );
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
};