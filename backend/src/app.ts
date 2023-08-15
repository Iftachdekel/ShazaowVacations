import express from "express";
import cors from "cors";
import { appConfig } from './2 - Utils/appConfig'
import { catchAll } from './3 - Middleware/catch-all'
import { routeNotFoundMW } from './3 - Middleware/routeNotFoundMW'
import vacationsController from './6 - Controllers/vacations-controllers'
import usersController from './6 - Controllers/users-controller'
import filtersController from './6 - Controllers/filters-controller'
import userVacationController from './6 - Controllers/user-vacation-controller'
import fileUpload from 'express-fileupload'
import path from "path";

const server = express();

server.use(cors());

server.use(express.json());
server.use(fileUpload());

server.use("/assets", express.static(path.join(__dirname, '1 - Assets/images')));

server.use("/api", vacationsController);
server.use("/api", usersController);
// server.use("/api", filtersController);
server.use("/api/uservacation", userVacationController);
server.use("*", routeNotFoundMW);
server.use(catchAll)

server.listen(appConfig.port, () => console.log(`Listening to ${appConfig.port} on http://${appConfig.host}:${appConfig.port}`))
