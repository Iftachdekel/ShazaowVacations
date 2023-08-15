import { LogInCredentials, logInValidation } from "../4 - Models/logInType"
import { getNewToken } from "../2 - Utils/cyber"
import { executeSql } from "../2 - Utils/dal"

export const loginUser = async (credntials: LogInCredentials) => {
    try {
        logInValidation(credntials)
        const sql = `
        SELECT email, password from users WHERE email='${credntials.email}'
        ` 
        const user = await executeSql(sql);
        if (user && user[0].email === credntials.email && user[0].password === credntials.password) {
            const token = getNewToken(user)
            console.log("User Logged In succesfuly");
            console.log(credntials.email)
            return token
        } else return "Incorrect Username Or Password"
    } catch (error) {
        return('An error occurred during login' + error.message);
    }
}


export const validateUserCredntials = async (credntials: LogInCredentials) => {
    try {
        const sql = `
        SELECT email, password from users WHERE email='${credntials.email}'
        ` 
        const user = await executeSql(sql);
        if (user && user[0].email === credntials.email && user[0].password === credntials.password) {
            console.log("User Logged In Validated");            
            return true
        }
    } catch (error) {
        console.log(error);     
    }
    console.log("User Logged In NOT Validated");       
    return false
}


