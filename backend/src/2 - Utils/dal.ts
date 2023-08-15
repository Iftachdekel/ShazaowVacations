import mysql from 'mysql';
import { appConfig } from './appConfig';

// Create a pool of connection to mysql

const connection = mysql.createPool({
    host: appConfig.host,
    user: appConfig.user,
    password: appConfig.password,
    database: appConfig.database
});

// Execute sql query
export const executeSql = (sql: string): Promise<any> => {
    return new Promise<any>((res, rej) => {
        connection.query(sql, (err, result) => {
            if(err){
                rej(err);
                return;
            }
            res(result);
        })
    })
}

