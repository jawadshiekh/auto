const Joi = require("joi");

const booksCreateSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = booksCreateSchema;
