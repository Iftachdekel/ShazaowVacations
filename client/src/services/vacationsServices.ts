import axios from "axios";
import { appConfig } from "../utils/appConfig";
import { FilterType, VacationType } from "../types/VacationType";

export const getAllVacations = async (): Promise<VacationType[]> => {
  const response = await axios.get(appConfig.vacationUrl);
  const vacations = response.data as VacationType[];

  return vacations;
};

export const getOneVacation = async (id: number): Promise<VacationType> => {
  const response = await axios.get(appConfig.vacationUrl + `/${id}`);

  const data = response.data as VacationType;

  return data;
};
export const getVacationFollowersCount = async (id: number): Promise<VacationType> => {
  const response = await axios.get(appConfig.vacationFollowers + `/${id}`);

  const data = response.data as VacationType;
  return data;
};

export const updatVacation = async (vacation: VacationType, id: number,token:string): Promise<VacationType> => {
  const res = await axios.put(appConfig.vacationUrl + `/${id}`, vacation ,{
   headers: {
     Authorization: "Bearer "+ token
   }
 } );
   return res.data as VacationType
   
 };
 export const addNewVacation = async (vacation: VacationType): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("imageFile", vacation.imageFile);
    formData.append("id", vacation.id.toString());
    formData.append("destination", vacation.destination);
    formData.append("description", vacation.description);
    formData.append("price", vacation.price.toString());
    // formData.append("imageName", vacation.imageName);
    formData.append("file", vacation.imageFile);

    const requestBody = {
      id: vacation.id,
      destination: vacation.destination,
      description: vacation.description,
      startOn: vacation.startOn,
      endOn: vacation.endOn,
      price: vacation.price,
      imageName: vacation.imageName,
    };

    const headers = {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    };
    // console.log(headers)
    const response = await axios.post(appConfig.vacationUrl, vacation, {
      headers: headers,
    });
  } catch (err) {
    console.error(err);
  }
};

export const deleteVacation = async (id: number): Promise<void> => {
  
  ;
  await axios.delete(appConfig.deletevacationUrl + `/${id}`
  );
};

export const getToken = () => {
  const storedToken = sessionStorage.getItem("token");
  if (storedToken) {
    return storedToken;
  }
  return "";
};



export const getAllFavVacations = async (userid: number): Promise<VacationType[]> => {
  const url = appConfig.vacationUrl + `/user/${userid}`

  
  const response = await axios.get(url);
 
  const vacations = response.data as VacationType[];

  return vacations;
};


export const getAllActiveVacations = async (): Promise<VacationType[]> => {
  const url = appConfig.vacationUrl + `/active`
  console.log(url)

  const response = await axios.get(url);
  console.log(response);
  const meetings = response.data as VacationType[];

  return meetings;
};
export const getAllFutureVacations = async (): Promise<VacationType[]> => {
  const url = appConfig.vacationUrl + `/future`
  console.log(url)

  const response = await axios.get(url);
  console.log(response);
  const meetings = response.data as VacationType[];

  return meetings;
};


export const excelVacation = async (): Promise<void> => {

  await axios.get(appConfig.excelUrl);
};