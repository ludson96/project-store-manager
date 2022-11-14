const camelize = require('camelize');
const connection = require('./connection');

const findAll = () => {
  // const [result] = await connection.execute(
  //   ' SELECT * FROM StoreManager.products',
  // );
  // return camelize(result);
  console.log('Eu sou o model');
};

module.exports = {
  findAll,
};