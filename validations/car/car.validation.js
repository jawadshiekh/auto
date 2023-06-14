const Joi = require("joi");

const carCreateSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = carCreateSchema;
