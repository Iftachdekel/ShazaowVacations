import { executeSql } from "../2 - Utils/dal";
import { VacationType } from "../4 - Models/VacationModel";
import { FollowerType } from "../4 - Models/followerModel";


export const filterFutureVacationsLogic = async (): Promise<VacationType[]> => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    
    const sql = `
    SELECT * from vacations WHERE startOn > '${formattedDate}'
    `
    const vacations = await executeSql(sql);
    return vacations;
}

export const filterActiveVacationsLogic = async (): Promise<VacationType[]> => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    
    const sql = `
    SELECT * from vacations WHERE startOn <= '${formattedDate}' AND endOn >= '${formattedDate}'
    `
    const vacations = await executeSql(sql);
    return vacations;
}

export const filterFollwerUserVacationsLogic = async (id: number): Promise<FollowerType[]> => {
    
    const sql = `
    SELECT v.*
    FROM followers AS f
    JOIN vacations AS v ON f.vacationId = v.vacationId
    WHERE f.userId = ${id};
    `
    const vacations = await executeSql(sql);
    return vacations;
}

export const getOneVacationsLogic = async (id:number): Promise<VacationType> => {
    const sql = `
    SELECT * from vacations WHERE id = ${id}
    `
    const vacation = await executeSql(sql);
    return vacation;
}
