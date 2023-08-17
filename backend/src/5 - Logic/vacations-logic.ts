import path from "path";
import { executeSql } from "../2 - Utils/dal";
import { VacationType, validateUpdateVacation, validateVacation } from "../4 - Models/VacationModel";
import { v4 as uuid } from "uuid";
import { OkPacket } from "mysql";
import { resourceNotFound } from "../4 - Models/ErrorModels";



export const getAllVacationsLogic = async (): Promise<VacationType[]> => {
    const sql = `
    SELECT * from vacations ORDER BY startOn
    `
    const vacations = await executeSql(sql);
    return vacations;
}

export const addVacationLogic = async (vacation: VacationType): Promise<VacationType> => {
    validateVacation(vacation);
    if (vacation.imageFile) {
        console.log("Saving Image")
        const extension = vacation.imageFile.name.substring(vacation.imageFile.name.lastIndexOf('.'));
        vacation.imageName = uuid() + extension;
        const imagePath = path.join('./src/1 - Assets/images/', vacation.imageName); // Use 'path.join' to construct the image path
        await vacation.imageFile.mv(imagePath);
        //delete vacation.imageFile;
    }
    const sql = `INSERT INTO vacations
        (destination, description, startOn, endOn, price, imageName, imageFile)
        VALUES ("${vacation.destination}" ,"${vacation.description}","${vacation.startOn}",
        "${vacation.endOn}","${vacation.price}", "${vacation.imageName}", "${vacation.imageName}")`
    const info: OkPacket = await executeSql(sql);

    vacation.id = info.insertId;

    return vacation;
}


export const updateVacationLogic = async (vacation: VacationType): Promise<VacationType> => {
    validateUpdateVacation(vacation);
    const sql = `
    UPDATE vacations SET
    destination='${vacation.destination}', 
    description= '${vacation.description}', 
    startOn= '${vacation.startOn}' ,
    endOn= '${vacation.endOn}' ,
    price= ${vacation.price} ,
    imageName= '${vacation.imageName}'
    WHERE id= "${vacation.id}"
    `
    const info: OkPacket = await executeSql(sql);

    if (info.affectedRows === 0) resourceNotFound(vacation.id)

    return vacation;
}
export const deleteVacationLogic = async (id: number): Promise<void> => {
    const sql = `
    DELETE FROM vacations WHERE id = ${id}
    `
    const info: OkPacket = await executeSql(sql);
    if (info.affectedRows === 0) resourceNotFound(id)
}



export const addVacationToFavorite = async (userid: number, vacationid: number) :Promise<boolean> => {
    const sql = `INSERT INTO uservacations (userid, vacationid)
    VALUES ("${userid}", "${vacationid}")`
    const addedVacation = await executeSql(sql)
    console.log("Added to favorite");
    return true
}



export const removeVacationFromFavorite = async (userid: number, vacationid: number):Promise<boolean> => {
    const sql = `delete from uservacations where userid = ${userid} and  vacationid = ${vacationid}`

    const addedVacation = await executeSql(sql)
    console.log("Remove from favorite");
    return true
}



export const getvacationUserFavorateStatus = async (userid: number, vacationid: number) :Promise<any[]> => {
    const sql = `SELECT * from  uservacations where userid= ${userid} and vacationid = ${vacationid}`
    const addedVacation = await executeSql(sql)
    console.log("Added to favorite");
    return addedVacation;
}



export const getAllVacationsOfUserLogic = async (userid:number): Promise<VacationType[]> => {
    const sql = `
    SELECT * from vacations where id in (select vacationid from uservacations where userid = ${userid}) ORDER BY startOn
    `
    const vacations = await executeSql(sql);
    return vacations;
}

export const getAllActiveVacationsLogic = async (): Promise<VacationType[]> => {
    const sql = `
    SELECT * from vacations where startOn < NOW() and endOn > NOW() ORDER BY startOn
    `
    const vacations = await executeSql(sql);
    return vacations;
}

export const getAllNotStartedVacationsLogic = async (): Promise<VacationType[]> => {
    const sql = `
    SELECT * from vacations where startOn > NOW() ORDER BY startOn
    `
    const vacations = await executeSql(sql);
    return vacations;
}

export const getChartData = async (): Promise<VacationType[]> => {
    const sql = `
      SELECT v.destination, count(uv.id) as count FROM vacations v , uservacations uv WHERE v.id = uv.vacationid group by 1
      `;
    const vacations = await executeSql(sql);
    return vacations;
  };
  