import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useAuth } from "../AuthContext/AuthContext";
import { Button, Chip } from "@mui/material";
import { excelVacation } from "../../services/vacationsServices";

interface User {
  role: "user" | "admin";
  username: string;
}

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEXCEL = async () => {
    if (user?.token && user && user.role === "admin") {
            try {
        await excelVacation(user.token);
      } catch (error) {
        console.error("Error updating vacation:", error);
      }
    }
  }


  const handleLogout = () => {
    logout();
    navigate("/"); // Navigate to the home page after logout
    sessionStorage.clear()
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ShaZaow
      </Link>
      {user && user.role === "admin" && <Button
       sx={{ width: "30px", height: "30px", marginRight: "25px", color: "primary", border: "1px" }}
        onClick={handleEXCEL}>Report.csv</Button>}
      <div>
        {user && user.role === "admin" && (
          <Chip label="Admin's view" color="secondary" sx={{
            backgroundColor: 'red',
            '& .MuiChip-label': {
              color: 'white',
              marginRight: "30px"
            }
          }} />
        )}
        <Link to="/home" className="navbar-link">
          Home
        </Link>
        {sessionStorage.getItem('token') && (
          <Link to="/tours" className="navbar-link">
            Tours
          </Link>
        )}
        {/* No special content for 'user' role indicated, so removed the empty block */}
        {user && user.role === "admin" && (
          <>
            <Link to="/addtour" className="navbar-link">
              Add Tour
            </Link>
            <Link to="/charts" className="navbar-link">
              Charts
            </Link>
          </>
        )}
        {user ? (
          <div className="navbar-user">
            <span className="navbar-welcome">Logged in as {user.username}!</span>
            <button onClick={handleLogout} className="logOut">
              Logout
            </button>
          </div>
        ) : (
          // Only display the Login link if no user is authenticated
          !user && (
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default NavBar;
