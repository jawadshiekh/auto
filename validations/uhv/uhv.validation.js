const Joi = require("joi");

const uhvCreateSchema = Joi.object({
  name: Joi.string().required(),
});

module.exports = uhvCreateSchema;
