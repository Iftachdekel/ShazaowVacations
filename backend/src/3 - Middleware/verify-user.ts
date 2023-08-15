import { Request, Response, NextFunction } from 'express';
import { verifyUser } from '../2 - Utils/cyber'
import { UnauthorizedError } from '../4 - Models/ErrorModels';


export const verifyUserMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isUser = await verifyUser(req);
        console.log(isUser)
        if(!isUser) UnauthorizedError("You are not user");        
        next();
    } catch (err: any) {
        next(err)
    }
}