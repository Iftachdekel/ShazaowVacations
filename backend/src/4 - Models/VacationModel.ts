import Joi from 'joi';
import { validationError } from './ErrorModels';
import { UploadedFile } from 'express-fileupload';
import moment from 'moment';

export type VacationType = {
    id: number;
    destination: string;
    description: string;
    startOn: Date;
    endOn: Date;
    price: number;
    imageFile: UploadedFile;
    imageName: string;
}

const vacationValidationSchema = Joi.object({
    id: Joi.number().optional().integer(),
    destination: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(400),
    startOn: Joi.date().iso().min(moment().format('YYYY-MM-DD')).required(),
    endOn: Joi.date().iso().min(Joi.ref('startOn')).required(),
    price: Joi.number().required().positive().min(1).max(10000),
    imageFile: Joi.object().optional(),
    imageName: Joi.string().optional()
});

export const validateVacation = (vacation: VacationType) => {
    const isValid = vacationValidationSchema.validate(vacation);
    if(isValid.error) validationError(isValid.error.message)
}


const vacationUpdateValidationSchema = Joi.object({
    id: Joi.number().optional().positive().integer(),
    destination: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(400),
    startOn: Joi.date().iso().required(),
    endOn: Joi.date().iso().min(Joi.ref('startOn')).required(),
    price: Joi.number().required().positive().min(1).max(10000),
    imageFile: Joi.object().optional(),
    imageName: Joi.string().optional()
});

export const validateUpdateVacation = (vacation: VacationType) => {
    const isValid = vacationUpdateValidationSchema.validate(vacation);
    if(isValid.error) validationError(isValid.error.message)
}