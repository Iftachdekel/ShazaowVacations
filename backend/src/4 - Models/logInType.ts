import Joi from "joi";
import { mailValidation, passwordValidation } from "./UserModel";
import { validationError } from "./ErrorModels";

export type LogInCredentials = {
  email: string;
  password: string;
};
export const logInValidSchem = Joi.object({
  email: mailValidation,
  password: passwordValidation,
});
export const logInValidation = (user: LogInCredentials) => {
  const result = logInValidSchem.validate(user);
  if (result.error) validationError(result.error.message);
};
