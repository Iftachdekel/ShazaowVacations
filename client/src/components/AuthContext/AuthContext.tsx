import React, { createContext, useContext, useState, ReactNode } from "react";
import { addNewUser } from "../../services/usersServices";
import { UserType } from "../../types/UserType";

export type RoleType = "admin" | "user";

export interface AuthUser {
  token: any;
  id: number;
  username: string;
  email: string;
  role: RoleType; 
}

interface AuthContextType {
  token: string | undefined;
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
  register: (user: UserType) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const register = async (userToRegister: UserType) => {
    await addNewUser(userToRegister);

    const newUser: AuthUser = {
        token: 'SOME_TOKEN_HERE', 
        id: userToRegister.user.id || -1,  
        username: userToRegister.user.username,
        email: userToRegister.user.email,
        role: "user" as RoleType 
    };

    setUser(newUser);
    console.log(newUser.username)
};

  const login = (userData: AuthUser) => {
    setUser(userData);
console.log('Authcontext: '+userData.email)
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear()
  };


  
  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    register,
    token: undefined,

  };

  return (
    <AuthContext.Provider value={contextValue}>

      {children}
    </AuthContext.Provider>
  );};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

