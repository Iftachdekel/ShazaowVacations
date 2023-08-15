import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { UserType } from "../4 - Models/UserModel";
import { executeSql } from './dal';
import { error } from 'console';
import { request } from 'http';

export interface UserContainer {
    user: UserType
}

const secretKey = "ILoveEveryThing"

export const getNewToken = (user: UserType): string => {

    const container = { user };

    const options = { expiresIn: '3h' }

    const token = jwt.sign(container, secretKey, options);

    return token;
}


export const verifyToken = (request: Request): Promise<boolean> => {

    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("Authorization");
            if (!header) {
                resolve(false);
                return;
            }
            const token = header.substring(7);
            console.log(token)
            if(!token){
                resolve(false);
                return;
            }
            jwt.verify(token, secretKey, (err) => {
             
                if(err){
                    resolve(false);
                    return;
                }
                resolve(true);
            })
        } catch (err: any) {
            reject(err);
        }
    })
}

export const verifyAdmin = async (request: Request): Promise<boolean> => {

    const isLoggedIn = await verifyToken(request);
    
    if(!isLoggedIn) return false;

    const header = request.header("authorization");
    const token = header.substring(7);
    
    const container = jwt.decode(token) as UserContainer;
    const sql = `
    SELECT * from users WHERE email='${container.user[0].email}' AND password='${container.user[0].password}'
    ` 
    const user = await executeSql(sql) as UserType;

    return user[0].role==='admin';
    
}
export const verifyUserId = async (request: Request): Promise<number> => {

    const isLoggedIn = await verifyToken(request);
    
    if(!isLoggedIn) console.log('not login');
    
    const header = request.header("authorization");
    const token = header.substring(7);
    
    const container = jwt.decode(token) as UserContainer;
    const sql = `
    SELECT * from users WHERE email='${container.user[0].email}' AND password='${container.user[0].password}'
    ` 
    const user = await executeSql(sql) as UserType;

    console.log(user);
    
    return user[0].id;
    
}


export const verifyUser = async (request: Request): Promise<boolean> => {

    const isLoggedIn = await verifyToken(request);
    
    if(!isLoggedIn) return false;

    const header = request.header("authorization");
    const token = header.substring(7);
    
    const container = jwt.decode(token) as UserContainer;
    const sql = `
    SELECT * from users WHERE email='${container.user[0].email}' AND password='${container.user[0].password}'
    ` 
    const user = await executeSql(sql) as UserType;

    return user[0].role==='user';
    
}
