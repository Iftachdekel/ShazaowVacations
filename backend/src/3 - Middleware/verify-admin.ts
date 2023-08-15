import { Request, Response, NextFunction } from 'express';
import { verifyAdmin } from '../2 - Utils/cyber'
import { UnauthorizedError } from '../4 - Models/ErrorModels';


export const verifyAdminMW = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isAdmin = await verifyAdmin(req);
        console.log(isAdmin)
        if(!isAdmin) UnauthorizedError("You are not admin");        
        next();
    } catch (err: any) {
        next(err)
    }
}