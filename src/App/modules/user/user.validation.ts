import Joi from 'joi';

const fullNameValidationSchema = Joi.object({
  firstName: Joi.string().required().messages({
    'any.required': 'First name is required.',
    'string.empty': 'First name cannot be empty.',
  }),
  lastName: Joi.string().required().messages({
    'any.required': 'Last name is required.',
    'string.empty': 'Last name cannot be empty.',
  }),
});

const addressValidationSchema = Joi.object({
  street: Joi.string().required().messages({
    'any.required': 'Street is required.',
    'string.empty': 'Street cannot be empty.',
  }),
  city: Joi.string().required().messages({
    'any.required': 'City is required.',
    'string.empty': 'City cannot be empty.',
  }),
  country: Joi.string().required().messages({
    'any.required': 'Country is required.',
    'string.empty': 'Country cannot be empty.',
  }),
});

const orderValidationSchema = Joi.object({
  productName: Joi.string().required().messages({
    'any.required': 'Product name is required.',
    'string.empty': 'Product name cannot be empty.',
  }),
  price: Joi.number().required().messages({
    'any.required': 'Price is required.',
    'number.base': 'Price must be a number.',
  }),
  quantity: Joi.number().required().messages({
    'any.required': 'Quantity is required.',
    'number.base': 'Quantity must be a number.',
  }),
});

const userValidationSchema = Joi.object({
  userId: Joi.number().required().messages({
    'any.required': 'User ID is required.',
    'number.base': 'User ID must be a number and Can not be empty.',
  }),
  username: Joi.string().required().messages({
    'any.required': 'Username is required.',
    'string.empty': 'User name must be string and Username cannot be empty.',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required.',
    'string.empty': 'Password cannot be empty.',
  }),
  fullName: fullNameValidationSchema.required(),
  age: Joi.number().integer().min(1).required().messages({
    'any.required': 'Age is required.',
    'number.base': 'Age must be a number and Age can not be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required.',
    'string.email': 'Invalid email address.',
  }),
  isActive: Joi.boolean().required().messages({
    'any.required': 'isActive is required.',
    'boolean.base': 'isActive must be a True or False.',
  }),
  hobbies: Joi.array().items(Joi.string()).required().messages({
    'any.required': 'Hobbies are required.',
    'array.base': 'Hobbies must be an array. Hobbies can be empty array',
  }),
  address: addressValidationSchema.required(),
  orders: Joi.array().items(orderValidationSchema).default([]),
});

export default userValidationSchema;
