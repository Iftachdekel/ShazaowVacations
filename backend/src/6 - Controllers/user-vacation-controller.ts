import express, { NextFunction, Response, Request } from "express";
import { getAllUsers, getUserByEmail, register } from "../5 - Logic/userslogic";
import { LogInCredentials, logInValidation } from "../4 - Models/logInType"; // Import logInValidation
import { loginUser, validateUserCredntials } from "../5 - Logic/loginlogic";
import { UserType } from "../4 - Models/UserModel";
import { addVacationToFavorite, getvacationUserFavorateStatus, removeVacationFromFavorite } from "../5 - Logic/vacations-logic";
import { verifyUserMW } from "../3 - Middleware/verify-user";

const router = express.Router();

router.post(
    "/add",
    verifyUserMW,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: any = req.body.userId;
            const vacationId: any = req.body.vacationId;
            const r = await addVacationToFavorite(userId, vacationId);
            if (r)
                return res.status(200).json({ message: 'Added to fav.' });
            else
                return res.status(500).json({ message: 'Failed Adding to fav.' });
        } catch (err) {
            next(err);
        }
    }
);

router.post(
    "/remove",
    verifyUserMW,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: any = req.body.userId;
            const vacationId: any = req.body.vacationId;
            const r = await removeVacationFromFavorite(userId, vacationId);
            if (r)
                return res.status(200).json({ message: 'Removed to fav.' });
            else
                return res.status(500).json({ message: 'Failed Removed to fav.' });
        } catch (err) {
            next(err);
        }
    }
);


router.get(
    "/status/:userid([0-9]+)/:vacationid([0-9]+)",
    verifyUserMW,
    async (req: Request, res: Response, next: NextFunction) => {
        try {

            const userId: number = +req.params.userid;
            const vacationId: any = +req.params.vacationid;
            const r = await getvacationUserFavorateStatus(userId, vacationId);
            if (r.length > 0)
                return res.status(200).json(true);
            return res.status(200).json(false);

        } catch (err) {
            next(err);
        }
    }
);


export default router;
