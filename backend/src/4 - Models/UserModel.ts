import Joi from 'joi';
import { validationError } from './ErrorModels';


export type RoleType =  "admin" | 'user';

export type UserType = {
    id: number | null;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: RoleType;
}

export const passwordValidation = Joi.string()
  .min(4)
  .max(16)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).*$/)
  .required()
  .messages({
    'string.base': 'Password must be a string.',
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least {#limit} characters long.',
    'string.max': 'Password cannot exceed {#limit} characters.',
    'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
  });

export const nameValidation = Joi.string().required().min(2).max(20)
    .message('The name must be between 2 and 20 charachetrs');

export const mailValidation = Joi.string().email({ minDomainSegments: 2, tlds: false }).message('The mail is invalid');

export const userValidationSchema = Joi.object({
    id: Joi.optional(),
    username: nameValidation,
    firstName: nameValidation,
    lastName: nameValidation,
    email: mailValidation,
    password: passwordValidation,
    role: Joi.optional()
})

export const validateUser = (user: UserType) => {
    const result = userValidationSchema.validate(user);
    if(result.error) validationError(result.error.message)
}
