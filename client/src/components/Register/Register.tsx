import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../../types/UserType";
import { addNewUser, getAllUsers, loginUser } from "../../services/usersServices";
import { RegisterUserType } from "../../types/RegisterUserType";
import { useForm } from "react-hook-form";
import { useAuth } from "../AuthContext/AuthContext";

const Register: React.FC = () => {

  const { register: authRegister } = useAuth();
  const { register: formRegister, handleSubmit, formState } = useForm<RegisterUserType>();
  const { errors } = formState;

  const navigate = useNavigate();
  const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(value);
  };

  const handleRegister = async (user: RegisterUserType) => {

    const send: UserType = {
      user: {
        id: null,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        username: user.user.username,
        email: user.user.email,
        password: user.user.password,
        role: "user"
      },
    };

    
   
      await addNewUser(send).then(() => authRegister(send));
      const logInCredentials = {
        password: send.user.password,
        email: send.user.email
      }
      
      try {
        const { user, token } = await loginUser(logInCredentials);
        // Save the token and user data wherever you need, if you want
        alert('Welcome and logged in!');
        navigate("/tours");
      } catch (error) {
        console.error("Error during automatic login after registration:", error);
        alert('Registration successful but automatic login failed!');
        navigate("/login"); // Redirect to login page so the user can log in manually
      }
      
      console.log("Sending registration data:", send);
    };
    
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "100px",
        
      }}
    >
      <h1 className="title">Register</h1>
      <form onSubmit={handleSubmit(handleRegister)} style={{ display: 'flex', flexDirection: 'column' }}>

        <TextField
        className="textFields"
          label="username"
          variant="outlined"
          {...formRegister("user.username")}
          margin="normal"

        />
        <TextField
        className="textFields"
          label="First Name"
          variant="outlined"

          {...formRegister("user.firstName")}
          margin="normal"

        />
        <TextField
        className="textFields"
          label="Last Name"
          variant="outlined"

          {...formRegister("user.lastName")}
          margin="normal"

        />
        <TextField
        className="textFields"
        label="Email"
          variant="outlined"
          {...formRegister("user.email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            }
          })}
          margin="normal"
          />
          {errors.user?.email && <div style={{display:'flex', color: "red" }}>{errors.user.email.message}</div>}

        <TextField
        className="textFields"
          label="Password"
          variant="outlined"
          type="password"
          {...formRegister("user.password", {
            required: "Password is required.",
            validate: value => validatePassword(value) || "Password must be at least 6 characters, lowercase/uppercase/digit/special char"
          })}
          margin="normal"
        />
        {errors.user?.password && <div style={{ color: "red" }}>{errors.user.password.message}</div>}

        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
      </form>

      <Link to="/login" style={{ marginTop: "10px" }}>
        Already a member? Login
      </Link>
    </Box>
  );
};

export default Register;
