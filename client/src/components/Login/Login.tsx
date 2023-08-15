import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { loginUser } from "../../services/usersServices";
import { AuthUser, useAuth } from "../AuthContext/AuthContext"; // Import the useAuth hook



const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth(); // Use the useAuth hook to access the login function
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);


  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (!email.includes("@")) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError(null);
    }

    return isValid;
  };


  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await loginUser({ email: email, password: password });

        if (response) {
          const authUser: AuthUser = {
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            role: response.user.role,
            token: response.token
          };

          login(authUser);
          navigate("/tours");
          setEmail("");
          setPassword("");
          setEmailError(null); // Reset field-specific errors
          setPasswordError(null); // Reset field-specific errors

        } else {
          setLoginError("Username or password incorrect");
        }
      } catch (error) {
        // Handle the error from the server
        setLoginError("An error occurred during login: " + (error as Error).message);
      }
    }
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
      <h1 className="title">Login</h1>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        error={!!emailError || !!loginError}
        helperText={emailError || loginError}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        error={!!passwordError || !!loginError}
        helperText={passwordError || loginError}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Link to="/register" style={{ marginTop: "10px" }}>
        Not a member yet? Register
      </Link>
    </Box>
  );
};

export default Login;
