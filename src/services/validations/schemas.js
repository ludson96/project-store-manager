const Joi = require('joi');

const idSchema = Joi.number().integer().required();

const quantitySchema = Joi.number().integer().required();

const quantityZeroSchame = Joi.number().integer().min(1).require();

module.exports = {
  idSchema,
  quantitySchema,
  quantityZeroSchame,
};