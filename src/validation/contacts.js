import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string()
    .min(3)
    .max(20)
    .required(),
    email: Joi.string()
    .email()
    .required(),
    phoneNumber: Joi.string()
    .min(3)
    .max(20)
    .required()
    .messages({ 'string.base': 'PhoneNumber should be a string' }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
  .valid('work', 'home', 'personal').required(),
  });
