import Joi from 'joi';

const productValidationSchema = Joi.object({
  productName: Joi.string().required().messages({
    'any.required': 'Product Name is required.',
    'string.empty': 'Product name must be string and  cannot be empty.',
  }),
  price: Joi.number().required().messages({
    'any.required': 'Product Name is required.',
    'number.base': 'Product price must be number ',
    'number.empty': 'Product Price cannot be empty.',
  }),
  quantity: Joi.number().required().messages({
    'any.required': 'Product quantity is required.',
    'number.base': 'Product quantity must be number ',
    'number.empty': 'Product quantity cannot be empty.',
  }),
});

export default productValidationSchema;
