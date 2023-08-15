import Joi from 'joi';
import { validationError } from './ErrorModels';
import { UploadedFile } from 'express-fileupload';
import moment from 'moment';

export type FollowerType = {
   userID: number;
   vacationID: number;
}
