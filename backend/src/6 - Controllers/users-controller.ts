import express, { NextFunction, Response, Request } from "express";
import { getAllUsers, getUserByEmail, register } from "../5 - Logic/userslogic";
import { LogInCredentials, logInValidation } from "../4 - Models/logInType"; // Import logInValidation
import { loginUser } from "../5 - Logic/loginlogic";
import { UserType } from "../4 - Models/UserModel";

const router = express.Router();

router.post(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser: UserType = req.body;
      const signUp = await register(newUser);
      res.json(signUp);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/users/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const credentials: LogInCredentials = req.body;
      logInValidation(credentials);
      const logIn = await loginUser(credentials);
      console.log(credentials)
      if (typeof logIn === "string" && logIn.startsWith("Incorrect")) {
        return res.status(401).json({ message: logIn });
      }
      const user = await getUserByEmail(credentials.email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user, token: logIn });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;
