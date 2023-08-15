import {NextFunction, Response, Request} from 'express'
import { RouteNotFoundError } from '../4 - Models/ErrorModels'


export const routeNotFoundMW = (req: Request, res: Response, next: NextFunction) => {
const err = RouteNotFoundError(req.originalUrl);
next(err);
}