import jwt from "jsonwebtoken";
import { Request } from "express";
import { UserType } from "../4 - Models/UserModel";
import { executeSql } from "../2 - Utils/dal";
import { VacationType } from "../4 - Models/VacationModel";
import { OkPacket } from "mysql";
import { UserContainer } from "../2 - Utils/cyber";
import { resourceNotFound } from "../4 - Models/ErrorModels";
import { FollowerType } from "../4 - Models/followerModel";

export const getAllFollowersForCounter = async (id: number): Promise<number> => {
  const sql = `
    SELECT COUNT(userID) from followers WHERE vacationID=${id}
    `;
  const followers = await executeSql(sql);
  return followers;
};

export const addfollowLogic = async (request: Request, vacationID: number) => {
  const header = request.header("authorization");
  const token = header.substring(7);

  const container = jwt.decode(token) as UserContainer;
  const query = `
    SELECT * from users WHERE email='${container.user[0].email}' AND password='${container.user[0].password}'
    `;
  const user = (await executeSql(query)) as UserType;

  const sql = `INSERT INTO followers
    (userID , vacationID)
    VALUES ("${user[0].userID}" ,"${vacationID}")`;

  const followers = await executeSql(sql);

  return followers;
};

export const deleteFollowLogic = async (
  request: Request,
  vacationID: number
): Promise<void> => {
  const header = request.header("authorization");
  const token = header.substring(7);

  const container = jwt.decode(token) as UserContainer;
  const query = `
    SELECT * from users WHERE email='${container.user[0].email}' AND password='${container.user[0].password}'
    `;
  const user = (await executeSql(query)) as UserType;
  const sql = `
    DELETE FROM followers WHERE vacationID =${vacationID} AND userID= ${user[0].userID}
    `;
  const info: OkPacket = await executeSql(sql);

  if (info.affectedRows === 0) resourceNotFound(vacationID);
};
