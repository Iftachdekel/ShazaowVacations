import express, { NextFunction, Response, Request } from "express";;
import { getChartData} from "../5 - Logic/vacations-logic";

const router = express.Router();

router.get(
  "/data",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const vacations = await getChartData();
      res.json(vacations);
    } catch (err) {
      next(err);
    }
  }
);



export default router;
