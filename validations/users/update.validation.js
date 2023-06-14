const Joi = require("joi");

const userUpdateSchema = Joi.object({
  name: Joi.string().optional(),
});

module.exports = userUpdateSchema;
