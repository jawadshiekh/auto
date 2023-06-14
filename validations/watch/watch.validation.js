const Joi = require("joi");

const watchCreateSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = watchCreateSchema;
