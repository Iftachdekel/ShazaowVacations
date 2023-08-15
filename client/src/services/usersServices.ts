import axios from "axios";
import { appConfig } from "../utils/appConfig";
import { UserType } from "../types/UserType";
import { LogInCredentials } from "../types/LogInCredentials";
import { AuthUser } from "../components/AuthContext/AuthContext";
import { getToken } from "./vacationsServices";

export const getAllUsers = async (): Promise<UserType[]> => {
  const response = await axios.get(appConfig.usersUrl);

  const users = response.data as UserType[];

  return users;
};

export const getUser = async (id: number): Promise<UserType> => {
  const response = await axios.get(appConfig.usersUrl + `/${id}`);

  const team = response.data as UserType;

  return team;
};

// export const updateUser = async (team: UserType): Promise<void> => {
//   await axios.put(appConfig.usersUrl + `/${team.user.id}`, team);
// };

export const addNewUser = async (user: UserType): Promise<void> => {
  await axios.post(appConfig.usersUrl, user.user);

  console.log(user.user)
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(appConfig.usersUrl + `/${id}`);
};


export const loginUser = async (
  logInCredentials: LogInCredentials
): Promise<{ user: AuthUser; token: string }> => {
  try {
    const response = await axios.post(
      appConfig.usersUrl + `/login`,
      logInCredentials
    );

    const { user, token } = response.data;
    sessionStorage.setItem("token", token);
        return { user, token };
  } catch (error) {
    let errorMessage = "An error occurred during login";
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    throw new Error("Login failed: " + errorMessage);
  }
};

export const addUserFavoriteVacation = async (userId: number,vacationId: number,token:string) => {
  try {
    const url = `${appConfig.favVacationUrl}/add`;

    const formData = {userId: userId,vacationId: vacationId};

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };

    console.log(headers);
    const response = await axios.post(url, formData, {
      headers: headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding favorite vacation:", error);
    throw error;
  }
};
export const removeUserFavoriteVacation = async (
  userId: number,
  vacationId: number,
  token:string
) => {
  try {
    const url = `${appConfig.favVacationUrl}/remove`;

    const formData = {
      userId: userId,
      vacationId: vacationId,
    };

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const response = await axios.post(url, formData, {
      headers: headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding favorite vacation:", error);
    throw error;
  }
};

export const getUserFavoriteVacationStatus = async (
  userId: number,
  vacationId: number,
  token:string
) => {
  try {
    const url = `${appConfig.favVacationUrl}/status/${userId}/${vacationId}`;

    console.log(url);
    const formData = {
      userId: userId,
      vacationId: vacationId,
      token:token
    };

    const headers = {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    };

    console.log(headers);
    const response = await axios.get(url, {
      headers: headers,
    });

    return response.data;
  } catch (error) {
    console.error("Error getting favorite vacation:", error);
    throw error; 
  }
};

export const loginUserService = async (logInCredentials: LogInCredentials) => {
  return await axios.post(appConfig.usersUrl + `/login`, logInCredentials);
};
