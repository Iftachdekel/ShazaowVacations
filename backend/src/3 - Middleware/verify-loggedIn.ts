import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../2 - Utils/cyber';
import { UnauthorizedError } from '../4 - Models/ErrorModels';


export const verifyLoggedIn = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const isValid = await verifyToken(req);
        if(!isValid) UnauthorizedError('Invalid token');
        next();
    } catch (err: any) {
        next(err)
    }

}