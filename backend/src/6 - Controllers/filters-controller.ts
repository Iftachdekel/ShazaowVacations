import express, { NextFunction, Response, Request } from 'express'
import { UserType } from '../4 - Models/UserModel';
import { verifyLoggedIn } from '../3 - Middleware/verify-loggedIn';
import { filterActiveVacationsLogic, filterFollwerUserVacationsLogic, filterFutureVacationsLogic } from '../5 - Logic/filters-logic';
import { executeSql } from '../2 - Utils/dal';
import XLSX from 'XLSX'
import fs from 'fs'
import { json } from 'stream/consumers';


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




router.get('/exporttoexcel', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sqlQuery = 'SELECT * FROM vacations';
        const vacations = await executeSql(sqlQuery);
        
        const vacationData = vacations.map(vacation => {
            return [vacation.id, vacation.destination, vacation.description, vacation.startOn, vacation.endOn, vacation.price];
        });
        vacationData.unshift(['id', 'destination', 'description', 'startOn', 'endOn', 'price']);

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(vacationData);
        
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Vacations');
        const fileName = 'vacations.xlsx';
        XLSX.writeFile(workbook, fileName);

        res.download(fileName, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Error sending Excel file' });
            }
            fs.unlinkSync(fileName);
            console.log(fileName)
        });
        
    } catch (error) {
        next(error); // Pass the error to the error handling middleware if any
    }
});

export default router; 

