import React, { createContext, useContext, useState, ReactNode } from "react";
import { addNewUser } from "../../services/usersServices";
import { UserType } from "../../types/UserType";

export type RoleType = "admin" | "user";

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  role: "user" | "admin";
  token: string;
}


interface AuthContextType {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
  register: (user: UserType) => Promise<void>;
  token: string | undefined;
  role: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);




export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedToken = sessionStorage.getItem('token');
    const savedId = Number(sessionStorage.getItem('id'));
    const savedUsername = sessionStorage.getItem('username');
    const savedEmail = sessionStorage.getItem('email');
    const savedRole = sessionStorage.getItem('role') as RoleType;

    if (savedToken && savedId && savedUsername && savedEmail && savedRole) {
        return {
            id: savedId,
            username: savedUsername,
            email: savedEmail,
            role: savedRole,
            token: savedToken
        };
    }
    return null;
});

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
    console.log('Authcontext: ' + userData.email)
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
    token: user?.token,   
    role: user?.role || ""  
};


  return (
    <AuthContext.Provider value={contextValue}>

      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

