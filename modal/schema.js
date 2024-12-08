const Joi = require("joi");

// Define the schema for a todo item
const todoSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title cannot be empty",
    "any.required": "Title is required",
  }),
  completed: Joi.boolean().default(false),
});

module.exports = todoSchema;
