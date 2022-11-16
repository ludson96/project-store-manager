const camelize = require('camelize');
// const snakeize = require('snakeize');
const connection = require('./connection');

// const insert = async (products) => {
//   const [{ insertId }]= products.forEach((product) => {
//   const columns = Object.keys(snakeize(product))
//     .map((key) => `${key}`).join(', ');
  
//   const placeholders = Object.keys(product)
//     .map((_key) => '?').join(', ');
  
//   const [{ insertId }] = await connection.execute(
//     `INSERT INTO StoreManager.products (${columns}) VALUE (${placeholders})`,
//     [...Object.values(product)],
//   );
//   });

//   return insertId;
// };

const getAllSales = async () => {
    const [result] = await connection.execute(
      `SELECT sale_id, date, product_id, quantity 
      FROM StoreManager.sales_products AS sp
      LEFT JOIN StoreManager.sales AS s
      ON sp.sale_id = s.id
      ORDER BY sale_id, product_id;`,
    );
    return camelize(result);
};

const getByIdSales = async (id) => {
  const [result] = await connection.execute(
    `SELECT date, product_id, quantity 
    FROM StoreManager.sales_products AS sp
    LEFT JOIN StoreManager.sales AS s
    ON sp.sale_id = s.id
    WHERE sale_id = ?
    ORDER BY sale_id, product_id;`,
    [id],
  );
  console.log('Eu sou o result do mdoels: ', result);
  return camelize(result);
};

module.exports = {
  // insert,
  getAllSales,
  getByIdSales,
};