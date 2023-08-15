import express, { NextFunction, Response, Request } from 'express'
import { UserType } from '../4 - Models/UserModel';
import { verifyLoggedIn } from '../3 - Middleware/verify-loggedIn';
import { filterActiveVacationsLogic, filterFollwerUserVacationsLogic, filterFutureVacationsLogic } from '../5 - Logic/filters-logic';

const router = express.Router();

router.get("/vacations/future", verifyLoggedIn , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await filterFutureVacationsLogic();
        res.json(vacations);
    }
    catch (err) {
        next(err)
    }
})

router.get("/vacations/active", verifyLoggedIn , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vacations = await filterActiveVacationsLogic();
        res.json(vacations);
    }
    catch (err) {
        next(err)
    }
})

router.get("/vacations/userVacation/:id" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id
        const vacations = await filterFollwerUserVacationsLogic(id);
        res.json(vacations);
    }
    catch (err) {
        next(err)
    }
})
export default router; 