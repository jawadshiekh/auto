const Joi = require("joi");

const userCreateSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = userCreateSchema;
