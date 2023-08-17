import express, { NextFunction, Response, Request } from "express";
import {
  addVacationLogic,
  addVacationToFavorite,
  deleteVacationLogic,
  getAllActiveVacationsLogic,
  getAllVacationsLogic,
  getAllVacationsOfUserLogic,
  getChartData,
  updateVacationLogic,
} from "../5 - Logic/vacations-logic";
import { VacationType } from "../4 - Models/VacationModel";
import { verifyAdminMW } from "../3 - Middleware/verify-admin";
import { verifyLoggedIn } from "../3 - Middleware/verify-loggedIn";
import {
  addfollowLogic,
  deleteFollowLogic,
  getAllFollowersForCounter,
  // getAllFollowersForCounter,
} from "../5 - Logic/followers-logic";
import { filterFutureVacationsLogic, getOneVacationsLogic } from "../5 - Logic/filters-logic";

const router = express.Router();


// GET http://localhost:3001/api/vacations
router.get(
  "/vacations",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await getAllVacationsLogic();
      res.json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/vacations/:id([0-9]+)",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const vacations = await getOneVacationsLogic(id);
      res.json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/vacations",
  verifyAdminMW,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.imageFile = req.files?.imageFile;
      const newVacation: VacationType = req.body;
      const vacation = await addVacationLogic(newVacation);
      res.json(vacation);
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/vacations/:id([0-9]+)",
  verifyAdminMW,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body.id = +req.params.id;
      const vacation = req.body as VacationType;
      const updateVacation = await updateVacationLogic(vacation);
      res.json(updateVacation);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/vacations/:id([0-9]+)",
  
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      await deleteVacationLogic(id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

// router.post('/addtofavorite', async (req: Request, res: Response, next: NextFunction) => {
//    try {
//       const vacationid = req.body.vacationid
//       const addedVacation = await addVacationToFavorite(req, vacationid)
//       res.status(200).json(addedVacation)
//    } catch (err) {
//       next(err)
//    }
// })

router.post(
  "/followers",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // req.body.id= +req.params.id;
      const vacationId = req.body.vacationID;
      const updateVacation = await addVacationToFavorite(req.body.userID, vacationId);
      res.json(updateVacation);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/followers/:id([0-9]+)",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      await deleteFollowLogic(req, id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

// get all amount of followers fot this vacation for counter
router.get(
  "/followers/:id([0-9]+)",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = +req.params.id;
      const followers = await getAllFollowersForCounter(id);
      res.json(followers);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/vacations/user/:userid",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userid = +req.params.userid;
      const vacations = await getAllVacationsOfUserLogic(userid);
      res.json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/vacations/active",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await getAllActiveVacationsLogic();
      res.json(vacations);
    } catch (err) {
      next(err);
    }
  }
);
router.get(
  "/vacations/future",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await filterFutureVacationsLogic();
      res.json(vacations);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/vacations/chartdata",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await getChartData();
      res.json(vacations);
    } catch (err) {
      next(err);
    }
  }
);






export default router