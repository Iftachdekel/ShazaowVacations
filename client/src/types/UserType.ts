export type RolesType = "admin" | "user" ;


export type UserType = {
  token?: string;
  user : {

    id: number | null,
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password : string;
    role: "user"| RolesType;
  }
};
