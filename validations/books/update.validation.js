const Joi = require("joi");

const booksUpdateSchema = Joi.object({
  name: Joi.string().optional(),
});

module.exports = booksUpdateSchema;
