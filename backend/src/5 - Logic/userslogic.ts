import { UserType, validateUser } from "../4 - Models/UserModel";
import { getNewToken } from "../2 - Utils/cyber";
import { UnauthorizedError, ErrorType } from "../4 - Models/ErrorModels";
import { executeSql } from "../2 - Utils/dal";

export const register = async (user: UserType) => {
  validateUser(user);
  const sql = `
  SELECT email from users WHERE email='${user.email}'
  `;
  const findUser = await executeSql(sql);
  if (findUser.length > 0) return "user registerd. Need to log in";
  return new Promise(async (resolve, reject) => {
    user.role = "user";
    await newUserLogic(user)
      .then(() => {
        console.log("User saved successfully:", user);
        const newToken = getNewToken(user);
        resolve(newToken);
      })
      .catch((error: ErrorType) => {
        console.error("Error saving user:", error);
        reject(UnauthorizedError);
      });
  });
};
export const getAllUsers = async (): Promise<UserType[]> => {
  const sql = `SELECT * from users`;
  const users = await executeSql(sql);
  return users;
};

export const newUserLogic = async (user: UserType): Promise<void> => {
  const sql = `INSERT INTO users
  (username, firstName, lastName, email, password , role)
  VALUES ("${user.username}" ,"${user.firstName}" ,"${user.lastName}","${user.email}",
  "${user.password}","${user.role}")`;
  const newUser = await executeSql(sql);
  return newUser;
};

export const getUserByEmail = async (
  email: string
): Promise<UserType | null> => {
  const sql = `SELECT * FROM users WHERE email='${email}'`;
  const users = await executeSql(sql);

  if (users.length > 0) {
    return users[0]; // Return the first user found (assuming emails are unique)
  } else {
    return null; // Return null if no user with the given email was found
  }
};
